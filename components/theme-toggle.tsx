'use client';

import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from './icons';

export const THEME_KEY = 'nihongo-path:theme';

/**
 * Runs before paint (injected into <head>) so the correct theme is on <html>
 * before the first frame — otherwise a dark-mode reader gets a white flash.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('${THEME_KEY}');
    var dark = stored ? stored === 'dark'
                      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

const isDarkNow = () =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark');

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  // Read the real DOM state rather than trusting local state, so the button can
  // never disagree with what the page is actually showing.
  const sync = useCallback(() => setDark(isDarkNow()), []);

  useEffect(() => {
    sync();
    setReady(true);

    // Another tab changed the preference.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return;
      const next = e.newValue
        ? e.newValue === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', next);
      setDark(next);
    };

    // The OS theme changed and the reader has not overridden it here.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystem = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {
        /* storage blocked — fall through to following the system */
      }
      if (stored) return;
      document.documentElement.classList.toggle('dark', e.matches);
      setDark(e.matches);
    };

    // Keeps the icon correct if the class is changed by anything else.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('storage', onStorage);
    mq.addEventListener('change', onSystem);
    return () => {
      window.removeEventListener('storage', onStorage);
      mq.removeEventListener('change', onSystem);
      observer.disconnect();
    };
  }, [sync]);

  const toggle = () => {
    const next = !isDarkNow();
    document.documentElement.classList.toggle('dark', next);
    setDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {
      // Storage blocked — the theme still applies for this session.
    }
  };

  const label = ready && dark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggle}
      className="tap flex h-11 w-11 cursor-pointer items-center justify-center rounded-md
                 border border-transparent text-ink-muted transition-colors duration-200
                 hover:border-rule hover:bg-paper-sunk hover:text-sakura-600"
      aria-label={label}
      title={label}
    >
      <span className="pointer-events-none h-[1.125rem] w-[1.125rem]">
        {ready && dark ? <Sun /> : <Moon />}
      </span>
    </button>
  );
}
