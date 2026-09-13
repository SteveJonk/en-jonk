import type { ReactNode } from 'react';
import {
  ArticleHeroBlock,
  ArticleSection,
  isArticleBlock,
  LayerNavBlock,
  type ArticleBlock,
} from '@/components/blocks/article';
import {
  CasesBlock,
  ContactFormBlock,
  LogosBlock,
  PodcastEpisodesBlock,
  PodcastTeaserBlock,
  TestimonialsBlock,
} from '@/components/blocks/collections';
import {
  CardGridBlock,
  GalleryBlock,
  KenmerkenBlock,
  KennismakenBlock,
  LinkBandBlock,
  MediaTextBlock,
  PageHeroBlock,
  QuoteBlock,
  StatsBlock,
  StepsBlock,
  TextSplitBlock,
  ThreeLevelsBlock,
  TimelineBlock,
  ValuesBlock,
} from '@/components/blocks/sections';
import type { Block } from '@/components/blocks/shared';
import { ArticleBody } from '@/components/site/Article';

/**
 * Map one Sanity block onto its component.
 *
 * ADDING A BLOCK — touchpoints, in this order:
 *   1. `studio/schemaTypes/blocks/`              — the fields
 *   2. `studio/schemaTypes/index.ts` + `pageBuilderType.ts` — register it
 *   3. `src/sanity/queries.ts`                   — project links and references
 *   4. `npm run typegen`, then a `case` here + a component in `components/blocks/`
 *
 * Blocks are typed from `PAGE_QUERY_RESULT`, so a schema change that breaks a
 * component shows up in `npm run typecheck`. Unknown types warn and render
 * nothing, so a half-built block never breaks a page.
 */
function renderBlock(block: Block, path?: string): ReactNode {
  const key = block._key;
  switch (block._type) {
    case 'pageHero':
      return <PageHeroBlock key={key} block={block} />;
    case 'articleHero':
      return <ArticleHeroBlock key={key} block={block} />;
    case 'mediaText':
      return <MediaTextBlock key={key} block={block} />;
    case 'textSplit':
      return <TextSplitBlock key={key} block={block} />;
    case 'cardGrid':
      return <CardGridBlock key={key} block={block} />;
    case 'kenmerken':
      return <KenmerkenBlock key={key} block={block} />;
    case 'threeLevels':
      return <ThreeLevelsBlock key={key} block={block} />;
    case 'timeline':
      return <TimelineBlock key={key} block={block} />;
    case 'steps':
      return <StepsBlock key={key} block={block} />;
    case 'stats':
      return <StatsBlock key={key} block={block} />;
    case 'values':
      return <ValuesBlock key={key} block={block} />;
    case 'quote':
      return <QuoteBlock key={key} block={block} />;
    case 'gallery':
      return <GalleryBlock key={key} block={block} />;
    case 'testimonials':
      return <TestimonialsBlock key={key} block={block} />;
    case 'cases':
      return <CasesBlock key={key} block={block} />;
    case 'logos':
      return <LogosBlock key={key} block={block} />;
    case 'podcastTeaser':
      return <PodcastTeaserBlock key={key} block={block} />;
    case 'podcastEpisodes':
      return <PodcastEpisodesBlock key={key} block={block} />;
    case 'contactForm':
      return <ContactFormBlock key={key} block={block} path={path} />;
    case 'layerNav':
      return <LayerNavBlock key={key} block={block} path={path} />;
    case 'linkBand':
      return <LinkBandBlock key={key} block={block} />;
    case 'kennismaken':
      return <KennismakenBlock key={key} block={block} />;
    default:
      console.warn(`Unknown page builder block type: ${(block as { _type: string })._type}`);
      return null;
  }
}

export function PageBuilder({
  content,
  path,
}: {
  content?: Block[] | null;
  /** The page's own path, for blocks that record or highlight where they are. */
  path?: string;
}) {
  if (!content?.length) return null;

  // The article hero's layer colours the outcome block further down.
  const hero = content.find((block) => block._type === 'articleHero');
  const layer = hero?._type === 'articleHero' ? hero.layer : undefined;

  // Consecutive article sections share one article column.
  const nodes: ReactNode[] = [];
  let run: ArticleBlock[] = [];
  const flush = () => {
    if (!run.length) return;
    nodes.push(
      <ArticleBody key={run[0]._key}>
        {run.map((block) => (
          <ArticleSection key={block._key} block={block} layer={layer} />
        ))}
      </ArticleBody>,
    );
    run = [];
  };

  for (const block of content) {
    if (isArticleBlock(block)) {
      run.push(block);
      continue;
    }
    flush();
    nodes.push(renderBlock(block, path));
  }
  flush();

  return <>{nodes}</>;
}
