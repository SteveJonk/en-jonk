import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, toLink, type BlockOf } from '@/components/blocks/shared';
import { DownloadCard } from '@/components/site/DownloadCard';
import { Reveal } from '@/components/site/Reveal';
import { rich } from '@/components/site/Rich';
import { bgClass, CARD, Section, SectionHead } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import { toFormDefinition } from '@/lib/form-fields';
import { fillTemplate, type InterfaceText } from '@/lib/interface-text';
import { articlePath } from '@/lib/links';
import { getInterfaceText } from '@/sanity/interface-text';

const BARS = ['bg-rose', 'bg-green', 'bg-steel'];

/**
 * Hairline-ruled cards. Each card draws its own border (overlapping by a pixel)
 * instead of the gap-on-a-tinted-grid trick: lists have any length, and an
 * unfilled last row would show the tint.
 */
const GRID = 'grid pt-px pl-px md:grid-cols-2 lg:grid-cols-3';

export type ArticleCard = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  minutes: number | null;
};

export function readingTime(minutes: number | null | undefined, text: InterfaceText['kennisbank']) {
  return fillTemplate(text.readingTime, { minutes: Math.max(1, minutes ?? 1) });
}

/** "PDF · 1,2 MB" */
function fileMeta(bytes: number | null | undefined) {
  if (!bytes) return 'PDF';
  if (bytes < 1e6) return `PDF · ${Math.max(1, Math.round(bytes / 1e3))} kB`;
  const mb = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1 }).format(bytes / 1e6);
  return `PDF · ${mb} MB`;
}

/** Typographic cards, the whole card one link. Shared with "Verder lezen" on an article. */
export function ArticleCards({ articles, text }: { articles: ArticleCard[]; text: InterfaceText['kennisbank'] }) {
  return (
    <div className={GRID}>
      {articles.map((article, i) => (
        <Reveal as='article' key={article._id} className={cn('flex', CARD)}>
          <Link href={articlePath(article.slug!)} className='group flex w-full flex-col p-8 md:p-10'>
            <span className={cn('mb-5 block h-px w-10', BARS[i % 3])} />
            <p className='font-ui text-xs tracking-[.14em] text-muted uppercase'>
              {readingTime(article.minutes, text)}
            </p>
            <h3 className='t-h3 mt-3'>{rich(article.title)}</h3>
            {article.excerpt && <p className='mt-3 text-muted'>{rich(article.excerpt)}</p>}
            <span className='mt-auto inline-flex items-center gap-3 pt-8 font-ui text-sm tracking-[.14em] text-steel uppercase'>
              <span className='link-underline'>{text.readMore}</span>
              <span aria-hidden className='transition-transform duration-300 group-hover:translate-x-1'>
                &rarr;
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/** Head, cards, arrow link — the frame both lists share. */
function ListSection({
  block,
  children,
}: {
  block: BlockOf<'articleList' | 'downloadList'>;
  children: ReactNode;
}) {
  return (
    <Section className={bgClass(block.background)}>
      {(block.eyebrow || block.title || block.lead) && (
        <div className='mb-14 md:mb-20'>
          <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} lead={rich(block.lead)} />
        </div>
      )}
      {children}
      {toLink(block.link) && (
        <Reveal as='p' className='mt-10'>
          <Arrow link={block.link} />
        </Reveal>
      )}
    </Section>
  );
}

export async function ArticleListBlock({ block }: { block: BlockOf<'articleList'> }) {
  const articles = (block.articles ?? [])
    .filter((article) => article?.slug)
    .slice(0, block.limit ?? undefined);
  if (!articles.length) return null;

  const { kennisbank } = await getInterfaceText();
  return (
    <ListSection block={block}>
      <ArticleCards articles={articles} text={kennisbank} />
    </ListSection>
  );
}

export async function DownloadListBlock({ block }: { block: BlockOf<'downloadList'> }) {
  const downloads = (block.downloads ?? []).filter((item) => item?.title).slice(0, block.limit ?? undefined);
  const form = toFormDefinition(block.form);
  if (!downloads.length || !form) return null;

  const ui = await getInterfaceText();
  // Only the site key travels to the browser; the secret stays in the submit route.
  const recaptcha =
    block.recaptcha?.recaptchaEnabled && block.recaptcha.recaptchaSiteKey
      ? { enabled: true, siteKey: block.recaptcha.recaptchaSiteKey }
      : undefined;

  return (
    <ListSection block={block}>
      <div className={GRID}>
        {downloads.map((item, i) => (
          <DownloadCard
            key={item._id}
            id={item._id}
            title={rich(item.title)}
            plainTitle={item.title!}
            description={rich(item.description)}
            meta={fileMeta(item.size)}
            bar={BARS[i % 3]}
            form={form}
            recaptcha={recaptcha}
            labels={ui.forms}
            text={ui.kennisbank}
          />
        ))}
      </div>
    </ListSection>
  );
}
