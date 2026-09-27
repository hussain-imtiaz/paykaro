"use client";

import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SEGMENT_KEYS, segments, services, type SegmentKey } from "@/lib/content";
import { withBase } from "@/lib/base-path";
import { ABOUT_KEYS, HOME, aboutPages, pages, routePath, type Route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { ChevronDown, PillButton, RouteLink, SegmentLink, serviceIcons } from "./primitives";

const DESKTOP = "(min-width: 1024px)";
type NavKey = SegmentKey | "app" | "about";
const NAV_KEYS: NavKey[] = [...SEGMENT_KEYS, "app", "about"];

export function DesktopNav() {
  const { route, openDialog } = useSite();
  const [openKey, setOpenKey] = useState<NavKey | null>(null);
  const openRef = useRef<NavKey | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const triggers = useRef<Partial<Record<NavKey, HTMLElement | null>>>({});
  const suppressFocusOpen = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const current: NavKey | null =
    route.kind === "segment" ? route.key : route.kind === "about" ? "about" : route.kind === "page" && route.key === "app" ? "app" : null;

  const open = useCallback((k: NavKey) => {
    window.clearTimeout(timer.current);
    openRef.current = k === "app" ? null : k;
    setOpenKey(k === "app" ? null : k);
  }, []);
  const close = useCallback((returnFocus = false) => {
    window.clearTimeout(timer.current);
    const k = openRef.current;
    openRef.current = null;
    setOpenKey(null);
    if (returnFocus && k) {
      suppressFocusOpen.current = true;
      triggers.current[k]?.focus();
      suppressFocusOpen.current = false;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && openRef.current && close(true);
    const onDown = (e: PointerEvent) => {
      if (openRef.current && navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [close]);

  const register = useCallback((key: NavKey, el: HTMLElement | null) => {
    triggers.current[key] = el;
  }, []);
  const onTriggerFocus = useCallback(
    (key: NavKey) => {
      if (!suppressFocusOpen.current && window.matchMedia(DESKTOP).matches) open(key);
    },
    [open],
  );
  const onTriggerKey = useCallback(
    (e: React.KeyboardEvent, key: NavKey) => {
      if (e.key === "ArrowDown" && key !== "app") {
        e.preventDefault();
        open(key);
        requestAnimationFrame(() => document.querySelector<HTMLElement>(`#menu-${key} a, #menu-${key} button`)?.focus());
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const i = NAV_KEYS.indexOf(key);
        const next = NAV_KEYS[(i + (e.key === "ArrowRight" ? 1 : -1) + NAV_KEYS.length) % NAV_KEYS.length];
        triggers.current[next]?.focus();
      }
    },
    [open],
  );

  const label = (key: NavKey, text: string, chevron = true) => (
    <>
      <span className={cn(key === current && "underline decoration-seg decoration-2 underline-offset-[6px]")}>{text}</span>
      {chevron && <ChevronDown aria-hidden="true" strokeWidth={1.75} className={cn("size-3.5 transition-transform duration-300", openKey === key && "rotate-180")} />}
    </>
  );
  const triggerClass = (key: NavKey) =>
    cn("flex h-[68px] items-center gap-1 rounded-md transition-opacity duration-200", key === current ? "opacity-100" : "opacity-80 hover:opacity-100");
  const hover = (key: NavKey) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") open(key);
  };

  return (
    <motion.nav
      ref={navRef}
      aria-label="Main"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
      className="relative z-30 hidden h-[68px] items-center px-6 text-white lg:flex"
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") timer.current = window.setTimeout(() => close(), 160);
      }}
      onPointerEnter={() => window.clearTimeout(timer.current)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
    >
      <RouteLink to={HOME} aria-label="PayKaro home" className="shrink-0 rounded-md">
        <PaykaroLogo decorative className="w-[46px]" />
      </RouteLink>

      <ul className="mx-auto flex items-center gap-[clamp(20px,4.2vw,72px)] font-nav text-[14px]">
        {SEGMENT_KEYS.map((key) => (
          <li key={key} className="relative" data-seg={key}>
            <SegmentLink
              segment={key}
              ref={(el) => register(key, el)}
              aria-expanded={openKey === key}
              aria-controls={`menu-${key}`}
              data-trigger={key}
              onPointerEnter={hover(key)}
              onFocus={() => onTriggerFocus(key)}
              onKeyDown={(e) => onTriggerKey(e, key)}
              aria-current={key === current ? "page" : undefined}
              className={triggerClass(key)}
              onNavigate={() => close()}
            >
              {label(key, segments[key].label)}
            </SegmentLink>
            {openKey === key && <SegmentMenu segmentKey={key} onClose={close} />}
          </li>
        ))}
        <li>
          <RouteLink
            to={{ kind: "page", key: "app" }}
            ref={(el) => register("app", el)}
            data-trigger="app"
            onPointerEnter={hover("app")}
            onFocus={() => close()}
            onKeyDown={(e) => onTriggerKey(e, "app")}
            aria-current={current === "app" ? "page" : undefined}
            className={triggerClass("app")}
          >
            {label("app", pages.app.label, false)}
          </RouteLink>
        </li>
        <li className="relative" data-seg="individuals">
          <button
            type="button"
            ref={(el) => register("about", el)}
            aria-expanded={openKey === "about"}
            aria-controls="menu-about"
            data-trigger="about"
            onPointerEnter={hover("about")}
            onFocus={() => onTriggerFocus("about")}
            onKeyDown={(e) => onTriggerKey(e, "about")}
            className={triggerClass("about")}
            onClick={() => (openKey === "about" ? close() : open("about"))}
          >
            {label("about", "About Us")}
          </button>
          {openKey === "about" && <AboutMenu onClose={close} />}
        </li>
      </ul>

      <div className="flex shrink-0 items-center gap-2">
        <RouteLink
          to={{ kind: "page", key: "help" }}
          aria-current={route.kind === "page" && route.key === "help" ? "page" : undefined}
          className="flex h-10 items-center rounded-full px-3 font-ui text-[16px] text-white/90 hover:text-white"
        >
          Get Help
        </RouteLink>
        <PillButton label="Get PayKaro" onClick={() => openDialog({ type: "info", key: "getpaykaro" })} />
      </div>
    </motion.nav>
  );
}

const menuMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: [0.44, 0, 0.56, 1] },
} as const;

function menuKeys(onClose: (returnFocus?: boolean) => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose(true);
    }
  };
}

