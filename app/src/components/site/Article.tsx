import Link from 'next/link';
import type { ReactNode } from 'react';
import { Frame } from '@/components/site/Frame';
import { ArrowLink } from '@/components/site/Links';
import { Reveal } from '@/components/site/Reveal';
import { Container } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import type { Photo } from '@/sanity/image';

/** Colour per layer (1–3), in reading order: ik, jij & ik, ik & wij. */
const LAYER_COLORS = [
  { bar: 'bg-rose', border: 'border-rose' },
  { bar: 'bg-green', border: 'border-green' },
  { bar: 'bg-steel', border: 'border-steel' },
];

export function layerColor(layer?: number | null) {
  return LAYER_COLORS[((layer ?? 1) - 1) % 3] ?? LAYER_COLORS[0];
}

export function ArticleHero({
  layer,
  title,
  lead,
  image,
  backLink,
}: {
  layer: number;
  title: ReactNode;
  lead: ReactNode;
  image?: Photo | null;
  backLink?: { label: string; href: string };
}) {
  return (
    <>
      <section className='pt-32 pb-12 md:pt-44 md:pb-16'>
        <Container>
          {backLink && (
            <Reveal as='p'>
              <ArrowLink href={backLink.href} back>
                {backLink.label}
              </ArrowLink>
            </Reveal>
          )}
          <div className='mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-14'>
            <Reveal className='lg:col-span-7'>
              <p className='eyebrow'>Drie lagen &middot; laag {layer} van 3</p>
              <span className={cn('mt-5 block h-px w-10', layerColor(layer).bar)} />
              <h1 className='t-display mt-5'>{title}</h1>
            </Reveal>
            <Reveal className='lg:col-span-5'>
              <p className='t-lead max-w-prose text-ink/90'>{lead}</p>
            </Reveal>
          </div>
        </Container>
      </section>
      <Container>
        <Reveal>
          <Frame image={image} priority className='aspect-[4/3] md:aspect-[21/9]' />
        </Reveal>
      </Container>
    </>
  );
}

export function ArticleBody({ children }: { children: ReactNode }) {
  return (
    <article className='py-16 md:py-24'>
      <Container>{children}</Container>
    </article>
  );
}

/** Heading left (4 cols), text right (8 cols). */
export function ArticleSplit({ title, paras }: { title: ReactNode; paras: ReactNode[] }) {
  return (
    <section className='grid gap-6 border-t border-ink/10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16'>
      <Reveal className='lg:col-span-4'>
        <h2 className='t-h2'>{title}</h2>
      </Reveal>
      <Reveal className='lg:col-span-8'>
        {paras.map((p, i) => (
          <p key={i} className={cn('max-w-prose text-ink/85', i > 0 && 'mt-5')}>
            {p}
          </p>
        ))}
      </Reveal>
    </section>
  );
}

/** Heading + text (7 cols) beside a sticky aside (5 cols). */
export function ArticleAside({
  title,
  paras,
  aside,
  reverse,
}: {
  title: ReactNode;
  paras: ReactNode[];
  aside: ReactNode;
  /** Aside on the left from lg. */
  reverse?: boolean;
}) {
  return (
    <section className='grid items-start gap-10 border-t border-ink/10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16'>
      <Reveal className={cn('lg:col-span-7', reverse && 'lg:order-2')}>
        <h2 className='t-h2'>{title}</h2>
        {paras.map((p, i) => (
          <p key={i} className={cn('max-w-prose text-ink/85', i === 0 ? 'mt-6' : 'mt-5')}>
            {p}
          </p>
        ))}
      </Reveal>
      <div className={cn('space-y-10 lg:sticky lg:top-28 lg:col-span-5', reverse && 'lg:order-1')}>
        {aside}
      </div>
    </section>
  );
}

export function AsideQuote({ children }: { children: ReactNode }) {
  return (
    <Reveal as='blockquote' className='border-l border-rose pl-6 md:pl-8'>
      <p className='t-quote'>{children}</p>
    </Reveal>
  );
}

export function AsideImage({ image }: { image?: Photo | null }) {
  return (
    <Reveal as='figure'>
      <Frame image={image} sizes='(min-width:1024px) 50vw, 100vw' className='aspect-[4/5]' />
    </Reveal>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className='mt-6 text-center font-ui text-xs tracking-[.14em] text-muted uppercase'>
      {children}
    </figcaption>
  );
}

/** Small diagram in the sticky aside. */
export function AsideFigure({ caption, children }: { caption?: string | null; children: ReactNode }) {
  return (
    <Reveal as='figure' className='bg-paper px-6 py-10 md:px-10'>
      {children}
      {caption && <Caption>{caption}</Caption>}
    </Reveal>
  );
}

/** Full-width diagram between two article sections. */
export function ArticleFigure({ caption, children }: { caption?: string | null; children: ReactNode }) {
  return (
    <div className='-mt-2 pb-14 md:-mt-6 md:pb-20'>
      <Reveal as='figure' className='bg-paper px-6 py-10 md:px-12 md:py-14'>
        {children}
        {caption && <Caption>{caption}</Caption>}
      </Reveal>
    </div>
  );
}

export function ArticleOutcome({ layer, children }: { layer?: number | null; children: ReactNode }) {
  return (
    <Reveal
      className={cn(
        'mt-6 grid gap-6 border-t bg-paper p-8 md:mt-10 md:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16',
        layerColor(layer).border,
      )}
    >
      <h2 className='t-h2 lg:col-span-4'>Wat het oplevert</h2>
      <div className='max-w-prose lg:col-span-8'>{children}</div>
    </Reveal>
  );
}

export function LayerNav({
  eyebrow = 'De drie lagen',
  layers,
  currentPath,
}: {
  eyebrow?: string | null;
  layers: { title: ReactNode; href: string }[];
  currentPath?: string;
}) {
  return (
    <nav className='pb-20 md:pb-28' aria-label='De drie lagen'>
      <Container>
        <Reveal as='p' className='eyebrow'>
          {eyebrow}
        </Reveal>
        <Reveal className='mt-6 grid gap-px border-y border-ink/10 bg-ink/10 md:grid-cols-3'>
          {layers.map((layer, i) => {
            const isCurrent = layer.href === currentPath;
            return (
              <Link
                key={layer.href}
                href={layer.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn('group block bg-shell p-8 md:p-10', isCurrent && 'pointer-events-none')}
              >
                <span className={cn('block h-px w-10', layerColor(i + 1).bar)} />
                <span className='mt-5 block font-ui text-xs tracking-[.14em] text-muted uppercase'>
                  Laag {i + 1}
                  {isCurrent && ' · je leest nu'}
                </span>
                <span
                  className={cn(
                    't-h3 mt-2 block',
                    !isCurrent && 'transition-colors group-hover:text-rose',
                  )}
                >
                  {layer.title}
                </span>
              </Link>
            );
          })}
        </Reveal>
      </Container>
    </nav>
  );
}
