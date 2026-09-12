# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-09-12T12:23:57.134Z
> Files: 223 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~2732 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~7420 tok)

## .claude/

- `settings.json` (~514 tok)

## .claude/commands/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .claude/rules/

- `openwolf.md` (~328 tok)

## .cursor/rules/

- `openwolf.mdc` (~87 tok)

## .github/workflows/

- `build-app-image.yml` — CI: Build App Image (~887 tok)
- `deploy-sanity-studio.yml` — CI: Deploy Sanity Studio (~748 tok)

## .opencode/command/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .opencode/plugin/

- `openwolf.ts` — OpenWolf plugin entry — installed by `openwolf init --agent opencode`. (~74 tok)

## .opencode/plugin/openwolf/

- `anatomy.ts` — Exports parseAnatomy, serializeAnatomy, extractDescription, STORE_FILE + 12 more (~2922 tok)
  - fn `parseAnatomy` L5-28 (~207 tok)
  - fn `serializeAnatomy` L29-53 (~240 tok)
  - fn `extractDescription` L54-106 (~577 tok)
  - fn `sha256` L107-110 (~33 tok)
  - section `StoreFileEntry` L111-121 (~83 tok)
  - section `AnatomyStoreData` L122-127 (~63 tok)
  - fn `newStore` L128-132 (~64 tok)
  - fn `loadStore` L133-142 (~92 tok)
  - fn `saveStore` L143-157 (~162 tok)
  - fn `renderStore` L158-188 (~380 tok)
  - fn `renderToFile` L189-202 (~146 tok)
  - fn `importFromMarkdown` L203-227 (~305 tok)
  - fn `loadStoreReconciled` L228-240 (~137 tok)
  - fn `lockSleep` L241-244 (~31 tok)
  - fn `withAnatomyLock` L245-276 (~373 tok)
- `fs.ts` — Exports getWolfDir, wolfDirExists, readJSON, writeJSON + 6 more (~538 tok)
  - fn `getWolfDir` L5-8 (~28 tok)
  - fn `wolfDirExists` L9-12 (~31 tok)
  - fn `readJSON` L13-20 (~50 tok)
  - fn `writeJSON` L21-33 (~144 tok)
  - fn `readMarkdown` L34-41 (~41 tok)
  - fn `appendMarkdown` L42-47 (~64 tok)
  - fn `timeShort` L48-52 (~46 tok)
  - fn `timestamp` L53-56 (~22 tok)
  - fn `normalizePath` L57-60 (~24 tok)
  - fn `estimateTokens` L61-64 (~60 tok)
- `index.ts` — Exports OpenWolf (~1081 tok)
- `post-read.ts` — Exports handlePostRead (~629 tok)
  - fn `handlePostRead` L7-57 (~553 tok)
- `post-write.ts` — Exports handlePostWrite, summarizeEdit, autoDetectBugFix, detectFixPattern (~3226 tok)
  - fn `handlePostWrite` L8-39 (~302 tok)
  - fn `updateAnatomy` L40-86 (~473 tok)
  - fn `appendToMemory` L87-114 (~302 tok)
  - fn `trackSession` L115-150 (~338 tok)
  - fn `summarizeEdit` L151-184 (~471 tok)
  - fn `autoDetectBugFix` L185-228 (~523 tok)
  - fn `detectFixPattern` L229-265 (~610 tok)
  - fn `extractChangedLines` L266-270 (~88 tok)
- `pre-read.ts` — Exports handlePreRead (~685 tok)
  - fn `handlePreRead` L7-63 (~613 tok)
- `pre-write.ts` — Exports handlePreWrite (~1167 tok)
  - fn `tokenize` L14-21 (~63 tok)
  - fn `handlePreWrite` L22-35 (~132 tok)
  - fn `checkCerebrum` L36-65 (~369 tok)
  - section `BugEntry` L66-74 (~37 tok)
  - fn `checkBugLog` L75-105 (~399 tok)
