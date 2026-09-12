/**
 * Every page of the site, as page-builder blocks, with the copy and photos of
 * the approved design. All pages are written in one transaction, because they
 * link to each other by their fixed ids.
 *
 * Text conventions (see `Rich` in the app): `&` is the brand ampersand,
 * `*x*` the display italic, `**x**` bold, `[x]` a placeholder still to come,
 * and a line break in a hero title only breaks on larger screens.
 */
import {
  CASE_PLACEHOLDERS,
  CASE_VLAARDINGEN,
  EDO_RIDDER,
  TESTIMONIAL_PLACEHOLDERS,
} from './documents'
import {CONTACT_FORM_ID} from './forms'
import {
  client,
  entry,
  image,
  item,
  pageDoc,
  pageLink,
  photo,
  photoItem,
  ref,
  refItem,
  urlLink,
  weakenMissingReferences,
  type Block,
} from './shared'

const KENNISMAKEN_TEXT =
  'Het eerste gesprek is een kennismaking. Wij komen kijken en stellen vragen, jij vertelt wat er speelt.'
const KENNISMAKEN_TEXT_LONG = `${KENNISMAKEN_TEXT} Daarna weten we allebei of het past.`

const KENMERKEN = [
  item(
    'Ze komen terug om de persoon.',
    'Je krijgt vakmensen die zichzelf meenemen. Er zijn veel trainers met een trucje, een methodiek en veel ervaring; het verschil is dat hier echt het hart erin zit.',
  ),
  item(
    'Eerlijkheid als onderscheid.',
    'Ook als het spannend is, richting directie en richting team. En we zeggen nee als een vraag bij ons niet past. Opdrachtgevers noemen dat als reden om ons te kiezen.',
  ),
  item(
    'Aanvoelen gaat voor een methode.',
    'Op maat werken, mensen op hun gemak stellen en voelen dat de een nog niet zo ver is als de ander. Vaste methodieken en protocollen zijn als houvast losgelaten.',
  ),
]

const TRAJECTEN = [
  item('Drie bijeenkomsten', 'Een korte instap, waarin patronen zichtbaar worden en een volgende stap ontstaat.'),
  item('Een half jaar', 'Trajecten waarin het geleerde meebeweegt met het werk zelf.'),
  item('Tot twee jaar', 'Traineeships en jaartrajecten, van intake tot overdracht.'),
]

const STATS = [
  entry('stat', {value: '7', suffix: 'e', text: 'keer dat de leergang [naam leergang] dit jaar draait.'}),
  entry('stat', {value: '2018', text: 'het jaar waarin we de eerste traineeships gingen begeleiden.'}),
  entry('stat', {value: '[cijfer]', text: 'doorstroom bij een gemeente van ruim 500 medewerkers.'}),
]

const LAYERS = ['hoe-wij-kijken/ik', 'hoe-wij-kijken/jij-en-ik', 'hoe-wij-kijken/ik-en-wij']

function kennismaken(fields: {title?: string; text?: string; mailOnly?: boolean; paper?: boolean} = {}) {
  const {paper, ...rest} = fields
  return {_type: 'kennismaken', background: paper ? 'paper' : 'default', ...rest}
}

function layerNav(): Block {
  return {_type: 'layerNav', eyebrow: 'De drie lagen', layers: LAYERS.map((slug) => refItem(`page-${slug.replace(/\//g, '-')}`))}
}

// ---------------------------------------------------------------------------

