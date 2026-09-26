export const SEGMENT_KEYS = ["personal", "business", "family", "agri", "assisted"] as const;
export type SegmentKey = (typeof SEGMENT_KEYS)[number];

export type ServiceKey = "transfer" | "bills" | "qr" | "atm" | "cash" | "takaful";
export type DemoKey = "transfer" | "bills" | "qr" | "atm";
export type ConceptKind =
  | "transfer"
  | "bills"
  | "cash"
  | "scan"
  | "collection"
  | "network"
  | "household"
  | "family"
  | "access"
  | "trade"
  | "help";

export type InfoKey = "retail" | "fees" | "website" | "accessibility" | "login" | "onboarding";

export function isSegmentKey(value: string | undefined | null): value is SegmentKey {
  return !!value && (SEGMENT_KEYS as readonly string[]).includes(value);
}

export function segmentPath(key: SegmentKey) {
  return key === "personal" ? "/" : `/${key}`;
}

export interface Service {
  short: string;
  title: string;
  tag: string;
  description: string;
  detail: string;
  steps: string[];
  planned?: boolean;
}

export const services: Record<ServiceKey, Service> = {
  transfer: {
    short: "Domestic money transfers",
    title: "Money that reaches further.",
    tag: "Send & receive",
    description: "Send money across Pakistan. Stay connected to the people and payments that matter.",
    detail: "PayKaro’s service portfolio includes domestic interbank money transfers (IBFT) via 1LINK.",
    steps: [
      "Confirm the recipient’s bank and account details.",
      "Check the recipient’s name, amount and any applicable charges.",
      "Keep the transaction reference for your records.",
    ],
  },
  bills: {
    short: "Bill payments",
    title: "One less thing on your list.",
    tag: "Everyday essentials",
    description: "Take care of your bills through PayKaro, and get back to the rest of your day.",
    detail:
      "Bill payments through 1LINK / Raast are included in the PayKaro service portfolio. Biller coverage and payment availability need to be confirmed before you pay.",
    steps: [
      "Have your bill or consumer reference ready.",
      "Check the biller, amount due and reference carefully.",
      "Keep your payment receipt and transaction reference.",
    ],
  },
  qr: {
    short: "Raast QR payments",
    title: "Scan. Pay. Carry on.",
    tag: "Payments, simplified",
    description: "A simpler way to pay at the counter, with Raast QR in the PayKaro service offering.",
    detail:
      "PayKaro’s service portfolio includes Raast QR payments, connecting customers and participating merchants through QR-based payments.",
    steps: [
      "Use the QR code displayed by a participating merchant.",
      "Check that the merchant name and payment amount are correct.",
      "Confirm the payment result before leaving the counter.",
    ],
  },
  atm: {
    short: "Micro ATM services",
    title: "Your cash. A little closer.",
    tag: "Neighbourhood access",
    description: "Discover cash access through Micro ATM devices at participating retail locations.",
    detail:
      "Micro ATM devices and biometric verification form part of PayKaro’s assisted service portfolio. Availability, supported accounts and transaction requirements must be confirmed at a participating location.",
    steps: [
      "Confirm that the location offers the service you need.",
      "Check supported account and identification requirements.",
      "Review any charges and keep your transaction receipt.",
    ],
  },
  cash: {
    short: "Business cash collection",
    title: "Keep your business moving.",
    tag: "For your business",
    description: "Explore cash collection services built around the everyday needs of businesses.",
    detail:
      "Cash collection for businesses is included in PayKaro’s service portfolio. Collection arrangements, eligibility, locations and charges are subject to confirmation.",
    steps: [
      "Identify your business’s cash collection requirements.",
      "Confirm available locations and collection arrangements.",
      "Agree the applicable terms before starting the service.",
    ],
  },
  takaful: {
    short: "Micro Takaful",
    title: "Consider the bigger picture.",
    tag: "Looking ahead",
    description: "Micro Takaful is part of PayKaro’s product roadmap. It is not offered on this website.",
    detail:
      "Micro Takaful is listed in PayKaro’s product strategy and launch roadmap. Provider details, coverage, exclusions, contributions and availability are not confirmed on this website. No coverage is offered or purchased here.",
    steps: [
      "Check product availability and the named provider.",
      "Read the policy, including eligibility and exclusions.",
      "Confirm the contribution and claims process before enrolment.",
    ],
    planned: true,
  },
};

