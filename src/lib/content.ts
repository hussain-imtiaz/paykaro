/**
 * Site content, from the PayKaro Website & Mobile App Experience Brief (agency-safe edition).
 * Service names and propositions are quoted from the brief; everything else is outcome-led copy
 * built on them. The brief keeps partner names, limits, pricing, roadmap dates and onboarding/KYC
 * logic internal, so none of those appear here.
 */

/** Audience pathways (brief §6). Kept under the `segment` name because it drives the colour tokens. */
export const SEGMENT_KEYS = ["individuals", "business", "partners"] as const;
export type SegmentKey = (typeof SEGMENT_KEYS)[number];

export function isSegmentKey(value: string | undefined | null): value is SegmentKey {
  return !!value && (SEGMENT_KEYS as readonly string[]).includes(value);
}

export function segmentPath(key: SegmentKey) {
  return `/${key}`;
}

export const SERVICE_ORDER = [
  "wallet",
  "cards",
  "remittance",
  "wearpay",
  "secured",
  "dashboard",
  "wealth",
  "supersavers",
  "premium",
  "rewards",
  "marketplace",
  "fraud",
  "business",
  "bizanalytics",
  "merchantanalytics",
  "platform",
] as const;
export type ServiceKey = (typeof SERVICE_ORDER)[number];

export type FamilyKey = "everyday" | "grow" | "extras" | "forbusiness" | "forpartners";

export interface Service {
  name: string;
  /** Verbatim agency-safe proposition from the brief. */
  proposition: string;
  /** Short outcome line for cards and lists. */
  outcome: string;
  family: FamilyKey;
  /** Conditions the brief attaches to the proposition. */
  qualifier?: string;
  optional?: boolean;
}

export const services: Record<ServiceKey, Service> = {
  wallet: {
    name: "PayKaro Wallet",
    proposition: "Everyday digital wallet for receiving, holding, paying and moving money.",
    outcome: "Receive, hold, pay and move money from one place.",
    family: "everyday",
  },
  cards: {
    name: "PayKaro Cards",
    proposition: "Physical and virtual payment cards with digital controls.",
    outcome: "Physical and virtual cards you control from the app.",
    family: "everyday",
  },
  remittance: {
    name: "PayKaro Remittance",
    proposition: "Digital receipt of eligible inward home remittances, subject to applicable approvals and arrangements.",
    outcome: "Money from family abroad, received digitally.",
    family: "everyday",
    qualifier: "Subject to applicable approvals and arrangements",
  },
  wearpay: {
    name: "PayKaro Wear & Pay",
    proposition: "Contactless payment experiences through supported devices and wearables.",
    outcome: "Tap to pay with a supported device or wearable.",
    family: "everyday",
    qualifier: "Supported devices and wearables",
  },
  secured: {
    name: "PayKaro Secured Payment",
    proposition: "Protected digital-commerce payment experience, subject to applicable regulatory approval.",
    outcome: "A protected way to pay online.",
    family: "everyday",
    qualifier: "Subject to applicable regulatory approval",
  },
  dashboard: {
    name: "Money Dashboard",
    proposition: "Personal money management, spending visibility and financial insights.",
    outcome: "See where your money goes, and what to do next.",
    family: "grow",
  },
  wealth: {
    name: "PayKaro Wealth",
    proposition: "Access to selected investment and savings products offered through regulated partners.",
    outcome: "Selected investment and savings products, in the same app.",
    family: "grow",
    qualifier: "Offered through regulated partners",
  },
  supersavers: {
    name: "Super Savers",
    proposition: "Savings-oriented proposition connecting customers with eligible partner offerings.",
    outcome: "Put money aside with eligible partner offerings.",
    family: "grow",
    qualifier: "Eligible partner offerings",
  },
  premium: {
    name: "PayKaro Premium",
    proposition: "Optional enhanced membership with additional benefits and privileges.",
    outcome: "An optional membership with extra benefits.",
    family: "extras",
    optional: true,
  },
  rewards: {
    name: "PayKaro Rewards",
    proposition: "Loyalty, rewards and promotional benefits linked to customer engagement.",
    outcome: "Rewards and benefits for the way you use PayKaro.",
    family: "extras",
  },
  marketplace: {
    name: "PayKaro Marketplace",
    proposition: "Curated partner services accessible from within the PayKaro experience.",
    outcome: "Curated partner services, inside PayKaro.",
    family: "extras",
  },
  fraud: {
    name: "Digital Fraud Insurance",
    proposition: "Optional protection proposition provided through a licensed insurance partner.",
    outcome: "Optional protection, through a licensed insurance partner.",
    family: "extras",
    qualifier: "Provided through a licensed insurance partner",
    optional: true,
  },
  business: {
    name: "PayKaro Business",
    proposition: "Digital payments, collections and practical business-management tools for merchants and SMEs.",
    outcome: "Payments, collections and everyday tools for merchants and SMEs.",
    family: "forbusiness",
  },
  bizanalytics: {
    name: "PayKaro Business Analytics",
    proposition: "Financial insights and reporting for businesses.",
    outcome: "Financial insights and reporting for your business.",
    family: "forbusiness",
  },
  merchantanalytics: {
    name: "PayKaro Merchant Analytics",
    proposition: "Payment, settlement and performance visibility for merchants.",
    outcome: "See payments, settlement and performance at a glance.",
    family: "forbusiness",
  },
  platform: {
    name: "PayKaro APIs / Platform Services",
    proposition: "Controlled connectivity and embedded-payment capabilities for approved businesses and institutions.",
    outcome: "Embedded payments and connectivity for approved partners.",
    family: "forpartners",
    qualifier: "For approved businesses and institutions",
  },
};

