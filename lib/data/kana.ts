/**
 * Kana tables with Devanagari pronunciation guides.
 *
 * Why Devanagari: romaji systematically misleads. "tsu" (つ), "fu" (ふ) and "r-"
 * (ら行) have no clean English spelling, and English speakers import an aspirated,
 * retroflex "t" into た that takes years to unlearn. Devanagari already encodes the
 * dental/retroflex and aspirated/unaspirated distinctions Japanese needs, so a Hindi
 * reader can hit these sounds on the first try.
 *
 * `deva` is the practical spelling. `note` appears only where the mapping is
 * imperfect and the learner needs to know how it differs.
 */

export type KanaRow = {
  kana: string;
  romaji: string;
  deva: string;
  note?: string;
};

export type KanaGroup = {
  id: string;
  label: string;
  rows: KanaRow[];
};

/* ---------------------------------- Hiragana --------------------------------- */

export const hiraganaBase: KanaGroup[] = [
  {
    id: 'a',
    label: 'あ行: vowels',
    rows: [
      { kana: 'あ', romaji: 'a', deva: 'अ' },
      { kana: 'い', romaji: 'i', deva: 'इ' },
      { kana: 'う', romaji: 'u', deva: 'उ', note: 'Lips stay flat, not rounded: between उ and ऊ, never puckered like English "oo".' },
      { kana: 'え', romaji: 'e', deva: 'ए' },
      { kana: 'お', romaji: 'o', deva: 'ओ' },
    ],
  },
  {
    id: 'ka',
    label: 'か行: k',
    rows: [
      { kana: 'か', romaji: 'ka', deva: 'क', note: 'Sits between क and ख. A light puff is fine; a hard ख is too much.' },
      { kana: 'き', romaji: 'ki', deva: 'कि' },
      { kana: 'く', romaji: 'ku', deva: 'कु' },
      { kana: 'け', romaji: 'ke', deva: 'के' },
      { kana: 'こ', romaji: 'ko', deva: 'को' },
    ],
  },
  {
    id: 'sa',
    label: 'さ行: s',
    rows: [
      { kana: 'さ', romaji: 'sa', deva: 'स' },
      { kana: 'し', romaji: 'shi', deva: 'शि', note: 'Always शि, never सि.' },
      { kana: 'す', romaji: 'su', deva: 'सु', note: 'The उ is often nearly silent between consonants: です sounds like "des".' },
      { kana: 'せ', romaji: 'se', deva: 'से' },
      { kana: 'そ', romaji: 'so', deva: 'सो' },
    ],
  },
  {
    id: 'ta',
    label: 'た行: t',
    rows: [
      { kana: 'た', romaji: 'ta', deva: 'त', note: 'Dental त, tongue on the teeth. Never retroflex ट. This is the most common mistake English speakers make.' },
      { kana: 'ち', romaji: 'chi', deva: 'चि', note: 'Always चि, never ति.' },
      { kana: 'つ', romaji: 'tsu', deva: 'त्सु', note: 'One sound, not two. Like the त्स ending of "वत्स", followed by a flat उ.' },
      { kana: 'て', romaji: 'te', deva: 'ते' },
      { kana: 'と', romaji: 'to', deva: 'तो' },
    ],
  },
  {
    id: 'na',
    label: 'な行: n',
    rows: [
      { kana: 'な', romaji: 'na', deva: 'न', note: 'Dental न, not ण.' },
      { kana: 'に', romaji: 'ni', deva: 'नि' },
      { kana: 'ぬ', romaji: 'nu', deva: 'नु' },
      { kana: 'ね', romaji: 'ne', deva: 'ने' },
      { kana: 'の', romaji: 'no', deva: 'नो' },
    ],
  },
  {
    id: 'ha',
    label: 'は行: h',
    rows: [
      { kana: 'は', romaji: 'ha', deva: 'ह', note: 'As a grammar particle this is read わ (व). See the particles lesson.' },
      { kana: 'ひ', romaji: 'hi', deva: 'हि' },
      { kana: 'ふ', romaji: 'fu', deva: 'फु', note: 'Blown between both lips, not lip-on-teeth. Softer than English "f", lighter than फ.' },
      { kana: 'へ', romaji: 'he', deva: 'हे', note: 'As a particle this is read え (ए).' },
      { kana: 'ほ', romaji: 'ho', deva: 'हो' },
    ],
  },
  {
    id: 'ma',
    label: 'ま行: m',
    rows: [
      { kana: 'ま', romaji: 'ma', deva: 'म' },
      { kana: 'み', romaji: 'mi', deva: 'मि' },
      { kana: 'む', romaji: 'mu', deva: 'मु' },
      { kana: 'め', romaji: 'me', deva: 'मे' },
      { kana: 'も', romaji: 'mo', deva: 'मो' },
    ],
  },
  {
    id: 'ya',
    label: 'や行: y',
    rows: [
      { kana: 'や', romaji: 'ya', deva: 'य' },
      { kana: 'ゆ', romaji: 'yu', deva: 'यु' },
      { kana: 'よ', romaji: 'yo', deva: 'यो' },
    ],
  },
  {
    id: 'ra',
    label: 'ら行: r',
    rows: [
      { kana: 'ら', romaji: 'ra', deva: 'र', note: 'A single flap of the tongue, closest to the ड़ in "बड़ा". Not English "r", not a rolled रर.' },
      { kana: 'り', romaji: 'ri', deva: 'रि' },
      { kana: 'る', romaji: 'ru', deva: 'रु' },
      { kana: 'れ', romaji: 're', deva: 'रे' },
      { kana: 'ろ', romaji: 'ro', deva: 'रो' },
    ],
  },
  {
    id: 'wa',
    label: 'わ行: w & n',
    rows: [
      { kana: 'わ', romaji: 'wa', deva: 'व', note: 'Lips barely round: lighter than Hindi व.' },
      { kana: 'を', romaji: 'wo', deva: 'ओ', note: 'Pronounced simply ओ. Used only as the object particle.' },
      { kana: 'ん', romaji: 'n', deva: 'न् / ं', note: 'Its own full beat. Shifts to म before b/p/m, so しんぶん sounds like शिम्बुन.' },
    ],
  },
];

