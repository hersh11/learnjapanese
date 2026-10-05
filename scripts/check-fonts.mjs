/**
 * Build guard: refuse to build if the copy uses a character the font subsets lack.
 *
 * Runs before `next build` (see "prebuild" in package.json). Without it, adding a
 * new kanji to a lesson would build fine and then draw that one character in
 * whatever the reader's system happens to have — or as an empty box on a phone
 * with no Japanese font. Coverage is read from the font files themselves.
 *
 * Fast and offline: no network, no browser, Node built-ins only.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FAMILY_WEIGHTS, FONT_DIR, FONT_MODULE, fontPlan, toText } from './glyphs.mjs';
import { inspect } from './woff2.mjs';

function fail(lines) {
  console.error(['', 'Font check failed.', ...lines, ''].join('\n'));
  process.exit(1);
}

const manifestPath = join(FONT_DIR, 'manifest.json');
if (!existsSync(manifestPath) || !existsSync(FONT_MODULE)) {
  fail(['  app/fonts/ has not been generated.', '  Run `npm run fonts`, then commit app/fonts/ and app/fonts.ts.']);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const moduleSource = readFileSync(FONT_MODULE, 'utf8');
const plan = fontPlan();

const files = [];
for (const slice of plan) {
  for (const f of slice.files) {
    const path = join(FONT_DIR, f.file);
    if (!existsSync(path) || !moduleSource.includes(`./fonts/${f.file}`)) {
      // An empty slice is legitimately absent, e.g. if the serif needs no extras.
      if (slice.chars.size === 0) continue;
      fail([`  app/fonts/${f.file} is missing or not declared in app/fonts.ts.`, '  Run `npm run fonts`.']);
    }
    files.push({ ...f, slice, coverage: inspect(path).coverage, gaps: new Set(manifest.files[f.file]?.gaps ?? '') });
  }
}

/**
 * Coverage is judged per family and per weight, not per file. The serif's split
 * into core and extra is a loading optimisation; what matters is that, at every
 * weight the design uses, some file of the family can draw every character.
 */
const missing = [];
for (const [family, weights] of Object.entries(FAMILY_WEIGHTS)) {
  const ofFamily = files.filter((f) => f.slice.family === family);
  const needs = new Set(plan.filter((s) => s.family === family).flatMap((s) => [...s.chars]));
  const gaps = new Set(ofFamily.flatMap((f) => [...f.gaps]));
  for (const w of weights) {
    const has = new Set(ofFamily.filter((f) => f.serves.includes(w)).flatMap((f) => [...f.coverage]));
    const lacking = [...needs].filter((c) => !has.has(c.codePointAt(0)) && !gaps.has(c));
    if (lacking.length) missing.push(`  ${family} ${w}: ${toText(lacking)}`);
  }
}

if (missing.length) {
  fail([
    '  The copy uses characters the self-hosted font subsets do not contain:',
    ...missing,
    '',
    '  Run `npm run fonts` to regenerate app/fonts/, then commit the result.',
  ]);
}

// Not a correctness problem, only a slower path: a glyph newly used in a title or
// in serif interface text still renders, from the serif's larger extra slice.
const core = files.find((f) => f.file === 'noto-serif-jp-core-400.woff2');
if (core) {
  const drifted = [...core.slice.chars].filter((c) => !core.coverage.has(c.codePointAt(0)) && !core.gaps.has(c));
  if (drifted.length) {
    console.warn(
      `note: ${drifted.length} serif glyph(s) now load from the larger extra slice ` +
        `(${toText(drifted)}). \`npm run fonts\` moves them into the small core one.`
    );
  }
}

const characters = new Set(plan.flatMap((s) => [...s.chars])).size;
console.log(`fonts ok: ${files.length} files cover all ${characters} characters the copy uses`);
