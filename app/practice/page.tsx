import type { Metadata } from 'next';
import { Practice } from '@/components/practice/practice';

export const metadata: Metadata = {
  title: 'Practice',
  description:
    'Spaced review of every word, sentence and kana character in the course. Scheduled in your browser, no account needed.',
};

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Practice />
    </div>
  );
}
