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

Requires Node 20+. Google fonts are downloaded at build time by `next/font`; Apfel Grotezk ships in the `@fontsource/apfel-grotezk` package, and Clash Display is self-hosted from `src/app/fonts/`. All are served from the app itself.

## Pages

| URL | Page | Ummah page it is modelled on |
| --- | --- | --- |
| `/` | Home: photo hero, bento, the five-segment list, principles, network, story, service tabs, demo, safety, stats, FAQ | [ummah.com](https://www.ummah.com/) |
| `/personal` | Personal | [/minted](https://www.ummah.com/minted) (consumer money app) |
| `/business` | Business (dark page) | [/pay/business-account-card](https://www.ummah.com/pay/business-account-card) |
| `/family` | Family | [/minted/giving](https://www.ummah.com/minted/giving) |
| `/agri` | Agri | [/pay/fx-and-global-transfers](https://www.ummah.com/pay/fx-and-global-transfers) |
| `/assisted` | Assisted | [/pay/phone-payments](https://www.ummah.com/pay/phone-payments) |
| `/about/company` | Company | [/company](https://www.ummah.com/company) |
| `/about/chairmans-message` | Chairman’s Message | [/about](https://www.ummah.com/about) (the “Our story” editorial) |
| `/about/leadership` | Leadership & Board Members | the team section of [/company](https://www.ummah.com/company) |

Each segment page has its own sections and keeps that segment's three journey anchors (for example `/business#collections`), which the nav menus link to.

## Typography

These are the same typefaces Ummah uses, all freely licensed.

| Role | Font |
| --- | --- |
| Headings and body copy | Bricolage Grotesque (Ummah sets its body copy in it too, so Inter was dropped) |
| Buttons and actions | Apfel Grotezk (OFL, Collletttivo) |
| Navigation labels | Zalando Sans |
| Big numerals and eyebrow labels | Oswald |
| Caps labels on the Chairman’s Message page | Clash Display (ITF Free Font License, as on Ummah’s story page) |

## Motion

- **Lenis** smooth scroll (1s duration). It is off under `prefers-reduced-motion` and paused while a dialog is open.
- **motion/react** for everything else, using Ummah's measured values: spring entrances (bounce 0.2, 0.4s), headlines scrubbed from `scale 1.15, y -400px` (-160px on mobile) to rest as the section enters, background zoom from 1.6 to 1, scroll-linked horizontal drift on the wordmark tickers, staggered word reveals, and eased counters.
- **Segment and About pages** add Ummah's product-page motion: the pinned hero with drifting diagonal light, a phone that rises as its section enters (Personal), a pinned phone whose screen follows the journey in view (Personal), a pinned card fan that opens on scroll (Business), a parallax photo band (Business), and words that brighten as you scroll (Chairman’s Message).
- **Pill buttons** (68px radius): a dark disc rises from the bottom centre while the label rolls up, over 0.4s with `cubic-bezier(1, .08, .17, .95)`.
- Under reduced motion, every scrub, zoom, drift, pin and entrance is skipped and content renders in its resting state. The preference is read with `useSyncExternalStore`, so server and client markup match.

## What's in it

- **One route, nine pages**: `src/app/[[...slug]]/page.tsx` statically generates every URL above. Moving between pages uses `history.pushState` with no server round-trip, so colours, logo, favicon and title change in the same frame. Back and forward work, and every URL loads directly. Home and About use Personal coral; Business turns the whole page charcoal.
- **Navigation**: on desktop the nav sits inside each page's hero. Hovering, focusing or pressing Down on a segment opens its menu, clicking it opens its page, and Left/Right move along the bar. **About Us** opens a menu with Company, Chairman’s Message and Leadership & Board Members. On mobile a fixed bar hides on scroll down and opens a full-screen menu with segments, the About Us pages and links for the current page.
- **Interactive phone demo**: Send money, Pay bills, Raast QR and Cash access, three steps each, inside the numbered accordion. A live region announces each step. No real financial action happens.
- **Dialogs** for service details, fees, retail partnerships, login, onboarding, accessibility and Urdu guidance. They stand in for destinations that don't exist yet.

## Project layout

```
src/app/[[...slug]]/page.tsx     one static route for all nine pages
src/app/layout.tsx                fonts, logo <defs>
src/app/fonts/                    Clash Display files and licence
src/app/globals.css               segment and surface tokens, pill hover, reduced-motion rules
src/lib/routes.ts                 page list, paths, titles
src/lib/content.ts                segments, services, demos, info dialogs
src/lib/sections-content.ts       copy for the homepage sections
src/lib/about-content.ts          About Us copy and people, with marked placeholders
src/lib/smooth-scroll.ts          Lenis instance and scroll helpers
src/components/brand/             PayKaro logo (isolated, see below)
src/components/site/site.tsx      page switch
src/components/site/page-*.tsx    one file per segment page
src/components/site/about.tsx     the three About Us pages
src/components/site/blocks.tsx    shared section blocks for those pages
src/components/site/              nav, heroes, homepage sections, motion primitives, demo, dialogs, context
src/components/ui/                shadcn/ui primitives (Base UI variant)
public/brand/                     per-segment logo SVGs (favicons)
public/partners/                  official 1LINK and Raast logos
public/images/                    illustrative photography
```

Shared service, segment and journey wording lives in `src/lib/content.ts`. Page-specific copy for the segment pages sits at the top of each `page-*.tsx` file.

## About Us placeholders

No company history, people or chairman details have been supplied, so none are invented. Every missing item in `src/lib/about-content.ts` is a `ph(field, hint)` call that renders as a dashed box labelled **To be supplied**, and person cards show an empty portrait frame. To publish, replace each `ph(...)` with the real string, set `photo` to a file under `public/`, and add or remove entries in `leadership` and `board`.

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
- **Photos**: `personal.webp`, `business.webp` and `agri.webp` are the illustrative images used on Option 1. The segment pages reuse them with different crops. They are not customer endorsements.
- **Partner logos**, unmodified, from the owners' own sites. 1LINK: `public/partners/1link.png` from https://1link.net.pk/assets/images/logo.png, and the white `1link-white.png` from https://1link.net.pk/assets/images/footer-main-logo.png. 1link.net.pk publishes no SVG, only these 120 px PNGs. Raast: `public/partners/raast.svg` from https://www.sbp.org.pk/assets/images/raast-logo.svg (State Bank of Pakistan). That file is an SVG wrapper around a 1200 × 1304 PNG. Both marks are third-party trademarks; get written permission from 1LINK and SBP / Raast Payments Pakistan before launch.

## Content rules

Only verified services appear: 1LINK domestic transfers (IBFT), bill payments via 1LINK / Raast, Raast QR at participating merchants, Micro ATM with biometric verification, business cash collection, and the retail-network direction. Micro Takaful is always marked as planned. The site has no rates, fees, customer numbers, testimonials, regulatory claims, or live login or onboarding links.

## Deployment

This project is independent of Option 1. Do not reuse Option 1's hosting configuration or project ID to publish it.
