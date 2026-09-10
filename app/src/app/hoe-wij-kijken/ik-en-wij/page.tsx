import type { Metadata } from 'next';
import {
  ArticleAside,
  ArticleBody,
  ArticleHero,
  ArticleOutcome,
  ArticleSplit,
  AsideFigure,
  AsideImage,
  LayerNav,
} from '@/components/site/Article';
import { Kennismaken } from '@/components/site/Kennismaken';

const LEAD =
  'Een MT-lid vertelt over "mijn team" alsof zij er zelf buiten staat. Een team wacht tot de directie eindelijk een besluit neemt. Een afdeling heeft haar hoop gevestigd op de reorganisatie van volgend jaar. In alle drie de gevallen kijkt iemand naar de groep alsof hij er zelf geen deel van uitmaakt. Wie in een groep werkt, is er onderdeel van. Deze laag gaat over de vraag hoe je vanuit die plek je eigen handelingsruimte vindt.';

export const metadata: Metadata = {
  title: 'Ik & Wij',
  description:
    'Een MT-lid vertelt over "mijn team" alsof zij er zelf buiten staat. Een team wacht tot de directie eindelijk een besluit neemt. Een afdeling heeft…',
};

/** Ten people in a circle; the first (bottom) one is "ik". */
function IkInDeWij() {
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

export default function IkEnWijPage() {
  return (
    <>
      <ArticleHero
        layer={2}
        lead={LEAD}
        image='jonk-6832'
        alt='Een groep deelnemers in een kring met Eric Jonk'
      />

      <ArticleBody>
        <ArticleSplit
          title='Wat een groep doet onder spanning'
          paras={[
            'Een groep werkt aan een taak en daaronder gebeurt van alles. Zodra druk, onzekerheid of spanning toeneemt, gaat een groep als geheel reageren. De groep legt de verantwoordelijkheid bij één persoon, vaak de leidinggevende: "zeg jij maar hoe het moet." De groep zoekt de strijd met iets buiten zichzelf, zoals de directie of een andere afdeling, of trekt zich terug. Of de groep richt haar hoop op een oplossing die nog moet komen: het nieuwe systeem, de reorganisatie, de nieuwe collega. Samen denken en werken verschuift dan naar passiviteit, strijd of uitstel.',
            'Dit gedrag heet in organisaties al snel weerstand, gebrek aan motivatie of gedoe. Wij zien het als een reactie van de groep op spanning, en die reactie vertelt wat de groep op dat moment nodig heeft. Wie dat leert lezen, kan er iets mee.',
          ]}
        />

        <ArticleAside
          title='De organisatie zit in de groep'
          paras={[
            'Een groep is een klein stuk van de organisatie. Wat in de cultuur speelt, komt terug in de trainingsruimte. Zoals bij een broccoli: breek er een takje af en je ziet dezelfde vorm als bij de hele broccoli. In een organisatie waar de regels het overnemen van de bedoeling, wachten deelnemers tot iemand zegt wat mag. In een organisatie met een zware hiërarchie leunen deelnemers achterover en klinkt er cynisme.',
            'Daarom lezen we wat er in de groep gebeurt als informatie over de organisatie, en die informatie delen we ook met de opdrachtgever. Spannende dingen zijn bij ons gewoon te benoemen, richting het team en richting de directie. Kleine bewegingen in de groep werken ook door in het grotere geheel. Een leidinggevende die in de leergang leert de verantwoordelijkheid bij het team te laten, doet dat een week later ook in het werkoverleg.',
          ]}
          aside={<AsideImage src='jonk-7214' alt='Eric Jonk licht iets toe aan de groep' />}
        />

        <ArticleAside
          reverse
          title='Hoe wij daarin werken'
          paras={[
            'Een groep nodigt de begeleider uit om te redden, te sturen of het ongemak weg te nemen. Die uitnodiging merken we eerst in onszelf op en we vertragen. Wat probeert de groep te vermijden? Welke verantwoordelijkheid wordt bij ons neergelegd? En wat gebeurt er met het leren als wij die rol aannemen? Meestal benoemen we wat we zien en geven we de verantwoordelijkheid terug aan de groep. Daarom zitten we het liefst in de groep, als een ik in de wij: vanaf die plek is de dynamiek voelbaar en bespreekbaar.',
            'Deelnemers leren om zelf zo naar hun groep te kijken: meedoen en tegelijk waarnemen wat er gebeurt. Samen onderzoeken we welke patronen zich aandienen en wat ieder daaraan bijdraagt. Daarna maken we de vertaling naar het eigen werk. Waar zie je ditzelfde terug in je team? Welke rol neem je daar in? En welke ruimte heb je om het anders te doen? De groep wordt zo een oefenplek voor de organisatie. De dynamiek blijft leerstof voor de groep en wordt nooit een oordeel over één deelnemer.',
          ]}
          aside={
            <AsideFigure caption='Een ik in de wij'>
              <IkInDeWij />
            </AsideFigure>
          }
        />

        <ArticleOutcome layer={2}>
          <p className='text-ink/85'>
            Leidinggevenden en professionals die leren lezen wat er om hen heen gebeurt, hoe groepen
            werken, welke invloed de cultuur heeft en welke ongeschreven regels meespelen, hoeven minder
            te wachten op de directie, de reorganisatie of de nieuwe collega. Zij vinden hun eigen
            ruimte in een groep die altijd in beweging is en pakken verantwoordelijkheid waar dat kan.
          </p>
        </ArticleOutcome>
      </ArticleBody>

      <LayerNav current={2} />
      <Kennismaken paper />
    </>
  );
}
