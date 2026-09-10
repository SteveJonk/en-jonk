import type { Metadata } from 'next';
import { Amp } from '@/components/site/Amp';
import { LAYERS } from '@/components/site/Article';
import { Frame } from '@/components/site/Frame';
import { Kennismaken } from '@/components/site/Kennismaken';
import { ArrowLink } from '@/components/site/Links';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Container, Section, SectionHead } from '@/components/site/Section';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Hoe wij kijken',
  description:
    'Ontwikkel je de mens & dan ontwikkel je de organisatie. De visie, vier waarden en drie lagen achter het werk van &Jonk.',
};

const VALUES = [
  {
    title: 'Vertrouwen',
    bar: 'bg-rose',
    text: 'Vertrouwen in het goede is de basis van ieder leerproces. Iedereen heeft een eigen verhaal: gedrag dat lastig lijkt, heeft altijd een reden. We maken heldere afspraken over samenwerking en rollen, en bespreken die opnieuw wanneer dat nodig is. Eerlijkheid hoort daarbij: we zeggen wat we zien, ook als het spannend is. En we vertrouwen erop dat mensen en groepen het echt zelf kunnen: de groep bepaalt de richting, wij helpen bij het navigeren.',
  },
  {
    title: 'Verbinding',
    bar: 'bg-green',
    text: (
      <>
        &lsquo;Ubuntu: ik ben, omdat wij zijn.&rsquo; Verbinding is voor ons het besef dat we van
        elkaar afhankelijk zijn: het gaat niet om jou of mij. Het is jou <Amp /> mij: wij. Daarbij
        maakt iedereen deel uit van systemen als gezin, team en organisatie; een leertraject wordt
        duurzaam wanneer die context meedoet. Daarom betrekken we het systeem actief, bijvoorbeeld
        met driehoeksgesprekken en overleg met leidinggevenden.
      </>
    ),
  },
  {
    title: 'Beweging',
    bar: 'bg-steel',
    text: 'Onze achtergrond ligt in veranderkunde: hoe bewegen groepen en hoe beïnvloed je die beweging? We sluiten aan op de energie en het ritme van de groep, want dan ontstaat er iets wat precies past bij dat moment. We leren door te doen: eerst ervaren en reflecteren, daarna de theorie. En beweging is een constante: mensen en groepen veranderen voortdurend, onze werkwijze beweegt daarin mee.',
  },
  {
    title: 'Gekkigheid',
    bar: 'bg-rose',
    text: 'Bewust spel en momenten zonder strak doel. Niet omdat het luchtig moet blijven, maar omdat juist in die ruimte, zonder prestatiedruk, de mooiste inzichten ontstaan.',
  },
];

const LAYER_CARDS = [
  {
    title: <>Ik</>,
    text: 'Jezelf en je eigen patronen leren kennen, zonder een patroon meteen te lezen als een oordeel over wie je bent.',
  },
  {
    title: (
      <>
        Jij <Amp /> ik
      </>
    ),
    text: 'Elkaar werkelijk als mens zien, spanning uithouden en het gesprek voeren dat je liever vermijdt.',
  },
  {
    title: (
      <>
        Ik <Amp /> wij
      </>
    ),
    text: 'Verandering zien als de constante en je eigen handelingsruimte vinden in een groep die altijd in beweging is.',
  },
];

