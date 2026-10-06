/**
 * Seeds the Kennisbank from the client's files in `content/kennisbank/`:
 * every Word file in `Artikelen/` becomes an `article`, every PDF in
 * `Naslagwerk/` a `download`. Titles of articles come from the document's
 * Heading 1; slugs, excerpts and the PDF texts are set below.
 *
 * Word → Portable Text: Heading 1 is the title, a paragraph that is bold
 * throughout is a heading, a numbered/bulleted paragraph a list item, and bold
 * and italic runs keep their marks. That is all the client's documents use.
 *
 * Articles are written one by one, last first, so `_createdAt` follows the
 * order below — and "newest first" on the site is this order.
 *
 * Needs `unzip` on the PATH (macOS and most Linux have it).
 */
import {execFileSync} from 'node:child_process'
import {createReadStream, existsSync, readdirSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {client, key} from './shared'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.join(__dirname, '../../../content/kennisbank')

/** In site order, newest first. Keyed by the start of the file name. */
const ARTICLES: [file: string, slug: string, excerpt: string][] = [
  [
    'Leiderschap gebeurt in contact',
    'leiderschap-gebeurt-in-contact',
    'Hoe een bestuurslid met een lage stem en weinig twijfel liet zien dat leiderschap niet losstaat van wie je tegenover je hebt.',
  ],
  [
    'Contracteren',
    'contracteren',
    'Er is altijd een contract, ook als niemand het uitspreekt. Over impliciete verwachtingen in leer- en ontwikkeltrajecten, en waarom contracteren onderdeel is van het werk zelf.',
  ],
  [
    'Wat er gebeurt als het spannend wordt',
    'wat-er-gebeurt-als-het-spannend-wordt',
    'Op spannende momenten nemen oude patronen het vaak over. Leiderschap vraagt niet dat je ze afleert, wel dat je ze herkent terwijl ze gebeuren.',
  ],
  [
    'De appel van de groep',
    'de-appel-van-de-groep',
    'Wat vaak weerstand of gebrek aan eigenaarschap heet, is soms een reactie op wat de groep als geheel oproept. Over groepen als psychologisch systeem.',
  ],
  [
    'Overdracht en tegenoverdracht',
    'overdracht-en-tegenoverdracht',
    'Soms is je reactie groter dan het moment. Overdracht en tegenoverdracht als informatie over de relatie, niet als probleem.',
  ],
  [
    'Waar leiderschap begint',
    'waar-leiderschap-begint',
    'Wanneer voelde jij je voor het eerst leider, zonder dat je die titel had? Over de vroege momenten waarin je manier van leidinggeven ontstaat.',
  ],
  [
    'Wanneer details belangrijker worden dan de basis',
    'wanneer-details-belangrijker-worden-dan-de-basis',
    'Van Hyrox-training tot dashboards in organisaties: waarom eenvoud zo moeilijk te verdragen is zodra iets belangrijk wordt.',
  ],
  [
    'De perfecte theorie',
    'de-perfecte-theorie',
    'Iedereen wil meer theorie en handvatten, maar de theorie die de werkelijkheid perfect weergeeft bestaat niet. Wat betekent dat voor opleiden?',
  ],
  [
    'De dans van structuur en vrijheid',
    'de-dans-van-structuur-en-vrijheid',
    'Structuur en vrijheid werken elkaar niet tegen in trainingen persoonlijk leiderschap. Ze voeren een voortdurende dans uit.',
  ],
  [
    'Verandermanagement met een baby',
    'verandermanagement-met-een-baby',
    'Drie maanden vaderschap en wat dat leert over teams die eerst de basis op orde willen krijgen.',
  ],
]

/** In site order. Keyed by the start of the file name. */
const DOWNLOADS: [file: string, title: string, description: string][] = [
  ['Visual_ Contracteren', 'Model: Contracteren', 'Maak verwachtingen op drie niveaus expliciet, voor een heldere samenwerking. Eén pagina.'],
  ['Uitleg_ Persoonlijk leiderschap', 'Persoonlijk leiderschap: de vijf leerimago’s', 'Wat we in onze opleidingen verstaan onder persoonlijk leiderschap, en de vijf manieren waarop mensen leren.'],
  ['Uitleg_ Triggers en patronen', 'Triggers en patronen', 'Waarom sommige momenten een sterke reactie oproepen, en hoe je je eigen patronen leert herkennen.'],
  ['Uitleg_ Spel en Dramadriehoek', 'Psychologisch spel en de dramadriehoek', 'Herhalende patronen in gesprekken en relaties die steeds op dezelfde uitkomst uitlopen, en hoe je eruit stapt.'],
  ['Uitleg_ Miskenning', 'Miskenning', 'Hoe we aspecten van de werkelijkheid negeren of verdraaien, en hoe je dat herkent in het werk.'],
  ['Uitleg Script', 'Script: de blauwdruk van ons leven', 'Het begrip script uit de Transactionele Analyse: hoe vroege ervaringen bepalen hoe we kijken en kiezen.'],
  ['Werkvorm_ Intervisies op een rij', 'Werkvorm: intervisies op een rij', 'Dertien intervisiemethoden met stappen en tijden, van themagericht tot de roddelmethode.'],
]

type Span = {_type: 'span'; _key: string; text: string; marks: string[]}
type PtBlock = {_type: 'block'; _key: string; style: string; markDefs: []; children: Span[]; listItem?: 'bullet'; level?: number}

const decode = (text: string) =>
  text.replace(/&(amp|lt|gt|quot|apos);/g, (_, entity: string) => ({amp: '&', lt: '<', gt: '>', quot: '"', apos: "'"})[entity]!)

/** A Word run property is on when present without w:val, or with val 1/true. */
const isOn = (props: string, tag: string) => new RegExp(`<w:${tag}(?: w:val="(?:1|true)")?/>`).test(props)

function fileIn(dir: string, prefix: string) {
  const file = readdirSync(dir).find((name) => name.startsWith(prefix))
  if (!file) throw new Error(`No file starting with "${prefix}" in ${dir}`)
  return path.join(dir, file)
}

export function docxToArticle(file: string) {
  const xml = execFileSync('unzip', ['-p', file, 'word/document.xml'], {encoding: 'utf8', maxBuffer: 50e6})
  let title = ''
  const body: PtBlock[] = []

  for (const [n, p] of (xml.match(/<w:p[ >][\s\S]*?<\/w:p>/g) ?? []).entries()) {
    const runs = (p.match(/<w:r[ >][\s\S]*?<\/w:r>/g) ?? []).flatMap((run) => {
      const text = decode((run.match(/<w:t[^>]*>[^<]*<\/w:t>/g) ?? []).map((t) => t.replace(/<[^>]+>/g, '')).join(''))
      const props = run.match(/<w:rPr>[\s\S]*?<\/w:rPr>/)?.[0] ?? ''
      return text ? [{text, bold: isOn(props, 'b'), italic: isOn(props, 'i')}] : []
    })
    const text = runs.map((run) => run.text).join('').trim()
    if (!text) continue
    if (p.includes('w:val="Heading1"') && !title) {
      title = text
      continue
    }

    const list = p.includes('<w:numPr>')
    const heading = !list && text.length < 120 && runs.every((run) => run.bold || !run.text.trim())
    // "Bronnen:" closes the academic articles; a small heading reads better.
    const style = text === 'Bronnen:' ? 'h3' : heading ? 'h2' : 'normal'

    const children: Span[] = []
    for (const run of runs) {
      const marks = style === 'normal' ? [run.bold && 'strong', run.italic && 'em'].filter(Boolean) as string[] : []
      const last = children.at(-1)
      if (last && last.marks.join() === marks.join()) last.text += run.text
      else children.push({_type: 'span', _key: key(`${file}:${n}:${children.length}`), text: run.text, marks})
    }
    children[0].text = children[0].text.trimStart()
    children.at(-1)!.text = children.at(-1)!.text.trimEnd()
    if (style === 'h3') children[0].text = 'Bronnen'

    body.push({
      _type: 'block',
      _key: key(`${file}:${n}`),
      style,
      markDefs: [],
      children,
      ...(list ? {listItem: 'bullet' as const, level: 1} : {}),
    })
  }

  if (!title) throw new Error(`No Heading 1 (title) in ${file}`)
  return {title, body}
}

async function uploadPdf(file: string) {
  const filename = path.basename(file)
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.fileAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )
  if (existing) return existing
  const asset = await client.assets.upload('file', createReadStream(file), {filename, contentType: 'application/pdf'})
  return asset._id
}

export async function seedKennisbank() {
  console.log('Kennisbank')
  if (!existsSync(CONTENT_DIR)) throw new Error(`Missing ${CONTENT_DIR}`)

  // Last first: each later write gets a later _createdAt.
  for (const [file, slug, excerpt] of [...ARTICLES].reverse()) {
    const {title, body} = docxToArticle(fileIn(path.join(CONTENT_DIR, 'Artikelen'), file))
    await client.createOrReplace({
      _id: `article-${slug}`,
      _type: 'article',
      title,
      slug: {_type: 'slug', current: slug},
      excerpt,
      body,
    })
    console.log(`✓ article ${slug}`)
  }

  for (const [file, title, description] of [...DOWNLOADS].reverse()) {
    const asset = await uploadPdf(fileIn(path.join(CONTENT_DIR, 'Naslagwerk'), file))
    const id = `download-${key(file)}`
    await client.createOrReplace({
      _id: id,
      _type: 'download',
      title,
      description,
      file: {_type: 'file', asset: {_type: 'reference', _ref: asset}},
    })
    console.log(`✓ download ${title}`)
  }
}
