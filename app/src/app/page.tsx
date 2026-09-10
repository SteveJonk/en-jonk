import { Amp } from '@/components/site/Amp';
import { Frame } from '@/components/site/Frame';
import { Kenmerken } from '@/components/site/Kenmerken';
import { Kennismaken, KENNISMAKEN_TEXT_LONG } from '@/components/site/Kennismaken';
import { ArrowLink, btnPrimary, ContactLines } from '@/components/site/Links';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Section, SectionHead } from '@/components/site/Section';
import { Stats } from '@/components/site/Stats';
import { ThreeLevels } from '@/components/site/ThreeLevels';
import { Timeline, TRAJECTEN } from '@/components/site/Timeline';
import { cn } from '@/lib/cn';
import { CONTACT } from '@/lib/nav';

// SANITY — the home page used to render the CMS page builder. Re-enable when wiring the CMS:
// import type { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { JsonLd } from '@/components/JsonLd';
// import { PageBuilder } from '@/components/PageBuilder';
// import { HOME_SLUG } from '@/lib/links';
// import { client } from '@/sanity/client';
// import { pageFaqs, pageJsonLd } from '@/lib/json-ld';
// import { pageMetadata, seoImageUrl } from '@/sanity/metadata';
// import { getSiteInformation } from '@/sanity/site-information';
// import { PAGE_QUERY } from '@/sanity/queries';
//
// const options = { next: { revalidate: 30 } };
//
// export async function generateMetadata(): Promise<Metadata> {
//   const page = await client.fetch(PAGE_QUERY, { slug: HOME_SLUG }, options);
//   return pageMetadata(page, { isHome: true });
// }
//
// export default async function HomePage() {
//   const [page, site] = await Promise.all([
//     client.fetch(PAGE_QUERY, { slug: HOME_SLUG }, options),
//     getSiteInformation(),
//   ]);
//   if (!page) notFound();
//   return (
//     <>
//       <JsonLd data={pageJsonLd({ path: '/', title: page.seo?.title || page.title, description: page.seo?.description, imageUrl: seoImageUrl(page.seo), faqs: pageFaqs(page.content), language: site.language })} />
//       <PageBuilder content={page.content} path='/' />
//     </>
//   );
// }

const REASONS = [
  {
    title: 'Jong talent dat blijft',
    text: 'Nieuwe medewerkers komen binnen met energie en ideeën. Wij zorgen dat hun ontwikkeling doorloopt en dat hun ideeën ergens landen. Zo vinden ze hun volgende stap bij jullie.',
  },
  {
    title: 'Leidinggevenden met een sterke band met hun mensen',
    text: 'Of iemand blijft, wordt beslist in het contact met de leidinggevende. Wij helpen leidinggevenden het gesprek te voeren en er iets mee te doen. Dat merkt de medewerker in het jaargesprek en op de werkvloer.',
  },
  {
    title: 'Teams die tegen druk kunnen',
    text: 'Elke vertrekker en elke zieke maakt het werk zwaarder voor wie blijft. Wij werken met teams aan wat er tussen mensen gebeurt: elkaar aanspreken, verantwoordelijkheid pakken en samen dragen wat er ligt.',
  },
];

const VALUES = [
  { title: 'Vertrouwen', text: <>We gaan uit van het goede. De mensen kunnen het echt zelf.</> },
  {
    title: 'Verbinding',
    text: (
      <>
        Niet jij of ik, maar jij <Amp /> ik. Een traject beklijft pas als de context meedoet.
      </>
    ),
  },
  {
    title: 'Beweging',
    text: <>We sluiten aan op het ritme van de groepsbeweging. Ervaring, reflectie en dan pas concept.</>,
  },
  {
    title: 'Gekkigheid',
    text: <>Een knipoog, bewust spel en momenten zonder strak doel. Juist dan ontstaan de mooiste inzichten.</>,
  },
];

