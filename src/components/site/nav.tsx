"use client";

import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SEGMENT_KEYS, segmentPath, segments, services, type SegmentKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { ChevronDown, PillButton, SegmentLink } from "./primitives";

const DESKTOP = "(min-width: 1024px)";

export function DesktopNav() {
  const { segment, openDialog } = useSite();
  const [openKey, setOpenKey] = useState<SegmentKey | null>(null);
  const openRef = useRef<SegmentKey | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const triggers = useRef<Partial<Record<SegmentKey, HTMLAnchorElement | null>>>({});
  const suppressFocusOpen = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  const open = useCallback((k: SegmentKey) => {
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

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative z-30 hidden h-[68px] items-center px-6 text-white lg:flex"
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") timer.current = window.setTimeout(() => close(), 160);
      }}
      onPointerEnter={() => window.clearTimeout(timer.current)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
    >
      <SegmentLink segment={segment} aria-label={`PayKaro ${segments[segment].label} home`} className="shrink-0 rounded-md">
        <PaykaroLogo decorative className="w-[46px]" />
      </SegmentLink>

      <ul className="mx-auto flex items-center gap-[clamp(24px,6vw,110px)] font-nav text-[14px]">
        {SEGMENT_KEYS.map((key, i) => (
          <li key={key} className="relative" data-seg={key}>
            <SegmentLink
              segment={key}
              ref={(el) => {
                triggers.current[key] = el;
              }}
              aria-current={key === segment ? "page" : undefined}
              aria-expanded={openKey === key}
              aria-controls={`menu-${key}`}
              data-trigger={key}
              className={cn(
                "flex h-[68px] items-center gap-1 rounded-md transition-opacity duration-200",
                key === segment ? "opacity-100" : "opacity-80 hover:opacity-100",
              )}
              onNavigate={() => close()}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") open(key);
              }}
              onFocus={() => {
                if (!suppressFocusOpen.current && window.matchMedia(DESKTOP).matches) open(key);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  open(key);
                  requestAnimationFrame(() =>
                    document.querySelector<HTMLElement>(`#menu-${key} a, #menu-${key} button`)?.focus(),
                  );
                } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next = SEGMENT_KEYS[(i + (e.key === "ArrowRight" ? 1 : -1) + 5) % 5];
                  triggers.current[next]?.focus();
                }
              }}
            >
              <span className={cn(key === segment && "underline decoration-seg decoration-2 underline-offset-[6px]")}>
                {segments[key].label}
              </span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.75}
                className={cn("size-3.5 transition-transform duration-300", openKey === key && "rotate-180")}
              />
            </SegmentLink>
            {openKey === key && <Dropdown segmentKey={key} onClose={close} />}
          </li>
        ))}
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
    </nav>
  );
}

function Dropdown({ segmentKey, onClose }: { segmentKey: SegmentKey; onClose: (returnFocus?: boolean) => void }) {
  const { openDialog, navigate } = useSite();
  const s = segments[segmentKey];
  return (
    <motion.div
      id={`menu-${segmentKey}`}
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
      className="absolute top-[58px] left-1/2 w-[620px] -translate-x-1/2 rounded-xl border border-white/10 bg-night/95 p-5 text-white shadow-2xl backdrop-blur-md"
      style={{ originY: 0 }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose(true);
        }
      }}
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
                  href={`${segmentPath(segmentKey)}#${j.id}`}
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

/** Fixed mobile bar that hides while scrolling down and returns on scroll up. */
export function MobileNav() {
  const { segment, navigate, openDialog } = useSite();
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

  const go = (k: SegmentKey, hash?: string) => {
    skipReturn.current = true;
    setOpen(false);
    navigate(k, hash);
  };
  const action = (fn: () => void) => {
    skipReturn.current = true;
    setOpen(false);
    fn();
  };
  const s = segments[segment];

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-[68px] items-center justify-between px-4 lg:hidden",
        atTop ? "text-white" : "bg-paper text-ink shadow-[0_1px_0_var(--line)]",
      )}
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
    >
      <SegmentLink segment={segment} aria-label={`PayKaro ${s.label} home`} className="rounded-md">
        <PaykaroLogo decorative className="w-[42px]" />
      </SegmentLink>
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
              {SEGMENT_KEYS.map((k) => (
                <li key={k} data-seg={k}>
                  <a
                    href={segmentPath(k)}
                    aria-current={k === segment ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-heading text-[28px] leading-none font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      go(k);
                    }}
                  >
                    {segments[k].label}
                    <span className={cn("size-3 rounded-full bg-seg", k !== segment && "opacity-30")} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-4 pt-8">
            <p className="text-[13px] text-faint-ink">In {s.label}</p>
            <ul className="mt-3 space-y-3 text-[17px]">
              {[...s.journeys.map((j) => [j.id, j.menuLabel] as const), ["demo", "Try the app concept"] as const, ["faq", "FAQ"] as const].map(
                ([hash, label]) => (
                  <li key={hash}>
                    <a
                      href={`${segmentPath(segment)}#${hash}`}
                      className="hover:text-seg-ink"
                      onClick={(e) => {
                        e.preventDefault();
                        go(segment, hash);
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="mt-auto flex gap-3 p-4 pt-10">
            <PillButton label="Get started" size="lg" className="flex-1" onClick={() => action(() => openDialog({ type: "info", key: "onboarding" }))} />
            <PillButton label="Login" variant="outline" size="lg" className="flex-1" onClick={() => action(() => openDialog({ type: "info", key: "login" }))} />
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
