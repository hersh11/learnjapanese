'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { kanaSets, type KanaRow, type Script } from '@/lib/data/kana';
import { Speak } from './speak';

type SetKey = 'base' | 'dakuten' | 'youon';

const setLabels: Record<SetKey, string> = {
  base: 'Basic',
  dakuten: 'Voiced (゛゜)',
  youon: 'Combined (ゃゅょ)',
};

export function KanaExplorer() {
  const [script, setScript] = useState<Script>('hiragana');
  const [setKey, setSetKey] = useState<SetKey>('base');
  const [hideReading, setHideReading] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const reduced = useReducedMotion();

  const groups = kanaSets[script][setKey];

  const reveal = (kana: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(kana) ? next.delete(kana) : next.add(kana);
      return next;
    });

  const resetQuiz = () => setRevealed(new Set());

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-rule py-4">
        <Toggle
          label="Script"
          options={[
            { value: 'hiragana', label: 'Hiragana' },
            { value: 'katakana', label: 'Katakana' },
          ]}
          value={script}
          onChange={(v) => setScript(v as Script)}
        />

        <Toggle
          label="Set"
          options={(Object.keys(setLabels) as SetKey[]).map((k) => ({
            value: k,
            label: setLabels[k],
          }))}
          value={setKey}
          onChange={(v) => setSetKey(v as SetKey)}
        />

        <div className="flex items-center gap-3">
          <label className="-my-1 flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={hideReading}
              onChange={(e) => {
                setHideReading(e.target.checked);
                resetQuiz();
              }}
              className="h-5 w-5 cursor-pointer rounded border-rule-strong text-sakura-600
                         focus:ring-2 focus:ring-sakura-500 focus:ring-offset-1"
            />
            Quiz me: hide readings
          </label>
          {hideReading && revealed.size > 0 && (
            <button
              type="button"
              onClick={resetQuiz}
              className="cursor-pointer text-sm text-sakura-700 underline decoration-sakura-300
                         underline-offset-4 transition-colors duration-200 hover:text-sakura-800"
            >
              Hide all again
            </button>
          )}
        </div>
      </div>

      {hideReading && (
        <p className="mt-4 text-sm text-ink-muted">
          Tap a character to check yourself.
        </p>
      )}

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${script}-${setKey}`}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 space-y-8"
        >
          {groups.map((group) => (
            <section key={group.id}>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
                <span lang="ja" className="font-jp">
                  {group.label}
                </span>
              </h2>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {group.rows.map((row) => (
                  <Card
                    key={row.kana}
                    row={row}
                    hidden={hideReading && !revealed.has(row.kana)}
                    quiz={hideReading}
                    onClick={() => hideReading && reveal(row.kana)}
                  />
                ))}
              </div>

              {group.rows.some((r) => r.note) && !hideReading && (
                <ul className="mt-3 space-y-1.5 border-l-2 border-rule-strong pl-4">
                  {group.rows
                    .filter((r) => r.note)
                    .map((r) => (
                      <li key={r.kana} className="text-sm leading-relaxed text-ink-muted">
                        <span lang="ja" className="font-jp font-medium text-ink">
                          {r.kana}
                        </span>{' '}
                        {r.note}
                      </li>
                    ))}
                </ul>
              )}
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Card({
  row,
  hidden,
  quiz,
  onClick,
}: {
  row: KanaRow;
  hidden: boolean;
  quiz: boolean;
  onClick: () => void;
}) {
  const content = (
    <>
      <span lang="ja" className="block font-jp text-4xl leading-tight text-ink">
        {row.kana}
      </span>
      <span
        className={`mt-2 block transition-opacity duration-200 ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden={hidden}
      >
        <span lang="hi" className="block font-deva text-base leading-tight text-plum-700">
          {row.deva}
        </span>
        <span className="mt-0.5 block text-xs text-ink-faint">{row.romaji}</span>
      </span>
    </>
  );

  const classes =
    'block h-full w-full rounded-lg border border-rule bg-paper-raised px-2 py-4 text-center transition-colors duration-200';

  // The speaker is a sibling of the card, not inside it: in quiz mode the card is
  // itself a button, and buttons cannot nest. It also stays away while the reading
  // is hidden, because hearing the sound would answer the question.
  const speaker = !hidden && (
    <Speak text={row.kana} label={row.kana} size="md" className="absolute right-1 top-1" />
  );

  if (!quiz) {
    return (
      <div className="relative">
        <div className={classes}>{content}</div>
        {speaker}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-label={hidden ? `Reveal reading for ${row.kana}` : `${row.kana} is ${row.romaji}`}
        className={`${classes} cursor-pointer hover:border-sakura-300 hover:bg-sakura-50/40`}
      >
        {content}
      </button>
      {speaker}
    </div>
  );
}

function Toggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-wider text-ink-faint">{label}</span>
      <div className="flex gap-1" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors duration-200
              ${
                value === o.value
                  ? 'btn-primary'
                  : 'text-ink-soft hover:bg-paper-sunk hover:text-ink'
              }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
