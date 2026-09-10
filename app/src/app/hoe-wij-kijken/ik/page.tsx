import type { Metadata } from 'next';
import { Amp } from '@/components/site/Amp';
import {
  ArticleAside,
  ArticleBody,
  ArticleFigure,
  ArticleHero,
  ArticleOutcome,
  ArticleSplit,
  AsideImage,
  AsideQuote,
  LayerNav,
} from '@/components/site/Article';
import { Kennismaken } from '@/components/site/Kennismaken';
import { ArrowLink } from '@/components/site/Links';

const LEAD =
  'Een leidinggevende hoort dat een medewerker een fout heeft gemaakt en voelt de irritatie opkomen. Een adviseur zit in een overleg en merkt dat zijn buik zich aanspant als een collega weer over hem heen praat. Een deelnemer weet het even niet en wilt meteen naar een oplossing. In alle drie de gevallen gebeurt er eerst iets binnenin, voordat iemand reageert. Deze laag gaat over dat moment.';

export const metadata: Metadata = {
  title: 'Ik',
  description:
    'Een leidinggevende hoort dat een medewerker een fout heeft gemaakt en voelt de irritatie opkomen. Een adviseur zit in een overleg en merkt dat zijn…',
};

/* --- Diagrams ------------------------------------------------------------- */

const INK = '#162029';
const MUTED = '#5a6670';
const ROSE = '#bd7875';
const GREEN = '#4a6b50';
const STEEL = '#2c5a7a';
const blend = { mixBlendMode: 'multiply' } as const;

type Label = { x: number; y: number; lines: string[] };

/** Centred labels; two-line labels sit 6px above and below the centre. */
function Labels({ items }: { items: Label[] }) {
  return (
    <g className='font-ui' fontSize={9} letterSpacing={1.2} fill={INK} textAnchor='middle'>
      {items.flatMap(({ x, y, lines }) =>
        lines.map((line, i) => (
          <text
            key={`${x}-${y}-${line}`}
            x={x}
            y={lines.length > 1 ? y + (i ? 6 : -6) : y}
            dominantBaseline='central'
          >
            {line}
          </text>
        )),
      )}
    </g>
  );
}

/** Gedachten, lichaamssensaties, gevoel and neiging tot gedrag around (cx, cy). */
function Lobes({ cx, cy, d, r }: { cx: number; cy: number; d: number; r: number }) {
  const items: Label[] = [
    { x: cx, y: cy - d, lines: ['GEDACHTEN'] },
    { x: cx - d, y: cy, lines: ['LICHAAMS-', 'SENSATIES'] },
    { x: cx + d, y: cy, lines: ['GEVOEL'] },
    { x: cx, y: cy + d, lines: ['NEIGING TOT', 'GEDRAG'] },
  ];
  return (
    <>
      {items.map(({ x, y }) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill={STEEL}
          fillOpacity={0.28}
          stroke={STEEL}
          strokeWidth={1.5}
          style={blend}
        />
      ))}
      <Labels items={items} />
    </>
  );
}

/** At first everything reads as thoughts: one tangle. */
function Tangle({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      {[
        [4, -8],
        [-10, 8],
        [16, 10],
      ].map(([dx, dy]) => (
        <circle
          key={dx}
          cx={cx + dx}
          cy={cy + dy}
          r={66}
          fill={STEEL}
          fillOpacity={0.12}
          stroke={STEEL}
          strokeWidth={1.5}
          style={blend}
        />
      ))}
      <circle cx={cx} cy={cy} r={72} fill={STEEL} fillOpacity={0.22} stroke={STEEL} strokeWidth={1.5} style={blend} />
      <Labels items={[{ x: cx, y: cy, lines: ['GEDACHTEN'] }]} />
    </>
  );
}

function Dot({ x, y, r, label }: { x: number; y: number; r: number; label: string }) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={ROSE} fillOpacity={0.28} stroke={ROSE} strokeWidth={1.5} style={blend} />
      <Labels items={[{ x, y, lines: [label] }]} />
    </>
  );
}

/** Straight arrow whose tip lands on (x2, y2). Horizontal or vertical only. */
function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const horizontal = y1 === y2;
  const points = horizontal
    ? `${x2},${y2} ${x2 - 12},${y2 + 6} ${x2 - 12},${y2 - 6}`
    : `${x2},${y2} ${x2 - 6},${y2 - 12} ${x2 + 6},${y2 - 12}`;
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={horizontal ? x2 - 12 : x2}
        y2={horizontal ? y2 : y2 - 12}
        stroke={color}
        strokeWidth={1.5}
      />
      <polygon points={points} fill={color} />
    </>
  );
}