async function home() {
  return pageDoc(
    'home',
    'Home',
    {
      title: '&Jonk — talent, leiderschap, teams',
      description:
        '&Jonk is ontwikkelpartner voor organisaties in het publieke domein. Ontwikkel je de mens, je ontwikkelt de organisatie.',
    },
    [
      {
        _type: 'pageHero',
        title: 'Ontwikkel je de mens &\nje ontwikkelt de organisatie.',
        lead: 'Een organisatie is voor ons een groep mensen die samen het werk doet: een complex sociaal systeem. Ontwikkeling begint daarom bij die mensen: bij wat er in ze omgaat en wat er tussen ze gebeurt. De organisatie ontwikkelt mee. Wij stappen daarvoor zelf in en staan naast je.',
        ctas: [{...urlLink('Kennismaken', '#kennismaken'), _key: 'kennismaken'}],
        showContactLines: true,
        image: await photo('jonk-hero', 'Eric Jonk lachend in gesprek tijdens een bijeenkomst'),
        imageAspect: '16/9',
      },
      {
        _type: 'cardGrid',
        eyebrow: 'Waar je ons voor belt',
        title: 'Ontwikkelpartner voor het publieke domein',
        lead: "Wij werken voor organisaties die zich inzetten voor het publieke domein: gemeenten, waterschappen, zbo's, zorg en onderwijs, en bureaus die met hen meewerken.",
        splitHeader: true,
        items: [
          entry('card', {
            title: 'Jong talent dat blijft',
            text: 'Nieuwe medewerkers komen binnen met energie en ideeën. Wij zorgen dat hun ontwikkeling doorloopt en dat hun ideeën ergens landen. Zo vinden ze hun volgende stap bij jullie.',
          }),
          entry('card', {
            title: 'Leidinggevenden met een sterke band met hun mensen',
            text: 'Of iemand blijft, wordt beslist in het contact met de leidinggevende. Wij helpen leidinggevenden het gesprek te voeren en er iets mee te doen. Dat merkt de medewerker in het jaargesprek en op de werkvloer.',
          }),
          entry('card', {
            title: 'Teams die tegen druk kunnen',
            text: 'Elke vertrekker en elke zieke maakt het werk zwaarder voor wie blijft. Wij werken met teams aan wat er tussen mensen gebeurt: elkaar aanspreken, verantwoordelijkheid pakken en samen dragen wat er ligt.',
          }),
        ],
        link: pageLink('Bekijk wat we doen', 'wat-we-doen'),
        background: 'default',
      },
      {
        _type: 'kenmerken',
        eyebrow: 'Wat anderen zeggen',
        title: 'Hoe klanten ons beschrijven',
        lead: 'Opdrachtgevers die ons opnieuw bellen, noemen onafhankelijk van elkaar dezelfde drie dingen.',
        items: KENMERKEN,
        testimonial: ref(EDO_RIDDER),
        image: await photo('jonk-hoe-klanten', 'Eric Jonk in gesprek met deelnemers bij de flipover'),
        link: pageLink('Lees wat anderen zeggen', 'wat-anderen-zeggen'),
        background: 'paper',
      },
      {
        _type: 'threeLevels',
        eyebrow: 'Wat we doen',
        title: 'Drie niveaus, één gesprek',
        lead: 'Ons werk krijgt vorm in het gesprek met jou. In de praktijk lopen de drie niveaus vaak in elkaar over.',
        levels: [
          entry('level', {
            text: 'Voor medewerkers, professionals en leidinggevenden die een stap willen zetten. Traineeships, (persoonlijk) leiderschapstrajecten, intervisiegroepen en individuele coaching.',
          }),
          entry('level', {
            text: 'Voor teams die beter willen samenwerken en verantwoordelijkheid willen pakken. Teamcoaching en teamontwikkeling, gericht op wat er tussen mensen gebeurt en wat daar blijft liggen.',
          }),
          entry('level', {
            text: 'Voor directies en HR/L&O die aan ontwikkeling willen werken, passend bij een organisatie als complex sociaal systeem: van leerstrategie tot behoud en doorstroom van talent. Sparringpartner voor directie en MT.',
          }),
        ],
        timeline: {
          eyebrow: 'Trajectlengtes',
          items: TRAJECTEN,
          note: 'Wie één losse workshop zoekt, verwijzen we graag door.',
        },
        background: 'default',
      },
      {
        _type: 'stats',
        eyebrow: 'Uit de praktijk',
        title: 'Wat er blijft staan als wij weg zijn',
        items: STATS,
        text: 'Bij meerdere organisaties draaien de jaartrajecten inmiddels voor de zevende keer of vaker. Een aantal daarvan is volledig overgedragen aan trainers uit de organisatie zelf.',
        link: pageLink('Naar de cases', 'cases'),
        background: 'dark',
      },
      {
        _type: 'values',
        variant: 'compact',
        eyebrow: 'Hoe wij naar ontwikkeling kijken',
        title: 'Ontwikkeling ontstaat tussen mensen',
        lead: 'Mensen dragen van nature een drang tot ontwikkeling in zich, maar die ontwikkeling ontstaat pas in de interactie met anderen. Wij willen dat ontwikkelen in organisaties verschuift: van kennis zenden en competenties afvinken, naar leren vanuit ervaring, dialoog en het werk zelf.',
        quote:
          'De wereld is te complex om helemaal te snappen. Accepteer de complexiteit, hou vertrouwen en surf mee.',
        link: pageLink('Hoe wij kijken & waar we op bouwen', 'hoe-wij-kijken'),
        itemsEyebrow: 'Vier waarden',
        items: [
          item('Vertrouwen', 'We gaan uit van het goede. De mensen kunnen het echt zelf.'),
          item('Verbinding', 'Niet jij of ik, maar jij & ik. Een traject beklijft pas als de context meedoet.'),
          item('Beweging', 'We sluiten aan op het ritme van de groepsbeweging. Ervaring, reflectie en dan pas concept.'),
          item('Gekkigheid', 'Een knipoog, bewust spel en momenten zonder strak doel. Juist dan ontstaan de mooiste inzichten.'),
        ],
        background: 'paper',
      },
      {
        _type: 'mediaText',
        eyebrow: 'De mensen van &Jonk',
        title: 'Vakmensen die zichzelf meenemen',
        lead: 'Eerlijk en stevig genoeg om naast je te blijven staan als het ingewikkeld wordt. We combineren vakkennis met gevoel voor humor en intuïtie, iedere keer afgestemd op jou, de groep en de situatie. We kennen elkaar en elkaars werk. Daardoor voelt een traject als één geheel, ook als er meerdere mensen op staan.',
        paragraphs: [
          '**Eric Jonk** is oprichter en eigenaar. Hij is geschoold in transactionele analyse en veranderkunde, werkt sinds 2014 in en rond de lokale overheid en begeleidt teams en professionals sinds 2016.',
        ],
        images: [
          await photoItem('jonk-vakmensen-2', 'Eric Jonk in gesprek met een deelnemer'),
          await photoItem('jonk-vakmensen-1', 'Eric Jonk luistert terwijl een collega iets uitlegt'),
          await photoItem('jonk-vakmensen-3', 'Twee begeleiders van &Jonk tijdens een oefening'),
        ],
        imageAspect: '3/2',
        link: pageLink('Wie we zijn & waar we vandaan komen', 'over-jonk'),
        background: 'default',
      },
      {
        _type: 'podcastTeaser',
        eyebrow: 'Meeluisteren',
        title: 'De podcast *In Gesprek*',
        lead: 'Elke twee weken: één gesprek, één concreet dilemma uit het werk met mensen en organisaties.',
        link: pageLink('Alle afleveringen', 'podcast'),
        image: await photo('jonk-7483', 'Eric Jonk achter de microfoon tijdens een opname van de podcast In Gesprek'),
        listenTitle: 'Luister mee',
        listenText:
          '*In Gesprek* staat op Spotify en Apple Podcasts. Nieuwe afleveringen verschijnen automatisch ook hier op de site.',
        background: 'paper',
      },
      kennismaken({text: KENNISMAKEN_TEXT_LONG}),
    ],
  )
}

