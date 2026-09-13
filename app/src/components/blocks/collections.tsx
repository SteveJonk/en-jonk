import { Arrow, TestimonialQuote, toLink, type BlockOf } from '@/components/blocks/shared';
import { FormRenderer } from '@/components/form/FormRenderer';
import { Frame } from '@/components/site/Frame';
import { Marquee, type MarqueeLogo } from '@/components/site/Marquee';
import { Reveal } from '@/components/site/Reveal';
import { rich } from '@/components/site/Rich';
import { bgClass, Container, Section, SectionHead } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import { toFormDefinition } from '@/lib/form-fields';
import { mailtoHref, telHref, type SocialLink } from '@/lib/site';
import { urlFor } from '@/sanity/image';
import { getInterfaceText } from '@/sanity/interface-text';
import { getSiteInformation } from '@/sanity/site-information';

function Note({ text }: { text?: string | null }) {
  return text ? <p className='mt-6 font-ui text-xs text-muted'>{rich(text)}</p> : null;
}

/** Which profiles a spot shows is the design's; label and URL are the CMS's. No URL, no button. */
function platforms(social: Record<string, SocialLink>, keys: string[]) {
  return keys.flatMap((key) => (social[key] ? [{ label: social[key].label, href: social[key].url }] : []));
}

export function TestimonialsBlock({ block }: { block: BlockOf<'testimonials'> }) {
  const items = (block.testimonials ?? []).filter((item) => item?.quote);
  if (!items.length) return null;

  return (
    <Section className={bgClass(block.background)}>
      <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} />
      <div className='mt-14 grid gap-px border-y border-ink/10 bg-ink/10 md:mt-20 md:grid-cols-3'>
        {items.map((item) => (
          <Reveal as='figure' key={item._id} className='bg-shell p-8 md:p-10'>
            <blockquote>
              <p className='text-lg'>&ldquo;{rich(item.quote)}&rdquo;</p>
            </blockquote>
            <figcaption className='mt-5 font-ui text-sm text-muted'>
              {rich(item.name)}
              {item.role && <>, {rich(item.role)}</>}
            </figcaption>
          </Reveal>
        ))}
      </div>
      <Note text={block.note} />
    </Section>
  );
}

export function CasesBlock({ block }: { block: BlockOf<'cases'> }) {
  const cases = (block.cases ?? []).filter((item) => item?.client);
  if (!cases.length) return null;

  if (block.layout === 'featured') {
    const [item] = cases;
    return (
      <Section className={bgClass(block.background)}>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-6'>
            <Frame image={item.image} sizes='(min-width:1024px) 50vw, 100vw' className='aspect-[4/5]' />
          </Reveal>
          <Reveal className='lg:col-span-6'>
            {(block.eyebrow || item.type) && (
              <p className='eyebrow'>{rich([block.eyebrow, item.type].filter(Boolean).join(' · '))}</p>
            )}
            <h2 className='t-h2 mt-4'>{rich(item.client)}</h2>
            {item.summary && <p className='t-lead mt-6 max-w-prose text-muted'>{rich(item.summary)}</p>}
            {item.testimonial?.quote && (
              <blockquote className='mt-8 border-l-2 border-rose pl-6'>
                <TestimonialQuote testimonial={item.testimonial} />
              </blockquote>
            )}
          </Reveal>
        </div>
      </Section>
    );
  }

  return (
    <Section className={bgClass(block.background)}>
      {block.title && <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} />}
      <div
        className={cn(
          'grid gap-px border-y border-ink/10 bg-ink/10 md:grid-cols-2',
          block.title && 'mt-14 md:mt-20',
        )}
      >
        {cases.map((item, i) => (
          <Reveal as='article' key={item._id} delay={i * 120} className='bg-shell p-8 md:p-10'>
            {item.type && <p className='eyebrow'>{rich(item.type)}</p>}
            <h3 className='t-h3 mt-4'>{rich(item.client)}</h3>
            {item.summary && <p className='mt-4'>{rich(item.summary)}</p>}
          </Reveal>
        ))}
      </div>
      <Note text={block.note} />
    </Section>
  );
}

export function LogosBlock({ block }: { block: BlockOf<'logos'> }) {
  const rows = (block.rows ?? []).map((row) =>
    (row.logos ?? []).flatMap((logo): MarqueeLogo[] => {
      const src = logo.image?.asset ? urlFor(logo.image)?.url() : null;
      return src ? [{ src, alt: logo.name, href: logo.url }] : [];
    }),
  );

  return (
    <section className={cn('py-20 md:py-32', bgClass(block.background))}>
      <Container>
        <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} lead={rich(block.lead)} />
      </Container>
      <Reveal className='mt-12 space-y-6 md:mt-16'>
        {rows.map((logos, i) => (logos.length ? <Marquee key={i} logos={logos} reverse={i % 2 === 1} /> : null))}
      </Reveal>
    </section>
  );
}

const platformLink =
  'group flex items-center justify-between border border-ink/20 px-5 py-3.5 font-ui text-sm tracking-[.12em] uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-shell';