const FILTER_LINES = [
  { dy: 58, text: 'Sociale conditionering', strong: true },
  { dy: 75, text: 'Boodschappen over hoe iets' },
  { dy: 92, text: 'is of hoort: normen,' },
  { dy: 109, text: 'geloof, cultuur' },
  { dy: 136, text: 'Genetische aanleg', strong: true },
  { dy: 163, text: 'Conditionering', strong: true },
  { dy: 180, text: 'Directe eigen ervaringen' },
  { dy: 197, text: 'uit het verleden' },
];

/** The filter card inside the eye, top-left corner at (x, y). */
function Filter({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width={168} height={222} fill='#fffcfa' stroke={GREEN} strokeWidth={1.5} />
      <line x1={x} y1={y + 32} x2={x + 168} y2={y + 32} stroke={GREEN} strokeWidth={1} />
      <text
        x={x + 84}
        y={y + 16}
        dominantBaseline='central'
        textAnchor='middle'
        className='font-ui'
        fontSize={10}
        letterSpacing={1.2}
        fill={INK}
      >
        FILTER
      </text>
      <g className='font-body' fontSize={12}>
        {FILTER_LINES.map((line) => (
          <text
            key={line.dy}
            x={x + 15}
            y={y + line.dy}
            fontWeight={line.strong ? 600 : 400}
            fill={line.strong ? INK : MUTED}
          >
            {line.text}
          </text>
        ))}
      </g>
    </>
  );
}

const TANGLE_LABEL =
  'Van één kluwen naar onderscheid: eerst lijkt alles gedachten, dan worden gedachten, gevoel, lichaamssensaties en neiging tot gedrag zichtbaar als overlappende delen, en uiteindelijk als losse delen die je apart kunt opmerken';

function TangleDiagram() {
  return (
    <>
      <div className='hidden md:block'>
        <svg viewBox='0 0 960 300' className='h-auto w-full' role='img' aria-label={TANGLE_LABEL}>
          <Tangle cx={150} cy={150} />
          <Arrow x1={262} y1={150} x2={312} y2={150} color={ROSE} />
          <Lobes cx={480} cy={150} d={70} r={54} />
          <Arrow x1={608} y1={150} x2={658} y2={150} color={ROSE} />
          <Lobes cx={812} cy={150} d={96} r={42} />
        </svg>
      </div>
      <div className='md:hidden'>
        <svg viewBox='0 0 360 910' className='mx-auto h-auto w-full max-w-xs' role='img' aria-label={TANGLE_LABEL}>
          <Tangle cx={180} cy={110} />
          <Arrow x1={180} y1={205} x2={180} y2={262} color={ROSE} />
          <Lobes cx={180} cy={400} d={70} r={54} />
          <Arrow x1={180} y1={540} x2={180} y2={605} color={ROSE} />
          <Lobes cx={180} cy={764} d={96} r={42} />
        </svg>
      </div>
    </>
  );
}

const LENS_LABEL =
  'De lens: een situatie komt binnen via een filter van sociale conditionering, genetische aanleg en eigen ervaringen. Dat filter selecteert, vervormt en generaliseert. Wat binnenkomt zet gedachten, gevoel, lichaamssensaties en neiging tot gedrag in gang, en dat leidt tot gedrag.';

function LensDiagram() {
  return (
    <>
      <div className='hidden md:block'>
        <svg viewBox='0 0 960 450' className='h-auto w-full' role='img' aria-label={LENS_LABEL}>
          <Lobes cx={170} cy={205} d={70} r={54} />
          <ellipse cx={470} cy={210} rx={118} ry={172} fill='none' stroke={INK} strokeWidth={1.5} />
          <Filter x={385} y={92} />
          <ellipse cx={568} cy={215} rx={7} ry={22} fill={INK} />
          <line x1={650} y1={60} x2={572.3} y2={105.9} stroke={STEEL} strokeWidth={1.5} />
          <polygon points='562,112 569.3,100.7 575.4,111.1' fill={STEEL} />
          <g className='font-ui' fontSize={10} letterSpacing={1.2} fill={INK}>
            <text x={662} y={50}>SELECTIE, VERVORMING,</text>
            <text x={662} y={66}>GENERALISEREN</text>
          </g>
          <Dot x={830} y={210} r={62} label='SITUATIE' />
          <Dot x={680} y={395} r={44} label='GEDRAG' />
          <Arrow x1={150} y1={410} x2={622} y2={410} color={STEEL} />
        </svg>
      </div>
      <div className='md:hidden'>
        <svg viewBox='0 0 360 965' className='mx-auto h-auto w-full max-w-xs' role='img' aria-label={LENS_LABEL}>
          <Dot x={180} y={62} r={52} label='SITUATIE' />
          <Arrow x1={180} y1={124} x2={180} y2={228} color={STEEL} />
          <g className='font-ui' fontSize={9} letterSpacing={1.1} fill={INK}>
            <text x={194} y={150}>SELECTIE, VERVORMING,</text>
            <text x={194} y={164}>GENERALISEREN</text>
          </g>
          <ellipse cx={180} cy={352} rx={118} ry={172} fill='none' stroke={INK} strokeWidth={1.5} />
          <Filter x={96} y={234} />
          <ellipse cx={180} cy={474} rx={22} ry={7} fill={INK} />
          <Lobes cx={180} cy={680} d={70} r={54} />
          <Arrow x1={180} y1={812} x2={180} y2={860} color={STEEL} />
          <Dot x={180} y={910} r={44} label='GEDRAG' />
        </svg>
      </div>
    </>
  );
}

