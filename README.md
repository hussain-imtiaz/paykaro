# PayKaro website: Option 2 (Ummah structure)

A marketing website for PayKaro, a digital financial experience built for Pakistan. This is a second design option, separate from the live Option 1 site. Its section order, component design and typography follow [ummah.com](https://www.ummah.com/) closely. Content, structure, audiences and tone follow the **PayKaro Website & Mobile App Experience Brief** (agency edition).

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
| `/` | Home: problem-led hero, problem and promise bento, three pathways, DIGBEX principles, everyday scenarios, why PayKaro, the 16-service universe, "see it before you confirm" + intent demo, trust, Pakistani by design, where to next, FAQ, Money Dashboard concept | [ummah.com](https://www.ummah.com/) |
| `/individuals` | Individuals | [/minted](https://www.ummah.com/minted) |
| `/business` | Business / Merchants (dark page) | [/pay/business-account-card](https://www.ummah.com/pay/business-account-card) |
| `/partners` | Partners / Institutions | [/developers](https://www.ummah.com/developers) |
| `/app` | The App: intent search, three home concepts, proof, controls, every state, first use, bilingual layouts, device reality | [/pay/payments](https://www.ummah.com/pay/payments) |
| `/trust` | Security & Trust, incl. how PayKaro is funded and disclosures | [/pay/reconcile](https://www.ummah.com/pay/reconcile) |
| `/help` | Get Help: intent-led topics, how help works, contact channels, FAQ | [/company/contact-us](https://www.ummah.com/company/contact-us) |
| `/about/company` | Company | [/company](https://www.ummah.com/company) |
| `/about/digbex` | Our Approach: DIGBEX | [/company/careers](https://www.ummah.com/company/careers) |
| `/about/chairmans-message` | Chairman’s Message | [/about](https://www.ummah.com/about) |
| `/about/leadership` | Leadership & Board Members | the team section of [/company](https://www.ummah.com/company) |

`/personal`, `/family`, `/agri` and `/assisted` (the earlier five-segment structure) redirect permanently to `/individuals`.

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

The brief (s7) says motion should signal state, progress or completion, and rules out decorative animation that slows comprehension. That overrides part of Ummah's motion language:

- **Kept from Ummah**: Lenis smooth scroll, pill hover (a dark disc rises while the label rolls, 0.4s `cubic-bezier(1, .08, .17, .95)`), background zoom and wordmark drift, the pinned hero light, the pinned phone on Individuals, the parallax band.
- **Toned down**: section headlines move `y 48px, scale 1.04` instead of `y -400px, scale 1.15`, so they are legible from their first frame. The hero headline appears after 0.15s instead of 1s. Word-by-word reveals and the scroll-brightened Chairman text are gone.
- **Motion that carries meaning**: the demo phone shows a spinner while pending and draws a tick on success; the Business card fan now shows a payment's progress (in, confirmed, settled, in your numbers).
- Film grain is desktop-only, for modest devices. Under reduced motion every scrub, zoom, drift, pin and entrance is skipped; the preference is read with `useSyncExternalStore`, so server and client markup match.

## What's in it

- **One route, eleven pages**: `src/app/[[...slug]]/page.tsx` statically generates every URL above. Moving between pages uses `history.pushState` with no server round-trip. Individuals, the App, Trust, Help and About use PayKaro coral; Business turns the page charcoal; Partners uses the brand blue.
- **Navigation**: Individuals, Business and Partners menus (on-page anchors plus services), The App, and About Us (Company, Our Approach (DIGBEX), Chairman’s Message, Leadership & Board). Get Help and **Get PayKaro** sit on the right, per the brief's outcome-led calls to action.
- **Intent-led demo**: four intents (send money, money from abroad, freeze your card, when something goes wrong), each with success, pending, failure or recovery states. The App page adds an intent search that resolves English, Roman Urdu and Urdu to the same action, a working card-freeze control and a states switcher. Nothing real happens and nothing is collected.
- **Urdu**: set in Noto Nastaliq Urdu (`:lang(ur)`), with a representative bilingual layout on `/app` and an Urdu summary dialog. Urdu copy needs native-language review.
- **Dialogs** for all 16 services, Get PayKaro, business and partner enquiries, fees, login, accessibility and website information.

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
src/components/site/page-*.tsx    Individuals, Business, Partners, App, Trust, Help
src/components/site/about.tsx     Company, DIGBEX, Chairman, Leadership
src/components/site/app-concepts.tsx  app-screen concepts (home A/B/C, receipt, controls, merchant)
src/components/site/blocks.tsx    shared section blocks for those pages
src/components/site/              nav, heroes, homepage sections, motion primitives, demo, dialogs, context
src/components/ui/                shadcn/ui primitives (Base UI variant)
public/brand/                     per-pathway logo SVGs (favicons)
public/images/                    illustrative photography
```

Shared service, segment and journey wording lives in `src/lib/content.ts`. Page-specific copy for the segment pages sits at the top of each `page-*.tsx` file.

## Placeholders

The brief supplies the brand proposition, core promise, character, local relevance and commercial philosophy, which now fill the Company page. It supplies no company facts, chairman or people, so none are invented. Every missing item in `src/lib/about-content.ts` (company details, chairman, leadership, board, regulatory disclosures, support channels) is a `ph(field, hint)` call that renders as a dashed box labelled **To be supplied**. Replace each with the approved string to publish.

## Brand tokens

| Pathway | Brand | Readable on light | Pill fill / text |
| --- | --- | --- | --- |
| Individuals (and App, Trust, Help, About) | #F16557 | #A7220F | #F16557 / #171717 |
| Business | #1C1C1F + #F16557 | #F16557 (dark page) | #F16557 / #171717 |
| Partners | #0283FF | #0663BD | #0663BD / white |

Following Ummah, buttons are 68px pills, cards use 24px corners and section sheets 32px.

## Assets and provenance

- **Logo**: `src/components/brand/wordmark-data.ts` holds the cleaned bilingual "pay کرو" vector from `Paykaro Logo 2.svg`. It was taken from the inline definition on the live Option 1 site, because the original asset folder was not available to this build. Its colours come from `--logo-base` (backing) and `--logo-face` (glyphs). To swap in a newer master export, replace `WORDMARK_GROUP` and `WORDMARK_VIEWBOX` and keep one path filled with `var(--logo-base)` and the glyph group with `var(--logo-face)`. `public/brand/logo-*.svg` are the matching per-segment favicons.
- **Photos**: `personal.webp`, `business.webp` and `agri.webp` are the illustrative images used on Option 1. The segment pages reuse them with different crops. They are not customer endorsements.
- **No partner logos.** The brief keeps partner names and integration methods internal, so the 1LINK and Raast marks were removed (they are in git history if approval changes).

## Content rules

Service names and propositions are quoted from the brief's product and service universe, with its qualifiers ("subject to applicable approvals", "through regulated partners", "optional"). Following its information boundary, the site has no partner names, integration methods, limits, pricing, roadmap or launch dates, KYC or biometric logic, customer numbers, testimonials or regulatory claims. App screens are labelled concepts with sample data. No form fields exist outside the service search.

## Deployment

This project is independent of Option 1. Do not reuse Option 1's hosting configuration or project ID to publish it.