export const hiraganaDakuten: KanaGroup[] = [
  {
    id: 'ga',
    label: 'が行: g',
    rows: [
      { kana: 'が', romaji: 'ga', deva: 'ग' },
      { kana: 'ぎ', romaji: 'gi', deva: 'गि' },
      { kana: 'ぐ', romaji: 'gu', deva: 'गु' },
      { kana: 'げ', romaji: 'ge', deva: 'गे' },
      { kana: 'ご', romaji: 'go', deva: 'गो' },
    ],
  },
  {
    id: 'za',
    label: 'ざ行: z',
    rows: [
      { kana: 'ざ', romaji: 'za', deva: 'ज़' },
      { kana: 'じ', romaji: 'ji', deva: 'जि' },
      { kana: 'ず', romaji: 'zu', deva: 'ज़ु' },
      { kana: 'ぜ', romaji: 'ze', deva: 'ज़े' },
      { kana: 'ぞ', romaji: 'zo', deva: 'ज़ो' },
    ],
  },
  {
    id: 'da',
    label: 'だ行: d',
    rows: [
      { kana: 'だ', romaji: 'da', deva: 'द', note: 'Dental द, not ड.' },
      { kana: 'ぢ', romaji: 'ji', deva: 'जि', note: 'Same sound as じ. Rare: you will mostly meet it in 鼻血 (はなぢ).' },
      { kana: 'づ', romaji: 'zu', deva: 'ज़ु', note: 'Same sound as ず. Rare.' },
      { kana: 'で', romaji: 'de', deva: 'दे' },
      { kana: 'ど', romaji: 'do', deva: 'दो' },
    ],
  },
  {
    id: 'ba',
    label: 'ば行: b',
    rows: [
      { kana: 'ば', romaji: 'ba', deva: 'ब' },
      { kana: 'び', romaji: 'bi', deva: 'बि' },
      { kana: 'ぶ', romaji: 'bu', deva: 'बु' },
      { kana: 'べ', romaji: 'be', deva: 'बे' },
      { kana: 'ぼ', romaji: 'bo', deva: 'बो' },
    ],
  },
  {
    id: 'pa',
    label: 'ぱ行: p',
    rows: [
      { kana: 'ぱ', romaji: 'pa', deva: 'प' },
      { kana: 'ぴ', romaji: 'pi', deva: 'पि' },
      { kana: 'ぷ', romaji: 'pu', deva: 'पु' },
      { kana: 'ぺ', romaji: 'pe', deva: 'पे' },
      { kana: 'ぽ', romaji: 'po', deva: 'पो' },
    ],
  },
];

