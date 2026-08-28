import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper-sunk/50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2.5">
              <span lang="ja" className="font-serif text-xl text-plum-500">
                道
              </span>
              <span className="font-serif text-base font-semibold">Nihongo Path</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              A free course in Japanese from the first character to JLPT N4, with
              Devanagari pronunciation guides throughout. No account, no tracking —
              your progress stays in your browser.
            </p>
          </div>

          <nav className="flex gap-12 text-sm" aria-label="Footer">
            <div>
              <h2 className="font-medium text-ink">Learn</h2>
              <ul className="mt-3 space-y-2 text-ink-muted">
                <li>
                  <Link href="/learn/" className="cursor-pointer transition-colors duration-200 hover:text-sakura-700">
                    All lessons
                  </Link>
                </li>
                <li>
                  <Link href="/kana/" className="cursor-pointer transition-colors duration-200 hover:text-sakura-700">
                    Kana chart
                  </Link>
                </li>
                <li>
                  <Link href="/articles/" className="cursor-pointer transition-colors duration-200 hover:text-sakura-700">
                    Articles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-ink">About</h2>
              <ul className="mt-3 space-y-2 text-ink-muted">
                <li>
                  <Link href="/about/" className="cursor-pointer transition-colors duration-200 hover:text-sakura-700">
                    How this works
                  </Link>
                </li>
                <li>
                  <Link href="/progress/" className="cursor-pointer transition-colors duration-200 hover:text-sakura-700">
                    Your progress
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-rule pt-6 text-xs text-ink-faint">
          Built for learners who already read Devanagari. Japanese text set in Noto
          Sans JP.
        </p>
      </div>
    </footer>
  );
}
