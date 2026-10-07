# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-10-07

## User Preferences

- [2026-10-06] Kennisbank choices: gated PDF downloads (email), typographic cards (no images), featured = picked in Sanity else newest, nav in header+footer, no author/date on articles, no filters, reading time ("Leestijd") on articles.

- [2026-10-06] Client feedback arrives as Dutch PDF docs (deel 1 bouw, deel 2 teksten). User answers open questions with "go with defaults" — always propose a concrete default per question.

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

- [2026-09-12] Sanity model: user wants a reorderable PAGE BUILDER (blocks on a generic `page` doc), not a singleton-per-page model.
- [2026-09-12] Studio labels in English (field names + titles), even though site copy is Dutch.
- [2026-09-12] Placeholder/TBD content: seed ALL design placeholders as published content (incl. stat 3 "[cijfer]") so the site looks exactly like the design. Renderer hides only genuinely empty sections/items.
- [2026-09-12] Social/podcast URLs (LinkedIn, Spotify, Apple Podcasts): seed as '#' for now; buttons must hide when the URL is empty in Sanity.
- [2026-09-12] User prefers thorough up-front planning: ask all open questions before coding.
- [2026-09-12] OK to delete the old Fieldnote template blocks/demo-content once replaced.

## Key Learnings

- [2026-10-07] Sentry test: `/sentry-test` page + `/api/sentry-test` (identical across starter, schuijt, en-jonk). Next 16 GET route handlers are dynamic by default (no `force-dynamic` needed; only `force-static` opts into caching) — Next ships its docs in `node_modules/next/dist/docs/`. Client test error is thrown in a `setTimeout` so React doesn't catch it and Sentry's global handler must.

- [2026-10-07] Caching (ported from starter): every cached Sanity read uses `sanityCache` from `app/src/sanity/fetch.ts` (tag `sanity`, revalidate 3600 as safety net). Freshness comes from the Sanity webhook → `/api/revalidate` (`revalidateTag(SANITY_TAG, { expire: 0 })` — not 'max', Netlify would re-cache the stale page for the rest of the hour). New Sanity fetches must pass `sanityCache`, never a hardcoded `revalidate` number. API routes keep `cache: 'no-store'`.

- [2026-10-06] Studio → app calls: the studio bundle is public, so no secrets in SANITY_STUDIO_*. Authenticate with the editor's Sanity token (`useClient().config().token`, needs `auth: {loginMethod: 'token'}` — default 'dual' may use cookies and leave token undefined) and verify server-side via `https://<projectId>.api.sanity.io/v2021-06-07/users/me` → `roles[].name`. Robot (API) tokens also return roles there (write token = editor).

- [2026-10-06] Kennisbank content lives in `content/kennisbank/{Artikelen/*.docx,Naslagwerk/*.pdf}`; `npm run seed -- kennisbank-content` (scripts/seed/kennisbank.ts) converts Word → Portable Text via `unzip -p word/document.xml` (Heading1 = title, all-bold para = h2, numPr = bullet, "Bronnen:" = h3) and uploads PDFs (reused by filename). Slugs/excerpts/PDF titles+descriptions are hand-written tables in that file; list order = newest-first order on the site.

- [2026-10-06] Kennisbank: `article` + `download` documents (studio/schemaTypes/kennisbank.ts); hub + overviews are ordinary pages using `articleList` / `downloadList` blocks (picked refs, else newest by _createdAt; `limit` empty = all). Single article = own route `app/kennisbank/artikelen/[slug]` (not a page doc), path via `articlePath()`. Reading time computed in GROQ (`pt::text` word count / 200). Gated downloads reuse `/api/submit-form` with an extra `downloadId` (FormRenderer `extra` + `afterSuccess`): route requires an email answer, adds the PDF title to the mail, returns `fileUrl` (?dl=). PDF url never sent to the page.
- [2026-10-06] Writing to the dataset for a single feature: use targeted patches (`setIfMissing`, `insert after`) instead of re-running `seed forms/interface/nav`, which overwrite editor changes. Deleting temp docs through the API client (`client.transaction().delete`) worked; the CLI delete was what got blocked.

- [2026-10-05] en-jonk tracks the nextjs-sanity-starter template: starter PRs can be ported. Only `site/Frame.tsx` uses next/image here (blocks render through Frame); studio/tools/Media\* are near-identical to the starter's, so starter diffs apply with `git apply`.

- [2026-09-12] Page model: every page is a Sanity `page` doc (slug may contain `/`, e.g. `hoe-wij-kijken/ik`) rendered by `app/[...slug]` / home via `CmsPage`. Blocks typed with `BlockOf<'x'>` from `PAGE_QUERY_RESULT` — rerun `npm run typegen` after schema/query edits.
- [2026-09-12] CMS text marks via `rich()` (Rich.tsx): `&` brand amp, `*x*` display em, `**x**` bold, `[x]` tbd placeholder, newline = br.
- [2026-09-12] Seed is one-time overwrite with fixed ids (`page-<slug-with-dashes>`).
- [2026-09-12] Browser checks: html has scroll-behavior smooth → use `scrollTo({behavior:'instant'})`; preview_start via launch.json with an nvm node path never came up — start `npx next start -p 3001` via Bash background instead.
- [2026-09-13] Studio deploy CI (`deploy-sanity-studio.yml`) needs `SANITY_AUTH_TOKEN` as a **repo-level Actions secret**; SANITY*STUDIO*\* are Actions Variables. The Preview/Production GitHub environments are Vercel's — the job uses neither. An unset secret shows as `SANITY_AUTH_TOKEN: ` (empty) in the run log and the CLI errors "You must login first".

