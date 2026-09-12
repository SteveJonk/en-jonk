# STATUS — en-jonk

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-09-12

---

## ✅ Done

- Static Next.js site for &Jonk (11 routes, `components/site/*`), approved by user ("all seems perfect").
- Sanity wiring planned + schema v2 (page builder) approved — see below.

---

## 🚀 Next phase — wire &Jonk to Sanity (branch `feat/wire-sanity`)

**Goal:** every page is a CMS `page` built from blocks that mirror `components/site/*`; the site renders identically to the static version.

### Fixed decisions
- Page builder on generic `page` (title, slug, seo, content). Catch-all `app/[...slug]` (slug may contain `/`, e.g. `hoe-wij-kijken/ik`); home = slug `home` at `/`. Delete the 11 static route files.
- Studio labels in **English**.
- Delete old template: 11 old blocks, `faq`, old PageBuilder cases, `components/blocks/*`, `demo-content.ts`, seeds home/about/contact.
- Seed **all design placeholders as published content** (TBD testimonials, cases, episodes, stat 3 "[cijfer]", "[naam leergang]"). Render `[...]` text with the `tbd` style. Renderer hides only genuinely empty sections/items.
- Social/podcast URLs (LinkedIn, Spotify, Apple Podcasts) seeded as `#` in `siteInformation.socialLinks`; buttons hide when URL empty. Relax socialLink url validation to allow `#`; JSON-LD `sameAs` only keeps http(s).
- `&` in any text renders via `withAmp()`.
- Contact form: real CMS `form` doc + FormRenderer + `/api/submit-form` (Mailjet keys come later; recipient info@enjonk.nl). Restyle FormRenderer to the design's underline inputs.
- Seed = one-time, overwrite (warning in script header).
- Git: commit per phase (schemas / queries+wiring / seed+cleanup), no push.
- Verify: run seed, typegen, typecheck, build, visual check vs static.

### Blocks (22)
pageHero, cardGrid, kenmerken, threeLevels, timeline, stats, values, mediaText, textSplit, quote, gallery, steps, testimonials, cases, logos, podcastTeaser, podcastEpisodes, linkBand, contactForm (reshaped), kennismaken, articleHero, articleSplit/articleAside/articleFigure/articleOutcome, layerNav.
Common `background` field (default|paper|dark) where it varies. Diagrams stay SVG in code, chosen from a list. Consecutive article* blocks wrap in one ArticleBody.

### Documents
New: `testimonial` (quote, name, role), `case` (client, type, summary, image, testimonial ref), `podcastEpisode` (number, title, description, url, publishedAt).
Kept: `page`, `siteInformation` (&Jonk data, replaces `CONTACT` in nav.ts), `form`, `formGeneralSettings`, `seo`, Media panel.
Reshaped: `navigation` → `links[]`; `footer` → tagline, legalLinks[], copyright (menu reuses nav).

### Phases
1. Studio schemas + structure + typegen → commit.
2. GROQ queries, PageBuilder, block components (wrapping site/*), layout/header/footer from CMS, catch-all route, sitemap, metadata/JSON-LD, `next.config` remotePatterns cdn.sanity.io, Frame accepts URLs → commit.
3. Seed scripts (per page, content copied from current route files; images from public/images, logos incl. svg) + delete old template → run seed, verify → commit.

---

## ⚠️ External blockers
- Mailjet keys (MAILJET_API_KEY/SECRET/FROM_EMAIL) empty in app/.env — form submit errors until set.
- Real LinkedIn / Spotify / Apple Podcasts URLs pending.

## 🔧 Useful commands
```bash
cd app && npm run seed && npm run typegen && npm run typecheck && npm run build
cd studio && npm run dev
```

## 📚 References
- `.wolf/cerebrum.md` — preferences + decisions
- `README.md` — template docs (forms, seeding, typegen)
