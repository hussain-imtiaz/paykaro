"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { SEGMENT_KEYS, faqs, portfolioFacts, retailTypes, safety, segments } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import {
  Chevron,
  Eyebrow,
  Panel,
  Reveal,
  SegmentButtonLink,
  SegmentLink,
  TextAction,
  extraIcons,
} from "./primitives";

export function PortfolioFacts() {
  return (
    <Panel tone="page" className="pt-20 pb-20 sm:pt-24" labelledBy="facts-title">
      <h2 id="facts-title" className="sr-only">
        In the PayKaro service portfolio
      </h2>
      <Reveal>
        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {portfolioFacts.map((f, i) => (
            <li
              key={f.big}
              className={cn(
                "px-4 text-center sm:px-6",
                i % 2 === 1 && "border-l border-hairline",
                i >= 1 && "lg:border-l lg:border-hairline",
              )}
            >
              <p className="font-heading text-[32px] leading-none font-semibold tracking-[-0.03em] sm:text-[48px]">
                {f.big}
              </p>
              <p className="mt-3 text-[14px] font-semibold">{f.label}</p>
              <p className="mt-1 text-[13px] text-fg-muted">{f.sub}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Panel>
  );
}

export function Community() {
  const { segment, openDialog } = useSite();
  return (
    <Panel id="community" tone="page" overlap={false} labelledBy="community-title" className="pb-24 sm:pb-32">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[var(--radius-card)] bg-navy">
            <Image
              src="/images/business.webp"
              alt="A neighbourhood retailer helping a customer at his shop"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              style={{ objectPosition: "45% 50%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-navy/45 px-4 py-3 text-white backdrop-blur-md">
              <p className="text-[12px] font-medium text-white/75">Our neighbourhoods</p>
              <p className="text-[16px] font-semibold">Where everyday life happens.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <Eyebrow>Connected through community</Eyebrow>
          <h2 id="community-title" className="mt-3 text-[34px] leading-[1.06] font-semibold sm:text-[44px]">
            Closer to you. Part of your neighbourhood.
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-fg-muted">
            The shop around the corner. The familiar face at the counter. PayKaro’s retail network approach brings
            digital financial services into everyday places. For customers, a human connection. For retailers, a new
            way to serve their community.
          </p>
          <p className="mt-7 text-[13px] font-semibold text-fg-muted">Retail network direction</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {retailTypes.map((t) => (
              <li key={t} className="rounded-[var(--radius-btn)] border border-hairline bg-surface px-3 py-1.5 text-[14px] font-medium">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {segment === "assisted" ? (
              <SegmentButtonLink segment="assisted" hash="micro-atm" label="See the Micro ATM journey" />
            ) : (
              <SegmentButtonLink segment="assisted" label="Discover assisted banking" />
            )}
            <TextAction onClick={() => openDialog({ type: "info", key: "retail" })}>
              Information for retail partners
            </TextAction>
          </div>
        </Reveal>
      </div>
    </Panel>
  );
}

export function Safety() {
  return (
    <Panel id="safety" tone="tint" labelledBy="safety-title" className="pt-20 pb-24 sm:pt-28 sm:pb-28">
      <Reveal className="mx-auto max-w-[720px] text-center">
        <Eyebrow>Confidence in the everyday</Eyebrow>
        <h2 id="safety-title" className="mt-3 text-[38px] leading-[1.02] font-semibold sm:text-[56px]">
          Good habits.
          <br />
          Safer banking.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-relaxed text-fg-muted">
          A little care goes a long way. Keep these essentials in mind whenever you transact.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <ul className="mt-14 grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {safety.map((item, i) => {
            const Icon = extraIcons[item.icon];
            return (
              <li
                key={item.title}
                className={cn(
                  "px-2 py-8 text-center sm:px-6",
                  i > 0 && "border-t border-hairline sm:border-t-0",
                  i % 2 === 1 && "sm:border-l sm:border-hairline",
                  i >= 2 && "sm:border-t lg:border-t-0",
                  i > 0 && "lg:border-l lg:border-hairline",
                )}
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface text-seg-text">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[18px] font-semibold">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-relaxed text-fg-muted">{item.copy}</p>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Panel>
  );
}

export function SegmentsOverview() {
  const { segment } = useSite();
  return (
    <Panel id="segments" tone="dark" labelledBy="segments-title" className="pt-20 pb-24 sm:pt-28 sm:pb-32">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <Eyebrow>One PayKaro. Many possibilities.</Eyebrow>
        <h2 id="segments-title" className="mt-3 text-[38px] leading-[1.02] font-semibold sm:text-[56px]">
          Five ways in. Pick the one that’s yours.
        </h2>
      </Reveal>
      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {SEGMENT_KEYS.map((key, i) => {
          const s = segments[key];
          const current = key === segment;
          return (
            <Reveal key={key} as="li" delay={i * 60} className="flex">
              <div data-seg={key} className="flex w-full">
                <SegmentLink
                  segment={key}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "group flex w-full flex-col rounded-[var(--radius-card)] bg-seg-card p-6 text-seg-card-fg transition-transform duration-300 hover:-translate-y-1",
                    key === "business" && "ring-1 ring-[#f16557]/60",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-full bg-black/10 font-heading text-[13px] font-semibold">
                      {i + 1}
                    </span>
                    {current && (
                      <span className="rounded-[var(--radius-btn)] bg-black/10 px-2 py-1 text-[12px] font-semibold">
                        You’re here
                      </span>
                    )}
                  </div>
                  <h3 className="mt-10 text-[28px] font-semibold tracking-tight">{s.label}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed opacity-90">{s.cardDescription}</p>
                  <ul className="mt-6 flex-1 space-y-1.5 border-t border-current/20 pt-4 text-[14px] font-medium">
                    {s.journeys.map((j) => (
                      <li key={j.id}>{j.nav}</li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                    Explore {s.label.toLowerCase()}
                    <Chevron className="chev-shift" />
                  </span>
                </SegmentLink>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Panel>
  );
}

export function Faq() {
  const { openDialog } = useSite();
  return (
    <Panel id="faq" tone="page" labelledBy="faq-title" className="pt-20 pb-24 sm:pt-28 sm:pb-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.9fr] lg:gap-20">
        <Reveal>
          <h2 id="faq-title" className="text-[44px] leading-none font-semibold sm:text-[64px]">
            Questions, answered.
          </h2>
          <p className="mt-6 max-w-[360px] text-[17px] leading-relaxed text-fg-muted">
            Helpful information about PayKaro’s services and this website, before you take the next step.
          </p>
          <TextAction className="mt-6" onClick={() => openDialog({ type: "info", key: "website" })}>
            About this website
          </TextAction>
        </Reveal>
        <Reveal delay={80}>
          <Accordion className="border-t border-hairline">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={f.q} className="border-b border-hairline not-last:border-b">
                <AccordionTrigger className="items-center gap-5 rounded-[var(--radius-btn)] py-5 text-[17px] font-semibold hover:no-underline sm:text-[18px] [&_[data-slot=accordion-trigger-icon]]:size-5">
                  <span className="w-7 shrink-0 font-heading text-[14px] font-semibold text-fg-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-6 pl-12 text-[16px] leading-relaxed text-fg-muted">
                  <p>{f.a}</p>
                  {f.info && (
                    <TextAction className="mt-3" onClick={() => openDialog({ type: "info", key: f.info! })}>
                      {f.info === "retail" ? "Retail partner information" : "Fees and eligibility"}
                    </TextAction>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Panel>
  );
}

export function GetStarted() {
  const { openDialog } = useSite();
  return (
    <Panel id="get-started" tone="light" labelledBy="start-title" className="pt-20 pb-20 sm:pt-24">
      <Reveal className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>Your next chapter</Eyebrow>
          <h2 id="start-title" className="mt-3 text-[38px] leading-[1.02] font-semibold sm:text-[56px]">
            Everyday banking.
            <br />
            Extra room for life.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["For customers", "Getting started with PayKaro", "onboarding"],
              ["For retailers", "Explore a retail partnership", "retail"],
            ] as const
          ).map(([label, title, key]) => (
            <button
              key={key}
              type="button"
              onClick={() => openDialog({ type: "info", key })}
              className="group flex flex-col items-start rounded-[var(--radius-card)] bg-page p-5 text-left hover:bg-seg-soft hover:text-navy"
            >
              <span className="text-[13px] font-semibold opacity-70">{label}</span>
              <span className="mt-6 flex w-full items-end justify-between gap-3 text-[18px] leading-snug font-semibold">
                {title}
                <Chevron className="chev-shift size-5" />
              </span>
            </button>
          ))}
        </div>
      </Reveal>
    </Panel>
  );
}

export function SiteFooter() {
  const { openDialog, scrollToSection } = useSite();
  const linkClass = "text-left text-[14px] text-fg hover:text-seg-text hover:underline";
  return (
    <footer className="relative overflow-hidden bg-surface pb-0">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 border-t border-hairline pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <PaykaroLogo className="w-[84px]" />
            <p className="mt-5 max-w-[240px] text-[14px] leading-relaxed text-fg-muted">
              Your neighbourhood digital banking partner. Pakistan.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-fg-muted">Banking for you</p>
            <ul className="mt-4 space-y-2.5">
              {SEGMENT_KEYS.map((k) => (
                <li key={k}>
                  <SegmentLink segment={k} className={linkClass}>
                    {segments[k].label}
                  </SegmentLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-fg-muted">Our services</p>
            <ul className="mt-4 space-y-2.5">
              {(["transfer", "bills", "qr", "atm", "cash"] as const).map((k) => (
                <li key={k}>
                  <button type="button" className={linkClass} onClick={() => openDialog({ type: "service", key: k })}>
                    {
                      {
                        transfer: "Money transfers",
                        bills: "Bill payments",
                        qr: "Raast QR payments",
                        atm: "Micro ATM services",
                        cash: "Business cash collection",
                      }[k]
                    }
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-fg-muted">Here to help</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button type="button" className={linkClass} onClick={() => scrollToSection("faq")}>
                  Questions & answers
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => scrollToSection("safety")}>
                  Banking safely
                </button>
              </li>
              {(
                [
                  ["fees", "Fees & eligibility"],
                  ["retail", "Retail partnerships"],
                  ["accessibility", "Accessibility"],
                ] as const
              ).map(([k, label]) => (
                <li key={k}>
                  <button type="button" className={linkClass} onClick={() => openDialog({ type: "info", key: k })}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-fg-muted">About PayKaro</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button type="button" className={linkClass} onClick={() => scrollToSection("segments")}>
                  Our segments
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => scrollToSection("community")}>
                  Our communities
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => openDialog({ type: "info", key: "website" })}>
                  Website information
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 max-w-[640px] text-[13px] leading-relaxed text-fg-muted">
          Service availability, eligibility and applicable charges are subject to confirmation. Product walkthroughs
          and app screens are illustrative concepts. This website does not open accounts, process payments or collect
          banking details.
        </p>
      </div>

      <div aria-hidden="true" className="mt-14 overflow-hidden py-4">
        <div className="motion-safe-anim flex w-max animate-marquee items-center gap-12 pr-12 hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-12">
              <PaykaroLogo decorative className="w-[200px] sm:w-[280px]" />
              <span className="font-heading text-[80px] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap sm:text-[140px]">
                Banking, aasani say.
              </span>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="flex h-9 flex-col">
        {["#f16557", "#1c1c1f", "#0283ff", "#00d164", "#ffc409"].map((c) => (
          <span key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div data-theme="dark" className="bg-navy text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="text-white/75">© {new Date().getFullYear()} PayKaro. All rights reserved.</span>
          <div className="flex gap-6">
            <button type="button" className="text-white/85 hover:text-white hover:underline" onClick={() => openDialog({ type: "info", key: "website" })}>
              Privacy & website use
            </button>
            <button
              type="button"
              className="group inline-flex items-center gap-1 text-white/85 hover:text-white"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                document.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll: true });
              }}
            >
              Back to top <Chevron className="size-3.5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}