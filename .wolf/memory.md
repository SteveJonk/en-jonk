# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.
> | 13:44 | wire-sanity: content map + schema proposal; user chose page builder, English labels, delete old blocks | .wolf/cerebrum.md | proposal v2 pending approval | ~40k |
> | 13:48 | wire-sanity: schema v2 approved; placeholders seeded published, URLs '#' | .wolf/cerebrum.md | planning final questions | ~5k |
> | 14:18 | wire-sanity phase 3: seed scripts rewritten + seeded 11 pages, docs, nav | app/scripts/seed/_ | seeded OK after 1 ECONNRESET retry | ~60k |
> | 14:23 | wire-sanity verified (build, validate, routes, visual) + README/STATUS updated | README.md, .wolf/_ | done | ~30k |
> | 15:28 | seed per page: PAGES map, page names as seed targets, weak refs for missing docs | app/scripts/seed.ts, seed/pages.ts, seed/shared.ts, seed/navigation.ts, README | verified tsc/lint/dry-run | ~10k |
> | 13:29 | interface text: all hardcoded strings → Sanity (singleton + block fields), submit route restored + verified | studio/schemaTypes/_, app/src/\*\*, app/scripts/seed/_, README | done, verified build/validate/POST | ~70k |
> | 14:00 | diagnosed studio deploy CI failure: SANITY_AUTH_TOKEN secret missing (config, not code) | .github/workflows/deploy-sanity-studio.yml | user must add secret | ~5k |
> | 10:49 | MP4 video support on photo type + Frame/Clip | studio/schemaTypes/objects/contentObjects.ts, app/src/components/site/{Frame,Clip}.tsx, app/src/sanity/image.ts | typecheck+lint+build ok | ~15k |
> | 11:25 | Cleanup audit: schema types/fields vs dataset + app, unused Next exports (report only) | studio/schemaTypes, app/src | all types/blocks/components used; dead: siteInformation.badges, form.steps?, toImage, FooterLinkGroup, MOBILE_NAV_BREAKPOINT, DiagramKey | ~25k |
> | 11:35 | Removed siteInformation.badges + dead exports (toImage, FooterLinkGroup, MOBILE_NAV_BREAKPOINT, DiagramKey) + 2 unused icon imports; typegen, typecheck, lint, check:jsonld green | studio+app | done | ~8k |
> | 19:35 | Ported starter PR #8: sanityLoader + ui/Image wrapper (Frame), Media panel "Delete unused images" | app/src/sanity/image-loader.ts, app/src/components/ui/Image.tsx, app/src/components/site/Frame.tsx, studio/tools/{MediaTool.tsx,mediaData.ts} | typecheck+lint ok; build blocked by sandbox egress | ~20k |

## Session: 2026-09-29 13:08

| Time  | Action                                                                                                                                                                               | File(s)                                                              | Outcome         | ~Tokens |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | --------------- | ------- |
| 13:18 | Replaced 11 compressed photos in Sanity with Drive originals (img-originals/, gitignored); seed photo() prefers originals, deleteReplacedAssets() cleans old webp; urlFor quality 85 | app/scripts/seed/shared.ts, seed.ts, src/sanity/image.ts, .gitignore | done, tsc clean | ~9000   |
| 13:30 | Replaced hero + hoe-klanten with Drive originals (Marketing/Aanvullende foto's); hoe-klanten is a NEW photo, alt updated; old webp assets deleted                                    | app/scripts/seed/pages.ts                                            | done            | ~4000   |

## Session: 2026-10-06 07:42

| Time       | Action                                                                                                                                             | File(s)                                                                                                        | Outcome                                                                         | ~Tokens |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| 2026-10-06 | Implemented feedback 11 sept (copy, timeline dots, textSplit/quote/values tweaks, removed wat-we-doen, podcast rename) and reseeded site/pages/nav | app/scripts/seed/\*, app/src/components/{blocks/sections,site/Timeline}.tsx, globals.css, studio sectionBlocks | typecheck+lint ok, dev visual ok; dataset delete + build blocked by permissions | ~60k    |

## Session: 2026-10-06 08:18

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 12:00 | Resolved merge-conflict markers in STATUS.md | .wolf/STATUS.md | ok | ~300 |
| 12:30 | Kennisbank: schemas, list blocks, article route, gated downloads, seed (pages/form/nav/texts) | studio/schemaTypes/kennisbank.ts, app/src/components/blocks/kennisbank.tsx, app/src/components/site/DownloadCard.tsx, app/src/app/kennisbank/artikelen/[slug]/page.tsx, submit-form route | typecheck+lint green, browser-verified with temp content (deleted) | ~60k |
| 13:00 | Kennisbank content import: 10 docx → articles, 7 PDFs → downloads (seed target kennisbank-content) | app/scripts/seed/kennisbank.ts, app/scripts/seed.ts | imported + browser-verified | ~40k |
| 13:30 | Download form fail-open when mail missing/fails; success text no longer claims mail | app/src/app/api/submit-form/route.ts, app/scripts/seed/forms.ts | tested via curl | ~5k |
| 13:45 | Article body column widened: centred max-w-3xl instead of max-w-prose at col 5-12 | app/src/app/kennisbank/artikelen/[slug]/page.tsx | 552→768px | ~2k |

## Session: 2026-10-06 09:12

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 15:00 | Podcast Spotify sync: API route, studio panel, Netlify scheduled fn, README, env examples, workflow var | app/src/app/api/podcast-sync/route.ts, studio/tools/PodcastSyncTool.tsx, app/netlify/functions/podcast-sync.mts, studio/{structure,sanity.config}.ts, README.md | typecheck+lint ok, auth verified by curl; Spotify not exercised | ~25k |

## Session: 2026-10-06 09:38

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-10-06 09:43

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 09:44 | Fix podcast-sync CORS: strip trailing slash from SANITY_STUDIO_SITE_URL | studio/tools/PodcastSyncTool.tsx | fixed | ~2k |
| 10:00 | Port starter revalidation: /api/revalidate webhook + sanityCache (tag `sanity`, 3600s) replacing revalidate: 30 everywhere | app/src/sanity/fetch.ts, app/src/app/api/revalidate/route.ts, 6 call sites, .env.example, README | typecheck/lint green, endpoint 401/200 verified on dev | ~25k |
