/**
 * What the voice should read for a course entry. Kept apart from lib/speech.ts,
 * which is a client module: lesson blocks render on the server and need to work
 * out the text there, then hand it to the speaker button as a plain string.
 */

/**
 * Turn a course entry into what the voice should read, so the audio matches the
 * reading the lesson teaches rather than whatever the engine guesses:
 *
 * - Sentences are spoken from their Japanese text. Kanji give the engine the
 *   context it needs — read from kana alone, は risks coming out as "ha".
 * - Words are spoken from their reading. A lone 日 could be ひ, にち or か; the
 *   lesson says which, so say that.
 * - Readings like `た(べる) / しょく` keep the okurigana and pause between the kun
 *   and on readings: たべる、しょく.
 * - A `kana` field that is really romaji (a-ri-ga-to-u) is ignored.
 * - 〜 marks a slot in a pattern and is not pronounced.
 */
export function speakable(entry: { jp: string; kana?: string }, kind: 'word' | 'sentence'): string {
  const reading =
    kind === 'word' && entry.kana && !/[A-Za-z]/.test(entry.kana) ? entry.kana : entry.jp;
  return reading
    // The full-width brackets are escaped because scripts/glyphs.mjs scans source
    // for copy, and as literals they would count as text the fonts must carry.
    .replace(/[〜~]/g, '')
    .replace(/[()\uFF08\uFF09]/g, '')
    .replace(/\s*\/\s*/g, '、')
    .trim();
}
