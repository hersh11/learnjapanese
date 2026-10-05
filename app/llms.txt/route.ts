import { modules } from '@/lib/curriculum';
import { articles } from '@/lib/data/articles';
import { absolute, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /llms.txt: a plain Markdown map of the site for language models
 * (https://llmstxt.org). Built from the same data as the pages.
 */
export function GET() {
  const link = (title: string, path: string, note: string) =>
    `- [${title}](${absolute(path)}): ${note}`;

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Pronunciation is given in Devanagari rather than romaji. Progress and review schedules are kept in the browser; there are no accounts.',
    '',
    ...modules.flatMap((m) => [
      `## ${m.title} (${m.level})`,
      '',
      m.summary,
      '',
      ...m.lessons.map((l) => link(l.title, `/learn/${m.slug}/${l.slug}/`, l.summary)),
      '',
    ]),
    '## Articles',
    '',
    ...articles.map((a) => link(a.title, `/articles/${a.slug}/`, a.summary)),
    '',
    '## Optional',
    '',
    link('Kana chart', '/kana/', 'Every hiragana and katakana character with its Devanagari reading.'),
    link('Practice', '/practice/', 'Spaced review of the course vocabulary, sentences and kana.'),
    link('How this works', '/about/', 'What the course covers and who it is for.'),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
