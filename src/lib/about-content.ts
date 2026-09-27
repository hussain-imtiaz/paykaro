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
  vision: ph("Vision statement", "One or two sentences describing PayKaro’s vision."),
  mission: ph("Mission statement", "One or two sentences describing PayKaro’s mission."),
  nameFact: "The PayKaro mark sets the English “pay” beside the Urdu “کرو” (karo, “do”).",
  nameStory: ph("Story behind the name", "A short paragraph on why the company is called PayKaro."),
  why: ph("Why PayKaro exists", "A paragraph on the problem PayKaro set out to solve."),
  conviction: ph("Founding conviction", "A paragraph on the belief the company was founded on."),
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

const person = (group: string, n: number): Person => ({
  name: ph(`${group} ${n}: name`, "Full name."),
  role: ph(`${group} ${n}: role`, "Title or board position."),
  bio: ph(`${group} ${n}: short biography`, "Two or three sentences."),
});

export const leadership: Person[] = [1, 2, 3].map((n) => person("Leader", n));
export const board: Person[] = [1, 2, 3].map((n) => person("Board member", n));
