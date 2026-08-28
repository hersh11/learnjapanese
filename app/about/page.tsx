import type { Metadata } from 'next';
import Link from 'next/link';
import { totalLessons, totalMinutes } from '@/lib/curriculum';

export const metadata: Metadata = {
  title: 'How this works',
  description:
    'What this course covers, who it is for, and the decisions behind how it is written.',
};

export default function AboutPage() {
  const hours = Math.round(totalMinutes / 60);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <header>
        <p className="text-sm font-medium tracking-wide text-plum-600">About</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
          How this works
        </h1>
      </header>

      <div className="mt-10 space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
        <p>
          Nihongo Path is a free course in Japanese covering the ground from your
          first character to JLPT N4. It is {totalLessons} lessons, roughly {hours}{' '}
          hours of reading, plus a set of standalone articles on method.
        </p>

        <h2 className="!mt-12 mb-4 font-serif text-2xl font-semibold tracking-tight text-ink">
          Written in English, pronounced in Devanagari
        </h2>
        <p>
          The site is in English. Every Japanese sound also carries a Devanagari
          reading, because Devanagari describes Japanese phonetics far more
          accurately than English spelling can. Japanese dental consonants, geminate
          consonants and the flapped र all have exact Devanagari equivalents and no
          good English ones.
        </p>
        <p>
          That means this course is written for someone comfortable reading English
          who also reads Hindi. If you do not read Devanagari, the lessons still work
          — treat those lines as decoration and use the kana instead.
        </p>

        <h2 className="!mt-12 mb-4 font-serif text-2xl font-semibold tracking-tight text-ink">
          Scope
        </h2>
        <p>
          Everything here is aimed at JLPT N5 and N4. That is a deliberate ceiling.
          The lessons stay at the level of what you need to use the language and stop
          short of the edge cases, exceptions and register subtleties that belong to
          N3 and above.
        </p>
        <p>
          N5 is complete: the writing system, pronunciation, numbers and counters,
          core grammar, and the roughly one hundred N5 kanji. N4 currently has its
          foundational lessons — plain form and the た form — with the remaining
          topics listed on the{' '}
          <Link href="/learn/" className="link-underline">
            course page
          </Link>{' '}
          as they are written.
        </p>

        <h2 className="!mt-12 mb-4 font-serif text-2xl font-semibold tracking-tight text-ink">
          No account, and no tracking
        </h2>
        <p>
          There is nothing to sign up for. Your progress is stored in your
          browser&rsquo;s local storage, which means it is genuinely private — it
          never reaches a server — and also genuinely fragile. It will not follow you
          to another device, and clearing your browser data clears it.
        </p>
        <p>
          You can see and reset what is stored on the{' '}
          <Link href="/progress/" className="link-underline">
            progress page
          </Link>
          .
        </p>

        <h2 className="!mt-12 mb-4 font-serif text-2xl font-semibold tracking-tight text-ink">
          What this course does not do
        </h2>
        <ul className="my-5 list-disc space-y-2.5 pl-5 marker:text-ink-faint">
          <li className="pl-1.5">
            Audio. Every sound is described in writing, which is not the same as
            hearing it. Pair this with any source of spoken Japanese.
          </li>
          <li className="pl-1.5">
            Speaking practice. Reading about grammar does not produce fluency; you
            need someone to talk to.
          </li>
          <li className="pl-1.5">
            Spaced repetition. There is a quiz mode on the{' '}
            <Link href="/kana/" className="link-underline">
              kana chart
            </Link>
            , but no review scheduler. Use a dedicated app for that.
          </li>
        </ul>

        <p className="!mt-10 border-t border-rule pt-6 text-[0.9375rem] text-ink-muted">
          Corrections are welcome — particularly on the Devanagari readings, which
          involve judgement calls where no mapping is exact.
        </p>
      </div>
    </div>
  );
}
