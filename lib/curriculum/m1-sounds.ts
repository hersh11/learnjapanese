import type { Module } from './types';

export const soundsAndScript: Module = {
  slug: 'sounds-and-script',
  title: 'Sounds & Script',
  level: 'N5',
  marker: '音',
  summary:
    'Every sound Japanese has, and both kana alphabets. Start here even if you already know some words — the sounds come first.',
  lessons: [
    {
      slug: 'how-japanese-sounds-work',
      title: 'How Japanese sounds work',
      summary: 'Japanese has far fewer sounds than English or Hindi. Here is the whole system in one lesson.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'Japanese is built from about 100 syllables, and almost all of them are one consonant plus one vowel. There are five vowels and they never change. Compared to English — where "ough" has six pronunciations — this is a small, honest system you can finish learning in a week.',
        },
        {
          kind: 'h',
          text: 'The five vowels',
        },
        {
          kind: 'p',
          text: 'Every Japanese sound is built on one of these. They are pure and short, and they do not glide the way English vowels do.',
        },
        {
          kind: 'table',
          head: ['Kana', 'Romaji', 'Devanagari', 'How it sounds'],
          rows: [
            ['あ', 'a', 'अ', 'Short, like the अ in अब'],
            ['い', 'i', 'इ', 'Like इ in इधर'],
            ['う', 'u', 'उ', 'Like उ but with flat, unrounded lips'],
            ['え', 'e', 'ए', 'Like ए in एक'],
            ['お', 'o', 'ओ', 'Like ओ in ओर'],
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Your Hindi is already an advantage',
          text: 'Japanese た, だ, な are dental — tongue against the teeth, exactly like Hindi त, द, न. English speakers spend years unlearning the retroflex ट, ड, ण they hear instead. You already make the right sound without thinking about it.',
        },
        {
          kind: 'h',
          text: 'Every beat is equal',
        },
        {
          kind: 'p',
          text: 'This is the one rhythm rule that matters. Each kana is one beat, called a mora, and every beat takes the same amount of time. Japanese does not stress syllables the way English does — there is no loud part of the word.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'たまご', kana: 'ta-ma-go', deva: 'ता-मा-गो', en: 'egg — three even beats, none louder' },
            { jp: 'ありがとう', kana: 'a-ri-ga-to-u', deva: 'अ-रि-गा-तो-उ', en: 'thank you — five beats, not "ah-ree-GAH-toh"' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'The habit to avoid',
          text: 'Do not lean on romaji. It is a crutch that quietly teaches English spelling habits — つ read as "tsu" becomes two sounds, ら read as "ra" becomes an English R. Read the kana and the Devanagari, and drop romaji as soon as you can.',
        },
        {
          kind: 'h',
          text: 'What you will learn to write',
        },
        {
          kind: 'p',
          text: 'Japanese uses three scripts at once. It sounds like a lot; in practice you learn two small alphabets and then pick up the third gradually, forever.',
        },
        {
          kind: 'list',
          items: [
            'Hiragana (ひらがな) — 46 basic characters. Native Japanese words and all grammar. Learn this first.',
            'Katakana (カタカナ) — the same 46 sounds, different shapes. Used for foreign words, names and emphasis.',
            'Kanji (漢字) — characters borrowed from Chinese, each carrying meaning. You need roughly 100 for N5 and 300 for N4.',
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Where to spend your first week',
          text: 'Hiragana only. Do not touch katakana or kanji yet. Once hiragana is automatic, everything after it gets easier — and nothing before it does.',
        },
      ],
    },
    {
      slug: 'hiragana-vowels-k-s',
      title: 'Hiragana: vowels, か and さ rows',
      summary: 'The first fifteen characters — あいうえお, かきくけこ, さしすせそ.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'Hiragana is organised as a grid: five vowels across, consonant rows going down. Once you see the pattern, you are not learning 46 unrelated shapes — you are learning 5 vowels and 9 consonants that combine predictably.',
        },
        { kind: 'h', text: 'The first three rows' },
        { kind: 'kana', script: 'hiragana', set: 'base', groups: ['a', 'ka', 'sa'] },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Two irregular sounds in these rows',
          text: 'し is shi, never si. す often loses its vowel entirely between consonants or at the end of a word — です is said "des", not "de-su".',
        },
        { kind: 'h', text: 'Words you can already read' },
        {
          kind: 'examples',
          items: [
            { jp: 'あい', deva: 'अइ', en: 'love' },
            { jp: 'いえ', deva: 'इए', en: 'house' },
            { jp: 'かさ', deva: 'कासा', en: 'umbrella' },
            { jp: 'あか', deva: 'अका', en: 'red' },
            { jp: 'えき', deva: 'एकि', en: 'station' },
            { jp: 'すし', deva: 'सुशि', en: 'sushi' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'How to actually memorise these',
          text: 'Write each character by hand five times while saying it aloud. Handwriting builds the memory that reading alone does not — this is the difference between recognising a character and recalling it.',
        },
      ],
    },
    {
      slug: 'hiragana-t-n-h',
      title: 'Hiragana: た, な and は rows',
      summary: 'Fifteen more characters, including the two Japanese sounds that trip everyone up: つ and ふ.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'These three rows contain the sounds romaji handles worst. Take them slowly — つ and ふ are worth getting right now rather than fixing later.',
        },
        { kind: 'h', text: 'The rows' },
        { kind: 'kana', script: 'hiragana', set: 'base', groups: ['ta', 'na', 'ha'] },
        { kind: 'h', text: 'つ — one sound, not two' },
        {
          kind: 'p',
          text: 'Romaji writes it "tsu", which makes it look like t + s + u. It is a single sound: the त्स cluster you already say at the end of वत्स, followed by a flat उ. Say वत्स, then drop the वा.',
        },
        { kind: 'h', text: 'ふ — neither h nor f' },
        {
          kind: 'p',
          text: 'Blow gently between both lips, as if cooling tea. Your top teeth never touch your bottom lip, so it is softer than English "f" and lighter than Hindi फ.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'た is त, not ट',
          text: 'Keep the tongue on the teeth for た, ち, つ, て, と. If you use Hindi त, द, न you are already correct — the retroflex ट that English speakers substitute is the mistake.',
        },
        { kind: 'h', text: 'Practice words' },
        {
          kind: 'examples',
          items: [
            { jp: 'ねこ', deva: 'नेको', en: 'cat' },
            { jp: 'いぬ', deva: 'इनु', en: 'dog' },
            { jp: 'つき', deva: 'त्सुकि', en: 'moon' },
            { jp: 'ふね', deva: 'फुने', en: 'boat' },
            { jp: 'はな', deva: 'हाना', en: 'flower / nose' },
            { jp: 'ちかてつ', deva: 'चिकातेत्सु', en: 'subway' },
          ],
        },
      ],
    },
    {
      slug: 'hiragana-m-y-r-w',
      title: 'Hiragana: ま, や, ら, わ and ん',
      summary: 'The last sixteen characters, and the Japanese R — which is not an R.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'These rows finish the basic hiragana set. After this lesson you can read every native Japanese word written in plain kana.',
        },
        { kind: 'kana', script: 'hiragana', set: 'base', groups: ['ma', 'ya', 'ra', 'wa'] },
        { kind: 'h', text: 'ら行 is a flap, not an R' },
        {
          kind: 'p',
          text: 'The tongue taps the ridge behind your teeth once and leaves. It is not the English R, and not a rolled रर. The closest thing you already say is the ड़ in बड़ा — a single quick flap.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Why this one is easy for you',
          text: 'English speakers have no flap and have to build the sound from scratch. Hindi has it in ड़ and in the quick र of पैसा. Use that tongue movement and Japanese ら, り, る, れ, ろ come out right immediately.',
        },
        { kind: 'h', text: 'ん — the only consonant that stands alone' },
        {
          kind: 'p',
          text: 'Every other kana is consonant + vowel. ん is bare, and it takes a full beat of its own. It also quietly changes shape depending on what follows it — before b, p and m it becomes म.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'にほん', kana: 'ni-ho-n', deva: 'नि-हो-न', en: 'Japan — three beats, the ん is its own' },
            { jp: 'しんぶん', deva: 'शिम्बुन', en: 'newspaper — ん becomes म before ぶ' },
            { jp: 'せんぱい', deva: 'सेम्पाइ', en: 'senior — same shift before ぱ' },
          ],
        },
        {
          kind: 'examples',
          items: [
            { jp: 'やま', deva: 'यामा', en: 'mountain' },
            { jp: 'そら', deva: 'सोरा', en: 'sky' },
            { jp: 'みず', deva: 'मिज़ु', en: 'water' },
            { jp: 'わたし', deva: 'वाताशि', en: 'I / me' },
          ],
        },
      ],
    },
    {
      slug: 'dakuten',
      title: 'Voicing: dakuten and handakuten',
      summary: 'Two small marks turn か into が and は into ぱ. Twenty-five new sounds, no new shapes.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'You do not learn new characters here. Two marks in the top-right corner modify characters you already know: a double stroke (゛) voices the consonant, and a small circle (゜) turns は into ぱ.',
        },
        {
          kind: 'table',
          head: ['Mark', 'Name', 'Effect', 'Example'],
          rows: [
            ['゛', 'dakuten', 'Voices the consonant', 'か → が (क → ग)'],
            ['゜', 'handakuten', 'Only on は行 — makes p', 'は → ぱ (ह → प)'],
          ],
        },
        { kind: 'kana', script: 'hiragana', set: 'dakuten' },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Voicing is a pattern you already own',
          text: 'क→ग, त→द, प→ब is exactly the unvoiced-to-voiced pairing Hindi uses. Japanese does the same thing with a written mark instead of a separate letter, so there is nothing new to hear — only to read.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'ぢ and づ',
          text: 'These sound identical to じ and ず. They are rare and appear mostly in compound words. Recognise them, but write じ and ず.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'かぎ', deva: 'कागि', en: 'key' },
            { jp: 'でんわ', deva: 'देन्वा', en: 'telephone' },
            { jp: 'ぶた', deva: 'बुता', en: 'pig' },
            { jp: 'さんぽ', deva: 'साम्पो', en: 'a walk' },
          ],
        },
      ],
    },
    {
      slug: 'youon',
      title: 'Combined sounds (ようおん)',
      summary: 'A small ゃ, ゅ or ょ merges into the previous character to make one beat.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'When や, ゆ or よ are written small after an い-column character, the two fuse into a single sound taking a single beat. き + ゃ becomes きゃ — क्या, one beat, not two.',
        },
        { kind: 'kana', script: 'hiragana', set: 'youon' },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'This is a conjunct, and you already read them',
          text: 'きゃ is क्या. しゅ is शु. Devanagari conjuncts work the same way — two consonants fused into one syllable. English has no clean way to write these, which is why romaji "kya" looks stranger than it is.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Size matters',
          text: 'きや (full size) is two beats: कि-या. きゃ (small) is one beat: क्या. In print the difference is subtle but it changes the word.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'きゃく', deva: 'क्याकु', en: 'guest / customer' },
            { jp: 'しゃしん', deva: 'शाशिन', en: 'photograph' },
            { jp: 'びょういん', deva: 'ब्योउइन', en: 'hospital' },
            { jp: 'りょこう', deva: 'र्योकोउ', en: 'travel' },
          ],
        },
      ],
    },
    {
      slug: 'long-vowels-and-small-tsu',
      title: 'Length: long vowels and っ',
      summary: 'In Japanese, holding a sound longer makes a different word. This is not optional detail.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'Length is meaning. おばさん is "aunt" and おばあさん is "grandmother" — the only difference is holding the あ for one extra beat. Getting this wrong does not sound like an accent; it produces the wrong word.',
        },
        { kind: 'h', text: 'Long vowels' },
        {
          kind: 'p',
          text: 'Written by adding a vowel kana. Hold the sound for two beats instead of one.',
        },
        {
          kind: 'table',
          head: ['Short', 'Meaning', 'Long', 'Meaning'],
          rows: [
            ['おばさん', 'aunt', 'おばあさん', 'grandmother'],
            ['おじさん', 'uncle', 'おじいさん', 'grandfather'],
            ['ゆき (यु-कि)', 'snow', 'ゆうき (यू-कि)', 'courage'],
            ['ここ', 'here', 'こうこう', 'high school'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'The long お is spelled with う',
          text: 'This surprises everyone: とうきょう (Tokyo) is "to-o-kyo-o", four beats, but written with う. A handful of words use おお instead — おおきい (big), とおい (far).',
        },
        { kind: 'h', text: 'っ — the small tsu' },
        {
          kind: 'p',
          text: 'A small っ doubles the following consonant and takes a full beat of silence. Your mouth gets into position and pauses before releasing.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'You already say this',
          text: 'This is gemination — the doubled consonant in पक्का, अच्छा, बच्चा. Japanese きって is कित्ते with the same held त्. English speakers find this genuinely hard; you do not have to.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'きて', deva: 'किते', en: 'come (て form)' },
            { jp: 'きって', deva: 'कित्ते', en: 'postage stamp — one held beat' },
            { jp: 'がっこう', deva: 'गाक्कोउ', en: 'school' },
            { jp: 'ざっし', deva: 'ज़ाश्शि', en: 'magazine' },
          ],
        },
      ],
    },
    {
      slug: 'katakana',
      title: 'Katakana: the second alphabet',
      summary: 'Same 46 sounds, sharper shapes. Used for foreign words — which means many are words you already know.',
      minutes: 9,
      body: [
        {
          kind: 'p',
          text: 'Katakana carries exactly the sounds you have already learned. Nothing new to hear, only new shapes to read. It marks words borrowed from other languages, foreign names, onomatopoeia, and occasionally emphasis — roughly what italics do in English.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'The payoff comes fast',
          text: 'A large share of katakana words come from English. Once you can read the script, you can decode コーヒー, テレビ and パソコン without learning them as vocabulary.',
        },
        { kind: 'h', text: 'The basic chart' },
        { kind: 'kana', script: 'katakana', set: 'base' },
        { kind: 'h', text: 'With dakuten' },
        { kind: 'kana', script: 'katakana', set: 'dakuten' },
        { kind: 'h', text: 'Combined sounds' },
        { kind: 'kana', script: 'katakana', set: 'youon' },
        { kind: 'h', text: 'The long vowel bar' },
        {
          kind: 'p',
          text: 'Katakana marks long vowels with a straight line — ー — instead of repeating the vowel. It turns with the text: horizontal in horizontal writing, vertical in vertical writing.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'コーヒー', deva: 'कोːहीː', en: 'coffee' },
            { jp: 'テレビ', deva: 'तेरेबि', en: 'television' },
            { jp: 'パソコン', deva: 'पासोकोन', en: 'personal computer' },
            { jp: 'インド', deva: 'इन्दो', en: 'India' },
            { jp: 'カレー', deva: 'कारेː', en: 'curry' },
            { jp: 'アニメ', deva: 'अनिमे', en: 'anime' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Four pairs that catch everyone',
          text: 'シ vs ツ and ソ vs ン differ only in stroke angle. シ and ン are written with strokes coming in low and flat; ツ and ソ come down from the top. When reading, use the surrounding word to decide.',
        },
      ],
    },
    {
      slug: 'reading-practice',
      title: 'Reading practice',
      summary: 'Put the whole script together on real words and your first full sentences.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'Everything below uses only what the previous lessons covered. Read each one aloud before checking the meaning — the goal is decoding without translating first.',
        },
        { kind: 'h', text: 'Everyday words' },
        {
          kind: 'vocab',
          items: [
            { jp: 'ともだち', deva: 'तोमोदाचि', en: 'friend' },
            { jp: 'がっこう', deva: 'गाक्कोउ', en: 'school' },
            { jp: 'せんせい', deva: 'सेन्सेइ', en: 'teacher' },
            { jp: 'たべもの', deva: 'ताबेमोनो', en: 'food' },
            { jp: 'でんしゃ', deva: 'देन्शा', en: 'train' },
            { jp: 'しゅくだい', deva: 'शुकुदाइ', en: 'homework' },
            { jp: 'きょう', deva: 'क्योउ', en: 'today' },
            { jp: 'あした', deva: 'अशिता', en: 'tomorrow' },
          ],
        },
        { kind: 'h', text: 'Mixed script' },
        {
          kind: 'p',
          text: 'Real Japanese mixes all three scripts in one sentence. Here the katakana words are borrowed, the hiragana carries the grammar.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'コーヒーをのみます', deva: 'कोːहीː ओ नोमिमासु', en: 'I drink coffee' },
            { jp: 'インドからきました', deva: 'इन्दो कारा किमाशिता', en: 'I came from India' },
            { jp: 'アニメがすきです', deva: 'अनिमे गा सुकि देस', en: 'I like anime' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Before you move on',
          text: 'You do not need to be fast yet, but you should be able to read any hiragana word without guessing. If you are still pausing on particular characters, stay here — the numbers and grammar modules assume kana is automatic.',
        },
      ],
    },
  ],
};
