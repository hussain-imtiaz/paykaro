import { SEGMENT_KEYS, isSegmentKey, segments, type SegmentKey } from "./content";

export const ABOUT_KEYS = ["company", "chairmans-message", "leadership"] as const;
export type AboutKey = (typeof ABOUT_KEYS)[number];

export const aboutPages: Record<AboutKey, { label: string; menuLabel: string; description: string }> = {
  company: {
    label: "Company",
    menuLabel: "Company",
    description: "Who PayKaro is, what it offers and the segments it serves.",
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

export type Route = { kind: "home" } | { kind: "segment"; key: SegmentKey } | { kind: "about"; key: AboutKey };

export const HOME: Route = { kind: "home" };

export function isAboutKey(value: string | undefined): value is AboutKey {
  return !!value && (ABOUT_KEYS as readonly string[]).includes(value);
}

export function parseRoute(parts: string[] | undefined): Route | null {
  if (!parts || parts.length === 0) return HOME;
  if (parts.length === 1 && isSegmentKey(parts[0])) return { kind: "segment", key: parts[0] };
  if (parts.length === 2 && parts[0] === "about" && isAboutKey(parts[1])) return { kind: "about", key: parts[1] };
  return null;
}

export function routeFromPathname(pathname: string | null): Route | null {
  return parseRoute((pathname ?? "/").split("/").filter(Boolean));
}

export function routePath(route: Route): string {
  if (route.kind === "home") return "/";
  if (route.kind === "segment") return `/${route.key}`;
  return `/about/${route.key}`;
}

export function aboutPath(key: AboutKey) {
  return `/about/${key}`;
}

/** Colour set a route paints with. Home and About use PayKaro's primary coral. */
export function routeSegment(route: Route): SegmentKey {
  return route.kind === "segment" ? route.key : "personal";
}

export function routeKey(route: Route): string {
  return route.kind === "home" ? "home" : `${route.kind}:${route.key}`;
}

export function sameRoute(a: Route, b: Route) {
  return routeKey(a) === routeKey(b);
}

export function routeTitle(route: Route): string {
  if (route.kind === "home") return "PayKaro | Banking, aasani say";
  if (route.kind === "segment") return `PayKaro ${segments[route.key].label} | Banking, aasani say`;
  return `${aboutPages[route.key].label} | PayKaro`;
}

export function routeDescription(route: Route): string {
  if (route.kind === "home")
    return "PayKaro brings domestic transfers, bill payments, Raast QR and assisted cash access closer to people, families, businesses and communities across Pakistan.";
  if (route.kind === "segment") return segments[route.key].description;
  return aboutPages[route.key].description;
}

export const ALL_ROUTES: Route[] = [
  HOME,
  ...SEGMENT_KEYS.map((key) => ({ kind: "segment", key }) as Route),
  ...ABOUT_KEYS.map((key) => ({ kind: "about", key }) as Route),
];
