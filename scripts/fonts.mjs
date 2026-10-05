/**
 * Regenerate the self-hosted font subsets: `npm run fonts`.
 *
 * Why this exists: Google Fonts splits a Japanese face into ~120 unicode-range
 * slices so any page in the language can load only what it needs. That is the
 * right trade for an unknown page. This site is not unknown — it uses under four
 * hundred Japanese characters in total, all of them written in this repo — and the
 * general solution cost it 868 @font-face rules (236 KB gzipped of render-blocking
 * CSS on every page) plus 240–630 KB of font files per page.
 *
 * So each face is cut down to exactly the characters the copy uses, fetched from
 * the Google Fonts API (which subsets server-side and keeps the shaping data that
 * Devanagari conjuncts need), checked against its own cmap, and written to
 * app/fonts/ along with app/fonts.ts, the module that declares it.
 *
 * Run it after changing copy that introduces a character the fonts lack.
 * `npm run build` runs scripts/check-fonts.mjs first and will say when.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FONT_DIR, FONT_MODULE, fontPlan, toText, toUnicodeRange } from './glyphs.mjs';
import { inspect } from './woff2.mjs';

// The API serves WOFF2 only to browsers it knows support it.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

const LICENCES = {
  'Noto Serif JP': 'notoserifjp',
  'Noto Sans JP': 'notosansjp',
  'Noto Sans Devanagari': 'notosansdevanagari',
};

/**
 * One request per file. Asking for several weights at once gets a single variable
 * file shared by all of them, which is exactly what the static slices avoid.
 */
async function download(family, wght, chars) {
  const url =
    'https://fonts.googleapis.com/css2?family=' +
    family.replace(/ /g, '+') +
    `:wght@${wght}&text=${encodeURIComponent(toText(chars))}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${family} ${wght}: Google Fonts API returned ${res.status}`);
  const urls = [...(await res.text()).matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]);
  if (urls.length !== 1) throw new Error(`${family} ${wght}: expected one file, got ${urls.length}`);
  const font = await fetch(urls[0]);
  if (!font.ok) throw new Error(`${family} ${wght}: font download returned ${font.status}`);
  return Buffer.from(await font.arrayBuffer());
}

/** One localFont() call. Values must be literals: next/font reads them at compile time. */
function declaration(name, slice, opts) {
  let src;
  if (opts.faces) {
    src = `[\n${opts.faces.map((w) => `    { path: './fonts/${slice.files[0].file}', weight: '${w}' },`).join('\n')}\n  ]`;
  } else if (slice.variable) {
    src = `'./fonts/${slice.files[0].file}'`;
  } else {
    src = `[\n${slice.files.map((f) => `    { path: './fonts/${f.file}', weight: '${f.weight}' },`).join('\n')}\n  ]`;
  }
  return [
    `/** ${slice.role} */`,
    `export const ${name} = localFont({`,
    `  src: ${src},`,
    slice.variable && !opts.faces ? `  weight: '${slice.variable.replace('..', ' ')}',` : null,
    `  variable: '${opts.variable}',`,
    `  display: 'swap',`,
    `  preload: ${opts.preload},`,
    `  adjustFontFallback: ${opts.fallback ? `'${opts.fallback}'` : 'false'},`,
    `  declarations: [{ prop: 'unicode-range', value: '${slice.range}' }],`,
    `});`,
  ]
    .filter(Boolean)
    .join('\n');
}

