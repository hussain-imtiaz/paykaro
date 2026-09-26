import type { InfoKey, SegmentKey, ServiceKey } from "./content";

/** Big display word + short label for a service, used where Ummah shows a headline figure. */
export const serviceFigure: Record<ServiceKey, { eyebrow: string; figure: string; suffix: string; label: string; copy: string }> = {
  transfer: {
    eyebrow: "Send across Pakistan",
    figure: "1LINK",
    suffix: "IBFT",
    label: "domestic interbank transfers",
    copy: "Send to accounts at other banks through the 1LINK network. Check the recipient’s name, the amount and any charges before you confirm.",
  },
  bills: {
    eyebrow: "Everyday essentials",
    figure: "Raast",
    suffix: "1LINK",
    label: "bill payments",
    copy: "Pay bills through 1LINK / Raast. Have your consumer reference ready and confirm the biller and amount due before paying.",
  },
  qr: {
    eyebrow: "Pay at the counter",
    figure: "QR",
    suffix: "Raast",
    label: "payments at participating merchants",
    copy: "Scan the merchant’s Raast QR code, check the merchant name and amount, then confirm the result before you leave the counter.",
  },
  atm: {
    eyebrow: "Cash, close by",
    figure: "Micro",
    suffix: "ATM",
    label: "assisted cash access",
    copy: "Micro ATM devices with biometric verification at participating retailers. Ask about supported accounts and charges first.",
  },
  cash: {
    eyebrow: "For your takings",
    figure: "Cash",
    suffix: "B2B",
    label: "business cash collection",
    copy: "Collection arrangements for businesses. Coverage, schedules and applicable terms are confirmed with you before you start.",
  },
  takaful: {
    eyebrow: "On the roadmap",
    figure: "Takaful",
    suffix: "Planned",
    label: "micro takaful, not yet offered",
    copy: "Micro Takaful is part of PayKaro’s product roadmap. No coverage is offered or purchased on this website.",
  },
};

/** What to check for each service; shown as the ⊹ checklist in the services tabs. */
export const serviceChecklist: Record<ServiceKey, string[]> = {
  transfer: ["Interbank via 1LINK", "Recipient’s bank", "Account details", "Recipient’s name", "Amount and charges", "Transaction reference"],
  bills: ["1LINK / Raast billers", "Consumer reference", "Biller name", "Amount due", "Payment receipt", "Coverage confirmed first"],
  qr: ["Raast QR", "Participating merchants", "Merchant name", "Payment amount", "Result on screen", "Receipt kept"],
  atm: ["Micro ATM devices", "Biometric verification", "Participating retailers", "Supported accounts", "Charges confirmed first", "Cash counted, receipt kept"],
  cash: ["Business collections", "Your requirements", "Locations", "Schedules", "Applicable terms", "Agreed before starting"],
  takaful: ["Roadmap only", "Provider to be named", "Coverage to be confirmed", "No enrolment here"],
};

export const principles = [
  { icon: "tag", title: ["Charges confirmed", "before you pay"] },
  { icon: "lock", title: ["Your PIN", "stays yours"] },
  { icon: "check", title: ["Check before", "you confirm"] },
  { icon: "store", title: ["Built for the", "neighbourhood"] },
  { icon: "receipt", title: ["A clear record,", "every time"] },
] as const;

export const networkFeatures = [
  {
    icon: "users",
    title: "Counter services",
    copy: "Money transfers and bill payments at a familiar neighbourhood counter, with a person to help you check the details.",
  },
  {
    icon: "fingerprint",
    title: "Micro ATM access",
    copy: "Cash access through Micro ATM devices with biometric verification. Ask about availability, supported accounts and charges.",
  },
  {
    icon: "store",
    title: "Retail partners",
    copy: "Kiryana stores, recharge and mobile shops, pharmacies, utility shops and small franchises are at the heart of the network strategy.",
  },
] as const;

/** Cycling glass notifications on the network photo card. Illustrative steps, never transactions. */
export const networkNotices = [
  { title: "Bill payment", sub: "Match the consumer reference", rows: [["Biller", "Check the name"], ["Amount due", "Check the figure"], ["Receipt", "Keep it safe"]] },
  { title: "Micro ATM", sub: "Biometric verification", rows: [["Location", "Participating retailer"], ["Account", "Supported type"], ["Charges", "Confirmed first"]] },
  { title: "Raast QR", sub: "Confirm the merchant", rows: [["Merchant", "Check the name"], ["Amount", "Check the figure"], ["Result", "Before you leave"]] },
] as const;

