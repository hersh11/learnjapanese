import Link from 'next/link';

/**
 * Link rows carry their own vertical padding rather than relying on the list's
 * gap, so each one is a ~34px tap target instead of the 17px the bare text gave.
 * The negative inline margin cancels the horizontal padding, so the column still
 * lines up flush with the heading above it.
 */
const linkClass =
  '-mx-2 inline-block cursor-pointer rounded-md px-2 py-2 transition-colors ' +
  'duration-200 hover:text-sakura-700';

const columns = [
  {
    heading: 'Learn',
    links: [
      { href: '/learn/', label: 'All lessons' },
      { href: '/practice/', label: 'Practice' },
      { href: '/kana/', label: 'Kana chart' },
      { href: '/articles/', label: 'Articles' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/about/', label: 'How this works' },
      { href: '/progress/', label: 'Your progress' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper-sunk/50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-8">
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2.5">
              <span lang="ja" className="font-serif text-xl text-plum-500">
                道
              </span>
              <span className="font-serif text-base font-semibold">Nihongo Path</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              A free course in Japanese from the first character to JLPT N4, with
              Devanagari pronunciation guides throughout. No account, no tracking.
              Your progress stays in your browser.
            </p>
          </div>

          <nav className="flex gap-12 text-sm" aria-label="Footer">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="font-medium text-ink">{col.heading}</h2>
                <ul className="mt-1.5 text-ink-muted">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
