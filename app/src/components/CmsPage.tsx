import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { PageBuilder } from '@/components/PageBuilder';
import { pageJsonLd } from '@/lib/json-ld';
import { HOME_SLUG, pathForSlug } from '@/lib/links';
import { client } from '@/sanity/client';
import { pageMetadata, seoImageUrl } from '@/sanity/metadata';
import { PAGE_QUERY } from '@/sanity/queries';
import { getSiteInformation } from '@/sanity/site-information';

const options = { next: { revalidate: 30 } };

/** One request per render, shared by the metadata and the page. */
const getPage = cache((slug: string) => client.fetch(PAGE_QUERY, { slug }, options));

export async function cmsMetadata(slug: string): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage(slug), getSiteInformation()]);
  return pageMetadata(page, { isHome: slug === HOME_SLUG, siteName: site.name });
}

/**
 * Every page — home included — is a `page` document rendered from its blocks.
 * Page content deliberately does not degrade: if the CMS is down the page
 * errors rather than quietly rendering empty.
 */
export async function CmsPage({ slug }: { slug: string }) {
  const [page, site] = await Promise.all([getPage(slug), getSiteInformation()]);
  if (!page) notFound();

  const path = pathForSlug(slug);

  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path,
          title: page.seo?.title || page.title,
          description: page.seo?.description,
          imageUrl: seoImageUrl(page.seo),
          language: site.language,
          trail: slug === HOME_SLUG ? undefined : [{ name: page.title ?? path, path }],
        })}
      />
      <PageBuilder content={page.content} path={path} />
    </>
  );
}
