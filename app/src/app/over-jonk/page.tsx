import type { Metadata } from 'next';
import { Amp } from '@/components/site/Amp';
import { Frame } from '@/components/site/Frame';
import { Kennismaken } from '@/components/site/Kennismaken';
import { ArrowLink } from '@/components/site/Links';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Section, SectionHead } from '@/components/site/Section';
import { Timeline, type TimelineItem } from '@/components/site/Timeline';

export const metadata: Metadata = {
  title: { absolute: 'Over &Jonk' },
  description:
    'Vakmensen die zichzelf meenemen. Het verhaal van oprichter Eric Jonk en het team achter &Jonk.',
};

const HISTORY: TimelineItem[] = [
  { title: '2014', text: 'Eric start met werken in en rond de lokale overheid.', dot: 'bg-rose', delay: 0 },
  { title: '2016', text: 'De eerste teams en professionals worden begeleid.', dot: 'bg-green', delay: 180 },
  {
    title: '2018',
    text: (
      <>
        <Amp />
        Jonk begeleidt de eerste traineeships.
      </>
    ),
    dot: 'bg-steel',
    delay: 360,
  },
];

const PEOPLE = [
  { src: 'jonk-vakmensen-2', alt: 'Eric Jonk in gesprek met een deelnemer' },
  { src: 'jonk-7317', alt: 'Deelnemers in gesprek tijdens een sessie' },
  { src: 'jonk-7467', alt: 'Twee begeleiders van &Jonk tijdens een oefening' },
];

export default function OverJonkPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <>
            Over <Amp />
            Jonk
          </>
        }
        title='Vakmensen die zichzelf meenemen.'
        lead='Eerlijk en stevig genoeg om naast je te blijven staan als het ingewikkeld wordt. We combineren vakkennis met gevoel voor humor en intuïtie, iedere keer afgestemd op jou, de groep en de situatie.'
      />

      <Section className='border-t border-ink/10 bg-paper'>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-5'>
            <Frame
              src='jonk-6842'
              alt='Eric Jonk, oprichter van &Jonk'
              sizes='(min-width:1024px) 40vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>
          <Reveal className='lg:col-span-7'>
            <p className='eyebrow'>Oprichter</p>
            <h2 className='t-h2 mt-4'>Eric Jonk</h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Eric is oprichter en eigenaar van <Amp />
              Jonk. Hij is geschoold in transactionele analyse en veranderkunde, werkt sinds 2014 in
              en rond de lokale overheid en begeleidt teams en professionals sinds 2016.
            </p>
            <p className='mt-6 max-w-prose text-muted'>
              Wat hem drijft: zien wat er in een groep gebeurt, en tegelijk voelen wat er in de
              organisatie eromheen speelt. Die twee blikken samen — op de mens en op het systeem —
              vormen de kern van hoe <Amp />
              Jonk werkt.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className='border-t border-ink/10'>
        <SectionHead eyebrow='Waar het begon' title='Sinds 2018 aan traineeships, teams en leiderschap' />
        <Timeline items={HISTORY} plainLine className='mt-14 md:mt-20' />
      </Section>

      <Section className='border-t border-ink/10 bg-paper'>
        <SectionHead
          eyebrow={
            <>
              De mensen van <Amp />
              Jonk
            </>
          }
          title='We kennen elkaar en elkaars werk'
          lead='Daardoor voelt een traject als één geheel, ook als er meerdere mensen op staan.'
        />
        <div className='mt-14 grid gap-6 md:mt-20 md:grid-cols-3'>
          {PEOPLE.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 120}>
              <Frame
                src={photo.src}
                alt={photo.alt}
                sizes='(min-width:768px) 33vw, 100vw'
                className='aspect-[3/2]'
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className='border-t border-ink/10'>
        <Reveal className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-7'>
            <p className='eyebrow'>Hoe wij naar ontwikkeling kijken</p>
            <h2 className='t-h2 mt-4'>
              Vertrouwen, verbinding, beweging <Amp /> gekkigheid
            </h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Vier waarden die bepalen hoe we werken, ook als het spannend wordt.
            </p>
          </div>
          <div className='lg:col-span-5 lg:text-right'>
            <ArrowLink href='/hoe-wij-kijken'>Hoe wij kijken</ArrowLink>
          </div>
        </Reveal>
      </Section>

      <Kennismaken paper />
    </>
  );
}
