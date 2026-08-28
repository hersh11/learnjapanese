/**
 * Numbers, counters, time and dates — with Devanagari readings.
 *
 * Japanese numbers are mostly regular, but the irregular readings (4, 7, 9 and the
 * counter mutations) are exactly where beginners stall, so those are flagged
 * explicitly rather than left to be discovered.
 */

export type NumberRow = {
  value: string;
  kanji: string;
  kana: string;
  romaji: string;
  deva: string;
  note?: string;
};

export const digits: NumberRow[] = [
  { value: '0', kanji: '零 / 〇', kana: 'ゼロ / れい', romaji: 'zero / rei', deva: 'ज़ेरो / रेइ', note: 'ゼロ in everyday speech; れい in formal and official contexts.' },
  { value: '1', kanji: '一', kana: 'いち', romaji: 'ichi', deva: 'इचि' },
  { value: '2', kanji: '二', kana: 'に', romaji: 'ni', deva: 'नि' },
  { value: '3', kanji: '三', kana: 'さん', romaji: 'san', deva: 'सान' },
  { value: '4', kanji: '四', kana: 'よん / し', romaji: 'yon / shi', deva: 'योन / शि', note: 'Prefer よん. し is a homophone of 死 "death", so it is avoided in most counting.' },
  { value: '5', kanji: '五', kana: 'ご', romaji: 'go', deva: 'गो' },
  { value: '6', kanji: '六', kana: 'ろく', romaji: 'roku', deva: 'रोकु' },
  { value: '7', kanji: '七', kana: 'なな / しち', romaji: 'nana / shichi', deva: 'नाना / शिचि', note: 'Prefer なな — しち is easily misheard as いち on the phone.' },
  { value: '8', kanji: '八', kana: 'はち', romaji: 'hachi', deva: 'हाचि' },
  { value: '9', kanji: '九', kana: 'きゅう / く', romaji: 'kyuu / ku', deva: 'क्यू / कु', note: 'Prefer きゅう. く appears in fixed items like 九時 (くじ, 9 o’clock).' },
  { value: '10', kanji: '十', kana: 'じゅう', romaji: 'juu', deva: 'जू' },
];

export const tens: NumberRow[] = [
  { value: '11', kanji: '十一', kana: 'じゅういち', romaji: 'juu-ichi', deva: 'जू-इचि', note: 'Literally "ten one".' },
  { value: '12', kanji: '十二', kana: 'じゅうに', romaji: 'juu-ni', deva: 'जू-नि' },
  { value: '19', kanji: '十九', kana: 'じゅうきゅう', romaji: 'juu-kyuu', deva: 'जू-क्यू' },
  { value: '20', kanji: '二十', kana: 'にじゅう', romaji: 'ni-juu', deva: 'नि-जू', note: 'Literally "two ten".' },
  { value: '30', kanji: '三十', kana: 'さんじゅう', romaji: 'san-juu', deva: 'सान-जू' },
  { value: '40', kanji: '四十', kana: 'よんじゅう', romaji: 'yon-juu', deva: 'योन-जू' },
  { value: '50', kanji: '五十', kana: 'ごじゅう', romaji: 'go-juu', deva: 'गो-जू' },
  { value: '70', kanji: '七十', kana: 'ななじゅう', romaji: 'nana-juu', deva: 'नाना-जू' },
  { value: '90', kanji: '九十', kana: 'きゅうじゅう', romaji: 'kyuu-juu', deva: 'क्यू-जू' },
  { value: '99', kanji: '九十九', kana: 'きゅうじゅうきゅう', romaji: 'kyuu-juu-kyuu', deva: 'क्यू-जू-क्यू' },
];

