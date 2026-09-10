# STATUS — &Jonk site (app/)

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-09-10

---

## ✅ Done

- Converted every page in `app/designs/` (except `onepager-ignore.html`) into static Next.js App Router routes with Tailwind v4:
  `/`, `/wat-we-doen`, `/wat-anderen-zeggen`, `/hoe-wij-kijken` (+ `/ik`, `/jij-en-ik`, `/ik-en-wij`), `/over-jonk`, `/cases`, `/podcast`, `/contact`.
- Design tokens in `src/app/globals.css` `@theme`; brand fonts via next/font/local (`src/app/fonts`), Spectral + Jost via next/font/google.
- Shared chrome: `components/layout/SiteHeader` (fixed bar + full-screen menu), `SiteFooter`. Nav + contact data in `src/lib/nav.ts`.
- Design components in `src/components/site/` (Reveal, Frame, Section, PageHero, Kennismaken, ThreeLevels venn, Timeline, Marquee, Article helpers…).
- Images → `public/images`, logos → `public/logos`, logo SVG → `public/jonk-logo.svg`.
- All Sanity usage commented out (see cerebrum Decision Log). `npm run build` passes; all pages static.

---

## 🚀 Next phase

**Goal:** Visual parity review of the Next pages against `app/designs`, then hook up Sanity (wire-sanity skill).

### Open decisions
- Delete the unused template blocks (`src/components/blocks`, old `ui/*`, `PageBuilder`, `form/*`, `demo-content`) or keep them for the Sanity wiring?
- Webfont licences for Cardillac (Hoftype) and Rameau (Linotype) before go-live.
- Real content for `tbd` placeholders (stats, cases, quotes, podcast episodes) and the `#` social/platform links in `src/lib/nav.ts`.
- Contact form still posts via `mailto:`; `/api/submit-form` returns 503 until Sanity forms are wired.

---

## 🔧 Useful commands

```bash
npm --prefix app run dev      # Next app on :3000
npm --prefix app run build
python3 -m http.server 8765 --directory app/designs   # original designs
```
