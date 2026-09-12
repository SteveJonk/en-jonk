/**
 * Seed Sanity content. Runs every target, or only the ones you name.
 *
 * Usage (from app/):
 *   npm run seed                 # everything
 *   npm run seed:pages           # only the pages
 *   npm run seed -- documents nav
 *
 * ONE-TIME: every document has a fixed id and is overwritten on a re-run, so
 * edits made in the studio are lost. Seed at the start, then edit in the studio.
 *
 * The page copy lives in scripts/seed/pages.ts, the testimonials, cases and
 * podcast episodes (including the design's placeholders) in documents.ts.
 */
import {seedDocuments} from './seed/documents'
import {seedForms} from './seed/forms'
import {seedNavigation} from './seed/navigation'
import {seedPages} from './seed/pages'
import {projectRef} from './seed/shared'
import {seedSiteInformation} from './seed/site-information'

const TARGETS = {
  site: seedSiteInformation,
  // Before the pages: blocks reference the form and these documents.
  forms: seedForms,
  documents: seedDocuments,
  pages: seedPages,
  // Last: menu items reference the pages.
  nav: seedNavigation,
} as const

type TargetName = keyof typeof TARGETS

function parseTargets(args: string[]): TargetName[] {
  if (args.length === 0) return Object.keys(TARGETS) as TargetName[]

  const unknown = args.filter((arg) => !(arg in TARGETS))
  if (unknown.length > 0) {
    throw new Error(
      `Unknown target(s): ${unknown.join(', ')}. Available: ${Object.keys(TARGETS).join(', ')}`,
    )
  }
  return args as TargetName[]
}

async function main() {
  const targets = parseTargets(process.argv.slice(2))
  console.log(`Seeding Sanity project ${projectRef} — ${targets.join(', ')}\n`)

  for (const target of targets) {
    await TARGETS[target]()
    console.log('')
  }

  console.log('Done. Refresh the site to see the changes.')
}

main().catch((error) => {
  console.error('\nSeed failed:', error.message || error)
  process.exit(1)
})
