/**
 * What the site's text needs from its fonts.
 *
 * Shared by the generator (scripts/fonts.mjs) and the build check
 * (scripts/check-fonts.mjs), so the two can never disagree about what "used" means.
 * The scan is over source, not rendered pages: every character the course can show
 * is written somewhere under app/, components/ or lib/, and reading the files is
 * fast, deterministic and needs no browser.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const FONT_DIR = join(ROOT, 'app', 'fonts');
export const FONT_MODULE = join(ROOT, 'app', 'fonts.ts');

const SOURCE_DIRS = ['app', 'components', 'lib'];

const JP = /[　-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿＀-￯]/u;
const DEVA = /[ऀ-ॿ꣠-ꣿ]/u;
/**
 * Latin-script characters past ASCII and Latin-1 that are worth carrying when the
 * copy uses them: curly quotes, dashes, the ellipsis, arrows, ×, ₹, ː.
 */
const LATIN_EXTRA =
  /[Ā-ɏʰ-˿ -⁯₠-⃏℀-⅏←-⇿∀-⋿■-◿]/u;

const span = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i));

/** Printable ASCII and Latin-1. Carried whole: cheap, and copy edits reach for it. */
export const LATIN_BASE = [...span(0x20, 0x7e), ...span(0xa0, 0xff)];

/**
 * Zero-width joiners steer Devanagari conjuncts, and the dotted circle is what a
 * shaper draws under a vowel sign shown on its own — which the vowel tables do.
 */
const DEVA_SUPPORT = ['‌', '‍', '◌'];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

export function sourceFiles() {
  return SOURCE_DIRS.flatMap((d) => walk(join(ROOT, d))).filter(
    // The generated font module holds unicode-range strings, not copy.
    (f) => /\.(ts|tsx)$/.test(f) && f !== FONT_MODULE
  );
}

/**
 * Regex character classes such as `[一-龯]` or `[ऀ-ॿ]` name Unicode ranges by their
 * endpoints. Those endpoints are code, not copy — nobody reads 龯 — but a plain
 * character scan would count them. Copy never writes a bracketed range between two
 * non-ASCII characters, so removing exactly that shape is safe.
 *
 * Any other non-ASCII character in a regex should be written as a \u escape,
 * e.g. /[（）]/ rather than the characters themselves, so the scan never
 * mistakes it for copy and demands glyphs nobody reads.
 */
const SCRIPT_RANGE = /\[[^\]\n]*[^\x00-\x7f]-[^\x00-\x7f][^\]\n]*\]/g;

