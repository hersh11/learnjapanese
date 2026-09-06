'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { modules } from '@/lib/curriculum';
import { useProgress } from '@/lib/progress';
import { itemCounts } from '@/lib/practice/items';
import { buildQueue, countScope, type Card, type Counts, type Scope } from '@/lib/practice/queue';
import { DEFAULT_SETTINGS, useReview } from '@/lib/practice/store';
import type { Direction } from '@/lib/practice/scheduler';
import { ReviewSession } from './review-session';
import { ArrowRight, Flame, Layers, RotateCcw, Sliders } from '@/components/icons';

type Deck = { key: string; label: string; hint: string; scope: Scope };

const directionCopy: { id: Direction; label: string; hint: string }[] = [
  { id: 'recognise', label: 'Meaning', hint: 'Shown the Japanese, recall what it means' },
  { id: 'reading', label: 'Reading', hint: 'Shown kanji, recall how it is read' },
  { id: 'recall', label: 'Production', hint: 'Shown the English, recall the Japanese' },
];

export function Practice() {
  const { ready, cards, settings, day, streak, updateSettings, reset } = useReview();
  const { completed, ready: progressReady } = useProgress();

  /** A live session: its queue is captured at start so re-renders cannot reshuffle it. */
  const [running, setRunning] = useState<{ label: string; queue: Card[] } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  /**
   * A lesson page links here with ?lesson=module/slug. Read from the URL directly
   * rather than through useSearchParams, which would push this statically exported
   * page into a dynamic bailout for one optional parameter.
   */
  const [lessonScope, setLessonScope] = useState<Deck | null>(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('lesson');
    if (!id) return;
    for (const m of modules) {
      const l = m.lessons.find((x) => `${m.slug}/${x.slug}` === id);
      if (l) {
        setLessonScope({
          key: `lesson:${id}`,
          label: l.title,
          hint: m.title,
          scope: { kind: 'lesson', id },
        });
        return;
      }
    }
  }, []);

  const decks: Deck[] = useMemo(() => {
    const list: Deck[] = [];
    if (lessonScope) list.push(lessonScope);

    list.push({
      key: 'all',
      label: 'Everything',
      hint: `Course order: ${itemCounts.kana} kana, then ${itemCounts.words} words and ${itemCounts.sentences} sentences`,
      scope: { kind: 'all' },
    });

    if (progressReady && completed.length > 0) {
      list.push({
        key: 'completed',
        label: 'Lessons you have finished',
        hint: `Drawn from the ${completed.length} you have ticked off`,
        scope: { kind: 'completed', lessons: completed },
      });
    }

    list.push(
      { key: 'hiragana', label: 'Hiragana', hint: 'The first alphabet', scope: { kind: 'kana', script: 'hiragana' } },
      { key: 'katakana', label: 'Katakana', hint: 'The second alphabet', scope: { kind: 'kana', script: 'katakana' } }
    );

    for (const m of modules) {
      list.push({
        key: m.slug,
        label: m.title,
        hint: `${m.lessons.length} lessons · ${m.level}`,
        scope: { kind: 'module', slug: m.slug },
      });
    }

    return list;
  }, [lessonScope, progressReady, completed]);

  const counts = useMemo(() => {
    const out = new Map<string, Counts>();
    if (!ready) return out;
    for (const d of decks) out.set(d.key, countScope(d.scope, cards, settings.directions));
    return out;
  }, [decks, cards, settings.directions, ready]);

  const newLeft = Math.max(0, settings.newPerDay - day.introduced);

  const start = (deck: Deck) => {
    setRunning({
      label: deck.label,
      queue: buildQueue({
        scope: deck.scope,
        cards,
        directions: settings.directions,
        newAllowance: newLeft,
        maxReviews: settings.maxReviews,
      }),
    });
  };

  // A running session drops the page intro. It is a focused mode, and leaving the
  // heading in place pushes the grading buttons below the fold on a laptop.
  if (running) {
    return (
      <ReviewSession
        key={running.label}
        queue={running.queue}
        scopeLabel={running.label}
        onExit={() => setRunning(null)}
      />
    );
  }

  const totalDue = counts.get('all')?.due ?? 0;

  return (
    <div>
      <header className="mb-10">
        <p className="text-sm font-medium tracking-wide text-plum-600">Practice</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
          Remember it
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Reading a lesson is how you understand something; seeing it again three days
          later is how you keep it. Each card comes back just before you would have
          forgotten it, and the interval stretches every time you get it right.
        </p>
      </header>

      {/* Today */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Due now"
          value={ready ? String(totalDue) : '—'}
          note={totalDue === 0 && ready ? 'Nothing waiting' : 'Across every deck'}
        />
        <Stat
          label="New today"
          value={ready ? `${day.introduced} / ${settings.newPerDay}` : '—'}
          note={newLeft > 0 ? `${newLeft} still available` : 'Daily limit reached'}
        />
        <Stat
          label="Streak"
          value={ready ? String(streak.current) : '—'}
          note={streak.longest > streak.current ? `Best: ${streak.longest} days` : 'Days in a row'}
          Icon={streak.current > 1 ? Flame : undefined}
        />
      </div>

      {/* Decks */}
      <h2 className="mt-12 font-serif text-xl font-semibold text-ink">Pick a deck</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
        Every card here comes from a lesson you can go back and read. Nothing is
        drilled that the course has not explained.
      </p>

      <ul className="mt-6 space-y-2.5">
        {decks.map((deck) => {
          const c = counts.get(deck.key);
          const empty = ready && c && c.due === 0 && (c.fresh === 0 || newLeft === 0);
          return (
            <li key={deck.key}>
              <button
                type="button"
                onClick={() => start(deck)}
                disabled={!ready}
                className="tap group flex w-full cursor-pointer items-center gap-5 rounded-xl border
                           border-rule bg-paper-raised p-5 text-left transition-colors duration-200
                           hover:border-sakura-300 hover:bg-sakura-50/30 disabled:cursor-wait
                           disabled:opacity-60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg font-semibold text-ink">
                    {deck.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{deck.hint}</span>
                </span>

                <span className="shrink-0 text-right">
                  {ready && c ? (
                    <>
                      <span className="block text-sm tabular-nums">
                        <span className={c.due > 0 ? 'font-medium text-sakura-700' : 'text-ink-faint'}>
                          {c.due} due
                        </span>
                        {c.fresh > 0 && (
                          <span className="text-ink-faint"> · {c.fresh} new</span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs tabular-nums text-ink-faint">
                        {empty ? 'All scheduled ahead' : `${c.known + c.learning} in progress`}
                      </span>
                    </>
                  ) : (
                    <span className="block text-sm text-ink-faint">—</span>
                  )}
                </span>

                <span className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-sakura-600">
                  <ArrowRight />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Settings */}
      <div className="mt-12 border-t border-rule pt-6">
        <button
          type="button"
          onClick={() => setShowSettings((s) => !s)}
          aria-expanded={showSettings}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted
                     transition-colors duration-200 hover:text-sakura-700"
        >
          <span className="h-3.5 w-3.5">
            <Sliders />
          </span>
          {showSettings ? 'Hide settings' : 'Settings'}
        </button>

        {showSettings && (
          <div className="mt-6 space-y-8">
            <Slider
              label="New cards per day"
              hint="The only lever that really matters. Ten a day is about twenty minutes of review once the schedule fills out."
              value={settings.newPerDay}
              min={0}
              max={40}
              step={5}
              onChange={(newPerDay) => updateSettings({ newPerDay })}
            />

            <Slider
              label="Most reviews per session"
              hint="A ceiling so a week away does not come back as a wall."
              value={settings.maxReviews}
              min={20}
              max={200}
              step={20}
              onChange={(maxReviews) => updateSettings({ maxReviews })}
            />

            <fieldset>
              <legend className="text-sm font-medium text-ink">What to be asked</legend>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                Each is scheduled separately, so turning one off does not lose the others.
              </p>
              <div className="mt-3 space-y-2.5">
                {directionCopy.map((d) => {
                  const on = settings.directions.includes(d.id);
                  return (
                    <label
                      key={d.id}
                      className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink-soft"
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => {
                          const next = on
                            ? settings.directions.filter((x) => x !== d.id)
                            : [...settings.directions, d.id];
                          // Leaving nothing enabled would make every deck empty.
                          updateSettings({
                            directions: next.length ? next : DEFAULT_SETTINGS.directions,
                          });
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-rule-strong
                                   text-sakura-600 focus:ring-2 focus:ring-sakura-500 focus:ring-offset-1"
                      />
                      <span>
                        <span className="font-medium text-ink">{d.label}</span>
                        <span className="mt-0.5 block text-sm text-ink-muted">{d.hint}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="border-t border-rule pt-6">
              {confirmReset ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-ink-soft">
                    Forget every review schedule? Lesson progress is untouched.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setConfirmReset(false);
                    }}
                    className="cursor-pointer rounded-md bg-plum-600 px-3.5 py-2 text-sm font-medium
                               text-white transition-colors duration-200 hover:bg-plum-700
                               dark:bg-plum-500 dark:text-black dark:hover:bg-plum-600"
                  >
                    Yes, clear it
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="cursor-pointer rounded-md px-3.5 py-2 text-sm text-ink-muted
                               transition-colors duration-200 hover:bg-paper-sunk hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted
                             transition-colors duration-200 hover:text-plum-700"
                >
                  <span className="h-3.5 w-3.5">
                    <RotateCcw />
                  </span>
                  Reset review schedule
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="mt-10 flex items-start gap-2.5 text-sm leading-relaxed text-ink-faint">
        <span className="mt-0.5 h-3.5 w-3.5 shrink-0">
          <Layers />
        </span>
        <span>
          Schedules are kept in this browser only, like{' '}
          <Link href="/progress/" className="link-underline cursor-pointer">
            lesson progress
          </Link>
          . They will not follow you to another device.
        </span>
      </p>
    </div>
  );
}

/* --------------------------------- fragments -------------------------------- */

function Stat({
  label,
  value,
  note,
  Icon,
}: {
  label: string;
  value: string;
  note: string;
  Icon?: (p: { className?: string }) => React.ReactElement;
}) {
  return (
    <div className="rounded-xl border border-rule bg-paper-raised px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="mt-1.5 flex items-center gap-2 font-serif text-2xl font-medium tabular-nums text-ink">
        {Icon && (
          <span className="h-5 w-5 text-sakura-500">
            <Icon />
          </span>
        )}
        {value}
      </p>
      <p className="mt-1 text-xs text-ink-faint">{note}</p>
    </div>
  );
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-ink" htmlFor={`s-${label}`}>
          {label}
        </label>
        <span className="text-sm tabular-nums text-sakura-700">{value}</span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{hint}</p>
      <input
        id={`s-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-sakura-600"
      />
    </div>
  );
}
