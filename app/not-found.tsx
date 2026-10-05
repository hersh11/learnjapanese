import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist. Your progress is still saved in this browser.',
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center sm:px-8">
      <p lang="ja" className="font-serif text-5xl text-plum-400">
        道に迷った
      </p>
      <p className="mt-3 font-deva text-base text-ink-muted">मिचि नि मायोत्ता</p>
      <h1 className="mt-8 font-serif text-3xl font-semibold tracking-tight text-ink">
        Lost the path
      </h1>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
        This page does not exist. Nothing you have learned is gone. Your progress is
        saved in this browser.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/learn/"
          className="btn-primary cursor-pointer rounded-lg px-5 py-3 text-[0.9375rem] font-medium
                     transition-colors duration-200"
        >
          Back to the course
        </Link>
        <Link
          href="/"
          className="cursor-pointer rounded-lg border border-rule-strong bg-paper-raised px-5 py-3
                     text-[0.9375rem] font-medium text-ink-soft transition-colors duration-200
                     hover:border-sakura-400 hover:text-sakura-700"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
