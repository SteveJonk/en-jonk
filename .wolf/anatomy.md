# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-10-06T06:55:18.520Z
> Files: 241 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~3278 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~8029 tok)

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

- `.DS_Store` (~3824 tok)
- `.gitignore` — Git ignore rules (~179 tok)
- `Dockerfile` — Docker container definition (~294 tok)
- `eslint.config.mjs` — ESLint flat configuration (~152 tok)
- `next-env.d.ts` — / <reference types="next" /> (~72 tok)
- `next.config.ts` — Next.js configuration (~537 tok)
- `package-lock.json` — npm lock file (~208491 tok)
- `package.json` — Node.js package manifest (~415 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `sentry.edge.config.ts` — Sentry for the edge runtime (middleware, edge routes). Imported by (~74 tok)
- `sentry.options.ts` — One source of Sentry settings for the client, the server and the edge (~281 tok)
- `sentry.server.config.ts` — Sentry for the Node.js server runtime. Imported by `src/instrumentation.ts`, (~69 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~84165 tok)

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
- `check-jsonld.ts` — The smallest thing that fails when the structured data quietly changes. (~2512 tok)
  - fn `node` L35-216 (~2173 tok)
- `seed.ts` — Seed Sanity content. Runs everything, or only the targets and pages you name. (~835 tok)
  - fn `isTarget` L40-43 (~24 tok)
  - fn `main` L44-81 (~356 tok)

## app/scripts/seed/

- `contact-form-fields.ts` — The fields of the seeded contact form, as in the design: naam and (~293 tok)
- `documents.ts` — Testimonials, cases and podcast episodes — the documents blocks reference. (~750 tok)
  - fn `seedDocuments` L16-75 (~546 tok)
- `forms.ts` — Seeds the shared form settings and the contact form. (~894 tok)
  - fn `upsertFormSettings` L18-34 (~170 tok)
  - fn `upsertContactForm` L35-57 (~194 tok)
  - fn `upsertDownloadForm` L58-83 (~310 tok)
  - fn `seedForms` L84-90 (~42 tok)
- `interface-text.ts` — The `interfaceText` singleton, filled from the defaults in (~144 tok)
- `kennisbank.ts` — Seeds the Kennisbank from the client's files in `content/kennisbank/`: (~2552 tok)
  - fn `decode` L93-96 (~70 tok)
  - fn `isOn` L97-98 (~31 tok)
  - fn `fileIn` L99-104 (~65 tok)
  - fn `docxToArticle` L105-152 (~564 tok)
  - fn `uploadPdf` L153-163 (~116 tok)
  - fn `seedKennisbank` L164-195 (~288 tok)
- `navigation.ts` — Seeds the navigation and footer singletons. (~446 tok)
- `pages.ts` — Every page of the site, as page-builder blocks, with the copy and photos of (~12769 tok)
  - fn `kennismaken` L72-76 (~64 tok)
  - fn `layerNav` L77-88 (~90 tok)
  - fn `home` L89-248 (~2424 tok)
  - fn `logoRow` L249-262 (~88 tok)
  - fn `watAnderenZeggen` L263-305 (~446 tok)
  - fn `hoeWijKijken` L306-418 (~1956 tok)
  - fn `ik` L419-485 (~1302 tok)
  - fn `jijEnIk` L486-560 (~1479 tok)
  - fn `ikEnWij` L561-619 (~1372 tok)
  - fn `overJonk` L620-673 (~727 tok)
  - fn `cases` L674-704 (~316 tok)
  - fn `podcast` L705-754 (~557 tok)
  - fn `contact` L755-795 (~356 tok)
  - fn `articleList` L796-799 (~39 tok)
  - fn `downloadList` L800-803 (~48 tok)
  - fn `kennisbank` L804-834 (~264 tok)
  - fn `artikelen` L835-847 (~84 tok)
  - fn `naslagwerk` L848-879 (~193 tok)
  - fn `isPageName` L880-884 (~37 tok)
  - fn `seedPages` L885-903 (~179 tok)
- `shared.ts` — Shared Sanity write helpers for the seed scripts in this folder. (~2317 tok)
  - fn `key` L47-61 (~126 tok)
  - fn `assetId` L62-91 (~255 tok)
  - fn `ref` L92-96 (~40 tok)
  - fn `refItem` L97-101 (~56 tok)
  - fn `photo` L102-111 (~128 tok)
  - fn `deleteReplacedAssets` L112-134 (~230 tok)
  - fn `photoItem` L135-139 (~55 tok)
  - fn `image` L140-144 (~61 tok)
  - fn `pageId` L145-149 (~36 tok)
  - fn `pageLink` L150-159 (~68 tok)
  - fn `urlLink` L160-164 (~53 tok)
  - fn `item` L165-169 (~67 tok)
  - fn `entry` L170-180 (~160 tok)
  - fn `weakenMissingReferences` L181-214 (~353 tok)
  - fn `pageDoc` L215-230 (~114 tok)
- `site-information.ts` — The `siteInformation` singleton, filled from the defaults in (~365 tok)

## app/src/

- `.DS_Store` (~2186 tok)
- `instrumentation-client.ts` — Sentry in the browser. (~279 tok)
- `instrumentation.ts` — Server-side instrumentation hook. Without `NEXT_PUBLIC_SENTRY_DSN` both (~207 tok)

## app/src/app/

- `.DS_Store` (~1640 tok)
- `global-error.tsx` — Last-resort error boundary: it replaces the root layout, so it renders its (~239 tok)
- `globals.css` — Styles: 15 rules, 17 vars, 1 media queries, 1 animations, 1 layers (~1239 tok)
- `layout.tsx` — Resolved `{ label, href }` pairs; links that resolve to nothing are dropped. (~1177 tok)
  - fn `generateMetadata` L55-67 (~129 tok)
  - fn `toLinks` L68-75 (~76 tok)
  - fn `RootLayout` L76-127 (~483 tok)
- `manifest.json` (~124 tok)
- `not-found.tsx` — NotFound (~238 tok)
- `page.tsx` — generateMetadata (~73 tok)
- `robots.ts` — Served at `/robots.txt`. (~150 tok)
- `sitemap.ts` — Served at `/sitemap.xml`; `robots.ts` points at it. Every published page and article. (~290 tok)

## app/src/app/[...slug]/

- `page.tsx` — Every CMS page except the home page renders through this one route. A slug (~312 tok)

## app/src/app/api/podcast-sync/

- `route.ts` — POST imports Spotify show episodes as podcastEpisode docs (create-only, ?dryRun=1); Bearer PODCAST_SYNC_SECRET or Sanity member token. (~1500 tok)

## app/src/app/api/revalidate/

- `route.ts` — Sanity webhook target (POST, signed with SANITY_REVALIDATE_SECRET): expires the `sanity` cache tag immediately. (~350 tok)

## app/netlify/functions/

- `podcast-sync.mts` — Netlify scheduled function (@daily) POSTing /api/podcast-sync with the secret. (~150 tok)

## app/src/app/api/submit-form/

- `route.ts` — Bigger uploads are rejected rather than silently dropped from the mail. (~2876 tok)
  - fn `verifyRecaptcha` L16-31 (~180 tok)
  - fn `fail` L32-36 (~57 tok)
  - fn `splitEmails` L37-49 (~109 tok)
  - fn `sendViaMailjet` L50-95 (~396 tok)
  - fn `POST` L96-272 (~1940 tok)

## app/src/app/kennisbank/artikelen/[slug]/

- `page.tsx` — The body as the layer articles set it: one reading column, display headings. (~1483 tok)
  - fn `generateStaticParams` L25-28 (~27 tok)
  - fn `generateMetadata` L29-63 (~398 tok)
  - fn `ArticlePage` L64-141 (~730 tok)

## app/src/components/

- `CmsPage.tsx` — One request per render, shared by the metadata and the page. (~554 tok)
  - fn `cmsMetadata` L19-32 (~148 tok)
  - fn `CmsPage` L33-55 (~180 tok)
- `JsonLd.tsx` — Put one graph into the page. (~98 tok)
- `PageBuilder.tsx` — Map one Sanity block onto its component. (~1329 tok)
  - fn `renderBlock` L50-106 (~617 tok)
  - fn `PageBuilder` L107-148 (~298 tok)
- `TrackingScripts.tsx` — Google Tag Manager and the Meta (Facebook) pixel, both opt-in. (~866 tok)
  - fn `TrackingScriptsHead` L21-62 (~399 tok)
  - fn `TrackingScriptsBody` L63-92 (~222 tok)

## app/src/components/blocks/

- `article.tsx` — The blocks that share one article column (see `PageBuilder`). (~938 tok)
  - fn `isArticleBlock` L23-26 (~33 tok)
  - fn `ArticleHeroBlock` L27-40 (~113 tok)
  - fn `ArticleSection` L41-94 (~447 tok)
  - fn `LayerNavBlock` L95-111 (~138 tok)
- `collections.tsx` — Which profiles a spot shows is the design's; label and URL are the CMS's. No URL, no button. (~3127 tok)
  - fn `Note` L15-19 (~70 tok)
  - fn `platforms` L20-23 (~53 tok)
  - fn `TestimonialsBlock` L24-48 (~271 tok)
  - fn `CasesBlock` L49-99 (~567 tok)
  - fn `LogosBlock` L100-122 (~280 tok)
  - fn `PodcastTeaserBlock` L123-165 (~484 tok)
  - fn `PodcastEpisodesBlock` L166-202 (~450 tok)
  - fn `ContactFormBlock` L203-269 (~732 tok)
- `kennisbank.tsx` — Hairline-ruled cards. Each card draws its own border (overlapping by a pixel) (~1468 tok)
  - fn `readingTime` L31-35 (~59 tok)
  - fn `fileMeta` L36-43 (~108 tok)
  - fn `ArticleCards` L44-69 (~356 tok)
  - fn `ListSection` L70-93 (~170 tok)
  - fn `ArticleListBlock` L94-107 (~123 tok)
  - fn `DownloadListBlock` L108-142 (~333 tok)
- `sections.tsx` — BARS (~5455 tok)
  - fn `timelineItems` L20-23 (~56 tok)
  - fn `PageHeroBlock` L24-79 (~499 tok)
  - fn `CardGridBlock` L80-134 (~575 tok)
  - fn `KenmerkenBlock` L135-164 (~328 tok)
  - fn `ThreeLevelsBlock` L165-203 (~368 tok)
  - fn `TimelineBlock` L204-221 (~152 tok)
  - fn `StatsBlock` L222-244 (~251 tok)
  - fn `ValuesBlock` L245-331 (~944 tok)
  - fn `MediaTextBlock` L332-383 (~552 tok)
  - fn `TextSplitBlock` L384-413 (~330 tok)
  - fn `QuoteBlock` L414-429 (~154 tok)
  - fn `GalleryBlock` L430-459 (~275 tok)
  - fn `StepsBlock` L460-488 (~340 tok)
  - fn `LinkBandBlock` L489-510 (~261 tok)
  - fn `KennismakenBlock` L511-521 (~77 tok)
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
- `FormRenderer.tsx` — Public half of the reCAPTCHA settings — the secret stays server-side. (~3448 tok)
  - fn `IconArrowRight` L68-75 (~66 tok)
  - fn `SuccessPanel` L76-119 (~447 tok)
  - fn `FormRenderer` L120-349 (~2218 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — Screen-reader label of the footer menu, from the interface text. (~910 tok)
  - fn `SiteFooter` L24-93 (~700 tok)
- `SiteHeader.tsx` — Main navigation, from the `navigation` document. `&` renders as the brand ampersand. (~1694 tok)
  - fn `Logo` L17-31 (~156 tok)
  - fn `SiteHeader` L32-154 (~1326 tok)

## app/src/components/site/

- `Amp.tsx` — "Over &Jonk" -> Over <Amp />Jonk (~91 tok)
- `Article.tsx` — Colour per layer (1–3), in reading order: ik, jij & ik, ik & wij. (~2138 tok)
  - fn `layerColor` L17-20 (~35 tok)
  - fn `ArticleHero` L21-67 (~368 tok)
  - fn `ArticleBody` L68-76 (~67 tok)
  - fn `ArticleSplit` L77-100 (~174 tok)
  - fn `ArticleAside` L101-137 (~243 tok)
  - fn `AsideQuote` L138-145 (~63 tok)
  - fn `AsideImage` L146-157 (~71 tok)
  - fn `Caption` L158-166 (~73 tok)
  - fn `AsideFigure` L167-182 (~95 tok)
  - fn `ArticleFigure` L183-199 (~103 tok)
  - fn `ArticleOutcome` L200-221 (~136 tok)
  - fn `LayerNav` L222-280 (~541 tok)
- `Clip.tsx` — Muted looping clip: plays only while in view, never with reduced motion (the poster stays). (~290 tok)
- `Diagrams.tsx` — The diagrams editors can place on a page. They are drawn in code, not (~3419 tok)
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
  - fn `ValuesIllustration` L292-343 (~523 tok)
- `DownloadCard.tsx` — A PDF card. The button opens a dialog with the download form; once that is (~936 tok)
  - fn `DownloadCard` L16-99 (~753 tok)
- `Frame.tsx` — Aspect ratio and layout, e.g. `aspect-[4/5]`. (~402 tok)
- `Kenmerken.tsx` — The three things clients name, in their own words. (~182 tok)
- `Kennismaken.tsx` — Empty falls back to the default title in the interface text. (~557 tok)
  - fn `Kennismaken` L20-51 (~347 tok)
- `Links.tsx` — Add horizontal padding at the call site: `px-10`, or `gap-2 px-7`. (~601 tok)
  - fn `ArrowLink` L22-46 (~200 tok)
  - fn `ContactLines` L47-79 (~192 tok)
- `Marquee.tsx` — Endless logo strip. The track holds the set twice and slides -50% for a (~607 tok)
  - fn `Marquee` L11-51 (~493 tok)
- `PageHero.tsx` — Rendered under the lead (buttons, contact lines). (~320 tok)
- `Reveal.tsx` — Transition delay in ms. (~267 tok)
- `Rich.tsx` — Editor text to JSX, so CMS copy can carry the few marks the design uses: (~409 tok)
- `Section.tsx` — The `background` choice on a block, as section classes. (~499 tok)
- `Stats.tsx` — Stats (~281 tok)
- `ThreeLevels.tsx` — Individueel, team, organisatie — in that order. (~1216 tok)
  - fn `ThreeLevels` L26-128 (~964 tok)
- `Timeline.tsx` — Two small dots: the options that lie between two big ones. (~768 tok)
  - fn `Between` L15-24 (~102 tok)
  - fn `Timeline` L25-74 (~502 tok)

## app/src/components/ui/

- `Image.tsx` — Client wrapper around next/image applying `sanityLoader` to Sanity images only; local images still use /\_next/image. (~196 tok)

## app/src/hooks/

- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~236 tok)

## app/src/lib/

- `chrome.ts` — Scroll threshold (px) before the topbar gets the stuck state. (~31 tok)
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
- `interface-text.ts` — The site's interface text, and the defaults it falls back to. (~1004 tok)
  - fn `resolveInterfaceText` L79-91 (~145 tok)
  - fn `fillTemplate` L92-97 (~60 tok)
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
- `links.ts` — The slug of the page that renders at `/`. (~511 tok)
  - fn `pathForSlug` L12-26 (~111 tok)
  - fn `resolveHref` L27-38 (~121 tok)
  - fn `isInternalHref` L39-42 (~26 tok)
  - fn `toLabeledHref` L43-53 (~110 tok)
  - fn `articlePath` L54-57 (~26 tok)
- `site.ts` — Site-wide details, and the defaults they fall back to. (~1353 tok)
  - fn `text` L77-80 (~33 tok)
  - fn `list` L81-95 (~154 tok)
  - fn `resolveSiteInformation` L96-121 (~285 tok)
  - fn `telHref` L122-125 (~29 tok)
  - fn `mailtoHref` L126-134 (~81 tok)

## app/src/sanity/

- `client.ts` — Fetch that degrades instead of throwing. (~301 tok)
- `fetch.ts` — SANITY_TAG + REVALIDATE (3600s safety net) + `sanityCache` options used by every cached Sanity read. (~200 tok)
- `image-loader.ts` — next/image loader: Sanity CDN renders each srcset width from the original (q=85, auto=format); `isSanityImage` skips SVG/local. (~426 tok)
- `image.ts` — A `photo` from the studio: an image with its alt text and crop focus. (~390 tok)
- `interface-text.ts` — The interface text, with defaults filled in where the CMS is empty. (~225 tok)
- `metadata.ts` — The OG image for a page's `seo` object, sized for social cards. (~753 tok)
  - fn `seoImageUrl` L18-46 (~301 tok)
  - fn `pageMetadata` L47-80 (~325 tok)
- `queries.ts` — Resolve internal page references on link/cta objects. (~2014 tok)
- `sanity.types.ts` — --------------------------------------------------------------------------------- (~16301 tok)
- `schema.json` (~40984 tok)
- `site-information.ts` — The site's details, with defaults filled in where the CMS is empty. (~308 tok)

## content/

- `.DS_Store` (~2186 tok)

## content/kennisbank/

- `.DS_Store` (~1640 tok)

## studio/

- `.gitignore` — Git ignore rules (~143 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package-lock.json` — npm lock file (~171738 tok)
- `package.json` — Node.js package manifest (~301 tok)
- `README.md` — Project documentation (~427 tok)
- `sanity.cli.ts` — Typegen runs from the studio — the CLI needs a studio project root — but (~270 tok)
- `sanity.config.ts` — Project id and dataset come from the environment so the studio and the app (~267 tok)
- `structure.ts` — Documents that exist exactly once. They get a fixed `_id` and a top-level (~896 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)
- `tsconfig.tsbuildinfo` (~42004 tok)

## studio/.sanity/runtime/

- `app.js` — This file is auto-generated on 'sanity dev' (~87 tok)
- `index.html` — Sanity Studio (~2316 tok)

## studio/schemaTypes/

- `documents.ts` — A client quote. Referenced from blocks, so one quote is edited in one place. (~719 tok)
- `footerType.ts` — The footer's own copy. Its menu repeats the Navigation links. (~246 tok)
- `formGeneralSettingsType.ts` — Mail and spam settings shared by every `form`. A singleton. (~1513 tok)
- `formType.ts` — Multi-step forms keep their fields under `steps`, simple ones under `fields`. (~2578 tok)
  - fn `isSteps` L5-274 (~2520 tok)
- `index.ts` — Every schema type the studio knows about. (~760 tok)
- `interfaceTextType.ts` — The site's own interface text: labels that appear on every page (header, (~1244 tok)
  - fn `group` L14-99 (~1088 tok)
- `kennisbank.ts` — The Kennisbank: articles (each on its own page at /kennisbank/artikelen/<slug>) (~1407 tok)
- `navigationType.ts` — A label + internal page or URL. Shared by the navigation and the footer. (~380 tok)
- `pageBuilderType.ts` — The block list editors can insert on a page. (~476 tok)
- `pageType.ts` — Exports pageType (~213 tok)
- `siteInformationType.ts` — Who the site belongs to: the details that appear in the header, the footer (~1167 tok)

## studio/schemaTypes/blocks/

- `articleBlocks.ts` — The "Hoe wij kijken" layer pages. Consecutive article blocks are rendered (~1304 tok)
- `collectionBlocks.ts` — Exports testimonialsType, casesType, logosType, podcastTeaserType, podcastEpisodesType (~1277 tok)
- `contactFormType.ts` — Direct contact details (from Site information) beside a form from Forms. (~339 tok)
- `pageHeroType.ts` — Page opener: heading left, lead right, optional photo or stats underneath. (~446 tok)
- `sectionBlocks.ts` — The three things clients name, beside a photo, optionally with a quote. (~2775 tok)

## studio/schemaTypes/objects/

- `contentObjects.ts` — A photo with its alt text; hotspot so editors choose the crop focus. (~712 tok)
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

- `mediaData.ts` — Queries, types and formatting helpers for the Media panel (`MediaTool.tsx`). (~2220 tok)
  - fn `chunk` L61-132 (~546 tok)
  - fn `typeLabel` L133-136 (~25 tok)
  - fn `isImage` L137-141 (~71 tok)
  - fn `uploadKind` L142-145 (~38 tok)
  - fn `formatBytes` L146-154 (~103 tok)
  - fn `formatDate` L155-161 (~74 tok)
  - fn `formatDimensions` L162-167 (~70 tok)
  - fn `displayName` L168-179 (~95 tok)
  - fn `matchesSearch` L180-205 (~213 tok)
  - fn `matchesFilter` L206-221 (~136 tok)
  - fn `dedupeUsage` L222-237 (~165 tok)
  - fn `thumbnailUrl` L238-241 (~36 tok)
- `mediaStyles.ts` — The Media panel's own styles, on top of `panelStyles.ts`. Same approach — (~1416 tok)
- `PodcastSyncTool.tsx` — Studio "Spotify sync" panel: Dry run / Sync now buttons calling the app route with the editor's Sanity token. (~800 tok)
- `MediaTool.tsx` — The media library in the studio (incl. "Delete unused images" bulk cleanup): every upload in one place, searchable, with (~5698 tok)
  - fn `MediaLibrary` L78-421 (~3196 tok)
  - fn `MediaCard` L422-457 (~284 tok)
  - fn `MediaDetail` L458-629 (~1435 tok)
- `panelStyles.ts` — Shared inline styles for custom studio panels — the parts that any panel (~335 tok)
