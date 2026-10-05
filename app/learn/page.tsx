import type { Metadata } from 'next';
import { pageMeta } from '@/lib/site';
import { modules, totalLessons, totalMinutes } from '@/lib/curriculum';
import { ModuleList } from '@/components/module-list';
import { ProgressBar } from '@/components/progress-bar';

export const metadata: Metadata = pageMeta({
  title: 'The course',
  description:
    'Every lesson from the first hiragana character to JLPT N4 grammar, in order.',
  path: '/learn/',
});

export default function LearnPage() {
  const hours = Math.round(totalMinutes / 60);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <header>
        <p className="text-sm font-medium tracking-wide text-plum-600">
          The course
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
          Everything, in order
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          {totalLessons} lessons, about {hours} hours of reading. Work through them
          top to bottom, because each one assumes the ones above it. Tick lessons off as you
          go; your progress is saved in this browser.
        </p>
      </header>

      <ProgressBar className="mt-10" />

      <div className="mt-12">
        <ModuleList modules={modules} />
      </div>
    </div>
  );
}
