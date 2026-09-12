import { permanentRedirect } from 'next/navigation';
import { CmsPage, cmsMetadata } from '@/components/CmsPage';
import { HOME_SLUG } from '@/lib/links';
import { client } from '@/sanity/client';
import { PAGE_SLUGS_QUERY } from '@/sanity/queries';

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

/**
 * Every CMS page except the home page renders through this one route. A slug
 * may contain slashes (`hoe-wij-kijken/ik`), hence the catch-all.
 */
export async function generateStaticParams() {
  const pages = await client.fetch(PAGE_SLUGS_QUERY);
  return pages
    .filter((page) => page.slug !== HOME_SLUG)
    .map((page) => ({ slug: page.slug.split('/') }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return cmsMetadata(slug.join('/'));
}

export default async function SanityPage({ params }: PageProps) {
  const slug = (await params).slug.join('/');

  // /home is the same document as /, so keep one canonical URL.
  if (slug === HOME_SLUG) permanentRedirect('/');

  return <CmsPage slug={slug} />;
}
