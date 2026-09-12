import { Arrow, paras, TestimonialQuote, toLink, type BlockOf } from '@/components/blocks/shared';
import { ValuesIllustration } from '@/components/site/Diagrams';
import { Frame } from '@/components/site/Frame';
import { Kenmerken } from '@/components/site/Kenmerken';
import { Kennismaken } from '@/components/site/Kennismaken';
import { btnOutline, btnPrimary, ContactLines } from '@/components/site/Links';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { rich } from '@/components/site/Rich';
import { bgClass, Container, Section, SectionHead } from '@/components/site/Section';
import { Stats } from '@/components/site/Stats';
import { ThreeLevels } from '@/components/site/ThreeLevels';
import { Timeline } from '@/components/site/Timeline';
import { cn } from '@/lib/cn';
import { getSiteInformation } from '@/sanity/site-information';

const BARS = ['bg-rose', 'bg-green', 'bg-steel'];

function timelineItems(items: { title?: string | null; text?: string | null }[] | null | undefined) {
  return (items ?? []).map((item) => ({ title: rich(item.title), text: rich(item.text) }));
}

export async function PageHeroBlock({ block }: { block: BlockOf<'pageHero'> }) {
  const site = await getSiteInformation();
  const buttons = [
    ...(block.ctas ?? []).map(toLink),
    ...(block.showPodcastLinks
      ? [
          { label: 'Spotify', href: site.social.spotify },
          { label: 'Apple Podcasts', href: site.social.applePodcasts },
        ]
      : []),
  ].filter((button) => button?.href) as { label: string; href: string }[];

  const actions =
    buttons.length || block.showContactLines ? (
      <div
        className={cn(
          'mt-8 flex flex-wrap items-center',
          block.showContactLines ? 'gap-x-6 gap-y-3' : 'gap-3',
        )}
      >
        {buttons.map((button, i) => (
          <a key={`${button.href}-${i}`} href={button.href} className={cn(i === 0 ? btnPrimary : btnOutline, 'gap-2 px-7')}>
            {rich(button.label)}
          </a>
        ))}
        {block.showContactLines && <ContactLines phone={site.phone} email={site.email} />}
      </div>
    ) : undefined;

  return (
    <PageHero
      eyebrow={rich(block.eyebrow)}
      title={rich(block.title, 'hidden sm:block')}
      lead={rich(block.lead)}
      actions={actions}
    >
      {block.image?.asset && (
        <Reveal className='mt-14 md:mt-20'>
          <Frame
            image={block.image}
            priority
            className={block.imageAspect === '21/9' ? 'aspect-[21/9]' : 'aspect-[16/9]'}
          />
        </Reveal>
      )}
      <Stats items={block.stats ?? []} />
    </PageHero>
  );
}

export function CardGridBlock({ block }: { block: BlockOf<'cardGrid'> }) {
  const items = block.items ?? [];

  return (
    <Section className={bgClass(block.background)}>
      {block.splitHeader ? (
        <Reveal className='grid items-start gap-10 lg:grid-cols-12 lg:gap-14'>
          <div className='lg:col-span-5'>
            {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
            <h2 className={cn('t-h2', block.eyebrow && 'mt-4')}>{rich(block.title)}</h2>
          </div>
          {block.lead && (
            <div className='lg:col-span-7 lg:pt-6'>
              <p className='t-lead max-w-prose text-muted'>{rich(block.lead)}</p>
            </div>
          )}
        </Reveal>
      ) : (
        <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} lead={rich(block.lead)} />
      )}

      {items.length > 0 && (
        <div
          className={cn(
            'mt-14 grid gap-px border-y border-ink/10 bg-ink/10 md:mt-20',
            items.length === 2 ? 'md:grid-cols-2' : block.showBars ? 'lg:grid-cols-3' : 'md:grid-cols-3',
          )}
        >
          {items.map((item, i) => (
            <Reveal as='article' key={item._key} className='flex flex-col bg-shell p-8 md:p-10'>
              {block.showBars && <span className={cn('mb-5 block h-px w-10', BARS[i % 3])} />}
              <h3 className='t-h3'>{rich(item.title)}</h3>
              {item.text && (
                <p className={cn('text-muted', block.showBars ? 'mt-3' : 'mt-4')}>{rich(item.text)}</p>
              )}
              <Arrow link={item.link} className='mt-auto pt-6 text-steel' />
            </Reveal>
          ))}
        </div>
      )}

      {block.note && (
        <Reveal as='p' className='t-lead mt-12 max-w-3xl text-muted md:mt-16'>
          {rich(block.note)}
        </Reveal>
      )}
      {toLink(block.link) && (
        <Reveal as='p' className='mt-10'>
          <Arrow link={block.link} />
        </Reveal>
      )}
    </Section>
  );
}