const platformLink =
  'group flex items-center justify-between border border-ink/20 px-5 py-3.5 font-ui text-sm tracking-[.12em] uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-shell';

export default function HomePage() {
  return (
    <>
      <PageHero
        title={
          <>
            Ontwikkel je de mens <Amp />
            <br className='hidden sm:block' /> je ontwikkelt de organisatie.
          </>
        }
        lead='Een organisatie is voor ons een groep mensen die samen het werk doet: een complex sociaal systeem. Ontwikkeling begint daarom bij die mensen: bij wat er in ze omgaat en wat er tussen ze gebeurt. De organisatie ontwikkelt mee. Wij stappen daarvoor zelf in en staan naast je.'
        actions={
          <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-3'>
            <a href='#kennismaken' className={cn(btnPrimary, 'gap-2 px-7')}>
              Kennismaken
            </a>
            <ContactLines />
          </div>
        }
      >
        <Reveal className='mt-14 md:mt-20'>
          <Frame
            src='jonk-hero'
            alt='Eric Jonk lachend in gesprek tijdens een bijeenkomst'
            priority
            className='aspect-[16/9]'
          />
        </Reveal>
      </PageHero>

      {/* Waar je ons voor belt */}
      <Section className='border-t border-ink/10'>
        <Reveal className='grid items-start gap-10 lg:grid-cols-12 lg:gap-14'>
          <div className='lg:col-span-5'>
            <p className='eyebrow'>Waar je ons voor belt</p>
            <h2 className='t-h2 mt-4'>Ontwikkelpartner voor het publieke domein</h2>
          </div>
          <div className='lg:col-span-7 lg:pt-6'>
            <p className='t-lead max-w-prose text-muted'>
              Wij werken voor organisaties die zich inzetten voor het publieke domein: gemeenten,
              waterschappen, zbo&apos;s, zorg en onderwijs, en bureaus die met hen meewerken.
            </p>
          </div>
        </Reveal>

        <div className='mt-14 grid gap-px border-y border-ink/10 bg-ink/10 md:mt-20 md:grid-cols-3'>
          {REASONS.map((reason) => (
            <Reveal as='article' key={reason.title} className='bg-shell p-8 md:p-10'>
              <h3 className='t-h3'>{reason.title}</h3>
              <p className='mt-4 text-muted'>{reason.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as='p' className='mt-10'>
          <ArrowLink href='/wat-we-doen'>Bekijk wat we doen</ArrowLink>
        </Reveal>
      </Section>

      {/* Hoe klanten ons beschrijven */}
      <Section className='bg-paper'>
        <SectionHead
          eyebrow='Wat anderen zeggen'
          title='Hoe klanten ons beschrijven'
          lead='Opdrachtgevers die ons opnieuw bellen, noemen onafhankelijk van elkaar dezelfde drie dingen.'
        />

        <div className='mt-14 grid items-start gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16'>
          <div className='order-2 lg:order-1 lg:col-span-7'>
            <Kenmerken />

            <Reveal as='blockquote' className='mt-12 border-l-2 border-rose pl-6 md:pl-8'>
              <p className='t-quote text-ink/90'>
                &ldquo;Ik had een partner die zag wat er in de groep gebeurde én wat er in de
                organisatie omheen speelde. Als dat tweede het leren beïnvloedde, hoorde ik het en
                dachten we samen na. Het traineeship is daar ieder jaar beter van geworden.&rdquo;
              </p>
              <footer className='mt-4 font-ui text-sm text-muted'>
                Edo Ridder
                <span className='mt-1 block text-ink/60'>
                  destijds manager traineeships gemeente Vlaardingen,
                  <br />
                  nu adviseur traineeships gemeente Haarlemmermeer
                </span>
              </footer>
            </Reveal>

            <Reveal as='p' className='mt-10'>
              <ArrowLink href='/wat-anderen-zeggen'>Lees wat anderen zeggen</ArrowLink>
            </Reveal>
          </div>

          <Reveal className='order-1 lg:sticky lg:top-32 lg:order-2 lg:col-span-5'>
            <Frame
              src='jonk-hoe-klanten'
              alt='Eric Jonk in gesprek met deelnemers bij de flipover'
              sizes='(min-width:1024px) 40vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>
        </div>
      </Section>

      {/* Wat we doen — drie niveaus */}
      <Section className='border-t border-ink/10'>
        <SectionHead
          eyebrow='Wat we doen'
          title='Drie niveaus, één gesprek'
          lead='Ons werk krijgt vorm in het gesprek met jou. In de praktijk lopen de drie niveaus vaak in elkaar over.'
        />

        <ThreeLevels
          levels={[
            {
              text: 'Voor medewerkers, professionals en leidinggevenden die een stap willen zetten. Traineeships, (persoonlijk) leiderschapstrajecten, intervisiegroepen en individuele coaching.',
            },
            {
              text: 'Voor teams die beter willen samenwerken en verantwoordelijkheid willen pakken. Teamcoaching en teamontwikkeling, gericht op wat er tussen mensen gebeurt en wat daar blijft liggen.',
            },
            {
              text: 'Voor directies en HR/L&O die aan ontwikkeling willen werken, passend bij een organisatie als complex sociaal systeem: van leerstrategie tot behoud en doorstroom van talent. Sparringpartner voor directie en MT.',
            },
          ]}
        />

        <div className='mx-auto mt-20 max-w-2xl md:mt-28 lg:max-w-none'>
          <Reveal as='p' className='eyebrow'>
            Trajectlengtes
          </Reveal>
          <Timeline items={TRAJECTEN} className='mt-8' />
          <Reveal as='p' delay={700} className='mt-10 text-sm text-muted md:text-base'>
            Wie één losse workshop zoekt, verwijzen we graag door.
          </Reveal>
        </div>
      </Section>

      {/* Uit de praktijk */}
      <Section className='bg-ink text-shell'>
        <SectionHead eyebrow='Uit de praktijk' title='Wat er blijft staan als wij weg zijn' />
        <Stats dark />
        <div className='mt-14 grid items-center gap-10 md:mt-20 lg:grid-cols-12'>
          <Reveal as='p' className='t-lead text-shell/85 lg:col-span-7'>
            Bij meerdere organisaties draaien de jaartrajecten inmiddels voor de zevende keer of
            vaker. Een aantal daarvan is volledig overgedragen aan trainers uit de organisatie zelf.
          </Reveal>
          <Reveal as='p' className='lg:col-span-5 lg:text-right'>
            <ArrowLink href='/cases' className='text-shell'>
              Naar de cases
            </ArrowLink>
          </Reveal>
        </div>
      </Section>

      {/* Hoe wij kijken */}
      <Section className='bg-paper'>
        <div className='grid gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-5'>
            <p className='eyebrow'>Hoe wij naar ontwikkeling kijken</p>
            <h2 className='t-h2 mt-4'>Ontwikkeling ontstaat tussen mensen</h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Mensen dragen van nature een drang tot ontwikkeling in zich, maar die ontwikkeling
              ontstaat pas in de interactie met anderen. Wij willen dat ontwikkelen in organisaties
              verschuift: van kennis zenden en competenties afvinken, naar leren vanuit ervaring,
              dialoog en het werk zelf.
            </p>
            <p className='t-quote mt-6'>
              De wereld is te complex om helemaal te snappen. Accepteer de complexiteit, hou
              vertrouwen en surf mee.
            </p>
            <p className='mt-8'>
              <ArrowLink href='/hoe-wij-kijken'>
                Hoe wij kijken <Amp /> waar we op bouwen
              </ArrowLink>
            </p>
          </Reveal>

          <div className='lg:col-span-6 lg:col-start-7'>
            <Reveal as='p' className='eyebrow'>
              Vier waarden
            </Reveal>
            <dl className='mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2'>
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 120}>
                  <dt className='t-h3'>{value.title}</dt>
                  <dd className='mt-2 text-muted'>{value.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* De mensen */}
      <Section>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-6'>
            <Frame
              src='jonk-vakmensen-2'
              alt='Eric Jonk in gesprek met een deelnemer'
              sizes='(min-width:1024px) 50vw, 100vw'
              className='aspect-[3/2]'
            />
            <div className='mt-4 grid grid-cols-2 gap-4'>
              <Frame
                src='jonk-vakmensen-1'
                alt='Eric Jonk luistert terwijl een collega iets uitlegt'
                sizes='(min-width:1024px) 25vw, 50vw'
                className='aspect-[3/2]'
              />
              <Frame
                src='jonk-vakmensen-3'
                alt='Twee begeleiders van &Jonk tijdens een oefening'
                sizes='(min-width:1024px) 25vw, 50vw'
                className='aspect-[3/2]'
              />
            </div>
          </Reveal>

          <Reveal className='lg:col-span-6'>
            <p className='eyebrow'>De mensen van &amp;Jonk</p>
            <h2 className='t-h2 mt-4'>Vakmensen die zichzelf meenemen</h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Eerlijk en stevig genoeg om naast je te blijven staan als het ingewikkeld wordt. We
              combineren vakkennis met gevoel voor humor en intuïtie, iedere keer afgestemd op jou,
              de groep en de situatie. We kennen elkaar en elkaars werk. Daardoor voelt een traject
              als één geheel, ook als er meerdere mensen op staan.
            </p>
            <p className='mt-6 max-w-prose text-muted'>
              <strong className='font-medium text-ink'>Eric Jonk</strong> is oprichter en eigenaar.
              Hij is geschoold in transactionele analyse en veranderkunde, werkt sinds 2014 in en
              rond de lokale overheid en begeleidt teams en professionals sinds 2016.
            </p>
            <p className='mt-8'>
              <ArrowLink href='/over-jonk'>
                Wie we zijn <Amp /> waar we vandaan komen
              </ArrowLink>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Meeluisteren */}
      <Section className='border-y border-ink/10 bg-paper'>
        <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-5'>
            <p className='eyebrow'>Meeluisteren</p>
            <h2 className='t-h2 mt-4'>
              De podcast <em className='font-display not-italic'>In Gesprek</em>
            </h2>
            <p className='t-lead mt-6 max-w-prose text-muted'>
              Elke twee weken: één gesprek, één concreet dilemma uit het werk met mensen en
              organisaties.
            </p>
            <p className='mt-6'>
              <ArrowLink href='/podcast'>Alle afleveringen</ArrowLink>
            </p>
          </Reveal>

          <Reveal className='lg:col-span-4'>
            <Frame
              src='jonk-7483'
              alt='Eric Jonk achter de microfoon tijdens een opname van de podcast In Gesprek'
              sizes='(min-width:1024px) 30vw, 100vw'
              className='aspect-[4/5]'
            />
          </Reveal>

          <Reveal className='lg:col-span-3'>
            <h3 className='t-h3'>Luister mee</h3>
            <p className='mt-3 text-muted'>
              <em className='font-display text-xl not-italic'>In Gesprek</em> staat op Spotify en
              Apple Podcasts. Nieuwe afleveringen verschijnen automatisch ook hier op de site.
            </p>
            <div className='mt-6 space-y-3'>
              <a href={CONTACT.spotify} className={platformLink}>
                <span>Spotify</span>
                <span aria-hidden className='transition-transform duration-300 group-hover:translate-x-1'>
                  &rarr;
                </span>
              </a>
              <a href={CONTACT.applePodcasts} className={platformLink}>
                <span>Apple Podcasts</span>
                <span aria-hidden className='transition-transform duration-300 group-hover:translate-x-1'>
                  &rarr;
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <Kennismaken text={KENNISMAKEN_TEXT_LONG} />
    </>
  );
}