export const metrics = [
  { value: 5, prefix: "", suffix: "", label: "Customer segments", sub: "One PayKaro for each" },
  { value: null, text: "1LINK", label: "Domestic transfers", sub: "Interbank, across Pakistan" },
  { value: 4, prefix: "", suffix: "", label: "Services to try", sub: "In the app concept" },
  { value: 0, prefix: "", suffix: "", label: "Credentials asked", sub: "No PINs, passwords or OTPs" },
] as const;

export const stats = [
  { value: 15, prefix: "", suffix: "", title: ["Journeys across", "five segments"], copy: "Three for every segment, from household bills to cash collections and the retail network." },
  { value: 5, prefix: "", suffix: "+1", title: ["Service", "directions"], copy: "Transfers, bills, Raast QR, Micro ATM and business cash collection. Micro Takaful is planned." },
  { value: 5, prefix: "", suffix: "", title: ["Retail formats", "in the network plan"], copy: "Kiryana stores, recharge and mobile shops, pharmacies, utility shops and small franchises." },
  { value: 2, prefix: "", suffix: "", title: ["Ways to", "bank"], copy: "Digital, on your phone. Or assisted, with a person at a participating neighbourhood counter." },
] as const;

export const clarityRows = [
  ["Recipient or merchant", "Check the name"],
  ["Amount", "Check the figure"],
  ["Charges", "Confirmed first"],
  ["Reference", "Kept on record"],
] as const;

export const safetyItems = [
  { title: "Your details stay yours", copy: "Never share your PIN, password or one-time code. Keep sensitive information off calls and messages." },
  { title: "Check before you confirm", copy: "Review the recipient, merchant and amount. For assisted services, confirm the transaction before authorising it." },
  { title: "Keep a clear record", copy: "Save your transaction receipt and reference, so it’s easier to follow up if you need to." },
  { title: "Use verified channels", copy: "If something looks wrong, use a verified PayKaro support channel. This website never asks for banking details." },
] as const;

export const updates: { title: string; copy: string; image: string; position: string; alt: string; segment?: SegmentKey; info?: InfoKey }[] = [
  {
    title: "Building a neighbourhood network",
    copy: "PayKaro’s retail strategy centres on kiryana stores, pharmacies, recharge shops, utility shops and small franchises.",
    image: "/images/business.webp",
    position: "40% 45%",
    alt: "A neighbourhood retailer at the counter of his shop",
    info: "retail",
  },
  {
    title: "Micro Takaful is on the roadmap",
    copy: "A planned direction in PayKaro’s product strategy. Not offered yet, and nothing can be purchased here.",
    image: "/images/agri.webp",
    position: "50% 35%",
    alt: "An agricultural entrepreneur holding a phone beside a green field",
  },
];

export const faqs: { q: string; a: string; info?: InfoKey }[] = [
  {
    q: "What can I do with PayKaro?",
    a: "The PayKaro service portfolio includes domestic money transfers through 1LINK, bill payments via 1LINK / Raast, Raast QR payments at participating merchants, Micro ATM services and cash collection for businesses. Availability and eligibility need to be confirmed for each service.",
  },
  {
    q: "Who is PayKaro for?",
    a: "PayKaro is organised around five segments: Personal, Business, Family, Agri and Assisted. Each has its own journeys, from household bills and sending money home to merchant payments, rural cash access and counter services.",
  },
  {
    q: "What is assisted banking?",
    a: "Assisted banking brings digital financial services into participating retail locations, with a person to help you at the counter. PayKaro’s approach includes money transfers, bill payments, biometric verification and Micro ATM devices.",
  },
  {
    q: "Can I open an account or log in on this website?",
    a: "Not yet. This website introduces PayKaro’s services. Online account opening, login and live transactions are not available here.",
  },
  {
    q: "Where can I find fees and service availability?",
    a: "Confirm the applicable charges, eligibility, limits and location coverage before starting a service. A verified schedule of charges and a live location directory have not yet been published on this website.",
    info: "fees",
  },
  {
    q: "Does this website collect my details?",
    a: "No. PayKaro’s website never asks for your account number, CNIC, password, PIN or one-time code, and the interactive walkthrough makes no real transactions.",
  },
  {
    q: "Is Micro Takaful available?",
    a: "Not yet. Micro Takaful is part of PayKaro’s product roadmap. Provider, coverage and contribution details are not confirmed, and no coverage is offered or purchased on this website.",
  },
  {
    q: "Are the app screens on this website the real PayKaro app?",
    a: "No. The screens are concepts that illustrate how services could feel. PayKaro’s mobile app and product journeys are still to be designed.",
  },
  {
    q: "How can my shop become a PayKaro retail partner?",
    a: "PayKaro’s retail network strategy includes kiryana stores, mobile shops, pharmacies, utility stores and small franchise stores. Review the retail partner information for the details to confirm before onboarding.",
    info: "retail",
  },
];
