import { absolute, SITE_NAME } from '@/lib/site';

/**
 * Structured data for search engines (schema.org JSON-LD). Renders nothing
 * visible. `<` is escaped so copy can never close the script tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(
    /</g,
    '\\u003c'
  );
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** A BreadcrumbList from `[name, path]` pairs, starting below the home page. */
export function breadcrumbs(trail: [name: string, path: string][]) {
  const items = [[SITE_NAME, '/'] as const, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absolute(path),
    })),
  };
}
