'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { lessonOrder } from '@/lib/curriculum';
import type { Card } from '@/lib/practice/queue';
import { newCard, previewInterval, type Direction, type Grade } from '@/lib/practice/scheduler';
import { useReview } from '@/lib/practice/store';
import type { Item } from '@/lib/practice/items';
import { speakable } from '@/lib/speakable';
import { speak, stop, useSpeech } from '@/lib/speech';
import { Speak } from '@/components/speak';
import { ArrowRight, Check, Eye, PartyPopper } from '@/components/icons';

/* ------------------------------- prompt copy -------------------------------- */

/**
 * Each direction asks a different question, and the wording has to make the task
 * unambiguous before the answer is shown — a vague prompt makes the reader grade
 * a question they were not actually asked.
 */
function promptFor(item: Item, direction: Direction): string {
  if (item.kind === 'kana') {
    return direction === 'recall' ? 'Which character is this?' : 'What sound is this?';
  }
  switch (direction) {
    case 'recognise':
      return item.kind === 'sentence' ? 'What does this say?' : 'What does this mean?';
    case 'reading':
      return 'How is this read?';
    case 'recall':
      return item.kind === 'sentence' ? 'Say this in Japanese' : 'How do you say this?';
  }
}

function labelFor(item: Item, direction: Direction): string {
  if (item.kind === 'kana') return direction === 'recall' ? 'Character' : 'Sound';
  return direction === 'recognise' ? 'Meaning' : direction === 'reading' ? 'Reading' : 'Production';
}

/* --------------------------------- the card --------------------------------- */

/** One fixed key, so the S shortcut and the button share a lit state. */
const VOICE_KEY = 'practice-card';

function spokenText(item: Item): string {
  if (item.kind === 'kana') return item.jp;
  return speakable(item, item.kind === 'sentence' ? 'sentence' : 'word');
}

/** Only ever on the answer side: on the front, hearing it would give it away. */
function CardVoice({ item }: { item: Item }) {
  return (
    <>
      {' '}
      <Speak
        text={spokenText(item)}
        label={item.jp}
        size="lg"
        id={VOICE_KEY}
        shortcut="S"
        className="-mt-1"
      />
    </>
  );
}

function KanaFace({ card, side }: { card: Card; side: 'front' | 'back' }) {
  const { item, direction } = card;
  // Production means being shown the sound and recalling the shape, so the prompt
  // is the Devanagari. Romaji appears only as a quiet cross-check underneath.
  const showChar = direction === 'recognise' ? true : side === 'back';
  const showSound = direction === 'recall' ? true : side === 'back';

  return (
    <div className="text-center">
      {showChar && (
        <p lang="ja" className="font-jp text-6xl font-medium leading-tight text-ink sm:text-7xl">
          {item.jp}
          {side === 'back' && <CardVoice item={item} />}
        </p>
      )}
      {showSound && (
        <>
          <p
            lang="hi"
            className={`font-deva leading-snug text-plum-700 ${
              showChar ? 'mt-4 text-2xl' : 'text-5xl sm:text-6xl'
            }`}
          >
            {item.deva}
          </p>
          <p className="mt-2 text-sm text-ink-faint">{item.en}</p>
        </>
      )}
    </div>
  );
}

function Face({ card, side }: { card: Card; side: 'front' | 'back' }) {
  const { item, direction } = card;
  if (item.kind === 'kana') return <KanaFace card={card} side={side} />;

  const jpSize = item.kind === 'sentence' ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl';

  // What the reader is asked to produce is hidden on the front and revealed on the
  // back; the rest is context and shows on both.
  const showJp = direction !== 'recall' || side === 'back';
  const showEn = direction === 'recall' || side === 'back';
  const showReading = side === 'back';

  return (
    <div className="text-center">
      {showJp && (
        <p lang="ja" className={`font-jp font-medium leading-tight text-ink ${jpSize}`}>
          {item.jp}
          {side === 'back' && <CardVoice item={item} />}
        </p>
      )}

      {showReading && item.kana && item.kana !== item.jp && (
        <p lang="ja" className="mt-3 font-jp text-lg text-ink-muted">
          {item.kana}
        </p>
      )}

      {showReading && (
        <p lang="hi" className="mt-3 font-deva text-2xl leading-snug text-plum-700">
          {item.deva}
        </p>
      )}

      {showEn && (
        <p
          className={`leading-relaxed text-ink-soft ${
            direction === 'recall' && side === 'front'
              ? 'text-2xl font-medium text-ink sm:text-3xl'
              : 'mt-4 text-lg'
          }`}
        >
          {item.en}
        </p>
      )}

    </div>
  );
}

