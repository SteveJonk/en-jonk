# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.
| 13:44 | wire-sanity: content map + schema proposal; user chose page builder, English labels, delete old blocks | .wolf/cerebrum.md | proposal v2 pending approval | ~40k |
| 13:48 | wire-sanity: schema v2 approved; placeholders seeded published, URLs '#' | .wolf/cerebrum.md | planning final questions | ~5k |
| 14:18 | wire-sanity phase 3: seed scripts rewritten + seeded 11 pages, docs, nav | app/scripts/seed/* | seeded OK after 1 ECONNRESET retry | ~60k |
| 14:23 | wire-sanity verified (build, validate, routes, visual) + README/STATUS updated | README.md, .wolf/* | done | ~30k |
| 15:28 | seed per page: PAGES map, page names as seed targets, weak refs for missing docs | app/scripts/seed.ts, seed/pages.ts, seed/shared.ts, seed/navigation.ts, README | verified tsc/lint/dry-run | ~10k |
| 13:29 | interface text: all hardcoded strings → Sanity (singleton + block fields), submit route restored + verified | studio/schemaTypes/*, app/src/**, app/scripts/seed/*, README | done, verified build/validate/POST | ~70k |
| 14:00 | diagnosed studio deploy CI failure: SANITY_AUTH_TOKEN secret missing (config, not code) | .github/workflows/deploy-sanity-studio.yml | user must add secret | ~5k |
