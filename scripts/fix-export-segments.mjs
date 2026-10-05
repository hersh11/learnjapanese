/**
 * Post-build repair for a Windows-only bug in Next's static export (16.3.x).
 *
 * The client prefetches route segments from flat files such as
 * `learn/__next.learn.__PAGE__.txt`. The exporter builds that name by turning
 * `/` into `.`, but on Windows it collects paths with `\`, so it writes
 * `learn/__next.learn/__PAGE__.txt` instead. Every link prefetch then 404s and
 * logs a console error. Builds on Linux or macOS are unaffected, and on those
 * this script finds nothing to do.
 *
 * Runs after `next build` (see "postbuild" in package.json). Node built-ins only.
 */
import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';
if (!existsSync(OUT)) process.exit(0);

let moved = 0;

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]
  );
}

function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name === '_next') continue;
    const path = join(dir, e.name);
    if (!e.name.startsWith('__next.')) {
      walk(path);
      continue;
    }
    // __next.learn/$d$module/__PAGE__.txt  ->  __next.learn.$d$module.__PAGE__.txt
    for (const file of files(path)) {
      const flat = `${e.name}.${relative(path, file).split(sep).join('.')}`;
      const dest = join(dir, flat);
      if (existsSync(dest)) {
        console.error(`fix-export-segments: refusing to overwrite ${dest}`);
        process.exit(1);
      }
      renameSync(file, dest);
      moved++;
    }
    rmSync(path, { recursive: true });
  }
}

walk(OUT);
if (moved) console.log(`fix-export-segments: flattened ${moved} prefetch segment files`);
