import type { MetadataRoute } from 'next';
import { modules } from '@/lib/curriculum';
import { articles } from '@/lib/data/articles';
import { absolute } from '@/lib/site';

export const dynamic = 'force-static';

/** Every indexable page. /progress/ is left out: it is per-browser and noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/learn/',
    ...modules.flatMap((m) => [
      `/learn/${m.slug}/`,
      ...m.lessons.map((l) => `/learn/${m.slug}/${l.slug}/`),
    ]),
    '/kana/',
    '/practice/',
    '/articles/',
    ...articles.map((a) => `/articles/${a.slug}/`),
    '/about/',
  ];
  return paths.map((path) => ({ url: absolute(path) }));
}
