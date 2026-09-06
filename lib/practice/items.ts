import { modules } from '@/lib/curriculum';
import { kanaSets, type Script } from '@/lib/data/kana';

/**
 * The review deck is derived from the curriculum rather than authored separately.
 * Every `vocab` and `examples` block a lesson already contains becomes a card, so
 * writing a lesson is the only place content is entered — there is no second list
 * to keep in sync, and nothing can drift.
 */

export type ItemKind = 'kana' | 'word' | 'sentence';

export type Item = {
  /**
   * Stable across content edits as long as the Japanese text is unchanged, which
   * matters because scheduling state is keyed on it. Reordering lessons, retitling
   * a module or moving a word between lessons all leave the id intact.
   */
  id: string;
  kind: ItemKind;
  jp: string;
  /** Reading in kana. Absent when `jp` is already kana-only. */
  kana?: string;
  deva: string;
  en: string;
  /** Lessons this item appears in, in course order. The first one unlocks it. */
  lessons: string[];
  /**
   * Position in the course. Lesson items carry their lesson's index; kana sit in
   * their own ranges below zero (see `KANA_ORDER`). New cards are introduced in
   * this order, so it decides what a reader meets first.
   */
  introducedAt: number;
};

const KANJI = /[一-鿿]/;

/** Whether asking for the reading is a real question — it needs kanji to hide. */
export function hasReading(item: Item): boolean {
  return Boolean(item.kana && item.kana !== item.jp && KANJI.test(item.jp));
}

function idFor(kind: ItemKind, jp: string): string {
  return `${kind[0]}:${jp}`;
}

/**
 * Sentences over roughly this length are worth reading but not worth drilling as
 * recall cards — nobody reproduces a 30-character sentence from its translation.
 * They are kept for recognition only.
 */
export const LONG_SENTENCE = 24;

function build(): Item[] {
  const byId = new Map<string, Item>();
  let order = 0;

  const add = (
    kind: ItemKind,
    raw: { jp: string; kana?: string; deva: string; en: string },
    lesson: string,
    at: number
  ) => {
    const jp = raw.jp.trim();
    if (!jp || !raw.en.trim() || !raw.deva.trim()) return;

    const id = idFor(kind, jp);
    const existing = byId.get(id);
    if (existing) {
      // The same word taught again in a later lesson: keep the first definition,
      // record the extra lesson so per-lesson decks can still find it.
      if (!existing.lessons.includes(lesson)) existing.lessons.push(lesson);
      return;
    }

    byId.set(id, {
      id,
      kind,
      jp,
      kana: raw.kana?.trim() || undefined,
      deva: raw.deva.trim(),
      en: raw.en.trim(),
      lessons: [lesson],
      introducedAt: at,
    });
  };

  for (const m of modules) {
    for (const l of m.lessons) {
      const lesson = `${m.slug}/${l.slug}`;
      const at = order++;

      for (const block of l.body) {
        if (block.kind === 'vocab') {
          for (const v of block.items) add('word', v, lesson, at);
        } else if (block.kind === 'examples') {
          for (const e of block.items) add('sentence', e, lesson, at);
        }
      }
    }
  }

  return [...byId.values()];
}

/**
 * New cards are introduced in `introducedAt` order, so kana has to sort ahead of
 * every lesson item, and hiragana ahead of katakana. Lesson items are numbered
 * from 0 by lesson index, so the two kana ranges sit below zero — otherwise あ and
 * ア arrive on the same day, which is the opposite of how the course teaches them.
 */
const KANA_ORDER: Record<Script, number> = { hiragana: -2000, katakana: -1000 };

/** Kana cards are their own deck: they are reference data, not lesson content. */
function buildKana(script: Script): Item[] {
  const sets = kanaSets[script];
  const out: Item[] = [];
  const seen = new Set<string>();
  let order = KANA_ORDER[script];

  for (const set of ['base', 'dakuten', 'youon'] as const) {
    for (const group of sets[set]) {
      for (const row of group.rows) {
        const id = idFor('kana', row.kana);
        if (seen.has(id)) continue;
        seen.add(id);
        out.push({
          id,
          kind: 'kana',
          jp: row.kana,
          deva: row.deva,
          en: row.romaji,
          lessons: [],
          introducedAt: order++,
        });
      }
    }
  }

  return out;
}

export const lessonItems: Item[] = build();

export const kanaItems: Record<Script, Item[]> = {
  hiragana: buildKana('hiragana'),
  katakana: buildKana('katakana'),
};

export const allItems: Item[] = [
  ...kanaItems.hiragana,
  ...kanaItems.katakana,
  ...lessonItems,
];

const index = new Map(allItems.map((i) => [i.id, i]));

export function getItem(id: string): Item | undefined {
  return index.get(id);
}

/** Items a given lesson introduces or revisits, for its "review this lesson" deck. */
export function itemsForLesson(lesson: string): Item[] {
  return lessonItems.filter((i) => i.lessons.includes(lesson));
}

export function itemsForModule(moduleSlug: string): Item[] {
  return lessonItems.filter((i) => i.lessons.some((l) => l.startsWith(`${moduleSlug}/`)));
}

export const itemCounts = {
  words: lessonItems.filter((i) => i.kind === 'word').length,
  sentences: lessonItems.filter((i) => i.kind === 'sentence').length,
  kana: kanaItems.hiragana.length + kanaItems.katakana.length,
};
