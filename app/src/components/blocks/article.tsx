import { Arrow, paras, toLink, type Block, type BlockOf } from '@/components/blocks/shared';
import {
  ArticleAside,
  ArticleFigure,
  ArticleHero,
  ArticleOutcome,
  ArticleSplit,
  AsideFigure,
  AsideImage,
  AsideQuote,
  LayerNav,
} from '@/components/site/Article';
import { DIAGRAMS } from '@/components/site/Diagrams';
import { rich } from '@/components/site/Rich';
import { cn } from '@/lib/cn';
import { pathForSlug } from '@/lib/links';

/** The blocks that share one article column (see `PageBuilder`). */
export type ArticleBlock = BlockOf<'articleSplit' | 'articleAside' | 'articleFigure' | 'articleOutcome'>;

const ARTICLE_TYPES = new Set(['articleSplit', 'articleAside', 'articleFigure', 'articleOutcome']);

export function isArticleBlock(block: Block): block is ArticleBlock {
  return ARTICLE_TYPES.has(block._type);
}

export function ArticleHeroBlock({ block }: { block: BlockOf<'articleHero'> }) {
  return (
    <ArticleHero
      layer={block.layer}
      title={rich(block.title)}
      lead={rich(block.lead)}
      image={block.image}
      backLink={toLink(block.backLink)}
    />
  );
}

/** One section inside the article column. `layer` colours the outcome block. */
export function ArticleSection({ block, layer }: { block: ArticleBlock; layer?: number }) {
  switch (block._type) {
    case 'articleSplit':
      return <ArticleSplit title={rich(block.title)} paras={paras(block.paragraphs)} />;

    case 'articleAside': {
      const Diagram = block.diagram ? DIAGRAMS[block.diagram] : null;
      return (
        <ArticleAside
          title={rich(block.title)}
          paras={paras(block.paragraphs)}
          reverse={Boolean(block.reverse)}
          aside={
            <>
              {block.quote && <AsideQuote>{rich(block.quote)}</AsideQuote>}
              {block.image?.asset && <AsideImage image={block.image} />}
              {Diagram && (
                <AsideFigure caption={block.caption}>
                  <Diagram />
                </AsideFigure>
              )}
            </>
          }
        />
      );
    }

    case 'articleFigure': {
      const Diagram = DIAGRAMS[block.diagram];
      return Diagram ? (
        <ArticleFigure caption={block.caption}>
          <Diagram />
        </ArticleFigure>
      ) : null;
    }

    case 'articleOutcome':
      return (
        <ArticleOutcome layer={layer}>
          {paras(block.paragraphs).map((p, i) => (
            <p key={i} className={cn('text-ink/85', i > 0 && 'mt-5')}>
              {p}
            </p>
          ))}
          {toLink(block.link) && (
            <p className='mt-10'>
              <Arrow link={block.link} />
            </p>
          )}
        </ArticleOutcome>
      );
  }
}

export function LayerNavBlock({ block, path }: { block: BlockOf<'layerNav'>; path?: string }) {
  const layers = (block.layers ?? [])
    .filter((layer) => layer?.slug)
    .map((layer) => ({ title: rich(layer.title), href: pathForSlug(layer.slug) }));
  if (!layers.length) return null;

  return <LayerNav eyebrow={block.eyebrow || undefined} layers={layers} currentPath={path} />;
}
