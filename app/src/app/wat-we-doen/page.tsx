import type { Metadata } from 'next';
import { Frame } from '@/components/site/Frame';
import { Kennismaken, KENNISMAKEN_TEXT_LONG } from '@/components/site/Kennismaken';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Section, SectionHead } from '@/components/site/Section';
import { ThreeLevels } from '@/components/site/ThreeLevels';
import { Timeline, TRAJECTEN } from '@/components/site/Timeline';

export const metadata: Metadata = {
  title: 'Wat we doen',
  description:
    'Traineeships, teamcoaching en organisatieontwikkeling voor het publieke domein — op maat, op drie niveaus.',
};

const STEPS = [
  { title: 'Kennismaking', text: 'Wij komen kijken en stellen vragen, jij vertelt wat er speelt.' },
  {
    title: 'Intake',
    text: 'We brengen de context in kaart: de mensen, de opgave en wat er al geprobeerd is.',
  },
  {
    title: 'Traject',
    text: 'We stappen zelf in en stemmen onderweg steeds af op wat er nodig is.',
  },
  {
    title: 'Overdracht',
    text: 'Wat werkt, blijft. Een aantal trajecten dragen we volledig over aan trainers uit de organisatie zelf.',
  },
];

export default function WatWeDoenPage() {
  return (
    <>
      <PageHero
        eyebrow='Wat we doen'
        title='Ontwikkeling die past bij wat er speelt.'
        lead='Traineeships, teamcoaching, leiderschapstrajecten en sparring voor directie: alles vertrekt vanuit hetzelfde gesprek. Wat speelt er bij de mens, tussen de mensen, en in de organisatie eromheen? Daar sluiten we op aan, niet op een vaste methodiek.'
      >
        <Reveal className='mt-14 md:mt-20'>
          <Frame
            src='jonk-7214'
            alt='Eric Jonk in gesprek tijdens een begeleidingssessie'
            priority
            className='aspect-[16/9]'
          />
        </Reveal>
      </PageHero>

      <Section className='border-t border-ink/10'>
        <SectionHead
          eyebrow='Drie niveaus, één gesprek'
          title='Individu, team en organisatie lopen in elkaar over'
          lead='We werken op drie niveaus tegelijk. Een medewerker die vastloopt, loopt zelden alleen vast: er speelt iets in het team of in hoe de organisatie is ingericht. Beweeg op één plek, en de andere twee bewegen mee.'
        />
        <ThreeLevels
          cards
          levels={[
            {
              text: 'Voor medewerkers, professionals en leidinggevenden die een stap willen zetten.',
              items: [
                'Traineeships',
                '(Persoonlijk) leiderschapstraject',
                'Intervisiegroepen',
                'Individuele coaching',
              ],
            },
            {
              text: 'Voor teams die beter willen samenwerken en verantwoordelijkheid willen pakken.',
              items: ['Teamcoaching', 'Teamontwikkeling', 'Werken aan onderling aanspreken'],
            },
            {
              text: 'Voor directies en HR/L&O die aan ontwikkeling willen werken als complex sociaal systeem.',
              items: [
                'Leerstrategie',
                'Behoud & doorstroom van talent',
                'Sparringpartner voor directie en MT',
              ],
            },
          ]}
        />
      </Section>

      <Section className='bg-paper'>
        <SectionHead eyebrow='Trajectlengtes' title='Van losse instap tot jarenlang partnerschap' />
        <Timeline items={TRAJECTEN} className='mt-14 md:mt-20' />
        <Reveal as='p' delay={700} className='mt-10 text-muted'>
          Wie één losse workshop zoekt, verwijzen we graag door. Dat is niet waar wij goed in zijn.
        </Reveal>
      </Section>

      <Section className='border-t border-ink/10'>
        <div className='grid items-start gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-5'>
            <p className='eyebrow'>Hoe het werkt</p>
            <h2 className='t-h2 mt-4'>Vier stappen, geen vast protocol</h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Elk traject is anders, maar de weg ernaartoe heeft steeds dezelfde vorm.
            </p>
          </Reveal>
          <div className='lg:col-span-6 lg:col-start-7'>
            <ol className='space-y-8'>
              {STEPS.map((step, i) => (
                <Reveal as='li' key={step.title} delay={i * 120} className='flex gap-6'>
                  <span className='w-10 shrink-0 font-display text-3xl leading-none text-rose'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className='t-h3'>{step.title}</h3>
                    <p className='mt-2 text-muted'>{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Kennismaken paper text={KENNISMAKEN_TEXT_LONG} />
    </>
  );
}
