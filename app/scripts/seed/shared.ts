/**
 * Shared Sanity write helpers for the seed scripts in this folder.
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor or Admin) in app/.env
 * Create one at: https://www.sanity.io/manage -> your project -> API -> Tokens
 *
 * ONE-TIME SEED: documents get fixed ids and are written with
 * `createOrReplace`, so re-running overwrites whatever an editor changed in
 * the studio. Seed once at the start, then the studio is the source of truth.
 * Assets are reused by filename, so re-running never uploads a photo twice.
 */
import {createHash} from 'node:crypto'
import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient, type SanityClient} from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '../../public')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_WRITE_TOKEN
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN. Create a token with Editor rights at https://www.sanity.io/manage and add it to app/.env',
  )
}

export const projectRef = `${projectId}/${dataset}`

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-26',
  token,
  useCdn: false,
})

/** A stable `_key` from a seed string, so re-seeding does not churn keys. */
export function key(seed: string) {
  return createHash('sha1').update(seed).digest('hex').slice(0, 12)
}

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

const uploads = new Map<string, Promise<string>>()

/** Upload a file from `public/` once per run (and once per dataset), by filename. */
function assetId(publicPath: string): Promise<string> {
  const cached = uploads.get(publicPath)
  if (cached) return cached

  const promise = (async () => {
    const absolute = path.join(PUBLIC_DIR, publicPath)
    if (!existsSync(absolute)) throw new Error(`Image not found: ${absolute}`)

    const filename = path.basename(absolute)
    const existing = await client.fetch<string | null>(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
      {filename},
    )
    if (existing) {
      console.log(`  ↻ image ${filename}`)
      return existing
    }

    const asset = await client.assets.upload('image', createReadStream(absolute), {
      filename,
      contentType: CONTENT_TYPES[path.extname(filename).toLowerCase()] ?? 'image/jpeg',
    })
    console.log(`  ↑ image ${filename}`)
    return asset._id
  })()

  uploads.set(publicPath, promise)
  return promise
}

export function ref(id: string) {
  return {_type: 'reference' as const, _ref: id}
}

/** A reference inside an array: needs a `_key`. */
export function refItem(id: string) {
  return {...ref(id), _key: key(id)}
}

/** A `photo` field, from `public/images/<name>.webp`. */
export async function photo(name: string, alt: string) {
  return {_type: 'photo' as const, asset: ref(await assetId(`images/${name}.webp`)), alt}
}

/** A `photo` inside an array. */
export async function photoItem(name: string, alt: string) {
  return {...(await photo(name, alt)), _key: key(`${name}:${alt}`)}
}

/** A plain `image` field, from a path under `public/`. */
export async function image(publicPath: string) {
  return {_type: 'image' as const, asset: ref(await assetId(publicPath))}
}

/** Every page has a fixed id, so pages and menus can point at each other up front. */
export function pageId(slug: string) {
  return `page-${slug.replace(/\//g, '-')}`
}

/** A `cta` to another seeded page. */
export function pageLink(label: string, slug: string) {
  return {
    _type: 'cta' as const,
    label,
    linkType: 'internal' as const,
    internalLink: ref(pageId(slug)),
  }
}

/** A `cta` to a URL, anchor or placeholder `#`. */
export function urlLink(label: string, href: string) {
  return {_type: 'cta' as const, label, linkType: 'external' as const, href}
}

/** An `item` (title + text) inside an array. */
export function item(title: string, text?: string) {
  return {_type: 'item' as const, _key: key(`${title}:${text ?? ''}`), title, ...(text ? {text} : {})}
}

/** An entry in an array of objects: adds `_type` and a stable `_key`. */
export function entry<T extends Record<string, unknown>>(type: string, fields: T, seed?: string) {
  return {_type: type, _key: key(seed ?? `${type}:${JSON.stringify(fields)}`), ...fields}
}

/**
 * Mark every reference to a document that exists neither in the dataset nor in
 * `docs` as weak, so a partial seed (one page, on a fresh dataset) is not
 * rejected for linking to what is not there yet. A weak link to a missing
 * document renders as nothing; seed that document, then re-seed this one (or
 * run the full seed) and the link is strong again.
 */
export async function weakenMissingReferences(docs: {_id: string}[]) {
  const references: {_ref: string; _weak?: boolean}[] = []
  const walk = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(walk)
    if (!value || typeof value !== 'object') return
    const node = value as Record<string, unknown>
    if (node._type === 'reference' && typeof node._ref === 'string') {
      references.push(node as {_ref: string})
    }
    Object.values(node).forEach(walk)
  }
  docs.forEach(walk)

  const ids = [...new Set(references.map((reference) => reference._ref))]
  const existing = new Set([
    ...(await client.fetch<string[]>(`*[_id in $ids]._id`, {ids})),
    ...docs.map((doc) => doc._id),
  ])

  const missing = references.filter((reference) => !existing.has(reference._ref))
  for (const reference of missing) reference._weak = true

  if (missing.length) {
    const names = [...new Set(missing.map((reference) => reference._ref))]
    console.log(`  ~ not seeded yet, linked weakly: ${names.join(', ')}`)
  }
}

export type Block = {_type: string} & Record<string, unknown>

/**
 * A `page` document. Blocks get their `_key` from their position, so the same
 * seed always produces the same keys.
 */
export function pageDoc(
  slug: string,
  title: string,
  seo: {title?: string; description?: string},
  content: Block[],
) {
  return {
    _id: pageId(slug),
    _type: 'page' as const,
    title,
    slug: {_type: 'slug' as const, current: slug},
    seo: {_type: 'seo' as const, ...seo},
    content: content.map((block, i) => ({...block, _key: key(`${slug}:${i}:${block._type}`)})),
  }
}
