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

- **Project:** en-jonk
- **Description:** A block-based website scaffold: Next.js 16 (App Router, React 19, Tailwind v4)

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-09-12] Default shell Node is v17 (nvm). Sanity CLI/Next need >=22.12: always run npm/npx with `PATH=$HOME/.nvm/versions/node/v22.18.0/bin:$PATH`. If studio tsc says `sanity` has no exported member defineType, node_modules is corrupt → `npm ci`.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-09-12] &Jonk CMS = page builder with blocks mirroring `components/site/*` sections; old template blocks (hero, intro, services, ...) get deleted. Chosen by user over singleton-per-page for editor flexibility.
