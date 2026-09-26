# PayKaro website: Option 2 (Ummah structure)

A marketing website for PayKaro, a Pakistani banking and digital-services brand. This is a second design option, separate from the live Option 1 site. Its section order, component design, typography and motion follow [ummah.com](https://www.ummah.com/) closely, while the brand, audiences and service facts stay PayKaro's own.

It is an informational site only. It does not open accounts, log anyone in, process payments or collect personal or banking details.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:43127
```

```bash
npm run build && npm start   # production build on the same port
npm run lint
```

Requires Node 20+. Google fonts are downloaded at build time by `next/font`; Apfel Grotezk ships in the `@fontsource/apfel-grotezk` package. All are served from the app itself.

## Typography

These are the same typefaces Ummah uses, all freely licensed.

| Role | Font |
| --- | --- |
| Headings and body copy | Bricolage Grotesque (Ummah sets its body copy in it too, so Inter was dropped) |
| Buttons and actions | Apfel Grotezk (OFL, Collletttivo) |
| Navigation labels | Zalando Sans |
| Big numerals and eyebrow labels | Oswald |

## Page structure

Sections run in Ummah's order: full-bleed hero with the nav inside it, a bento grid under a scroll-scrubbed headline, three journey cards, five dark numbered principle cards, a neighbourhood-network split, a "Why PayKaro" story with counters, a dark tabbed service list, a "Know every detail" checklist with the colour-stepped demo accordion, safety cards, a "Local by default" stats band with zoom background and wordmark ticker, a "What's next" list with a sticky FAQ, an app-concept preview, and the footer with a second ticker and segment colour stripes.

## Motion

- **Lenis** smooth scroll (1s duration). It is off under `prefers-reduced-motion` and paused while a dialog is open.
- **motion/react** for everything else, using Ummah's measured values: spring entrances (bounce 0.2, 0.4s), headlines scrubbed from `scale 1.15, y -400px` (-160px on mobile) to rest as the section enters, background zoom from 1.6 to 1, scroll-linked horizontal drift on the wordmark tickers, staggered word reveals, and eased counters.
- **Pill buttons** (68px radius): a dark disc rises from the bottom centre while the label rolls up, over 0.4s with `cubic-bezier(1, .08, .17, .95)`.
- Under reduced motion, every scrub, zoom, drift and entrance is skipped and content renders in its resting state.

## What's in it

- **Five segments, five URLs**: `/` (Personal), `/business`, `/family`, `/agri`, `/assisted`. Clicking a segment switches immediately using `history.pushState`, with no server round-trip. Colours, logo, favicon, title, hero photo and all segment content change in the same frame. Back and forward work, and every URL loads directly.
- **Navigation**: on desktop the nav sits inside the hero; hovering, focusing or pressing Down on a segment opens its mega menu, and Left/Right move between segments. On mobile a fixed bar hides on scroll down, reappears on scroll up, and opens a full-screen menu.
- **Interactive phone demo**: Send money, Pay bills, Raast QR and Cash access, three steps each, inside the numbered accordion. A live region announces each step. No real financial action happens.
- **Dialogs** for service details, fees, retail partnerships, login, onboarding, accessibility and Urdu guidance. They stand in for destinations that don't exist yet.

## Project layout

```
src/app/[[...segment]]/page.tsx   one static route for all five segments
src/app/layout.tsx                fonts, logo <defs>
src/app/globals.css               segment and surface tokens, pill hover, reduced-motion rules
src/lib/content.ts                segments, services, demos, FAQ, info dialogs
src/lib/sections-content.ts       copy for the Ummah-mapped sections
src/lib/smooth-scroll.ts          Lenis instance and scroll helpers
src/components/brand/             PayKaro logo (isolated, see below)
src/components/site/              nav, hero, sections, motion primitives, demo, dialogs, context
src/components/ui/                shadcn/ui primitives (Base UI variant)
public/brand/                     per-segment logo SVGs (favicons)
public/images/                    illustrative photography
```

Change wording in `src/lib/content.ts` and `src/lib/sections-content.ts`, not in components.

## Brand tokens

| Segment | Brand | Readable on light | Pill fill / text |
| --- | --- | --- | --- |
| Personal | #F16557 | #A7220F | #F16557 / #171717 |
| Business | #1C1C1F + #F16557 | #F16557 (dark page) | #F16557 / #171717 |
| Family | #0283FF | #0663BD | #0663BD / white |
| Agri | #00D164 | #00652F | #00D164 / #171717 |
| Assisted | #FFC409 | #795506 | #FFC409 / #171717 |

Following Ummah, buttons are 68px pills, cards use 24px corners and section sheets 32px. Segment colours never transition, so switches are instant.

## Assets and provenance

- **Logo**: `src/components/brand/wordmark-data.ts` holds the cleaned bilingual "pay کرو" vector from `Paykaro Logo 2.svg`. It was taken from the inline definition on the live Option 1 site, because the original asset folder was not available to this build. Its colours come from `--logo-base` (backing) and `--logo-face` (glyphs). To swap in a newer master export, replace `WORDMARK_GROUP` and `WORDMARK_VIEWBOX` and keep one path filled with `var(--logo-base)` and the glyph group with `var(--logo-face)`. `public/brand/logo-*.svg` are the matching per-segment favicons.
- **Photos**: `personal.webp`, `business.webp` and `agri.webp` are the illustrative images used on Option 1. Family and Assisted reuse them with different crops. They are not customer endorsements.

## Content rules

Only verified services appear: 1LINK domestic transfers (IBFT), bill payments via 1LINK / Raast, Raast QR at participating merchants, Micro ATM with biometric verification, business cash collection, and the retail-network direction. Micro Takaful is always marked as planned. The site has no rates, fees, customer numbers, testimonials, regulatory claims, or live login or onboarding links.

## Deployment

This project is independent of Option 1. Do not reuse Option 1's hosting configuration or project ID to publish it.
