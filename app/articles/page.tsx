import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/data/articles';
import { Reveal } from '@/components/reveal';
import { ArrowRight, Clock } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Essays on how to study Japanese, what the JLPT measures, and what transfers from Hindi.',
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <header>
        <p className="text-sm font-medium tracking-wide text-plum-600">Reading</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Standalone pieces on method and context: how to study, what the exams
          measure, and where your existing languages help. Read them in any order.
        </p>
      </header>

      <ul className="mt-12 space-y-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <li>
              <Link
                href={`/articles/${a.slug}/`}
                className="group flex cursor-pointer items-start gap-5 rounded-xl border border-rule
                           bg-paper-raised p-6 transition-colors duration-200
                           hover:border-sakura-300 hover:bg-sakura-50/30"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-ink-faint">
                    <span className="rounded-full border border-rule px-2 py-0.5 font-medium">
                      {a.category}
                    </span>
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <span className="h-3.5 w-3.5">
                        <Clock />
                      </span>
                      {a.minutes} min
                    </span>
                  </span>
                  <span className="mt-3 block font-serif text-xl font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-sakura-700">
                    {a.title}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-muted">
                    {a.summary}
                  </span>
                </span>
                <span className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-sakura-600">
                  <ArrowRight />
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
