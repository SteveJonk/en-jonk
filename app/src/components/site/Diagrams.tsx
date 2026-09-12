/**
 * The diagrams editors can place on a page. They are drawn in code, not
 * uploaded: the studio stores only the key (`articleFigure.diagram`,
 * `articleAside.diagram`), and `DIAGRAMS` maps it to the drawing.
 */

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

export function TangleDiagram() {
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

export function LensDiagram() {
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

export function DramaTriangle() {
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

/** Ten people in a circle; the first (bottom) one is "ik". */
export function IkInDeWij() {
  return (
    <svg
      viewBox='0 0 400 300'
      className='mx-auto h-auto w-full max-w-sm'
      role='img'
      aria-label='Tien mensen in een kring; één van hen is uitgelicht: een ik in de wij'
    >
      <circle cx={200} cy={150} r={110} fill='none' stroke='#2c5a7a' strokeWidth={1} strokeDasharray='3 5' />
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i * Math.PI) / 5;
        const cx = +(200 - 110 * Math.sin(angle)).toFixed(1);
        const cy = +(150 + 110 * Math.cos(angle)).toFixed(1);
        return i === 0 ? (
          <circle key={i} cx={cx} cy={cy} r={14} fill='#bd7875' />
        ) : (
          <circle key={i} cx={cx} cy={cy} r={10} fill='#2c5a7a' fillOpacity={0.3} />
        );
      })}
      <g className='font-ui' fontSize={10} letterSpacing={1.6} fill='#162029' textAnchor='middle'>
        <text x={200} y={154}>WIJ</text>
        <text x={200} y={298}>IK</text>
      </g>
    </svg>
  );
}

/** Vertrouwen draagt (kom), verbinding (twee ringen), beweging (golf), gekkigheid (lus). */
export function ValuesIllustration() {
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

/** Keys as stored by the studio's diagram picker. */
export const DIAGRAMS = {
  tangle: TangleDiagram,
  lens: LensDiagram,
  dramaTriangle: DramaTriangle,
  ikInDeWij: IkInDeWij,
} as const;

export type DiagramKey = keyof typeof DIAGRAMS;
