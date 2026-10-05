/**
 * Read which codepoints a WOFF2 file can actually draw, using only Node built-ins.
 *
 * The build check asks the font files themselves rather than trusting a list
 * written next to them: a list can drift from the files, a cmap cannot. WOFF2 is
 * a table directory followed by one Brotli stream; cmap is never transformed, so
 * finding it is a matter of walking the directory and slicing the stream.
 * Spec: https://www.w3.org/TR/WOFF2/
 */
import { readFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';

// WOFF2 "known table tags", indexed by the low six bits of each directory entry.
const KNOWN_TAGS = [
  'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm',
  'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern',
  'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC',
  'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar',
  'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar', 'gvar', 'hsty',
  'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat',
  'Gloc', 'Feat', 'Sill',
];

function readUIntBase128(buf, cursor) {
  let value = 0;
  for (let i = 0; i < 5; i++) {
    const byte = buf[cursor.at++];
    if (i === 0 && byte === 0x80) throw new Error('WOFF2: UIntBase128 has a leading zero');
    value = value * 128 + (byte & 0x7f);
    if (!(byte & 0x80)) return value;
  }
  throw new Error('WOFF2: UIntBase128 longer than five bytes');
}

export function readTables(buf) {
  if (buf.toString('latin1', 0, 4) !== 'wOF2') throw new Error('Not a WOFF2 file');
  const numTables = buf.readUInt16BE(12);
  const compressedSize = buf.readUInt32BE(20);

  const cursor = { at: 48 };
  const dir = [];
  for (let t = 0; t < numTables; t++) {
    const flags = buf[cursor.at++];
    const index = flags & 0x3f;
    let tag;
    if (index === 63) {
      tag = buf.toString('latin1', cursor.at, cursor.at + 4);
      cursor.at += 4;
    } else {
      tag = KNOWN_TAGS[index];
    }
    const version = flags >> 6;
    const origLength = readUIntBase128(buf, cursor);
    // glyf and loca are transformed at version 0; every other table at any version
    // except 0. A transformed table carries its stored length separately.
    const transformed = tag === 'glyf' || tag === 'loca' ? version === 0 : version !== 0;
    const length = transformed ? readUIntBase128(buf, cursor) : origLength;
    dir.push({ tag, length });
  }

  const stream = brotliDecompressSync(buf.subarray(cursor.at, cursor.at + compressedSize));
  const tables = {};
  let offset = 0;
  for (const { tag, length } of dir) {
    tables[tag] = stream.subarray(offset, offset + length);
    offset += length;
  }
  return tables;
}

/** Codepoints mapped to a real glyph, from the best Unicode subtable present. */
export function cmapCodepoints(cmap) {
  const count = cmap.readUInt16BE(2);
  const subtables = [];
  for (let i = 0; i < count; i++) {
    const platform = cmap.readUInt16BE(4 + i * 8);
    const encoding = cmap.readUInt16BE(6 + i * 8);
    const offset = cmap.readUInt32BE(8 + i * 8);
    const format = cmap.readUInt16BE(offset);
    const unicode = platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10));
    if (unicode && (format === 4 || format === 12)) subtables.push({ format, offset });
  }
  // Format 12 covers everything format 4 does and beyond the BMP.
  const best = subtables.find((s) => s.format === 12) ?? subtables.find((s) => s.format === 4);
  if (!best) throw new Error('cmap: no Unicode subtable in format 4 or 12');

  const out = new Set();
  const o = best.offset;

  if (best.format === 12) {
    const groups = cmap.readUInt32BE(o + 12);
    for (let g = 0; g < groups; g++) {
      const start = cmap.readUInt32BE(o + 16 + g * 12);
      const end = cmap.readUInt32BE(o + 20 + g * 12);
      const glyph = cmap.readUInt32BE(o + 24 + g * 12);
      for (let cp = start; cp <= end; cp++) if (glyph + (cp - start) !== 0) out.add(cp);
    }
    return out;
  }

  const segX2 = cmap.readUInt16BE(o + 6);
  const ends = o + 14;
  const starts = ends + segX2 + 2;
  const deltas = starts + segX2;
  const rangeOffsets = deltas + segX2;
  for (let s = 0; s < segX2 / 2; s++) {
    const end = cmap.readUInt16BE(ends + s * 2);
    const start = cmap.readUInt16BE(starts + s * 2);
    const delta = cmap.readInt16BE(deltas + s * 2);
    const rangeOffset = cmap.readUInt16BE(rangeOffsets + s * 2);
    for (let cp = start; cp <= end && cp !== 0xffff; cp++) {
      let glyph;
      if (rangeOffset === 0) {
        glyph = (cp + delta) & 0xffff;
      } else {
        const at = rangeOffsets + s * 2 + rangeOffset + (cp - start) * 2;
        glyph = cmap.readUInt16BE(at);
        if (glyph !== 0) glyph = (glyph + delta) & 0xffff;
      }
      if (glyph !== 0) out.add(cp);
    }
  }
  return out;
}

/** Whether the font carries a variation axis — i.e. one file serves every weight. */
export function axes(tables) {
  const fvar = tables.fvar;
  if (!fvar) return [];
  const offset = fvar.readUInt16BE(4);
  const count = fvar.readUInt16BE(8);
  const size = fvar.readUInt16BE(10);
  return Array.from({ length: count }, (_, i) => {
    const at = offset + i * size;
    return {
      tag: fvar.toString('latin1', at, at + 4),
      min: fvar.readInt32BE(at + 4) / 65536,
      max: fvar.readInt32BE(at + 12) / 65536,
    };
  });
}

export function inspect(path) {
  const tables = readTables(readFileSync(path));
  return { coverage: cmapCodepoints(tables.cmap), axes: axes(tables) };
}
