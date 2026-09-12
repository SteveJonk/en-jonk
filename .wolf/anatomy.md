# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-09-12T11:28:15.008Z
> Files: 255 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~2732 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~6932 tok)

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
- `next.config.ts` — Next.js configuration (~556 tok)
- `package-lock.json` — npm lock file (~208491 tok)
- `package.json` — Node.js package manifest (~395 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `sentry.edge.config.ts` — Sentry for the edge runtime (middleware, edge routes). Imported by (~74 tok)
- `sentry.options.ts` — One source of Sentry settings for the client, the server and the edge (~281 tok)
- `sentry.server.config.ts` — Sentry for the Node.js server runtime. Imported by `src/instrumentation.ts`, (~69 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~83398 tok)

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

- `check-form.ts` — The smallest thing that fails when the CMS-driven form breaks. (~2169 tok)
  - fn `names` L31-111 (~746 tok)
  - fn `runFormQuery` L112-121 (~110 tok)
  - fn `checkAllowList` L122-209 (~971 tok)
- `check-jsonld.ts` — The smallest thing that fails when the structured data quietly changes. (~2615 tok)
  - fn `node` L37-230 (~2266 tok)
- `seed.ts` — Seed Sanity content. Runs every target, or only the ones you name. (~630 tok)
  - fn `parseTargets` L40-51 (~106 tok)
  - fn `main` L52-68 (~119 tok)

## app/scripts/seed/

- `about.ts` — Seeds the second page — /about. (~980 tok)
  - fn `buildAboutContent` L29-113 (~753 tok)
  - fn `seedAbout` L114-124 (~76 tok)
- `contact.ts` — Seeds /contact — the page the demo form actually lives on. (~527 tok)
  - fn `buildContactContent` L12-51 (~352 tok)
  - fn `seedContact` L52-56 (~40 tok)
- `forms.ts` — Seeds the shared form settings and one working contact form. (~554 tok)
  - fn `upsertFormSettings` L18-33 (~140 tok)
  - fn `upsertContactForm` L34-56 (~191 tok)
  - fn `seedForms` L57-62 (~34 tok)
- `home.ts` — Seeds the home page. (~887 tok)
  - fn `buildHomeContent` L13-103 (~783 tok)
  - fn `seedHome` L104-108 (~36 tok)
- `navigation.ts` — Seeds the navigation and footer singletons. (~684 tok)
  - fn `navLinkExternal` L10-18 (~47 tok)
  - fn `navLinkInternal` L19-27 (~66 tok)
  - fn `pageIdBySlug` L28-35 (~70 tok)
  - fn `pageLink` L36-40 (~50 tok)
  - fn `upsertNavigation` L41-56 (~140 tok)
  - fn `upsertFooter` L57-82 (~192 tok)
  - fn `seedNavigation` L83-88 (~38 tok)
- `shared.ts` — Shared Sanity write helpers for the per-page seed scripts in this folder. (~1358 tok)
  - fn `key` L44-50 (~48 tok)
  - fn `externalLink` L51-54 (~34 tok)
  - fn `cta` L55-66 (~87 tok)
  - fn `contentTypeFor` L67-70 (~36 tok)
  - fn `uploadImage` L71-105 (~253 tok)
  - fn `upsertFaq` L106-138 (~276 tok)
  - fn `upsertPage` L139-162 (~191 tok)
- `site-information.ts` — The `siteInformation` singleton, filled from the defaults in (~341 tok)

## app/src/

- `instrumentation-client.ts` — Sentry in the browser. (~279 tok)
- `instrumentation.ts` — Server-side instrumentation hook. Without `NEXT_PUBLIC_SENTRY_DSN` both (~207 tok)

## app/src/app/

- `global-error.tsx` — Last-resort error boundary: it replaces the root layout, so it renders its (~239 tok)
- `globals.css` — Styles: 14 rules, 17 vars, 1 media queries, 1 animations, 1 layers (~1174 tok)
- `layout.tsx` — SANITY — disabled while the pages are built statically. Re-enable when the (~1055 tok)
  - fn `RootLayout` L87-113 (~207 tok)
- `manifest.json` (~46 tok)
- `not-found.tsx` — NotFound (~202 tok)
- `page.tsx` — SANITY — the home page used to render the CMS page builder. Re-enable when wiring the CMS: (~4673 tok)
  - fn `HomePage` L86-381 (~3600 tok)
- `robots.ts` — Served at `/robots.txt`. (~150 tok)
- `sitemap.ts` — Served at `/sitemap.xml`; `robots.ts` points at it. (~339 tok)

## app/src/app/[slug]/

- `page.tsx` — //  * Every CMS page except the home page renders through this one route — there (~740 tok)
  - fn `SanityPage` L6-82 (~672 tok)

## app/src/app/api/submit-form/

- `route.ts` — Bigger uploads are rejected rather than silently dropped from the mail. (~2912 tok)
  - fn `POST` L6-270 (~2838 tok)

## app/src/app/cases/

- `page.tsx` — metadata (~1050 tok)
  - fn `CasesPage` L16-87 (~877 tok)

## app/src/app/contact/

- `page.tsx` — metadata — renders form (~1451 tok)
  - fn `Field` L20-40 (~100 tok)
  - fn `ContactPage` L41-143 (~1122 tok)

## app/src/app/hoe-wij-kijken/

- `page.tsx` — Vertrouwen draagt (kom), verbinding (twee ringen), beweging (golf), gekkigheid (lus). (~3753 tok)
  - fn `ValuesIllustration` L73-116 (~465 tok)
  - fn `HoeWijKijkenPage` L117-309 (~2391 tok)

## app/src/app/hoe-wij-kijken/ik-en-wij/

- `page.tsx` — Ten people in a circle; the first (bottom) one is "ik". (~1758 tok)
  - fn `IkInDeWij` L24-50 (~279 tok)
  - fn `IkEnWijPage` L51-108 (~1190 tok)

## app/src/app/hoe-wij-kijken/ik/

- `page.tsx` — Centred labels; two-line labels sit 6px above and below the centre. (~3778 tok)
  - fn `Labels` L38-57 (~162 tok)
  - fn `Lobes` L58-85 (~209 tok)
  - fn `Tangle` L86-111 (~176 tok)
  - fn `Dot` L112-121 (~105 tok)
  - fn `Arrow` L122-153 (~298 tok)
  - fn `Filter` L154-190 (~322 tok)
  - fn `TangleDiagram` L191-218 (~363 tok)
  - fn `LensDiagram` L219-260 (~576 tok)
  - fn `IkPage` L261-334 (~1167 tok)

## app/src/app/hoe-wij-kijken/jij-en-ik/

- `page.tsx` — LEAD (~1891 tok)
  - fn `DramaTriangle` L26-50 (~228 tok)
  - fn `JijEnIkPage` L51-134 (~1359 tok)

## app/src/app/over-jonk/

- `page.tsx` — metadata (~1395 tok)
  - fn `OverJonkPage` L39-132 (~1006 tok)

## app/src/app/podcast/

- `page.tsx` — metadata (~1274 tok)
  - fn `PodcastPage` L17-111 (~1088 tok)

## app/src/app/wat-anderen-zeggen/

- `page.tsx` — metadata (~1402 tok)
  - fn `WatAnderenZeggenPage` L39-120 (~938 tok)

## app/src/app/wat-we-doen/

- `page.tsx` — metadata (~1407 tok)
  - fn `WatWeDoenPage` L32-123 (~1073 tok)

## app/src/components/

- `JsonLd.tsx` — Put one graph into the page. (~98 tok)
- `PageBuilder.tsx` — Map one Sanity block onto its React component. (~3155 tok)
  - fn `toCta` L26-44 (~229 tok)
  - fn `renderBlock` L45-307 (~2526 tok)
  - fn `PageBuilder` L308-320 (~92 tok)
- `TrackingScripts.tsx` — Google Tag Manager and the Meta (Facebook) pixel, both opt-in. (~866 tok)
  - fn `TrackingScriptsHead` L21-62 (~399 tok)
  - fn `TrackingScriptsBody` L63-92 (~222 tok)

## app/src/components/blocks/

- `Benefits.tsx` — DEFAULTS — renders chart (~1254 tok)
  - fn `BenefitIcon` L32-117 (~570 tok)
  - fn `Benefits` L118-165 (~501 tok)
- `ContactForm.tsx` — The form itself, from the referenced `form` document. (~1221 tok)
  - fn `ContactForm` L47-125 (~842 tok)
- `CrossLinks.tsx` — DEFAULTS (~631 tok)
  - fn `CrossLinks` L21-63 (~502 tok)
- `CtaBand.tsx` — DEFAULTS (~664 tok)
  - fn `CtaBand` L30-83 (~478 tok)
- `Faq.tsx` — DEFAULTS (~1065 tok)
  - fn `Faq` L26-100 (~890 tok)
- `Hero.tsx` — DEFAULTS (~1679 tok)
  - fn `Hero` L40-185 (~1424 tok)
- `Intro.tsx` — DEFAULTS (~1313 tok)
  - fn `renderHighlightedTitle` L40-63 (~136 tok)
  - fn `Intro` L64-158 (~921 tok)
- `MediaText.tsx` — Text column with a supporting photo on the right. (~616 tok)
  - fn `MediaText` L32-82 (~411 tok)
- `PageHero.tsx` — DEFAULTS (~1055 tok)
  - fn `PageHero` L31-125 (~864 tok)
- `Services.tsx` — DEFAULT_ITEMS (~1541 tok)
  - fn `ServiceCardItem` L57-102 (~447 tok)
  - fn `Services` L103-165 (~710 tok)
- `Steps.tsx` — DEFAULTS (~1656 tok)
  - fn `stepImageSrc` L34-37 (~34 tok)
  - fn `Steps` L38-159 (~1403 tok)

## app/src/components/form/

- `fields.tsx` — `stacked` is the roomy page form, `compact` fits a narrow card or sidebar. (~1728 tok)
  - fn `selectCaret` L41-51 (~128 tok)
  - fn `linkify` L52-73 (~153 tok)
  - fn `FormField` L74-180 (~965 tok)
- `FormRenderer.tsx` — Public half of the reCAPTCHA settings — the secret stays server-side. (~3349 tok)
  - fn `IconArrowRight` L64-71 (~66 tok)
  - fn `SuccessPanel` L72-115 (~459 tok)
  - fn `FormRenderer` L116-334 (~2170 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — link (~689 tok)
  - fn `SiteFooter` L8-73 (~622 tok)
- `SiteHeader.tsx` — Fixed top bar + full-screen menu overlay (used at every width). (~1529 tok)
  - fn `Logo` L17-21 (~57 tok)
  - fn `SiteHeader` L22-140 (~1268 tok)

## app/src/components/site/

- `Amp.tsx` — "Over &Jonk" -> Over <Amp />Jonk (~91 tok)
- `Article.tsx` — The three "Hoe wij kijken" layers, in reading order. (~1932 tok)
  - fn `ArticleHero` L37-79 (~332 tok)
  - fn `ArticleBody` L80-88 (~67 tok)
  - fn `ArticleSplit` L89-106 (~172 tok)
  - fn `ArticleAside` L107-135 (~220 tok)
  - fn `AsideQuote` L136-143 (~63 tok)
  - fn `AsideImage` L144-151 (~66 tok)
  - fn `Caption` L152-160 (~73 tok)
  - fn `AsideFigure` L161-170 (~86 tok)
  - fn `ArticleFigure` L171-181 (~94 tok)
  - fn `ArticleOutcome` L182-195 (~124 tok)
  - fn `LayerNav` L196-234 (~387 tok)
- `Frame.tsx` — File name in public/images, without extension. (~206 tok)
- `Kenmerken.tsx` — The three things clients name, in their own words. (~339 tok)
- `Kennismaken.tsx` — Only the mail button (podcast page). (~516 tok)
  - fn `Kennismaken` L21-55 (~308 tok)
- `Links.tsx` — Add horizontal padding at the call site: `px-10`, or `gap-2 px-7`. (~545 tok)
  - fn `ArrowLink` L22-46 (~200 tok)
  - fn `ContactLines` L47-64 (~140 tok)
- `Marquee.tsx` — Endless logo strip. The track holds the set twice and slides -50% for a (~598 tok)
  - fn `Marquee` L11-51 (~490 tok)
- `PageHero.tsx` — Rendered under the lead (buttons, contact lines). (~320 tok)
- `Reveal.tsx` — Transition delay in ms. (~267 tok)
- `Section.tsx` — Standard content band: vertical rhythm + container. (~334 tok)
- `Stats.tsx` — STATS (~324 tok)
- `ThreeLevels.tsx` — Individueel, team, organisatie — in that order. (~1171 tok)
  - fn `ThreeLevels` L26-125 (~904 tok)
- `Timeline.tsx` — Dot colour, e.g. `bg-rose`. (~652 tok)
  - fn `Timeline` L38-78 (~366 tok)

## app/src/components/ui/

- `ArrowLink.tsx` — Standalone text link with circular arrow (renders as `<a>`). (~546 tok)
  - fn `ArrowLink` L34-57 (~154 tok)
  - fn `ArrowLinkLabel` L58-73 (~93 tok)
- `Button.tsx` — baseClass (~451 tok)
- `ContactIcon.tsx` — Phone / WhatsApp / mail / map-pin, for the contact panel beside a form. (~570 tok)
  - fn `ContactIcon` L9-60 (~507 tok)
- `Eyebrow.tsx` — Accent tone for dark backgrounds where plain white reads too cold. (~192 tok)
- `IconArrow.tsx` — IconArrow (~203 tok)
- `Lead.tsx` — Lead (~91 tok)
- `LogoMark.tsx` — From `siteInformation`; falls back to the default when not passed. (~478 tok)
- `Reveal.tsx` — delayClass (~252 tok)
- `RevealLink.tsx` — delayClass (~277 tok)
- `SectionHead.tsx` — SectionHead (~160 tok)
- `Wrap.tsx` — Site content width shell. (~119 tok)

## app/src/hooks/

- `useActiveStep.ts` — Tracks which step list item is closest to ~42% viewport height. (~316 tok)
- `useMobileNav.ts` — Exports useMobileNav (~282 tok)
- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~236 tok)

## app/src/lib/

- `chrome.ts` — Scroll threshold (px) before the topbar gets the stuck state. (~62 tok)
- `cn.ts` — Exports cn (~37 tok)
- `demo-content.ts` — Demo copy for every block. (~3948 tok)
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
- `json-ld.ts` — Structured data (schema.org JSON-LD), built from what is in the CMS. (~2953 tok)
  - fn `absoluteUrl` L32-42 (~123 tok)
  - fn `prune` L43-67 (~295 tok)
  - fn `serializeJsonLd` L68-72 (~54 tok)
  - fn `jsonLdGraph` L73-96 (~278 tok)
  - fn `postalAddress` L97-123 (~287 tok)
  - fn `organizationJsonLd` L124-138 (~129 tok)
  - fn `websiteJsonLd` L139-150 (~82 tok)
  - fn `siteJsonLd` L151-161 (~126 tok)
  - fn `breadcrumbJsonLd` L162-180 (~154 tok)
  - fn `faqQuestions` L181-198 (~192 tok)
  - fn `pageFaqs` L199-215 (~188 tok)
  - fn `pageBreadcrumbLabel` L216-242 (~257 tok)
  - fn `webPageJsonLd` L243-269 (~341 tok)
  - fn `pageJsonLd` L270-276 (~59 tok)
- `links.ts` — The slug of the page that renders at `/`. (~446 tok)
- `nav.ts` — Main navigation — menu overlay and footer. `&` renders as the brand ampersand. (~200 tok)
- `site.ts` — Site-wide details, and the defaults they fall back to. (~1228 tok)
  - fn `text` L72-75 (~33 tok)
  - fn `list` L76-90 (~154 tok)
  - fn `resolveSiteInformation` L91-106 (~201 tok)
  - fn `telHref` L107-110 (~29 tok)
  - fn `mailtoHref` L111-121 (~63 tok)

## app/src/sanity/

- `client.ts` — Fetch that degrades instead of throwing. (~301 tok)
- `image.ts` — Exports SanityImage, urlFor, imageSrc, toImage (~293 tok)
- `metadata.ts` — The OG image for a page's `seo` object, sized for social cards. (~635 tok)
  - fn `seoImageUrl` L18-39 (~228 tok)
  - fn `pageMetadata` L40-68 (~280 tok)
- `queries.ts` — Resolve internal page references on link/cta objects. (~1362 tok)
- `sanity.types.ts` — --------------------------------------------------------------------------------- (~9726 tok)
- `schema.json` (~25734 tok)
- `site-information.ts` — The site's details, with defaults filled in where the CMS is empty. (~308 tok)

## studio/

- `.gitignore` — Git ignore rules (~143 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package-lock.json` — npm lock file (~171738 tok)
- `package.json` — Node.js package manifest (~301 tok)
- `README.md` — Project documentation (~427 tok)
- `sanity.cli.ts` — Typegen runs from the studio — the CLI needs a studio project root — but (~270 tok)
- `sanity.config.ts` — Project id and dataset come from the environment so the studio and the app (~267 tok)
- `structure.ts` — Documents that exist exactly once. They get a fixed `_id` and a top-level (~717 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)

## studio/schemaTypes/

- `faqType.ts` — Exports faqType (~238 tok)
- `footerType.ts` — Exports footerType (~584 tok)
- `formGeneralSettingsType.ts` — Mail and spam settings shared by every `form`. A singleton. (~1444 tok)
- `formType.ts` — Multi-step forms keep their fields under `steps`, simple ones under `fields`. (~2578 tok)
  - fn `isSteps` L5-274 (~2520 tok)
- `index.ts` — Every schema type the studio knows about. (~527 tok)
- `navigationType.ts` — Exports navigationType (~363 tok)
- `pageBuilderType.ts` — The block list editors can insert on a page. (~238 tok)
- `pageType.ts` — Exports pageType (~213 tok)
- `siteInformationType.ts` — Who the site belongs to: the details that appear in the header, the footer (~1013 tok)

## studio/schemaTypes/blocks/

- `benefitsType.ts` — Exports benefitsType (~638 tok)
- `contactFormType.ts` — A form from Forms, with a contact panel beside it. (~798 tok)
- `crossLinksType.ts` — Exports crossLinksType (~319 tok)
- `ctaBandType.ts` — Exports ctaBandType (~334 tok)
- `faqsType.ts` — Exports faqsType (~264 tok)
- `heroType.ts` — Exports heroType (~625 tok)
- `introType.ts` — Exports introType (~682 tok)
- `mediaTextType.ts` — Exports mediaTextType (~341 tok)
- `pageHeroType.ts` — Exports pageHeroType (~479 tok)
- `servicesType.ts` — Exports servicesType (~681 tok)
- `stepsType.ts` — Exports stepsType (~452 tok)

## studio/schemaTypes/objects/

- `ctaType.ts` — Exports ctaType (~94 tok)
- `formFieldType.ts` — Hide a setting unless the field's input type is one of these. (~1306 tok)
- `linkFields.ts` — Shared internal/external link fields for `link` and `cta` objects. (~407 tok)
- `linkType.ts` — Exports linkType (~54 tok)
- `seoType.ts` — Exports seoType (~231 tok)

## studio/tools/

- `mediaData.ts` — Queries, types and formatting helpers for the Media panel (`MediaTool.tsx`). (~2006 tok)
  - fn `typeLabel` L113-116 (~25 tok)
  - fn `isImage` L117-121 (~71 tok)
  - fn `uploadKind` L122-125 (~38 tok)
  - fn `formatBytes` L126-134 (~103 tok)
  - fn `formatDate` L135-141 (~74 tok)
  - fn `formatDimensions` L142-147 (~70 tok)
  - fn `displayName` L148-159 (~95 tok)
  - fn `matchesSearch` L160-185 (~213 tok)
  - fn `matchesFilter` L186-201 (~136 tok)
  - fn `dedupeUsage` L202-217 (~165 tok)
  - fn `thumbnailUrl` L218-221 (~36 tok)
- `mediaStyles.ts` — The Media panel's own styles, on top of `panelStyles.ts`. Same approach — (~1416 tok)
- `MediaTool.tsx` — The media library in the studio: every upload in one place, searchable, with (~4572 tok)
  - fn `MediaLibrary` L63-313 (~2237 tok)
  - fn `MediaCard` L314-349 (~284 tok)
  - fn `MediaDetail` L350-521 (~1435 tok)
- `panelStyles.ts` — Shared inline styles for custom studio panels — the parts that any panel (~335 tok)