function SegmentMenu({ segmentKey, onClose }: { segmentKey: SegmentKey; onClose: (returnFocus?: boolean) => void }) {
  const { openDialog, navigate } = useSite();
  const s = segments[segmentKey];
  return (
    <motion.div
      id={`menu-${segmentKey}`}
      {...menuMotion}
      className="absolute top-[58px] left-1/2 w-[640px] -translate-x-1/2 rounded-xl border border-white/10 bg-night/95 p-5 text-white shadow-2xl backdrop-blur-md"
      style={{ originY: 0 }}
      onKeyDown={menuKeys(onClose)}
    >
      <div className="flex items-center gap-3">
        <PaykaroLogo decorative className="w-[40px]" />
        <p className="font-heading text-[18px] font-medium">PayKaro for {s.pathway}</p>
      </div>
      <div className="mt-5 grid grid-cols-[200px_1fr] gap-6">
        <div>
          <p className="text-[13px] text-white/55">On this page</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            {s.journeys.map((j) => (
              <li key={j.id}>
                <a
                  href={withBase(`/${segmentKey}#${j.id}`)}
                  className="text-white hover:text-seg-bright"
                  onClick={(e) => {
                    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    onClose();
                    navigate(segmentKey, j.id);
                  }}
                >
                  {j.nav}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] text-white/55">Services</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
            {s.services.map((k) => {
              const Icon = serviceIcons[k];
              return (
                <li key={k}>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-left text-white/80 hover:text-seg-bright"
                    onClick={() => {
                      onClose(true);
                      openDialog({ type: "service", key: k });
                    }}
                  >
                    <Icon className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    {services[k].name.replace(/^PayKaro /, "")}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function AboutMenu({ onClose }: { onClose: (returnFocus?: boolean) => void }) {
  const { route } = useSite();
  return (
    <motion.div
      id="menu-about"
      {...menuMotion}
      className="absolute top-[58px] right-0 w-[380px] rounded-xl border border-white/10 bg-night/95 p-2 text-white shadow-2xl backdrop-blur-md"
      style={{ originY: 0 }}
      onKeyDown={menuKeys(onClose)}
    >
      <ul>
        {ABOUT_KEYS.map((k) => {
          const active = route.kind === "about" && route.key === k;
          return (
            <li key={k}>
              <RouteLink
                to={{ kind: "about", key: k }}
                aria-current={active ? "page" : undefined}
                onNavigate={() => onClose()}
                className="group flex flex-col rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
              >
                <span className={cn("text-[15px] font-medium", active && "text-seg-bright")}>{aboutPages[k].menuLabel}</span>
                <span className="mt-0.5 text-[13px] leading-[1.25] text-white/60">{aboutPages[k].description}</span>
              </RouteLink>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function contextLinks(route: Route): { label: string; to: Route; hash?: string }[] {
  if (route.kind === "segment") return segments[route.key].journeys.map((j) => ({ label: j.nav, to: route, hash: j.id }));
  if (route.kind !== "home") return [];
  return [
    { label: "Our promise", to: HOME, hash: "promise" },
    { label: "Choose your pathway", to: HOME, hash: "segments" },
    { label: "All services", to: HOME, hash: "universe" },
    { label: "Try it: start with an intent", to: HOME, hash: "demo" },
    { label: "FAQ", to: HOME, hash: "faq" },
  ];
}

/** Fixed mobile bar that hides while scrolling down and returns on scroll up. */
export function MobileNav() {
  const { route, segment, go, openDialog } = useSite();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const skipReturn = useRef(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(y < 40);
    if (y > 120 && y > prev + 2) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });

  const goTo = (to: Route, hash?: string) => {
    skipReturn.current = true;
    setOpen(false);
    go(to, hash);
  };
  const action = (fn: () => void) => {
    skipReturn.current = true;
    setOpen(false);
    fn();
  };
  const links = contextLinks(route);
  const contextName = route.kind === "segment" ? segments[route.key].label : "Home";
  const linkClick = (to: Route, hash?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    goTo(to, hash);
  };
  const isRoute = (r: Route) => routePath(r) === routePath(route);
  const extra: Route[] = [
    { kind: "page", key: "app" },
    { kind: "page", key: "trust" },
    { kind: "page", key: "help" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-[68px] items-center justify-between px-4 lg:hidden",
        atTop ? "text-white" : "bg-paper text-ink shadow-[0_1px_0_var(--line)]",
      )}
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
    >
      <RouteLink to={HOME} aria-label="PayKaro home" className="rounded-md">
        <PaykaroLogo decorative className="w-[42px]" />
      </RouteLink>
      <Sheet
        open={open}
        onOpenChange={(v) => {
          if (v) skipReturn.current = false;
          setOpen(v);
        }}
      >
        <SheetTrigger className="flex size-11 items-center justify-center rounded-full" aria-label="Open menu">
          <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
        </SheetTrigger>
        <SheetContent
          side="top"
          showCloseButton={false}
          finalFocus={() => !skipReturn.current}
          className="h-[100svh] gap-0 overflow-y-auto bg-paper p-0 text-ink data-[side=top]:h-[100svh]"
          data-lenis-prevent
        >
          <div className="flex h-[68px] shrink-0 items-center justify-between px-4">
            <PaykaroLogo decorative className="w-[42px]" />
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetClose className="flex size-11 items-center justify-center rounded-full" aria-label="Close menu">
              <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </SheetClose>
          </div>
          <nav aria-label="Pathways" className="px-4 pt-4">
            <ul className="divide-y divide-line border-y border-line">
              {SEGMENT_KEYS.map((k) => {
                const active = route.kind === "segment" && route.key === k;
                return (
                  <li key={k} data-seg={k}>
                    <a
                      href={withBase(`/${k}`)}
                      aria-current={active ? "page" : undefined}
                      className="flex items-center justify-between py-4 font-heading text-[28px] leading-none font-medium"
                      onClick={linkClick({ kind: "segment", key: k })}
                    >
                      {segments[k].label}
                      <span className={cn("size-3 rounded-full bg-seg", !active && "opacity-30")} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
              {extra.map((r) => (
                <li key={routePath(r)}>
                  <a
                    href={withBase(routePath(r))}
                    aria-current={isRoute(r) ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-heading text-[28px] leading-none font-medium"
                    onClick={linkClick(r)}
                  >
                    {r.kind === "page" ? pages[r.key].label : ""}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="About Us" className="px-4 pt-8">
            <p className="text-[13px] text-faint-ink">About Us</p>
            <ul className="mt-3 space-y-3 text-[17px]">
              {ABOUT_KEYS.map((k) => (
                <li key={k}>
                  <a
                    href={withBase(`/about/${k}`)}
                    aria-current={route.kind === "about" && route.key === k ? "page" : undefined}
                    className="hover:text-seg-ink aria-[current=page]:text-seg-ink"
                    onClick={linkClick({ kind: "about", key: k })}
                  >
                    {aboutPages[k].menuLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {links.length > 0 && (
            <div className="px-4 pt-8" data-seg={segment}>
              <p className="text-[13px] text-faint-ink">On this page · {contextName}</p>
              <ul className="mt-3 space-y-3 text-[17px]">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={withBase(routePath(l.to) + (l.hash ? `#${l.hash}` : ""))} className="hover:text-seg-ink" onClick={linkClick(l.to, l.hash)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-auto flex gap-3 p-4 pt-10">
            <PillButton label="Get PayKaro" size="lg" className="flex-1" onClick={() => action(() => openDialog({ type: "info", key: "getpaykaro" }))} />
            <PillButton label="Get Help" variant="outline" size="lg" className="flex-1" onClick={() => goTo({ kind: "page", key: "help" })} />
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
