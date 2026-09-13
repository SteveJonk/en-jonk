# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-09-12

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

- [2026-09-12] Sanity model: user wants a reorderable PAGE BUILDER (blocks on a generic `page` doc), not a singleton-per-page model.
- [2026-09-12] Studio labels in English (field names + titles), even though site copy is Dutch.
- [2026-09-12] Placeholder/TBD content: seed ALL design placeholders as published content (incl. stat 3 "[cijfer]") so the site looks exactly like the design. Renderer hides only genuinely empty sections/items.
- [2026-09-12] Social/podcast URLs (LinkedIn, Spotify, Apple Podcasts): seed as '#' for now; buttons must hide when the URL is empty in Sanity.
- [2026-09-12] User prefers thorough up-front planning: ask all open questions before coding.
- [2026-09-12] OK to delete the old Fieldnote template blocks/demo-content once replaced.

## Key Learnings

- [2026-09-12] Page model: every page is a Sanity `page` doc (slug may contain `/`, e.g. `hoe-wij-kijken/ik`) rendered by `app/[...slug]` / home via `CmsPage`. Blocks typed with `BlockOf<'x'>` from `PAGE_QUERY_RESULT` — rerun `npm run typegen` after schema/query edits.
- [2026-09-12] CMS text marks via `rich()` (Rich.tsx): `&` brand amp, `*x*` display em, `**x**` bold, `[x]` tbd placeholder, newline = br.
- [2026-09-12] Seed is one-time overwrite with fixed ids (`page-<slug-with-dashes>`).
- [2026-09-12] Browser checks: html has scroll-behavior smooth → use `scrollTo({behavior:'instant'})`; preview_start via launch.json with an nvm node path never came up — start `npx next start -p 3001` via Bash background instead.
- [2026-09-13] Studio deploy CI (`deploy-sanity-studio.yml`) needs `SANITY_AUTH_TOKEN` as a **repo-level Actions secret**; SANITY_STUDIO_* are Actions Variables. The Preview/Production GitHub environments are Vercel's — the job uses neither. An unset secret shows as `SANITY_AUTH_TOKEN: ` (empty) in the run log and the CLI errors "You must login first".

- **Project:** en-jonk
- **Description:** A block-based website scaffold: Next.js 16 (App Router, React 19, Tailwind v4)

## Do-Not-Repeat

- [2026-09-13] When re-enabling a disabled CMS integration, grep the WHOLE app for the disable marker (`SANITY —`), API routes included, and exercise every interactive path (submit the form) before calling it done.

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-09-12] Default shell Node is v17 (nvm). Sanity CLI/Next need >=22.12: always run npm/npx with `PATH=$HOME/.nvm/versions/node/v22.18.0/bin:$PATH`. If studio tsc says `sanity` has no exported member defineType, node_modules is corrupt → `npm ci`.

## Decision Log

- [2026-09-13] Hardcoded strings: site-wide labels live in ONE `interfaceText` singleton (groups header/footer/contact/kennismaken/forms/notFound) with code defaults in `app/src/lib/interface-text.ts` (same pattern as SITE_DEFAULTS). Section copy = block fields. Social button labels = siteInformation.socialLinks[].label. Diagram labels + Venn aria + global-error stay in code (user chose: drawings break with long text; crash page must not depend on CMS).

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-09-12] &Jonk CMS = page builder with blocks mirroring `components/site/*` sections; old template blocks (hero, intro, services, ...) get deleted. Chosen by user over singleton-per-page for editor flexibility.