/** Service name for mid-sentence use; Raast and Micro are proper nouns and keep their capitals. */
export function serviceCtaName(key: ServiceKey) {
  const name = services[key].short;
  return /^(Raast|Micro)\b/.test(name) ? name : name.charAt(0).toLowerCase() + name.slice(1);
}

export const SERVICE_ORDER: ServiceKey[] = ["transfer", "bills", "qr", "atm", "cash", "takaful"];

export interface Journey {
  id: string;
  nav: string;
  menuLabel: string;
  title: [string, string];
  copy: string;
  points: string[];
  services: ServiceKey[];
  partner?: boolean;
  concept: { kind: ConceptKind; service: ServiceKey; caption: string };
}

export interface Segment {
  key: SegmentKey;
  label: string;
  eyebrow: string;
  title: [string, string, string];
  description: string;
  image: string;
  imagePosition: string;
  alt: string;
  heading: [string, string];
  intro: string;
  products: [ServiceKey, ServiceKey, ServiceKey];
  demo: DemoKey;
  menuTitle: string;
  cardDescription: string;
  journeysTitle: [string, string];
  journeysIntro: string;
  photo: { image: string; position: string; alt: string; label: string; note: string };
  journeys: [Journey, Journey, Journey];
}

export const segments: Record<SegmentKey, Segment> = {
  personal: {
    key: "personal",
    label: "Personal",
    eyebrow: "PayKaro Personal",
    title: ["Life moves.", "Banking should", "move with you."],
    description:
      "For the bills, the little plans, and the people who matter. Discover simpler ways to manage your everyday money.",
    image: "/images/personal.webp",
    imagePosition: "58% 40%",
    alt: "A Pakistani father and his adult daughter looking at a phone together at home",
    heading: ["Everyday essentials.", "Thoughtfully connected."],
    intro: "From sending money home to taking care of the bills. Practical services for the way you live.",
    products: ["transfer", "bills", "qr"],
    demo: "transfer",
    menuTitle: "For your everyday.",
    cardDescription: "Send money, pay everyday bills and explore simpler payments for the way you live.",
    journeysTitle: ["Made for the way", "you live."],
    journeysIntro: "Three everyday moments, and the PayKaro services that fit around them.",
    photo: {
      image: "/images/business.webp",
      position: "70% 50%",
      alt: "A shopkeeper checking a phone at the counter of a neighbourhood store",
      label: "At the counter",
      note: "Raast QR at participating merchants.",
    },
    journeys: [
      {
        id: "transfers",
        nav: "Transfers & payments",
        menuLabel: "Send & receive money",
        title: ["Send money.", "Stay connected."],
        copy: "A little help for someone at home. A payment that keeps the day moving. Explore domestic transfers and Raast QR for everyday connections.",
        points: ["Domestic transfers through 1LINK", "Raast QR at participating merchants"],
        services: ["transfer", "qr"],
        concept: { kind: "transfer", service: "transfer", caption: "Move a little closer." },
      },
      {
        id: "essentials",
        nav: "Bills & essentials",
        menuLabel: "Everyday bill payments",
        title: ["The bills, sorted.", "The day, yours."],
        copy: "Make room for the things you would rather be doing. Get to know PayKaro’s bill payment services and the details to check before paying.",
        points: ["Bill payments through 1LINK / Raast", "Keep your bill reference and receipt together"],
        services: ["bills"],
        concept: { kind: "bills", service: "bills", caption: "Room for your day." },
      },
      {
        id: "cash-access",
        nav: "Cash access",
        menuLabel: "Cash in your neighbourhood",
        title: ["Everyday cash.", "A familiar counter."],
        copy: "Some things are easier with a person to help. Discover the Micro ATM approach to cash access through neighbourhood retailers.",
        points: ["Ask about supported accounts and charges", "Biometric verification where required"],
        services: ["atm"],
        concept: { kind: "cash", service: "atm", caption: "Around your corner." },
      },
    ],
  },
  business: {
    key: "business",
    label: "Business",
    eyebrow: "PayKaro Business",
    title: ["Your ambition.", "Our everyday", "focus."],
    description:
      "From the counter to the next opportunity. Explore payments and cash collection for the business you’re building.",
    image: "/images/business.webp",
    imagePosition: "62% 38%",
    alt: "A Pakistani shop owner using his phone at the counter of his neighbourhood store",
    heading: ["Your business moves.", "Keep money moving, too."],
    intro: "Practical payment and collection services for retailers, small traders and growing businesses.",
    products: ["qr", "cash", "transfer"],
    demo: "qr",
    menuTitle: "For your business.",
    cardDescription: "From Raast QR at the counter to cash collections, find services that fit your business.",
    journeysTitle: ["Built around", "your counter."],
    journeysIntro: "Payments, collections and partnerships for the businesses that keep Pakistan moving.",
    photo: {
      image: "/images/business.webp",
      position: "25% 50%",
      alt: "A customer waiting at a retail counter while the shopkeeper checks a phone",
      label: "Your customers",
      note: "Have places to be. Keep checkout simple.",
    },
    journeys: [
      {
        id: "merchant-payments",
        nav: "Merchant payments",
        menuLabel: "Payments at your counter",
        title: ["At your counter.", "On their phone."],
        copy: "Your customers have places to be. Explore Raast QR payments for a simpler moment at the counter, and domestic transfers for everyday business needs.",
        points: ["QR payments for participating merchants", "Check the payment result before completing a sale"],
        services: ["qr", "transfer"],
        concept: { kind: "scan", service: "qr", caption: "A simpler exchange." },
      },
      {
        id: "collections",
        nav: "Cash collections",
        menuLabel: "Collection arrangements",
        title: ["Keep the takings", "moving forward."],
        copy: "From a busy shop to a growing enterprise, cash needs a clear plan. Explore the collection services in PayKaro’s business portfolio.",
        points: ["Discuss your business collection requirements", "Confirm coverage, schedules and applicable terms"],
        services: ["cash"],
        concept: { kind: "collection", service: "cash", caption: "Keep business moving." },
      },
      {
        id: "retail-partners",
        nav: "Retail partnerships",
        menuLabel: "Join the retail network",
        title: ["More possibilities.", "One familiar shop."],
        copy: "Kiryana stores, pharmacies, recharge shops and small franchises are at the heart of the PayKaro retail network strategy.",
        points: ["Explore services for your neighbourhood", "Ask about devices, training and onboarding"],
        services: ["atm", "bills"],
        partner: true,
        concept: { kind: "network", service: "qr", caption: "Connected at the counter." },
      },
    ],
  },
  family: {
    key: "family",
    label: "Family",
    eyebrow: "PayKaro Family",
    title: ["For today.", "For each other.", "For your family."],
    description:
      "Every family has its own rhythm. Explore simple ways to send money, manage household bills and take care of the everyday.",
    image: "/images/personal.webp",
    imagePosition: "30% 45%",
    alt: "A father and his adult daughter spending time together and checking a phone at home",
    heading: ["For the people", "you call home."],
    intro: "Everyday services that help you stay connected to your family’s practical money needs.",
    products: ["bills", "transfer", "atm"],
    demo: "bills",
    menuTitle: "For your family.",
    cardDescription: "Take care of household bills, send money to loved ones and explore everyday cash access.",
    journeysTitle: ["Everyday care,", "in every connection."],
    journeysIntro: "Household bills, money for loved ones and cash for the everyday.",
    photo: {
      image: "/images/personal.webp",
      position: "75% 40%",
      alt: "A father showing his daughter something on his phone in their living room",
      label: "At home",
      note: "Household essentials, looked at together.",
    },
    journeys: [
      {
        id: "household-bills",
        nav: "Household bills",
        menuLabel: "Household essentials",
        title: ["Less on your list.", "More family time."],
        copy: "Electricity, utilities, everyday essentials. Explore bill payments with a little more clarity, so the household routine is easier to understand.",
        points: ["Check your biller and consumer reference", "Keep the payment record for your household"],
        services: ["bills"],
        concept: { kind: "household", service: "bills", caption: "One less thing to do." },
      },
      {
        id: "send-money-home",
        nav: "Send money home",
        menuLabel: "Transfers to loved ones",
        title: ["Across Pakistan.", "Close to home."],
        copy: "For a parent, a sibling or someone starting a new chapter. Learn about domestic transfers for the people who matter to you.",
        points: ["Confirm the recipient’s name and account", "Review the amount before you authorise"],
        services: ["transfer"],
        concept: { kind: "family", service: "transfer", caption: "Always connected." },
      },
      {
        id: "family-cash",
        nav: "Everyday cash",
        menuLabel: "Cash for your household",
        title: ["A helping hand", "for everyday needs."],
        copy: "Explore cash access through Micro ATM devices, with a person at the counter to explain the next step.",
        points: ["Confirm service availability at the location", "Review requirements and take your receipt"],
        services: ["atm"],
        concept: { kind: "cash", service: "atm", caption: "For everyday moments." },
      },
    ],
  },
  agri: {
    key: "agri",
    label: "Agri",
    eyebrow: "PayKaro Agri",
    title: ["Rooted in work.", "Ready for", "what’s next."],
    description:
      "For the growers, traders and rural enterprises moving Pakistan forward. Explore everyday payments and neighbourhood cash access.",
    image: "/images/agri.webp",
    imagePosition: "50% 35%",
    alt: "A Pakistani agricultural entrepreneur with a phone beside a flourishing green field",
    heading: ["Built around work.", "Connected to progress."],
    intro: "Explore payment and assisted cash services for the everyday needs of agricultural communities.",
    products: ["transfer", "atm", "qr"],
    demo: "atm",
    menuTitle: "For rural progress.",
    cardDescription: "Payments, cash access and collection services for growers, rural households and local traders.",
    journeysTitle: ["Progress, from", "the ground up."],
    journeysIntro: "Payments, cash and trade for growers, rural households and local enterprises.",
    photo: {
      image: "/images/agri.webp",
      position: "85% 60%",
      alt: "Green crops growing in a field under a soft morning sky",
      label: "Beyond the field",
      note: "Everyday services. Rural opportunity.",
    },
    journeys: [
      {
        id: "rural-payments",
        nav: "Rural payments",
        menuLabel: "Payments for rural communities",
        title: ["Connections that", "go beyond the field."],
        copy: "For growers, rural households and agricultural communities. Explore domestic transfers and bill payments around the rhythms of everyday work.",
        points: ["Send money across Pakistan", "Understand the details before paying a bill"],
        services: ["transfer", "bills"],
        concept: { kind: "transfer", service: "transfer", caption: "Beyond the field." },
      },
      {
        id: "rural-cash",
        nav: "Cash access",
        menuLabel: "Local cash services",
        title: ["Your hard work.", "Your everyday cash."],
        copy: "Discover how assisted Micro ATM services fit into the PayKaro retail network approach for rural communities.",
        points: ["Check the nearest participating location", "Confirm supported accounts and verification needs"],
        services: ["atm"],
        concept: { kind: "access", service: "atm", caption: "Closer to your day." },
      },
      {
        id: "rural-trade",
        nav: "Trade & collections",
        menuLabel: "Payments for growers & traders",
        title: ["From one season", "to the next sale."],
        copy: "For small traders and rural enterprises, explore payment and cash collection services to support the day’s business.",
        points: ["Raast QR for participating merchants", "Collection arrangements subject to confirmation"],
        services: ["qr", "cash"],
        concept: { kind: "trade", service: "cash", caption: "From work to possibility." },
      },
    ],
  },
  assisted: {
    key: "assisted",
    label: "Assisted",
    eyebrow: "PayKaro Assisted",
    title: ["A familiar face.", "A simpler way", "to bank."],
    description:
      "Digital services, with a human connection. Discover money transfers, bill payments and Micro ATM services through neighbourhood retailers.",
    image: "/images/business.webp",
    imagePosition: "30% 45%",
    alt: "A neighbourhood retailer helping a customer at his shop counter",
    heading: ["Digital convenience.", "A human connection."],
    intro: "Everyday financial services, brought closer through PayKaro’s retail agent network approach.",
    products: ["atm", "bills", "transfer"],
    demo: "atm",
    menuTitle: "A helping hand.",
    cardDescription: "Get familiar with bill payments, transfers and Micro ATM services through your neighbourhood retailer.",
    journeysTitle: ["People helping", "people."],
    journeysIntro: "Counter services, Micro ATM access and the neighbourhood network behind them.",
    photo: {
      image: "/images/business.webp",
      position: "80% 50%",
      alt: "Shelves of everyday goods behind a neighbourhood shop counter",
      label: "In your neighbourhood",
      note: "Aasani starts with a conversation.",
    },
    journeys: [
      {
        id: "counter-services",
        nav: "Counter services",
        menuLabel: "Help at the counter",
        title: ["You bring the need.", "We bring the clarity."],
        copy: "A bill to pay or money to send. Explore everyday digital services through the human connection of a neighbourhood retail counter.",
        points: ["Domestic transfers and bill payments", "Check the details together before confirming"],
        services: ["transfer", "bills"],
        concept: { kind: "help", service: "bills", caption: "A little help goes far." },
      },
      {
        id: "micro-atm",
        nav: "Micro ATM",
        menuLabel: "Explore Micro ATM services",
        title: ["Cash access,", "with someone to help."],
        copy: "Micro ATM devices and biometric verification are part of PayKaro’s assisted service portfolio. Get familiar with the steps before visiting a counter.",
        points: ["Ask about availability, accounts and charges", "Confirm the transaction and keep your receipt"],
        services: ["atm"],
        concept: { kind: "access", service: "atm", caption: "A more human connection." },
      },
      {
        id: "neighbourhood-network",
        nav: "Retail network",
        menuLabel: "Our retail network",
        title: ["A neighbourhood", "full of possibility."],
        copy: "The everyday shops people know. PayKaro’s network strategy centres on kiryana stores, pharmacies, utility shops and small franchises.",
        points: ["A familiar setting for digital services", "A new service direction for local retailers"],
        services: ["qr", "atm"],
        partner: true,
        concept: { kind: "network", service: "atm", caption: "Part of your neighbourhood." },
      },
    ],
  },
};