export const largeNumbers: NumberRow[] = [
  { value: '100', kanji: '百', kana: 'ひゃく', romaji: 'hyaku', deva: 'ह्याकु' },
  { value: '300', kanji: '三百', kana: 'さんびゃく', romaji: 'san-byaku', deva: 'सान-ब्याकु', note: 'Sound change: ひゃく → びゃく after さん.' },
  { value: '600', kanji: '六百', kana: 'ろっぴゃく', romaji: 'rop-pyaku', deva: 'रोप्-प्याकु', note: 'Double change: ろく shortens and ひゃく → ぴゃく.' },
  { value: '800', kanji: '八百', kana: 'はっぴゃく', romaji: 'hap-pyaku', deva: 'हाप्-प्याकु', note: 'Same pattern as 600.' },
  { value: '1,000', kanji: '千', kana: 'せん', romaji: 'sen', deva: 'सेन' },
  { value: '3,000', kanji: '三千', kana: 'さんぜん', romaji: 'san-zen', deva: 'सान-ज़ेन', note: 'せん → ぜん after さん.' },
  { value: '8,000', kanji: '八千', kana: 'はっせん', romaji: 'has-sen', deva: 'हास्-सेन' },
  { value: '10,000', kanji: '万', kana: 'いちまん', romaji: 'ichi-man', deva: 'इचि-मान', note: 'Always いちまん, never just まん. Japanese groups by 10,000 — so 100,000 is 十万 (じゅうまん), "ten man".' },
  { value: '100,000,000', kanji: '億', kana: 'おく', romaji: 'oku', deva: 'ओकु', note: 'Hindi speakers: 万 ≈ the role लाख plays — a grouping English has no single word for.' },
];

export type CounterRow = {
  counter: string;
  reading: string;
  deva: string;
  usedFor: string;
  irregulars?: string;
};

export const counters: CounterRow[] = [
  {
    counter: '〜つ',
    reading: 'hitotsu, futatsu, mittsu…',
    deva: 'हितोत्सु, फुतात्सु, मित्सु…',
    usedFor: 'General objects, when no specific counter comes to mind. Only goes to 10.',
    irregulars: '1 ひとつ · 2 ふたつ · 3 みっつ · 4 よっつ · 5 いつつ · 6 むっつ · 7 ななつ · 8 やっつ · 9 ここのつ · 10 とお',
  },
  {
    counter: '〜人',
    reading: 'nin',
    deva: 'निन',
    usedFor: 'People.',
    irregulars: '1 ひとり (not いちにん) · 2 ふたり (not ににん) · from 3 onward regular: さんにん, よにん, ごにん…',
  },
  {
    counter: '〜個',
    reading: 'ko',
    deva: 'को',
    usedFor: 'Small round or chunky objects — apples, erasers, stones.',
    irregulars: '1 いっこ · 6 ろっこ · 8 はっこ · 10 じゅっこ',
  },
  {
    counter: '〜本',
    reading: 'hon',
    deva: 'होन',
    usedFor: 'Long thin things — pens, bottles, umbrellas, trains, phone calls.',
    irregulars: '1 いっぽん · 3 さんぼん · 6 ろっぽん · 8 はっぽん · 10 じゅっぽん',
  },
  {
    counter: '〜枚',
    reading: 'mai',
    deva: 'माइ',
    usedFor: 'Flat things — paper, shirts, plates, tickets, SIM cards.',
    irregulars: 'Fully regular. The easiest counter to start with.',
  },
  {
    counter: '〜冊',
    reading: 'satsu',
    deva: 'सात्सु',
    usedFor: 'Bound volumes — books, magazines, notebooks.',
    irregulars: '1 いっさつ · 8 はっさつ · 10 じゅっさつ',
  },
  {
    counter: '〜匹',
    reading: 'hiki',
    deva: 'हिकि',
    usedFor: 'Small animals — cats, dogs, fish, insects.',
    irregulars: '1 いっぴき · 3 さんびき · 6 ろっぴき · 8 はっぴき · 10 じゅっぴき',
  },
  {
    counter: '〜台',
    reading: 'dai',
    deva: 'दाइ',
    usedFor: 'Machines and vehicles — cars, computers, fridges.',
    irregulars: 'Fully regular.',
  },
  {
    counter: '〜歳 / 〜才',
    reading: 'sai',
    deva: 'साइ',
    usedFor: 'Age.',
    irregulars: '1 いっさい · 8 はっさい · 10 じゅっさい · 20 はたち (fully irregular, worth memorising on its own)',
  },
  {
    counter: '〜円',
    reading: 'en',
    deva: 'एन',
    usedFor: 'Yen. Written ¥.',
    irregulars: 'Fully regular: ひゃくえん (¥100), せんえん (¥1,000), いちまんえん (¥10,000).',
  },
];

export const hours: NumberRow[] = [
  { value: '1:00', kanji: '一時', kana: 'いちじ', romaji: 'ichi-ji', deva: 'इचि-जि' },
  { value: '4:00', kanji: '四時', kana: 'よじ', romaji: 'yo-ji', deva: 'यो-जि', note: 'よじ — not よんじ.' },
  { value: '7:00', kanji: '七時', kana: 'しちじ', romaji: 'shichi-ji', deva: 'शिचि-जि', note: 'Here しち is standard, not なな.' },
  { value: '9:00', kanji: '九時', kana: 'くじ', romaji: 'ku-ji', deva: 'कु-जि', note: 'くじ — not きゅうじ.' },
];

