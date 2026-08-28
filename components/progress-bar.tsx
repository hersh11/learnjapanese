'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useProgress } from '@/lib/progress';

export function ProgressBar({ className = '' }: { className?: string }) {
  const { ready, completedCount, total, percent } = useProgress();
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-ink">Your progress</span>
        <span className="tabular-nums text-ink-muted">
          {ready ? `${completedCount} of ${total} lessons` : `${total} lessons`}
        </span>
      </div>
      <div
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-paper-deep"
        role="progressbar"
        aria-valuenow={ready ? percent : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        <motion.div
          className="h-full rounded-full bg-sakura-500"
          initial={{ width: 0 }}
          animate={{ width: `${ready ? percent : 0}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
