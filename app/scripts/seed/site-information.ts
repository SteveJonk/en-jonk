/**
 * The `siteInformation` singleton, filled from the defaults in
 * `src/lib/site.ts`.
 *
 * The social links are `#` placeholders until the real profiles exist: the
 * buttons show (as in the design), and `sameAs` in the structured data only
 * takes real http(s) links, so nothing fake reaches search engines. Clear a
 * URL in the studio and its button disappears.
 */
import {SITE_DEFAULTS} from '../../src/lib/site'
import {client, entry} from './shared'

export async function seedSiteInformation() {
  console.log('Site information')

  await client.createOrReplace({
    _id: 'siteInformation',
    _type: 'siteInformation' as const,
    name: SITE_DEFAULTS.name,
    description: SITE_DEFAULTS.description,
    language: SITE_DEFAULTS.language,
    phone: SITE_DEFAULTS.phone,
    email: SITE_DEFAULTS.email,
    addressCountry: SITE_DEFAULTS.addressCountry,
    socialLinks: ['linkedin', 'spotify', 'applePodcasts'].map((platform) =>
      entry('socialLink', {platform, url: '#'}, platform),
    ),
  })

  console.log('✓ siteInformation singleton upserted')
}