export function KenmerkenBlock({ block }: { block: BlockOf<'kenmerken'> }) {
  return (
    <Section className={bgClass(block.background)}>
      {block.title && (
        <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} lead={rich(block.lead)} />
      )}

      <div className={cn('grid items-start gap-10 lg:grid-cols-12 lg:gap-16', block.title && 'mt-14 md:mt-20')}>
        <div className='order-2 lg:order-1 lg:col-span-7'>
          <Kenmerken items={block.items ?? []} />
          {block.testimonial?.quote && (
            <Reveal as='blockquote' className='mt-12 border-l-2 border-rose pl-6 md:pl-8'>
              <TestimonialQuote testimonial={block.testimonial} />
            </Reveal>
          )}
          {toLink(block.link) && (
            <Reveal as='p' className='mt-10'>
              <Arrow link={block.link} />
            </Reveal>
          )}
        </div>

        <Reveal className='order-1 lg:sticky lg:top-32 lg:order-2 lg:col-span-5'>
          <Frame image={block.image} sizes='(min-width:1024px) 40vw, 100vw' className='aspect-[4/5]' />
        </Reveal>
      </div>
    </Section>
  );
}

export function ThreeLevelsBlock({ block }: { block: BlockOf<'threeLevels'> }) {
  const timeline = block.timeline;

  return (
    <Section className={bgClass(block.background)}>
      <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} lead={rich(block.lead)} />
      <ThreeLevels
        cards={Boolean(block.cards)}
        levels={(block.levels ?? []).map((level) => ({ text: rich(level.text), items: level.items }))}
      />

      {timeline?.items?.length ? (
        <div className='mx-auto mt-20 max-w-2xl md:mt-28 lg:max-w-none'>
          {timeline.eyebrow && (
            <Reveal as='p' className='eyebrow'>
              {rich(timeline.eyebrow)}
            </Reveal>
          )}
          <Timeline items={timelineItems(timeline.items)} className='mt-8' />
          {timeline.note && (
            <Reveal as='p' delay={700} className='mt-10 text-sm text-muted md:text-base'>
              {rich(timeline.note)}
            </Reveal>
          )}
        </div>
      ) : null}
    </Section>
  );
}

export function TimelineBlock({ block }: { block: BlockOf<'timeline'> }) {
  return (
    <Section className={bgClass(block.background)}>
      <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} />
      <Timeline
        items={timelineItems(block.items)}
        plainLine={Boolean(block.plainLine)}
        className='mt-14 md:mt-20'
      />
      {block.note && (
        <Reveal as='p' delay={700} className='mt-10 text-muted'>
          {rich(block.note)}
        </Reveal>
      )}
    </Section>
  );
}

export function StatsBlock({ block }: { block: BlockOf<'stats'> }) {
  const dark = block.background === 'dark';

  return (
    <Section className={bgClass(block.background)}>
      <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} />
      <Stats items={block.items ?? []} dark={dark} />
      {(block.text || toLink(block.link)) && (
        <div className='mt-14 grid items-center gap-10 md:mt-20 lg:grid-cols-12'>
          <Reveal as='p' className={cn('t-lead lg:col-span-7', dark ? 'text-shell/85' : 'text-muted')}>
            {rich(block.text)}
          </Reveal>
          <Reveal as='p' className='lg:col-span-5 lg:text-right'>
            <Arrow link={block.link} className={dark ? 'text-shell' : undefined} />
          </Reveal>
        </div>
      )}
    </Section>
  );
}

const VALUE_BARS = ['bg-rose', 'bg-green', 'bg-steel', 'bg-rose'];

