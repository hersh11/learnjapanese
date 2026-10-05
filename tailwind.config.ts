import type { Config } from 'tailwindcss';

/**
 * Every colour resolves through a CSS variable holding an RGB triplet, so the dark
 * theme is a single block of redefinitions in globals.css rather than a `dark:`
 * variant on every element. The scales are deliberately *inverted* under .dark —
 * step 700 is the brightest there — so a class like `text-sakura-700` stays legible
 * in both themes without being rewritten.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const scale = (name: string) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => [
      step,
      v(`${name}-${step}`),
    ])
  );

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: v('paper'),
          raised: v('paper-raised'),
          sunk: v('paper-sunk'),
          deep: v('paper-deep'),
        },
        ink: {
          DEFAULT: v('ink'),
          soft: v('ink-soft'),
          muted: v('ink-muted'),
          faint: v('ink-faint'),
        },
        rule: {
          DEFAULT: v('rule'),
          strong: v('rule-strong'),
        },
        /** Primary — links, actions, progress, tips. */
        sakura: scale('sakura'),
        /** Deep rose. Japanese script markers and quiet decoration. */
        plum: scale('plum'),
        /** The "for Hindi speakers" callouts. */
        teal: scale('teal'),
        /** Warnings. */
        amber: scale('amber'),
      },
      fontFamily: {
        serif: [
          'var(--font-serif)',
          'var(--font-serif-jp)',
          'var(--font-serif-jp-extra)',
          'Noto Serif JP',
          'Georgia',
          'serif',
        ],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        jp: ['var(--font-jp)', 'Noto Sans JP', 'sans-serif'],
        deva: ['var(--font-deva)', 'Noto Sans Devanagari', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
