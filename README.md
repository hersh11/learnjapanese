# Nihongo Path

A free course in Japanese from the first character to JLPT N4, taught in English,
with **Devanagari pronunciation guides** throughout.

No account, no tracking. Progress is kept in the browser's local storage.

## Why Devanagari

Most Japanese courses explain sounds through English spelling, which fits badly.
Devanagari already encodes the distinctions Japanese needs:

| Kana | Romaji | What English readers say | Devanagari |
|------|--------|--------------------------|------------|
| つ | tsu | two sounds, t + su | त्सु (one sound) |
| ら | ra | English R | र (a single flap) |
| た | ta | retroflex, aspirated | त (dental, light) |
| きって | kitte | a doubled letter | कित्ते (a held beat) |

Grammar benefits too: Japanese and Hindi are both subject-object-verb with
postpositions, so particles map closely onto को / में / से.

## Contents

- **43 lessons** across five modules: kana and pronunciation, numbers and
  counters, core grammar, N5 kanji, and N4 (plain form through keigo)
- **5 articles** on study method and what the JLPT actually measures
- **Kana chart** with a quiz mode
- **Spaced review** over every word, sentence and kana character in the course

## Practice

`/practice` schedules review with SM-2, graded Again / Good / Easy. Cards are
derived from the curriculum rather than authored separately: every `vocab` and
`examples` block a lesson contains becomes one, so there is no second list to keep
in sync.

Each item is asked in up to three directions, scheduled independently, because
reading a word and producing it are different skills:

| Direction | Shown | Recall |
|-----------|-------|--------|
| Meaning | 食べる | what it means |
| Reading | 食べる | たべる (only where kanji hides a reading) |
| Production | "to eat" | 食べる |

Kana is asked as sound ⇄ character, with the sound in Devanagari rather than
romaji. Long sentences are recognition-only — nobody reproduces a thirty-character
sentence from its translation.

New cards are introduced in course order (hiragana, then katakana, then lesson
material) at a rate you set, defaulting to ten a day.

## Running it

```bash
npm install
npm run dev
```

Build a static site into `out/`:

```bash
npm run build
```

The export is fully static. It deploys to Vercel, Netlify, GitHub Pages or any
static host with no server.

## Fonts

The Japanese and Devanagari faces are self-hosted and cut down to the characters
the course actually uses: 388 Japanese and 46 Devanagari. Google Fonts would
otherwise split each Japanese face into ~120 slices, which cost this site 868
`@font-face` rules (236 KB gzipped of render-blocking CSS on every page) and up
to 630 KB of font files per page.

| | Before | After |
|---|---|---|
| Font CSS per page (gzipped) | 236 KB | 9 KB |
| Fonts, cold load of a kanji lesson | 566 KB | 305 KB |
| Fonts across home plus four lessons | 989 KB | 331 KB |

Rendering is unchanged: every Japanese and Devanagari string on the site was
compared pixel for pixel against the fonts the site used before.

**If you add copy with a character the fonts do not have, regenerate them:**

```bash
npm run fonts
```

That fetches fresh subsets from the Google Fonts API into `app/fonts/` and rewrites
`app/fonts.ts`; commit both. You cannot forget: `npm run build` runs
`scripts/check-fonts.mjs` first, which reads each font file's character map and
refuses to build if the copy uses anything missing, naming the characters.

## Stack

Next.js (App Router, static export) · Tailwind CSS · Framer Motion · TypeScript.

Lesson content lives in `lib/curriculum/` as typed blocks rather than MDX, so the
kana and number tables are referenced by key instead of duplicated, and a typo in a
table name fails at build time.

## Themes

Light is sakura pink on white; dark is neon pink on true OLED black. Both follow the
system preference by default and can be toggled in the header. Every colour token is
checked to at least 4.5:1 contrast against its background.

## Caveats

No audio and no speaking practice, so pair this with a source of spoken Japanese.

Review only covers `vocab` and `examples` blocks. Material taught in `table`
blocks — the て form conjugations, the counter mutations, most of the N4 endings —
is not yet drillable, which leaves out a good deal of what the course teaches.

Corrections are welcome, particularly on the Devanagari readings, where several
mappings are judgement calls.