/* -------------------------------- the session ------------------------------- */

const grades: { g: Grade; label: string; key: string; cls: string }[] = [
  {
    g: 'again',
    label: 'Again',
    key: '1',
    cls: 'border-plum-300 text-plum-700 hover:bg-plum-50 hover:border-plum-400',
  },
  {
    g: 'good',
    label: 'Good',
    key: '2',
    cls: 'border-rule-strong text-ink-soft hover:bg-paper-sunk hover:border-sakura-400 hover:text-sakura-700',
  },
  {
    g: 'easy',
    label: 'Easy',
    key: '3',
    cls: 'border-teal-300 text-teal-700 hover:bg-teal-50 hover:border-teal-400',
  },
];

export function ReviewSession({
  queue,
  onExit,
  scopeLabel,
}: {
  queue: Card[];
  onExit: () => void;
  scopeLabel: string;
}) {
  const { answer } = useReview();
  const { available: canSpeak } = useSpeech();

  // The queue is a working list: an "Again" pushes the card back onto the end
  // rather than mutating the caller's array, so a lapse is re-asked this session.
  const [pending, setPending] = useState<Card[]>(queue);
  const [shown, setShown] = useState(false);
  const [answered, setAnswered] = useState(0);
  const [lapses, setLapses] = useState(0);
  const liveRef = useRef<HTMLDivElement>(null);

  const card = pending[0];
  const total = queue.length;

  const record = useCallback(
    (g: Grade) => {
      if (!card) return;
      const next = answer(card.item.id, card.direction, g);
      setAnswered((n) => n + 1);
      setPending((rest) => {
        const [, ...tail] = rest;
        // Forgotten cards come back, but behind a few others so the answer is not
        // still on screen in the reader's memory when it reappears.
        if (g === 'again') {
          const at = Math.min(tail.length, 4);
          return [...tail.slice(0, at), { ...card, state: next }, ...tail.slice(at)];
        }
        return tail;
      });
      if (g === 'again') setLapses((n) => n + 1);
      setShown(false);
    },
    [answer, card]
  );

  /**
   * The deck buttons sit well below the fold, so a session started from one opens
   * off screen. Reset once the session has mounted rather than in the click
   * handler, where the page is still the taller dashboard.
   *
   * 'instant' rather than 'auto': `auto` means "whatever CSS says", and globals.css
   * sets `scroll-behavior: smooth` on html, which turns this into an animation the
   * reader watches instead of a jump they never notice.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Space or Enter reveals; 1/2/3 grade. A keyboard-only pass through a deck is
  // much faster than reaching for the mouse on every card.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;

      if (!shown) {
        if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          setShown(true);
        }
        return;
      }
      if ((e.key === 's' || e.key === 'S') && canSpeak && card) {
        e.preventDefault();
        speak(VOICE_KEY, spokenText(card.item));
        return;
      }
      const match = grades.find((x) => x.key === e.key);
      if (match) {
        e.preventDefault();
        record(match.g);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shown, record, canSpeak, card]);

  // A word still being read out when the next card appears would be confusing.
  useEffect(() => stop, [card?.key]);

  const source = useMemo(() => {
    if (!card?.item.lessons.length) return null;
    const id = card.item.lessons[0];
    return lessonOrder.find((l) => l.id === id) ?? null;
  }, [card]);

  if (!card) {
    return <Finished answered={answered} lapses={lapses} onExit={onExit} />;
  }

  const done = total ? Math.min(100, Math.round((answered / total) * 100)) : 0;

  return (
    <div>
      {/* Session header */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-ink-muted">{scopeLabel}</p>
          <p className="mt-0.5 text-xs tabular-nums text-ink-faint">
            {pending.length} left · {answered} answered
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm text-ink-muted
                     transition-colors duration-200 hover:bg-paper-sunk hover:text-ink"
        >
          End session
        </button>
      </div>

      <div
        className="mt-3 h-1 overflow-hidden rounded-full bg-paper-deep"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Session progress"
      >
        <div
          className="h-full rounded-full bg-sakura-500 transition-[width] duration-300 ease-out"
          style={{ width: `${done}%` }}
        />
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-rule bg-paper-raised px-6 py-9 sm:px-10 sm:py-11">
        <div className="flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider text-ink-faint">
          <span>{labelFor(card.item, card.direction)}</span>
          {!card.state && (
            <span className="rounded-full bg-sakura-50 px-2 py-0.5 font-medium text-sakura-700">
              New
            </span>
          )}
        </div>

        <p className="mt-2 text-center text-sm text-ink-muted">
          {promptFor(card.item, card.direction)}
        </p>

        <div className="mt-8" ref={liveRef} aria-live="polite">
          <Face card={card} side={shown ? 'back' : 'front'} />
        </div>

        {!shown && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShown(true)}
              className="btn-primary inline-flex cursor-pointer items-center gap-2.5 rounded-lg
                         px-6 py-3 text-base font-medium transition-colors duration-200"
            >
              <span className="h-4 w-4">
                <Eye />
              </span>
              Show answer
              <kbd className="ml-1 hidden rounded border border-current/30 px-1.5 py-0.5 text-[0.6875rem] font-normal opacity-70 sm:inline-block">
                Space
              </kbd>
            </button>
          </div>
        )}
      </div>

      {/*
        Grading sticks to the bottom of the viewport. Card height varies a lot — a
        kana character and a twenty-character example sentence are nothing alike —
        so no fixed spacing keeps the buttons on screen for every card. Sticky costs
        nothing when the card is short: there is no overflow, so it sits in place.
      */}
      {shown && (
        <div
          className="sticky bottom-0 z-10 -mx-5 mt-5 border-t border-rule bg-paper px-5
                     pb-5 pt-4 sm:-mx-8 sm:px-8"
        >
          <p className="text-center text-sm text-ink-muted">How did that go?</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {grades.map((x) => (
              <button
                key={x.g}
                type="button"
                onClick={() => record(x.g)}
                className={`tap cursor-pointer rounded-xl border bg-paper-raised px-3 py-4
                            transition-colors duration-200 ${x.cls}`}
              >
                <span className="block text-[0.9375rem] font-medium">{x.label}</span>
                <span className="mt-1 block text-xs tabular-nums opacity-70">
                  {previewInterval(card.state ?? newCard(), x.g)}
                </span>
                <kbd className="mt-1.5 hidden rounded border border-current/25 px-1.5 py-0.5 text-[0.6875rem] font-normal opacity-60 sm:inline-block">
                  {x.key}
                </kbd>
              </button>
            ))}
          </div>
        </div>
      )}

      {source && (
        <p className="mt-8 text-center text-sm text-ink-faint">
          From{' '}
          <Link
            href={`/learn/${source.moduleSlug}/${source.lessonSlug}/`}
            className="link-underline cursor-pointer"
          >
            {source.lessonTitle}
          </Link>
        </p>
      )}
    </div>
  );
}

