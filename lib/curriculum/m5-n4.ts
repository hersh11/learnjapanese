import type { Module } from './types';

export const towardN4: Module = {
  slug: 'toward-n4',
  title: 'Toward N4',
  level: 'N4',
  marker: '四',
  summary:
    'Plain form, casual speech, and the grammar that turns careful textbook sentences into the way people talk.',
  lessons: [
    {
      slug: 'plain-form',
      title: 'Plain form: everyday Japanese',
      summary: 'The ます form is polite. Plain form is the default everywhere else, and N4 is built on it.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'Everything in the N5 module used ます and です. That is correct, safe, and slightly formal. Between friends, in writing, in film subtitles, and inside almost every piece of complex grammar, Japanese uses the plain form instead. This is the step from careful sentences to natural ones.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Most of N4 is built on this',
          text: 'Plain form is more than a casual variant. Most N4 grammar attaches to it: conditionals, quoting, 〜と思う, relative clauses. Without it, the rest of N4 is out of reach.',
        },
        { kind: 'h', text: 'The dictionary form' },
        {
          kind: 'p',
          text: 'This is the form you find in a dictionary, and the plain present. Going back from ます is mechanical.',
        },
        {
          kind: 'table',
          head: ['Group', 'ます form', 'Plain (dictionary)', 'Rule'],
          rows: [
            ['Group 2', '食べます', '食べる', 'ます → る'],
            ['Group 2', '見ます', '見る', 'ます → る'],
            ['Group 1', '飲みます', '飲む', 'i-sound → u-sound'],
            ['Group 1', '書きます', '書く', 'き → く'],
            ['Group 1', '話します', '話す', 'し → す'],
            ['Group 3', 'します', 'する', 'irregular'],
            ['Group 3', '来ます', '来る', 'irregular'],
          ],
        },
        { kind: 'h', text: 'The four plain forms' },
        {
          kind: 'p',
          text: 'Each polite form has a plain counterpart. This table is the core of N4, so come back to it often.',
        },
        {
          kind: 'table',
          head: ['Meaning', 'Polite', 'Plain', 'Example (食べる)'],
          rows: [
            ['Present', '食べます', 'dictionary form', '食べる'],
            ['Negative', '食べません', 'ない form', '食べない'],
            ['Past', '食べました', 'た form', '食べた'],
            ['Past negative', '食べませんでした', 'なかった form', '食べなかった'],
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'A politeness ladder you already use',
          text: 'Hindi shifts between तू, तुम and आप depending on who you are speaking to, and Japanese does the same thing through verb forms rather than pronouns. The instinct for reading a social situation transfers directly: the markers are new, the concept is not.',
        },
        { kind: 'h', text: 'Plain です' },
        {
          kind: 'table',
          head: ['Polite', 'Plain', 'Note'],
          rows: [
            ['学生です', '学生だ', 'だ is often dropped entirely in casual speech'],
            ['学生じゃないです', '学生じゃない', ''],
            ['学生でした', '学生だった', ''],
            ['静かです', '静かだ', 'な-adjectives behave like nouns here'],
            ['高いです', '高い', 'い-adjectives drop です with nothing added'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'When to use which',
          text: 'Plain form with friends, family and people younger or junior to you. Polite form with strangers, colleagues, shopkeepers and anyone senior. When unsure, stay polite: over-formality is mildly stiff, but over-familiarity is genuinely rude.',
        },
      ],
    },
    {
      slug: 'ta-form-and-casual',
      title: 'The た form and casual speech',
      summary: 'The plain past, built exactly like the て form, plus how casual sentences drop their edges.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'If you know the て form, you already know the た form. The conjugation is identical: swap the final て for た and で for だ. This is the best return on effort in all of N4.',
        },
        {
          kind: 'table',
          head: ['Dictionary', 'て form', 'た form', 'Meaning'],
          rows: [
            ['食べる', '食べて', '食べた', 'ate'],
            ['飲む', '飲んで', '飲んだ', 'drank'],
            ['書く', '書いて', '書いた', 'wrote'],
            ['話す', '話して', '話した', 'spoke'],
            ['行く', '行って', '行った', 'went'],
            ['する', 'して', 'した', 'did'],
            ['来る', '来て', '来た', 'came'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Learn て, get た free',
          text: 'The sound-change rules are the same ones from the て form lesson. Drill て until it is automatic and た costs you nothing.',
        },
        { kind: 'h', text: 'Patterns built on the た form' },
        {
          kind: 'table',
          head: ['Pattern', 'Meaning', 'Example'],
          rows: [
            ['〜たことがある', 'have done before', '日本に行ったことがある'],
            ['〜たり〜たりする', 'do things like A and B', '読んだり書いたりする'],
            ['〜たほうがいい', 'had better do', '休んだほうがいい'],
            ['〜たあとで', 'after doing', '食べたあとで'],
          ],
        },
        { kind: 'h', text: 'How casual speech sounds' },
        {
          kind: 'p',
          text: 'Beyond verb forms, casual Japanese trims particles and shortens endings. These are worth recognising long before you use them.',
        },
        {
          kind: 'table',
          head: ['Polite', 'Casual', 'What changed'],
          rows: [
            ['これは何ですか', 'これ何？', 'は and ですか both dropped'],
            ['どこに行きますか', 'どこ行くの？', 'に dropped, の softens the question'],
            ['食べていますか', '食べてる？', 'い drops out of ている'],
            ['そうですね', 'そうだね', 'です → だ'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Recognise it before you produce it',
          text: 'Casual speech carries social risk that polite speech does not. Understanding it in anime and conversation pays off right away; using it with the wrong person lands badly. Default to polite until someone speaks casually to you first.',
        },
      ],
    },
    {
      slug: 'quoting-and-describing',
      title: 'Quoting, thinking, and describing nouns',
      summary:
        'と思う, と言う, and relative clauses: the three things that let you build long sentences.',
      minutes: 8,
      body: [
        {
          kind: 'p',
          text: 'Up to now your sentences have been one clause each. This lesson is where they start nesting: reporting what someone said, saying what you think, and describing a noun with a whole clause. All three attach to the plain form, which is why plain form came first.',
        },
        { kind: 'h', text: '〜と思います: I think that…' },
        {
          kind: 'p',
          text: 'Take a plain-form sentence, add と, then 思います. The と marks everything before it as the content of the thought.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '明日は雨が降ると思います', kana: 'あしたはあめがふるとおもいます', deva: 'अशिता वा अमे गा फुरु तो ओमोइमासु', en: 'I think it will rain tomorrow' },
            { jp: 'この本は面白いと思います', kana: 'このほんはおもしろいとおもいます', deva: 'कोनो होन वा ओमोशिरोइ तो ओमोइमासु', en: 'I think this book is interesting' },
            { jp: '彼は来ないと思います', kana: 'かれはこないとおもいます', deva: 'कारे वा कोनाइ तो ओमोइमासु', en: 'I don’t think he is coming' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'The negative goes on the inside',
          text: 'English says "I don’t think he is coming". Japanese says "I think he is not coming": 来ないと思います. Putting the negative on 思う instead is grammatical but means something different and much stronger.',
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'と is कि, placed after',
          text: 'मुझे लगता है कि वह आएगा puts कि before the quoted clause. Japanese puts と after it, and the verb of thinking comes last. The structure is the same idea, reversed, which matches the general pattern of Japanese marking things from behind.',
        },
        { kind: 'h', text: '〜と言います: quoting' },
        {
          kind: 'p',
          text: 'Same structure. Direct quotes keep 「」 and the original politeness; indirect quotes use plain form.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '田中さんは「行きます」と言いました', deva: 'तानाका सान वा "इकिमासु" तो इइमाशिता', en: 'Tanaka said "I will go": direct' },
            { jp: '田中さんは行くと言いました', kana: 'たなかさんはいくといいました', deva: 'तानाका सान वा इकु तो इइमाशिता', en: 'Tanaka said he would go: indirect' },
            { jp: '名前は何と言いますか', kana: 'なまえはなんといいますか', deva: 'नामाए वा नान तो इइमासु का', en: 'What is it called?' },
          ],
        },
        { kind: 'h', text: 'Relative clauses: describing a noun with a sentence' },
        {
          kind: 'p',
          text: 'In Japanese an entire clause can sit in front of a noun and describe it, with no equivalent of "who", "which" or "that". The clause just goes before the noun, in plain form.',
        },
        {
          kind: 'table',
          head: ['English', 'Japanese', 'Literally'],
          rows: [
            ['the book I read', '私が読んだ本', 'I-read book'],
            ['the person who is speaking', '話している人', 'is-speaking person'],
            ['the restaurant we went to', '行ったレストラン', 'went restaurant'],
            ['a friend who lives in Tokyo', '東京に住んでいる友達', 'Tokyo-in living friend'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'The modifier always comes before the noun',
          text: 'Japanese never puts a describing clause after the noun. However long the description gets, it stacks in front, which is why Japanese sentences can feel back-loaded until you get used to holding the clause open.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Use が, not は, inside the clause',
          text: '私が読んだ本, never 私は読んだ本. は works at the level of the whole sentence; inside a modifying clause the subject takes が.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '昨日買った本は面白いです', kana: 'きのうかったほんはおもしろいです', deva: 'किनोउ कात्ता होन वा ओमोशिरोइ देस', en: 'The book I bought yesterday is interesting' },
            { jp: '母が作った料理が好きです', kana: 'ははがつくったりょうりがすきです', deva: 'हाहा गा त्सुकुत्ता र्योउरि गा सुकि देस', en: 'I like the food my mother made' },
          ],
        },
      ],
    },
    {
      slug: 'potential-form',
      title: 'Potential form: being able to',
      summary: 'One conjugation that replaces "can", and changes which particle you use.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'Japanese has no separate word for "can". Ability is built into the verb itself, and what comes out behaves like a brand-new Group 2 verb.',
        },
        { kind: 'h', text: 'How to build it' },
        {
          kind: 'table',
          head: ['Group', 'Rule', 'Dictionary', 'Potential'],
          rows: [
            ['Group 1', 'final u-sound → e-sound + る', '書く', '書ける'],
            ['Group 1', '', '飲む', '飲める'],
            ['Group 1', '', '話す', '話せる'],
            ['Group 2', 'drop る, add られる', '食べる', '食べられる'],
            ['Group 2', '', '見る', '見られる'],
            ['Group 3', 'irregular', 'する', 'できる'],
            ['Group 3', '', '来る', '来られる'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'The result is always a Group 2 verb',
          text: 'Whatever you started with, the potential form ends in える or られる and conjugates like 食べる. So 書ける → 書けます, 書けない, 書けた. There is nothing new to learn about how it inflects.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'を becomes が',
          text: 'This trips up everyone. 日本語を話します (I speak Japanese) becomes 日本語が話せます (I can speak Japanese). Ability treats the thing as a subject rather than an object, with the same が you saw with 好き and ある.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '日本語が話せます', kana: 'にほんごがはなせます', deva: 'निहोन्गो गा हानासेमासु', en: 'I can speak Japanese' },
            { jp: '辛い物が食べられません', kana: 'からいものがたべられません', deva: 'काराइ मोनो गा ताबेरारेमासेन', en: 'I can’t eat spicy food' },
            { jp: '明日は来られますか', kana: 'あしたはこられますか', deva: 'अशिता वा कोरारेमासु का', en: 'Can you come tomorrow?' },
            { jp: '運転ができます', kana: 'うんてんができます', deva: 'उन्तेन गा देकिमासु', en: 'I can drive' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'ら-dropping in casual speech',
          text: 'You will constantly hear 食べれる instead of 食べられる. This is called ら抜き言葉 and is extremely common in speech, though still marked as incorrect in writing and on exams. Recognise it; write the full form.',
        },
      ],
    },
    {
      slug: 'volitional-form',
      title: 'Volitional: let’s, and intending to',
      summary: 'The よう form: making suggestions, and stating what you plan to do.',
      minutes: 5,
      body: [
        {
          kind: 'p',
          text: 'You already know ましょう ("let’s"). The volitional is its plain-form counterpart, and it does more than suggest. Combine it with と思う and it becomes how you state an intention.',
        },
        {
          kind: 'table',
          head: ['Group', 'Rule', 'Dictionary', 'Volitional', 'Polite'],
          rows: [
            ['Group 1', 'u-sound → o-sound + う', '行く', '行こう', '行きましょう'],
            ['Group 1', '', '飲む', '飲もう', '飲みましょう'],
            ['Group 2', 'drop る, add よう', '食べる', '食べよう', '食べましょう'],
            ['Group 3', 'irregular', 'する', 'しよう', 'しましょう'],
            ['Group 3', '', '来る', '来よう', '来ましょう'],
          ],
        },
        { kind: 'h', text: 'Suggesting' },
        {
          kind: 'examples',
          items: [
            { jp: '行こう', deva: 'इकोउ', en: 'Let’s go: casual' },
            { jp: '一緒に食べましょう', kana: 'いっしょにたべましょう', deva: 'इश्शो नि ताबेमाशोउ', en: 'Let’s eat together: polite' },
            { jp: '休みましょうか', kana: 'やすみましょうか', deva: 'यासुमिमाशोउ का', en: 'Shall we take a break?' },
          ],
        },
        { kind: 'h', text: '〜ようと思います: I intend to' },
        {
          kind: 'p',
          text: 'This is the standard way to say what you plan to do. It is softer and far more natural than stating a bare future.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '日本に行こうと思います', kana: 'にほんにいこうとおもいます', deva: 'निहोन नि इकोउ तो ओमोइमासु', en: 'I’m thinking of going to Japan' },
            { jp: '来年、車を買おうと思っています', kana: 'らいねん、くるまをかおうとおもっています', deva: 'राइनेन, कुरुमा ओ काओउ तो ओमोत्ते इमासु', en: 'I’m planning to buy a car next year' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: '〜つもりです is the firmer version',
          text: 'ようと思う suggests a leaning; つもりです states a decision: 行くつもりです means "I intend to go". Use つもり when the plan is settled.',
        },
      ],
    },
    {
      slug: 'conditionals',
      title: 'Conditionals: と, ば, たら, なら',
      summary: 'Four ways to say "if", and which one to reach for.',
      minutes: 9,
      body: [
        {
          kind: 'p',
          text: 'Japanese has four conditional forms where English has one word. They are not interchangeable, but the distinctions are learnable, and one of them covers most situations you will meet.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'If you remember one thing',
          text: 'たら is the most flexible and the safest default. When you are unsure, use たら. It is rarely wrong, where the other three often are.',
        },
        { kind: 'h', text: '〜と: automatic, inevitable results' },
        {
          kind: 'p',
          text: 'Used when A always causes B: natural laws, machines, directions. Never for requests, invitations or anything the speaker controls.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '春になると、桜が咲きます', kana: 'はるになると、さくらがさきます', deva: 'हारु नि नारु तो, साकुरा गा साकिमासु', en: 'When spring comes, the cherry blossoms bloom' },
            { jp: 'このボタンを押すと、ドアが開きます', kana: 'このボタンをおすと、ドアがあきます', deva: 'कोनो बोतान ओ ओसु तो, दोआ गा अकिमासु', en: 'If you press this button, the door opens' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'と cannot end in a request',
          text: '時間があると、来てください is wrong. Anything with ください, ましょう or an opinion at the end needs たら or ば instead.',
        },
        { kind: 'h', text: '〜たら: the general-purpose conditional' },
        {
          kind: 'p',
          text: 'Built from the た form: just add ら. It handles hypotheticals, sequences, and "when/once", and it accepts requests and suggestions freely.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '雨が降ったら、行きません', kana: 'あめがふったら、いきません', deva: 'अमे गा फुत्तारा, इकिमासेन', en: 'If it rains, I won’t go' },
            { jp: '日本に行ったら、京都に行きたいです', kana: 'にほんにいったら、きょうとにいきたいです', deva: 'निहोन नि इत्तारा, क्योउतो नि इकिताइ देस', en: 'When I go to Japan, I want to visit Kyoto' },
            { jp: '終わったら、教えてください', kana: 'おわったら、おしえてください', deva: 'ओवात्तारा, ओशिएते कुदासाइ', en: 'When you finish, please let me know' },
          ],
        },
        { kind: 'h', text: '〜ば: hypothetical, often written' },
        {
          kind: 'p',
          text: 'Formed by changing the final u-sound to an e-sound plus ば. Leans formal and appears often in set phrases and written Japanese.',
        },
        {
          kind: 'table',
          head: ['Dictionary', 'ば form', 'Meaning'],
          rows: [
            ['行く', '行けば', 'if (one) goes'],
            ['食べる', '食べれば', 'if (one) eats'],
            ['安い', '安ければ', 'if it is cheap'],
            ['する', 'すれば', 'if (one) does'],
          ],
        },
        {
          kind: 'examples',
          items: [
            { jp: '安ければ買います', kana: 'やすければかいます', deva: 'यासुकेरेबा काइमासु', en: 'If it’s cheap, I’ll buy it' },
            { jp: 'どうすればいいですか', deva: 'दोउ सुरेबा ईː देस का', en: 'What should I do? (a very common set phrase)' },
          ],
        },
        { kind: 'h', text: '〜なら: given that, as for' },
        {
          kind: 'p',
          text: 'Responds to something just said or established. It attaches straight to nouns, which the others cannot do.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '京都なら、清水寺がいいですよ', kana: 'きょうとなら、きよみずでらがいいですよ', deva: 'क्योउतो नारा, कियोमिज़ुदेरा गा ईː देस यो', en: 'If it’s Kyoto (you’re asking about), Kiyomizu-dera is good' },
            { jp: '行くなら、傘を持って行って', kana: 'いくなら、かさをもっていって', deva: 'इकु नारा, कासा ओ मोत्ते इत्ते', en: 'If you’re going, take an umbrella' },
          ],
        },
        {
          kind: 'table',
          head: ['Form', 'Use it for', 'Requests allowed?'],
          rows: [
            ['と', 'Automatic, always-true results', 'No'],
            ['たら', 'Almost anything: the default', 'Yes'],
            ['ば', 'Hypotheticals, formal and written', 'Limited'],
            ['なら', 'Reacting to what was just said', 'Yes'],
          ],
        },
      ],
    },
    {
      slug: 'giving-and-receiving',
      title: 'Giving and receiving',
      summary:
        'あげる, くれる and もらう: three verbs where English has two, and the difference is who benefits.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'English uses "give" regardless of direction. Japanese splits it in two depending on whether the thing moves away from you or toward you, and getting this wrong is one of the more noticeable beginner errors.',
        },
        {
          kind: 'table',
          head: ['Verb', 'Direction', 'Structure', 'Meaning'],
          rows: [
            ['あげる', 'me → someone else', '私は Xに Yを あげる', 'I give X a Y'],
            ['くれる', 'someone else → me', 'Xは 私に Yを くれる', 'X gives me a Y'],
            ['もらう', 'I receive from X', '私は Xに/から Yを もらう', 'I receive a Y from X'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'くれる is the one English speakers forget',
          text: 'There is no separate English verb for "give to me", so learners reach for あげる in both directions. 友達が本をあげました cannot mean "my friend gave me a book"; it has to be くれました.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '私は友達にプレゼントをあげました', kana: 'わたしはともだちにプレゼントをあげました', deva: 'वाताशि वा तोमोदाचि नि पुरेज़ेन्तो ओ अगेमाशिता', en: 'I gave my friend a present' },
            { jp: '友達が私に本をくれました', kana: 'ともだちがわたしにほんをくれました', deva: 'तोमोदाचि गा वाताशि नि होन ओ कुरेमाशिता', en: 'My friend gave me a book' },
            { jp: '友達に本をもらいました', kana: 'ともだちにほんをもらいました', deva: 'तोमोदाचि नि होन ओ मोराइमाशिता', en: 'I received a book from my friend' },
          ],
        },
        { kind: 'h', text: 'Giving actions as well as objects' },
        {
          kind: 'p',
          text: 'Attach these to the て form and they describe doing something for someone. This is how Japanese expresses favours, and it is used constantly.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '友達が手伝ってくれました', kana: 'ともだちがてつだってくれました', deva: 'तोमोदाचि गा तेत्सुदात्ते कुरेमाशिता', en: 'My friend helped me: literally "gave me the helping"' },
            { jp: '先生に教えてもらいました', kana: 'せんせいにおしえてもらいました', deva: 'सेन्सेइ नि ओशिएते मोराइमाशिता', en: 'The teacher taught me' },
            { jp: '手伝ってくれませんか', kana: 'てつだってくれませんか', deva: 'तेत्सुदात्ते कुरेमासेन का', en: 'Could you help me? (a natural, soft request)' },
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Closer to देना with a direction built in',
          text: 'Hindi marks direction with compound verbs: दे देना versus ले लेना. Japanese does something comparable but grammaticalises it fully: the choice of verb itself encodes who benefits, and there is no neutral option.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Politeness raises the verb',
          text: 'くださる is the respectful くれる, いただく the humble もらう. 教えていただけますか is a very polite "could you teach me". You will hear both constantly in shops and offices.',
        },
      ],
    },
    {
      slug: 'passive-form',
      title: 'Passive form',
      summary: 'Being done to, including the uniquely Japanese "suffering passive".',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'The passive shifts focus onto the thing receiving the action. Japanese builds it by conjugation, and uses it in one situation English never does.',
        },
        {
          kind: 'table',
          head: ['Group', 'Rule', 'Dictionary', 'Passive'],
          rows: [
            ['Group 1', 'u-sound → a-sound + れる', '言う', '言われる'],
            ['Group 1', '', '読む', '読まれる'],
            ['Group 2', 'drop る, add られる', '食べる', '食べられる'],
            ['Group 3', 'irregular', 'する', 'される'],
            ['Group 3', '', '来る', '来られる'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Group 2 passive looks identical to the potential',
          text: '食べられる is both "can eat" and "is eaten". Only context separates them. Group 1 verbs keep them distinct: 読める (can read) versus 読まれる (is read).',
        },
        { kind: 'h', text: 'Ordinary passive' },
        {
          kind: 'p',
          text: 'The agent, the person doing it, is marked with に.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'この本は多くの人に読まれています', kana: 'このほんはおおくのひとによまれています', deva: 'कोनो होन वा ओओकु नो हितो नि योमारेते इमासु', en: 'This book is read by many people' },
            { jp: '先生に褒められました', kana: 'せんせいにほめられました', deva: 'सेन्सेइ नि होमेरारेमाशिता', en: 'I was praised by the teacher' },
          ],
        },
        { kind: 'h', text: 'The suffering passive' },
        {
          kind: 'p',
          text: 'This has no English equivalent. Japanese can put a sentence in the passive purely to say that something happened to your detriment, even when the verb has no object and you were not directly involved.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '雨に降られました', kana: 'あめにふられました', deva: 'अमे नि फुरारेमाशिता', en: 'I was rained on: the rain fell, and it inconvenienced me' },
            { jp: '子供に泣かれました', kana: 'こどもになかれました', deva: 'कोदोमो नि नाकारेमाशिता', en: 'The child cried on me, and it was a problem' },
            { jp: '友達に来られて、勉強できませんでした', kana: 'ともだちにこられて、べんきょうできませんでした', deva: 'तोमोदाचि नि कोरारेते, बेन्क्योउ देकिमासेन देशिता', en: 'A friend came over and I couldn’t study' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Why this exists',
          text: 'Japanese often avoids saying directly that something was bad. The suffering passive lets the grammar carry the complaint, so the speaker never has to state it. Recognising it is more important than producing it at this level.',
        },
      ],
    },
    {
      slug: 'causative-form',
      title: 'Causative form',
      summary: 'Making and letting someone do something, and the polite request built from it.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'The causative covers both "make someone do" and "let someone do". Japanese uses one form for both, and the particle tells you which is meant.',
        },
        {
          kind: 'table',
          head: ['Group', 'Rule', 'Dictionary', 'Causative'],
          rows: [
            ['Group 1', 'u-sound → a-sound + せる', '行く', '行かせる'],
            ['Group 1', '', '読む', '読ませる'],
            ['Group 2', 'drop る, add させる', '食べる', '食べさせる'],
            ['Group 3', 'irregular', 'する', 'させる'],
            ['Group 3', '', '来る', '来させる'],
          ],
        },
        { kind: 'h', text: 'Make versus let' },
        {
          kind: 'table',
          head: ['Particle', 'Sense', 'Example'],
          rows: [
            ['〜を', 'Made them (no choice)', '子供を行かせました'],
            ['〜に', 'Let them (they wanted to)', '子供に行かせました'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Context usually settles it',
          text: 'The を/に distinction is real but soft. In practice the verb and the situation make it obvious. 野菜を食べさせました clearly means "made them eat vegetables", not "let them".',
        },
        {
          kind: 'examples',
          items: [
            { jp: '母は私に部屋を掃除させました', kana: 'はははわたしにへやをそうじさせました', deva: 'हाहा वा वाताशि नि हेया ओ सोउजि सासेमाशिता', en: 'My mother made me clean my room' },
            { jp: '子供に好きな物を食べさせます', kana: 'こどもにすきなものをたべさせます', deva: 'कोदोमो नि सुकि ना मोनो ओ ताबेसासेमासु', en: 'I let my child eat what they like' },
          ],
        },
        { kind: 'h', text: '〜させていただきます: the very polite request' },
        {
          kind: 'p',
          text: 'Causative plus the humble もらう. Literally "I will humbly receive permission to do it". It is the standard formal way to announce your own action in business Japanese.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '休ませていただきます', kana: 'やすませていただきます', deva: 'यासुमासेते इतादाकिमासु', en: 'I would like to take a day off' },
            { jp: '説明させていただきます', kana: 'せつめいさせていただきます', deva: 'सेत्सुमेइ सासेते इतादाकिमासु', en: 'Allow me to explain' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Do not use the causative on superiors',
          text: 'Telling your boss you made them do something is as bad as it sounds. Toward people above you, use the giving-and-receiving forms (教えていただきました) rather than the causative.',
        },
      ],
    },
    {
      slug: 'transitive-intransitive',
      title: 'Transitive and intransitive pairs',
      summary:
        'Japanese has two verbs where English has one: opening a door, and a door opening.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'English reuses one verb for both "I open the door" and "the door opens". Japanese keeps separate verbs, and they come in pairs that have to be learned together.',
        },
        {
          kind: 'table',
          head: ['Transitive (someone does it)', 'Intransitive (it happens)', 'Meaning'],
          rows: [
            ['開ける (あける)', '開く (あく)', 'open'],
            ['閉める (しめる)', '閉まる (しまる)', 'close'],
            ['始める (はじめる)', '始まる (はじまる)', 'begin'],
            ['つける', 'つく', 'turn on'],
            ['消す (けす)', '消える (きえる)', 'turn off, vanish'],
            ['入れる (いれる)', '入る (はいる)', 'put in / enter'],
            ['出す (だす)', '出る (でる)', 'take out / go out'],
            ['落とす (おとす)', '落ちる (おちる)', 'drop / fall'],
            ['壊す (こわす)', '壊れる (こわれる)', 'break'],
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Transitive takes を, intransitive takes が',
          text: 'This is the reliable test. ドアを開けます: I open the door. ドアが開きます: the door opens. If you can identify who is doing it, you need the transitive verb.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '電気をつけました', kana: 'でんきをつけました', deva: 'देन्कि ओ त्सुकेमाशिता', en: 'I turned on the light' },
            { jp: '電気がつきました', kana: 'でんきがつきました', deva: 'देन्कि गा त्सुकिमाशिता', en: 'The light came on' },
            { jp: '窓が壊れています', kana: 'まどがこわれています', deva: 'मादो गा कोवारेते इमासु', en: 'The window is broken' },
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'Hindi does this too',
          text: 'खोलना versus खुलना, तोड़ना versus टूटना, गिराना versus गिरना. The causative-anticausative pairing is a feature Hindi shares and English lost, so the concept needs no explaining, only new vocabulary.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Japanese prefers the intransitive',
          text: 'Where English says "I broke it", Japanese often says 壊れました, "it broke". Assigning blame explicitly sounds blunt, so the intransitive is the more natural, softer choice in most everyday situations.',
        },
      ],
    },
    {
      slug: 'useful-endings',
      title: 'Endings that do a lot of work',
      summary: '〜ながら, 〜すぎる, 〜やすい, 〜にくい, 〜そう: small additions with big range.',
      minutes: 6,
      body: [
        {
          kind: 'p',
          text: 'These attach to verb stems and immediately widen what you can say. None of them is difficult; together they are most of what makes N4 speech sound fluent rather than assembled.',
        },
        { kind: 'h', text: '〜ながら: while doing' },
        {
          kind: 'p',
          text: 'Take the ます stem and add ながら. The main action is the second verb.',
        },
        {
          kind: 'examples',
          items: [
            { jp: '音楽を聞きながら勉強します', kana: 'おんがくをききながらべんきょうします', deva: 'ओन्गाकु ओ किकिनागारा बेन्क्योउ शिमासु', en: 'I study while listening to music' },
            { jp: '歩きながら話しましょう', kana: 'あるきながらはなしましょう', deva: 'अरुकिनागारा हानाशिमाशोउ', en: 'Let’s talk while walking' },
          ],
        },
        { kind: 'h', text: '〜すぎる: too much' },
        {
          kind: 'examples',
          items: [
            { jp: '食べすぎました', kana: 'たべすぎました', deva: 'ताबेसुगिमाशिता', en: 'I ate too much' },
            { jp: 'この靴は小さすぎます', kana: 'このくつはちいさすぎます', deva: 'कोनो कुत्सु वा चीːसासुगिमासु', en: 'These shoes are too small' },
          ],
        },
        { kind: 'h', text: '〜やすい and 〜にくい: easy and hard to' },
        {
          kind: 'examples',
          items: [
            { jp: 'この本は読みやすいです', kana: 'このほんはよみやすいです', deva: 'कोनो होन वा योमियासुइ देस', en: 'This book is easy to read' },
            { jp: 'この字は読みにくいです', kana: 'このじはよみにくいです', deva: 'कोनो जि वा योमिनिकुइ देस', en: 'This writing is hard to read' },
          ],
        },
        { kind: 'h', text: '〜そう: looks like' },
        {
          kind: 'p',
          text: 'Attached to an adjective stem or verb stem, it reports an impression from appearance.',
        },
        {
          kind: 'examples',
          items: [
            { jp: 'おいしそうですね', deva: 'ओइशिसोउ देस ने', en: 'That looks delicious' },
            { jp: '雨が降りそうです', kana: 'あめがふりそうです', deva: 'अमे गा फुरिसोउ देस', en: 'It looks like it will rain' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'いい and ない are irregular here',
          text: 'いい becomes よさそう, not いそう. ない becomes なさそう. These two are worth memorising because they come up constantly.',
        },
      ],
    },
    {
      slug: 'keigo-intro',
      title: 'Keigo: a first look at polite speech',
      summary:
        'The honorific and humble forms you will hear every day in shops, offices and stations.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'Keigo is the layer of Japanese above ます. Full command of it takes years and is well beyond N4, but recognising it is immediately useful, because it is what shop staff, station announcements and customer service use.',
        },
        {
          kind: 'table',
          head: ['Layer', 'Name', 'Used for'],
          rows: [
            ['尊敬語', 'Honorific', 'Raising the other person’s actions'],
            ['謙譲語', 'Humble', 'Lowering your own actions'],
            ['丁寧語', 'Polite', 'The plain ます / です you already know'],
          ],
        },
        {
          kind: 'note',
          tone: 'hindi',
          title: 'The instinct is familiar; the mechanism is not',
          text: 'Hindi shifts respect through pronouns and verb agreement: आप जाइए versus तू जा. Japanese replaces the verb entirely: 行く becomes いらっしゃる for someone you respect and 参る for yourself. The social reading you already do transfers; the vocabulary does not.',
        },
        { kind: 'h', text: 'The verbs worth recognising' },
        {
          kind: 'table',
          head: ['Plain', 'Honorific (them)', 'Humble (me)', 'Meaning'],
          rows: [
            ['行く / 来る / いる', 'いらっしゃる', '参る / おる', 'go, come, be'],
            ['する', 'なさる', 'いたす', 'do'],
            ['言う', 'おっしゃる', '申す / 申し上げる', 'say'],
            ['食べる / 飲む', '召し上がる', 'いただく', 'eat, drink'],
            ['見る', 'ご覧になる', '拝見する', 'see'],
            ['あげる', '', '差し上げる', 'give'],
            ['もらう', '', 'いただく', 'receive'],
          ],
        },
        { kind: 'h', text: 'What you will hear' },
        {
          kind: 'examples',
          items: [
            { jp: 'いらっしゃいませ', deva: 'इराश्शाइमासे', en: 'Welcome: every shop, every time' },
            { jp: '少々お待ちください', kana: 'しょうしょうおまちください', deva: 'शोउशोउ ओमाचि कुदासाइ', en: 'Please wait a moment' },
            { jp: 'かしこまりました', deva: 'काशिकोमारिमाशिता', en: 'Certainly: staff acknowledging a request' },
            { jp: 'こちらでよろしいでしょうか', deva: 'कोचिरा दे योरोशीː देशोउ का', en: 'Would this be all right?' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'What to do at this level',
          text: 'Do not try to produce keigo yet. Polite ます form is entirely appropriate for a learner in almost every situation, and native speakers do not expect more. Learn to understand these phrases; produce them later.',
        },
      ],
    },
    {
      slug: 'n4-kanji',
      title: 'N4 kanji: the next 200',
      summary: 'How the second batch differs from the first, and the highest-value characters in it.',
      minutes: 7,
      body: [
        {
          kind: 'p',
          text: 'N5 kanji were mostly concrete: numbers, nature, body parts, things you can point at. The N4 set is more abstract, and far more of it appears in two-kanji compounds, which is where on readings start paying off.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Compounds are the shortcut',
          text: 'Once you know 電 (electric) and 車 (vehicle), 電車 (train) costs you nothing. Learning components multiplies rather than adds. That is why the second 200 characters feel easier than the first 100.',
        },
        {
          kind: 'vocab',
          title: 'Daily life',
          items: [
            { jp: '朝', kana: 'あさ / ちょう', deva: 'असा', en: 'morning' },
            { jp: '昼', kana: 'ひる / ちゅう', deva: 'हिरु', en: 'noon, daytime' },
            { jp: '夜', kana: 'よる / や', deva: 'योरु', en: 'night' },
            { jp: '家', kana: 'いえ / か', deva: 'इए / का', en: 'house, family' },
            { jp: '部屋', kana: 'へや', deva: 'हेया', en: 'room' },
            { jp: '会社', kana: 'かいしゃ', deva: 'काइशा', en: 'company' },
            { jp: '仕事', kana: 'しごと', deva: 'शिगोतो', en: 'work' },
            { jp: '電車', kana: 'でんしゃ', deva: 'देन्शा', en: 'train' },
            { jp: '料理', kana: 'りょうり', deva: 'र्योउरि', en: 'cooking, cuisine' },
            { jp: '買物', kana: 'かいもの', deva: 'काइमोनो', en: 'shopping' },
          ],
        },
        {
          kind: 'vocab',
          title: 'Abstract and useful',
          items: [
            { jp: '思', kana: 'おも(う) / し', deva: 'ओमो(उ)', en: 'think' },
            { jp: '考', kana: 'かんが(える) / こう', deva: 'कान्गा(एरु)', en: 'consider' },
            { jp: '知', kana: 'し(る) / ち', deva: 'शि(रु)', en: 'know' },
            { jp: '教', kana: 'おし(える) / きょう', deva: 'ओशि(एरु)', en: 'teach' },
            { jp: '習', kana: 'なら(う) / しゅう', deva: 'नारा(उ)', en: 'learn' },
            { jp: '使', kana: 'つか(う) / し', deva: 'त्सुका(उ)', en: 'use' },
            { jp: '待', kana: 'ま(つ) / たい', deva: 'मा(त्सु)', en: 'wait' },
            { jp: '持', kana: 'も(つ) / じ', deva: 'मो(त्सु)', en: 'hold, carry' },
            { jp: '始', kana: 'はじ(める) / し', deva: 'हाजि(मेरु)', en: 'begin' },
            { jp: '終', kana: 'お(わる) / しゅう', deva: 'ओ(वारु)', en: 'end' },
          ],
        },
        {
          kind: 'vocab',
          title: 'Place and direction',
          items: [
            { jp: '駅', kana: 'えき', deva: 'एकि', en: 'station' },
            { jp: '道', kana: 'みち / どう', deva: 'मिचि / दोउ', en: 'road, path, way' },
            { jp: '町', kana: 'まち / ちょう', deva: 'माचि', en: 'town' },
            { jp: '市', kana: 'し', deva: 'शि', en: 'city' },
            { jp: '県', kana: 'けん', deva: 'केन', en: 'prefecture' },
            { jp: '地図', kana: 'ちず', deva: 'चिज़ु', en: 'map' },
            { jp: '近', kana: 'ちか(い) / きん', deva: 'चिका(इ)', en: 'near' },
            { jp: '遠', kana: 'とお(い) / えん', deva: 'तोओ(इ)', en: 'far' },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Do not front-load the list',
          text: 'Two hundred characters is roughly seven months at ten new items a day with reviews. Trying to compress it produces a review backlog you will abandon. Steady beats fast here more than anywhere else in the language.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Where this leaves you',
          text: 'With N5 and N4 behind you, you can read simple signage and menus, follow slow conversation, and make yourself understood in most everyday situations. That is a genuine foundation, and the point where reading real Japanese starts teaching you faster than any course can.',
        },
      ],
    },
  ],
};
