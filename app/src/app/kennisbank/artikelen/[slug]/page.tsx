import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from 'next-sanity';
import { cache } from 'react';
import { ArticleCards, readingTime } from '@/components/blocks/kennisbank';
import { JsonLd } from '@/components/JsonLd';
import { Kennismaken } from '@/components/site/Kennismaken';
import { ArrowLink } from '@/components/site/Links';
import { Reveal } from '@/components/site/Reveal';
import { rich } from '@/components/site/Rich';
import { Container, Section, SectionHead } from '@/components/site/Section';
import { pageJsonLd } from '@/lib/json-ld';
import { ARTICLES_PATH, articlePath } from '@/lib/links';
import { client } from '@/sanity/client';
import { getInterfaceText } from '@/sanity/interface-text';
import { pageMetadata } from '@/sanity/metadata';
import { ARTICLE_QUERY, ARTICLE_SLUGS_QUERY } from '@/sanity/queries';
import { getSiteInformation } from '@/sanity/site-information';

type PageProps = { params: Promise<{ slug: string }> };

const options = { next: { revalidate: 30 } };

const getArticle = cache((slug: string) => client.fetch(ARTICLE_QUERY, { slug }, options));

export async function generateStaticParams() {
  return client.fetch(ARTICLE_SLUGS_QUERY);
}

export async function generateMetadata({ params }: PageProps) {
  const [article, site, ui] = await Promise.all([
    getArticle((await params).slug),
    getSiteInformation(),
    getInterfaceText(),
  ]);
  return pageMetadata(
    article && { title: article.title, seo: { ...article.seo, description: article.seo?.description || article.excerpt } },
    { siteName: site.name, notFoundTitle: ui.notFound.title },
  );
}

/** The body as the layer articles set it: one reading column, display headings. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className='mt-5 text-ink/85 first:mt-0'>{children}</p>,
    h2: ({ children }) => <h2 className='t-h2 mt-14 mb-6 first:mt-0'>{children}</h2>,
    h3: ({ children }) => <h3 className='t-h3 mt-10 mb-4 first:mt-0'>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className='t-quote my-10 border-l border-rose pl-6 text-ink/90 md:pl-8'>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className='mt-5 list-disc space-y-2 pl-5 text-ink/85 marker:text-rose'>{children}</ul>,
    number: ({ children }) => <ol className='mt-5 list-decimal space-y-2 pl-5 text-ink/85'>{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className='link-underline text-steel'>
        {children}
      </a>
    ),
  },
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [article, site, { kennisbank }] = await Promise.all([
    getArticle(slug),
    getSiteInformation(),
    getInterfaceText(),
  ]);
  if (!article) notFound();

  const path = articlePath(slug);
  const related = article.related.filter((item) => item.slug);

  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path,
          type: 'Article',
          title: article.seo?.title || article.title,
          description: article.seo?.description || article.excerpt,
          language: site.language,
          trail: [
            { name: kennisbank.eyebrow, path: '/kennisbank' },
            { name: kennisbank.backLabel, path: ARTICLES_PATH },
            { name: article.title ?? path, path },
          ],
          extra: { headline: article.title },
        })}
      />

      <section className='pt-32 pb-12 md:pt-44 md:pb-16'>
        <Container>
          <Reveal as='p'>
            <ArrowLink href={ARTICLES_PATH} back>
              {kennisbank.backLabel}
            </ArrowLink>
          </Reveal>
          <div className='mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-14'>
            <Reveal className='lg:col-span-7'>
              <p className='eyebrow'>
                {rich(kennisbank.eyebrow)} · {readingTime(article.minutes, kennisbank)}
              </p>
              <span className='mt-5 block h-px w-10 bg-rose' />
              <h1 className='t-display mt-5'>{rich(article.title)}</h1>
            </Reveal>
            {article.excerpt && (
              <Reveal className='lg:col-span-5'>
                <p className='t-lead max-w-prose text-ink/90'>{rich(article.excerpt)}</p>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      <article className='pb-20 md:pb-32'>
        <Container>
          <div className='grid border-t border-ink/10 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-16'>
            <Reveal className='max-w-prose lg:col-span-8 lg:col-start-5'>
              <PortableText value={article.body ?? []} components={components} />
            </Reveal>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section className='bg-paper'>
          <div className='mb-14 md:mb-20'>
            <SectionHead title={kennisbank.relatedTitle} />
          </div>
          <ArticleCards articles={related} text={kennisbank} />
        </Section>
      )}

      <Kennismaken />
    </>
  );
}
