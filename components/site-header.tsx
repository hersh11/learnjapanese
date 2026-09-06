'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from './icons';
import { ThemeToggle } from './theme-toggle';

const nav = [
  { href: '/learn/', label: 'Course' },
  { href: '/practice/', label: 'Practice' },
  { href: '/kana/', label: 'Kana chart' },
  { href: '/articles/', label: 'Articles' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 cursor-pointer"
          aria-label="Nihongo Path, home"
        >
          <span
            lang="ja"
            className="font-serif text-2xl leading-none text-plum-500 transition-colors duration-200 group-hover:text-plum-600"
          >
            道
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            Nihongo Path
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors duration-200
                  ${
                    isActive(item.href)
                      ? 'text-sakura-700 font-medium'
                      : 'text-ink-soft hover:bg-paper-sunk hover:text-ink'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="tap flex h-11 w-11 cursor-pointer items-center justify-center rounded-md
                       text-ink-soft transition-colors duration-200 hover:bg-paper-sunk hover:text-ink sm:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="pointer-events-none h-5 w-5">{open ? <X /> : <Menu />}</span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule sm:hidden"
            aria-label="Main"
          >
            <div className="space-y-1 px-5 py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block cursor-pointer rounded-md px-3 py-2.5 text-base transition-colors duration-200
                    ${
                      isActive(item.href)
                        ? 'bg-sakura-50 font-medium text-sakura-700'
                        : 'text-ink-soft hover:bg-paper-sunk'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