export const families: { key: FamilyKey; label: string; title: string; copy: string }[] = [
  { key: "everyday", label: "Everyday money", title: "Everyday money", copy: "Receive, hold, pay and move money, on your phone, your card or your wrist." },
  { key: "grow", label: "Understand & grow", title: "Understand and grow", copy: "See where your money goes, then put it to work." },
  { key: "extras", label: "Membership & extras", title: "Membership and extras", copy: "Optional benefits, rewards, partner services and protection." },
  { key: "forbusiness", label: "For business", title: "For merchants and SMEs", copy: "Take payments, collect and see how the business is doing." },
  { key: "forpartners", label: "For partners", title: "For partners and institutions", copy: "Connect approved businesses and institutions to PayKaro." },
];

export const servicesIn = (f: FamilyKey) => SERVICE_ORDER.filter((k) => services[k].family === f);

export interface Journey {
  id: string;
  nav: string;
  title: [string, string];
  copy: string;
  services: ServiceKey[];
}

export interface Segment {
  key: SegmentKey;
  label: string;
  /** Pathway name as the brief phrases it. */
  pathway: string;
  eyebrow: string;
  title: string[];
  description: string;
  cardDescription: string;
  menuTitle: string;
  journeys: Journey[];
  services: ServiceKey[];
}

