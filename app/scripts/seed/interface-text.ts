/**
 * The `interfaceText` singleton, filled from the defaults in
 * `src/lib/interface-text.ts` — the same texts the front end falls back to.
 */
import {INTERFACE_DEFAULTS} from '../../src/lib/interface-text'
import {client} from './shared'

export async function seedInterfaceText() {
  console.log('Interface text')

  await client.createOrReplace({
    _id: 'interfaceText',
    _type: 'interfaceText' as const,
    ...INTERFACE_DEFAULTS,
  })

  console.log('✓ interfaceText singleton upserted')
}
