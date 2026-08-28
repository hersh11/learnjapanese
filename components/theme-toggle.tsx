'use client';

import { useEffect, useState } from 'react';
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

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {
      // Storage blocked — the theme still applies for this session.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md
                 text-ink-muted transition-colors duration-200
                 hover:bg-paper-sunk hover:text-sakura-600"
      aria-label={ready && dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={ready && dark ? 'Light mode' : 'Dark mode'}
    >
      <span className="h-[1.125rem] w-[1.125rem]">{ready && dark ? <Sun /> : <Moon />}</span>
    </button>
  );
}