/* -------------------------------- the ending -------------------------------- */

function Finished({
  answered,
  lapses,
  onExit,
}: {
  answered: number;
  lapses: number;
  onExit: () => void;
}) {
  const { streak } = useReview();

  return (
    <div className="rounded-2xl border border-rule bg-paper-raised px-8 py-14 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sakura-50 text-sakura-600">
        <span className="h-5 w-5">
          {answered > 0 ? <PartyPopper /> : <Check />}
        </span>
      </span>

      <h2 className="mt-5 font-serif text-2xl font-semibold text-ink">
        {answered > 0 ? 'Session finished' : 'Nothing due'}
      </h2>

      {answered > 0 ? (
        <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
          {answered} {answered === 1 ? 'card' : 'cards'} answered
          {lapses > 0 && `, ${lapses} of them more than once`}. Come back tomorrow and
          the ones you nearly forgot will be waiting.
        </p>
      ) : (
        <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
          Everything in this deck is scheduled for a later day. Read another lesson,
          or widen the deck to bring in new material.
        </p>
      )}

      {streak.current > 1 && (
        <p className="mt-4 text-sm text-ink-faint">
          {streak.current} days in a row.
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onExit}
          className="btn-primary inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5
                     text-sm font-medium transition-colors duration-200"
        >
          Back to practice
          <span className="h-4 w-4">
            <ArrowRight />
          </span>
        </button>
        <Link
          href="/learn/"
          className="inline-flex cursor-pointer items-center rounded-lg border border-rule-strong
                     px-5 py-2.5 text-sm text-ink-soft transition-colors duration-200
                     hover:bg-paper-sunk hover:text-ink"
        >
          Read a lesson
        </Link>
      </div>
    </div>
  );
}
