# Nihongo Path

A free course in Japanese from the first character to JLPT N4 — taught in English,
with **Devanagari pronunciation guides** throughout.

No account, no tracking. Progress is kept in the browser's local storage.

## Why Devanagari

Most Japanese courses explain sounds through English spelling, which fits badly.
Devanagari already encodes the distinctions Japanese needs:

| Kana | Romaji | What English readers say | Devanagari |
|------|--------|--------------------------|------------|
| つ | tsu | two sounds, t + su | त्सु — one sound |
| ら | ra | English R | र — a single flap |
| た | ta | retroflex, aspirated | त — dental, light |
| きって | kitte | a doubled letter | कित्ते — a held beat |

Grammar benefits too: Japanese and Hindi are both subject–object–verb with
postpositions, so particles map closely onto को / में / से.

## Contents

- **32 lessons** across five modules — kana and pronunciation, numbers and
  counters, core grammar, N5 kanji, and N4 (plain form through keigo)
- **5 articles** on study method and what the JLPT actually measures
- **Kana chart** with a quiz mode

## Running it

```bash
npm install
npm run dev
```

Build a static site into `out/`:

```bash
npm run build
```

The export is fully static — it deploys to Vercel, Netlify, GitHub Pages or any
static host with no server.

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

No audio, no speaking practice, and no spaced-repetition scheduler — pair this with
a review app and a source of spoken Japanese.

Corrections are welcome, particularly on the Devanagari readings, where several
mappings are judgement calls.
