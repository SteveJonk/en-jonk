import type { Metadata } from 'next';
import { Frame } from '@/components/site/Frame';
import { Kenmerken } from '@/components/site/Kenmerken';
import { Kennismaken } from '@/components/site/Kennismaken';
import { Marquee } from '@/components/site/Marquee';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Container, Section, SectionHead } from '@/components/site/Section';

export const metadata: Metadata = {
  title: 'Wat anderen zeggen',
  description:
    'Hoe klanten &Jonk beschrijven: de persoon, de eerlijkheid en het aanvoelen dat ze noemen als reden om terug te bellen.',
};

const PUBLIC_SECTOR = [
  { src: 'vlaardingen.png', alt: 'Gemeente Vlaardingen' },
  { src: 'haarlemmermeer.svg', alt: 'Gemeente Haarlemmermeer' },
  { src: 'alkmaar.png', alt: 'Gemeente Alkmaar' },
  { src: 'leiden.webp', alt: 'Gemeente Leiden' },
  { src: 'zaanstad.png', alt: 'Gemeente Zaanstad' },
  { src: 'culemborg.png', alt: 'Gemeente Culemborg' },
  { src: 'nissewaard.png', alt: 'Gemeente Nissewaard' },
  { src: 'delfland.svg', alt: 'Hoogheemraadschap van Delfland' },
  { src: 'jeugdbescherming-rr.svg', alt: 'Jeugdbescherming Rotterdam Rijnmond' },
];

const OTHERS = [
  { src: 'radboud.png', alt: 'Radboud Universiteit' },
  { src: 'vo-academie.jpeg', alt: 'VO-academie' },
  { src: 'ncoi.png', alt: 'NCOI Opleidingen' },
  { src: 'klm.jpeg', alt: 'KLM' },
  { src: 'bmc.png', alt: 'BMC by Randstad' },
  { src: 'van-berkel.svg', alt: 'Van Berkel Professionals' },
  { src: 'lybrae.png', alt: 'Lybrae' },
  { src: 'frank-jol.png', alt: 'Frank Jol' },
];

export default function WatAnderenZeggenPage() {
  return (
    <>
      <PageHero
        eyebrow='Wat anderen zeggen'
        title='Hoe klanten ons beschrijven.'
        lead='Opdrachtgevers die ons opnieuw bellen, noemen onafhankelijk van elkaar dezelfde drie dingen. Niet omdat we het ze influisteren — het zijn hun eigen woorden.'
      />

      <Section className='border-t border-ink/10 bg-paper'>
        <div className='grid items-start gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-7'>
            <Kenmerken />
          </div>
          <Reveal className='lg:sticky lg:top-32 lg:col-span-5'>
            <Frame
              src='jonk-6894'
              alt='Deelnemers luisteren naar elkaar bij de flipover'
              sizes='(min-width:1024px) 40vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>
        </div>
      </Section>

      <Section className='bg-ink text-shell'>
        <Reveal as='blockquote' className='max-w-4xl'>
          <p className='t-quote text-shell/95'>
            &ldquo;Ik had een partner die zag wat er in de groep gebeurde én wat er in de organisatie
            omheen speelde. Als dat tweede het leren beïnvloedde, hoorde ik het en dachten we samen
            na. Het traineeship is daar ieder jaar beter van geworden.&rdquo;
          </p>
          <footer className='mt-6 font-ui text-sm text-shell/65'>
            Edo Ridder
            <span className='mt-1 block text-shell/50'>
              destijds manager traineeships gemeente Vlaardingen,
              <br />
              nu adviseur traineeships gemeente Haarlemmermeer
            </span>
          </footer>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow='Meer stemmen' title='Uit gesprekken met opdrachtgevers' />
        <div className='mt-14 grid gap-px border-y border-ink/10 bg-ink/10 md:mt-20 md:grid-cols-3'>
          {[0, 1, 2].map((i) => (
            <Reveal as='figure' key={i} className='bg-shell p-8 md:p-10'>
              <blockquote>
                <p className='tbd text-lg'>&ldquo;[citaat op te halen uit klantinterview]&rdquo;</p>
              </blockquote>
              <figcaption className='mt-5 font-ui text-sm text-muted'>
                <span className='tbd'>[naam]</span>, <span className='tbd'>[functie en organisatie]</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className='mt-6 font-ui text-xs text-muted'>
          Deze drie kaarten wachten nog op citaten uit klantinterviews — de kaders staan al klaar om
          ze in te zetten.
        </p>
      </Section>

      <section className='border-t border-ink/10 bg-paper py-20 md:py-32'>
        <Container>
          <SectionHead
            eyebrow='Opdrachtgevers'
            title='Organisaties in het publieke domein'
            lead="Gemeenten, waterschappen, zbo's, zorg en onderwijs, en bureaus die met hen meewerken."
          />
        </Container>
        <Reveal className='mt-12 space-y-6 md:mt-16'>
          <Marquee logos={PUBLIC_SECTOR} />
          <Marquee logos={OTHERS} reverse />
        </Reveal>
      </section>

      <Kennismaken title='Benieuwd wat we voor jou kunnen doen?' />
    </>
  );
}
