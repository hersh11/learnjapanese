'use client';

import Link from 'next/link';
import type { Module } from '@/lib/curriculum';
import { useProgress } from '@/lib/progress';
import { Check, Clock } from './icons';

export function ModuleList({ modules }: { modules: Module[] }) {
  const { ready, isComplete } = useProgress();

  return (
    <div className="space-y-12">
      {modules.map((m) => {
        const done = m.lessons.filter((l) => isComplete(`${m.slug}/${l.slug}`)).length;

        return (
          <section key={m.slug}>
            <div className="flex items-start gap-4">
              <span
                lang="ja"
                className="mt-1 font-serif text-2xl leading-none text-plum-400"
                aria-hidden="true"
              >
                {m.marker}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                    <Link
                      href={`/learn/${m.slug}/`}
                      className="cursor-pointer transition-colors duration-200 hover:text-sakura-700"
                    >
                      {m.title}
                    </Link>
                  </h2>
                  <span className="rounded-full border border-rule px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint">
                    {m.level}
                  </span>
                  {ready && done > 0 && (
                    <span className="text-xs tabular-nums text-sakura-600">
                      {done}/{m.lessons.length} done
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {m.summary}
                </p>
              </div>
            </div>

            <ol className="mt-5 space-y-1.5 sm:pl-10">
              {m.lessons.map((l, i) => {
                const id = `${m.slug}/${l.slug}`;
                const complete = ready && isComplete(id);

                return (
                  <li key={l.slug}>
                    <Link
                      href={`/learn/${m.slug}/${l.slug}/`}
                      className="group flex cursor-pointer items-start gap-4 rounded-lg border border-transparent
                                 px-4 py-3 transition-colors duration-200
                                 hover:border-rule hover:bg-paper-raised"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.625rem] font-medium tabular-nums transition-colors duration-200
                          ${
                            complete
                              ? 'border-sakura-500 bg-sakura-500 text-white'
                              : 'border-rule-strong text-ink-faint group-hover:border-sakura-400 group-hover:text-sakura-600'
                          }`}
                        aria-hidden="true"
                      >
                        {complete ? (
                          <span className="h-3 w-3">
                            <Check />
                          </span>
                        ) : (
                          i + 1
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-medium transition-colors duration-200 group-hover:text-sakura-700 ${
                            complete ? 'text-ink-muted' : 'text-ink'
                          }`}
                        >
                          {l.title}
                          {complete && <span className="sr-only"> (completed)</span>}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                          {l.summary}
                        </span>
                      </span>

                      <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs tabular-nums text-ink-faint">
                        <span className="h-3.5 w-3.5">
                          <Clock />
                        </span>
                        {l.minutes}m
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            {m.plannedLessons?.length ? (
              <div className="mt-4 sm:pl-10">
                <div className="rounded-lg border border-dashed border-rule-strong bg-paper-sunk/40 px-5 py-4">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                    Still being written
                  </h3>
                  <ul className="mt-2.5 grid gap-x-6 gap-y-1.5 text-sm text-ink-muted sm:grid-cols-2">
                    {m.plannedLessons.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                          aria-hidden="true"
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
