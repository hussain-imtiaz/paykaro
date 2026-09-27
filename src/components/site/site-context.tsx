"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type DemoKey, type InfoKey, type SegmentKey, type ServiceKey } from "@/lib/content";
import { withBase } from "@/lib/base-path";
import { routeFromPathname, routeKey, routePath, routeSegment, routeTitle, sameRoute, type Route } from "@/lib/routes";
import { scrollToTarget } from "@/lib/smooth-scroll";

export type DialogState =
  | { type: "service"; key: ServiceKey }
  | { type: "info"; key: InfoKey }
  | { type: "all-services" }
  | { type: "urdu" }
  | { type: "search" }
  | null;

interface SiteContextValue {
  route: Route;
  /** Colour set in use: the segment on a segment page, Personal coral elsewhere. */
  segment: SegmentKey;
  go: (route: Route, hash?: string) => void;
  navigate: (key: SegmentKey, hash?: string) => void;
  scrollToSection: (id: string) => void;
  dialog: DialogState;
  openDialog: (d: Exclude<DialogState, null>) => void;
  closeDialog: () => void;
  demo: DemoKey | null;
  setDemo: (key: DemoKey | null) => void;
  showDemo: (key: DemoKey) => void;
  resolveDialogFocus: () => boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function focusSectionHeading(el: HTMLElement) {
  const heading = el.matches("h1, h2, h3") ? el : el.querySelector<HTMLElement>("h2, h3");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

export function SiteProvider({ initialRoute, children }: { initialRoute: Route; children: ReactNode }) {
  const pathname = usePathname();
  const route = routeFromPathname(pathname) ?? initialRoute;
  const key = routeKey(route);
  const segment = routeSegment(route);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [demoChoice, setDemoChoice] = useState<{ page: string; key: DemoKey | null } | null>(null);
  const demo = demoChoice?.page === key ? demoChoice.key : null;
  const setDemo = useCallback((k: DemoKey | null) => setDemoChoice({ page: key, key: k }), [key]);
  const pendingHash = useRef<string | null>(null);

  // Body carries the tokens too, so portalled dialogs and sheets inherit segment colours.
  useIsoLayoutEffect(() => {
    document.body.dataset.seg = segment;
    document.body.dataset.theme = route.kind === "segment" && route.key === "business" ? "dark" : "light";
    document.title = routeTitle(route);
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (icon) icon.href = withBase(`/brand/logo-${segment}.svg`);
  }, [key]);

  useEffect(() => {
    const hash = pendingHash.current;
    pendingHash.current = null;
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        scrollToTarget(el);
        focusSectionHeading(el);
      }
    }
  }, [key]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    scrollToTarget(el);
    focusSectionHeading(el);
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const go = useCallback(
    (to: Route, hash?: string) => {
      if (sameRoute(to, route)) {
        if (hash) scrollToSection(hash);
        else scrollToTarget(0);
        return;
      }
      pendingHash.current = hash ?? null;
      window.history.pushState(null, "", withBase(routePath(to) + (hash ? `#${hash}` : "")));
      if (!hash) scrollToTarget(0, { immediate: true });
    },
    [route, scrollToSection],
  );

  const navigate = useCallback((k: SegmentKey, hash?: string) => go({ kind: "segment", key: k }, hash), [go]);

  const openDialog = useCallback((d: Exclude<DialogState, null>) => setDialog(d), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const pendingDemoFocus = useRef<DemoKey | null>(null);

  const revealDemo = useCallback((k: DemoKey) => {
    const el = document.getElementById("demo");
    if (el) scrollToTarget(el);
    document.getElementById(`demo-tab-${k}`)?.focus({ preventScroll: true });
  }, []);

  const showDemo = useCallback(
    (k: DemoKey) => {
      if (!document.getElementById("demo")) {
        setDialog(null);
        setDemoChoice({ page: routeKey({ kind: "home" }), key: k });
        go({ kind: "home" }, "demo");
        return;
      }
      setDemo(k);
      if (dialog) {
        // The dialog restores focus and releases its scroll lock on close, so reveal the demo afterwards.
        pendingDemoFocus.current = k;
        setDialog(null);
      } else {
        requestAnimationFrame(() => revealDemo(k));
      }
    },
    [setDemo, dialog, revealDemo, go],
  );

  /** Called by the dialog when choosing where focus goes on close. */
  const resolveDialogFocus = useCallback(() => {
    const k = pendingDemoFocus.current;
    pendingDemoFocus.current = null;
    if (!k) return true;
    requestAnimationFrame(() => revealDemo(k));
    return false;
  }, [revealDemo]);

  const value = useMemo(
    () => ({
      route,
      segment,
      go,
      navigate,
      scrollToSection,
      dialog,
      openDialog,
      closeDialog,
      demo,
      setDemo,
      showDemo,
      resolveDialogFocus,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, segment, go, navigate, scrollToSection, dialog, openDialog, closeDialog, demo, setDemo, showDemo, resolveDialogFocus],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