export const hiraganaYouon: KanaGroup[] = [
  {
    id: 'kya',
    label: 'きゃ行',
    rows: [
      { kana: 'きゃ', romaji: 'kya', deva: 'क्या' },
      { kana: 'きゅ', romaji: 'kyu', deva: 'क्यु' },
      { kana: 'きょ', romaji: 'kyo', deva: 'क्यो' },
    ],
  },
  {
    id: 'sha',
    label: 'しゃ行',
    rows: [
      { kana: 'しゃ', romaji: 'sha', deva: 'शा' },
      { kana: 'しゅ', romaji: 'shu', deva: 'शु' },
      { kana: 'しょ', romaji: 'sho', deva: 'शो' },
    ],
  },
  {
    id: 'cha',
    label: 'ちゃ行',
    rows: [
      { kana: 'ちゃ', romaji: 'cha', deva: 'चा' },
      { kana: 'ちゅ', romaji: 'chu', deva: 'चु' },
      { kana: 'ちょ', romaji: 'cho', deva: 'चो' },
    ],
  },
  {
    id: 'nya',
    label: 'にゃ行',
    rows: [
      { kana: 'にゃ', romaji: 'nya', deva: 'न्या' },
      { kana: 'にゅ', romaji: 'nyu', deva: 'न्यु' },
      { kana: 'にょ', romaji: 'nyo', deva: 'न्यो' },
    ],
  },
  {
    id: 'hya',
    label: 'ひゃ行',
    rows: [
      { kana: 'ひゃ', romaji: 'hya', deva: 'ह्या' },
      { kana: 'ひゅ', romaji: 'hyu', deva: 'ह्यु' },
      { kana: 'ひょ', romaji: 'hyo', deva: 'ह्यो' },
    ],
  },
  {
    id: 'mya',
    label: 'みゃ行',
    rows: [
      { kana: 'みゃ', romaji: 'mya', deva: 'म्या' },
      { kana: 'みゅ', romaji: 'myu', deva: 'म्यु' },
      { kana: 'みょ', romaji: 'myo', deva: 'म्यो' },
    ],
  },
  {
    id: 'rya',
    label: 'りゃ行',
    rows: [
      { kana: 'りゃ', romaji: 'rya', deva: 'र्या' },
      { kana: 'りゅ', romaji: 'ryu', deva: 'र्यु' },
      { kana: 'りょ', romaji: 'ryo', deva: 'र्यो' },
    ],
  },
  {
    id: 'gya',
    label: 'ぎゃ行',
    rows: [
      { kana: 'ぎゃ', romaji: 'gya', deva: 'ग्या' },
      { kana: 'ぎゅ', romaji: 'gyu', deva: 'ग्यु' },
      { kana: 'ぎょ', romaji: 'gyo', deva: 'ग्यो' },
    ],
  },
  {
    id: 'ja',
    label: 'じゃ行',
    rows: [
      { kana: 'じゃ', romaji: 'ja', deva: 'जा' },
      { kana: 'じゅ', romaji: 'ju', deva: 'जु' },
      { kana: 'じょ', romaji: 'jo', deva: 'जो' },
    ],
  },
  {
    id: 'bya',
    label: 'びゃ行',
    rows: [
      { kana: 'びゃ', romaji: 'bya', deva: 'ब्या' },
      { kana: 'びゅ', romaji: 'byu', deva: 'ब्यु' },
      { kana: 'びょ', romaji: 'byo', deva: 'ब्यो' },
    ],
  },
  {
    id: 'pya',
    label: 'ぴゃ行',
    rows: [
      { kana: 'ぴゃ', romaji: 'pya', deva: 'प्या' },
      { kana: 'ぴゅ', romaji: 'pyu', deva: 'प्यु' },
      { kana: 'ぴょ', romaji: 'pyo', deva: 'प्यो' },
    ],
  },
];