export interface Demo {
  label: string;
  title: string;
  lead: string;
  finish: string;
  hint: string;
  checks: [string, string];
  end: string;
}

export const DEMO_ORDER: DemoKey[] = ["transfer", "bills", "qr", "atm"];

export const demos: Record<DemoKey, Demo> = {
  transfer: {
    label: "Send money",
    title: "A little closer.",
    lead: "Check the details.",
    finish: "Keep your reference.",
    hint: "Connect with someone across Pakistan.",
    checks: ["Confirm the recipient", "Review the amount"],
    end: "A clear record for every connection.",
  },
  bills: {
    label: "Pay bills",
    title: "The essentials, sorted.",
    lead: "A quick double-check.",
    finish: "One less thing to do.",
    hint: "Make room for the rest of your day.",
    checks: ["Match your bill reference", "Check the amount due"],
    end: "Keep your receipt with your bill.",
  },
  qr: {
    label: "Raast QR",
    title: "A simpler way to pay.",
    lead: "Know who you’re paying.",
    finish: "Check. Pay. Carry on.",
    hint: "A familiar counter. A simpler moment.",
    checks: ["Confirm the merchant", "Review the payment"],
    end: "Check the result and keep your receipt.",
  },
  atm: {
    label: "Cash access",
    title: "Help, close to home.",
    lead: "Start with confidence.",
    finish: "Your cash. Your receipt.",
    hint: "A human connection at the counter.",
    checks: ["Confirm service availability", "Check fees and requirements"],
    end: "Count your cash and keep your receipt.",
  },
};

