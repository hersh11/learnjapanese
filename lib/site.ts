import type { Metadata } from 'next';

/**
 * Where the site lives. Canonical URLs, the sitemap, robots.txt, llms.txt and the
 * structured data are all built from this one value.
 */
export const SITE_URL = 'https://nihongo.harshnarain.me';
export const SITE_NAME = 'Nihongo Path';
export const SITE_DESCRIPTION =
  'A free, calm course in Japanese from the first character to JLPT N4. Taught in English, with Devanagari pronunciation guides for Hindi speakers. No account needed.';

/**
 * The share image, `app/opengraph-image.png`. Next attaches it to the home page
 * on its own, but a page that sets `openGraph` replaces the inherited images, so
 * `pageMeta` names it again.
 */
const SHARE_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'Nihongo Path: learn Japanese from zero to JLPT N4, with Devanagari pronunciation for Hindi speakers.',
};

/** Absolute URL for a site path such as `/learn/`. */
export function absolute(path: string) {
  return new URL(path, SITE_URL).toString();
}

type PageMeta = {
  title: string;
  description: string;
  /** Site path with a trailing slash, matching `trailingSlash: true`. */
  path: string;
  type?: 'website' | 'article';
};

/**
 * Per-page metadata: title, description, canonical URL and the share preview.
 * `openGraph` replaces the layout's object rather than merging into it, so the
 * site name, locale and image are repeated here.
 */
export function pageMeta({ title, description, path, type = 'website' }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_IN',
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [SHARE_IMAGE] },
  };
}