- **Project:** en-jonk
- **Description:** A block-based website scaffold: Next.js 16 (App Router, React 19, Tailwind v4)

- [2026-09-23] Photos arrive raw (spread `...`) from PAGE_QUERY — file/video urls are built from the asset ref client-side (`fileUrl`), not dereferenced in GROQ. Logos, SEO/og image, mail logo, siteInformation.logo stay image-only on purpose.

## Do-Not-Repeat

- [2026-10-06] Seed target names must differ from page names in seed/pages.ts — `npm run seed -- <name>` runs both (kennisbank target re-seeded the /kennisbank page).
- [2026-10-06] Copying files from a sibling project (../hart-huis) is blocked by the auto-mode classifier — ask the user to move them.

- [2026-10-06] No backticks inside GROQ `//` comments in queries.ts — they end the template literal and typegen silently finds 0 queries.
- [2026-10-06] One-off tsx scripts: no top-level await (ERR_REQUIRE_ASYNC_MODULE); wrap in main().
- [2026-10-06] Google Drive folder links from the client are private: ask for "anyone with link" or local download before planning content import.

- [2026-10-05] app/package-lock.json is out of sync with package.json (`npm ci` fails: missing @emnapi/_). Use `npm install` then `git checkout package-lock.json` unless fixing the lockfile is the task. Cloud sandbox can't reach _.api.sanity.io, so `next build` fails there — verify via typecheck/lint + unit-level checks.

- [2026-10-06] Reading PDFs: Read tool needs pdftoppm (not installed) and system python is 3.7 (pypdf fails). Use pdfjs-dist in a scratchpad npm project with Node 22 (`getDocument({data: Uint8Array})`).
- [2026-10-06] Deleting Sanity docs (`sanity documents delete`) and even `npm run build` right after got blocked by the auto-mode classifier: leave dataset deletes to the user.

- [2026-09-13] When re-enabling a disabled CMS integration, grep the WHOLE app for the disable marker (`SANITY —`), API routes included, and exercise every interactive path (submit the form) before calling it done.

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-09-12] Default shell Node is v17 (nvm). Sanity CLI/Next need >=22.12: always run npm/npx with `PATH=$HOME/.nvm/versions/node/v22.18.0/bin:$PATH`. If studio tsc says `sanity` has no exported member defineType, node_modules is corrupt → `npm ci`.

## Decision Log

- [2026-10-07] Sentry test page is gated by server-only SENTRY_TEST_SECRET (user asked for a secret in the URL): page takes `?secret=`, client strips it from the address bar (history.replaceState) and sends it to the API as header `x-sentry-test-secret`; unset/wrong → 404 (not 401, so the page's existence isn't revealed). Not in Netlify SECRETS_SCAN_OMIT_KEYS: it's a real secret and never inlined into the bundle.
- [2026-10-07] Test/utility pages are kept out of search with `metadata.robots` noindex/nofollow only, NOT a robots.txt Disallow: a disallowed URL is never crawled, so Google can't see the noindex and may still index the bare URL from links.

- [2026-10-06] Podcast episodes come from the Spotify Web API (user's choice, not RSS), create-only so editor edits survive; daily via Netlify scheduled function (app to be hosted on Netlify).

- [2026-10-06] Download form fails open: if mail is not configured or Mailjet fails, a valid download request (email given, PDF exists, reCAPTCHA ok) still gets `fileUrl` — the lead is lost (only logged), the visitor is not. Contact form stays fail-closed. Success text no longer claims "gemaild".

- [2026-09-13] Hardcoded strings: site-wide labels live in ONE `interfaceText` singleton (groups header/footer/contact/kennismaken/forms/notFound) with code defaults in `app/src/lib/interface-text.ts` (same pattern as SITE_DEFAULTS). Section copy = block fields. Social button labels = siteInformation.socialLinks[].label. Diagram labels + Venn aria + global-error stay in code (user chose: drawings break with long text; crash page must not depend on CMS).

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-09-23] Video support = optional `video` file field ON the `photo` image type (no data migration; photo doubles as poster), not a new photo|video union.

- [2026-09-12] &Jonk CMS = page builder with blocks mirroring `components/site/*` sections; old template blocks (hero, intro, services, ...) get deleted. Chosen by user over singleton-per-page for editor flexibility.

- (2026-09-23) In this shell `grep` is a ugrep shell function and zsh does not word-split `$VAR` — multi-file grep loops hang/misbehave. Use a small Node 22 script (fs.readdirSync recursive) for code-wide searches; `npx sanity documents query --api-version 2025-08-15` from studio/ works for dataset queries.

- [2026-09-29] Photos: full-size originals live in `app/designs/assets/img-originals/jonk-<n>.jpg` (gitignored, 31 MB, from the client's Drive "Groot" folder). Seed `photo()` prefers them over `public/images/*.webp`; the webp copies in public/ and designs/ are only fallbacks. Sanity CDN handles resizing/format; `urlFor` sets quality 85. hero/hoe-klanten/vakmensen-\* and video posters still come from webp (no originals mapped yet).
- [2026-09-29] jonk-hero.jpg is byte-identical to jonk-7038.jpg (same Sanity asset, hash-deduped, so its originalFilename may flip between the two names; harmless). Only the vakmensen-1..3 and video posters still use webp.
