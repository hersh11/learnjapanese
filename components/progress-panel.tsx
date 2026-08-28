'use client';

import Link from 'next/link';
import { useState } from 'react';
import { modules } from '@/lib/curriculum';
import { useProgress } from '@/lib/progress';
import { ProgressBar } from './progress-bar';
import { ArrowRight, Check, RotateCcw } from './icons';

export function ProgressPanel({ className = '' }: { className?: string }) {
  const { ready, isComplete, completedCount, resume, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);

  return (
    <div className={className}>
      <ProgressBar />

      {ready && completedCount > 0 && (
        <Link
          href={`/learn/${resume.ref.moduleSlug}/${resume.ref.lessonSlug}/`}
          className="group mt-8 flex cursor-pointer items-center gap-4 rounded-xl border border-sakura-200
                     bg-sakura-50/50 px-6 py-5 transition-colors duration-200 hover:bg-sakura-50"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-xs uppercase tracking-wider text-sakura-600">
              Pick up here
            </span>
            <span className="mt-1 block font-serif text-lg font-semibold text-ink">
              {resume.ref.lessonTitle}
            </span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              {resume.ref.moduleTitle}
            </span>
          </span>
          <span className="h-5 w-5 shrink-0 text-sakura-600 transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight />
          </span>
        </Link>
      )}

      <div className="mt-12 space-y-8">
        {modules.map((m) => {
          const done = m.lessons.filter((l) => isComplete(`${m.slug}/${l.slug}`)).length;
          return (
            <section key={m.slug}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-lg font-semibold text-ink">
                  <Link
                    href={`/learn/${m.slug}/`}
                    className="cursor-pointer transition-colors duration-200 hover:text-sakura-700"
                  >
                    {m.title}
                  </Link>
                </h2>
                <span className="shrink-0 text-sm tabular-nums text-ink-muted">
                  {ready ? done : 0}/{m.lessons.length}
                </span>
              </div>

              <ul className="mt-3 space-y-1">
                {m.lessons.map((l) => {
                  const complete = ready && isComplete(`${m.slug}/${l.slug}`);
                  return (
                    <li key={l.slug}>
                      <Link
                        href={`/learn/${m.slug}/${l.slug}/`}
                        className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5
                                   transition-colors duration-200 hover:bg-paper-sunk"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border
                            ${
                              complete
                                ? 'border-sakura-500 bg-sakura-500 text-white'
                                : 'border-rule-strong'
                            }`}
                          aria-hidden="true"
                        >
                          {complete && (
                            <span className="h-2.5 w-2.5">
                              <Check />
                            </span>
                          )}
                        </span>
                        <span
                          className={`text-[0.9375rem] transition-colors duration-200 group-hover:text-sakura-700 ${
                            complete ? 'text-ink-muted' : 'text-ink-soft'
                          }`}
                        >
                          {l.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {ready && completedCount > 0 && (
        <div className="mt-12 border-t border-rule pt-6">
          {confirming ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-ink-soft">
                Clear all {completedCount} completed lessons?
              </span>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirming(false);
                }}
                className="cursor-pointer rounded-md bg-plum-600 px-3.5 py-2 text-sm font-medium
                           text-white transition-colors duration-200 hover:bg-plum-700
                           dark:bg-plum-500 dark:text-black dark:hover:bg-plum-600"
              >
                Yes, clear it
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="cursor-pointer rounded-md px-3.5 py-2 text-sm text-ink-muted
                           transition-colors duration-200 hover:bg-paper-sunk hover:text-ink"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted
                         transition-colors duration-200 hover:text-plum-700"
            >
              <span className="h-3.5 w-3.5">
                <RotateCcw />
              </span>
              Reset my progress
            </button>
          )}
        </div>
      )}
    </div>
  );
}
