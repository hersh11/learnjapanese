import type { Module } from './types';

export const firstSentences: Module = {
  slug: 'first-sentences',
  title: 'First Sentences',
  level: 'N5',
  marker: '文',
  summary:
    'The grammar that gets you speaking: sentence structure, particles, adjectives and verbs. If you read Hindi, this module will feel unexpectedly familiar.',
  lessons: [
    {
      slug: 'sentence-shape',
      title: 'The shape of a Japanese sentence',
      summary: 'Verb last, markers after words, and anything obvious simply left out.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'Japanese puts the verb at the end, and marks each word’s role with a particle that comes after it. English does neither, which is why English speakers struggle here. Hindi does both, so you are starting from a much better place than they are.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Your biggest advantage',
          text: 'Hindi and Japanese are both subject-object-verb with postpositions. मैं खाना खाता हूँ is literally I / food / eat, and 私はご飯を食べます is I は / rice を / eat. The word order is the same. English speakers spend months rebuilding this instinct; you already have it.',
        },
        {
          kind: 'table',
          head: ['Language', 'Order', 'Sentence'],
          rows: [
            ['English', 'S · V · O', 'I eat rice'],
            ['Hindi', 'S · O · V', 'मैं चावल खाता हूँ'],
            ['Japanese', 'S · O · V', '私はご飯を食べます'],
          ],
        },
        { kind: 'h', text: 'Particles are postpositions' },
        {
          kind: 'p',
          text: 'A particle attaches after a word and tells you what that word is doing in the sentence. That is exactly the job your Hindi postpositions do. The marker follows the noun instead of coming before it, the way English prepositions do.',
        },
        {
          kind: 'table',
          head: ['Japanese', 'Role', 'Hindi parallel'],
          rows: [
            ['〜を', 'marks the object', 'को'],
            ['〜に', 'destination, time, recipient', 'को / में / पर'],
            ['〜で', 'place of action, means', 'में / से'],
            ['〜から', 'from', 'से'],
            ['〜まで', 'until', 'तक'],
          ],
        },
        { kind: 'h', text: 'Japanese drops what is obvious' },
        {
          kind: 'p',
          text: 'If the context makes the subject obvious, drop it. Saying 私は in every sentence sounds oddly insistent, the way repeating "I, myself" would in English.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '学生です', kana: 'がくせいです', deva: 'गाकुसेइ देस', en: '(I) am a student' },
            { jp: '食べます', kana: 'たべます', deva: 'ताबेमासु', en: '(I / he / they) eat' },
            { jp: '行きますか', kana: 'いきますか', deva: 'इकिमासु का', en: 'Are (you) going?' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'No plurals, no articles, no verb agreement',
          text: 'Japanese has no "a" or "the", no -s on plurals, and verbs do not change for person or number. 食べます covers I eat, he eats and they eat. This is less to track than either English or Hindi.',
        },
      ],
    },
    {
      slug: 'desu',
      title: 'です and saying what things are',
      summary: 'The X は Y です frame: your first complete sentence.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'です is the polite way to link two things. X は Y です means "X is Y". It is not really a verb, and it never changes for person, which makes it the easiest place to start.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'です is है, roughly',
          text: 'यह किताब है maps almost exactly onto これは本です. Both put the linking word at the end, and neither changes with the subject the way English is/am/are does.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '私は学生です', kana: 'わたしはがくせいです', deva: 'वाताशि वा गाकुसेइ देस', en: 'I am a student' },
            { jp: 'これは本です', kana: 'これはほんです', deva: 'कोरे वा होन देस', en: 'This is a book' },
            { jp: '田中さんは先生です', kana: 'たなかさんはせんせいです', deva: 'तानाका सान वा सेन्सेइ देस', en: 'Mr/Ms Tanaka is a teacher' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'です is pronounced "des"',
          text: 'The final う almost vanishes. Say देस, not देसु. The same happens to ます, मास, not मासु.',
        },
        { kind: 'h', text: 'Asking questions' },
        {
          kind: 'p',
          text: 'Add か to the end. Nothing else moves. There is no inversion the way English flips "you are" into "are you".',
        },
        {
          kind: 'examples',
          items: [
            { jp: '学生ですか', kana: 'がくせいですか', deva: 'गाकुसेइ देस का', en: 'Are you a student?' },
            { jp: 'はい、学生です', kana: 'はい、がくせいです', deva: 'हाइ, गाकुसेइ देस', en: 'Yes, I am a student' },
            { jp: 'いいえ、学生じゃないです', kana: 'いいえ、がくせいじゃないです', deva: 'ईए, गाकुसेइ जा नाइ देस', en: 'No, I am not a student' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'か replaces the question mark',
          text: 'Japanese written with か usually needs no question mark, though casual writing often adds one anyway.',
        },
      ],
    },
    {
      slug: 'wa-and-ga',
      title: 'は and が: the hard one, early',
      summary: 'Two particles that both look like "the subject". The difference is topic versus new information.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'This one has no clean English equivalent, and it is the particle pair learners fight with longest. I would rather introduce it early with a simple rule than let you avoid it for months.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'は is written は but read わ',
          text: 'Only when it is working as a particle. As part of a word, as in はな (flower), it is read normally as ha.',
        },
        { kind: 'h', text: 'The working rule' },
        {
          kind: 'list',
          items: [
            'は sets the topic ("as for X…"), the thing you are already talking about.',
            'が points at the subject as new or specific information, the answer to a question.',
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Think तो',
          text: 'は behaves much like Hindi तो in मैं तो जाऊँगा: it lifts something up as the topic and implies a contrast with everything else. English has no particle that does this, which is exactly why the English explanation always sounds vague.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '私は田中です', kana: 'わたしはたなかです', deva: 'वाताशि वा तानाका देस', en: 'As for me, I am Tanaka: introducing yourself' },
            { jp: '誰が来ましたか', kana: 'だれがきましたか', deva: 'दारे गा किमाशिता का', en: 'Who came? (が, because the answer is new information)' },
            { jp: '田中さんが来ました', kana: 'たなかさんがきました', deva: 'तानाका सान गा किमाशिता', en: 'Tanaka came: が answers the question' },
          ],
        },
        { kind: 'h', text: 'Where each one is fixed' },
        {
          kind: 'table',
          head: ['Situation', 'Particle', 'Example'],
          rows: [
            ['After a question word (誰, 何, どれ)', 'が always', '何がありますか'],
            ['Answering that question', 'が', '本があります'],
            ['Stating a general fact about a topic', 'は', '象は鼻が長い'],
            ['Contrasting two things', 'は', 'コーヒーは好きです'],
            ['With 好き, 上手, ある, いる', 'が', '日本語が好きです'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Do not try to master this now',
          text: 'Use は for topics and が after question words, and you will be right most of the time. The finer feel comes from listening rather than from rules. Every learner goes through this, and it does resolve.',
        },
      ],
    },
    {
      slug: 'core-particles',
      title: 'The particles you need daily',
      summary: 'を, に, で, へ, と, も, から, まで: what each one marks.',
      minutes: 9,
      body: [
        {
          kind: 'p',
          text: 'These eight particles cover most of what you need at N5. Each one attaches after the word it marks, exactly like a Hindi postposition.',
        },
        { kind: 'h', text: '〜を: the object' },
        {
          kind: 'p',
          text: 'Marks what the verb acts on. Written を but pronounced o.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'ご飯を食べます', kana: 'ごはんをたべます', deva: 'गोहान ओ ताबेमासु', en: 'I eat rice' },
            { jp: '水を飲みます', kana: 'みずをのみます', deva: 'मिज़ु ओ नोमिमासु', en: 'I drink water' },
          ],
        },
        { kind: 'h', text: '〜に: destination, time, recipient' },
        {
          kind: 'p',
          text: 'This is the busiest particle you will meet. It marks where you are going, when something happens, and who receives something.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '学校に行きます', kana: 'がっこうにいきます', deva: 'गाक्कोउ नि इकिमासु', en: 'I go to school' },
            { jp: '七時に起きます', kana: 'しちじにおきます', deva: 'शिचिजि नि ओकिमासु', en: 'I get up at seven' },
            { jp: '友達に電話します', kana: 'ともだちにでんわします', deva: 'तोमोदाचि नि देन्वा शिमासु', en: 'I call my friend' },
          ],
        },
        { kind: 'h', text: '〜で: where the action happens, and how' },
        {
          kind: 'p',
          text: 'The contrast with に catches people out: に is where you end up; で is where you do something.',
        },
        {
          kind: 'table',
          head: ['Sentence', 'Particle', 'Why'],
          rows: [
            ['学校に行きます', 'に', 'School is the destination'],
            ['学校で勉強します', 'で', 'School is where the studying happens'],
            ['電車で行きます', 'で', 'The train is the means'],
          ],
        },
        { kind: 'h', text: 'The rest' },
        {
          kind: 'table',
          head: ['Particle', 'Marks', 'Example', 'Meaning'],
          rows: [
            ['〜へ', 'direction (interchangeable with に for movement)', '日本へ行きます', 'I go to Japan'],
            ['〜と', 'with, and (between nouns)', '友達と行きます', 'I go with a friend'],
            ['〜も', 'also, too: replaces は or を', '私も学生です', 'I am a student too'],
            ['〜から', 'from', '九時から', 'from nine o’clock'],
            ['〜まで', 'until', '五時まで', 'until five o’clock'],
            ['〜の', 'possession, linking nouns', '私の本', 'my book'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'へ is read え as a particle',
          text: 'Like は→わ, this is a spelling fossil. When へ marks direction, say ए.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'の is का / की / के, without the agreement',
          text: '私の本 is मेरी किताब. Japanese の never changes for gender or number, so there is no का/की/के choice to make: it is always の.',
        },
      ],
    },
    {
      slug: 'this-that',
      title: 'これ, それ, あれ: this and that',
      summary: 'Japanese splits "that" into two: near you, and near neither of us.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'Where English gives you this and that, Japanese splits it three ways by distance from each speaker. Once you spot the こ / そ / あ / ど shape, the whole pattern is regular.',
        },
        {
          kind: 'table',
          head: ['', 'Thing', 'Modifier', 'Place', 'Meaning'],
          rows: [
            ['こ: near me', 'これ', 'この', 'ここ', 'this / here'],
            ['そ: near you', 'それ', 'その', 'そこ', 'that / there'],
            ['あ: away from both', 'あれ', 'あの', 'あそこ', 'that over there'],
            ['ど: question', 'どれ', 'どの', 'どこ', 'which / where'],
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'यह / वह, with one more step',
          text: 'Hindi splits near and far as यह and वह. Japanese adds a middle term for the listener’s side. それ is the thing in your hand; あれ is the thing across the room from both of us.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'これ vs この',
          text: 'これ stands alone: これは本です (this is a book). この must attach to a noun: この本 (this book). Mixing them up is the most common error here.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'これは何ですか', kana: 'これはなんですか', deva: 'कोरे वा नान देस का', en: 'What is this?' },
            { jp: 'その本をください', kana: 'そのほんをください', deva: 'सोनो होन ओ कुदासाइ', en: 'That book, please' },
            { jp: 'トイレはどこですか', deva: 'तोइरे वा दोको देस का', en: 'Where is the toilet?' },
          ],
        },
      ],
    },
    {
      slug: 'adjectives',
      title: 'Adjectives: い and な',
      summary: 'Two types, and only one of them conjugates.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'Japanese adjectives come in two families. い-adjectives behave almost like verbs and change their own endings. な-adjectives behave like nouns and lean on です. You have to learn which family a word belongs to along with the word itself.',
        },
        { kind: 'h', text: 'い-adjectives' },
        {
          kind: 'p',
          text: 'These end in い and carry their own tense and negation. They do not need です to work, though you add it for politeness.',
        },
        {
          kind: 'table',
          head: ['Form', 'Example', 'Reading', 'Meaning'],
          rows: [
            ['Plain', '高い', 'たかい', 'expensive'],
            ['Negative', '高くない', 'たかくない', 'not expensive'],
            ['Past', '高かった', 'たかかった', 'was expensive'],
            ['Past negative', '高くなかった', 'たかくなかった', 'was not expensive'],
          ],
        },
        { kind: 'h', text: 'な-adjectives' },
        {
          kind: 'p',
          text: 'These take な when they sit directly before a noun. Otherwise they behave like nouns, so you change です rather than the adjective itself.',
        },
        {
          kind: 'table',
          head: ['Form', 'Example', 'Meaning'],
          rows: [
            ['Before a noun', '静かな部屋', 'a quiet room'],
            ['Plain', '静かです', 'is quiet'],
            ['Negative', '静かじゃないです', 'is not quiet'],
            ['Past', '静かでした', 'was quiet'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'きれい and 有名 are な-adjectives',
          text: 'きれい ends in い but is not an い-adjective. It is きれいな, and its negative is きれいじゃない, never きれくない. 嫌い (きらい) is the same trap.',
        },
        {
          kind: 'vocab',
          title: 'Useful adjectives to start with',
          items: [
            { jp: '大きい', kana: 'おおきい', deva: 'ओːकीː', en: 'big (い)' },
            { jp: '小さい', kana: 'ちいさい', deva: 'चीːसाइ', en: 'small (い)' },
            { jp: '新しい', kana: 'あたらしい', deva: 'अताराशीː', en: 'new (い)' },
            { jp: '安い', kana: 'やすい', deva: 'यासुइ', en: 'cheap (い)' },
            { jp: '好き', kana: 'すき', deva: 'सुकि', en: 'liked (な)' },
            { jp: '便利', kana: 'べんり', deva: 'बेन्रि', en: 'convenient (な)' },
            { jp: '元気', kana: 'げんき', deva: 'गेन्कि', en: 'healthy, well (な)' },
          ],
        },
      ],
    },
    {
      slug: 'verbs-masu',
      title: 'Verbs and the ます form',
      summary: 'Three verb groups, one polite ending, and no agreement to worry about.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'Japanese verbs do not change for person or number. 食べます covers I eat, she eats and they eat. What they do change for is tense, politeness and mood. Start with the ます form, the polite present.',
        },
        { kind: 'h', text: 'The three groups' },
        {
          kind: 'table',
          head: ['Group', 'Also called', 'Dictionary form', 'ます form'],
          rows: [
            ['Group 1', 'う-verbs, godan', '飲む (のむ)', '飲みます'],
            ['Group 1', '', '書く (かく)', '書きます'],
            ['Group 2', 'る-verbs, ichidan', '食べる (たべる)', '食べます'],
            ['Group 2', '', '見る (みる)', '見ます'],
            ['Group 3', 'irregular: only two', 'する', 'します'],
            ['Group 3', '', '来る (くる)', '来ます'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'How to tell groups 1 and 2 apart',
          text: 'If a verb ends in える or いる it is usually Group 2. Everything else is Group 1. There are exceptions: 帰る (かえる, to return) and 走る (はしる, to run) are Group 1 despite how they look.',
        },
        { kind: 'h', text: 'Making the ます form' },
        {
          kind: 'list',
          items: [
            'Group 2: drop る, add ます. 食べる → 食べます.',
            'Group 1: shift the final u-sound to its i-sound, then add ます. のむ → のみ → のみます.',
            'Group 3: memorise these two. する → します, 来る → 来ます.',
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Far less to track than Hindi',
          text: 'Hindi verbs change for gender and number: खाता, खाती, खाते. Japanese does none of that. One form covers every subject, so conjugation here is simpler than what you already handle every day.',
        },
        {
          kind: 'vocab',
          title: 'Everyday verbs',
          items: [
            { jp: '食べます', kana: 'たべます', deva: 'ताबेमासु', en: 'eat' },
            { jp: '飲みます', kana: 'のみます', deva: 'नोमिमासु', en: 'drink' },
            { jp: '行きます', kana: 'いきます', deva: 'इकिमासु', en: 'go' },
            { jp: '来ます', kana: 'きます', deva: 'किमासु', en: 'come' },
            { jp: '見ます', kana: 'みます', deva: 'मिमासु', en: 'see, watch' },
            { jp: '読みます', kana: 'よみます', deva: 'योमिमासु', en: 'read' },
            { jp: '書きます', kana: 'かきます', deva: 'काकिमासु', en: 'write' },
            { jp: 'します', deva: 'शिमासु', en: 'do' },
          ],
        },
      ],
    },
    {
      slug: 'past-and-negative',
      title: 'Past tense and negatives',
      summary: 'Four endings that cover every polite verb form you need at N5.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'Once a verb is in ます form, tense and negation are simple substitutions. There are no irregular past tenses to memorise. The pattern below is universal.',
        },
        {
          kind: 'table',
          head: ['Meaning', 'Ending', 'Example', 'Translation'],
          rows: [
            ['Present / future', 'ます', '食べます', 'I eat / will eat'],
            ['Negative', 'ません', '食べません', 'I do not eat'],
            ['Past', 'ました', '食べました', 'I ate'],
            ['Past negative', 'ませんでした', '食べませんでした', 'I did not eat'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Present and future are the same form',
          text: 'Japanese does not have a separate future tense. 行きます means both "I go" and "I will go"; a time word like 明日 (tomorrow) settles it when it matters.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '昨日、映画を見ました', kana: 'きのう、えいがをみました', deva: 'किनोउ, एइगा ओ मिमाशिता', en: 'I watched a film yesterday' },
            { jp: '肉を食べません', kana: 'にくをたべません', deva: 'निकु ओ ताबेमासेन', en: 'I do not eat meat' },
            { jp: '明日、行きます', kana: 'あした、いきます', deva: 'अशिता, इकिमासु', en: 'I will go tomorrow' },
          ],
        },
        { kind: 'h', text: 'The same pattern for です' },
        {
          kind: 'table',
          head: ['Meaning', 'Form', 'Example'],
          rows: [
            ['is', 'です', '学生です'],
            ['is not', 'じゃないです / ではありません', '学生じゃないです'],
            ['was', 'でした', '学生でした'],
            ['was not', 'じゃなかったです', '学生じゃなかったです'],
          ],
        },
      ],
    },
    {
      slug: 'te-form',
      title: 'The て form',
      summary: 'One form, many uses: requests, joining sentences, and actions in progress.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'The て form carries no tense of its own; it connects a verb to whatever comes next. More grammar is built on it than on any other single form.',
        },
        { kind: 'h', text: 'How to build it' },
        {
          kind: 'p',
          text: 'Group 2 and Group 3 are easy. Group 1 depends on the final syllable, and those sound changes are worth drilling until they are automatic.',
        },
        {
          kind: 'table',
          head: ['Ending', 'Becomes', 'Example'],
          rows: [
            ['Group 2: 〜る', '〜て', '食べる → 食べて'],
            ['う / つ / る', 'って', '買う → 買って'],
            ['む / ぶ / ぬ', 'んで', '飲む → 飲んで'],
            ['く', 'いて', '書く → 書いて'],
            ['ぐ', 'いで', '泳ぐ → 泳いで'],
            ['す', 'して', '話す → 話して'],
            ['Irregular', '', '行く → 行って, する → して, 来る → 来て'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: '行く is the exception to watch',
          text: 'By the く rule it should be 行いて, but it is 行って: the one Group 1 irregular in the て form.',
        },
        { kind: 'h', text: 'Patterns built on it' },
        {
          kind: 'table',
          head: ['Pattern', 'Meaning', 'Example'],
          rows: [
            ['〜てください', 'please do', '待ってください: please wait'],
            ['〜ています', 'is doing / ongoing state', '食べています: is eating'],
            ['〜てもいいです', 'may do', '入ってもいいですか: may I enter?'],
            ['〜てから', 'after doing', '食べてから: after eating'],
            ['〜て、〜', 'and then (joining clauses)', '起きて、食べます: I get up and eat'],
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'て is the कर of Hindi',
          text: 'खाकर जाता हूँ: "having eaten, I go". Japanese 食べて行きます is built exactly the same way: a linking form that chains actions in sequence. English needs "and" or "after"; both your languages use a verb form.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'ちょっと待ってください', deva: 'चोत्तो मात्ते कुदासाइ', en: 'Please wait a moment' },
            { jp: '今、食べています', kana: 'いま、たべています', deva: 'इमा, ताबेते इमासु', en: 'I am eating now' },
            { jp: '写真を撮ってもいいですか', kana: 'しゃしんをとってもいいですか', deva: 'शाशिन ओ तोत्ते मो ईː देस का', en: 'May I take a photo?' },
          ],
        },
      ],
    },
    {
      slug: 'aru-iru',
      title: 'ある and いる: existence',
      summary: 'Two verbs for "there is", split by whether the thing is alive.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'Japanese uses different verbs for the existence of living and non-living things. The split is by animacy, and it is strictly enforced.',
        },
        {
          kind: 'table',
          head: ['Verb', 'Polite', 'Used for', 'Example'],
          rows: [
            ['ある', 'あります', 'objects, plants, abstract things', '本があります: there is a book'],
            ['いる', 'います', 'people and animals', '猫がいます: there is a cat'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'These take が, not を',
          text: 'Even though English says "I have a book", Japanese treats it as "a book exists": 本があります. The thing that exists is marked with が.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Also how you say "have"',
          text: 'Japanese has no separate verb for possession at this level. お金があります is both "there is money" and "I have money"; 兄弟がいます means "I have siblings".',
        },
        {
          kind: 'examples',
          items: [
            { jp: '机の上に本があります', kana: 'つくえのうえにほんがあります', deva: 'त्सुकुए नो उए नि होन गा अरिमासु', en: 'There is a book on the desk' },
            { jp: '公園に子供がいます', kana: 'こうえんにこどもがいます', deva: 'कोउएन नि कोदोमो गा इमासु', en: 'There are children in the park' },
            { jp: '時間がありません', kana: 'じかんがありません', deva: 'जिकान गा अरिमासेन', en: 'I have no time' },
          ],
        },
      ],
    },
    {
      slug: 'question-words',
      title: 'Question words',
      summary: 'What, who, where, when, why and how, plus the counting question 何.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'A question word slots into the same position the answer would occupy. Nothing reorders, which makes questions easier to build here than in English.',
        },
        {
          kind: 'table',
          head: ['Japanese', 'Reading', 'Devanagari', 'Meaning'],
          rows: [
            ['何', 'なに / なん', 'नानि / नान', 'what'],
            ['誰', 'だれ', 'दारे', 'who'],
            ['どこ', '', 'दोको', 'where'],
            ['いつ', '', 'इत्सु', 'when'],
            ['どうして / なぜ', '', 'दोउशिते / नाज़े', 'why'],
            ['どう', '', 'दोउ', 'how'],
            ['どれ / どの', '', 'दोरे / दोनो', 'which'],
            ['いくら', '', 'इकुरा', 'how much (price)'],
            ['いくつ', '', 'इकुत्सु', 'how many'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: '何 is read two ways',
          text: 'なん before counters and です: 何時 (なんじ), 何ですか (なんですか). なに when it stands alone, 何を食べますか (なにをたべますか).',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Question words always take が, never は',
          text: '誰が来ましたか, not 誰は. A question word is new information by definition, and that is が territory. This is the cleanest rule in the whole は/が distinction.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'お名前は何ですか', kana: 'おなまえはなんですか', deva: 'ओनामाए वा नान देस का', en: 'What is your name?' },
            { jp: 'どこから来ましたか', kana: 'どこからきましたか', deva: 'दोको कारा किमाशिता का', en: 'Where did you come from?' },
            { jp: 'インドから来ました', kana: 'インドからきました', deva: 'इन्दो कारा किमाशिता', en: 'I came from India' },
            { jp: 'これはいくらですか', deva: 'कोरे वा इकुरा देस का', en: 'How much is this?' },
          ],
        },
      ],
    },
  ],
};