async function watWeDoen() {
  return pageDoc(
    'wat-we-doen',
    'Wat we doen',
    {
      description:
        'Traineeships, teamcoaching en organisatieontwikkeling voor het publieke domein — op maat, op drie niveaus.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Wat we doen',
        title: 'Ontwikkeling die past bij wat er speelt.',
        lead: 'Traineeships, teamcoaching, leiderschapstrajecten en sparring voor directie: alles vertrekt vanuit hetzelfde gesprek. Wat speelt er bij de mens, tussen de mensen, en in de organisatie eromheen? Daar sluiten we op aan, niet op een vaste methodiek.',
        image: await photo('jonk-7214', 'Eric Jonk in gesprek tijdens een begeleidingssessie'),
        imageAspect: '16/9',
      },
      {
        _type: 'threeLevels',
        eyebrow: 'Drie niveaus, één gesprek',
        title: 'Individu, team en organisatie lopen in elkaar over',
        lead: 'We werken op drie niveaus tegelijk. Een medewerker die vastloopt, loopt zelden alleen vast: er speelt iets in het team of in hoe de organisatie is ingericht. Beweeg op één plek, en de andere twee bewegen mee.',
        cards: true,
        levels: [
          entry('level', {
            text: 'Voor medewerkers, professionals en leidinggevenden die een stap willen zetten.',
            items: ['Traineeships', '(Persoonlijk) leiderschapstraject', 'Intervisiegroepen', 'Individuele coaching'],
          }),
          entry('level', {
            text: 'Voor teams die beter willen samenwerken en verantwoordelijkheid willen pakken.',
            items: ['Teamcoaching', 'Teamontwikkeling', 'Werken aan onderling aanspreken'],
          }),
          entry('level', {
            text: 'Voor directies en HR/L&O die aan ontwikkeling willen werken als complex sociaal systeem.',
            items: ['Leerstrategie', 'Behoud & doorstroom van talent', 'Sparringpartner voor directie en MT'],
          }),
        ],
        background: 'default',
      },
      {
        _type: 'timeline',
        eyebrow: 'Trajectlengtes',
        title: 'Van losse instap tot jarenlang partnerschap',
        items: TRAJECTEN,
        note: 'Wie één losse workshop zoekt, verwijzen we graag door. Dat is niet waar wij goed in zijn.',
        background: 'paper',
      },
      {
        _type: 'steps',
        eyebrow: 'Hoe het werkt',
        title: 'Vier stappen, geen vast protocol',
        lead: 'Elk traject is anders, maar de weg ernaartoe heeft steeds dezelfde vorm.',
        items: [
          item('Kennismaking', 'Wij komen kijken en stellen vragen, jij vertelt wat er speelt.'),
          item('Intake', 'We brengen de context in kaart: de mensen, de opgave en wat er al geprobeerd is.'),
          item('Traject', 'We stappen zelf in en stemmen onderweg steeds af op wat er nodig is.'),
          item(
            'Overdracht',
            'Wat werkt, blijft. Een aantal trajecten dragen we volledig over aan trainers uit de organisatie zelf.',
          ),
        ],
        background: 'default',
      },
      kennismaken({text: KENNISMAKEN_TEXT_LONG, paper: true}),
    ],
  )
}

const PUBLIC_SECTOR: [file: string, name: string][] = [
  ['vlaardingen.png', 'Gemeente Vlaardingen'],
  ['haarlemmermeer.svg', 'Gemeente Haarlemmermeer'],
  ['alkmaar.png', 'Gemeente Alkmaar'],
  ['leiden.webp', 'Gemeente Leiden'],
  ['zaanstad.png', 'Gemeente Zaanstad'],
  ['culemborg.png', 'Gemeente Culemborg'],
  ['nissewaard.png', 'Gemeente Nissewaard'],
  ['delfland.svg', 'Hoogheemraadschap van Delfland'],
  ['jeugdbescherming-rr.svg', 'Jeugdbescherming Rotterdam Rijnmond'],
]

const OTHERS: [file: string, name: string][] = [
  ['radboud.png', 'Radboud Universiteit'],
  ['vo-academie.jpeg', 'VO-academie'],
  ['ncoi.png', 'NCOI Opleidingen'],
  ['klm.jpeg', 'KLM'],
  ['bmc.png', 'BMC by Randstad'],
  ['van-berkel.svg', 'Van Berkel Professionals'],
  ['lybrae.png', 'Lybrae'],
  ['frank-jol.png', 'Frank Jol'],
]

async function logoRow(logos: [string, string][], seed: string) {
  return entry(
    'logoRow',
    {
      logos: await Promise.all(
        logos.map(async ([file, name]) =>
          entry('logo', {image: await image(`logos/${file}`), name, url: '#'}, file),
        ),
      ),
    },
    seed,
  )
}

async function watAnderenZeggen() {
  return pageDoc(
    'wat-anderen-zeggen',
    'Wat anderen zeggen',
    {
      description:
        'Hoe klanten &Jonk beschrijven: de persoon, de eerlijkheid en het aanvoelen dat ze noemen als reden om terug te bellen.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Wat anderen zeggen',
        title: 'Hoe klanten ons beschrijven.',
        lead: 'Opdrachtgevers die ons opnieuw bellen, noemen onafhankelijk van elkaar dezelfde drie dingen. Niet omdat we het ze influisteren — het zijn hun eigen woorden.',
      },
      {
        _type: 'kenmerken',
        items: KENMERKEN,
        image: await photo('jonk-6894', 'Deelnemers luisteren naar elkaar bij de flipover'),
        background: 'paper',
      },
      {_type: 'quote', testimonial: ref(EDO_RIDDER), background: 'dark'},
      {
        _type: 'testimonials',
        eyebrow: 'Meer stemmen',
        title: 'Uit gesprekken met opdrachtgevers',
        testimonials: TESTIMONIAL_PLACEHOLDERS.map(refItem),
        note: 'Deze drie kaarten wachten nog op citaten uit klantinterviews — de kaders staan al klaar om ze in te zetten.',
        background: 'default',
      },
      {
        _type: 'logos',
        eyebrow: 'Opdrachtgevers',
        title: 'Organisaties in het publieke domein',
        lead: "Gemeenten, waterschappen, zbo's, zorg en onderwijs, en bureaus die met hen meewerken.",
        rows: [await logoRow(PUBLIC_SECTOR, 'public-sector'), await logoRow(OTHERS, 'others')],
        background: 'paper',
      },
      kennismaken({title: 'Benieuwd wat we voor jou kunnen doen?'}),
    ],
  )
}

