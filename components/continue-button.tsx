'use client';

import Link from 'next/link';
import { useProgress } from '@/lib/progress';
import { ArrowRight } from './icons';

/**
 * The "pick up where you left off" entry point. Renders the neutral first-visit
 * label during SSR and before localStorage is read, then swaps once progress is
 * known — so the static export never flashes the wrong state.
 */
export function ContinueButton({ className = '' }: { className?: string }) {
  const { ready, resume, completedCount } = useProgress();
  const href = `/learn/${resume.ref.moduleSlug}/${resume.ref.lessonSlug}/`;
  const started = ready && !resume.fresh && completedCount > 0;

  return (
    <div className={className}>
      <Link
        href={href}
        className="btn-primary group inline-flex cursor-pointer items-center gap-2.5 rounded-lg
                   px-6 py-3.5 text-base font-medium shadow-sm transition-colors duration-200"
      >
        {started ? 'Continue where you left off' : 'Start from the beginning'}
        <span className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowRight />
        </span>
      </Link>
      {started && (
        <p className="mt-3 text-sm text-ink-muted">
          Next up: {resume.ref.lessonTitle}
          <span className="text-ink-faint"> · {resume.ref.moduleTitle}</span>
        </p>
      )}
    </div>
  );
}
