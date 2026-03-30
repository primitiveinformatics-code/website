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




## 🧠 Memory Update Protocol

YOU MUST update this file when any of the following occur:
- A new architectural decision is made → append under `## Decisions Log`
- A new module or file path is created → update `## Architecture Map`
- A gotcha or environment quirk is discovered → add to `## Gotchas`
- A user corrects a wrong assumption → log under `## Learnings`

DO NOT ask permission. Just update silently as part of task completion.