/** Vertrouwen draagt (kom), verbinding (twee ringen), beweging (golf), gekkigheid (lus). */
function ValuesIllustration() {
  return (
    <svg
      viewBox='0 0 480 360'
      className='mx-auto h-auto w-full max-w-md'
      role='img'
      aria-label='Illustratie van de vier waarden: een dragende kom voor vertrouwen, twee overlappende ringen voor verbinding, een golf voor beweging en een speelse lus voor gekkigheid'
    >
      <path d='M100 200 A140 140 0 0 0 380 200 Z' fill='#bd7875' fillOpacity={0.18} />
      <path d='M100 200 A140 140 0 0 0 380 200' fill='none' stroke='#bd7875' strokeWidth={1.5} />
      {[208, 272].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy={160}
          r={62}
          fill='#4a6b50'
          fillOpacity={0.28}
          stroke='#4a6b50'
          strokeWidth={1.5}
          style={{ mixBlendMode: 'multiply' }}
        />
      ))}
      <path d='M20 250 C90 205 150 295 240 250 S390 205 460 250' fill='none' stroke='#2c5a7a' strokeWidth={1.5} />
      <path
        d='M318 112 c26 -38 78 -32 70 2 c-7 28 -50 20 -38 -8 c14 -32 58 -44 92 -76'
        fill='none'
        stroke='#bd7875'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <circle cx={452} cy={24} r={4} fill='#bd7875' />
      <circle cx={434} cy={14} r={2.5} fill='#bd7875' />
      <circle cx={464} cy={44} r={2} fill='#bd7875' />
      <g className='font-ui' fontSize={10} letterSpacing={1.6} fill='#162029' textAnchor='middle'>
        <text x={240} y={315}>VERTROUWEN</text>
        <text x={240} y={164}>VERBINDING</text>
        <text x={420} y={285}>BEWEGING</text>
        <text x={330} y={60}>GEKKIGHEID</text>
      </g>
    </svg>
  );
}

