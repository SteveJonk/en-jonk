import type { MetadataRoute } from 'next';
import { HOME_SLUG, pathForSlug } from '@/lib/links';
import { SITE_URL } from '@/lib/site';
import { client } from '@/sanity/client';
import { PAGE_SLUGS_QUERY } from '@/sanity/queries';

/** Served at `/sitemap.xml`; `robots.ts` points at it. Every published page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await client.fetch(PAGE_SLUGS_QUERY, {}, { next: { revalidate: 30 } });
  return pages.map((page) => ({
    url: `${SITE_URL}${pathForSlug(page.slug)}`,
    lastModified: new Date(page._updatedAt),
    priority: page.slug === HOME_SLUG ? 1 : 0.8,
  }));
}