export interface Info {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  note: string;
}

export const info: Record<InfoKey, Info> = {
  retail: {
    label: "Retail partnerships",
    title: "Bring more possibilities to your counter.",
    body: "PayKaro’s retail network strategy focuses on kiryana stores, mobile recharge shops, pharmacies, utility stores and small franchise stores.",
    bullets: [
      "Explore domestic transfers, bill payments, Raast QR and Micro ATM services.",
      "Confirm onboarding requirements, device availability, training and support.",
      "Review applicable commissions, charges and operating terms before joining.",
    ],
    note: "Online partner registration is not available on this website. Onboarding requirements and official contact information will be available when registration opens.",
  },
  fees: {
    label: "Important information",
    title: "Know the details before you transact.",
    body: "Charges, limits, eligibility and location coverage should be confirmed for the specific service you want to use.",
    bullets: [
      "Check the applicable fee before authorising a transaction.",
      "Confirm service availability and account requirements.",
      "Read the relevant product terms and keep a record.",
    ],
    note: "A verified schedule of charges is not published on this website. This website does not quote rates or fees.",
  },
  website: {
    label: "Website information",
    title: "Explore with confidence.",
    body: "This website provides information about PayKaro’s service direction. It does not open accounts, process payments or offer insurance coverage.",
    bullets: [
      "The service walkthrough uses sample information and makes no real transactions.",
      "No account number, CNIC, password, PIN or contact details are requested.",
      "Photographs are illustrative imagery, not customer endorsements.",
      "App screens are abstract concepts. PayKaro’s mobile app design is still to be defined.",
    ],
    note: "This site does not use advertising trackers or store banking details. Product terms, legal entity details and official contact channels must be confirmed before live financial services are introduced.",
  },
  accessibility: {
    label: "Accessibility",
    title: "Built to be easier to use.",
    body: "You can explore the website using a keyboard, a touch screen or assistive technology.",
    bullets: [
      "Use Tab to move between links and controls; Enter or Space activates buttons.",
      "In the header, arrow keys move between segments and Arrow Down opens a segment’s menu. Escape closes menus and panels.",
      "Use arrow keys to move between service walkthrough tabs.",
      "The layout adapts to smaller screens and respects reduced-motion preferences.",
    ],
    note: "Your browser’s zoom and text-size settings are supported.",
  },
  login: {
    label: "Account access",
    title: "Your next step, securely.",
    body: "Online account access is not available on this website yet.",
    bullets: [
      "Explore the service walkthroughs to get familiar with PayKaro.",
      "Use only a verified PayKaro channel when account access becomes available.",
    ],
    note: "An official login destination has not yet been published here. This website never asks for your password, PIN or one-time code.",
  },
  onboarding: {
    label: "Get started with PayKaro",
    title: "A simpler start. Coming together.",
    body: "Account opening is not available on this website yet. You can explore PayKaro’s services and the steps to understand before getting started.",
    bullets: [
      "Choose the services that fit your everyday needs.",
      "Confirm eligibility, identification requirements and applicable terms when onboarding opens.",
      "Retailers can explore the partnership information.",
    ],
    note: "Official account-opening channels and requirements will be published when available.",
  },
};

