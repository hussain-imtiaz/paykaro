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
import {
  isSegmentKey,
  segmentPath,
  segments,
  type DemoKey,
  type InfoKey,
  type SegmentKey,
  type ServiceKey,
} from "@/lib/content";
import { scrollToTarget } from "@/lib/smooth-scroll";

export type DialogState =
  | { type: "service"; key: ServiceKey }
  | { type: "info"; key: InfoKey }
  | { type: "all-services" }
  | { type: "urdu" }
  | { type: "search" }
  | null;

interface SiteContextValue {
  segment: SegmentKey;
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

function segmentFromPath(pathname: string | null, fallback: SegmentKey): SegmentKey {
  if (!pathname) return fallback;
  const first = pathname.split("/").filter(Boolean)[0];
  if (!first) return "personal";
  return isSegmentKey(first) ? first : fallback;
}

function focusSectionHeading(el: HTMLElement) {
  const heading = el.querySelector<HTMLElement>("h2, h3");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

export function SiteProvider({ initialSegment, children }: { initialSegment: SegmentKey; children: ReactNode }) {
  const pathname = usePathname();
  const segment = segmentFromPath(pathname, initialSegment);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [demoChoice, setDemoChoice] = useState<{ segment: SegmentKey; key: DemoKey | null } | null>(null);
  const demo = demoChoice?.segment === segment ? demoChoice.key : null;
  const setDemo = useCallback((key: DemoKey | null) => setDemoChoice({ segment, key }), [segment]);
  const pendingHash = useRef<string | null>(null);

  // Body carries the tokens too, so portalled dialogs and sheets inherit segment colours.
  useIsoLayoutEffect(() => {
    document.body.dataset.seg = segment;
    document.body.dataset.theme = segment === "business" ? "dark" : "light";
    document.title = `PayKaro ${segments[segment].label} | Banking, aasani say`;
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (icon) icon.href = `/brand/logo-${segment}.svg`;
  }, [segment]);

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
  }, [segment, pathname]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    scrollToTarget(el);
    focusSectionHeading(el);
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const navigate = useCallback(
    (key: SegmentKey, hash?: string) => {
      const url = segmentPath(key) + (hash ? `#${hash}` : "");
      if (key === segment) {
        if (hash) scrollToSection(hash);
        else scrollToTarget(0);
        return;
      }
      pendingHash.current = hash ?? null;
      window.history.pushState(null, "", url);
      if (!hash) scrollToTarget(0, { immediate: true });
    },
    [segment, scrollToSection],
  );

  const openDialog = useCallback((d: Exclude<DialogState, null>) => setDialog(d), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const pendingDemoFocus = useRef<DemoKey | null>(null);

  const revealDemo = useCallback((key: DemoKey) => {
    const el = document.getElementById("demo");
    if (el) scrollToTarget(el);
    document.getElementById(`demo-tab-${key}`)?.focus({ preventScroll: true });
  }, []);

  const showDemo = useCallback(
    (key: DemoKey) => {
      setDemo(key);
      if (dialog) {
        // The dialog restores focus and releases its scroll lock on close, so reveal the demo afterwards.
        pendingDemoFocus.current = key;
        setDialog(null);
      } else {
        requestAnimationFrame(() => revealDemo(key));
      }
    },
    [setDemo, dialog, revealDemo],
  );

  /** Called by the dialog when choosing where focus goes on close. */
  const resolveDialogFocus = useCallback(() => {
    const key = pendingDemoFocus.current;
    pendingDemoFocus.current = null;
    if (!key) return true;
    requestAnimationFrame(() => revealDemo(key));
    return false;
  }, [revealDemo]);

  const value = useMemo(
    () => ({
      segment,
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
    [segment, navigate, scrollToSection, dialog, openDialog, closeDialog, demo, setDemo, showDemo, resolveDialogFocus],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
