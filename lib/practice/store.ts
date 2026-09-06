'use client';

import { useCallback, useEffect, useState } from 'react';
import { newCard, type CardState, type Direction, type Grade, grade } from './scheduler';

/**
 * Review state lives in the browser alongside lesson progress, under its own key.
 * The two are kept apart deliberately: ticking a lesson off is a statement about
 * reading it, and a review schedule is a statement about remembering it. Merging
 * them would make resetting one destroy the other.
 */

const KEY = 'nihongo-path:review:v1';

export type Settings = {
  /** Cards introduced per day. The single lever that controls workload. */
  newPerDay: number;
  /** Ceiling on due cards per session, so a week away does not produce a wall. */
  maxReviews: number;
  directions: Direction[];
};

export const DEFAULT_SETTINGS: Settings = {
  newPerDay: 10,
  maxReviews: 60,
  directions: ['recognise', 'recall', 'reading'],
};

export type Day = {
  /** Local calendar date, YYYY-MM-DD. */
  date: string;
  introduced: number;
  reviewed: number;
};

export type Streak = {
  current: number;
  longest: number;
  /** Last date a review was answered. */
  last: string | null;
};

export type Review = {
  /** Keyed by `${itemId}|${direction}`. */
  cards: Record<string, CardState>;
  settings: Settings;
  day: Day;
  streak: Streak;
};

export function cardKey(itemId: string, direction: Direction): string {
  return `${itemId}|${direction}`;
}

/** Local date, not UTC — a study day should end when the reader's day does. */
export function today(now: number = Date.now()): string {
  const d = new Date(now);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function yesterday(now: number = Date.now()): string {
  return today(now - 86_400_000);
}

const EMPTY: Review = {
  cards: {},
  settings: DEFAULT_SETTINGS,
  day: { date: '', introduced: 0, reviewed: 0 },
  streak: { current: 0, longest: 0, last: null },
};

function read(now: number = Date.now()): Review {
  if (typeof window === 'undefined') return EMPTY;

  let parsed: Partial<Review> = {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) parsed = JSON.parse(raw) as Partial<Review>;
  } catch {
    // Private browsing, cleared storage, or corrupted JSON — start fresh.
    return { ...EMPTY, day: { date: today(now), introduced: 0, reviewed: 0 } };
  }

  const settings = { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) };
  if (!Array.isArray(settings.directions) || settings.directions.length === 0) {
    settings.directions = DEFAULT_SETTINGS.directions;
  }

  const day = parsed.day ?? EMPTY.day;
  const stamp = today(now);

  return {
    cards: parsed.cards && typeof parsed.cards === 'object' ? parsed.cards : {},
    settings,
    // A new calendar day resets the counters rather than carrying yesterday's over.
    day: day.date === stamp ? day : { date: stamp, introduced: 0, reviewed: 0 },
    streak: { ...EMPTY.streak, ...(parsed.streak ?? {}) },
  };
}

function write(state: Review) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable. The session still works; it just will not persist.
  }
}

const listeners = new Set<() => void>();
const broadcast = () => listeners.forEach((fn) => fn());

/** Advance the streak on the first answer of a day. */
function bumpStreak(streak: Streak, now: number): Streak {
  const stamp = today(now);
  if (streak.last === stamp) return streak;
  const current = streak.last === yesterday(now) ? streak.current + 1 : 1;
  return { current, longest: Math.max(current, streak.longest), last: stamp };
}

export function useReview() {
  // Start from EMPTY so the server render and the first client render agree, then
  // load the real values after mount. Same approach as lesson progress.
  const [state, setState] = useState<Review>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setState(read());
    sync();
    setReady(true);
    listeners.add(sync);
    window.addEventListener('storage', sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  /**
   * Record an answer. Returns the updated card so the caller can show what the
   * grade did without re-reading storage.
   */
  const answer = useCallback(
    (itemId: string, direction: Direction, g: Grade, now: number = Date.now()) => {
      const current = read(now);
      const key = cardKey(itemId, direction);
      const before = current.cards[key];
      const next = grade(before ?? newCard(), g, now);

      write({
        ...current,
        cards: { ...current.cards, [key]: next },
        day: {
          ...current.day,
          introduced: current.day.introduced + (before ? 0 : 1),
          reviewed: current.day.reviewed + 1,
        },
        streak: bumpStreak(current.streak, now),
      });
      broadcast();
      return next;
    },
    []
  );

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    const current = read();
    write({ ...current, settings: { ...current.settings, ...patch } });
    broadcast();
  }, []);

  const reset = useCallback(() => {
    const current = read();
    // Settings are a preference, not progress — a reset should not undo them.
    write({ ...EMPTY, settings: current.settings, day: { date: today(), introduced: 0, reviewed: 0 } });
    broadcast();
  }, []);

  return {
    ready,
    cards: state.cards,
    settings: state.settings,
    day: state.day,
    streak: state.streak,
    answer,
    updateSettings,
    reset,
  };
}