export const segments: Record<SegmentKey, Segment> = {
  individuals: {
    key: "individuals",
    label: "Individuals",
    pathway: "Individuals",
    eyebrow: "PayKaro for Individuals",
    title: ["Everyday money.", "One wallet.", "Your control."],
    description: "Receive, hold, pay and move money from one everyday wallet, with cards, savings and insights close by.",
    cardDescription: "An everyday wallet, cards with digital controls, money from home, and insight into where it all goes.",
    menuTitle: "For your everyday.",
    services: ["wallet", "cards", "remittance", "wearpay", "secured", "dashboard", "wealth", "supersavers", "premium", "rewards", "marketplace", "fraud"],
    journeys: [
      { id: "wallet", nav: "Everyday wallet", title: ["One wallet", "for every day."], copy: "Receive money, hold it, pay with it and move it on. The everyday essentials in one place, with the amount, who it’s going to and any applicable fee shown before you confirm.", services: ["wallet", "wearpay", "secured"] },
      { id: "cards", nav: "Cards & controls", title: ["Your card.", "Your rules."], copy: "Physical and virtual cards with digital controls. Routine controls are self-service, immediate and reversible wherever permitted, so you’re never waiting on someone else.", services: ["cards", "fraud"] },
      { id: "remittance", nav: "Money from home", title: ["From family abroad,", "straight to you."], copy: "Receive eligible inward home remittances digitally, with the status visible from the moment it’s on its way. Subject to applicable approvals and arrangements.", services: ["remittance"] },
      { id: "insights", nav: "Money Dashboard", title: ["See where it goes.", "Know what’s next."], copy: "Spending visibility and financial insights that turn into a clear, useful next action, not just a chart of what already happened.", services: ["dashboard"] },
      { id: "grow", nav: "Save & grow", title: ["Put money aside.", "Let it grow."], copy: "Super Savers connects you with eligible partner savings offerings. PayKaro Wealth gives access to selected investment and savings products through regulated partners.", services: ["supersavers", "wealth"] },
    ],
  },
  business: {
    key: "business",
    label: "Business",
    pathway: "Business / Merchants",
    eyebrow: "PayKaro Business",
    title: ["Get paid.", "See it clearly.", "Run the day."],
    description: "Digital payments, collections and practical business-management tools for merchants and SMEs, with insight you can act on.",
    cardDescription: "Take payments, collect what you’re owed, and see payment, settlement and performance clearly.",
    menuTitle: "For merchants and SMEs.",
    services: ["business", "merchantanalytics", "bizanalytics", "secured", "platform"],
    journeys: [
      { id: "payments", nav: "Payments", title: ["Take payments.", "Everywhere you sell."], copy: "Digital payments for the counter and for digital commerce, with every payment’s status and proof clear to you and your customer.", services: ["business", "secured"] },
      { id: "collections", nav: "Collections", title: ["Money in.", "Clearly accounted for."], copy: "Collections that show where every payment stands, from received to settled, so the end of the day doesn’t start with a spreadsheet.", services: ["business", "merchantanalytics"] },
      { id: "insights", nav: "Analytics", title: ["Numbers that", "tell you what to do."], copy: "Merchant Analytics shows payment, settlement and performance. Business Analytics adds financial insights and reporting for the whole business.", services: ["merchantanalytics", "bizanalytics"] },
    ],
  },
  partners: {
    key: "partners",
    label: "Partners",
    pathway: "Partners / Institutions",
    eyebrow: "PayKaro for Partners & Institutions",
    title: ["Built for partners", "and institutions."],
    description: "Controlled connectivity and embedded-payment capabilities for approved businesses and institutions, and a place for your service inside PayKaro.",
    cardDescription: "Embedded payments and connectivity for approved businesses and institutions, and curated services inside PayKaro.",
    menuTitle: "For partners and institutions.",
    services: ["platform", "marketplace", "remittance", "wealth", "supersavers", "fraud"],
    journeys: [
      { id: "platform", nav: "APIs & platform", title: ["Controlled connectivity.", "Embedded payments."], copy: "PayKaro APIs / Platform Services give approved businesses and institutions controlled connectivity and embedded-payment capabilities.", services: ["platform"] },
      { id: "disbursements", nav: "Disbursements", title: ["Pay many people.", "Clearly."], copy: "Enabled services for billers, employers, businesses and institutions, so the people you pay see what arrived and why.", services: ["platform", "business"] },
      { id: "marketplace", nav: "Marketplace", title: ["Your service,", "in the moment it’s needed."], copy: "PayKaro Marketplace brings curated partner services into the PayKaro experience, surfaced when relevant to what the customer is doing, not as a wall of promotions.", services: ["marketplace"] },
    ],
  },
};

