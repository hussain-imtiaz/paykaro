"use client";

import { Menu, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SEGMENT_KEYS, segments, services, type SegmentKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { Chevron, Roll, SegmentLink, buttonClass } from "./primitives";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function SiteHeader() {
  const { segment } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<SegmentKey | null>(null);
  const leaveTimer = useRef<number | undefined>(undefined);
  const triggerRefs = useRef<Partial<Record<SegmentKey, HTMLAnchorElement | null>>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openKeyRef = useRef<SegmentKey | null>(null);
  const suppressFocusOpen = useRef(false);

  const close = useCallback((returnFocus = false) => {
    window.clearTimeout(leaveTimer.current);
    const current = openKeyRef.current;
    openKeyRef.current = null;
    setOpenKey(null);
    if (returnFocus && current) {
      suppressFocusOpen.current = true;
      triggerRefs.current[current]?.focus({ preventScroll: true });
      suppressFocusOpen.current = false;
    }
  }, []);

  const open = useCallback((key: SegmentKey) => {
    window.clearTimeout(leaveTimer.current);
    openKeyRef.current = key;
    setOpenKey(key);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openKey) close(true);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (openKey && headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openKey, close]);

  const business = segment === "business";
  const overlay = !business && !scrolled && !openKey;
  const theme = business || overlay ? "dark" : "light";

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, key: SegmentKey) => {
    const i = SEGMENT_KEYS.indexOf(key);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      open(key);
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus());
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = SEGMENT_KEYS[(i + (e.key === "ArrowRight" ? 1 : -1) + SEGMENT_KEYS.length) % SEGMENT_KEYS.length];
      triggerRefs.current[next]?.focus();
    }
  };

  return (
    <header
      ref={headerRef}
      data-theme={theme}
      className={cn(
        "fixed inset-x-0 top-0 z-40 text-fg transition-[background-color,box-shadow] duration-200",
        business && "bg-charcoal shadow-[0_1px_0_rgba(255,255,255,0.08)]",
        !business && !overlay && "bg-surface/95 shadow-[0_1px_0_rgba(25,30,48,0.08)] backdrop-blur-md",
        overlay && "bg-gradient-to-b from-black/45 to-transparent",
      )}
      onPointerEnter={() => window.clearTimeout(leaveTimer.current)}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") leaveTimer.current = window.setTimeout(() => close(), 180);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1280px] items-center gap-6 px-5 sm:px-8">
        <SegmentLink
          segment={segment}
          aria-label={`PayKaro ${segments[segment].label} home`}
          className="shrink-0 rounded-[var(--radius-btn)]"
          onNavigate={() => close()}
        >
          <PaykaroLogo decorative className="w-[64px]" />
        </SegmentLink>

        <nav aria-label="Banking segments" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {SEGMENT_KEYS.map((key) => {
              const current = key === segment;
              return (
                <li key={key} data-seg={key}>
                  <SegmentLink
                    segment={key}
                    ref={(el) => {
                      triggerRefs.current[key] = el;
                    }}
                    aria-current={current ? "page" : undefined}
                    aria-expanded={openKey === key}
                    aria-controls="segment-menu"
                    className={cn(
                      "relative flex h-[var(--header-h)] items-center gap-1 px-3.5 text-[15px] font-medium",
                      "after:absolute after:inset-x-3.5 after:bottom-[18px] after:h-[2px] after:rounded-full after:bg-seg-text after:opacity-0",
                      current && "font-semibold after:opacity-100",
                      openKey === key && !current && "after:opacity-40",
                    )}
                    onNavigate={() => close()}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse" && window.matchMedia(DESKTOP_QUERY).matches) open(key);
                    }}
                    onFocus={() => {
                      if (!suppressFocusOpen.current && window.matchMedia(DESKTOP_QUERY).matches) open(key);
                    }}
                    onKeyDown={(e) => onTriggerKeyDown(e, key)}
                    data-trigger={key}
                  >
                    {segments[key].label}
                  </SegmentLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <HeaderUtilities />
          <MobileNav />
        </div>
      </div>

      {openKey && (
        <MegaMenu
          ref={panelRef}
          menuKey={openKey}
          onClose={close}
          theme={business ? "dark" : "light"}
        />
      )}
    </header>
  );
}

function HeaderUtilities() {
  const { openDialog } = useSite();
  return (
    <>
      <button
        type="button"
        className="hidden size-10 items-center justify-center rounded-[var(--radius-btn)] hover:bg-current/10 sm:flex"
        aria-label="Search services"
        onClick={() => openDialog({ type: "search" })}
      >
        <Search className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        lang="ur"
        className="hidden h-10 items-center rounded-[var(--radius-btn)] px-2.5 text-[15px] hover:bg-current/10 sm:flex"
        aria-label="Read guidance in Urdu"
        onClick={() => openDialog({ type: "urdu" })}
      >
        اردو
      </button>
      <button
        type="button"
        className="hidden h-10 items-center rounded-[var(--radius-btn)] px-3 text-[15px] font-medium hover:bg-current/10 md:flex"
        onClick={() => openDialog({ type: "info", key: "login" })}
      >
        Login
      </button>
      <button
        type="button"
        className={cn(buttonClass("primary", "sm"), "hidden sm:inline-flex")}
        onClick={() => openDialog({ type: "info", key: "onboarding" })}
      >
        <Roll>Get started</Roll>
        <Chevron className="chev-shift" />
      </button>
    </>
  );
}

function MegaMenu({
  menuKey,
  onClose,
  theme,
  ref,
}: {
  menuKey: SegmentKey;
  onClose: (returnFocus?: boolean) => void;
  theme: "light" | "dark";
  ref: React.Ref<HTMLDivElement>;
}) {
  const { openDialog, navigate } = useSite();
  const s = segments[menuKey];
  return (
    <div
      ref={ref}
      id="segment-menu"
      data-seg={menuKey}
      data-theme={theme}
      className={cn(
        "absolute inset-x-0 top-full hidden border-t-2 border-seg lg:block",
        "animate-in fade-in-0 slide-in-from-top-1 duration-150",
        theme === "dark" ? "bg-charcoal" : "bg-surface",
        "shadow-[0_24px_48px_-24px_rgba(25,30,48,0.35)]",
      )}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose(true);
        }
      }}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1.1fr_repeat(3,1fr)_0.9fr] gap-8 px-8 py-9 text-fg">
        <div>
          <p className="text-[13px] font-semibold text-seg-text">PayKaro {s.label}</p>
          <p className="mt-2 font-heading text-[26px] leading-tight font-semibold tracking-tight">{s.menuTitle}</p>
          <SegmentLink
            segment={menuKey}
            className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-seg-text"
            onNavigate={() => onClose()}
          >
            Explore {s.label.toLowerCase()}
            <Chevron className="chev-shift" />
          </SegmentLink>
        </div>
        {s.journeys.map((j) => (
          <div key={j.id} className="border-l border-hairline pl-6">
            <p className="text-[13px] font-semibold text-fg-muted">{j.nav}</p>
            <a
              href={`${menuKey === "personal" ? "/" : `/${menuKey}`}#${j.id}`}
              className="group mt-3 flex items-center gap-1 text-[16px] leading-snug font-semibold hover:text-seg-text"
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onClose();
                navigate(menuKey, j.id);
              }}
            >
              {j.menuLabel}
              <Chevron className="chev-shift size-3.5" />
            </a>
            <ul className="mt-3 space-y-1.5">
              {j.services.map((k) => (
                <li key={k}>
                  <button
                    type="button"
                    className="text-left text-[14px] text-fg-muted hover:text-fg hover:underline"
                    onClick={() => {
                      onClose();
                      openDialog({ type: "service", key: k });
                    }}
                  >
                    {services[k].short}
                  </button>
                </li>
              ))}
              {j.partner && (
                <li>
                  <button
                    type="button"
                    className="text-left text-[14px] text-fg-muted hover:text-fg hover:underline"
                    onClick={() => {
                      onClose();
                      openDialog({ type: "info", key: "retail" });
                    }}
                  >
                    Retail partnership details
                  </button>
                </li>
              )}
            </ul>
          </div>
        ))}
        <div className="rounded-[var(--radius-card)] bg-[var(--tint)] p-5">
          <p className="text-[13px] font-semibold text-fg-muted">Here to help</p>
          <ul className="mt-3 space-y-2 text-[14px] font-medium">
            {[
              ["demo", "Service walkthroughs"],
              ["faq", "Questions & answers"],
              ["safety", "Banking safely"],
            ].map(([hash, label]) => (
              <li key={hash}>
                <SegmentLink
                  segment={menuKey}
                  hash={hash}
                  className="hover:text-seg-text hover:underline"
                  onNavigate={() => onClose()}
                >
                  {label}
                </SegmentLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="hover:text-seg-text hover:underline"
                onClick={() => {
                  onClose();
                  openDialog({ type: "info", key: "login" });
                }}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  const { segment, navigate, openDialog } = useSite();
  const [open, setOpen] = useState(false);
  const skipFocusReturn = useRef(false);
  const s = segments[segment];

  const go = (key: SegmentKey, hash?: string) => {
    skipFocusReturn.current = true;
    setOpen(false);
    navigate(key, hash);
  };
  const dialogAction = (fn: () => void) => {
    skipFocusReturn.current = true;
    setOpen(false);
    fn();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (next) skipFocusReturn.current = false;
        setOpen(next);
      }}
    >
      <SheetTrigger
        className="flex size-10 items-center justify-center rounded-[var(--radius-btn)] hover:bg-current/10 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto bg-page p-0 text-fg data-[side=right]:w-full data-[side=right]:sm:max-w-md"
        finalFocus={() => !skipFocusReturn.current}
      >
        <div className="flex h-[var(--header-h)] items-center px-5">
          <PaykaroLogo decorative className="w-[56px]" />
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </div>
        <nav aria-label="Banking segments" className="px-4">
          <ul className="grid gap-2">
            {SEGMENT_KEYS.map((key) => (
              <li key={key} data-seg={key}>
                <a
                  href={key === "personal" ? "/" : `/${key}`}
                  aria-current={key === segment ? "page" : undefined}
                  className="flex items-center gap-3 rounded-[var(--radius-card)] bg-seg-card px-4 py-3.5 text-seg-card-fg ring-seg ring-offset-2 ring-offset-page aria-[current=page]:ring-2"
                  onClick={(e) => {
                    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    go(key);
                  }}
                >
                  <span className="flex-1">
                    <span className="block font-heading text-[19px] font-semibold tracking-tight">
                      {segments[key].label}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug opacity-85">{segments[key].menuTitle}</span>
                  </span>
                  {key === segment && <span className="text-[12px] font-semibold opacity-85">You’re here</span>}
                  <Chevron />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 px-5">
          <p className="text-[13px] font-semibold text-seg-text">In {s.label}</p>
          <ul className="mt-2 divide-y divide-hairline border-y border-hairline">
            {[...s.journeys.map((j) => [j.id, j.menuLabel] as const), ["demo", "Service walkthroughs"] as const, ["faq", "Questions & answers"] as const, ["safety", "Banking safely"] as const].map(([hash, label]) => (
              <li key={hash}>
                <a
                  href={`${segment === "personal" ? "/" : `/${segment}`}#${hash}`}
                  className="flex items-center justify-between py-3.5 text-[16px] font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    go(segment, hash);
                  }}
                >
                  {label}
                  <Chevron className="text-fg-muted" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2 p-5">
          <button
            type="button"
            className={cn(buttonClass("primary"), "col-span-2")}
            onClick={() => dialogAction(() => openDialog({ type: "info", key: "onboarding" }))}
          >
            Get started <Chevron />
          </button>
          <button type="button" className={buttonClass("outline")} onClick={() => dialogAction(() => openDialog({ type: "info", key: "login" }))}>
            Login
          </button>
          <button type="button" className={buttonClass("outline")} onClick={() => dialogAction(() => openDialog({ type: "search" }))}>
            Search
          </button>
          <button
            type="button"
            lang="ur"
            className={cn(buttonClass("outline"), "col-span-2")}
            onClick={() => dialogAction(() => openDialog({ type: "urdu" }))}
          >
            اردو رہنمائی
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