export async function PodcastTeaserBlock({ block }: { block: BlockOf<'podcastTeaser'> }) {
  const site = await getSiteInformation();
  const links = platforms(site.social, ['spotify', 'applePodcasts']);

  return (
    <Section className={bgClass(block.background)}>
      <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
        <Reveal className='lg:col-span-5'>
          {block.eyebrow && <p className='eyebrow'>{rich(block.eyebrow)}</p>}
          <h2 className='t-h2 mt-4'>{rich(block.title)}</h2>
          {block.lead && <p className='t-lead mt-6 max-w-prose text-muted'>{rich(block.lead)}</p>}
          {toLink(block.link) && (
            <p className='mt-6'>
              <Arrow link={block.link} />
            </p>
          )}
        </Reveal>

        <Reveal className='lg:col-span-4'>
          <Frame image={block.image} sizes='(min-width:1024px) 30vw, 100vw' className='aspect-[4/5]' />
        </Reveal>

        <Reveal className='lg:col-span-3'>
          {block.listenTitle && <h3 className='t-h3'>{rich(block.listenTitle)}</h3>}
          {block.listenText && <p className='mt-3 text-muted'>{rich(block.listenText)}</p>}
          {links.length > 0 && (
            <div className='mt-6 space-y-3'>
              {links.map((link) => (
                <a key={link.label} href={link.href} className={platformLink}>
                  <span>{link.label}</span>
                  <span aria-hidden className='transition-transform duration-300 group-hover:translate-x-1'>
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

export function PodcastEpisodesBlock({ block }: { block: BlockOf<'podcastEpisodes'> }) {
  const episodes = (block.episodes ?? []).slice(0, block.limit ?? 4);
  if (!episodes.length) return null;

  return (
    <Section className={bgClass(block.background)}>
      <SectionHead eyebrow={rich(block.eyebrow)} title={rich(block.title)} />
      <ol className='mt-14 divide-y divide-ink/10 border-y border-ink/10 md:mt-20'>
        {episodes.map((episode, i) => (
          <Reveal as='li' key={episode._id} delay={i * 90} className='flex items-center gap-6 py-7 md:py-8'>
            <span className='w-12 shrink-0 font-display text-2xl text-rose md:text-3xl'>
              {rich(episode.number)}
            </span>
            <div className='flex-1'>
              <p className='t-h3'>{rich(episode.title)}</p>
              {episode.description && <p className='mt-1 text-sm text-muted'>{rich(episode.description)}</p>}
            </div>
            {episode.url && (
              <a
                href={episode.url}
                aria-label={block.listenLabel || undefined}
                className='flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-shell'
              >
                &rarr;
              </a>
            )}
          </Reveal>
        ))}
      </ol>
      <Note text={block.note} />
    </Section>
  );
}

const socialLink = 'text-steel transition-colors hover:text-rose';
const contactLink = 'transition-colors hover:text-rose';

export async function ContactFormBlock({ block, path }: { block: BlockOf<'contactForm'>; path?: string }) {
  const [site, ui] = await Promise.all([getSiteInformation(), getInterfaceText()]);
  const form = toFormDefinition(block.form);
  const social = platforms(site.social, ['linkedin', 'spotify']);
  // Only the site key travels to the browser; the secret stays in the submit route.
  const recaptcha =
    block.recaptcha?.recaptchaEnabled && block.recaptcha.recaptchaSiteKey
      ? { enabled: true, siteKey: block.recaptcha.recaptchaSiteKey }
      : undefined;

  return (
    <Section className={bgClass(block.background)}>
      <div className='grid gap-10 lg:grid-cols-12 lg:gap-16'>
        <Reveal className='lg:col-span-5'>
          {block.detailsEyebrow && <p className='eyebrow'>{rich(block.detailsEyebrow)}</p>}
          <dl className='mt-6 space-y-6 font-ui'>
            <div>
              <dt className='text-sm text-muted'>{block.phoneLabel}</dt>
              <dd className='t-h3 mt-1'>
                <a href={telHref(site.phone)} className={contactLink}>
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className='text-sm text-muted'>{block.emailLabel}</dt>
              <dd className='t-h3 mt-1'>
                <a href={mailtoHref(site.email)} className={contactLink}>
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
          {social.length > 0 && (
            <p className='mt-8 space-x-6 font-ui text-sm tracking-[.1em] uppercase'>
              {social.map((link) => (
                <a key={link.label} href={link.href} className={socialLink}>
                  {link.label}
                </a>
              ))}
            </p>
          )}
        </Reveal>

        <Reveal className='lg:col-span-7'>
          {block.formEyebrow && <p className='eyebrow'>{rich(block.formEyebrow)}</p>}
          <div className='mt-6'>
            {form ? (
              <FormRenderer
                form={form}
                variant='stacked'
                recaptcha={recaptcha}
                labels={ui.forms}
                // What a hidden `{{path}}` field is filled with, so the mail
                // says which page the form was sent from.
                context={path ? { path } : undefined}
              />
            ) : (
              <p className='text-muted'>{ui.forms.noForm}</p>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
