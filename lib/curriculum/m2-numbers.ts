import type { Module } from './types';

export const numbersAndCounting: Module = {
  slug: 'numbers-and-counting',
  title: 'Numbers & Counting',
  level: 'N5',
  marker: '数',
  summary:
    'Counting, telling time, dates, money and age, plus the counter system, which is the part nobody warns you about.',
  lessons: [
    {
      slug: 'numbers-one-to-ten',
      title: 'Numbers 1 to 10',
      summary: 'Ten readings, three of which have two forms. Learn which form to prefer and why.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'Japanese numbers are regular and stack predictably, so learning ten of them gets you to 99 in the next lesson. Watch three of them. 4, 7 and 9 each have two readings, and picking the wrong one is the most common beginner mistake.',
        },
        { kind: 'numbers', table: 'digits' },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Default to よん, なな, きゅう',
          text: 'し (4) sounds like 死 "death" and is avoided. しち (7) is easily misheard as いち (1). Use よん, なな and きゅう unless a fixed expression demands otherwise, and time is the main place it does.',
        },
        { kind: 'h', text: 'Counting out loud' },
        {
          kind: 'p',
          text: 'When you are just reciting numbers, as in a phone number or a countdown, speakers run through いち, に, さん, よん, ご, ろく, なな, はち, きゅう, じゅう.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Two number systems, like Hindi',
          text: 'Japanese has native numbers (ひとつ, ふたつ) alongside these borrowed Chinese ones, roughly how Hindi carries both tatsam and everyday forms. The Chinese-derived set above is what you use for most counting; the native set appears in the つ counter you will meet shortly.',
        },
      ],
    },
    {
      slug: 'numbers-beyond-ten',
      title: 'Numbers beyond ten',
      summary: 'Building 11 to 99,999 by stacking, plus the sound changes that break the pattern.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'Above ten, Japanese is refreshingly literal. 11 is "ten one". 20 is "two ten". 35 is "three ten five". There are no words like "eleven" or "thirty" to memorise separately.',
        },
        { kind: 'numbers', table: 'tens' },
        { kind: 'h', text: 'Hundreds, thousands and 万' },
        {
          kind: 'p',
          text: 'The same stacking continues, but certain combinations trigger sound changes to make them easier to say. These are not optional. さんひゃく is simply not a word.',
        },
        { kind: 'numbers', table: 'large' },
        {
          kind: 'note',
          tone: 'hindi',
          title: '万 works like लाख',
          text: 'Japanese groups large numbers in units of 10,000 (万), not 1,000. So 100,000 is 十万, "ten man". If you already think in लाख and करोड़ rather than thousands and millions, this regrouping will feel natural where English speakers struggle.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: '10,000 is いちまん',
          text: 'Never just まん. Unlike 百 and 千, which can stand alone, 万 always takes its number, so ¥10,000 is いちまんえん.',
        },
      ],
    },
    {
      slug: 'counters',
      title: 'Counters: the part nobody warns you about',
      summary: 'You cannot just say "three" in Japanese. The word changes with what you are counting.',
      minutes: 9,
      body: [
        {
          kind: 'p',
          text: 'Japanese does not let a bare number attach to a noun. Counting three pens, three people and three cats uses three different words. The counter goes after the number, and some combinations trigger sound changes.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'You have seen this before',
          text: 'Hindi does this in a smaller way: दो अदद, तीन नग in commercial usage, or the classifier feel of दो जोड़ी. Japanese applies it to every countable noun, without exception.',
        },
        { kind: 'h', text: 'The counters worth knowing first' },
        { kind: 'counters' },
        { kind: 'h', text: 'How it fits in a sentence' },
        {
          kind: 'p',
          text: 'The number and counter usually sit just before the verb, not next to the noun. This ordering feels strange at first and then stops being noticeable.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'ねこが三匹います', kana: 'ねこがさんびきいます', deva: 'नेको गा साम्बिकि इमासु', en: 'There are three cats' },
            { jp: 'ビールを二本ください', kana: 'ビールをにほんください', deva: 'बीːरु ओ निहोन कुदासाइ', en: 'Two beers, please' },
            { jp: '学生が四人います', kana: 'がくせいがよにんいます', deva: 'गाकुसेइ गा योनिन इमासु', en: 'There are four students' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'When you are stuck, use 〜つ',
          text: 'If you cannot remember the right counter, ひとつ, ふたつ, みっつ works for most physical objects up to ten. It is slightly informal but always understood, far better than freezing mid-sentence.',
        },
      ],
    },
    {
      slug: 'telling-time',
      title: 'Telling time',
      summary: 'Hours and minutes, including the four readings that refuse to follow the rules.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'Time uses 時 (じ) for hours and 分 (ふん / ぷん) for minutes. The structure is simple; the irregular readings are what you actually have to memorise.',
        },
        { kind: 'h', text: 'Hours: 時' },
        {
          kind: 'p',
          text: 'Mostly number + じ. Four hours break the pattern, and notably they use the readings the last lesson told you to avoid.',
        },
        { kind: 'numbers', table: 'hours' },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Time overrides the usual preference',
          text: '4:00 is よじ, 7:00 is しちじ, 9:00 is くじ. These are fixed. This is the main place where し and く are correct and よん and きゅう are wrong.',
        },
        { kind: 'h', text: 'Minutes: 分' },
        {
          kind: 'p',
          text: 'Minutes alternate between ふん and ぷん depending on the number before them. The pattern is consistent once you have heard it a few times.',
        },
        { kind: 'numbers', table: 'minutes' },
        {
          kind: 'examples',
          items: [
            { jp: '今、何時ですか', kana: 'いま、なんじですか', deva: 'इमा, नान्जि देस का', en: 'What time is it now?' },
            { jp: '三時半です', kana: 'さんじはんです', deva: 'सान्जि हान देस', en: 'It is 3:30' },
            { jp: '九時十五分です', kana: 'くじじゅうごふんです', deva: 'कुजि जूगोफुन देस', en: 'It is 9:15' },
            { jp: '午前 / 午後', kana: 'ごぜん / ごご', deva: 'गोज़ेन / गोगो', en: 'AM / PM: these come before the time' },
          ],
        },
      ],
    },
    {
      slug: 'dates-and-days',
      title: 'Dates, months and days of the week',
      summary: 'The first ten days of the month are irregular. The weekdays are named after elements.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'Dates are the least regular corner of Japanese numbers. The first ten days of the month use old native readings you have to learn one by one. After the tenth it settles down.',
        },
        { kind: 'h', text: 'Days of the month' },
        { kind: 'numbers', table: 'days' },
        {
          kind: 'note',
          tone: 'warn',
          title: 'The two to watch',
          text: '四日 (よっか, 4th) and 八日 (ようか, 8th) sound close enough to confuse in speech. 二十日 (はつか, 20th) is fully irregular and is worth memorising by itself.',
        },
        { kind: 'h', text: 'Months' },
        {
          kind: 'p',
          text: 'Months are just number + 月 (がつ). Only three break the pattern, and they are the same three numbers as always.',
        },
        { kind: 'numbers', table: 'months' },
        { kind: 'h', text: 'Days of the week' },
        {
          kind: 'p',
          text: 'Each weekday is named after a classical element, which makes them easier to remember than they look.',
        },
        { kind: 'numbers', table: 'weekdays' },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Date order runs large to small',
          text: 'Japanese writes year, then month, then day, 2026年8月28日. This matches how Hindi and English both say dates aloud far better than the American month-first order does.',
        },
      ],
    },
    {
      slug: 'numbers-in-the-wild',
      title: 'Numbers in the wild',
      summary: 'Money, age, phone numbers and addresses, where digits and kana mix on the page.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'Written Japanese switches freely between Arabic digits and kanji numerals. Horizontal text usually uses digits; vertical text and formal documents use kanji. Both are read identically aloud.',
        },
        {
          kind: 'table',
          head: ['Written', 'Also written', 'Read as', 'Meaning'],
          rows: [
            ['3時', '三時', 'さんじ', '3 o’clock'],
            ['¥500', '五百円', 'ごひゃくえん', '500 yen'],
            ['20歳', '二十歳', 'はたち', '20 years old'],
            ['8月28日', '八月二十八日', 'はちがつにじゅうはちにち', 'August 28'],
          ],
        },
        { kind: 'h', text: 'Money' },
        {
          kind: 'p',
          text: 'Yen is 円 (えん), and it is completely regular, no sound changes at all. Prices are one of the easiest things to start reading.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '￥1,200', kana: 'せんにひゃくえん', deva: 'सेन निह्याकु एन', en: '1,200 yen' },
            { jp: 'いくらですか', deva: 'इकुरा देस का', en: 'How much is it?' },
            { jp: '三万円です', kana: 'さんまんえんです', deva: 'साम्मान एन देस', en: 'It is 30,000 yen' },
          ],
        },
        { kind: 'h', text: 'Age' },
        {
          kind: 'examples',
          items: [
            { jp: '何歳ですか', kana: 'なんさいですか', deva: 'नान्साइ देस का', en: 'How old are you?' },
            { jp: '二十五歳です', kana: 'にじゅうごさいです', deva: 'निजूगो साइ देस', en: 'I am 25' },
            { jp: '二十歳', kana: 'はたち', deva: 'हाताचि', en: '20 years old: irregular, and culturally significant' },
          ],
        },
        { kind: 'h', text: 'Phone numbers' },
        {
          kind: 'p',
          text: 'Read digit by digit. The hyphen is read の. Here 4 and 7 go back to よん and なな, and 0 is usually ゼロ.',
        },
        {
          kind: 'examples',
          items: [
            {
              jp: '090-1234-5678',
              deva: 'ज़ेरो क्यू ज़ेरो नो इचि नि सान योन नो गो रोकु नाना हाचि',
              en: 'Read as individual digits, の for each hyphen',
            },
          ],
        },
      ],
    },
  ],
};
