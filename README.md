# PayKaro website: Option 2 (Ummah-inspired)

A marketing website for PayKaro, a Pakistani banking and digital-services brand. This is a second design option, separate from the live Option 1 site. Its layout, motion and component language take cues from [ummah.com](https://www.ummah.com/), while the brand, audiences and service facts stay PayKaro's own.

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

Requires Node 20+. Fonts (Inter Tight, Inter) are downloaded at build time by `next/font` and served from the app itself.

## What's in it

- **Five segments, five URLs**: `/` (Personal), `/business`, `/family`, `/agri`, `/assisted`. Clicking a segment switches immediately using `history.pushState`, with no server round-trip. Colors, logo, favicon, title, hero photo and all segment content change in the same frame. Back and forward work, and every URL loads directly.
- **Segment-specific sections**: each segment has three unique journeys with anchors (for example `/family#send-money-home`), its own services, bento content, demo default and mega-menu content.
- **Header**: single-row segment links. Hovering or focusing a link opens that segment's menu, drawn in that segment's colors even when viewed from another segment. Business uses a dark charcoal header and a dark page. On mobile, a full-screen menu shows color-coded segment cards and the current segment's sections.
- **Abstract app concepts**: 11 phone-screen compositions across the 15 journeys, segment-colored and labeled "App concept". They are illustrations, not PayKaro's actual app design.
- **Interactive phone demo**: Send money, Pay bills, Raast QR and Cash access, three steps each. Tabs support the arrow keys and a live region announces each step. No real financial action happens.
- **Dialogs** for service details, fees, retail partnerships, login, onboarding, accessibility, website information, search and Urdu guidance. They stand in for destinations that don't exist yet.

## Project layout

```
src/app/[[...segment]]/page.tsx   one static route for all five segments
src/app/layout.tsx                fonts, logo <defs>, reveal-on-scroll bootstrap
src/app/globals.css               segment and theme tokens, motion, reduced-motion rules
src/lib/content.ts                all copy: segments, journeys, services, demos, FAQ, info dialogs
src/components/brand/             PayKaro logo (isolated, see below)
src/components/site/              header, hero, sections, concepts, demo, dialogs, context
src/components/ui/                shadcn/ui primitives (Base UI variant)
public/brand/                     per-segment logo SVGs (favicons)
public/images/                    illustrative photography
```

All copy lives in `src/lib/content.ts`. Change wording there, not in components.

## Brand tokens

| Segment | Brand | Readable on light | Button fill / text | Logo backing / glyphs |
| --- | --- | --- | --- | --- |
| Personal | #F16557 | #A7220F | #F16557 / navy | #F16557 / white |
| Business | #1C1C1F + #F16557 | #F16557 (dark page) | #F16557 / navy | #F16557 / white |
| Family | #0283FF | #0663BD | #0663BD / white | #0663BD / white |
| Agri | #00D164 | #00652F | #00D164 / navy | #00D164 / navy |
| Assisted | #FFC409 | #795506 | #FFC409 / navy | #FFC409 / navy |

Navy is #191E30. Buttons, tabs and inputs share one 4px radius. Cards use 20px and section panels 32px. Segment colors never transition, so switches are instant.

## Assets and provenance

- **Logo**: `src/components/brand/wordmark-data.ts` holds the cleaned bilingual "pay کرو" vector from `Paykaro Logo 2.svg`. It was taken from the inline definition on the live Option 1 site, because the original asset folder was not available to this build. Its colors come from `--logo-base` (backing) and `--logo-face` (glyphs). To swap in a newer master export, replace `WORDMARK_GROUP` and `WORDMARK_VIEWBOX` and keep one path filled with `var(--logo-base)` and the glyph group with `var(--logo-face)`. `public/brand/logo-*.svg` are the matching per-segment favicons.
- **Photos**: `personal.webp`, `business.webp` and `agri.webp` are the illustrative images used on Option 1. Family and Assisted reuse them with different crops. They are not customer endorsements.

## Content rules

Only verified services appear: 1LINK domestic transfers (IBFT), bill payments via 1LINK / Raast, Raast QR at participating merchants, Micro ATM with biometric verification, business cash collection, and the retail-network direction. Micro Takaful is always marked as planned. The site has no rates, fees, customer numbers, testimonials, regulatory claims, or live login or onboarding links.

## Deployment

This project is independent of Option 1. Do not reuse Option 1's hosting configuration or project ID to publish it.