async function hoeWijKijken() {
  return pageDoc(
    'hoe-wij-kijken',
    'Hoe wij kijken',
    {
      description:
        'Ontwikkel je de mens & dan ontwikkel je de organisatie. De visie, vier waarden en drie lagen achter het werk van &Jonk.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Hoe wij kijken',
        title: 'Ontwikkel je de mens & dan ontwikkel je de organisatie.',
        lead: 'Een organisatie is voor ons een groep mensen die samen het werk doet. Vol tegenstellingen, gevormd door hun omgeving en door wat er tussen hen gebeurt. Ontwikkeling begint daarom bij de mensen die het werk doen. De organisatie ontwikkelt met hen mee.',
      },
      {
        _type: 'gallery',
        images: [await photoItem('jonk-6832', 'Een groep deelnemers in een kring in gesprek met Eric Jonk')],
      },
      {
        _type: 'textSplit',
        title: 'Het &-teken',
        lead: 'Ontwikkeling wordt vaak aangepakt alsof de organisatie een machine is: zet de onderdelen goed neer, druk op een knop en dan gaat het draaien. Bij een machine kun je ernaast gaan staan en een onderdeel vervangen. In een organisatie ben je zelf onderdeel. Het &-teken in onze naam bindt wat in de praktijk snel los wordt gekoppeld: mens & organisatie, leren & werk.',
        background: 'default',
      },
      {
        _type: 'quote',
        text: 'De wereld is te complex om helemaal te snappen. Accepteer de complexiteit, hou vertrouwen en surf mee.',
        background: 'dark',
      },
      {
        _type: 'textSplit',
        title: 'Wat wij zien',
        image: await photo('jonk-7317', 'Eric Jonk luistert naar een deelnemer tijdens een leersessie'),
        lead: 'Mensen dragen van nature een drang tot ontwikkeling in zich. Die ontwikkeling gebeurt in de interactie met anderen. In het werk van vandaag raken mensen die drang en elkaar kwijt: achter schermen, in de haast van de dag en in de zoektocht naar grip in kennis, protocollen en modellen. Je ziet het terug in werkdruk, in uitval en in gesprekken die vastlopen op standpunten.',
        paragraphs: [
          'Ontwikkelen in organisaties volgt hetzelfde patroon. Op een training gaat het over weten hoe je feedback geeft, terwijl er in die groep op dat moment feedback te ervaren is. Drie mensen schrijven “onze visie op leren” en op de werkvloer herkent niemand zich erin. Een leidinggevende praat over “mijn team” alsof zij er zelf buiten staat.',
        ],
        background: 'default',
      },
      {
        _type: 'values',
        variant: 'full',
        eyebrow: 'Vier waarden',
        title: 'Waar we op sturen, ook als het spannend is',
        items: [
          item(
            'Vertrouwen',
            'Vertrouwen in het goede is de basis van ieder leerproces. Iedereen heeft een eigen verhaal: gedrag dat lastig lijkt, heeft altijd een reden. We maken heldere afspraken over samenwerking en rollen, en bespreken die opnieuw wanneer dat nodig is. Eerlijkheid hoort daarbij: we zeggen wat we zien, ook als het spannend is. En we vertrouwen erop dat mensen en groepen het echt zelf kunnen: de groep bepaalt de richting, wij helpen bij het navigeren.',
          ),
          item(
            'Verbinding',
            '‘Ubuntu: ik ben, omdat wij zijn.’ Verbinding is voor ons het besef dat we van elkaar afhankelijk zijn: het gaat niet om jou of mij. Het is jou & mij: wij. Daarbij maakt iedereen deel uit van systemen als gezin, team en organisatie; een leertraject wordt duurzaam wanneer die context meedoet. Daarom betrekken we het systeem actief, bijvoorbeeld met driehoeksgesprekken en overleg met leidinggevenden.',
          ),
          item(
            'Beweging',
            'Onze achtergrond ligt in veranderkunde: hoe bewegen groepen en hoe beïnvloed je die beweging? We sluiten aan op de energie en het ritme van de groep, want dan ontstaat er iets wat precies past bij dat moment. We leren door te doen: eerst ervaren en reflecteren, daarna de theorie. En beweging is een constante: mensen en groepen veranderen voortdurend, onze werkwijze beweegt daarin mee.',
          ),
          item(
            'Gekkigheid',
            'Bewust spel en momenten zonder strak doel. Niet omdat het luchtig moet blijven, maar omdat juist in die ruimte, zonder prestatiedruk, de mooiste inzichten ontstaan.',
          ),
        ],
        images: [
          await photoItem('jonk-7214', 'Eric Jonk licht iets toe aan een staande groep deelnemers'),
          await photoItem('jonk-7038', 'Eric Jonk luistert aandachtig'),
        ],
        background: 'paper',
      },
      {
        _type: 'cardGrid',
        title: 'Drie lagen',
        lead: 'In de ontwikkeling van mensen werken we op drie lagen die elkaar versterken.',
        showBars: true,
        items: [
          entry('card', {
            title: 'Ik',
            text: 'Jezelf en je eigen patronen leren kennen, zonder een patroon meteen te lezen als een oordeel over wie je bent.',
            link: pageLink('Lees meer', LAYERS[0]),
          }),
          entry('card', {
            title: 'Jij & ik',
            text: 'Elkaar werkelijk als mens zien, spanning uithouden en het gesprek voeren dat je liever vermijdt.',
            link: pageLink('Lees meer', LAYERS[1]),
          }),
          entry('card', {
            title: 'Ik & wij',
            text: 'Verandering zien als de constante en je eigen handelingsruimte vinden in een groep die altijd in beweging is.',
            link: pageLink('Lees meer', LAYERS[2]),
          }),
        ],
        note: 'Wanneer mensen zich in deze drie lagen ontwikkelen, ontstaat in organisaties meer ruimte voor creativiteit, diversiteit en het pakken van verantwoordelijkheid. Die beweging in gang brengen geeft ons energie en daar ligt ons vakmanschap.',
        background: 'default',
      },
      {
        _type: 'mediaText',
        title: 'Wat wij willen',
        lead: 'Wij willen dat ontwikkelen in organisaties verschuift: van kennis zenden, competenties afvinken en gedrag toetsen, naar leren vanuit ervaring, dialoog en het werk zelf. Kennis, structuur en competenties houden daarin hun plek. Het is en-en. De balans ligt nu te veel aan de sturende kant.',
        paragraphs: [
          "Voor onze programma's betekent dit dat ieder programma op maat wordt ontworpen voor een specifieke groep. Een vast kader met heldere doelen geeft houvast. Binnen dat kader is ruimte voor wat er in het contact met de groep ontstaat: meer sturing bij een beginnende groep, meer loslaten bij een gevorderde.",
        ],
        images: [await photoItem('jonk-7398', 'Eric Jonk in gesprek met een deelnemer, in aandacht')],
        imageAspect: '4/5',
        link: pageLink('Wie we zijn & waar we vandaan komen', 'over-jonk'),
        background: 'default',
      },
      kennismaken({paper: true}),
    ],
  )
}

