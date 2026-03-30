# Primitive Informatics

A production-ready website for Primitive Informatics — an education technology company helping working professionals upskill through AI-powered mock interviews and expert YouTube content.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** DM Sans (Google Fonts)
- **Deployment:** Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, value props, mock interview showcase, YouTube showcase, stats, testimonials, pricing, and CTA |
| `/products` | Products hub with SaaS platform, YouTube channel, and content library cards + admin upload section |
| `/contact` | Contact form, contact info, social links, and FAQ accordion |
| `/api/youtube` | Server-side YouTube Data API v3 proxy |

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `YOUTUBE_API_KEY` | YouTube Data API v3 key from [Google Cloud Console](https://console.developers.google.com/) |
| `YOUTUBE_CHANNEL_ID` | Your YouTube channel ID (find it at youtube.com/account_advanced) |

> If these are not set, the site falls back to placeholder video content gracefully.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `YOUTUBE_API_KEY`
   - `YOUTUBE_CHANNEL_ID`
4. Deploy — Vercel auto-detects Next.js configuration

## TODO Items

- [ ] Connect contact form to email API (Resend / SendGrid / Formspree) — see `components/forms/ContactForm.tsx`
- [ ] Gate the upload section behind auth middleware — see `app/products/UploadSection.tsx`
- [ ] Add actual YouTube channel URL in `lib/constants.ts`
- [ ] Add LinkedIn and Twitter/X URLs in `lib/constants.ts`
- [ ] Replace placeholder phone number with real contact info

## Project Structure

```
primitive-informatics/
├── app/
│   ├── layout.tsx              # Root layout with Navbar + Footer
│   ├── page.tsx                # Home page
│   ├── products/               # Products page
│   ├── contact/                # Contact page
│   └── api/youtube/route.ts    # YouTube API proxy
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── ui/                     # Button, PricingCard, FAQAccordion, VideoCard, FileUploadZone
│   ├── sections/               # Home page sections
│   └── forms/                  # ContactForm
├── lib/
│   ├── constants.ts            # Site-wide constants, data
│   └── youtube.ts              # YouTube API helpers
└── public/                     # Static assets
```



cd c:/coding/Primitive_website/primitive-informatics && npm run dev