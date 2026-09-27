/**
 * About Us content.
 *
 * Anything PayKaro has not supplied is a `ph(...)` placeholder: it renders with a dashed
 * "To be supplied" marker so it can never be mistaken for real content. To publish, replace
 * the `ph(...)` call with a plain string, and add or remove people in the arrays below.
 */

export type Placeholder = { placeholder: true; field: string; hint: string };
export type Copy = string | Placeholder;

export const ph = (field: string, hint: string): Placeholder => ({ placeholder: true, field, hint });
export const isPlaceholder = (c: Copy): c is Placeholder => typeof c !== "string";

export interface Person {
  name: Copy;
  role: Copy;
  bio: Copy;
  /** Path under /public, e.g. "/people/jane-doe.webp". Leave undefined until a real photo is supplied. */
  photo?: string;
}

export const company = {
  /** Brief s1: brand proposition and core promise. */
  proposition:
    "A world-class digital financial experience built specifically for Pakistan. Not a conventional bank app compressed onto a phone, and not a crowded wallet catalogue.",
  promise: "Help every customer reach what they came to do quickly, understand what is happening, stay in control and always know the next step.",
  nameFact: "The PayKaro mark sets the English “pay” beside the Urdu “کرو” (karo, “do”).",
  nameStory: ph("Story behind the name", "A short paragraph on why the company is called PayKaro."),
  everyday:
    "Everyday money movement, payments and financial tasks should feel immediate, understandable, self-service and human, without depending on branches or routine manual intervention.",
  character: "Premium but accessible. Modern without being futuristic for its own sake. Confident, calm and trustworthy.",
  local: "Pakistani context, language, behaviours and everyday use cases, executed to an international design standard.",
  details: [
    { label: "Registered company name", value: ph("Registered company name", "The legal entity behind PayKaro.") },
    { label: "Regulatory status", value: ph("Regulatory status", "Licences or approvals, exactly as issued, with the regulator’s name.") },
    { label: "Year established", value: ph("Year established", "The year the company was founded or incorporated.") },
    { label: "Head office", value: ph("Head office address", "Registered or head-office address.") },
    { label: "Official contact", value: ph("Official contact channels", "Customer-support phone, email and verified social accounts.") },
  ],
};

export const chairman = {
  name: ph("Chairman’s name", "Full name as it should appear on the site."),
  title: ph("Chairman’s title", "For example: Chairman, Board of Directors."),
  intro: ph(
    "Opening lines of the message",
    "The first two or three sentences of the Chairman’s message. They are shown large and highlight word by word as the reader scrolls.",
  ),
  body: [
    ph("Message, paragraph 1", "The Chairman’s message, as approved for publication."),
    ph("Message, paragraph 2", "Continue the message. Add or remove paragraphs as needed."),
    ph("Message, paragraph 3", "Closing paragraph of the message."),
  ] as Copy[],
  signOff: ph("Sign-off", "For example: the Chairman’s signature line, and the date of the message."),
};

/** Security & Trust page. The brief asks for regulatory status and disclosures but keeps partner names internal. */
export const disclosures = [
  { label: "Regulatory status", value: ph("Regulatory status", "Licences or approvals, exactly as issued, with the regulator’s name.") },
  { label: "Remittance and Secured Payment", value: "Offered subject to applicable approvals and arrangements (Remittance) and applicable regulatory approval (Secured Payment)." },
  { label: "Wealth and savings", value: "Investment and savings products are offered through regulated partners." },
  { label: "Digital Fraud Insurance", value: "Optional protection provided through a licensed insurance partner." },
  { label: "Partner names", value: ph("Partner disclosures", "Names of the regulated and licensed partners, once approved for publication.") },
  { label: "Privacy policy", value: ph("Privacy policy", "The approved privacy policy, or a link to it.") },
  { label: "Terms of use", value: ph("Terms of use", "The approved website and product terms.") },
];

/** Get Help page. */
export const support = [
  { label: "Customer support", value: ph("Customer support channels", "In-app help, phone, email and hours, as approved.") },
  { label: "Report fraud or a lost card", value: ph("Fraud reporting channel", "The dedicated, always-on channel for reporting fraud.") },
  { label: "Complaints", value: ph("Complaints process", "How to raise a complaint, and how to escalate it.") },
];

const person = (group: string, n: number): Person => ({
  name: ph(`${group} ${n}: name`, "Full name."),
  role: ph(`${group} ${n}: role`, "Title or board position."),
  bio: ph(`${group} ${n}: short biography`, "Two or three sentences."),
});

export const leadership: Person[] = [1, 2, 3].map((n) => person("Leader", n));
export const board: Person[] = [1, 2, 3].map((n) => person("Board member", n));