const BACK = pageLink('Hoe wij kijken', 'hoe-wij-kijken')

async function ik() {
  return pageDoc(
    LAYERS[0],
    'Ik',
    {
      description:
        'Een leidinggevende hoort dat een medewerker een fout heeft gemaakt en voelt de irritatie opkomen. Een adviseur zit in een overleg en merkt dat zijn…',
    },
    [
      {
        _type: 'articleHero',
        layer: 1,
        title: 'Ik',
        lead: 'Een leidinggevende hoort dat een medewerker een fout heeft gemaakt en voelt de irritatie opkomen. Een adviseur zit in een overleg en merkt dat zijn buik zich aanspant als een collega weer over hem heen praat. Een deelnemer weet het even niet en wilt meteen naar een oplossing. In alle drie de gevallen gebeurt er eerst iets binnenin, voordat iemand reageert. Deze laag gaat over dat moment.',
        image: await photo('jonk-7305', 'Eric Jonk luistert aandachtig in een groep'),
        backLink: BACK,
      },
      {
        _type: 'articleAside',
        title: 'Wat er binnenin gebeurt',
        paragraphs: [
          'Ontwikkeling begint bij wat zich binnen iemand afspeelt: overtuigingen, gedachten, gevoelens, lichaamssensaties en de neiging om iets te doen. Een gevoel kan ontstaan in contact met een ander. Wat zich daarna in jou voltrekt, is van jou. Je vat het nooit helemaal, en dat hoeft ook niet. Wij oefenen met opmerken en vertragen: wat gebeurt er nu?',
          'Wie dat moment leert opmerken, krijgt de ruimte om te kiezen. De leidinggevende die de irritatie voelt, kan dan eerst vragen hoe de fout is ontstaan. De adviseur kan benoemen wat het overleg met hem doet. De deelnemer die het even niet weet, kan zichzelf de tijd geven.',
        ],
        quote: 'Tussen prikkel en reactie zit een moment.',
      },
      {_type: 'articleFigure', diagram: 'tangle', caption: 'Opmerken en vertragen: wat gebeurt er nu?'},
      {
        _type: 'articleSplit',
        title: 'Patronen die logisch zijn',
        paragraphs: [
          'Ieder mens denkt, voelt en handelt vanuit patronen die logisch zijn gezien eerdere ervaringen. Die patronen vormen samen een verhaal dat betekenis geeft aan je verleden, houvast biedt in het heden en een voorspelling doet over de toekomst. Ze helpen je en ze belemmeren je. Werken met je patronen betekent dat je gaat zien welke je volgt en wat die je opleveren, zonder een patroon meteen te lezen als een oordeel over wie je bent.',
          'Dat geldt ook voor hoe je naar anderen kijkt. De vraag verschuift van "wat is er mis met die collega" naar "hoe is dit gedrag logisch geworden". Die vraag brengt mildheid en nieuwsgierigheid, en vanuit daar ontstaat ruimte om iets anders te kiezen.',
        ],
      },
      {
        _type: 'articleSplit',
        title: 'De lens',
        paragraphs: [
          'In ons werk gebruiken we een tekening van een oog met een filter. Normen, waarden, ervaringen en gewoontes vormen samen een lens waardoor je kijkt. Die lens geeft selectief aandacht en vervormt. Wat zie je, wat mis je, wat vul je in? Wanneer iemand zeker weet hoe iets zit, is dat voor ons een signaal om te vertragen.',
        ],
      },
      {_type: 'articleFigure', diagram: 'lens', caption: 'De lens: wat je ziet, gaat eerst door een filter'},
      {
        _type: 'articleAside',
        reverse: true,
        title: 'Hoe wij daarin werken',
        paragraphs: [
          'In onze trajecten geven we hier bewust tijd en taal voor: een vraag over het moment, ruimte voor stilte, een ervaring die eerst even mag sudderen voordat we hem duiden. Naar binnen kijken ontwikkel je door het veel te doen. We vergelijken het met een donkere kamer instappen: eerst zie je niets, dan schimmen, dan contouren en uiteindelijk herken je de bank. Oefenen kan met meditatie, schrijven, coaching, supervisie en in de groep.',
        ],
        image: await photo('jonk-6842', 'Een deelnemer vertelt, Eric Jonk luistert'),
      },
      {
        _type: 'articleOutcome',
        paragraphs: [
          'Mensen die opmerken wat er in hen gebeurt voordat ze reageren, oordelen minder snel en verkrampen minder onder druk. Ze kennen hun eigen patronen en kiezen vaker bewust. Dat ziet een organisatie terug in hoe een leidinggevende een lastig gesprek voert en in hoe een medewerker omgaat met een fout. En het is de basis voor de volgende laag: wie zichzelf kan waarnemen, kan de ander werkelijk zien.',
        ],
        link: pageLink('Lees verder: Jij & ik', LAYERS[1]),
      },
      layerNav(),
      kennismaken({paper: true}),
    ],
  )
}

