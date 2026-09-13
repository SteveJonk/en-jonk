/**
 * Testimonials, cases and podcast episodes — the documents blocks reference.
 *
 * Includes the design's placeholders ("[naam]", "[titel van de aflevering]"),
 * published as-is so the site matches the design and the client sees in the
 * studio exactly what still has to be filled in.
 */
import {client, photo, ref} from './shared'

export const EDO_RIDDER = 'testimonial-edo-ridder'
export const TESTIMONIAL_PLACEHOLDERS = [1, 2, 3].map((n) => `testimonial-placeholder-${n}`)
export const CASE_VLAARDINGEN = 'case-vlaardingen-haarlemmermeer'
export const CASE_PLACEHOLDERS = [1, 2].map((n) => `case-placeholder-${n}`)
const EPISODE_PLACEHOLDERS = [1, 2, 3, 4].map((n) => `podcast-episode-placeholder-${n}`)

export async function seedDocuments() {
  console.log('Documents')

  const tx = client.transaction()

  tx.createOrReplace({
    _id: EDO_RIDDER,
    _type: 'testimonial',
    quote:
      'Ik had een partner die zag wat er in de groep gebeurde én wat er in de organisatie omheen speelde. Als dat tweede het leren beïnvloedde, hoorde ik het en dachten we samen na. Het traineeship is daar ieder jaar beter van geworden.',
    name: 'Edo Ridder',
    role: 'destijds manager traineeships gemeente Vlaardingen,\nnu adviseur traineeships gemeente Haarlemmermeer',
  })

  for (const id of TESTIMONIAL_PLACEHOLDERS) {
    tx.createOrReplace({
      _id: id,
      _type: 'testimonial',
      quote: '[citaat op te halen uit klantinterview]',
      name: '[naam]',
      role: '[functie en organisatie]',
    })
  }

  tx.createOrReplace({
    _id: CASE_VLAARDINGEN,
    _type: 'case',
    client: 'Gemeente Vlaardingen & Haarlemmermeer',
    type: 'Traineeship',
    summary:
      'Een jaartraject voor traineeships, dat jaar na jaar meebeweegt met de organisatie eromheen — en verhuisde mee toen de opdrachtgever dat ook deed.',
    image: await photo('jonk-7305', 'Deelnemers van een traineeship tijdens een sessie'),
    testimonial: ref(EDO_RIDDER),
  })

  for (const id of CASE_PLACEHOLDERS) {
    tx.createOrReplace({
      _id: id,
      _type: 'case',
      client: '[naam opdrachtgever]',
      type: '[sector · type traject]',
      summary: '[korte omschrijving van de opgave en het traject, aan te leveren door de klant]',
    })
  }

  for (const id of EPISODE_PLACEHOLDERS) {
    tx.createOrReplace({
      _id: id,
      _type: 'podcastEpisode',
      number: '[#]',
      title: '[titel van de aflevering]',
      description: '[gast en korte omschrijving van het dilemma]',
      url: '#',
    })
  }

  await tx.commit()
  console.log('✓ testimonials, cases and podcast episodes upserted')
}
