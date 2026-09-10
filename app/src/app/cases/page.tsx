import type { Metadata } from 'next';
import { Amp } from '@/components/site/Amp';
import { Frame } from '@/components/site/Frame';
import { Kennismaken } from '@/components/site/Kennismaken';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Section, SectionHead } from '@/components/site/Section';
import { Stats } from '@/components/site/Stats';

export const metadata: Metadata = {
  title: 'Cases',
  description:
    'Wat er blijft staan als &Jonk weer weg is: cases uit traineeships, teamtrajecten en organisatieontwikkeling.',
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow='Cases'
        title='Wat er blijft staan als wij weg zijn.'
        lead='Bij meerdere organisaties draaien de jaartrajecten inmiddels voor de zevende keer of vaker. Een aantal daarvan is volledig overgedragen aan trainers uit de organisatie zelf.'
      >
        <Stats />
      </PageHero>

      <Section className='border-t border-ink/10 bg-paper'>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-6'>
            <Frame
              src='jonk-7305'
              alt='Deelnemers van een traineeship tijdens een sessie'
              sizes='(min-width:1024px) 50vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>
          <Reveal className='lg:col-span-6'>
            <p className='eyebrow'>Case · Traineeship</p>
            <h2 className='t-h2 mt-4'>
              Gemeente Vlaardingen <Amp /> Haarlemmermeer
            </h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Een jaartraject voor traineeships, dat jaar na jaar meebeweegt met de organisatie eromheen
              — en verhuisde mee toen de opdrachtgever dat ook deed.
            </p>
            <blockquote className='mt-8 border-l-2 border-rose pl-6'>
              <p className='t-quote text-ink/90'>
                &ldquo;Ik had een partner die zag wat er in de groep gebeurde én wat er in de
                organisatie omheen speelde. Het traineeship is daar ieder jaar beter van
                geworden.&rdquo;
              </p>
              <footer className='mt-4 font-ui text-sm text-muted'>
                Edo Ridder
                <span className='mt-1 block text-ink/60'>
                  destijds manager traineeships gemeente Vlaardingen,
                  <br />
                  nu adviseur traineeships gemeente Haarlemmermeer
                </span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </Section>

      <Section className='border-t border-ink/10'>
        <SectionHead eyebrow='Meer cases' title='Uit de praktijk' />
        <div className='mt-14 grid gap-px border-y border-ink/10 bg-ink/10 md:mt-20 md:grid-cols-2'>
          {[0, 120].map((delay) => (
            <Reveal as='article' key={delay} delay={delay} className='bg-shell p-8 md:p-10'>
              <p className='eyebrow tbd-inherit'>[sector · type traject]</p>
              <h3 className='t-h3 tbd mt-4'>[naam opdrachtgever]</h3>
              <p className='tbd mt-4'>
                [korte omschrijving van de opgave en het traject, aan te leveren door de klant]
              </p>
            </Reveal>
          ))}
        </div>
        <p className='mt-6 font-ui text-xs text-muted'>
          Deze twee kaarten wachten nog op case-materiaal — de kaders staan al klaar om ze in te vullen.
        </p>
      </Section>

      <Kennismaken paper title='Benieuwd wat er bij jou kan blijven staan?' />
    </>
  );
}
