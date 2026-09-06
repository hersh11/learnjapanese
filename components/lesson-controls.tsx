'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import type { LessonRef } from '@/lib/curriculum';
import { useProgress } from '@/lib/progress';
import { ArrowLeft, ArrowRight, Check, Layers } from './icons';

export function LessonControls({
  id,
  prev,
  next,
  reviewCount,
}: {
  id: string;
  prev: LessonRef | null;
  next: LessonRef | null;
  /** Cards this lesson contributes to the review deck. Counted on the server. */
  reviewCount: number;
}) {
  const { ready, isComplete, toggle, visit } = useProgress();
  const done = ready && isComplete(id);

  // Record this lesson as the resume point as soon as it is opened.
  useEffect(() => {
    visit(id);
  }, [id, visit]);

  return (
    <footer className="mt-16 border-t border-rule pt-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => toggle(id)}
          aria-pressed={done}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border
                      px-4 py-2 text-sm font-medium transition-colors duration-200
            ${
              done
                ? 'border-sakura-400 bg-sakura-50 text-sakura-700 hover:bg-sakura-100'
                : 'border-rule-strong bg-paper-raised text-ink-muted hover:border-sakura-400 hover:text-sakura-700'
            }`}
        >
          <span className="h-3.5 w-3.5">
            <Check />
          </span>
          {done ? 'Completed' : 'Mark complete'}
        </button>

        {reviewCount > 0 && (
          <Link
            href={`/practice/?lesson=${encodeURIComponent(id)}`}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border
                       border-rule-strong bg-paper-raised px-4 py-2 text-sm font-medium
                       text-ink-muted transition-colors duration-200
                       hover:border-plum-400 hover:text-plum-700"
          >
            <span className="h-3.5 w-3.5">
              <Layers />
            </span>
            Review these {reviewCount} items
          </Link>
        )}
      </div>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Lesson navigation">
        {prev ? (
          <Link
            href={`/learn/${prev.moduleSlug}/${prev.lessonSlug}/`}
            className="group flex min-w-0 cursor-pointer items-center gap-3 rounded-lg border border-rule
                       bg-paper-raised px-5 py-4 transition-colors duration-200
                       hover:border-sakura-300 hover:bg-sakura-50/30"
          >
            <span className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-sakura-600">
              <ArrowLeft />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-ink-faint">
                Previous
              </span>
              <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink transition-colors duration-200 group-hover:text-sakura-700">
                {prev.lessonTitle}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            href={`/learn/${next.moduleSlug}/${next.lessonSlug}/`}
            className="group flex min-w-0 cursor-pointer items-center justify-end gap-3 rounded-lg border border-rule
                       bg-paper-raised px-5 py-4 text-right transition-colors duration-200
                       hover:border-sakura-300 hover:bg-sakura-50/30"
          >
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-ink-faint">
                Next
              </span>
              <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink transition-colors duration-200 group-hover:text-sakura-700">
                {next.lessonTitle}
              </span>
            </span>
            <span className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-sakura-600">
              <ArrowRight />
            </span>
          </Link>
        )}
      </nav>
    </footer>
  );
}
