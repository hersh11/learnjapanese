import type { Script } from '@/lib/data/kana';

/** A worked example sentence or word. */
export type Example = {
  jp: string;
  kana?: string;
  deva: string;
  en: string;
};

export type VocabItem = {
  jp: string;
  kana?: string;
  deva: string;
  en: string;
};

/**
 * Lesson bodies are arrays of typed blocks rather than MDX. Content stays in
 * TypeScript so the kana and number tables can be referenced by key instead of
 * duplicated per lesson, and so a typo in a table name fails at build time.
 */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'note'; tone: 'tip' | 'warn' | 'hindi'; title?: string; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  /**
   * `groups` narrows the chart to specific rows by id (e.g. ['ta','na','ha']) so a
   * lesson introducing three rows does not print the whole alphabet. Omit for all.
   */
  | { kind: 'kana'; script: Script; set: 'base' | 'dakuten' | 'youon'; groups?: string[] }
  | {
      kind: 'numbers';
      table: 'digits' | 'tens' | 'large' | 'hours' | 'minutes' | 'days' | 'months' | 'weekdays';
    }
  | { kind: 'counters' }
  | { kind: 'examples'; items: Example[] }
  | { kind: 'vocab'; title?: string; items: VocabItem[] }
  | { kind: 'table'; head: string[]; rows: string[][] };

export type Lesson = {
  slug: string;
  title: string;
  /** One line shown in listings and at the top of the lesson. */
  summary: string;
  minutes: number;
  body: Block[];
};

export type Module = {
  slug: string;
  title: string;
  level: 'N5' | 'N4';
  /** Kanji-only label used as a quiet visual marker. */
  marker: string;
  summary: string;
  lessons: Lesson[];
  /** Set when the module is planned but not yet written. */
  upcoming?: boolean;
  /** Titles of the lessons still to come, for scaffolded modules. */
  plannedLessons?: string[];
};
