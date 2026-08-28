import type { Metadata } from 'next';
import { KanaExplorer } from '@/components/kana-explorer';

export const metadata: Metadata = {
  title: 'Kana chart',
  description:
    'The full hiragana and katakana charts with Devanagari pronunciation for every character, plus a quiz mode.',
};

export default function KanaPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <header>
        <p className="text-sm font-medium tracking-wide text-plum-600">Reference</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
          The kana chart
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Every hiragana and katakana character with its Devanagari reading. Switch
          on quiz mode to hide the readings and test yourself. Nothing is recorded,
          it is just a way to check what has stuck.
        </p>
      </header>

      <div className="mt-10">
        <KanaExplorer />
      </div>
    </div>
  );
}
