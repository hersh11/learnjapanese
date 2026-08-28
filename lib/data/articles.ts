import type { Block } from '@/lib/curriculum/types';

export type Article = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  category: 'Method' | 'Exams' | 'Language';
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'japanese-for-hindi-speakers',
    title: 'Japanese for Hindi speakers: what transfers, what doesn’t',
    summary:
      'An honest inventory of the advantages you have, and the three places your Hindi will actively mislead you.',
    minutes: 8,
    category: 'Language',
    body: [
      {
        kind: 'p',
        text: 'Japanese and Hindi are unrelated languages. They share no common ancestor and almost no vocabulary. Yet a Hindi speaker starting Japanese has real structural advantages over an English speaker — and a few specific traps that English speakers never encounter.',
      },
      { kind: 'h', text: 'What genuinely transfers' },
      {
        kind: 'p',
        text: 'These are not motivational framing. They are concrete features where your existing instincts produce correct Japanese.',
      },
      {
        kind: 'table',
        head: ['Feature', 'Hindi', 'Japanese', 'English'],
        rows: [
          ['Word order', 'S–O–V', 'S–O–V', 'S–V–O'],
          ['Markers', 'Postpositions (को, में)', 'Particles (を, に)', 'Prepositions'],
          ['Dental consonants', 'त, द, न', 'た, だ, な', 'Absent — uses alveolar'],
          ['Geminate consonants', 'पक्का, अच्छा', 'きって, がっこう', 'Rare and unphonemic'],
          ['Politeness levels', 'तू / तुम / आप', 'plain / ます / keigo', 'Minimal grammaticalisation'],
          ['Verb-final clauses', 'खाकर गया', '食べて行った', 'Requires conjunctions'],
        ],
      },
      {
        kind: 'note',
        tone: 'hindi',
        title: 'The word order advantage is the largest one',
        text: 'English speakers spend months learning to hold the verb until the end of the sentence. It feels unnatural to them in a way it simply does not to you. Every complex Japanese sentence — relative clauses, embedded quotes — builds on that instinct.',
      },
      { kind: 'h', text: 'Where your Hindi will mislead you' },
      {
        kind: 'p',
        text: 'The traps are narrower but worth naming, because they are invisible until someone points at them.',
      },
      {
        kind: 'h',
        text: '1. Retroflex consonants do not exist in Japanese',
      },
      {
        kind: 'p',
        text: 'Hindi distinguishes त from ट, द from ड, न from ण. Japanese has only the dental series. If you reach for ट or ड — especially when reading English loanwords in katakana — you will sound wrong. テーブル is तेːबुरु, never टेबल.',
      },
      {
        kind: 'h',
        text: '2. Aspiration is not phonemic',
      },
      {
        kind: 'p',
        text: 'In Hindi, क and ख are different letters that change meaning. In Japanese, the puff of air is free variation — か carries a light aspiration at the start of a word and almost none in the middle, and nobody hears the difference as meaningful. Do not hunt for a ख/क distinction; it is not there.',
      },
      {
        kind: 'h',
        text: '3. Vowel length carries meaning in a way Hindi length does not',
      },
      {
        kind: 'p',
        text: 'Hindi has इ/ई and उ/ऊ, so the concept of vowel length is familiar. But Japanese length is strictly about duration in beats, not vowel quality — おばさん and おばあさん use the identical vowel sound, held for one beat versus two. Reading Japanese long vowels as a quality change rather than a timing change produces words that native speakers hear as wrong.',
      },
      {
        kind: 'note',
        tone: 'warn',
        title: 'The one to actually drill',
        text: 'Vowel length. It is the most common source of misunderstood words for learners from any background, and Hindi does not prepare you for the strictly durational version Japanese uses.',
      },
      { kind: 'h', text: 'What is equally hard for everyone' },
      {
        kind: 'list',
        items: [
          'Kanji. Three thousand characters with multiple readings each — no alphabetic background helps here.',
          'Counters. Hindi has traces of classifiers, but nothing like the scale Japanese enforces.',
          'は versus が. This distinction is hard for every learner, including advanced ones.',
          'Pitch accent. Both Hindi and English are stress-timed in ways that do not map onto Japanese pitch.',
        ],
      },
      {
        kind: 'note',
        tone: 'tip',
        title: 'The practical takeaway',
        text: 'Use Devanagari for sounds and Hindi grammar intuition for sentence structure. Do not expect vocabulary help — there is essentially none. And treat kanji as a genuinely new skill rather than something your existing literacy shortcuts.',
      },
    ],
  },
  {
    slug: 'why-romaji-holds-you-back',
    title: 'Why romaji holds you back',
    summary:
      'Romanised Japanese feels like a shortcut. It is closer to a detour that costs you months.',
    minutes: 5,
    category: 'Method',
    body: [
      {
        kind: 'p',
        text: 'Romaji — Japanese written in Latin letters — looks like a gentle on-ramp. Most beginners lean on it for weeks. Almost every one of them later describes it as the thing they wish they had dropped sooner.',
      },
      { kind: 'h', text: 'It encodes the wrong sounds' },
      {
        kind: 'p',
        text: 'Romaji spells Japanese using English conventions, and English conventions do not fit.',
      },
      {
        kind: 'table',
        head: ['Kana', 'Romaji', 'What English readers say', 'What it should be'],
        rows: [
          ['つ', 'tsu', 'Two sounds: t + su', 'One sound — त्सु'],
          ['ら', 'ra', 'English R, lips rounded', 'A single tongue flap — र / ड़'],
          ['ふ', 'fu', 'Teeth on lip, like "food"', 'Blown between both lips — फु'],
          ['た', 'ta', 'Alveolar, aspirated', 'Dental, light — त'],
          ['ん', 'n', 'A quick consonant', 'A full beat of its own'],
        ],
      },
      {
        kind: 'note',
        tone: 'hindi',
        title: 'Devanagari gets four of those five right for free',
        text: 'त्सु, र, त and the geminate are all sounds Devanagari already writes precisely. This is the entire reason this site leads with Devanagari rather than romaji.',
      },
      { kind: 'h', text: 'It blocks the rhythm' },
      {
        kind: 'p',
        text: 'Japanese timing is counted in equal beats. Kana makes this visible — がっこう is four characters and four beats. Romaji renders it "gakkou", which looks like two syllables and hides the held consonant and the long vowel entirely.',
      },
      { kind: 'h', text: 'It delays the thing you actually need' },
      {
        kind: 'p',
        text: 'Every hour spent reading romaji is an hour not spent building kana recognition. Kana takes most learners one to two weeks of daily practice. Romaji does not shorten that — it postpones it, while quietly installing pronunciation habits you will have to undo.',
      },
      {
        kind: 'note',
        tone: 'tip',
        title: 'A workable rule',
        text: 'Use romaji for the first few days if it helps you get moving, then stop. On this site the romaji is deliberately the smallest, faintest thing on every card — read the kana, check yourself against the Devanagari, and let the Latin letters fall away.',
      },
    ],
  },
  {
    slug: 'jlpt-n5-and-n4-explained',
    title: 'What N5 and N4 actually test',
    summary:
      'The JLPT levels in concrete terms — what is on the exam, what it does not measure, and whether you need it.',
    minutes: 6,
    category: 'Exams',
    body: [
      {
        kind: 'p',
        text: 'The Japanese-Language Proficiency Test runs from N5 (easiest) to N1 (hardest). N5 and N4 are the beginner levels, and together they define the scope of this course.',
      },
      { kind: 'h', text: 'Roughly what each level expects' },
      {
        kind: 'table',
        head: ['', 'N5', 'N4'],
        rows: [
          ['Kanji', '~100', '~300'],
          ['Vocabulary', '~800 words', '~1,500 words'],
          ['Study hours', '250–400', '500–800'],
          ['Grammar', 'Polite forms, basic particles', 'Plain form, conditionals, passive, causative'],
          ['Reading', 'Short kana-heavy passages', 'Everyday topics, short articles'],
          ['Listening', 'Slow, simple exchanges', 'Natural-speed everyday conversation'],
        ],
      },
      {
        kind: 'note',
        tone: 'warn',
        title: 'The hour figures are averages, not promises',
        text: 'They come from surveys of learners with no prior kanji exposure. Consistency matters far more than total hours — thirty minutes daily outperforms four hours every Sunday, by a wide margin.',
      },
      { kind: 'h', text: 'What the exam does not test' },
      {
        kind: 'p',
        text: 'This is the part worth understanding before you organise your study around it.',
      },
      {
        kind: 'list',
        items: [
          'Speaking. There is no spoken component at any level.',
          'Writing. You never produce a character — the whole exam is multiple choice.',
          'Handwriting kanji. You need to recognise them, not write them.',
        ],
      },
      {
        kind: 'note',
        tone: 'tip',
        title: 'What that means practically',
        text: 'It is entirely possible to pass N4 and struggle to hold a conversation. If your goal is talking to people, treat the JLPT as a syllabus rather than a target, and add speaking practice it will never measure.',
      },
      { kind: 'h', text: 'Do you need to take it?' },
      {
        kind: 'p',
        text: 'For most learners, no. N5 and N4 rarely carry weight for jobs or visas — employers generally look for N2 or N1. Their real value is as a structure: a defined, finite list of what to learn next, which is worth a great deal when a language feels boundless.',
      },
      {
        kind: 'p',
        text: 'The test runs twice a year, in July and December, at sites worldwide including several cities in India. Registration opens roughly three months ahead and closes early.',
      },
    ],
  },
  {
    slug: 'studying-kanji-without-drowning',
    title: 'Studying kanji without drowning',
    summary:
      'The character count is the wrong thing to focus on. Here is what to do instead.',
    minutes: 6,
    category: 'Method',
    body: [
      {
        kind: 'p',
        text: 'Kanji is where most learners stall. Roughly 2,000 characters are needed for general literacy, each with several readings, and the number alone is enough to make people quit before starting.',
      },
      { kind: 'h', text: 'Learn words, not characters' },
      {
        kind: 'p',
        text: 'The most common mistake is treating kanji as a list to memorise in isolation — the character, then its meanings, then all its readings. This is slow and it does not stick, because readings only make sense inside words.',
      },
      {
        kind: 'note',
        tone: 'warn',
        title: 'What isolated study looks like when it fails',
        text: 'Memorising that 生 reads せい, しょう, い, う, は, き and なま tells you almost nothing usable. Learning 学生 (student), 先生 (teacher) and 生まれる (to be born) gives you three real words — and the readings arrive attached to them.',
      },
      { kind: 'h', text: 'Learn the components' },
      {
        kind: 'p',
        text: 'Kanji are built from a few hundred recurring parts. Once you can see them, complex characters stop being arbitrary.',
      },
      {
        kind: 'table',
        head: ['Character', 'Parts', 'Reading of the whole'],
        rows: [
          ['休', '人 (person) + 木 (tree)', 'rest — someone leaning on a tree'],
          ['明', '日 (sun) + 月 (moon)', 'bright'],
          ['林', '木 + 木', 'woods'],
          ['森', '木 + 木 + 木', 'forest'],
        ],
      },
      {
        kind: 'note',
        tone: 'tip',
        title: 'Do not force a story for every character',
        text: 'Component logic works beautifully for maybe half of common kanji and is a stretch for the rest. Use it where it helps and simply memorise the others rather than inventing elaborate mnemonics that take longer to recall than the character.',
      },
      { kind: 'h', text: 'Spaced repetition, in small doses' },
      {
        kind: 'p',
        text: 'A review app that shows you cards as you are about to forget them is the single most efficient tool available. The trap is volume: adding fifty new cards a day produces an unmanageable review load within a fortnight.',
      },
      {
        kind: 'list',
        items: [
          'Ten new items a day is sustainable for most people. Twenty is ambitious. Fifty is how people quit.',
          'Reviews are not optional — skipping them for a week undoes the scheduling entirely.',
          'Always review words in context, not bare characters.',
        ],
      },
      { kind: 'h', text: 'Read things' },
      {
        kind: 'p',
        text: 'Flashcards maintain what you have met; reading is what actually teaches. Graded readers, NHK Easy News, product packaging, menus, game menus set to Japanese — anything where you meet a character you half-know and have to resolve it. That resolution is what makes it permanent.',
      },
    ],
  },
  {
    slug: 'a-realistic-first-month',
    title: 'A realistic first month',
    summary:
      'What to actually do, week by week, for your first four weeks — and what to ignore.',
    minutes: 5,
    category: 'Method',
    body: [
      {
        kind: 'p',
        text: 'The most common way to fail at Japanese is to start everything at once — kana, kanji, grammar, an app, a textbook, a YouTube series — and burn out inside a month. This is a narrower plan.',
      },
      { kind: 'h', text: 'Week 1 — hiragana only' },
      {
        kind: 'p',
        text: 'Nothing else. Not katakana, not kanji, not vocabulary. Twenty to thirty minutes a day, writing characters by hand while saying them aloud. Handwriting matters here — it builds recall rather than mere recognition.',
      },
      {
        kind: 'note',
        tone: 'tip',
        title: 'Target for the end of week 1',
        text: 'Reading any hiragana word without pausing. Speed comes later; certainty comes now.',
      },
      { kind: 'h', text: 'Week 2 — katakana, and your first words' },
      {
        kind: 'p',
        text: 'Katakana is the same sounds in new shapes, so it goes faster. Because most katakana words are borrowed from English, you can start reading real things almost immediately — menus, signage, product names.',
      },
      { kind: 'h', text: 'Week 3 — sentence structure' },
      {
        kind: 'p',
        text: 'Now grammar. です, は, を, に, and the ます form. If you read Hindi, this is where the word order clicks into place quickly. Aim to build sentences rather than to memorise the rules behind them.',
      },
      { kind: 'h', text: 'Week 4 — numbers, and your first kanji' },
      {
        kind: 'p',
        text: 'Numbers, time and counters — the highest-frequency material in the language. Then the number kanji, which are the easiest possible introduction because you already know what they mean.',
      },
      {
        kind: 'note',
        tone: 'warn',
        title: 'What to ignore for now',
        text: 'Pitch accent, keigo, the full counter list, casual speech, and any advice telling you to start immersion on day one. All of these matter eventually. None of them help in month one, and each one is a way to feel busy without progressing.',
      },
      { kind: 'h', text: 'The thing that actually determines whether you continue' },
      {
        kind: 'p',
        text: 'Not method, not materials — frequency. Fifteen minutes every day beats three hours on Saturday, because language retention is a function of how often you revisit, not how long you sit. Make the daily session small enough that you never have a reason to skip it.',
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
