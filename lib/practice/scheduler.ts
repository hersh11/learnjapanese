/**
 * Spaced repetition, SM-2 with the edges filed off.
 *
 * Three grades rather than Anki's four. The course is scoped deliberately — "enough,
 * and not more" — and a beginner asked to distinguish Hard from Good on a word they
 * met yesterday will guess. Again / Good / Easy is a judgement anyone can make
 * honestly, and honest grading is what the algorithm actually needs.
 *
 * Nothing here touches storage or the DOM, so it is plain and testable.
 */

export type Grade = 'again' | 'good' | 'easy';

/**
 * A card is one item asked in one direction. Reading a word and producing it are
 * genuinely different skills, so they are scheduled apart.
 */
export type Direction = 'recognise' | 'recall' | 'reading';

export type CardState = {
  /** Ease factor. Higher means the interval grows faster. */
  ease: number;
  /** Days until the next review. 0 means it is still being learned today. */
  interval: number;
  /** Consecutive successful reviews. Reset to 0 by a lapse. */
  reps: number;
  /** Epoch ms. Due now or earlier means it is in the queue. */
  due: number;
  /** How many times this card has been forgotten after being learned. */
  lapses: number;
};

export const DAY = 86_400_000;

const EASE_START = 2.5;
const EASE_MIN = 1.3;
const EASE_MAX = 3.0;

/** Capped so a card cannot vanish for years after a run of lucky guesses. */
const MAX_INTERVAL = 365;

export function newCard(): CardState {
  return { ease: EASE_START, interval: 0, reps: 0, due: 0, lapses: 0 };
}

function clampEase(e: number): number {
  return Math.min(EASE_MAX, Math.max(EASE_MIN, Number(e.toFixed(2))));
}

/**
 * The next state after answering. `now` is injected so the caller controls the
 * clock — the UI passes Date.now(), tests pass a fixed value.
 */
export function grade(card: CardState, g: Grade, now: number = Date.now()): CardState {
  if (g === 'again') {
    return {
      ease: clampEase(card.ease - 0.2),
      interval: 0,
      reps: 0,
      // Back in the queue immediately; the session shuffles it in behind others.
      due: now,
      lapses: card.lapses + (card.reps > 0 ? 1 : 0),
    };
  }

  const ease = g === 'easy' ? clampEase(card.ease + 0.15) : card.ease;

  let interval: number;
  if (card.reps === 0) {
    // First success. Easy skips the one-day step, because claiming a card is easy
    // on first sight usually means it was already known coming in.
    interval = g === 'easy' ? 4 : 1;
  } else if (card.reps === 1) {
    interval = g === 'easy' ? 6 : 3;
  } else {
    const bonus = g === 'easy' ? 1.3 : 1;
    interval = Math.round(card.interval * ease * bonus);
  }

  interval = Math.min(MAX_INTERVAL, Math.max(1, interval));

  return {
    ease,
    interval,
    reps: card.reps + 1,
    due: now + interval * DAY,
    lapses: card.lapses,
  };
}

/** Human-readable preview of what each button will do, shown on the buttons. */
export function previewInterval(card: CardState, g: Grade): string {
  if (g === 'again') return 'now';
  const days = grade(card, g, 0).interval;
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} mo`;
  return `${Math.round(days / 365)} yr`;
}

export function isDue(card: CardState, now: number = Date.now()): boolean {
  return card.due <= now;
}

/** A card that has been answered correctly enough to have left the learning phase. */
export function isLearned(card: CardState): boolean {
  return card.reps >= 2 && card.interval >= 3;
}
