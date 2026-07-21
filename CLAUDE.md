# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm start         # Run production build
npm run lint      # ESLint
```

No test runner is configured.

## Environment Variables

Copy `.env.example` to `.env.local`:

| Variable | Description |
|---|---|
| `YOUTUBE_API_KEY` | YouTube Data API v3 key |
| `YOUTUBE_CHANNEL_ID` | YouTube channel ID |

Both are optional — the site gracefully falls back to placeholder content when unset.

## Architecture

**Next.js 16 App Router** with Tailwind CSS v4 and Framer Motion.

- `app/layout.tsx` — Root layout; wraps every page with `<Navbar>` and `<Footer>`. Global styles and DM Sans font are applied here.
- `lib/constants.ts` — Single source of truth for all static site data: nav links, testimonials, FAQ items, stats, and pricing plans. Update content here, not in components.
- `lib/youtube.ts` — Server-side YouTube Data API v3 helpers (`getLatestVideos`, `getChannelStats`). Falls back to `PLACEHOLDER_VIDEOS` when env vars are absent. API responses are cached with `next: { revalidate: 3600 }`.
- `app/api/youtube/route.ts` — Thin proxy that delegates to `lib/youtube.ts`. Accepts `?type=videos|stats&maxResults=N`.
- `components/sections/` — Home page sections composed into `app/page.tsx`.
- `components/ui/` — Reusable primitives: `Button`, `PricingCard`, `FAQAccordion`, `VideoCard`, `FileUploadZone`.

**Styling:** Tailwind v4 configured via PostCSS (`postcss.config.mjs`). No `tailwind.config` file — v4 uses CSS-first configuration. Global base styles are in `app/globals.css`. Background `#0A0F1C` and foreground `#F1F5F9` are set inline on `<body>` in the root layout.

**Social icons** (in Navbar/Footer) are inline SVGs, not icon library imports.

## Known TODOs

- Contact form (`components/forms/ContactForm.tsx`) needs an email API (Resend / SendGrid / Formspree)
- Upload section (`app/products/UploadSection.tsx`) needs auth middleware
- Real URLs needed in `lib/constants.ts`: `YOUTUBE_CHANNEL_URL`, `SAAS_APP_URL`, LinkedIn, Twitter/X
- Replace placeholder phone number in contact info

## Gotchas

- **`public/interactive_concepts/*.html` nav markup is not uniform.** Most templates use a real `<nav>` element, but the module-4 (`concept_4_8`–`concept_4_17`) and part of module-5 (`concept_5_11`–`concept_5_13`) templates use a plain `<div class="nav">` instead. Any script that inserts/repositions per-page widgets (audio player, etc.) by matching `</nav>` must fall back to `<div class="nav">...</div>` for those files or the insertion silently no-ops.
- **Root `interactive_concepts/` vs `public/interactive_concepts/` are out of sync.** The root copy is missing the `<audio>` player entirely; only the `public/` copy (the one actually served) has been patched. Don't assume the two directories are mirrors — always check/edit `public/interactive_concepts/` for anything user-facing.
- The per-concept audio player (added by `scripts/add-audio-players.js`) was fixed via `scripts/fix-audio-player-position.js` to render as an in-flow `.page-audio-player` bar directly under the nav (left-aligned) instead of a `position: fixed` box — 55 pages had it bottom-right, 9 had it awkwardly inline in the nav-arrows slot. Any future audio-player tooling should preserve the `.page-audio-player` shape rather than reintroducing a fixed-position variant.
- The Main Course login gate (`middleware.ts` + `interactive_content_users` table + Admin Dashboard "Course Users" tab) was verified working end-to-end (2026-07-21): unauthenticated requests to `main-course.html` and `concept_2-5_*` correctly 307-redirect to `/interactive-content/login`; pre-course pages stay public. No code changes were needed for this.



## 🧠 Memory Update Protocol

YOU MUST update this file when any of the following occur:
- A new architectural decision is made → append under `## Decisions Log`
- A new module or file path is created → update `## Architecture Map`
- A gotcha or environment quirk is discovered → add to `## Gotchas`
- A user corrects a wrong assumption → log under `## Learnings`

DO NOT ask permission. Just update silently as part of task completion.