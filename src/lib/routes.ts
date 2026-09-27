import { SEGMENT_KEYS, isSegmentKey, segments, type SegmentKey } from "./content";

export const ABOUT_KEYS = ["company", "digbex", "chairmans-message", "leadership"] as const;
export type AboutKey = (typeof ABOUT_KEYS)[number];

export const aboutPages: Record<AboutKey, { label: string; menuLabel: string; description: string }> = {
  company: {
    label: "Company",
    menuLabel: "Company",
    description: "What PayKaro is, what it promises and how it’s funded.",
  },
  digbex: {
    label: "Our Approach: DIGBEX",
    menuLabel: "Our Approach (DIGBEX)",
    description: "The customer-experience philosophy behind every screen.",
  },
  "chairmans-message": {
    label: "Chairman’s Message",
    menuLabel: "Chairman’s Message",
    description: "A message from the Chairman of PayKaro.",
  },
  leadership: {
    label: "Leadership & Board Members",
    menuLabel: "Leadership & Board Members",
    description: "The people who lead PayKaro and sit on its board.",
  },
};

export const PAGE_KEYS = ["app", "trust", "help"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export const pages: Record<PageKey, { label: string; title: string; description: string }> = {
  app: { label: "The App", title: "The PayKaro app", description: "An intent engine, not a product showroom: how the PayKaro app is designed to work." },
  trust: { label: "Security & Trust", title: "Security & Trust", description: "Privacy, consent, fees, status and proof, and how PayKaro is funded." },
  help: { label: "Get Help", title: "Get Help", description: "Tell us what you’re trying to do, and find the next step." },
};

export type Route =
  | { kind: "home" }
  | { kind: "segment"; key: SegmentKey }
  | { kind: "page"; key: PageKey }
  | { kind: "about"; key: AboutKey };

export const HOME: Route = { kind: "home" };

const isAboutKey = (v: string | undefined): v is AboutKey => !!v && (ABOUT_KEYS as readonly string[]).includes(v);
const isPageKey = (v: string | undefined): v is PageKey => !!v && (PAGE_KEYS as readonly string[]).includes(v);

export function parseRoute(parts: string[] | undefined): Route | null {
  if (!parts || parts.length === 0) return HOME;
  if (parts.length === 1 && isSegmentKey(parts[0])) return { kind: "segment", key: parts[0] };
  if (parts.length === 1 && isPageKey(parts[0])) return { kind: "page", key: parts[0] };
  if (parts.length === 2 && parts[0] === "about" && isAboutKey(parts[1])) return { kind: "about", key: parts[1] };
  return null;
}

export function routeFromPathname(pathname: string | null): Route | null {
  return parseRoute((pathname ?? "/").split("/").filter(Boolean));
}

export function routePath(route: Route): string {
  if (route.kind === "home") return "/";
  if (route.kind === "about") return `/about/${route.key}`;
  return `/${route.key}`;
}

export function aboutPath(key: AboutKey) {
  return `/about/${key}`;
}

/** Colour set a route paints with. Everything except Business and Partners uses PayKaro coral. */
export function routeSegment(route: Route): SegmentKey {
  return route.kind === "segment" ? route.key : "individuals";
}

export function routeKey(route: Route): string {
  return route.kind === "home" ? "home" : `${route.kind}:${route.key}`;
}

export function sameRoute(a: Route, b: Route) {
  return routeKey(a) === routeKey(b);
}

export function routeTitle(route: Route): string {
  if (route.kind === "home") return "PayKaro | Everyday money, built for Pakistan";
  if (route.kind === "segment") return `PayKaro for ${segments[route.key].pathway} | PayKaro`;
  if (route.kind === "page") return `${pages[route.key].title} | PayKaro`;
  return `${aboutPages[route.key].label} | PayKaro`;
}

export function routeDescription(route: Route): string {
  if (route.kind === "home")
    return "PayKaro is a digital financial experience built for Pakistan: immediate, understandable, self-service and human. For individuals, businesses and partners.";
  if (route.kind === "segment") return segments[route.key].description;
  if (route.kind === "page") return pages[route.key].description;
  return aboutPages[route.key].description;
}

export const ALL_ROUTES: Route[] = [
  HOME,
  ...SEGMENT_KEYS.map((key) => ({ kind: "segment", key }) as Route),
  ...PAGE_KEYS.map((key) => ({ kind: "page", key }) as Route),
  ...ABOUT_KEYS.map((key) => ({ kind: "about", key }) as Route),
];
