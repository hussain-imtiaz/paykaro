"use client";

import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SEGMENT_KEYS, segments, services, type SegmentKey } from "@/lib/content";
import { ABOUT_KEYS, HOME, aboutPages, aboutPath, routePath, type Route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { ChevronDown, PillButton, RouteLink, SegmentLink } from "./primitives";

const DESKTOP = "(min-width: 1024px)";
type NavKey = SegmentKey | "about";
const NAV_KEYS: NavKey[] = [...SEGMENT_KEYS, "about"];

export function DesktopNav() {
  const { route, openDialog } = useSite();
  const [openKey, setOpenKey] = useState<NavKey | null>(null);
  const openRef = useRef<NavKey | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const triggers = useRef<Partial<Record<NavKey, HTMLElement | null>>>({});
  const suppressFocusOpen = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const current: NavKey | null = route.kind === "segment" ? route.key : route.kind === "about" ? "about" : null;

  const open = useCallback((k: NavKey) => {
    window.clearTimeout(timer.current);
    openRef.current = k;
    setOpenKey(k);
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
      if (e.key === "ArrowDown") {
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

  const label = (key: NavKey, text: string) => (
    <>
      <span className={cn(key === current && "underline decoration-seg decoration-2 underline-offset-[6px]")}>{text}</span>
      <ChevronDown aria-hidden="true" strokeWidth={1.75} className={cn("size-3.5 transition-transform duration-300", openKey === key && "rotate-180")} />
    </>
  );
  const triggerClass = (key: NavKey) =>
    cn("flex h-[68px] items-center gap-1 rounded-md transition-opacity duration-200", key === current ? "opacity-100" : "opacity-80 hover:opacity-100");

  return (
    <motion.nav
      ref={navRef}
      aria-label="Main"
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4, ease: [0.93, 0.03, 0.56, 1] }}
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

      <ul className="mx-auto flex items-center gap-[clamp(20px,4.2vw,84px)] font-nav text-[14px]">
        {SEGMENT_KEYS.map((key) => (
          <li key={key} className="relative" data-seg={key}>
            <SegmentLink
              segment={key}
              ref={(el) => register(key, el)}
              aria-expanded={openKey === key}
              aria-controls={`menu-${key}`}
              data-trigger={key}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") open(key);
              }}
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
        <li className="relative" data-seg="personal">
          <button
            type="button"
            ref={(el) => register("about", el)}
            aria-expanded={openKey === "about"}
            aria-controls="menu-about"
            data-trigger="about"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") open("about");
            }}
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
        <button
          type="button"
          className="h-10 rounded-full px-3 font-ui text-[16px] text-white/90 hover:text-white"
          onClick={() => openDialog({ type: "info", key: "login" })}
        >
          Login
        </button>
        <PillButton label="Get started" onClick={() => openDialog({ type: "info", key: "onboarding" })} />
      </div>
    </motion.nav>
  );
}

const menuMotion = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", bounce: 0.2, duration: 0.35 },
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
      className="absolute top-[58px] left-1/2 w-[620px] -translate-x-1/2 rounded-xl border border-white/10 bg-night/95 p-5 text-white shadow-2xl backdrop-blur-md"
      style={{ originY: 0 }}
      onKeyDown={menuKeys(onClose)}
    >
      <div className="flex items-center gap-3">
        <PaykaroLogo decorative className="w-[40px]" />
        <p className="font-heading text-[18px] font-medium">PayKaro {s.label}</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-6">
        {s.journeys.map((j) => (
          <div key={j.id}>
            <p className="text-[13px] text-white/55">{j.nav}</p>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li>
                <a
                  href={`/${segmentKey}#${j.id}`}
                  className="text-white hover:text-seg-bright"
                  onClick={(e) => {
                    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    onClose();
                    navigate(segmentKey, j.id);
                  }}
                >
                  {j.menuLabel}
                </a>
              </li>
              {j.services.map((k) => (
                <li key={k}>
                  <button
                    type="button"
                    className="text-left text-white/80 hover:text-seg-bright"
                    onClick={() => {
                      onClose(true);
                      openDialog({ type: "service", key: k });
                    }}
                  >
                    {services[k].short}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
  if (route.kind === "segment") {
    const s = segments[route.key];
    return s.journeys.map((j) => ({ label: j.menuLabel, to: route, hash: j.id }));
  }
  if (route.kind === "about") return [];
  return [
    { label: "Our services", to: HOME, hash: "services" },
    { label: "Choose your PayKaro", to: HOME, hash: "segments" },
    { label: "Try the app concept", to: HOME, hash: "demo" },
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
  const contextName = route.kind === "segment" ? segments[route.key].label : "PayKaro";
  const linkClick = (to: Route, hash?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    goTo(to, hash);
  };

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-[68px] items-center justify-between px-4 lg:hidden",
        atTop ? "text-white" : "bg-paper text-ink shadow-[0_1px_0_var(--line)]",
      )}
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
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
          <nav aria-label="Segments" className="px-4 pt-4">
            <ul className="divide-y divide-line border-y border-line">
              {SEGMENT_KEYS.map((k) => {
                const active = route.kind === "segment" && route.key === k;
                return (
                  <li key={k} data-seg={k}>
                    <a
                      href={`/${k}`}
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
            </ul>
          </nav>
          <nav aria-label="About Us" className="px-4 pt-8">
            <p className="text-[13px] text-faint-ink">About Us</p>
            <ul className="mt-3 space-y-3 text-[17px]">
              {ABOUT_KEYS.map((k) => (
                <li key={k}>
                  <a
                    href={aboutPath(k)}
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
                    <a href={routePath(l.to) + (l.hash ? `#${l.hash}` : "")} className="hover:text-seg-ink" onClick={linkClick(l.to, l.hash)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-auto flex gap-3 p-4 pt-10">
            <PillButton label="Get started" size="lg" className="flex-1" onClick={() => action(() => openDialog({ type: "info", key: "onboarding" }))} />
            <PillButton label="Login" variant="outline" size="lg" className="flex-1" onClick={() => action(() => openDialog({ type: "info", key: "login" }))} />
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
