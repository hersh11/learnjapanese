import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { absolute, pageMeta, SITE_NAME } from '@/lib/site';
import { breadcrumbs, JsonLd } from '@/components/json-ld';
import { articles, getArticle } from '@/lib/data/articles';
import { Blocks } from '@/components/blocks';
import { ReadingProgress } from '@/components/reading-progress';
import { ArrowLeft, Clock } from '@/components/icons';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMeta({
    title: a.title,
    description: a.summary,
    path: `/articles/${a.slug}/`,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <ReadingProgress />
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'Article',
              headline: article.title,
              description: article.summary,
              url: absolute(`/articles/${article.slug}/`),
              inLanguage: 'en',
              timeRequired: `PT${article.minutes}M`,
              publisher: { '@type': 'Organization', name: SITE_NAME, url: absolute('/') },
            },
            breadcrumbs([
              ['Articles', '/articles/'],
              [article.title, `/articles/${article.slug}/`],
            ]),
          ],
        }}
      />

      <nav aria-label="Breadcrumb">
          <Link
            href="/articles/"
          className="group -my-1 inline-flex cursor-pointer items-center gap-2 py-1 text-sm text-ink-muted transition-colors duration-200 hover:text-sakura-700"
        >
          <span className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5">
            <ArrowLeft />
          </span>
          Articles
        </Link>
      </nav>

      <header className="mt-8 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-wider text-ink-faint">
          <span className="rounded-full border border-rule px-2 py-0.5 font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 tabular-nums">
            <span className="h-3.5 w-3.5">
              <Clock />
            </span>
            {article.minutes} min read
          </span>
        </div>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{article.summary}</p>
      </header>

      <div className="mt-2">
        <Blocks blocks={article.body} />
      </div>

      <footer className="mt-16 border-t border-rule pt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-ink-faint">
          Keep reading
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}/`}
              className="group rounded-lg border border-rule bg-paper-raised px-5 py-4
                         transition-colors duration-200 hover:border-sakura-300 hover:bg-sakura-50/30"
            >
              <span className="block font-serif text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-sakura-700">
                {a.title}
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
                {a.summary}
              </span>
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}
