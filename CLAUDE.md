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
| `INTERACTIVE_CONTENT_JWT_SECRET` | Signs/verifies the Main Course login session (`ic_session` cookie). Must be a real random value in production — `proxy.ts` and the login route throw at runtime if it's missing/placeholder there. Also listed in `next.config.ts`'s `env` block (see Gotchas) so it survives Amplify's build-time-only env var injection. |

`YOUTUBE_API_KEY`/`YOUTUBE_CHANNEL_ID` are optional — the site gracefully falls back to placeholder content when unset. `INTERACTIVE_CONTENT_JWT_SECRET` is required in production.

## Architecture

**Next.js 16 App Router** with Tailwind CSS v4 and Framer Motion.

- `app/layout.tsx` — Root layout; wraps every page with `<Navbar>` and `<Footer>`. Global styles and DM Sans font are applied here.
- `lib/constants.ts` — Single source of truth for all static site data: nav links, testimonials, FAQ items, stats, and pricing plans. Update content here, not in components.
- `lib/youtube.ts` — Server-side YouTube Data API v3 helpers (`getLatestVideos`, `getChannelStats`). Falls back to `PLACEHOLDER_VIDEOS` when env vars are absent. API responses are cached with `next: { revalidate: 3600 }`.
- `app/api/youtube/route.ts` — Thin proxy that delegates to `lib/youtube.ts`. Accepts `?type=videos|stats&maxResults=N`.
- `components/sections/` — Home page sections composed into `app/page.tsx`.
- `components/ui/` — Reusable primitives: `Button`, `PricingCard`, `FAQAccordion`, `VideoCard`, `FileUploadZone`.
- `proxy.ts` (repo root, Next 16's renamed `middleware.ts` convention) — gates `/interactive_concepts/*` requests by matcher, redirecting unauthenticated requests to `/interactive-content/login`.
- `lib/interactiveContentAuth.ts` — shared session helper (cookie name, JWT sign/verify, secret resolution) used by both `proxy.ts` and `app/interactive_concepts/[...path]/route.ts`; throws in production if `INTERACTIVE_CONTENT_JWT_SECRET` isn't set to a real value.
- `app/interactive_concepts/[...path]/route.ts` — serves the 59 gated Main Course HTML files from `private-content/interactive_concepts/` (outside `public/`), re-checking the session itself (defense in depth, not just relying on `proxy.ts`).

**Styling:** Tailwind v4 configured via PostCSS (`postcss.config.mjs`). No `tailwind.config` file — v4 uses CSS-first configuration. Global base styles are in `app/globals.css`. Background `#0A0F1C` and foreground `#F1F5F9` are set inline on `<body>` in the root layout.

**Social icons** (in Navbar/Footer) are inline SVGs, not icon library imports.

## Known TODOs

- Contact form (`components/forms/ContactForm.tsx`) needs an email API (Resend / SendGrid / Formspree)
- Upload section (`app/products/UploadSection.tsx`) needs auth middleware
- Real URLs needed in `lib/constants.ts`: `YOUTUBE_CHANNEL_URL`, `SAAS_APP_URL`, LinkedIn, Twitter/X
- Replace placeholder phone number in contact info

## Gotchas

- **Gated Main Course content lives in `private-content/interactive_concepts/`, NOT `public/interactive_concepts/`.** As of 2026-07-23, `main-course.html` and all `concept_2_*`–`concept_5_*.html` (59 files) were moved out of `public/` into `private-content/interactive_concepts/` and are served exclusively by `app/interactive_concepts/[...path]/route.ts`, a dynamic Route Handler that checks the session (via `lib/interactiveContentAuth.ts`) before reading the file from disk. Only `concept_1_1`–`concept_1_6`, `index.html`, and `pre-course.html` (free/pre-course content) remain in `public/interactive_concepts/` as real static files. **Do not move gated files back into `public/`** — see the login-gate root-cause note below for why. External URLs are unchanged (`/interactive_concepts/main-course.html` etc.), so links in `ProductCards.tsx`/`InteractiveLearningShowcase.tsx`/the login page did not need updates.
- **`*.html` nav markup is not uniform.** Most templates use a real `<nav>` element, but the module-4 (`concept_4_8`–`concept_4_17`) and part of module-5 (`concept_5_11`–`concept_5_13`) templates use a plain `<div class="nav">` instead. Any script that inserts/repositions per-page widgets (audio player, etc.) by matching `</nav>` must fall back to `<div class="nav">...</div>` for those files or the insertion silently no-ops. Note these specific files now live in `private-content/interactive_concepts/`, not `public/`.
- **Root `interactive_concepts/` (repo root, not under `public/`) is dead legacy content.** It's a leftover from a pre-Next.js/Apache-hosted version of this content (still tracked in git, includes a stray `.htaccess`) and is never served by Next.js since it isn't under `public/`. Not a live routing concern, but don't confuse it with `public/interactive_concepts/` or `private-content/interactive_concepts/` when editing.
- The per-concept audio player (added by `scripts/add-audio-players.js`) was fixed via `scripts/fix-audio-player-position.js` to render as an in-flow `.page-audio-player` bar directly under the nav (left-aligned) instead of a `position: fixed` box. Both scripts still hardcode `public/interactive_concepts` paths — if re-run in the future, update them to target `private-content/interactive_concepts/` for the 59 gated files.
- **Root cause of the Main Course login gate not blocking access (found 2026-07-23):** the previous "verified working end-to-end (2026-07-21)" note below was only ever true for local `npm run dev`. In production the app deploys to **AWS Amplify Hosting (Gen 1, WEB_COMPUTE)**, whose own docs list "running middleware on static assets" as unsupported — files under `public/` are routed straight from CloudFront to S3, never invoking the compute layer where `middleware`/`proxy` runs, so the gate silently never executed for `public/interactive_concepts/main-course.html` etc. Fixed by moving gated files out of `public/` entirely (see above) so they're only reachable via a dynamic Route Handler, which always goes through `proxy.ts` regardless of hosting platform. A second, independent issue was also fixed: `INTERACTIVE_CONTENT_JWT_SECRET` was never added to `next.config.ts`'s `env` build-time-baking block (unlike `ADMIN_TOKEN`/`DATABASE_URL`, added there per commit `6640651` specifically because Amplify Gen 1 WEB_COMPUTE doesn't inject console/branch env vars into the SSR Lambda runtime) — production was silently signing/verifying sessions with the hardcoded fallback secret in source. `lib/interactiveContentAuth.ts` now throws at runtime in production if a real secret isn't set, instead of silently falling back.



## 🧠 Memory Update Protocol

YOU MUST update this file when any of the following occur:
- A new architectural decision is made → append under `## Decisions Log`
- A new module or file path is created → update `## Architecture Map`
- A gotcha or environment quirk is discovered → add to `## Gotchas`
- A user corrects a wrong assumption → log under `## Learnings`

DO NOT ask permission. Just update silently as part of task completion.