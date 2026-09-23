# STATUS — en-jonk

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-09-23

---

## ✅ Done

- Static Next.js site for &Jonk (11 routes), approved by user.
- **Sanity wiring (branch `feat/wire-sanity`, 2026-09-12):**
  - Studio: page builder with 26 blocks mirroring `components/site/*`; `testimonial`, `case`, `podcastEpisode` docs; navigation → `links[]`; footer → tagline/legalLinks/copyright; socialLinks allow `#`. English labels.
  - App: `[...slug]` catch-all + home via `components/CmsPage.tsx`; typed `PageBuilder` + `components/blocks/{shared,sections,collections,article}.tsx`; `rich()` text marks (`&`, `*em*`, `**b**`, `[tbd]`, line breaks); header/footer/site info from CMS; contact form = CMS form + `/api/submit-form`, restyled to design; sitemap from CMS; old template blocks/ui/demo-content/static routes deleted.
  - Seed: `scripts/seed/{pages,documents,forms,navigation,site-information}.ts`, one-time overwrite with fixed ids; all design placeholders seeded published; social URLs `#`. Dataset rjioz4di/production seeded 2026-09-12.
  - Interface text (2026-09-13): all visitor-facing strings moved to Sanity — `interfaceText` singleton (header, footer, contact lines, kennismaken defaults, forms, 404), new block fields (articleHero eyebrow, articleOutcome title, layerNav labels, level titles, cases eyebrow, podcast listenLabel, contact labels), social link labels, Form settings mailFooter. Submit route restored (was still a stub) and verified by POST.
  - Verified: studio + app typecheck, lint, check:jsonld, check:form, `sanity documents validate` (27 valid), `next build` (11 pages SSG), all routes 200 with Sanity images, visual check of home / ik / contact.
  - Video (2026-09-23, uncommitted): `photo` type has optional `video` (MP4, ≤20 MB, validated via asset size/mimeType); `Frame` renders `Clip` (muted, loop, no controls, plays in view, poster = photo, paused under reduced motion). URL built from ref by `fileUrl()` in `sanity/image.ts`. Not yet tested with a real uploaded video.

---

## 🚀 Next phase — go live with real content

1. Add Mailjet keys to `app/.env` (MAILJET_API_KEY/SECRET/FROM_EMAIL) and send a real test message (route verified up to the mail step).
2. Replace `#` social URLs (LinkedIn, Spotify, Apple Podcasts) in Studio → Site information.
3. Client fills placeholders in Studio: stats ([naam leergang], [cijfer]), 3 testimonials, 2 cases, podcast episodes, legal links.
4. Deploy studio (workflow exists) and the app; set `NEXT_PUBLIC_SITE_URL`.
5. Merge `feat/wire-sanity` → main. For prod prefer `node .next/standalone/server.js` (`next start` warns with output: standalone).

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