async function jijEnIk() {
  return pageDoc(
    LAYERS[1],
    'Jij & ik',
    {
      description:
        'Een medewerker begint in het jaargesprek over haar ambities en merkt dat er niets mee gebeurt. Ze trekt haar conclusie en een half jaar later is ze…',
    },
    [
      {
        _type: 'articleHero',
        layer: 2,
        title: 'Jij & ik',
        lead: "Een medewerker begint in het jaargesprek over haar ambities en merkt dat er niets mee gebeurt. Ze trekt haar conclusie en een half jaar later is ze weg. Twee collega's vermijden al maanden het gesprek dat ze eigenlijk moeten voeren en werken om elkaar heen. Een team heeft goede afspraken op papier en toch loopt de samenwerking vast. In alle gevallen ontbreekt de ontmoeting. Deze laag gaat over wat er tussen jou en de ander gebeurt.",
        image: await photo('jonk-6894', 'Deelnemers in gesprek met elkaar tijdens een leersessie'),
        backLink: BACK,
      },
      {
        _type: 'articleSplit',
        title: 'Wat doe ik dat jij zo doet?',
        paragraphs: [
          'Samenwerken gebeurt tussen mensen. Wat doe ik dat jij zo doet? Wat doe jij dat ik zo doe? Interactie is complex: de context speelt mee, de geschiedenis van mensen en wat er op dat moment bij iemand speelt. We hebben elkaar nodig om het werk gedaan te krijgen. Zolang de ontmoeting ontbreekt, blijven relaties en samenwerking aan de oppervlakte en de beperkende factoren eronder, hoe goed de afspraken ook zijn.',
        ],
      },
      {
        _type: 'articleSplit',
        title: 'We beginnen met luisteren en vragen stellen',
        paragraphs: [
          'Voordat we ook maar één model inzetten, oefenen we twee vaardigheden: aandachtig luisteren en open vragen stellen. Dat doen we vanaf de eerste dag zelf voor, zodat deelnemers zien hoe je onderzoekend met elkaar in gesprek bent. Het wordt onderdeel van onze gezamenlijke afspraken, waar we het hele traject op teruggrijpen. Daar hoort bij dat je hardop toetst wat je over de ander denkt te weten.',
        ],
      },
      {
        _type: 'articleAside',
        title: 'We werken in het moment',
        paragraphs: [
          'Interactie onderzoeken we het liefst in het moment zelf. We letten op kleine signalen: toon, timing, spanning, iemand die zich terugtrekt of juist ruimte inneemt. Dan stellen we hardop de vraag: wat gebeurt hier nu? Welk handelen vraagt dit moment van je? En wat zou je een volgende keer anders willen doen?',
          'Wanneer een opleidingsdag een thema heeft, zien we dat thema vaak terug in de groep. Op een dag over spanning in samenwerking wordt die spanning in de groep zichtbaar. Daar werken we graag mee: zo wordt het thema voelbaar en openen we het gesprek over wat er in het contact gebeurt.',
        ],
        quote: 'Wat gebeurt hier nu?',
        image: await photo('jonk-7196', 'Eric Jonk in gesprek met een deelnemer'),
      },
      {
        _type: 'articleAside',
        reverse: true,
        title: 'Eenvoudige taal als gezamenlijke basis',
        paragraphs: [
          "In gesprekken gebruiken we eenvoudige modellen die direct toepasbaar zijn. De dramadriehoek bijvoorbeeld, die laat zien hoe mensen in een gesprek de rol van Redder, Aanklager of Slachtoffer innemen, en de winnaarsdriehoek als uitweg daaruit. Zo'n model geeft voldoende afstand om te onderzoeken wat jij doet, wat de ander doet en hoe dat samenkomt. Naarmate het gesprek verdiept, merken deelnemers hoe beperkt een model is vergeleken met echte interactie. Dan laten we het los en onderzoeken we de nuances van wat zich werkelijk afspeelt.",
        ],
        diagram: 'dramaTriangle',
        caption: 'De dramadriehoek',
      },
      {
        _type: 'articleSplit',
        title: 'Nieuwe ervaringen brengen ontwikkeling',
        paragraphs: [
          "Uit een patroon stappen vraagt om nieuwe ervaringen in het contact. Dat begint met opmerken wat er in jezelf gebeurt, daarna ruimte voelen om dat te erkennen, en vervolgens de stap durven zetten naar het gesprek. Zo'n gesprek is spannend, omdat je er iets van je eigen patroon in onder ogen ziet. Door het vaker te voeren, neemt de angst af en ontstaat ruimte om het anders te doen.",
          'Daarom betrekken we de omgeving van deelnemers actief bij een traject, bijvoorbeeld met driehoeksgesprekken tussen deelnemer, leidinggevende en ons. Het gesprek dat in de zaal is geoefend, wordt zo ook op het werk gevoerd.',
        ],
      },
      {
        _type: 'articleOutcome',
        paragraphs: [
          "Leidinggevenden die het gesprek over ambities werkelijk voeren, zodat een medewerker zich gezien weet en blijft. Collega's die elkaar aanspreken en spanning uithouden. Teams waarin de afspraken op papier ook in het contact kloppen.",
          'Bewustzijn van wat er in jou gebeurt maakt echt contact mogelijk en uit echt contact ontstaat ontwikkeling. Dat werkt door in de groep als geheel: de volgende laag.',
        ],
        link: pageLink('Lees verder: Ik & Wij', LAYERS[2]),
      },
      layerNav(),
      kennismaken({paper: true}),
    ],
  )
}