async function main() {
  mkdirSync(FONT_DIR, { recursive: true });
  // Start clean so a renamed or dropped slice cannot leave an orphan behind.
  for (const f of readdirSync(FONT_DIR)) if (f.endsWith('.woff2')) rmSync(join(FONT_DIR, f));

  const plan = fontPlan().filter((sl) => sl.chars.size > 0);
  const manifest = { generatedBy: 'scripts/fonts.mjs', files: {} };

  for (const slice of plan) {
    const requested = [...slice.chars];
    let drawnEverywhere = new Set(requested);
    const gaps = new Set();

    for (const f of slice.files) {
      const wght = slice.variable ?? String(f.weight);
      const data = await download(slice.family, wght, slice.chars);
      const path = join(FONT_DIR, f.file);
      writeFileSync(path, data);

      const { coverage, axes } = inspect(path);
      const axis = axes.find((a) => a.tag === 'wght');
      if (slice.variable) {
        const [lo, hi] = slice.variable.split('..').map(Number);
        if (!axis || axis.min > lo || axis.max < hi)
          throw new Error(`${f.file}: no weight axis covering ${slice.variable}`);
      } else if (axis && axis.min !== axis.max) {
        throw new Error(`${f.file}: asked for a static ${f.weight}, got a variable file`);
      }

      const drawn = requested.filter((c) => coverage.has(c.codePointAt(0)));
      // Characters the upstream face does not have. They fall through to the next
      // font in the stack exactly as before, so they are recorded rather than fatal,
      // and the build check does not ask for them again.
      for (const c of requested) if (!coverage.has(c.codePointAt(0))) gaps.add(c);
      drawnEverywhere = new Set(drawn.filter((c) => drawnEverywhere.has(c)));

      manifest.files[f.file] = {
        family: slice.family,
        weight: slice.variable ?? f.weight,
        glyphs: drawn.length,
        bytes: data.length,
      };
      console.log(
        `${f.file.padEnd(32)} ${String(drawn.length).padStart(4)} glyphs ` +
          `${(data.length / 1024).toFixed(1).padStart(7)} KB  ` +
          (axis && axis.min !== axis.max ? `variable ${axis.min}–${axis.max}` : `static ${f.weight}`)
      );
    }

    slice.range = toUnicodeRange(drawnEverywhere);
    for (const f of slice.files) manifest.files[f.file].gaps = toText(gaps);
    if (gaps.size) console.log(`  ${slice.slice}: the font itself lacks ${toText(gaps)}`);
  }

  const by = Object.fromEntries(plan.map((sl) => [sl.slice, sl]));
  const extra = by['noto-serif-jp-extra'];

  const module = `/**
 * GENERATED by scripts/fonts.mjs. Do not edit by hand; run \`npm run fonts\`.
 *
 * Each face is subset to the characters this site actually uses and self-hosted,
 * replacing the ~120 unicode-range slices per Japanese face that Google Fonts
 * would otherwise declare. The serif is split three ways because it draws mostly
 * Latin: Latin glyphs; the Japanese it is known to draw (the 道 mark, module
 * markers, titles); and every other Japanese glyph, as a safety net that only
 * downloads if a page needs one. unicode-range stops the browser from fetching a
 * file that cannot help the text in front of it.
 *
 * \`npm run build\` refuses to run if the copy uses a character these files lack.
 */
import localFont from 'next/font/local';

${declaration('serifLatin', by['noto-serif-jp-latin'], {
  variable: '--font-serif',
  preload: true,
  fallback: 'Times New Roman',
})}

${declaration('serifJapanese', by['noto-serif-jp-core'], {
  variable: '--font-serif-jp',
  preload: false,
})}
${
  extra
    ? `\n${declaration('serifJapaneseExtra', extra, { variable: '--font-serif-jp-extra', preload: false })}\n`
    : ''
}
/**
 * Two faces over one file. The design sets Japanese at 400 and 500 and, inside
 * semibold headings, 600. There has never been a 600 face, so the browser has
 * always rounded 600 up to 700; declaring 700 on its own keeps those headings
 * rendering exactly as they did, rather than quietly drawing them lighter.
 */
${declaration('sansJapanese', by['noto-sans-jp'], {
  variable: '--font-jp',
  preload: false,
  fallback: 'Arial',
  faces: ['400 500', '700'],
})}

${declaration('devanagari', by['noto-sans-devanagari'], {
  variable: '--font-deva',
  preload: false,
  fallback: 'Arial',
})}

export const fontVariables = [
  serifLatin,
  serifJapanese,${extra ? '\n  serifJapaneseExtra,' : ''}
  sansJapanese,
  devanagari,
]
  .map((f) => f.variable)
  .join(' ');
`;
  writeFileSync(FONT_MODULE, module);
  writeFileSync(join(FONT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  // The Noto faces are SIL OFL 1.1, which asks that the licence travel with them.
  for (const [family, dir] of Object.entries(LICENCES)) {
    const res = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${dir}/OFL.txt`);
    if (res.ok) writeFileSync(join(FONT_DIR, `OFL-${family.replace(/ /g, '')}.txt`), await res.text());
    else console.warn(`warning: could not fetch the licence for ${family} (${res.status})`);
  }

  const total = Object.values(manifest.files).reduce((s, f) => s + f.bytes, 0);
  const count = Object.keys(manifest.files).length;
  console.log(`\nwrote ${count} files (${(total / 1024).toFixed(0)} KB across all weights) and app/fonts.ts`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