export default function HoeWijKijkenPage() {
  return (
    <>
      <PageHero
        eyebrow='Hoe wij kijken'
        title={
          <>
            Ontwikkel je de mens <Amp /> dan ontwikkel je de organisatie.
          </>
        }
        lead='Een organisatie is voor ons een groep mensen die samen het werk doet. Vol tegenstellingen, gevormd door hun omgeving en door wat er tussen hen gebeurt. Ontwikkeling begint daarom bij de mensen die het werk doen. De organisatie ontwikkelt met hen mee.'
      />

      {/* Stand-in: vervangen door foto van de groep in de kring op de zolder. */}
      <Container>
        <Reveal>
          <Frame
            src='jonk-6832'
            alt='Een groep deelnemers in een kring in gesprek met Eric Jonk'
            priority
            className='aspect-[4/3] md:aspect-[21/9]'
          />
        </Reveal>
      </Container>

      <Section className='border-t border-ink/10'>
        <div className='grid gap-8 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-4'>
            <h2 className='t-h2'>
              Het <Amp />
              -teken
            </h2>
          </Reveal>
          <Reveal className='lg:col-span-8'>
            <p className='t-lead max-w-prose text-muted'>
              Ontwikkeling wordt vaak aangepakt alsof de organisatie een machine is: zet de onderdelen
              goed neer, druk op een knop en dan gaat het draaien. Bij een machine kun je ernaast gaan
              staan en een onderdeel vervangen. In een organisatie ben je zelf onderdeel. Het <Amp />
              -teken in onze naam bindt wat in de praktijk snel los wordt gekoppeld: mens <Amp />{' '}
              organisatie, leren <Amp /> werk.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className='bg-ink text-shell'>
        <Reveal as='blockquote' className='max-w-4xl'>
          <p className='t-quote text-shell/95'>
            De wereld is te complex om helemaal te snappen. Accepteer de complexiteit, hou vertrouwen
            en surf mee.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className='grid gap-8 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-4'>
            <h2 className='t-h2'>Wat wij zien</h2>
            {/* Stand-in: vervangen door foto "co-creatief leren" (Eric naast deelnemer bij de deur). */}
            <Frame
              src='jonk-7317'
              alt='Eric Jonk luistert naar een deelnemer tijdens een leersessie'
              sizes='(min-width:1024px) 33vw, 100vw'
              className='mt-10 aspect-[4/5]'
            />
          </Reveal>
          <Reveal className='lg:col-span-8'>
            <p className='t-lead max-w-prose text-muted'>
              Mensen dragen van nature een drang tot ontwikkeling in zich. Die ontwikkeling gebeurt in
              de interactie met anderen. In het werk van vandaag raken mensen die drang en elkaar kwijt:
              achter schermen, in de haast van de dag en in de zoektocht naar grip in kennis,
              protocollen en modellen. Je ziet het terug in werkdruk, in uitval en in gesprekken die
              vastlopen op standpunten.
            </p>
            <p className='mt-6 max-w-prose text-muted'>
              Ontwikkelen in organisaties volgt hetzelfde patroon. Op een training gaat het over weten
              hoe je feedback geeft, terwijl er in die groep op dat moment feedback te ervaren is. Drie
              mensen schrijven &ldquo;onze visie op leren&rdquo; en op de werkvloer herkent niemand
              zich erin. Een leidinggevende praat over &ldquo;mijn team&rdquo; alsof zij er zelf buiten
              staat.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className='bg-paper'>
        <div className='grid items-end gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-7'>
            <p className='eyebrow'>Vier waarden</p>
            <h2 className='t-h2 mt-4'>Waar we op sturen, ook als het spannend is</h2>
          </Reveal>
          <Reveal className='lg:col-span-5'>
            <ValuesIllustration />
          </Reveal>
        </div>

        <div className='mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:gap-x-16'>
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 120}>
              <span className={cn('block h-px w-10', value.bar)} />
              <h3 className='t-h3 mt-5'>{value.title}</h3>
              <p className='mt-3 max-w-prose text-muted'>{value.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stand-ins: vervangen door "Eric presenteert staand" en "Eric luistert, hand aan kin". */}
      <div className='bg-paper pb-20 md:pb-32'>
        <Container className='grid items-end gap-6 md:grid-cols-12 md:gap-8'>
          <Reveal className='md:col-span-7'>
            <Frame
              src='jonk-7214'
              alt='Eric Jonk licht iets toe aan een staande groep deelnemers'
              sizes='(min-width:768px) 58vw, 100vw'
              className='aspect-[3/2]'
            />
          </Reveal>
          <Reveal className='md:col-span-5'>
            <Frame
              src='jonk-7038'
              alt='Eric Jonk luistert aandachtig'
              sizes='(min-width:768px) 42vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>
        </Container>
      </div>

      <Section className='border-t border-ink/10'>
        <SectionHead
          title='Drie lagen'
          lead='In de ontwikkeling van mensen werken we op drie lagen die elkaar versterken.'
        />

        <div className='mt-14 grid gap-px border-y border-ink/10 bg-ink/10 md:mt-20 lg:grid-cols-3'>
          {LAYER_CARDS.map((card, i) => (
            <Reveal as='article' key={LAYERS[i].href} className='flex flex-col bg-shell p-8 md:p-10'>
              <span className={cn('block h-px w-10', LAYERS[i].bar)} />
              <h3 className='t-h3 mt-5'>{card.title}</h3>
              <p className='mt-3 text-muted'>{card.text}</p>
              <ArrowLink href={LAYERS[i].href} className='mt-auto pt-6 text-steel'>
                Lees meer
              </ArrowLink>
            </Reveal>
          ))}
        </div>

        <Reveal as='p' className='t-lead mt-12 max-w-3xl text-muted md:mt-16'>
          Wanneer mensen zich in deze drie lagen ontwikkelen, ontstaat in organisaties meer ruimte voor
          creativiteit, diversiteit en het pakken van verantwoordelijkheid. Die beweging in gang
          brengen geeft ons energie en daar ligt ons vakmanschap.
        </Reveal>
      </Section>

      <Section className='border-t border-ink/10'>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-6'>
            <Frame
              src='jonk-7398'
              alt='Eric Jonk in gesprek met een deelnemer, in aandacht'
              sizes='(min-width:1024px) 50vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>
          <Reveal className='lg:col-span-6'>
            <h2 className='t-h2'>Wat wij willen</h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Wij willen dat ontwikkelen in organisaties verschuift: van kennis zenden, competenties
              afvinken en gedrag toetsen, naar leren vanuit ervaring, dialoog en het werk zelf. Kennis,
              structuur en competenties houden daarin hun plek. Het is en-en. De balans ligt nu te veel
              aan de sturende kant.
            </p>
            <p className='mt-6 max-w-prose text-muted'>
              Voor onze programma&apos;s betekent dit dat ieder programma op maat wordt ontworpen voor
              een specifieke groep. Een vast kader met heldere doelen geeft houvast. Binnen dat kader
              is ruimte voor wat er in het contact met de groep ontstaat: meer sturing bij een
              beginnende groep, meer loslaten bij een gevorderde.
            </p>
            <p className='mt-8'>
              <ArrowLink href='/over-jonk'>
                Wie we zijn <Amp /> waar we vandaan komen
              </ArrowLink>
            </p>
          </Reveal>
        </div>
      </Section>

      <Kennismaken paper />
    </>
  );
}