/** Intent-led walkthroughs (brief §4, §5, §10). Illustrative only; no real transactions. */
export type DemoKey = "send" | "remit" | "card" | "recover";
export const DEMO_ORDER: DemoKey[] = ["send", "remit", "card", "recover"];

export type ScreenStatus = "idle" | "pending" | "success" | "failure" | "recovery";

export interface DemoStep {
  heading: string;
  caption: string;
  button: string;
  status: ScreenStatus;
  screenTitle: string;
  rows?: [string, string][];
}

export interface Demo {
  label: string;
  intent: string;
  service: ServiceKey;
  steps: [DemoStep, DemoStep, DemoStep];
}

export const demos: Record<DemoKey, Demo> = {
  send: {
    label: "Send money",
    intent: "I want to send money",
    service: "wallet",
    steps: [
      { heading: "Say what you want to do.", caption: "Start from the intent, not a menu. Pick a person you pay often, or search.", button: "Continue", status: "idle", screenTitle: "Send to", rows: [["Recent", "Ammi"], ["Recent", "Bilal"], ["Search", "Name or number"]] },
      { heading: "See everything before you confirm.", caption: "Amount, who it’s going to and any applicable fee, on one screen.", button: "Confirm", status: "pending", screenTitle: "Review", rows: [["To", "Ammi"], ["Amount", "Rs 5,000"], ["Applicable fee", "Shown here"]] },
      { heading: "Done, with proof to share.", caption: "A clear confirmation and a receipt you can share straight away.", button: "Try another", status: "success", screenTitle: "Sent", rows: [["Status", "Completed"], ["Proof", "Ready to share"]] },
    ],
  },
  remit: {
    label: "Money from abroad",
    intent: "Money is coming from family abroad",
    service: "remittance",
    steps: [
      { heading: "Know it’s on its way.", caption: "Status is visible from the start, so there’s no guessing.", button: "Next", status: "pending", screenTitle: "Incoming", rows: [["From", "Family abroad"], ["Status", "On its way"]] },
      { heading: "Know when it lands.", caption: "A plain confirmation the moment it arrives in your wallet.", button: "Next", status: "success", screenTitle: "Received", rows: [["Amount", "Shown in rupees"], ["Status", "In your wallet"]] },
      { heading: "Know what to do next.", caption: "Useful next actions in context: send some on, pay a bill or set some aside.", button: "Try another", status: "idle", screenTitle: "Next", rows: [["Send some on", "›"], ["Set some aside", "›"]] },
    ],
  },
  card: {
    label: "Freeze your card",
    intent: "I can’t find my card",
    service: "cards",
    steps: [
      { heading: "Control it yourself.", caption: "Routine card controls are self-service and immediate. No call, no queue.", button: "Freeze card", status: "idle", screenTitle: "Your card", rows: [["Card", "•••• 4821"], ["Status", "Active"]] },
      { heading: "Frozen, instantly.", caption: "The change takes effect straight away, and the screen says so.", button: "Next", status: "success", screenTitle: "Card frozen", rows: [["Status", "Frozen"], ["Payments", "Paused"]] },
      { heading: "Reversible, when you’re ready.", caption: "Found it? Unfreeze it just as quickly. Controls are reversible wherever permitted.", button: "Try another", status: "recovery", screenTitle: "Unfreeze", rows: [["Status", "Active again"]] },
    ],
  },
  recover: {
    label: "When something goes wrong",
    intent: "My payment didn’t go through",
    service: "wallet",
    steps: [
      { heading: "A reason, in plain language.", caption: "Never a generic “something went wrong”. PayKaro says what happened.", button: "What can I do?", status: "failure", screenTitle: "Not sent", rows: [["Why", "The recipient’s account didn’t respond"], ["Your money", "Not taken"]] },
      { heading: "A clear way forward.", caption: "Every error comes with a recovery path. No dead ends.", button: "Try again", status: "recovery", screenTitle: "What next", rows: [["Try again", "›"], ["Send another way", "›"], ["Get help", "›"]] },
      { heading: "Sorted.", caption: "Retried, confirmed, and proof ready to share.", button: "Try another", status: "success", screenTitle: "Sent", rows: [["Status", "Completed"], ["Proof", "Ready to share"]] },
    ],
  },
};

