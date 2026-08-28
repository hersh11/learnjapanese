'use client';

import { useCallback, useEffect, useState } from 'react';
import { lessonOrder, type LessonRef } from '@/lib/curriculum';

/**
 * Progress lives entirely in the browser — no account, no server, nothing to sign
 * into. The trade-off is that it does not follow the reader to another device, so
 * the UI never implies it will.
 */

const KEY = 'nihongo-path:progress:v1';

type State = {
  completed: string[];
  last: string | null;
};

const EMPTY: State = { completed: [], last: null };

function read(): State {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      last: typeof parsed.last === 'string' ? parsed.last : null,
    };
  } catch {
    // Private browsing, cleared storage, or corrupted JSON — start fresh.
    return EMPTY;
  }
}

function write(state: State) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable. Progress simply will not persist this session.
  }
}

const listeners = new Set<() => void>();

function broadcast() {
  listeners.forEach((fn) => fn());
}

export function useProgress() {
  // Always start from EMPTY so server and first client render agree, then load
  // real values after mount. Avoids a hydration mismatch on the static export.
  const [state, setState] = useState<State>(EMPTY);
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

  const toggle = useCallback((id: string) => {
    const current = read();
    const completed = current.completed.includes(id)
      ? current.completed.filter((x) => x !== id)
      : [...current.completed, id];
    write({ ...current, completed });
    broadcast();
  }, []);

  const visit = useCallback((id: string) => {
    const current = read();
    if (current.last === id) return;
    write({ ...current, last: id });
    broadcast();
  }, []);

  const reset = useCallback(() => {
    write(EMPTY);
    broadcast();
  }, []);

  const completedCount = state.completed.length;
  const total = lessonOrder.length;

  return {
    ready,
    completed: state.completed,
    completedCount,
    total,
    percent: total ? Math.round((completedCount / total) * 100) : 0,
    isComplete: (id: string) => state.completed.includes(id),
    toggle,
    visit,
    reset,
    resume: resumeTarget(state),
  };
}

/**
 * Where "Continue" should go: the lesson after the furthest completed one, or the
 * last lesson opened, or the very beginning for a new reader.
 */
function resumeTarget(state: State): { ref: LessonRef; fresh: boolean } {
  if (state.completed.length) {
    let furthest = -1;
    for (const id of state.completed) {
      const i = lessonOrder.findIndex((r) => r.id === id);
      if (i > furthest) furthest = i;
    }
    const next = lessonOrder[furthest + 1];
    if (next) return { ref: next, fresh: false };
    // Everything is done — send them back to the last lesson.
    return { ref: lessonOrder[lessonOrder.length - 1], fresh: false };
  }

  if (state.last) {
    const ref = lessonOrder.find((r) => r.id === state.last);
    if (ref) return { ref, fresh: false };
  }

  return { ref: lessonOrder[0], fresh: true };
}
