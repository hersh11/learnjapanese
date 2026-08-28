import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari, Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { themeInitScript } from '@/components/theme-toggle';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap',
});

const deva = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-deva',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nihongo Path: Learn Japanese from zero to N4',
    template: '%s · Nihongo Path',
  },
  description:
    'A free, calm course in Japanese from the first character to JLPT N4. Taught in English, with Devanagari pronunciation guides for Hindi speakers. No account needed.',
  keywords: ['learn Japanese', 'JLPT N5', 'JLPT N4', 'hiragana', 'katakana', 'Japanese for Hindi speakers'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${jp.variable} ${deva.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                     focus:rounded-md focus:bg-sakura-600 focus:px-4 focus:py-2 focus:text-white
                     dark:focus:bg-sakura-500 dark:focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