export const minutes: NumberRow[] = [
  { value: ':01', kanji: '一分', kana: 'いっぷん', romaji: 'ip-pun', deva: 'इप्-पुन' },
  { value: ':03', kanji: '三分', kana: 'さんぷん', romaji: 'san-pun', deva: 'सान-पुन' },
  { value: ':04', kanji: '四分', kana: 'よんぷん', romaji: 'yon-pun', deva: 'योन-पुन' },
  { value: ':05', kanji: '五分', kana: 'ごふん', romaji: 'go-fun', deva: 'गो-फुन' },
  { value: ':10', kanji: '十分', kana: 'じゅっぷん', romaji: 'jup-pun', deva: 'जुप्-पुन' },
  { value: ':30', kanji: '半', kana: 'はん', romaji: 'han', deva: 'हान', note: '"Half" — 三時半 = 3:30.' },
];

export const daysOfMonth: NumberRow[] = [
  { value: '1st', kanji: '一日', kana: 'ついたち', romaji: 'tsuitachi', deva: 'त्सुइताचि', note: 'Completely irregular.' },
  { value: '2nd', kanji: '二日', kana: 'ふつか', romaji: 'futsuka', deva: 'फुत्सुका' },
  { value: '3rd', kanji: '三日', kana: 'みっか', romaji: 'mikka', deva: 'मिक्का' },
  { value: '4th', kanji: '四日', kana: 'よっか', romaji: 'yokka', deva: 'योक्का' },
  { value: '8th', kanji: '八日', kana: 'ようか', romaji: 'youka', deva: 'योउका', note: 'Often confused with 4th (よっか) — listen for the length.' },
  { value: '10th', kanji: '十日', kana: 'とおか', romaji: 'tooka', deva: 'तोओका' },
  { value: '14th', kanji: '十四日', kana: 'じゅうよっか', romaji: 'juu-yokka', deva: 'जू-योक्का' },
  { value: '20th', kanji: '二十日', kana: 'はつか', romaji: 'hatsuka', deva: 'हात्सुका', note: 'Irregular — not にじゅうにち.' },
  { value: '15th', kanji: '十五日', kana: 'じゅうごにち', romaji: 'juu-go-nichi', deva: 'जू-गो-निचि', note: 'From 11 on, most days are just number + にち.' },
];

export const months: NumberRow[] = [
  { value: 'January', kanji: '一月', kana: 'いちがつ', romaji: 'ichi-gatsu', deva: 'इचि-गात्सु' },
  { value: 'April', kanji: '四月', kana: 'しがつ', romaji: 'shi-gatsu', deva: 'शि-गात्सु', note: 'しがつ — not よんがつ.' },
  { value: 'July', kanji: '七月', kana: 'しちがつ', romaji: 'shichi-gatsu', deva: 'शिचि-गात्सु', note: 'しちがつ — not ななたがつ.' },
  { value: 'September', kanji: '九月', kana: 'くがつ', romaji: 'ku-gatsu', deva: 'कु-गात्सु', note: 'くがつ — not きゅうがつ.' },
];

export const weekdays: NumberRow[] = [
  { value: 'Monday', kanji: '月曜日', kana: 'げつようび', romaji: 'getsu-youbi', deva: 'गेत्सु-योउबि', note: 'Moon.' },
  { value: 'Tuesday', kanji: '火曜日', kana: 'かようび', romaji: 'ka-youbi', deva: 'का-योउबि', note: 'Fire.' },
  { value: 'Wednesday', kanji: '水曜日', kana: 'すいようび', romaji: 'sui-youbi', deva: 'सुइ-योउबि', note: 'Water.' },
  { value: 'Thursday', kanji: '木曜日', kana: 'もくようび', romaji: 'moku-youbi', deva: 'मोकु-योउबि', note: 'Wood.' },
  { value: 'Friday', kanji: '金曜日', kana: 'きんようび', romaji: 'kin-youbi', deva: 'किन-योउबि', note: 'Metal / gold.' },
  { value: 'Saturday', kanji: '土曜日', kana: 'どようび', romaji: 'do-youbi', deva: 'दो-योउबि', note: 'Earth.' },
  { value: 'Sunday', kanji: '日曜日', kana: 'にちようび', romaji: 'nichi-youbi', deva: 'निचि-योउबि', note: 'Sun.' },
];