- `session.ts` — Exports getSessionState, setSessionState, deleteSession, handleSessionStart (~952 tok)
  - fn `getSessionState` L8-11 (~33 tok)
  - fn `setSessionState` L12-15 (~33 tok)
  - fn `deleteSession` L16-19 (~26 tok)
  - fn `handleSessionStart` L20-89 (~783 tok)
- `stop.ts` — Exports handleStop (~1444 tok)
  - fn `handleStop` L6-35 (~262 tok)
  - fn `checkForMissingBugLogs` L36-50 (~165 tok)
  - fn `buildLedgerEntry` L51-114 (~743 tok)
  - fn `appendSessionSummary` L115-126 (~218 tok)
- `types.ts` — Exports FileRead, FileWrite, SessionState, PartialSessionState + 2 more (~217 tok)

## app/

- `.DS_Store` (~2186 tok)
- `.gitignore` — Git ignore rules (~147 tok)
- `Dockerfile` — Docker container definition (~294 tok)
- `eslint.config.mjs` — ESLint flat configuration (~124 tok)
- `next-env.d.ts` — / <reference types="next" /> (~71 tok)
- `next.config.ts` — Next.js configuration (~537 tok)
- `package-lock.json` — npm lock file (~208491 tok)
- `package.json` — Node.js package manifest (~379 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `sentry.edge.config.ts` — Sentry for the edge runtime (middleware, edge routes). Imported by (~74 tok)
- `sentry.options.ts` — One source of Sentry settings for the client, the server and the edge (~281 tok)
- `sentry.server.config.ts` — Sentry for the Node.js server runtime. Imported by `src/instrumentation.ts`, (~69 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~81439 tok)

## app/designs/

- `cases.html` — &Jonk — Cases (~6162 tok)
- `contact.html` — &Jonk — Contact (~5963 tok)
- `hoe-wij-kijken.html` — &Jonk — Hoe wij kijken (~9016 tok)
- `index.html` — &Jonk — talent, leiderschap, teams (~11123 tok)
- `onepager-ignore.html` — &Jonk — talent, leiderschap, teams (~9875 tok)
- `over-jonk.html` — Over &Jonk (~6676 tok)
- `podcast.html` — &Jonk — Podcast In Gesprek (~6512 tok)
- `wat-anderen-zeggen.html` — &Jonk — Wat anderen zeggen (~8018 tok)
- `wat-we-doen.html` — &Jonk — Wat we doen (~7628 tok)

## app/designs/assets/img/

- `jonk-6832-800.webp` (~9173 tok)
- `jonk-6832.webp` (~22360 tok)
- `jonk-6842-800.webp` (~4408 tok)
- `jonk-6842.webp` (~10220 tok)
- `jonk-6894-800.webp` (~8399 tok)
- `jonk-6894.webp` (~20054 tok)
- `jonk-7038-800.webp` (~3839 tok)
- `jonk-7038.webp` (~9579 tok)
- `jonk-7196-800.webp` (~11098 tok)
- `jonk-7196.webp` (~25542 tok)
- `jonk-7214-800.webp` (~7758 tok)
- `jonk-7214.webp` (~18725 tok)
- `jonk-7305-800.webp` (~6603 tok)
- `jonk-7305.webp` (~15942 tok)
- `jonk-7317-800.webp` (~4596 tok)
- `jonk-7317.webp` (~10560 tok)
- `jonk-7398-800.webp` (~10047 tok)
- `jonk-7398.webp` (~23694 tok)
- `jonk-7467-800.webp` (~4830 tok)
- `jonk-7467.webp` (~14134 tok)
- `jonk-7483-800.webp` (~4764 tok)
- `jonk-7483.webp` (~13464 tok)
- `jonk-clip-1-poster.webp` (~4695 tok)
- `jonk-clip-2-poster.webp` (~8213 tok)
- `jonk-clip-3-poster.webp` (~9422 tok)
- `jonk-hero-800.webp` (~4367 tok)
- `jonk-hero.webp` (~11050 tok)
- `jonk-hoe-klanten-800.webp` (~10315 tok)
- `jonk-hoe-klanten.webp` (~25954 tok)
- `jonk-vakmensen-1-800.webp` (~9608 tok)
- `jonk-vakmensen-1.webp` (~23443 tok)
- `jonk-vakmensen-2-800.webp` (~8715 tok)
- `jonk-vakmensen-2.webp` (~21269 tok)
- `jonk-vakmensen-3-800.webp` (~7962 tok)
- `jonk-vakmensen-3.webp` (~18836 tok)

## app/designs/assets/logos/

- `leiden.webp` (~415 tok)

## app/designs/hoe-wij-kijken/

- `ik-en-wij.html` — &amp;Jonk — Ik &amp; Wij (~7530 tok)
- `ik.html` — &amp;Jonk — Ik (~11267 tok)
- `jij-en-ik.html` — &amp;Jonk — Jij &amp; ik (~7710 tok)

## app/public/images/

- `jonk-6832-800.webp` (~9173 tok)
- `jonk-6832.webp` (~22360 tok)
- `jonk-6842-800.webp` (~4408 tok)
- `jonk-6842.webp` (~10220 tok)
- `jonk-6894-800.webp` (~8399 tok)
- `jonk-6894.webp` (~20054 tok)
- `jonk-7038-800.webp` (~3839 tok)
- `jonk-7038.webp` (~9579 tok)
- `jonk-7196-800.webp` (~11098 tok)
- `jonk-7196.webp` (~25542 tok)
- `jonk-7214-800.webp` (~7758 tok)
- `jonk-7214.webp` (~18725 tok)
- `jonk-7305-800.webp` (~6603 tok)
- `jonk-7305.webp` (~15942 tok)
- `jonk-7317-800.webp` (~4596 tok)
- `jonk-7317.webp` (~10560 tok)
- `jonk-7398-800.webp` (~10047 tok)
- `jonk-7398.webp` (~23694 tok)
- `jonk-7467-800.webp` (~4830 tok)
- `jonk-7467.webp` (~14134 tok)
- `jonk-7483-800.webp` (~4764 tok)
- `jonk-7483.webp` (~13464 tok)
- `jonk-clip-1-poster.webp` (~4695 tok)
- `jonk-clip-2-poster.webp` (~8213 tok)
- `jonk-clip-3-poster.webp` (~9422 tok)
- `jonk-hero-800.webp` (~4367 tok)
- `jonk-hero.webp` (~11050 tok)
- `jonk-hoe-klanten-800.webp` (~10315 tok)
- `jonk-hoe-klanten.webp` (~25954 tok)
- `jonk-vakmensen-1-800.webp` (~9608 tok)
- `jonk-vakmensen-1.webp` (~23443 tok)
- `jonk-vakmensen-2-800.webp` (~8715 tok)
- `jonk-vakmensen-2.webp` (~21269 tok)
- `jonk-vakmensen-3-800.webp` (~7962 tok)
- `jonk-vakmensen-3.webp` (~18836 tok)

## app/public/logos/

- `leiden.webp` (~415 tok)

## app/scripts/

- `check-form.ts` — The smallest thing that fails when the CMS-driven form breaks. (~2173 tok)
  - fn `names` L31-111 (~746 tok)
  - fn `runFormQuery` L112-121 (~110 tok)
  - fn `checkAllowList` L122-209 (~972 tok)
- `check-jsonld.ts` — The smallest thing that fails when the structured data quietly changes. (~2498 tok)
  - fn `node` L35-216 (~2159 tok)
- `seed.ts` — Seed Sanity content. Runs every target, or only the ones you name. (~548 tok)
  - fn `parseTargets` L34-45 (~106 tok)
  - fn `main` L46-62 (~119 tok)

## app/scripts/seed/

- `contact-form-fields.ts` — The fields of the seeded contact form, as in the design: naam and (~293 tok)
- `documents.ts` — Testimonials, cases and podcast episodes — the documents blocks reference. (~750 tok)
  - fn `seedDocuments` L16-75 (~546 tok)
- `forms.ts` — Seeds the shared form settings and the contact form. (~513 tok)
  - fn `upsertFormSettings` L17-32 (~146 tok)
  - fn `upsertContactForm` L33-54 (~168 tok)
  - fn `seedForms` L55-60 (~34 tok)
- `navigation.ts` — Seeds the navigation and footer singletons. (~398 tok)
- `pages.ts` — Every page of the site, as page-builder blocks, with the copy and photos of (~12758 tok)
  - fn `kennismaken` L65-69 (~64 tok)
  - fn `layerNav` L70-75 (~69 tok)
  - fn `home` L76-212 (~2161 tok)
  - fn `watWeDoen` L213-303 (~1129 tok)
  - fn `logoRow` L304-317 (~88 tok)
  - fn `watAnderenZeggen` L318-360 (~468 tok)
  - fn `hoeWijKijken` L361-473 (~1979 tok)
  - fn `ik` L474-538 (~1279 tok)
  - fn `jijEnIk` L539-611 (~1456 tok)
  - fn `ikEnWij` L612-668 (~1348 tok)
  - fn `overJonk` L669-734 (~776 tok)
  - fn `cases` L735-765 (~311 tok)
  - fn `podcast` L766-814 (~542 tok)
  - fn `contact` L815-848 (~259 tok)
  - fn `seedPages` L849-864 (~152 tok)
- `shared.ts` — Shared Sanity write helpers for the seed scripts in this folder. (~1531 tok)
  - fn `key` L45-59 (~120 tok)
  - fn `assetId` L60-89 (~261 tok)
  - fn `ref` L90-94 (~40 tok)
  - fn `refItem` L95-99 (~39 tok)
  - fn `photo` L100-104 (~53 tok)
  - fn `photoItem` L105-109 (~55 tok)
  - fn `image` L110-114 (~61 tok)
  - fn `pageId` L115-119 (~36 tok)
  - fn `pageLink` L120-129 (~68 tok)
  - fn `urlLink` L130-134 (~53 tok)
  - fn `item` L135-139 (~67 tok)
  - fn `entry` L140-149 (~109 tok)
  - fn `pageDoc` L150-165 (~114 tok)
- `site-information.ts` — The `siteInformation` singleton, filled from the defaults in (~308 tok)

## app/src/

- `instrumentation-client.ts` — Sentry in the browser. (~279 tok)
- `instrumentation.ts` — Server-side instrumentation hook. Without `NEXT_PUBLIC_SENTRY_DSN` both (~207 tok)

## app/src/app/

- `global-error.tsx` — Last-resort error boundary: it replaces the root layout, so it renders its (~239 tok)
- `globals.css` — Styles: 14 rules, 17 vars, 1 media queries, 1 animations, 1 layers (~1174 tok)
- `layout.tsx` — Resolved `{ label, href }` pairs; links that resolve to nothing are dropped. (~1088 tok)
  - fn `generateMetadata` L51-63 (~129 tok)
  - fn `toLinks` L64-71 (~76 tok)
  - fn `RootLayout` L72-114 (~412 tok)
- `manifest.json` (~46 tok)
- `not-found.tsx` — NotFound (~202 tok)
- `page.tsx` — generateMetadata (~73 tok)
- `robots.ts` — Served at `/robots.txt`. (~150 tok)
- `sitemap.ts` — Served at `/sitemap.xml`; `robots.ts` points at it. Every published page. (~200 tok)

## app/src/app/[...slug]/

- `page.tsx` — Every CMS page except the home page renders through this one route. A slug (~312 tok)

## app/src/app/api/submit-form/

- `route.ts` — Bigger uploads are rejected rather than silently dropped from the mail. (~2912 tok)
  - fn `POST` L6-270 (~2838 tok)

## app/src/components/

- `CmsPage.tsx` — One request per render, shared by the metadata and the page. (~516 tok)
  - fn `cmsMetadata` L18-27 (~127 tok)
  - fn `CmsPage` L28-50 (~180 tok)
- `JsonLd.tsx` — Put one graph into the page. (~98 tok)
- `PageBuilder.tsx` — Map one Sanity block onto its component. (~1257 tok)
  - fn `renderBlock` L49-101 (~569 tok)
  - fn `PageBuilder` L102-143 (~298 tok)
- `TrackingScripts.tsx` — Google Tag Manager and the Meta (Facebook) pixel, both opt-in. (~866 tok)
  - fn `TrackingScriptsHead` L21-62 (~399 tok)
  - fn `TrackingScriptsBody` L63-92 (~222 tok)

## app/src/components/blocks/

- `article.tsx` — The blocks that share one article column (see `PageBuilder`). (~894 tok)
  - fn `isArticleBlock` L23-26 (~33 tok)
  - fn `ArticleHeroBlock` L27-39 (~103 tok)
  - fn `ArticleSection` L40-93 (~439 tok)
  - fn `LayerNavBlock` L94-102 (~111 tok)
- `collections.tsx` — Social/podcast buttons in design order; a platform without a URL is left out. (~3091 tok)
  - fn `Note` L14-18 (~65 tok)
  - fn `platforms` L19-22 (~52 tok)
  - fn `TestimonialsBlock` L23-47 (~271 tok)
  - fn `CasesBlock` L48-98 (~554 tok)
  - fn `LogosBlock` L99-121 (~280 tok)
  - fn `PodcastTeaserBlock` L122-167 (~497 tok)
  - fn `PodcastEpisodesBlock` L168-204 (~448 tok)
  - fn `ContactFormBlock` L205-273 (~724 tok)
- `sections.tsx` — BARS (~5166 tok)
  - fn `timelineItems` L19-22 (~56 tok)
  - fn `PageHeroBlock` L23-72 (~441 tok)
  - fn `CardGridBlock` L73-127 (~575 tok)
  - fn `KenmerkenBlock` L128-157 (~328 tok)
  - fn `ThreeLevelsBlock` L158-187 (~296 tok)
  - fn `TimelineBlock` L188-205 (~152 tok)
  - fn `StatsBlock` L206-228 (~251 tok)
  - fn `ValuesBlock` L229-311 (~883 tok)
  - fn `MediaTextBlock` L312-363 (~552 tok)
  - fn `TextSplitBlock` L364-390 (~263 tok)
  - fn `QuoteBlock` L391-406 (~141 tok)
  - fn `GalleryBlock` L407-436 (~275 tok)
  - fn `StepsBlock` L437-465 (~340 tok)
  - fn `LinkBandBlock` L466-487 (~261 tok)
  - fn `KennismakenBlock` L488-498 (~77 tok)
- `shared.tsx` — One page-builder block as `PAGE_QUERY` returns it. (~584 tok)
  - fn `toLink` L18-22 (~51 tok)
  - fn `paras` L23-27 (~55 tok)
  - fn `Arrow` L28-38 (~100 tok)
  - fn `TestimonialQuote` L39-63 (~187 tok)

## app/src/components/form/

- `fields.tsx` — `stacked` is the roomy page form, `compact` fits a narrow card or sidebar. (~1678 tok)
  - fn `selectCaret` L37-47 (~128 tok)
  - fn `linkify` L48-69 (~150 tok)
  - fn `FormField` L70-176 (~960 tok)
- `FormRenderer.tsx` — Public half of the reCAPTCHA settings — the secret stays server-side. (~3242 tok)
  - fn `IconArrowRight` L59-66 (~66 tok)
  - fn `SuccessPanel` L67-110 (~447 tok)
  - fn `FormRenderer` L111-329 (~2163 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — The main navigation, repeated. (~897 tok)
  - fn `SiteFooter` L25-94 (~696 tok)
- `SiteHeader.tsx` — Main navigation, from the `navigation` document. `&` renders as the brand ampersand. (~1604 tok)
  - fn `Logo` L16-27 (~114 tok)
  - fn `SiteHeader` L28-148 (~1295 tok)

## app/src/components/site/

- `Amp.tsx` — "Over &Jonk" -> Over <Amp />Jonk (~91 tok)
- `Article.tsx` — Colour per layer (1–3), in reading order: ik, jij & ik, ik & wij. (~1967 tok)
  - fn `layerColor` L17-20 (~35 tok)
  - fn `ArticleHero` L21-65 (~358 tok)
  - fn `ArticleBody` L66-74 (~67 tok)
  - fn `ArticleSplit` L75-92 (~172 tok)
  - fn `ArticleAside` L93-121 (~220 tok)
  - fn `AsideQuote` L122-129 (~63 tok)
  - fn `AsideImage` L130-137 (~62 tok)
  - fn `Caption` L138-146 (~73 tok)
  - fn `AsideFigure` L147-156 (~92 tok)
  - fn `ArticleFigure` L157-167 (~100 tok)
  - fn `ArticleOutcome` L168-181 (~128 tok)
  - fn `LayerNav` L182-228 (~430 tok)
- `Diagrams.tsx` — The diagrams editors can place on a page. They are drawn in code, not (~3433 tok)
  - fn `Labels` L17-36 (~162 tok)
  - fn `Lobes` L37-64 (~209 tok)
  - fn `Tangle` L65-90 (~176 tok)
  - fn `Dot` L91-100 (~105 tok)
  - fn `Arrow` L101-132 (~298 tok)
  - fn `Filter` L133-169 (~322 tok)
  - fn `TangleDiagram` L170-197 (~365 tok)
  - fn `LensDiagram` L198-237 (~555 tok)
  - fn `DramaTriangle` L238-263 (~248 tok)
  - fn `IkInDeWij` L264-291 (~308 tok)
  - fn `ValuesIllustration` L292-345 (~537 tok)
- `Frame.tsx` — Aspect ratio and layout, e.g. `aspect-[4/5]`. (~314 tok)
- `Kenmerken.tsx` — The three things clients name, in their own words. (~182 tok)
- `Kennismaken.tsx` — What the band says when the block leaves its title or text empty. (~571 tok)
  - fn `Kennismaken` L23-54 (~320 tok)
- `Links.tsx` — Add horizontal padding at the call site: `px-10`, or `gap-2 px-7`. (~561 tok)
  - fn `ArrowLink` L22-46 (~200 tok)
  - fn `ContactLines` L47-74 (~152 tok)
- `Marquee.tsx` — Endless logo strip. The track holds the set twice and slides -50% for a (~607 tok)
  - fn `Marquee` L11-51 (~493 tok)
- `PageHero.tsx` — Rendered under the lead (buttons, contact lines). (~320 tok)
- `Reveal.tsx` — Transition delay in ms. (~267 tok)
- `Rich.tsx` — Editor text to JSX, so CMS copy can carry the few marks the design uses: (~409 tok)
- `Section.tsx` — The `background` choice on a block, as section classes. (~454 tok)
- `Stats.tsx` — Stats (~281 tok)
- `ThreeLevels.tsx` — Individueel, team, organisatie — in that order. (~1183 tok)
  - fn `ThreeLevels` L26-126 (~918 tok)
- `Timeline.tsx` — Dots on a line (horizontal from lg, vertical rule below that). (~506 tok)
  - fn `Timeline` L13-53 (~375 tok)

## app/src/hooks/

- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~236 tok)

## app/src/lib/

- `chrome.ts` — Scroll threshold (px) before the topbar gets the stuck state. (~62 tok)
- `cn.ts` — Exports cn (~37 tok)
- `env.ts` — Sanity connection details and analytics ids, read from the environment. (~380 tok)
- `form-fields.ts` — Shape and layout rules for CMS-authored forms. No React in here, so the (~1668 tok)
  - fn `toRedirect` L78-92 (~159 tok)
  - fn `toSteps` L93-104 (~123 tok)
  - fn `fillTokens` L105-116 (~126 tok)
  - fn `toFieldRows` L117-135 (~182 tok)
  - fn `toFormDefinition` L136-179 (~446 tok)
- `form-mail.ts` — The mails `POST /api/submit-form` sends. (~1688 tok)
  - fn `escapeHtml` L16-27 (~92 tok)
  - fn `color` L28-32 (~62 tok)
  - fn `tint` L33-50 (~156 tok)
  - fn `renderText` L51-82 (~230 tok)
  - fn `renderFormMail` L83-169 (~990 tok)
- `json-ld.ts` — Structured data (schema.org JSON-LD), built from what is in the CMS. (~2578 tok)
  - fn `absoluteUrl` L32-42 (~123 tok)
  - fn `prune` L43-67 (~295 tok)
  - fn `serializeJsonLd` L68-72 (~54 tok)
  - fn `jsonLdGraph` L73-96 (~278 tok)
  - fn `postalAddress` L97-123 (~287 tok)
  - fn `organizationJsonLd` L124-138 (~129 tok)
  - fn `websiteJsonLd` L139-150 (~82 tok)
  - fn `siteJsonLd` L151-161 (~126 tok)
  - fn `breadcrumbJsonLd` L162-180 (~154 tok)
  - fn `faqQuestions` L181-209 (~262 tok)
  - fn `webPageJsonLd` L210-236 (~341 tok)
  - fn `pageJsonLd` L237-243 (~59 tok)
- `links.ts` — The slug of the page that renders at `/`. (~446 tok)
- `site.ts` — Site-wide details, and the defaults they fall back to. (~1347 tok)
  - fn `text` L77-80 (~33 tok)
  - fn `list` L81-95 (~154 tok)
  - fn `resolveSiteInformation` L96-118 (~271 tok)
  - fn `telHref` L119-122 (~29 tok)
  - fn `mailtoHref` L123-133 (~63 tok)

## app/src/sanity/

- `client.ts` — Fetch that degrades instead of throwing. (~301 tok)
- `image.ts` — A `photo` from the studio: an image with its alt text and crop focus. (~362 tok)
- `metadata.ts` — The OG image for a page's `seo` object, sized for social cards. (~711 tok)
  - fn `seoImageUrl` L18-44 (~276 tok)
  - fn `pageMetadata` L45-75 (~308 tok)
- `queries.ts` — Resolve internal page references on link/cta objects. (~1364 tok)
- `sanity.types.ts` — --------------------------------------------------------------------------------- (~12349 tok)
- `schema.json` (~33135 tok)
- `site-information.ts` — The site's details, with defaults filled in where the CMS is empty. (~308 tok)

## studio/

- `.gitignore` — Git ignore rules (~143 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package-lock.json` — npm lock file (~171738 tok)
- `package.json` — Node.js package manifest (~301 tok)
- `README.md` — Project documentation (~427 tok)
- `sanity.cli.ts` — Typegen runs from the studio — the CLI needs a studio project root — but (~270 tok)
- `sanity.config.ts` — Project id and dataset come from the environment so the studio and the app (~267 tok)
- `structure.ts` — Documents that exist exactly once. They get a fixed `_id` and a top-level (~768 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)
- `tsconfig.tsbuildinfo` (~36971 tok)

## studio/schemaTypes/

- `documents.ts` — A client quote. Referenced from blocks, so one quote is edited in one place. (~719 tok)
- `footerType.ts` — The footer's own copy. Its menu repeats the Navigation links. (~246 tok)
- `formGeneralSettingsType.ts` — Mail and spam settings shared by every `form`. A singleton. (~1444 tok)
- `formType.ts` — Multi-step forms keep their fields under `steps`, simple ones under `fields`. (~2578 tok)
  - fn `isSteps` L5-274 (~2520 tok)
- `index.ts` — Every schema type the studio knows about. (~693 tok)
- `navigationType.ts` — A label + internal page or URL. Shared by the navigation and the footer. (~380 tok)
- `pageBuilderType.ts` — The block list editors can insert on a page. (~444 tok)
- `pageType.ts` — Exports pageType (~213 tok)
- `siteInformationType.ts` — Who the site belongs to: the details that appear in the header, the footer (~1180 tok)

## studio/schemaTypes/blocks/

- `articleBlocks.ts` — The "Hoe wij kijken" layer pages. Consecutive article blocks are rendered (~1107 tok)
- `collectionBlocks.ts` — Exports testimonialsType, casesType, logosType, podcastTeaserType, podcastEpisodesType (~1199 tok)
- `contactFormType.ts` — Direct contact details (from Site information) beside a form from Forms. (~294 tok)
- `pageHeroType.ts` — Page opener: heading left, lead right, optional photo or stats underneath. (~446 tok)
- `sectionBlocks.ts` — The three things clients name, beside a photo, optionally with a quote. (~2719 tok)

## studio/schemaTypes/objects/

- `contentObjects.ts` — A photo with its alt text; hotspot so editors choose the crop focus. (~399 tok)
- `ctaType.ts` — Exports ctaType (~94 tok)
- `fields.ts` — Field building blocks the page-builder blocks share. (~733 tok)
  - fn `titleField` L14-35 (~182 tok)
  - fn `itemsField` L36-39 (~45 tok)
  - fn `testimonialField` L40-43 (~38 tok)
  - fn `backgroundField` L44-61 (~144 tok)
  - fn `urlRule` L62-70 (~95 tok)
  - fn `preview` L71-77 (~69 tok)
- `formFieldType.ts` — Hide a setting unless the field's input type is one of these. (~1306 tok)
- `linkFields.ts` — Shared internal/external link fields for `link` and `cta` objects. (~407 tok)
- `linkType.ts` — Exports linkType (~54 tok)
- `seoType.ts` — Exports seoType (~231 tok)

## studio/tools/

- `mediaData.ts` — Queries, types and formatting helpers for the Media panel (`MediaTool.tsx`). (~2025 tok)
  - fn `typeLabel` L115-118 (~25 tok)
  - fn `isImage` L119-123 (~71 tok)
  - fn `uploadKind` L124-127 (~38 tok)
  - fn `formatBytes` L128-136 (~103 tok)
  - fn `formatDate` L137-143 (~74 tok)
  - fn `formatDimensions` L144-149 (~70 tok)
  - fn `displayName` L150-161 (~95 tok)
  - fn `matchesSearch` L162-187 (~213 tok)
  - fn `matchesFilter` L188-203 (~136 tok)
  - fn `dedupeUsage` L204-219 (~165 tok)
  - fn `thumbnailUrl` L220-223 (~36 tok)
- `mediaStyles.ts` — The Media panel's own styles, on top of `panelStyles.ts`. Same approach — (~1416 tok)
- `MediaTool.tsx` — The media library in the studio: every upload in one place, searchable, with (~4572 tok)
  - fn `MediaLibrary` L63-313 (~2237 tok)
  - fn `MediaCard` L314-349 (~284 tok)
  - fn `MediaDetail` L350-521 (~1435 tok)
- `panelStyles.ts` — Shared inline styles for custom studio panels — the parts that any panel (~335 tok)
