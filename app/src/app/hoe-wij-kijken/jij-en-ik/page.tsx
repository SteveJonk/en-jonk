import type { Metadata } from 'next';
import { Amp } from '@/components/site/Amp';
import {
  ArticleAside,
  ArticleBody,
  ArticleHero,
  ArticleOutcome,
  ArticleSplit,
  AsideFigure,
  AsideImage,
  AsideQuote,
  LayerNav,
} from '@/components/site/Article';
import { Kennismaken } from '@/components/site/Kennismaken';
import { ArrowLink } from '@/components/site/Links';

const LEAD =
  "Een medewerker begint in het jaargesprek over haar ambities en merkt dat er niets mee gebeurt. Ze trekt haar conclusie en een half jaar later is ze weg. Twee collega's vermijden al maanden het gesprek dat ze eigenlijk moeten voeren en werken om elkaar heen. Een team heeft goede afspraken op papier en toch loopt de samenwerking vast. In alle gevallen ontbreekt de ontmoeting. Deze laag gaat over wat er tussen jou en de ander gebeurt.";

export const metadata: Metadata = {
  title: 'Jij & ik',
  description:
    'Een medewerker begint in het jaargesprek over haar ambities en merkt dat er niets mee gebeurt. Ze trekt haar conclusie en een half jaar later is ze…',
};

function DramaTriangle() {
  return (
    <svg
      viewBox='0 0 400 300'
      className='mx-auto h-auto w-full max-w-sm'
      role='img'
      aria-label='De dramadriehoek: Redder, Aanklager en Slachtoffer op de hoeken van een driehoek'
    >
      <path d='M80 70 L320 70 L200 250 Z' fill='#4a6b50' fillOpacity={0.14} stroke='#4a6b50' strokeWidth={1.5} />
      {[
        [80, 70],
        [320, 70],
        [200, 250],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r={7} fill='#bd7875' />
      ))}
      <g className='font-ui' fontSize={10} letterSpacing={1.6} fill='#162029' textAnchor='middle'>
        <text x={80} y={42}>REDDER</text>
        <text x={320} y={42}>AANKLAGER</text>
        <text x={200} y={282}>SLACHTOFFER</text>
      </g>
    </svg>
  );
}

export default function JijEnIkPage() {
  return (
    <>
      <ArticleHero
        layer={1}
        lead={LEAD}
        image='jonk-6894'
        alt='Deelnemers in gesprek met elkaar tijdens een leersessie'
      />

      <ArticleBody>
        <ArticleSplit
          title='Wat doe ik dat jij zo doet?'
          paras={[
            'Samenwerken gebeurt tussen mensen. Wat doe ik dat jij zo doet? Wat doe jij dat ik zo doe? Interactie is complex: de context speelt mee, de geschiedenis van mensen en wat er op dat moment bij iemand speelt. We hebben elkaar nodig om het werk gedaan te krijgen. Zolang de ontmoeting ontbreekt, blijven relaties en samenwerking aan de oppervlakte en de beperkende factoren eronder, hoe goed de afspraken ook zijn.',
          ]}
        />

        <ArticleSplit
          title='We beginnen met luisteren en vragen stellen'
          paras={[
            'Voordat we ook maar één model inzetten, oefenen we twee vaardigheden: aandachtig luisteren en open vragen stellen. Dat doen we vanaf de eerste dag zelf voor, zodat deelnemers zien hoe je onderzoekend met elkaar in gesprek bent. Het wordt onderdeel van onze gezamenlijke afspraken, waar we het hele traject op teruggrijpen. Daar hoort bij dat je hardop toetst wat je over de ander denkt te weten.',
          ]}
        />

        <ArticleAside
          title='We werken in het moment'
          paras={[
            'Interactie onderzoeken we het liefst in het moment zelf. We letten op kleine signalen: toon, timing, spanning, iemand die zich terugtrekt of juist ruimte inneemt. Dan stellen we hardop de vraag: wat gebeurt hier nu? Welk handelen vraagt dit moment van je? En wat zou je een volgende keer anders willen doen?',
            'Wanneer een opleidingsdag een thema heeft, zien we dat thema vaak terug in de groep. Op een dag over spanning in samenwerking wordt die spanning in de groep zichtbaar. Daar werken we graag mee: zo wordt het thema voelbaar en openen we het gesprek over wat er in het contact gebeurt.',
          ]}
          aside={
            <>
              <AsideQuote>Wat gebeurt hier nu?</AsideQuote>
              <AsideImage src='jonk-7196' alt='Eric Jonk in gesprek met een deelnemer' />
            </>
          }
        />

        <ArticleAside
          reverse
          title='Eenvoudige taal als gezamenlijke basis'
          paras={[
            "In gesprekken gebruiken we eenvoudige modellen die direct toepasbaar zijn. De dramadriehoek bijvoorbeeld, die laat zien hoe mensen in een gesprek de rol van Redder, Aanklager of Slachtoffer innemen, en de winnaarsdriehoek als uitweg daaruit. Zo'n model geeft voldoende afstand om te onderzoeken wat jij doet, wat de ander doet en hoe dat samenkomt. Naarmate het gesprek verdiept, merken deelnemers hoe beperkt een model is vergeleken met echte interactie. Dan laten we het los en onderzoeken we de nuances van wat zich werkelijk afspeelt.",
          ]}
          aside={
            <AsideFigure caption='De dramadriehoek'>
              <DramaTriangle />
            </AsideFigure>
          }
        />

        <ArticleSplit
          title='Nieuwe ervaringen brengen ontwikkeling'
          paras={[
            "Uit een patroon stappen vraagt om nieuwe ervaringen in het contact. Dat begint met opmerken wat er in jezelf gebeurt, daarna ruimte voelen om dat te erkennen, en vervolgens de stap durven zetten naar het gesprek. Zo'n gesprek is spannend, omdat je er iets van je eigen patroon in onder ogen ziet. Door het vaker te voeren, neemt de angst af en ontstaat ruimte om het anders te doen.",
            'Daarom betrekken we de omgeving van deelnemers actief bij een traject, bijvoorbeeld met driehoeksgesprekken tussen deelnemer, leidinggevende en ons. Het gesprek dat in de zaal is geoefend, wordt zo ook op het werk gevoerd.',
          ]}
        />

        <ArticleOutcome layer={1}>
          <p className='text-ink/85'>
            Leidinggevenden die het gesprek over ambities werkelijk voeren, zodat een medewerker zich
            gezien weet en blijft. Collega&apos;s die elkaar aanspreken en spanning uithouden. Teams
            waarin de afspraken op papier ook in het contact kloppen.
          </p>
          <p className='mt-5 text-ink/85'>
            Bewustzijn van wat er in jou gebeurt maakt echt contact mogelijk en uit echt contact
            ontstaat ontwikkeling. Dat werkt door in de groep als geheel: de volgende laag.
          </p>
          <p className='mt-10'>
            <ArrowLink href='/hoe-wij-kijken/ik-en-wij'>
              Lees verder: Ik <Amp /> Wij
            </ArrowLink>
          </p>
        </ArticleOutcome>
      </ArticleBody>

      <LayerNav current={1} />
      <Kennismaken paper />
    </>
  );
}