async function ikEnWij() {
  return pageDoc(
    LAYERS[2],
    'Ik & Wij',
    {
      description:
        'Een MT-lid vertelt over "mijn team" alsof zij er zelf buiten staat. Een team wacht tot de directie eindelijk een besluit neemt. Een afdeling heeft…',
    },
    [
      {
        _type: 'articleHero',
        layer: 3,
        title: 'Ik & Wij',
        lead: 'Een MT-lid vertelt over "mijn team" alsof zij er zelf buiten staat. Een team wacht tot de directie eindelijk een besluit neemt. Een afdeling heeft haar hoop gevestigd op de reorganisatie van volgend jaar. In alle drie de gevallen kijkt iemand naar de groep alsof hij er zelf geen deel van uitmaakt. Wie in een groep werkt, is er onderdeel van. Deze laag gaat over de vraag hoe je vanuit die plek je eigen handelingsruimte vindt.',
        image: await photo('jonk-6832', 'Een groep deelnemers in een kring met Eric Jonk'),
        backLink: BACK,
      },
      {
        _type: 'articleSplit',
        title: 'Wat een groep doet onder spanning',
        paragraphs: [
          'Een groep werkt aan een taak en daaronder gebeurt van alles. Zodra druk, onzekerheid of spanning toeneemt, gaat een groep als geheel reageren. De groep legt de verantwoordelijkheid bij één persoon, vaak de leidinggevende: "zeg jij maar hoe het moet." De groep zoekt de strijd met iets buiten zichzelf, zoals de directie of een andere afdeling, of trekt zich terug. Of de groep richt haar hoop op een oplossing die nog moet komen: het nieuwe systeem, de reorganisatie, de nieuwe collega. Samen denken en werken verschuift dan naar passiviteit, strijd of uitstel.',
          'Dit gedrag heet in organisaties al snel weerstand, gebrek aan motivatie of gedoe. Wij zien het als een reactie van de groep op spanning, en die reactie vertelt wat de groep op dat moment nodig heeft. Wie dat leert lezen, kan er iets mee.',
        ],
      },
      {
        _type: 'articleAside',
        title: 'De organisatie zit in de groep',
        paragraphs: [
          'Een groep is een klein stuk van de organisatie. Wat in de cultuur speelt, komt terug in de trainingsruimte. Zoals bij een broccoli: breek er een takje af en je ziet dezelfde vorm als bij de hele broccoli. In een organisatie waar de regels het overnemen van de bedoeling, wachten deelnemers tot iemand zegt wat mag. In een organisatie met een zware hiërarchie leunen deelnemers achterover en klinkt er cynisme.',
          'Daarom lezen we wat er in de groep gebeurt als informatie over de organisatie, en die informatie delen we ook met de opdrachtgever. Spannende dingen zijn bij ons gewoon te benoemen, richting het team en richting de directie. Kleine bewegingen in de groep werken ook door in het grotere geheel. Een leidinggevende die in de leergang leert de verantwoordelijkheid bij het team te laten, doet dat een week later ook in het werkoverleg.',
        ],
        image: await photo('jonk-7214', 'Eric Jonk licht iets toe aan de groep'),
      },
      {
        _type: 'articleAside',
        reverse: true,
        title: 'Hoe wij daarin werken',
        paragraphs: [
          'Een groep nodigt de begeleider uit om te redden, te sturen of het ongemak weg te nemen. Die uitnodiging merken we eerst in onszelf op en we vertragen. Wat probeert de groep te vermijden? Welke verantwoordelijkheid wordt bij ons neergelegd? En wat gebeurt er met het leren als wij die rol aannemen? Meestal benoemen we wat we zien en geven we de verantwoordelijkheid terug aan de groep. Daarom zitten we het liefst in de groep, als een ik in de wij: vanaf die plek is de dynamiek voelbaar en bespreekbaar.',
          'Deelnemers leren om zelf zo naar hun groep te kijken: meedoen en tegelijk waarnemen wat er gebeurt. Samen onderzoeken we welke patronen zich aandienen en wat ieder daaraan bijdraagt. Daarna maken we de vertaling naar het eigen werk. Waar zie je ditzelfde terug in je team? Welke rol neem je daar in? En welke ruimte heb je om het anders te doen? De groep wordt zo een oefenplek voor de organisatie. De dynamiek blijft leerstof voor de groep en wordt nooit een oordeel over één deelnemer.',
        ],
        diagram: 'ikInDeWij',
        caption: 'Een ik in de wij',
      },
      {
        _type: 'articleOutcome',
        paragraphs: [
          'Leidinggevenden en professionals die leren lezen wat er om hen heen gebeurt, hoe groepen werken, welke invloed de cultuur heeft en welke ongeschreven regels meespelen, hoeven minder te wachten op de directie, de reorganisatie of de nieuwe collega. Zij vinden hun eigen ruimte in een groep die altijd in beweging is en pakken verantwoordelijkheid waar dat kan.',
        ],
      },
      layerNav(),
      kennismaken({paper: true}),
    ],
  )
}

async function overJonk() {
  return pageDoc(
    'over-jonk',
    'Over &Jonk',
    {
      title: 'Over &Jonk',
      description:
        'Vakmensen die zichzelf meenemen. Het verhaal van oprichter Eric Jonk en het team achter &Jonk.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Over &Jonk',
        title: 'Vakmensen die zichzelf meenemen.',
        lead: 'Eerlijk en stevig genoeg om naast je te blijven staan als het ingewikkeld wordt. We combineren vakkennis met gevoel voor humor en intuïtie, iedere keer afgestemd op jou, de groep en de situatie.',
      },
      {
        _type: 'mediaText',
        eyebrow: 'Oprichter',
        title: 'Eric Jonk',
        lead: 'Eric is oprichter en eigenaar van &Jonk. Hij is geschoold in transactionele analyse en veranderkunde, werkt sinds 2014 in en rond de lokale overheid en begeleidt teams en professionals sinds 2016.',
        paragraphs: [
          'Wat hem drijft: zien wat er in een groep gebeurt, en tegelijk voelen wat er in de organisatie eromheen speelt. Die twee blikken samen — op de mens en op het systeem — vormen de kern van hoe &Jonk werkt.',
        ],
        images: [await photoItem('jonk-6842', 'Eric Jonk, oprichter van &Jonk')],
        imageAspect: '4/5',
        narrowImage: true,
        background: 'paper',
      },
      {
        _type: 'timeline',
        eyebrow: 'Waar het begon',
        title: 'Sinds 2018 aan traineeships, teams en leiderschap',
        items: [
          item('2014', 'Eric start met werken in en rond de lokale overheid.'),
          item('2016', 'De eerste teams en professionals worden begeleid.'),
          item('2018', '&Jonk begeleidt de eerste traineeships.'),
        ],
        plainLine: true,
        background: 'default',
      },
      {
        _type: 'gallery',
        eyebrow: 'De mensen van &Jonk',
        title: 'We kennen elkaar en elkaars werk',
        lead: 'Daardoor voelt een traject als één geheel, ook als er meerdere mensen op staan.',
        images: [
          await photoItem('jonk-vakmensen-2', 'Eric Jonk in gesprek met een deelnemer'),
          await photoItem('jonk-7317', 'Deelnemers in gesprek tijdens een sessie'),
          await photoItem('jonk-7467', 'Twee begeleiders van &Jonk tijdens een oefening'),
        ],
        background: 'paper',
      },
      {
        _type: 'linkBand',
        eyebrow: 'Hoe wij naar ontwikkeling kijken',
        title: 'Vertrouwen, verbinding, beweging & gekkigheid',
        lead: 'Vier waarden die bepalen hoe we werken, ook als het spannend wordt.',
        link: pageLink('Hoe wij kijken', 'hoe-wij-kijken'),
        background: 'default',
      },
      kennismaken({paper: true}),
    ],
  )
}

