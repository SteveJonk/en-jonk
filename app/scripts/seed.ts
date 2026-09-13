/**
 * Seed Sanity content. Runs everything, or only the targets and pages you name.
 *
 * Usage (from app/):
 *   npm run seed                      # everything
 *   npm run seed:pages                # every page
 *   npm run seed:page -- cases        # one page (any name from PAGES in seed/pages.ts)
 *   npm run seed -- documents home podcast
 *
 * ONE-TIME: every document has a fixed id and is overwritten on a re-run, so
 * edits made in the studio are lost. Seed at the start, then edit in the studio.
 *
 * A single page may link to pages or documents that are not in the dataset
 * yet; those links are written as weak references (see
 * `weakenMissingReferences`), and become strong on the next full seed.
 */
import {seedDocuments} from './seed/documents'
import {seedForms} from './seed/forms'
import {seedInterfaceText} from './seed/interface-text'
import {seedNavigation} from './seed/navigation'
import {isPageName, PAGES, seedPages, type PageName} from './seed/pages'
import {projectRef} from './seed/shared'
import {seedSiteInformation} from './seed/site-information'

/** In run order: blocks reference forms and documents, menus reference pages. */
const TARGETS = {
  site: seedSiteInformation,
  interface: seedInterfaceText,
  forms: seedForms,
  documents: seedDocuments,
  pages: () => seedPages(),
  nav: seedNavigation,
} as const

type TargetName = keyof typeof TARGETS

function isTarget(name: string): name is TargetName {
  return name in TARGETS
}

async function main() {
  const args = process.argv.slice(2)
  const unknown = args.filter((arg) => !isTarget(arg) && !isPageName(arg))
  if (unknown.length > 0) {
    throw new Error(
      `Unknown target(s): ${unknown.join(', ')}.\n` +
        `  Targets: ${Object.keys(TARGETS).join(', ')}\n` +
        `  Pages:   ${Object.keys(PAGES).join(', ')}`,
    )
  }

  const targets = args.length ? args.filter(isTarget) : (Object.keys(TARGETS) as TargetName[])
  // Named pages are covered already when `pages` itself is a target.
  const pages = targets.includes('pages') ? [] : (args.filter(isPageName) as PageName[])

  console.log(`Seeding Sanity project ${projectRef} — ${[...targets, ...pages].join(', ')}\n`)

  for (const name of Object.keys(TARGETS) as TargetName[]) {
    // Single pages go where `pages` would, so they land before the menus.
    if (name === 'pages' && pages.length) {
      await seedPages(pages)
      console.log('')
    }
    if (!targets.includes(name)) continue
    await TARGETS[name]()
    console.log('')
  }

  console.log('Done. Refresh the site to see the changes.')
}

main().catch((error) => {
  console.error('\nSeed failed:', error.message || error)
  process.exit(1)
})
