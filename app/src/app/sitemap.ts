import type { MetadataRoute } from 'next';
import { NAV } from '@/lib/nav';
import { SITE_URL } from '@/lib/site';

// SANITY — the sitemap used to list every CMS page. Re-enable when wiring the CMS:
// import { HOME_SLUG, pathForSlug } from '@/lib/links';
// import { client } from '@/sanity/client';
// import { PAGE_SLUGS_QUERY } from '@/sanity/queries';
//
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const pages = await client.fetch(PAGE_SLUGS_QUERY, {}, { next: { revalidate: 30 } });
//   return pages.map((page) => ({
//     url: `${SITE_URL}${pathForSlug(page.slug)}`,
//     lastModified: new Date(page._updatedAt),
//     changeFrequency: 'monthly' as const,
//     priority: page.slug === HOME_SLUG ? 1 : 0.8,
//   }));
// }

const PATHS = [
  '/',
  ...NAV.map((link) => link.href),
  '/hoe-wij-kijken/ik',
  '/hoe-wij-kijken/jij-en-ik',
  '/hoe-wij-kijken/ik-en-wij',
];

/** Served at `/sitemap.xml`; `robots.ts` points at it. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