export function ValuesBlock({ block }: { block: BlockOf<'values'> }) {
  const items = block.items ?? [];

  if (block.variant !== 'full') {
    return (
      <Section className={bgClass(block.background)}>
        <div className='grid gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-5'>
            {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
            <h2 className='t-h2 mt-4'>{rich(block.title)}</h2>
            {block.lead && <p className='t-lead mt-6 max-w-prose text-muted'>{rich(block.lead)}</p>}
            {block.quote && <p className='t-quote mt-6'>{rich(block.quote)}</p>}
            {toLink(block.link) && (
              <p className='mt-8'>
                <Arrow link={block.link} />
              </p>
            )}
          </Reveal>

          <div className='lg:col-span-6 lg:col-start-7'>
            {block.itemsEyebrow && (
              <Reveal as='p' className='eyebrow'>
                {rich(block.itemsEyebrow)}
              </Reveal>
            )}
            <dl className='mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2'>
              {items.map((value, i) => (
                <Reveal key={value._key} delay={i * 120}>
                  <dt className='t-h3'>{rich(value.title)}</dt>
                  <dd className='mt-2 text-muted'>{rich(value.text)}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    );
  }

  const [wide, tall] = block.images ?? [];

  return (
    <>
      <Section className={bgClass(block.background)}>
        <div className='grid items-end gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-7'>
            {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
            <h2 className='t-h2 mt-4'>{rich(block.title)}</h2>
          </Reveal>
          <Reveal className='lg:col-span-5'>
            <ValuesIllustration />
          </Reveal>
        </div>

        <div className='mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:gap-x-16'>
          {items.map((value, i) => (
            <Reveal key={value._key} delay={i * 120}>
              <span className={cn('block h-px w-10', VALUE_BARS[i % 4])} />
              <h3 className='t-h3 mt-5'>{rich(value.title)}</h3>
              <p className='mt-3 max-w-prose text-muted'>{rich(value.text)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {wide && (
        <div className={cn('pb-20 md:pb-32', block.background === 'paper' && 'bg-paper')}>
          <Container className='grid items-end gap-6 md:grid-cols-12 md:gap-8'>
            <Reveal className='md:col-span-7'>
              <Frame image={wide} sizes='(min-width:768px) 58vw, 100vw' className='aspect-[3/2]' />
            </Reveal>
            {tall && (
              <Reveal className='md:col-span-5'>
                <Frame image={tall} sizes='(min-width:768px) 42vw, 100vw' className='aspect-[4/5]' />
              </Reveal>
            )}
          </Container>
        </div>
      )}
    </>
  );
}

export function MediaTextBlock({ block }: { block: BlockOf<'mediaText'> }) {
  const [main, ...rest] = block.images ?? [];
  const narrow = Boolean(block.narrowImage);

  return (
    <Section className={bgClass(block.background)}>
      <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
        <Reveal className={narrow ? 'lg:col-span-5' : 'lg:col-span-6'}>
          <Frame
            image={main}
            sizes={narrow ? '(min-width:1024px) 40vw, 100vw' : '(min-width:1024px) 50vw, 100vw'}
            className={block.imageAspect === '4/5' ? 'aspect-[4/5]' : 'aspect-[3/2]'}
          />
          {rest.length > 0 && (
            <div className='mt-4 grid grid-cols-2 gap-4'>
              {rest.map((image) => (
                <Frame
                  key={image._key}
                  image={image}
                  sizes='(min-width:1024px) 25vw, 50vw'
                  className='aspect-[3/2]'
                />
              ))}
            </div>
          )}
        </Reveal>

        <Reveal className={narrow ? 'lg:col-span-7' : 'lg:col-span-6'}>
          {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
          <h2 className={cn('t-h2', block.eyebrow && 'mt-4')}>{rich(block.title)}</h2>
          {block.lead && <p className='t-lead mt-6 max-w-prose text-muted'>{rich(block.lead)}</p>}
          {paras(block.paragraphs).map((p, i) => (
            <p key={i} className='mt-6 max-w-prose text-muted'>
              {p}
            </p>
          ))}
          {block.testimonial?.quote && (
            <blockquote className='mt-8 border-l-2 border-rose pl-6'>
              <TestimonialQuote testimonial={block.testimonial} />
            </blockquote>
          )}
          {toLink(block.link) && (
            <p className='mt-8'>
              <Arrow link={block.link} />
            </p>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

export function TextSplitBlock({ block }: { block: BlockOf<'textSplit'> }) {
  return (
    <Section className={bgClass(block.background)}>
      <div className='grid gap-8 lg:grid-cols-12 lg:gap-16'>
        <Reveal className='lg:col-span-4'>
          <h2 className='t-h2'>{rich(block.title)}</h2>
          {block.image?.asset && (
            <Frame
              image={block.image}
              sizes='(min-width:1024px) 33vw, 100vw'
              className='mt-10 aspect-[4/5]'
            />
          )}
        </Reveal>
        <Reveal className='lg:col-span-8'>
          {block.lead && <p className='t-lead max-w-prose text-muted'>{rich(block.lead)}</p>}
          {paras(block.paragraphs).map((p, i) => (
            <p key={i} className={cn('max-w-prose text-muted', (block.lead || i > 0) && 'mt-6')}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

export function QuoteBlock({ block }: { block: BlockOf<'quote'> }) {
  const dark = block.background === 'dark';

  return (
    <Section className={bgClass(block.background)}>
      <Reveal as='blockquote' className='max-w-4xl'>
        {block.testimonial?.quote ? (
          <TestimonialQuote testimonial={block.testimonial} dark={dark} />
        ) : (
          <p className={cn('t-quote', dark && 'text-shell/95')}>{rich(block.text)}</p>
        )}
      </Reveal>
    </Section>
  );
}

export function GalleryBlock({ block }: { block: BlockOf<'gallery'> }) {
  const images = block.images ?? [];

  // One photo without a heading: the wide image straight under a page hero.
  if (images.length === 1 && !block.title) {
    return (
      <Container>
        <Reveal>
          <Frame image={images[0]} priority className='aspect-[4/3] md:aspect-[21/9]' />
        </Reveal>
      </Container>
    );
  }

  return (
    <Section className={bgClass(block.background)}>
      {block.title && (
        <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} lead={rich(block.lead)} />
      )}
      <div className={cn('grid gap-6 md:grid-cols-3', block.title && 'mt-14 md:mt-20')}>
        {images.map((image, i) => (
          <Reveal key={image._key} delay={i * 120}>
            <Frame image={image} sizes='(min-width:768px) 33vw, 100vw' className='aspect-[3/2]' />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function StepsBlock({ block }: { block: BlockOf<'steps'> }) {
  return (
    <Section className={bgClass(block.background)}>
      <div className='grid items-start gap-10 lg:grid-cols-12 lg:gap-16'>
        <Reveal className='lg:col-span-5'>
          {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
          <h2 className='t-h2 mt-4'>{rich(block.title)}</h2>
          {block.lead && <p className='t-lead mt-6 max-w-prose text-muted'>{rich(block.lead)}</p>}
        </Reveal>
        <div className='lg:col-span-6 lg:col-start-7'>
          <ol className='space-y-8'>
            {(block.items ?? []).map((step, i) => (
              <Reveal as='li' key={step._key} delay={i * 120} className='flex gap-6'>
                <span className='w-10 shrink-0 font-display text-3xl leading-none text-rose'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='t-h3'>{rich(step.title)}</h3>
                  <p className='mt-2 text-muted'>{rich(step.text)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

export function LinkBandBlock({ block }: { block: BlockOf<'linkBand'> }) {
  return (
    <Section className={bgClass(block.background)}>
      <Reveal className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
        <div className='lg:col-span-7'>
          {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
          <h2 className={cn('t-h2', block.eyebrow && 'mt-4')}>{rich(block.title)}</h2>
          {block.lead && <p className='t-lead mt-6 max-w-prose text-muted'>{rich(block.lead)}</p>}
        </div>
        <div className={cn('lg:col-span-5', !block.text && 'lg:text-right')}>
          {block.text && <p className='max-w-prose text-muted'>{rich(block.text)}</p>}
          {toLink(block.link) && (
            <p className={cn(block.text && 'mt-4')}>
              <Arrow link={block.link} />
            </p>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

export function KennismakenBlock({ block }: { block: BlockOf<'kennismaken'> }) {
  return (
    <Kennismaken
      title={rich(block.title)}
      text={rich(block.text)}
      paper={block.background === 'paper'}
      mailOnly={Boolean(block.mailOnly)}
    />
  );
}
