import Link from 'next/link';
import { modules, totalLessons, totalMinutes } from '@/lib/curriculum';
import { ContinueButton } from '@/components/continue-button';
import { Reveal } from '@/components/reveal';
import { ArrowRight, BookOpen, Grid, Languages } from '@/components/icons';

const pillars = [
  {
    Icon: Languages,
    title: 'Sounds written in Devanagari',
    body:
      'Romaji makes つ look like three letters and た sound retroflex. Devanagari already has the dental and geminate distinctions Japanese needs, so you can read a sound and simply say it.',
  },
  {
    Icon: BookOpen,
    title: 'Grammar that maps to what you know',
    body:
      'Japanese and Hindi are both subject-object-verb with postpositions. Where English speakers rebuild their sentence instincts from scratch, you are mostly relabelling parts you already use.',
  },
  {
    Icon: Grid,
    title: 'Enough, and not more',
    body:
      'Scoped to JLPT N5 and N4. Each lesson covers what you need to use the language, and stops before the edge cases that belong to a later level.',
  },
];

export default function HomePage() {
  const hours = Math.round(totalMinutes / 60);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-plum-600">
              <span lang="ja" className="font-jp text-base">
                日本語
              </span>
              <span className="h-px w-8 bg-plum-300" aria-hidden="true" />
              <span>Zero to JLPT N4</span>
            </p>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Learn Japanese in English,
              <br />
              <span className="text-sakura-700">pronounced in Devanagari.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
              A calm, complete path from your first character to JLPT N4 — the
              writing system, pronunciation, numbers, counters and the grammar that
              gets you speaking. Free, no account, and it remembers where you
              stopped.
            </p>

            <ContinueButton className="mt-9" />

            <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-5 border-t border-rule pt-7">
              {[
                { label: 'Lessons', value: String(totalLessons) },
                { label: 'Reading time', value: `~${hours} hours` },
                { label: 'Levels', value: 'N5 · N4' },
                { label: 'Sign-up', value: 'None' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wider text-ink-faint">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-serif text-xl font-medium text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Why this approach */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
            Why a Devanagari guide beats romaji
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Most Japanese courses are written for English speakers, so they explain
            sounds through English spelling. If you read Hindi, you have a closer
            instrument sitting unused.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-rule bg-paper-raised p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sakura-50 text-sakura-600">
                  <span className="h-4.5 w-4.5">
                    <p.Icon />
                  </span>
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* A worked example */}
      <section className="border-y border-rule bg-paper-sunk/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
                  One sentence, three languages
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                  Japanese puts the verb last and marks each word with a particle
                  that follows it. So does Hindi. English does neither — which is
                  why the same sentence takes an English speaker far longer to feel
                  natural.
                </p>
                <Link
                  href="/learn/first-sentences/sentence-shape/"
                  className="group mt-6 inline-flex cursor-pointer items-center gap-2 text-[0.9375rem] font-medium text-sakura-700 transition-colors duration-200 hover:text-sakura-800"
                >
                  See how sentences are built
                  <span className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight />
                  </span>
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { lang: 'English', order: 'S – V – O', text: 'I eat rice', cls: 'text-ink-muted' },
                  { lang: 'Hindi', order: 'S – O – V', text: 'मैं चावल खाता हूँ', cls: 'font-deva text-ink' },
                  { lang: 'Japanese', order: 'S – O – V', text: '私はご飯を食べます', cls: 'font-jp text-ink' },
                ].map((row) => (
                  <div
                    key={row.lang}
                    className="rounded-xl border border-rule bg-paper-raised px-6 py-5"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider text-ink-faint">
                      <span>{row.lang}</span>
                      <span className="tabular-nums">{row.order}</span>
                    </div>
                    <p className={`mt-2 text-2xl leading-snug ${row.cls}`}>{row.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Course path */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
              The path
            </h2>
            <Link
              href="/learn/"
              className="group inline-flex cursor-pointer items-center gap-2 text-[0.9375rem] font-medium text-sakura-700 transition-colors duration-200 hover:text-sakura-800"
            >
              All lessons
              <span className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </Reveal>

        <ol className="mt-10 space-y-3">
          {modules.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.05}>
              <li>
                <Link
                  href={`/learn/${m.slug}/`}
                  className="group flex cursor-pointer items-start gap-5 rounded-xl border border-rule
                             bg-paper-raised p-6 transition-colors duration-200
                             hover:border-sakura-300 hover:bg-sakura-50/30"
                >
                  <span
                    lang="ja"
                    className="mt-0.5 shrink-0 font-serif text-3xl leading-none text-plum-400
                               transition-colors duration-200 group-hover:text-plum-500"
                    aria-hidden="true"
                  >
                    {m.marker}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-serif text-xl font-semibold text-ink">
                        {m.title}
                      </span>
                      <span className="rounded-full border border-rule px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint">
                        {m.level}
                      </span>
                      {m.upcoming && (
                        <span className="rounded-full bg-paper-sunk px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint">
                          In progress
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-muted">
                      {m.summary}
                    </span>
                    <span className="mt-2.5 block text-xs text-ink-faint">
                      {m.lessons.length} {m.lessons.length === 1 ? 'lesson' : 'lessons'}
                      {m.plannedLessons?.length ? ` · ${m.plannedLessons.length} more coming` : ''}
                    </span>
                  </span>
                  <span className="mt-1.5 h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-sakura-600">
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="rounded-2xl border border-rule bg-paper-raised px-8 py-12 text-center">
            <p lang="ja" className="font-serif text-3xl text-plum-500">
              始めましょう
            </p>
            <p className="mt-2 font-deva text-base text-ink-muted">हाजिमेमाशोउ</p>
            <h2 className="mt-5 font-serif text-2xl font-semibold text-ink">
              Let&rsquo;s begin.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
              Start with the sounds. Everything after them is easier, and nothing
              before them is.
            </p>
            <ContinueButton className="mt-7 flex flex-col items-center" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
