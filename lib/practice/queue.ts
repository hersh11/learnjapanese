import type { Script } from '@/lib/data/kana';
import {
  allItems,
  hasReading,
  itemsForLesson,
  itemsForModule,
  kanaItems,
  lessonItems,
  LONG_SENTENCE,
  type Item,
} from './items';
import type { CardState, Direction } from './scheduler';
import { cardKey } from './store';

/** What subset of the deck a session draws from. */
export type Scope =
  | { kind: 'all' }
  | { kind: 'completed'; lessons: string[] }
  | { kind: 'module'; slug: string }
  | { kind: 'lesson'; id: string }
  | { kind: 'kana'; script: Script };

export type Card = {
  key: string;
  item: Item;
  direction: Direction;
  /** Absent for a card that has never been answered. */
  state?: CardState;
};

/**
 * Which questions an item can honestly be asked. Reading and production are
 * different skills, but not every item supports every one of them: there is no
 * reading to hide on a word written in kana, and nobody reproduces a long sentence
 * from its English translation.
 */
export function directionsFor(item: Item): Direction[] {
  switch (item.kind) {
    case 'kana':
      return ['recognise', 'recall'];
    case 'word':
      return hasReading(item)
        ? ['recognise', 'reading', 'recall']
        : ['recognise', 'recall'];
    case 'sentence': {
      const out: Direction[] = ['recognise'];
      if (hasReading(item)) out.push('reading');
      if (item.jp.length <= LONG_SENTENCE) out.push('recall');
      return out;
    }
  }
}

/**
 * Recognition first, always. Being shown 食べる and recalling "eat" is the easiest
 * of the three and the one the other two build on, so it is introduced first and
 * the harder directions follow on later days.
 */
const directionRank: Record<Direction, number> = {
  recognise: 0,
  reading: 1,
  recall: 2,
};

export function itemsInScope(scope: Scope): Item[] {
  switch (scope.kind) {
    case 'all':
      return allItems;
    case 'kana':
      return kanaItems[scope.script];
    case 'module':
      return itemsForModule(scope.slug);
    case 'lesson':
      return itemsForLesson(scope.id);
    case 'completed': {
      const done = new Set(scope.lessons);
      return lessonItems.filter((i) => i.lessons.some((l) => done.has(l)));
    }
  }
}

function expand(
  items: Item[],
  enabled: Direction[],
  cards: Record<string, CardState>
): Card[] {
  const allow = new Set(enabled);
  const out: Card[] = [];
  for (const item of items) {
    for (const direction of directionsFor(item)) {
      if (!allow.has(direction)) continue;
      const key = cardKey(item.id, direction);
      out.push({ key, item, direction, state: cards[key] });
    }
  }
  return out;
}

export type Counts = { due: number; fresh: number; learning: number; known: number };

export function countScope(
  scope: Scope,
  cards: Record<string, CardState>,
  enabled: Direction[],
  now: number = Date.now()
): Counts {
  let due = 0;
  let fresh = 0;
  let learning = 0;
  let known = 0;

  for (const card of expand(itemsInScope(scope), enabled, cards)) {
    if (!card.state) {
      fresh++;
    } else if (card.state.due <= now) {
      due++;
    } else if (card.state.interval >= 21) {
      known++;
    } else {
      learning++;
    }
  }

  return { due, fresh, learning, known };
}

function shuffle<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type QueueOptions = {
  scope: Scope;
  cards: Record<string, CardState>;
  directions: Direction[];
  newAllowance: number;
  maxReviews: number;
  now?: number;
};

/**
 * The session queue: everything due, plus whatever new cards the day's allowance
 * still permits. New cards are spread through the session rather than front-loaded,
 * so a run of unfamiliar material never lands all at once.
 */
export function buildQueue({
  scope,
  cards,
  directions,
  newAllowance,
  maxReviews,
  now = Date.now(),
}: QueueOptions): Card[] {
  const expanded = expand(itemsInScope(scope), directions, cards);

  const due = shuffle(expanded.filter((c) => c.state && c.state.due <= now)).slice(
    0,
    Math.max(0, maxReviews)
  );

  const fresh = expanded
    .filter((c) => !c.state)
    .sort(
      (a, b) =>
        a.item.introducedAt - b.item.introducedAt ||
        directionRank[a.direction] - directionRank[b.direction] ||
        a.item.id.localeCompare(b.item.id)
    )
    .slice(0, Math.max(0, newAllowance));

  if (!fresh.length) return due;
  if (!due.length) return fresh;

  // Weave the new cards evenly through the due ones.
  const out: Card[] = [];
  const gap = due.length / fresh.length;
  let f = 0;
  for (let i = 0; i < due.length; i++) {
    while (f < fresh.length && f * gap <= i) out.push(fresh[f++]);
    out.push(due[i]);
  }
  while (f < fresh.length) out.push(fresh[f++]);

  return out;
}
