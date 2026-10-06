# STATUS — en-jonk

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-10-06 (Kennisbank)

---

## ✅ Done

- Static Next.js site for &Jonk (11 routes), approved by user.
- **Sanity wiring (branch `feat/wire-sanity`, 2026-09-12):**
  - Studio: page builder with 26 blocks mirroring `components/site/*`; `testimonial`, `case`, `podcastEpisode` docs; navigation → `links[]`; footer → tagline/legalLinks/copyright; socialLinks allow `#`. English labels.
  - App: `[...slug]` catch-all + home via `components/CmsPage.tsx`; typed `PageBuilder` + `components/blocks/{shared,sections,collections,article}.tsx`; `rich()` text marks (`&`, `*em*`, `**b**`, `[tbd]`, line breaks); header/footer/site info from CMS; contact form = CMS form + `/api/submit-form`, restyled to design; sitemap from CMS; old template blocks/ui/demo-content/static routes deleted.
  - Seed: `scripts/seed/{pages,documents,forms,navigation,site-information}.ts`, one-time overwrite with fixed ids; all design placeholders seeded published; social URLs `#`. Dataset rjioz4di/production seeded 2026-09-12.
  - Interface text (2026-09-13): all visitor-facing strings moved to Sanity — `interfaceText` singleton (header, footer, contact lines, kennismaken defaults, forms, 404), new block fields (articleHero eyebrow, articleOutcome title, layerNav labels, level titles, cases eyebrow, podcast listenLabel, contact labels), social link labels, Form settings mailFooter. Submit route restored (was still a stub) and verified by POST.
  - Verified: studio + app typecheck, lint, check:jsonld, check:form, `sanity documents validate` (27 valid), `next build` (11 pages SSG), all routes 200 with Sanity images, visual check of home / ik / contact.
  - Cleanup (2026-09-23): audit found all blocks/types/components used; removed `siteInformation.badges`, dead exports `toImage`, `FooterLinkGroup`, `MOBILE_NAV_BREAKPOINT`, `DiagramKey`. Kept all optional form/SEO features, public assets, designs and seed scripts on purpose.
  - Video (2026-09-23): `photo` type has optional `video` (MP4, ≤20 MB, validated via asset size/mimeType); `Frame` renders `Clip` (muted, loop, no controls, plays in view, poster = photo, paused under reduced motion). URL built from ref by `fileUrl()` in `sanity/image.ts`. Not yet tested with a real uploaded video.
  - Images + media cleanup (2026-10-05, branch `claude/sanity-image-quality`, ported from nextjs-sanity-starter PR #8): `Frame` uses `components/ui/Image` → `sanityLoader` (Sanity CDN renders every srcset width from the original, q=85, auto=format, crop kept). Studio Media panel has "Delete unused images (n)" (confirm, re-fetch, transactions of 50, per-id retry; files kept). Typecheck/lint green; not yet tested in a browser / running Studio.
- Feedback 11 sept (2026-10-06): new slogan everywhere; home hero/doelgroepen/Talent dat blijft; kenmerken lead dropped; timeline 4th point "Meerjarig partnerschap" + small in-between dots + new `timeline.text` field on threeLevels; stats → "Cijfers uit de praktijk" (9e / 100+ / 120, also on Cases hero); values compact shows ValuesIllustration on lg; podcast renamed "&Jonk de podcast", home teaser links to Spotify, Spotify social URL set; Hoe wij kijken reordered (& on dark, Wat wij zien heading above text, bigger `t-quote-lg` quote, smaller values heading); Wat anderen zeggen photo jonk-7196, KLM logo removed; Over &Jonk timeline removed, "Wie je aan tafel krijgt", values link band retitled; Wat we doen removed from seed + nav. Seeded site/pages/nav.
- Kennisbank (2026-10-06): `article` + `download` docs, `articleList` / `downloadList` blocks (picked or newest, optional limit), pages /kennisbank (3+3), /kennisbank/artikelen, /kennisbank/naslagwerk seeded; single article route `app/kennisbank/artikelen/[slug]` (typographic hero, reading time, Portable Text body, "Verder lezen" 3 newest, Kennismaken, Article JSON-LD, sitemap). Gated PDFs: card → dialog with `form-download` (naam, e-mail, organisatie) → `/api/submit-form` with `downloadId` → mail to admin + copy with link to visitor → "Open de PDF". Nav item after Cases (header + footer). Interface text group `kennisbank`. Real content imported 2026-10-06: 10 articles + 7 PDFs via `npm run seed -- kennisbank-content`; hub shows Leiderschap gebeurt in contact / Contracteren / Wat er gebeurt als het spannend wordt + Model Contracteren / Persoonlijk leiderschap / Triggers en patronen.

---

## 🚀 Next phase — go live with real content

1. Add Mailjet keys to `app/.env` (MAILJET_API_KEY/SECRET/FROM_EMAIL) and send a real test message (route verified up to the mail step).
2. Replace `#` social URLs (LinkedIn, Spotify, Apple Podcasts) in Studio → Site information.
3. Client fills placeholders in Studio: stats ([naam leergang], [cijfer]), 3 testimonials, 2 cases, podcast episodes, legal links.
4. Deploy studio (workflow exists) and the app; set `NEXT_PUBLIC_SITE_URL`.
5. Merge `feat/wire-sanity` → main. For prod prefer `node .next/standalone/server.js` (`next start` warns with output: standalone).

6. **Delete `page-wat-we-doen` from the dataset** (blocked for Claude by permissions; user runs `npx sanity documents delete page-wat-we-doen` in studio/). Until then /wat-we-doen still renders.
7. Run `npm run build` (was blocked this session; typecheck + lint pass, dev server checked).
8. Copy pending from Eric: Waar je ons voor belt, Hoe klanten ons beschrijven (tekst 4), stats intro (tekst 5), values heading Hoe wij kijken (interim "Ons kompas in de complexiteit"), Gekkigheid long text, Eric bio, 3 cases, 3 layer articles, 10 quotes.
9. Podcast: fetch Spotify episodes automatically (user will add).

10. Kennisbank: `content/` is gitignored (client source files) — the `kennisbank-content` seed needs it locally. Client may want to rewrite the drafted excerpts/PDF descriptions in Studio. Downloads need Mailjet keys (item 1).

### Open decisions

- Podcast episodes: keep manual documents or import from the podcast RSS feed?

---

## 📁 Active architecture

- **Stack:** Next.js 16 (App Router, React 19, Tailwind v4) in `app/`, Sanity Studio v3 in `studio/`, Node 22 (nvm v22.18.0; shell default is Node 17).
- **Key modules:** `app/src/sanity/queries.ts` (PAGE_QUERY), `app/src/components/PageBuilder.tsx`, `app/src/components/blocks/*`, `app/src/components/site/*` (design), `studio/schemaTypes/blocks/*`, `app/scripts/seed/*`.
- **Patterns:** blocks typed via `BlockOf<'type'>` from typegen; text through `rich()`; photos as `photo` type rendered by `Frame`; `background` field → `bgClass()`.

---

## ⚠️ External blockers

- Mailjet keys (MAILJET_API_KEY/SECRET/FROM_EMAIL) empty in app/.env — form submit errors until set.
- Real LinkedIn / Spotify / Apple Podcasts URLs pending.

## 🔧 Useful commands

```bash
export PATH="$HOME/.nvm/versions/node/v22.18.0/bin:$PATH"
cd app && npm run seed && npm run typegen && npm run typecheck && npm run build
cd studio && npm run dev
```

## 📚 References

- `.wolf/cerebrum.md` — preferences + decisions
- `README.md` — template docs (forms, seeding, typegen)