export type InfoKey = "getpaykaro" | "fees" | "website" | "accessibility" | "login" | "partners" | "business";

export interface Info {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  note: string;
}

export const info: Record<InfoKey, Info> = {
  getpaykaro: {
    label: "Get PayKaro",
    title: "The app isn’t available here yet.",
    body: "PayKaro’s app can’t be downloaded from this website yet. Official app-store links will be published here.",
    bullets: [
      "Getting from download to your first successful payment is designed as a flagship journey: fewer screens, no repeated questions.",
      "English and Urdu are both designed to feel native.",
      "Only download PayKaro from the official links published here.",
    ],
    note: "This website never asks for your PIN, password, one-time code, CNIC or account details.",
  },
  business: {
    label: "PayKaro Business",
    title: "Explore for Business.",
    body: "PayKaro Business brings digital payments, collections and practical business-management tools to merchants and SMEs.",
    bullets: [
      "Merchant Analytics: payment, settlement and performance visibility.",
      "Business Analytics: financial insights and reporting.",
      "Approved businesses can also connect through PayKaro APIs / Platform Services.",
    ],
    note: "Business onboarding isn’t available on this website yet. An official channel will be published here.",
  },
  partners: {
    label: "Partners & institutions",
    title: "Partner with PayKaro.",
    body: "PayKaro works with approved businesses and institutions through controlled connectivity, embedded payments and curated partner services.",
    bullets: [
      "APIs / Platform Services for approved businesses and institutions.",
      "Marketplace: curated partner services inside the PayKaro experience.",
      "Enabled services for billers, employers, businesses and institutions.",
    ],
    note: "An official partner-enquiry channel will be published here. This website doesn’t collect enquiry details.",
  },
  fees: {
    label: "Fees",
    title: "Every fee, before you confirm.",
    body: "Any applicable fee is shown on the confirmation screen, next to the amount and who you’re paying, before you agree to anything.",
    bullets: [
      "PayKaro’s commercial philosophy: core consumer money movement should not be monetised through friction.",
      "The broader ecosystem funds the model: cards, merchant acceptance, partnerships and optional subscriptions.",
      "Optional features, such as PayKaro Premium, are always your choice.",
    ],
    note: "A schedule of charges isn’t published on this website yet.",
  },
  website: {
    label: "Website information",
    title: "About this website.",
    body: "This website explains PayKaro and its services. It does not open accounts, process payments or sell any product.",
    bullets: [
      "App screens and walkthroughs are illustrative concepts with sample data. No real transactions happen.",
      "No account number, CNIC, password, PIN, one-time code or contact details are requested.",
      "Photographs are illustrative, not customer endorsements.",
    ],
    note: "Product terms, legal entity details and official contact channels will be published here before launch.",
  },
  accessibility: {
    label: "Accessibility",
    title: "Built to be easy to use.",
    body: "You can use this website with a keyboard, a touch screen or assistive technology.",
    bullets: [
      "Tab moves between links and controls; Enter or Space activates them.",
      "In the header, Left and Right move along the menu, Down opens a menu, and Escape closes it.",
      "Layouts adapt to small screens, and motion is reduced when your device asks for it.",
    ],
    note: "Browser zoom and text-size settings are supported.",
  },
  login: {
    label: "Account access",
    title: "Log in with the app.",
    body: "There is no account login on this website.",
    bullets: ["When PayKaro launches, you’ll manage your money in the official app."],
    note: "This website never asks for your password, PIN or one-time code. If a site or message does, don’t enter them.",
  },
};
