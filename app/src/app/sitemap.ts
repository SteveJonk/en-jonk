import type { MetadataRoute } from 'next';
import { articlePath, HOME_SLUG, pathForSlug } from '@/lib/links';
import { SITE_URL } from '@/lib/site';
import { client } from '@/sanity/client';
import { sanityCache } from '@/sanity/fetch';
import { ARTICLE_SLUGS_QUERY, PAGE_SLUGS_QUERY } from '@/sanity/queries';

/** Served at `/sitemap.xml`; `robots.ts` points at it. Every published page and article. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const options = sanityCache;
  const [pages, articles] = await Promise.all([
    client.fetch(PAGE_SLUGS_QUERY, {}, options),
    client.fetch(ARTICLE_SLUGS_QUERY, {}, options),
  ]);
  return [
    ...pages.map((page) => ({
      url: `${SITE_URL}${pathForSlug(page.slug)}`,
      lastModified: new Date(page._updatedAt),
      priority: page.slug === HOME_SLUG ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}${articlePath(article.slug!)}`,
      lastModified: new Date(article._updatedAt),
      priority: 0.6,
    })),
  ];
}
