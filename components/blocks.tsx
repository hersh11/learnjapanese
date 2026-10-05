import type { Block, Example, VocabItem } from '@/lib/curriculum';
import { kanaSets } from '@/lib/data/kana';
import * as N from '@/lib/data/numbers';
import { speakable } from '@/lib/speakable';
import { AlertTriangle, Languages, Lightbulb } from './icons';
import { Speak } from './speak';

/* --------------------------------- primitives -------------------------------- */

/** Japanese text. Always tagged lang="ja" so the JP face is applied. */
function Jp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span lang="ja" className={className}>
      {children}
    </span>
  );
}

/** Devanagari pronunciation. Visually distinct so it reads as a guide, not content. */
function Deva({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span lang="hi" className={`font-deva text-plum-700 ${className}`}>
      {children}
    </span>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="table-scroll my-7">
      <table className="w-full min-w-[30rem] border-collapse text-left text-[0.9375rem]">
        <thead>
          <tr className="border-b border-rule-strong">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2.5 pr-6 font-medium text-ink-soft">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-rule last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 pr-6 align-top text-ink-soft">
                  <Cell text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Table cells mix scripts freely, so each cell is scanned and the Japanese and
 * Devanagari runs are wrapped in the right face rather than tagging by column.
 */
function Cell({ text }: { text: string }) {
  const parts = text.split(/([　-ヿ一-龯＀-￯]+|[ऀ-ॿ]+)/g);
  return (
    <>
      {parts.filter(Boolean).map((part, i) => {
        if (/[　-ヿ一-龯]/.test(part)) {
          return (
            <Jp key={i} className="font-jp">
              {part}
            </Jp>
          );
        }
        if (/[ऀ-ॿ]/.test(part)) {
          return <Deva key={i}>{part}</Deva>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ----------------------------------- notes ----------------------------------- */

const noteStyles = {
  tip: {
    wrap: 'border-sakura-200 bg-sakura-50/60',
    icon: 'text-sakura-600',
    title: 'text-sakura-900',
    Icon: Lightbulb,
    fallback: 'Tip',
  },
  warn: {
    wrap: 'border-amber-200 bg-amber-50/60',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    Icon: AlertTriangle,
    fallback: 'Watch out',
  },
  hindi: {
    wrap: 'border-teal-200 bg-teal-50/60',
    icon: 'text-teal-600',
    title: 'text-teal-900',
    Icon: Languages,
    fallback: 'For Hindi speakers',
  },
} as const;

function Note({
  tone,
  title,
  text,
}: {
  tone: 'tip' | 'warn' | 'hindi';
  title?: string;
  text: string;
}) {
  const s = noteStyles[tone];
  return (
    <aside className={`my-7 rounded-lg border px-5 py-4 ${s.wrap}`}>
      <div className="flex items-center gap-2.5">
        <span className={`h-4 w-4 shrink-0 ${s.icon}`}>
          <s.Icon />
        </span>
        <h3 className={`text-sm font-semibold ${s.title}`}>{title ?? s.fallback}</h3>
      </div>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
        <Cell text={text} />
      </p>
    </aside>
  );
}

/* ----------------------------------- kana ------------------------------------ */

function KanaGrid({
  script,
  set,
  only,
}: {
  script: 'hiragana' | 'katakana';
  set: 'base' | 'dakuten' | 'youon';
  only?: string[];
}) {
  const all = kanaSets[script][set];
  const groups = only ? all.filter((g) => only.includes(g.id)) : all;
  return (
    <div className="my-7 space-y-6">
      {groups.map((group) => (
        <div key={group.id}>
          <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-ink-faint">
            <Cell text={group.label} />
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {group.rows.map((row) => (
              <div
                key={row.kana}
                className="relative rounded-lg border border-rule bg-paper-raised px-3 py-3 text-center
                           transition-colors duration-200 hover:border-sakura-300 hover:bg-sakura-50/40"
              >
                <Speak text={row.kana} label={row.kana} size="md" className="absolute right-1 top-1" />
                <Jp className="block font-jp text-3xl leading-tight text-ink">{row.kana}</Jp>
                <Deva className="mt-1.5 block text-base leading-tight">{row.deva}</Deva>
                <span className="mt-0.5 block text-xs text-ink-faint">{row.romaji}</span>
              </div>
            ))}
          </div>
          {group.rows.some((r) => r.note) && (
            <ul className="mt-3 space-y-1.5 border-l-2 border-rule-strong pl-4">
              {group.rows
                .filter((r) => r.note)
                .map((r) => (
                  <li key={r.kana} className="text-sm leading-relaxed text-ink-muted">
                    <Jp className="font-jp font-medium text-ink">{r.kana}</Jp>{' '}
                    <Cell text={r.note!} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- numbers ---------------------------------- */

const numberTables = {
  digits: N.digits,
  tens: N.tens,
  large: N.largeNumbers,
  hours: N.hours,
  minutes: N.minutes,
  days: N.daysOfMonth,
  months: N.months,
  weekdays: N.weekdays,
} as const;

function NumberTable({ table }: { table: keyof typeof numberTables }) {
  const rows = numberTables[table];
  return (
    <div className="table-scroll my-7">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
        <thead>
          <tr className="border-b border-rule-strong text-xs uppercase tracking-wider text-ink-faint">
            <th scope="col" className="py-2.5 pr-5 font-medium">Value</th>
            <th scope="col" className="py-2.5 pr-5 font-medium">Kanji</th>
            <th scope="col" className="py-2.5 pr-5 font-medium">Kana</th>
            <th scope="col" className="py-2.5 pr-5 font-medium">Devanagari</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.value + r.kana} className="border-b border-rule last:border-0">
              <td className="py-3 pr-5 align-top font-medium tabular-nums text-ink">{r.value}</td>
              <td className="py-3 pr-5 align-top">
                <Jp className="font-jp text-lg">{r.kanji}</Jp>
              </td>
              <td className="py-3 pr-5 align-top">
                <Jp className="font-jp">{r.kana}</Jp>{' '}
                <Speak text={speakable({ jp: r.kanji, kana: r.kana }, 'word')} label={r.kana} reserve />
              </td>
              <td className="py-3 pr-5 align-top">
                <Deva className="text-base">{r.deva}</Deva>
                {r.note && (
                  <span className="mt-1 block max-w-xs text-xs leading-relaxed text-ink-muted">
                    <Cell text={r.note} />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CounterTable() {
  return (
    <div className="my-7 space-y-3">
      {N.counters.map((c) => (
        <div key={c.counter} className="rounded-lg border border-rule bg-paper-raised px-5 py-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Jp className="font-jp text-xl font-medium text-ink">{c.counter}</Jp>
            <Deva className="text-base">{c.deva}</Deva>
            <span className="text-xs text-ink-faint">{c.reading}</span>
          </div>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{c.usedFor}</p>
          {c.irregulars && (
            <p className="mt-2 border-l-2 border-rule-strong pl-3 text-sm leading-relaxed text-ink-muted">
              <Cell text={c.irregulars} />
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- examples ---------------------------------- */

/**
 * Worked examples run from single words to full sentences, and one layout does not
 * serve both. A list of two-character words in a full-width column leaves most of
 * the measure empty and reads as a thin ribbon of text; a sentence squeezed into
 * half the width wraps badly. So the block picks its own shape: short entries pair
 * up, anything longer keeps the full line.
 */
function isCompact(items: Example[]): boolean {
  return items.every(
    (ex) => ex.jp.length <= 8 && ex.deva.length <= 22 && ex.en.length <= 28
  );
}

function Examples({ items }: { items: Example[] }) {
  const compact = isCompact(items);
  return (
    <ul
      className={
        compact
          ? 'my-7 grid gap-x-10 gap-y-5 sm:grid-cols-2'
          : 'my-7 space-y-4'
      }
    >
      {items.map((ex, i) => (
        <li key={i} className="rule-left">
          <Jp className="block font-jp text-xl leading-snug text-ink">
            {ex.jp}{' '}
            <Speak text={speakable(ex, 'sentence')} label={ex.jp} reserve />
          </Jp>
          {ex.kana && ex.kana !== ex.jp && (
            <Jp className="mt-1 block font-jp text-sm text-ink-muted">{ex.kana}</Jp>
          )}
          <Deva className="mt-1.5 block text-base leading-snug">{ex.deva}</Deva>
          <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-soft">
            {ex.en}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Vocab({ title, items }: { title?: string; items: VocabItem[] }) {
  return (
    <div className="my-7">
      {title && (
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
          {title}
        </h3>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((v, i) => (
          <div
            key={i}
            className="rounded-lg border border-rule bg-paper-raised px-4 py-3
                       transition-colors duration-200 hover:border-sakura-300"
          >
            <div className="flex items-baseline gap-2.5">
              <Jp className="font-jp text-lg font-medium text-ink">{v.jp}</Jp>
              {v.kana && v.kana !== v.jp && (
                <Jp className="font-jp text-xs text-ink-faint">{v.kana}</Jp>
              )}
              <Speak text={speakable(v, 'word')} label={v.jp} reserve className="ml-auto self-center" />
            </div>
            <Deva className="mt-1 block text-[0.9375rem] leading-snug">{v.deva}</Deva>
            <span className="mt-0.5 block text-sm text-ink-muted">{v.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- the renderer ------------------------------- */

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'p':
            return (
              <p key={i} className="my-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                <Cell text={block.text} />
              </p>
            );

          case 'h':
            return (
              <h2
                key={i}
                className="mt-12 mb-4 font-serif text-2xl font-semibold tracking-tight text-ink"
              >
                <Cell text={block.text} />
              </h2>
            );

          case 'note':
            return <Note key={i} tone={block.tone} title={block.title} text={block.text} />;

          case 'list': {
            const List = block.ordered ? 'ol' : 'ul';
            return (
              <List
                key={i}
                className={`my-5 space-y-2.5 pl-5 text-[1.0625rem] leading-[1.7] text-ink-soft ${
                  block.ordered ? 'list-decimal' : 'list-disc'
                } marker:text-ink-faint`}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1.5">
                    <Cell text={item} />
                  </li>
                ))}
              </List>
            );
          }

          case 'kana':
            return (
              <KanaGrid key={i} script={block.script} set={block.set} only={block.groups} />
            );

          case 'numbers':
            return <NumberTable key={i} table={block.table} />;

          case 'counters':
            return <CounterTable key={i} />;

          case 'examples':
            return <Examples key={i} items={block.items} />;

          case 'vocab':
            return <Vocab key={i} title={block.title} items={block.items} />;

          case 'table':
            return <Table key={i} head={block.head} rows={block.rows} />;
        }
      })}
    </>
  );
}