/* ---------------------------------- Katakana --------------------------------- */

const katakanaFor: Record<string, string> = {
  あ: 'ア', い: 'イ', う: 'ウ', え: 'エ', お: 'オ',
  か: 'カ', き: 'キ', く: 'ク', け: 'ケ', こ: 'コ',
  さ: 'サ', し: 'シ', す: 'ス', せ: 'セ', そ: 'ソ',
  た: 'タ', ち: 'チ', つ: 'ツ', て: 'テ', と: 'ト',
  な: 'ナ', に: 'ニ', ぬ: 'ヌ', ね: 'ネ', の: 'ノ',
  は: 'ハ', ひ: 'ヒ', ふ: 'フ', へ: 'ヘ', ほ: 'ホ',
  ま: 'マ', み: 'ミ', む: 'ム', め: 'メ', も: 'モ',
  や: 'ヤ', ゆ: 'ユ', よ: 'ヨ',
  ら: 'ラ', り: 'リ', る: 'ル', れ: 'レ', ろ: 'ロ',
  わ: 'ワ', を: 'ヲ', ん: 'ン',
  が: 'ガ', ぎ: 'ギ', ぐ: 'グ', げ: 'ゲ', ご: 'ゴ',
  ざ: 'ザ', じ: 'ジ', ず: 'ズ', ぜ: 'ゼ', ぞ: 'ゾ',
  だ: 'ダ', ぢ: 'ヂ', づ: 'ヅ', で: 'デ', ど: 'ド',
  ば: 'バ', び: 'ビ', ぶ: 'ブ', べ: 'ベ', ぼ: 'ボ',
  ぱ: 'パ', ぴ: 'ピ', ぷ: 'プ', ぺ: 'ペ', ぽ: 'ポ',
  きゃ: 'キャ', きゅ: 'キュ', きょ: 'キョ',
  しゃ: 'シャ', しゅ: 'シュ', しょ: 'ショ',
  ちゃ: 'チャ', ちゅ: 'チュ', ちょ: 'チョ',
  にゃ: 'ニャ', にゅ: 'ニュ', にょ: 'ニョ',
  ひゃ: 'ヒャ', ひゅ: 'ヒュ', ひょ: 'ヒョ',
  みゃ: 'ミャ', みゅ: 'ミュ', みょ: 'ミョ',
  りゃ: 'リャ', りゅ: 'リュ', りょ: 'リョ',
  ぎゃ: 'ギャ', ぎゅ: 'ギュ', ぎょ: 'ギョ',
  じゃ: 'ジャ', じゅ: 'ジュ', じょ: 'ジョ',
  びゃ: 'ビャ', びゅ: 'ビュ', びょ: 'ビョ',
  ぴゃ: 'ピャ', ぴゅ: 'ピュ', ぴょ: 'ピョ',
};

/** Katakana carries the same sounds, only the shapes differ. */
function toKatakana(groups: KanaGroup[]): KanaGroup[] {
  return groups.map((group) => ({
    ...group,
    label: group.label.replace(/^[ぁ-ん]+/, (m) =>
      [...m].map((c) => katakanaFor[c] ?? c).join('')
    ),
    rows: group.rows.map((row) => ({
      ...row,
      kana: katakanaFor[row.kana] ?? row.kana,
    })),
  }));
}

export const katakanaBase = toKatakana(hiraganaBase);
export const katakanaDakuten = toKatakana(hiraganaDakuten);
export const katakanaYouon = toKatakana(hiraganaYouon);

/* ------------------------------------ API ------------------------------------ */

export type Script = 'hiragana' | 'katakana';

export const kanaSets: Record<
  Script,
  { base: KanaGroup[]; dakuten: KanaGroup[]; youon: KanaGroup[] }
> = {
  hiragana: { base: hiraganaBase, dakuten: hiraganaDakuten, youon: hiraganaYouon },
  katakana: { base: katakanaBase, dakuten: katakanaDakuten, youon: katakanaYouon },
};

export function allRows(script: Script): KanaRow[] {
  const set = kanaSets[script];
  return [...set.base, ...set.dakuten, ...set.youon].flatMap((g) => g.rows);
}