/** Literal text directly inside a JSX element whose classes include font-serif. */
const SERIF_ELEMENT_TEXT = /<[A-Za-z][^>]*\bfont-serif\b[^>]*>([^<{]*)/g;

/** String literals assigned to one of the given keys, e.g. `title: '…'`. */
function literalsFor(text, keys) {
  const re = new RegExp(`\\b(?:${keys.join('|')})\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, 'g');
  return [...text.matchAll(re)].map((m) => m[2]);
}

export function scan() {
  const jp = new Set();
  const deva = new Set();
  const latinExtra = new Set();
  /**
   * Japanese drawn in the serif face: text written directly inside an element
   * classed `font-serif` (the 道 mark, 始めましょう, the 404 page), plus title and
   * marker strings, which the layouts set in serif. Everything else Japanese is
   * set in the sans. This list only decides what loads first; a glyph it misses
   * still renders, from the serif's extra slice, at the cost of a download.
   */
  const serifUsed = new Set();

  for (const file of sourceFiles()) {
    const text = readFileSync(file, 'utf8').replace(SCRIPT_RANGE, '');

    for (const ch of text) {
      if (JP.test(ch)) jp.add(ch);
      else if (DEVA.test(ch)) deva.add(ch);
      else if (LATIN_EXTRA.test(ch)) latinExtra.add(ch);
    }

    if (file.endsWith('.tsx'))
      for (const m of text.matchAll(SERIF_ELEMENT_TEXT))
        for (const ch of m[1]) if (JP.test(ch)) serifUsed.add(ch);

    for (const s of literalsFor(text, ['title', 'marker']))
      for (const ch of s) if (JP.test(ch)) serifUsed.add(ch);

    // A pronunciation guide renders whole in the Devanagari face, punctuation and
    // modifier letters (ː) included, not just the Devanagari block.
    for (const s of literalsFor(text, ['deva'])) for (const ch of s) deva.add(ch);
  }

  return { jp, deva, latinExtra, serifUsed };
}

/**
 * Every font file the site serves and the characters each must carry.
 *
 * Google returns the full weight axis for a variable font whatever range is asked
 * for, so a variable file costs roughly three static weights. That pays off only
 * where a page draws several weights at once, which is true of Japanese body text
 * (400 and 500 together on most lessons) and of nothing else. The serif draws its
 * Japanese at 400 (the 道 mark) and 600 (titles); Devanagari only ever at 400.
 * Those get one static file per weight, and a page downloads just the weights it
 * renders.
 *
 * Weights mirror what the site declared before self-hosting, minus 700 on the
 * serif, which nothing uses. Nothing on the site is bold.
 */
export const FAMILY_WEIGHTS = {
  'Noto Serif JP': [400, 500, 600],
  'Noto Sans JP': [400, 500, 700],
  'Noto Sans Devanagari': [400, 500, 600],
};

export function fontPlan(s = scan()) {
  const latin = new Set([...LATIN_BASE, ...s.latinExtra]);
  const serifExtra = new Set([...s.jp].filter((c) => !s.serifUsed.has(c)));

  const slices = [
    {
      // Variable despite the rule above: next/font preloads every file a face
      // declares, and every page has a heading, so one preloaded file serving all
      // three weights beats three static files of which only one or two get used.
      slice: 'noto-serif-jp-latin',
      family: 'Noto Serif JP',
      variable: '400..600',
      chars: latin,
      role: 'Serif headings, Latin. Preloaded: every page has a heading.',
    },
    {
      slice: 'noto-serif-jp-core',
      family: 'Noto Serif JP',
      weights: FAMILY_WEIGHTS['Noto Serif JP'],
      chars: s.serifUsed,
      role: 'Serif Japanese the design is known to draw: the 道 mark, module markers, titles.',
    },
    {
      slice: 'noto-serif-jp-extra',
      family: 'Noto Serif JP',
      weights: FAMILY_WEIGHTS['Noto Serif JP'],
      chars: serifExtra,
      role: 'Every other Japanese glyph, in serif. A safety net: fetched only if a page needs one.',
    },
    {
      slice: 'noto-sans-jp',
      family: 'Noto Sans JP',
      variable: '400..700',
      chars: new Set([...latin, ...s.jp]),
      role: 'All Japanese body text, every weight in one file.',
    },
    {
      slice: 'noto-sans-devanagari',
      family: 'Noto Sans Devanagari',
      weights: FAMILY_WEIGHTS['Noto Sans Devanagari'],
      chars: new Set([...s.deva, ...span(0x20, 0x7e), ...DEVA_SUPPORT]),
      role: 'Pronunciation guides.',
    },
  ];

  // Files each slice produces: one per static weight, or one variable file.
  for (const sl of slices) {
    sl.files = sl.variable
      ? [{ file: `${sl.slice}.woff2`, serves: FAMILY_WEIGHTS[sl.family] }]
      : sl.weights.map((w) => ({ file: `${sl.slice}-${w}.woff2`, weight: w, serves: [w] }));
  }
  return slices;
}

/* ------------------------------- set helpers ------------------------------- */

export const codepoints = (chars) =>
  [...new Set([...chars].map((c) => c.codePointAt(0)))].sort((a, b) => a - b);

export const toText = (chars) => codepoints(chars).map((c) => String.fromCodePoint(c)).join('');

/** Collapse codepoints into the shortest `U+…` list a unicode-range accepts. */
export function toUnicodeRange(chars) {
  const cps = codepoints(chars);
  const out = [];
  for (let i = 0; i < cps.length; i++) {
    let j = i;
    while (j + 1 < cps.length && cps[j + 1] === cps[j] + 1) j++;
    const hex = (n) => n.toString(16).toUpperCase();
    out.push(i === j ? `U+${hex(cps[i])}` : `U+${hex(cps[i])}-${hex(cps[j])}`);
    i = j;
  }
  return out.join(', ');
}
