import type { Metadata } from 'next';
import { pageMeta } from '@/lib/site';
import { ProgressPanel } from '@/components/progress-panel';

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Your progress',
    description:
      'What you have completed so far. Stored in this browser only.',
    path: '/progress/',
  }),
  robots: { index: false },
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <header>
        <p className="text-sm font-medium tracking-wide text-plum-600">Progress</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
          Where you are
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          There is no account, so this is kept in your browser&rsquo;s local storage.
          It will not follow you to another device or survive clearing your browser
          data.
        </p>
      </header>

      <ProgressPanel className="mt-10" />
    </div>
  );
}
