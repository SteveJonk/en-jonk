/**
 * Seeds the navigation and footer singletons.
 *
 * Menu items point at pages by their fixed ids, so run this after the pages.
 */
import {client, entry, pageId, ref} from './shared'

const MENU: [label: string, slug: string][] = [
  ['Wat we doen', 'wat-we-doen'],
  ['Wat anderen zeggen', 'wat-anderen-zeggen'],
  ['Hoe wij kijken', 'hoe-wij-kijken'],
  ['Over &Jonk', 'over-jonk'],
  ['Cases', 'cases'],
  ['Podcast', 'podcast'],
  ['Contact', 'contact'],
]

function navLink(label: string, slug: string) {
  return entry('navLink', {label, linkType: 'internal', internalLink: ref(pageId(slug))}, `nav:${slug}`)
}

/** Placeholder until the documents exist. */
function placeholderLink(label: string) {
  return entry('navLink', {label, linkType: 'external', href: '#'}, `legal:${label}`)
}

export async function seedNavigation() {
  console.log('Navigation & footer')

  await client.createOrReplace({
    _id: 'navigation',
    _type: 'navigation' as const,
    links: MENU.map(([label, slug]) => navLink(label, slug)),
  })
  console.log('✓ navigation singleton upserted')

  await client.createOrReplace({
    _id: 'footer',
    _type: 'footer' as const,
    tagline: 'talent · leiderschap · teams',
    legalLinks: [placeholderLink('Privacyverklaring'), placeholderLink('Algemene voorwaarden')],
    copyright: '© 2026 &Jonk',
  })
  console.log('✓ footer singleton upserted')
}
