import type { Metadata } from 'next';
import { Frame } from '@/components/site/Frame';
import { Kennismaken } from '@/components/site/Kennismaken';
import { btnOutline, btnPrimary } from '@/components/site/Links';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Section, SectionHead } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import { CONTACT } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Podcast In Gesprek',
  description:
    'In Gesprek: elke twee weken één gesprek, één concreet dilemma uit het werk met mensen en organisaties.',
};

export default function PodcastPage() {
  return (
    <>
      <PageHero
        eyebrow='Meeluisteren'
        title={
          <>
            De podcast <em className='not-italic'>In Gesprek</em>.
          </>
        }
        lead='Elke twee weken: één gesprek, één concreet dilemma uit het werk met mensen en organisaties. Geen theorie om de theorie — steeds een echte situatie als vertrekpunt.'
        actions={
          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <a href={CONTACT.spotify} className={cn(btnPrimary, 'gap-2 px-7')}>
              Spotify
            </a>
            <a href={CONTACT.applePodcasts} className={cn(btnOutline, 'gap-2 px-7')}>
              Apple Podcasts
            </a>
          </div>
        }
      >
        <Reveal className='mt-14 md:mt-20'>
          <Frame
            src='jonk-7483'
            alt='Eric Jonk achter de microfoon tijdens een opname van de podcast In Gesprek'
            priority
            className='aspect-[21/9]'
          />
        </Reveal>
      </PageHero>

      <Section className='border-t border-ink/10 bg-paper'>
        <SectionHead eyebrow='Afleveringen' title='Luister de laatste gesprekken terug' />
        <ol className='mt-14 divide-y divide-ink/10 border-y border-ink/10 md:mt-20'>
          {[0, 1, 2, 3].map((i) => (
            <Reveal as='li' key={i} delay={i * 90} className='flex items-center gap-6 py-7 md:py-8'>
              <span className='tbd-inherit w-12 shrink-0 font-display text-2xl text-rose md:text-3xl'>
                [#]
              </span>
              <div className='flex-1'>
                <p className='t-h3 tbd'>[titel van de aflevering]</p>
                <p className='tbd mt-1 text-sm'>[gast en korte omschrijving van het dilemma]</p>
              </div>
              <a
                href='#'
                aria-label='Beluister deze aflevering'
                className='flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-shell'
              >
                &rarr;
              </a>
            </Reveal>
          ))}
        </ol>
        <p className='mt-6 font-ui text-xs text-muted'>
          Deze lijst wacht nog op de echte afleveringstitels en gasten — de layout staat al klaar.
        </p>
      </Section>

      <Section className='border-t border-ink/10'>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-6'>
            <Frame
              src='jonk-7196'
              alt='Achter de schermen bij een opname van In Gesprek'
              sizes='(min-width:1024px) 50vw, 100vw'
              className='aspect-[3/2]'
            />
          </Reveal>
          <Reveal className='lg:col-span-6'>
            <p className='eyebrow'>Waarom deze podcast</p>
            <h2 className='t-h2 mt-4'>Eén gesprek, één dilemma</h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Elke aflevering vertrekt vanuit een concrete situatie uit het werk met mensen en
              organisaties — geen abstracte theorie, maar een dilemma waar een luisteraar zelf ook in
              kan zitten.
            </p>
            <p className='mt-6 max-w-prose text-muted'>
              <em className='font-display text-xl not-italic'>In Gesprek</em> staat op Spotify en
              Apple Podcasts. Nieuwe afleveringen verschijnen automatisch ook hier op de site.
            </p>
          </Reveal>
        </div>
      </Section>

      <Kennismaken
        paper
        mailOnly
        title='Zelf een dilemma om te bespreken?'
        text='Laat het weten — misschien wordt het de volgende aflevering.'
      />
    </>
  );
}
