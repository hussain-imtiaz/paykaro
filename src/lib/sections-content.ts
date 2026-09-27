import type { InfoKey } from "./content";

/** Brief §1: brand proposition. */
export const proposition = {
  summary:
    "PayKaro is a world-class digital financial experience built specifically for Pakistan. It is not a conventional bank app compressed onto a phone, and it is not a crowded wallet catalogue.",
  everyday:
    "Everyday money movement, payments and financial tasks should feel immediate, understandable, self-service and human, without depending on branches or routine manual intervention.",
  character: "Premium but accessible; modern without being futuristic for its own sake; confident, calm and trustworthy.",
  local: "Pakistani context, language, behaviours and everyday use cases, executed to an international design standard.",
};

/** Brief §1: core promise, split into its four parts. */
export const promise = [
  { title: "Reach it quickly", copy: "Get to what you came to do, without hunting through menus." },
  { title: "Understand what’s happening", copy: "Every status, decision and fee in plain language." },
  { title: "Stay in control", copy: "Routine controls are yours, immediate and reversible where permitted." },
  { title: "Know the next step", copy: "Always a clear next action, even when something goes wrong." },
] as const;

/** Brief §4: DIGBEX (Digital Banking Experience) principles. */
export const digbex = [
  { icon: "target", title: "Intent before catalogue", copy: "Start with what the customer wants to do, not a wall of product icons." },
  { icon: "copy", title: "Never ask twice", copy: "Information already known should not be repeatedly requested." },
  { icon: "focus", title: "Relevance over interruption", copy: "Useful next actions belong in context. No promotional clutter or intrusive marketing." },
  { icon: "toggle", title: "Customer control", copy: "Routine controls are self-service, immediate and reversible wherever permitted." },
  { icon: "signpost", title: "No dead ends", copy: "Errors explain what happened and what the customer can do next." },
  { icon: "zap", title: "Automation first", copy: "Human assistance is for cases that genuinely need it, not the default operating model." },
  { icon: "eye", title: "Explainability", copy: "Recommendations, decisions and statuses are understandable rather than opaque." },
  { icon: "gauge", title: "Speed is part of design", copy: "Fast response, short journeys and low cognitive load are product requirements." },
  { icon: "languages", title: "Inclusive by design", copy: "English and Urdu both feel native. Designed for varied literacy, accessibility and lower-end devices." },
  { icon: "badge", title: "Trust through clarity", copy: "Privacy, consent, fees, status and proof of transaction are visible and understandable." },
] as const;

/** Brief §5: mobile app ideology. */
export const appPrinciples = [
  { title: "Home", copy: "Simple, personal and action-oriented. Your balance stays as an anchor; the rest puts your likely next actions first, not a fixed product grid." },
  { title: "Navigation", copy: "Search and natural-language intent take you straight to actions. Routine tasks aren’t buried in menus." },
  { title: "Personalisation", copy: "Contextual and useful, never intrusive. Relevant actions surface without turning the app into an advertising feed." },
  { title: "Transactions", copy: "Amount, counterparty, applicable fee, confirmation and shareable proof, clearly. Motion shows progress and status, not decoration." },
  { title: "Controls", copy: "Card, security, consent and partner-access controls feel immediate and understandable." },
  { title: "Failure states", copy: "No generic “something went wrong”. A plain-language reason where possible, and a clear recovery path." },
  { title: "Language", copy: "Urdu is a first-class design system, not an English layout translated at the end, with transliteration built into search." },
  { title: "Device reality", copy: "Strong legibility, generous touch targets, restrained animation and good performance on mainstream and lower-cost Android phones." },
] as const;

/** Brief §8: benchmark disciplines ("Winning the Phone"). */
export const benchmark = [
  { title: "One screen, one job", copy: "The main thing you came to do is obvious. Everything else lives one layer deeper." },
  { title: "Onboarding is the product", copy: "From download to first successful use: fewer screens, fewer repeated questions, less waiting." },
  { title: "Context, not banners", copy: "Discovery appears when it’s relevant to what you’re doing, not as a permanent wall of promotions." },
  { title: "Trust is designed", copy: "Status, confirmation, charges, security controls and recovery routes, visible when they matter." },
  { title: "The home screen learns", copy: "Frequent and timely actions rise. The full catalogue stays discoverable without taking over." },
  { title: "Insight leads to action", copy: "Not just what happened, but a clear, useful thing to do about it." },
  { title: "Designed for repeat use", copy: "Familiar actions get faster, quieter and more effortless over time." },
] as const;

/** Brief §11: the five questions every concept must pass. */
export const fiveQuestions = [
  "Is the next action obvious?",
  "Is the screen quieter than a conventional bank app?",
  "Does it build trust without explanation?",
  "Does it feel Pakistani without becoming visually stereotypical?",
  "Would a customer choose to open it again tomorrow?",
] as const;