/* --- Page ----------------------------------------------------------------- */

export default function IkPage() {
  return (
    <>
      <ArticleHero
        layer={0}
        lead={LEAD}
        image='jonk-7305'
        alt='Eric Jonk luistert aandachtig in een groep'
      />

      <ArticleBody>
        <ArticleAside
          title='Wat er binnenin gebeurt'
          paras={[
            'Ontwikkeling begint bij wat zich binnen iemand afspeelt: overtuigingen, gedachten, gevoelens, lichaamssensaties en de neiging om iets te doen. Een gevoel kan ontstaan in contact met een ander. Wat zich daarna in jou voltrekt, is van jou. Je vat het nooit helemaal, en dat hoeft ook niet. Wij oefenen met opmerken en vertragen: wat gebeurt er nu?',
            'Wie dat moment leert opmerken, krijgt de ruimte om te kiezen. De leidinggevende die de irritatie voelt, kan dan eerst vragen hoe de fout is ontstaan. De adviseur kan benoemen wat het overleg met hem doet. De deelnemer die het even niet weet, kan zichzelf de tijd geven.',
          ]}
          aside={<AsideQuote>Tussen prikkel en reactie zit een moment.</AsideQuote>}
        />

        <ArticleFigure caption='Opmerken en vertragen: wat gebeurt er nu?'>
          <TangleDiagram />
        </ArticleFigure>

        <ArticleSplit
          title='Patronen die logisch zijn'
          paras={[
            'Ieder mens denkt, voelt en handelt vanuit patronen die logisch zijn gezien eerdere ervaringen. Die patronen vormen samen een verhaal dat betekenis geeft aan je verleden, houvast biedt in het heden en een voorspelling doet over de toekomst. Ze helpen je en ze belemmeren je. Werken met je patronen betekent dat je gaat zien welke je volgt en wat die je opleveren, zonder een patroon meteen te lezen als een oordeel over wie je bent.',
            'Dat geldt ook voor hoe je naar anderen kijkt. De vraag verschuift van "wat is er mis met die collega" naar "hoe is dit gedrag logisch geworden". Die vraag brengt mildheid en nieuwsgierigheid, en vanuit daar ontstaat ruimte om iets anders te kiezen.',
          ]}
        />

        <ArticleSplit
          title='De lens'
          paras={[
            'In ons werk gebruiken we een tekening van een oog met een filter. Normen, waarden, ervaringen en gewoontes vormen samen een lens waardoor je kijkt. Die lens geeft selectief aandacht en vervormt. Wat zie je, wat mis je, wat vul je in? Wanneer iemand zeker weet hoe iets zit, is dat voor ons een signaal om te vertragen.',
          ]}
        />

        <ArticleFigure caption='De lens: wat je ziet, gaat eerst door een filter'>
          <LensDiagram />
        </ArticleFigure>

        <ArticleAside
          reverse
          title='Hoe wij daarin werken'
          paras={[
            'In onze trajecten geven we hier bewust tijd en taal voor: een vraag over het moment, ruimte voor stilte, een ervaring die eerst even mag sudderen voordat we hem duiden. Naar binnen kijken ontwikkel je door het veel te doen. We vergelijken het met een donkere kamer instappen: eerst zie je niets, dan schimmen, dan contouren en uiteindelijk herken je de bank. Oefenen kan met meditatie, schrijven, coaching, supervisie en in de groep.',
          ]}
          aside={<AsideImage src='jonk-6842' alt='Een deelnemer vertelt, Eric Jonk luistert' />}
        />

        <ArticleOutcome layer={0}>
          <p className='text-ink/85'>
            Mensen die opmerken wat er in hen gebeurt voordat ze reageren, oordelen minder snel en
            verkrampen minder onder druk. Ze kennen hun eigen patronen en kiezen vaker bewust. Dat
            ziet een organisatie terug in hoe een leidinggevende een lastig gesprek voert en in hoe een
            medewerker omgaat met een fout. En het is de basis voor de volgende laag: wie zichzelf kan
            waarnemen, kan de ander werkelijk zien.
          </p>
          <p className='mt-10'>
            <ArrowLink href='/hoe-wij-kijken/jij-en-ik'>
              Lees verder: Jij <Amp /> ik
            </ArrowLink>
          </p>
        </ArticleOutcome>
      </ArticleBody>

      <LayerNav current={0} />
      <Kennismaken paper />
    </>
  );
}