async function cases() {
  return pageDoc(
    'cases',
    'Cases',
    {
      description:
        'Wat er blijft staan als &Jonk weer weg is: cases uit traineeships, teamtrajecten en organisatieontwikkeling.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Cases',
        title: 'Wat er blijft staan als wij weg zijn.',
        lead: 'Bij meerdere organisaties draaien de jaartrajecten inmiddels voor de zevende keer of vaker. Een aantal daarvan is volledig overgedragen aan trainers uit de organisatie zelf.',
        stats: STATS,
      },
      {_type: 'cases', layout: 'featured', cases: [refItem(CASE_VLAARDINGEN)], background: 'paper'},
      {
        _type: 'cases',
        layout: 'grid',
        eyebrow: 'Meer cases',
        title: 'Uit de praktijk',
        cases: CASE_PLACEHOLDERS.map(refItem),
        note: 'Deze twee kaarten wachten nog op case-materiaal — de kaders staan al klaar om ze in te vullen.',
        background: 'default',
      },
      kennismaken({title: 'Benieuwd wat er bij jou kan blijven staan?', paper: true}),
    ],
  )
}

async function podcast() {
  return pageDoc(
    'podcast',
    'Podcast',
    {
      title: 'Podcast In Gesprek',
      description:
        'In Gesprek: elke twee weken één gesprek, één concreet dilemma uit het werk met mensen en organisaties.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Meeluisteren',
        title: 'De podcast *In Gesprek*.',
        lead: 'Elke twee weken: één gesprek, één concreet dilemma uit het werk met mensen en organisaties. Geen theorie om de theorie — steeds een echte situatie als vertrekpunt.',
        showPodcastLinks: true,
        image: await photo('jonk-7483', 'Eric Jonk achter de microfoon tijdens een opname van de podcast In Gesprek'),
        imageAspect: '21/9',
      },
      {
        _type: 'podcastEpisodes',
        eyebrow: 'Afleveringen',
        title: 'Luister de laatste gesprekken terug',
        limit: 4,
        note: 'Deze lijst wacht nog op de echte afleveringstitels en gasten — de layout staat al klaar.',
        background: 'paper',
      },
      {
        _type: 'mediaText',
        eyebrow: 'Waarom deze podcast',
        title: 'Eén gesprek, één dilemma',
        lead: 'Elke aflevering vertrekt vanuit een concrete situatie uit het werk met mensen en organisaties — geen abstracte theorie, maar een dilemma waar een luisteraar zelf ook in kan zitten.',
        paragraphs: [
          '*In Gesprek* staat op Spotify en Apple Podcasts. Nieuwe afleveringen verschijnen automatisch ook hier op de site.',
        ],
        images: [await photoItem('jonk-7196', 'Achter de schermen bij een opname van In Gesprek')],
        imageAspect: '3/2',
        background: 'default',
      },
      kennismaken({
        title: 'Zelf een dilemma om te bespreken?',
        text: 'Laat het weten — misschien wordt het de volgende aflevering.',
        mailOnly: true,
        paper: true,
      }),
    ],
  )
}

async function contact() {
  return pageDoc(
    'contact',
    'Contact',
    {
      description:
        'Neem contact op met &Jonk voor een kennismakingsgesprek: bel, mail of stuur een bericht.',
    },
    [
      {
        _type: 'pageHero',
        eyebrow: 'Contact',
        title: 'Zullen we kennismaken?',
        lead: KENNISMAKEN_TEXT_LONG,
      },
      {
        _type: 'contactForm',
        detailsEyebrow: 'Direct contact',
        formEyebrow: 'Stuur een bericht',
        form: ref(CONTACT_FORM_ID),
        background: 'paper',
      },
      {
        _type: 'linkBand',
        eyebrow: 'Op de hoogte blijven',
        title: 'Nieuwe podcastafleveringen in je inbox',
        text: 'Liever gewoon meeluisteren? De podcast *In Gesprek* staat op Spotify en Apple Podcasts.',
        link: pageLink('Naar de podcast', 'podcast'),
        background: 'default',
      },
    ],
  )
}

/** Every page by seed target name, in menu order. `npm run seed -- <name>` seeds one. */
export const PAGES = {
  home,
  'wat-we-doen': watWeDoen,
  'wat-anderen-zeggen': watAnderenZeggen,
  'hoe-wij-kijken': hoeWijKijken,
  ik,
  'jij-en-ik': jijEnIk,
  'ik-en-wij': ikEnWij,
  'over-jonk': overJonk,
  cases,
  podcast,
  contact,
}

export type PageName = keyof typeof PAGES

export function isPageName(name: string): name is PageName {
  return name in PAGES
}

/** All pages, or only the named ones. */
export async function seedPages(names = Object.keys(PAGES) as PageName[]) {
  console.log(`Pages — ${names.join(', ')}`)

  const docs = []
  for (const name of names) {
    docs.push(await PAGES[name]())
  }

  // A single page can link to pages or documents that are not seeded yet.
  await weakenMissingReferences(docs)

  // One transaction: pages seeded together link to each other, so they arrive together.
  const tx = client.transaction()
  for (const doc of docs) tx.createOrReplace(doc)
  await tx.commit()

  for (const doc of docs) console.log(`✓ page /${doc.slug.current === 'home' ? '' : doc.slug.current}`)
}