/** Brief §3: revenue families, external descriptions only. */
export const revenueFamilies = [
  { title: "Treasury and balances", copy: "Income generated within the permitted safeguarding and treasury framework." },
  { title: "Cards", copy: "Card issuance and renewal, and payment-network economics." },
  { title: "Merchant and business acceptance", copy: "Income linked to merchant and business payment acceptance, subject to applicable rules." },
  { title: "Remittance partnerships", copy: "Contractual revenue share from eligible inward-remittance arrangements." },
  { title: "Business transactions and disbursements", copy: "Fees paid by billers, employers, businesses and institutions for enabled services." },
  { title: "Optional subscriptions and alliances", copy: "Premium features and selected partner propositions that customers choose." },
  { title: "Platform and institutional services", copy: "Business-facing digital services, APIs and platform propositions." },
  { title: "Partner distribution", copy: "Commissions or revenue share on eligible partner products and services." },
] as const;

export const commercialPhilosophy = {
  line: "Core consumer money movement should not be monetised through friction.",
  follow: "The broader ecosystem funds the model.",
};

/** Everyday scenarios for the homepage: outcomes, not product codes (brief §6). */
export const scenarios = [
  { icon: "remit", title: "Money from family abroad", copy: "See it on its way, know when it lands, and decide what to do with it next.", service: "remittance" },
  { icon: "watch", title: "Paying at the counter", copy: "Tap a card or a supported wearable, and see the confirmation straight away.", service: "wearpay" },
  { icon: "card", title: "A card goes missing", copy: "Freeze it yourself in a moment. Unfreeze it just as fast when it turns up.", service: "cards" },
] as const;

export const scenarioNotices = [
  { title: "Money from abroad", sub: "Received in your wallet", rows: [["Status", "Received"], ["Next", "Send some on"], ["Proof", "Ready to share"]] },
  { title: "Card frozen", sub: "Took effect instantly", rows: [["Card", "•••• 4821"], ["Payments", "Paused"], ["Undo", "Any time"]] },
  { title: "Payment confirmed", sub: "Contactless, with a wearable", rows: [["Amount", "Shown"], ["Fee", "Shown before paying"], ["Receipt", "Saved"]] },
] as const;

export const metrics = [
  { value: 16, label: "Services", sub: "In the PayKaro universe" },
  { value: 3, label: "Pathways", sub: "Individuals, Business, Partners" },
  { value: 2, label: "Native languages", sub: "English and Urdu" },
  { value: 0, label: "Credentials asked", sub: "On this website, ever" },
] as const;

export const stats = [
  { value: 10, suffix: "", title: ["DIGBEX", "principles"], copy: "One customer-experience philosophy behind every screen, from intent to proof." },
  { value: 7, suffix: "", title: ["Benchmark", "disciplines"], copy: "Measured against the best app on your phone, not the average bank app." },
  { value: 5, suffix: "", title: ["Questions every", "screen must pass"], copy: "Obvious, quiet, trustworthy, Pakistani, and worth opening tomorrow." },
  { value: 2, suffix: "", title: ["Languages,", "both first-class"], copy: "English and Urdu designed together, not translated at the end." },
] as const;

export const trustItems = [
  { title: "Your details stay yours", copy: "Never share your PIN, password or one-time code. This website never asks for them." },
  { title: "See it before you confirm", copy: "Amount, who you’re paying and any applicable fee, on one screen." },
  { title: "Proof of every transaction", copy: "A clear confirmation and a receipt you can share." },
  { title: "Consent you control", copy: "Privacy, consent and partner access visible and understandable." },
] as const;

export const faqs: { q: string; a: string; info?: InfoKey; link?: string }[] = [
  { q: "What is PayKaro?", a: "PayKaro is a digital financial experience built for Pakistan. It helps you do what you came to do quickly, understand what is happening, stay in control and always know the next step." },
  { q: "Who is PayKaro for?", a: "Individuals, businesses and merchants, and partners and institutions. Each has its own pathway on this website." },
  { q: "What can I do with PayKaro?", a: "Receive, hold, pay and move money with PayKaro Wallet; use physical and virtual cards with digital controls; receive eligible remittances from family abroad; see your spending in Money Dashboard; and, through partners, save and invest. Businesses get payments, collections and analytics." },
  { q: "How does PayKaro make money?", a: "PayKaro’s commercial philosophy is that core consumer money movement should not be monetised through friction. The broader ecosystem funds the model: cards, merchant acceptance, remittance partnerships, business services, platform services, partner distribution and optional subscriptions.", link: "/trust#how-we-earn" },
  { q: "Will I see fees before I pay?", a: "Yes. Any applicable fee is shown with the amount and the recipient before you confirm. A schedule of charges isn’t published on this website yet.", info: "fees" },
  { q: "Is PayKaro available in Urdu?", a: "The app is designed so English and Urdu both feel native, with Urdu treated as a first-class design system and transliteration built into search." },
  { q: "Can I open an account or log in on this website?", a: "No. This website explains PayKaro. Accounts, login and payments will be in the official app." },
  { q: "Does this website collect my details?", a: "No. It never asks for your account number, CNIC, password, PIN or one-time code, and the walkthroughs make no real transactions." },
  { q: "Are the app screens on this website the real app?", a: "No. They are concepts that show how PayKaro is designed to feel." },
  { q: "What is Digital Fraud Insurance?", a: "An optional protection proposition provided through a licensed insurance partner. Its terms aren’t published on this website yet." },
];
