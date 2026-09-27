"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { SEGMENT_KEYS, SERVICE_ORDER, segments, services } from "@/lib/content";
import { ABOUT_KEYS, HOME, aboutPages, pages, type Route } from "@/lib/routes";
import { faqs, stats, trustItems } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Appear, Counter, ScrollDrift, ScrubHeadline, useSectionZoom } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { ArrowAction, ArrowUpRight, Container, PillButton, RouteLink, SegmentLink } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

export function Safety() {
  const { go } = useSite();
  return (
    <SheetSection id="safety" tone="tint" above="card" below="black" roundTop roundBottom labelledBy="safety-title">
      <ScrubHeadline className="px-4 pt-[100px] pb-10 text-center min-[810px]:px-10 min-[810px]:pt-[200px] min-[810px]:pb-[60px]">
        <h2 id="safety-title" className="text-[44px] leading-[0.85] font-semibold min-[810px]:text-[clamp(72px,7.5vw,108px)]">
          Trust through
          <br />
          clarity
        </h2>
        <p className="mx-auto mt-8 max-w-[520px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
          Privacy, consent, fees, status and proof of transaction, visible and understandable at the moment they matter.
        </p>
        <p className="mt-8 flex flex-col gap-1 text-[15px] font-medium text-muted-ink min-[810px]:flex-row min-[810px]:justify-center min-[810px]:gap-2 min-[810px]:text-[16px]">
          <span>✓ No PINs, passwords or OTPs requested here</span>
          <span className="hidden min-[810px]:inline" aria-hidden="true">
            ·
          </span>
          <span>✓ No live transactions on this website</span>
        </p>
      </ScrubHeadline>
      <ul className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((it, i) => (
          <Appear
            key={it.title}
            as="li"
            delay={i * 0.04}
            className={cn("px-6 py-8 text-center", i > 0 && "border-t border-line sm:border-t-0", i % 2 === 1 && "sm:border-l", i >= 2 && "sm:border-t lg:border-t-0", i > 0 && "lg:border-l")}
          >
            <h3 className="text-[18px] font-medium">{it.title}</h3>
            <p className="mx-auto mt-2 max-w-[300px] text-[15px] leading-[1.2] text-muted-ink min-[810px]:text-[16px]">{it.copy}</p>
          </Appear>
        ))}
      </ul>
      <div className="flex justify-center py-10">
        <PillButton label="Security & Trust" variant="outline" size="lg" onClick={() => go({ kind: "page", key: "trust" })} />
      </div>
      <div className="relative h-[180px] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 h-full" style={{ background: "radial-gradient(60% 90% at 50% 100%, color-mix(in srgb, var(--seg) 55%, transparent), transparent 70%)" }} />
        <ParticleSphere className="absolute bottom-0 left-1/2 h-[170px] w-[400px] -translate-x-1/2" colorVar="--seg" count={800} dashes speed={0.06} />
      </div>
    </SheetSection>
  );
}

export function LocalByDefault() {
  const ref = useRef<HTMLElement>(null);
  const scale = useSectionZoom(ref);
  return (
    <div style={{ background: "linear-gradient(to bottom, var(--tint) 0 50%, var(--paper) 50% 100%)" }}>
      <section ref={ref} data-theme="dark" aria-labelledby="local-title" className="relative overflow-clip rounded-[var(--radius-sheet)] bg-[#0b0b0b] text-white">
        <motion.div className="absolute inset-0" style={scale ? { scale } : undefined} aria-hidden="true">
          <Image src="/images/agri.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.28] grayscale" style={{ objectPosition: "50% 70%" }} />
        </motion.div>
        <div className="relative">
          <Appear className="px-4 pt-[100px] pb-16 text-center min-[810px]:pt-[200px] min-[810px]:pb-[100px]">
            <h2 id="local-title" className="text-[48px] leading-[0.85] font-medium tracking-[-0.02em] min-[810px]:text-[100px]">
              Pakistani
              <br />
              by design
            </h2>
            <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.25] text-white/80 min-[810px]:text-[18px]">
              Pakistani context, language, behaviours and everyday use cases, executed to an international design standard.
            </p>
          </Appear>
          <div className="grid border-t border-white/10 lg:grid-cols-4 lg:grid-rows-2">
            {stats.map((st, i) => (
              <div
                key={st.copy}
                className={cn(
                  "border-b border-white/10 px-6 py-12 lg:min-h-[460px] lg:border-r lg:px-11",
                  i === 0 && "lg:col-start-1 lg:row-start-1",
                  i === 1 && "lg:col-start-3 lg:row-start-1",
                  i === 2 && "lg:col-start-2 lg:row-start-2",
                  i === 3 && "lg:col-start-4 lg:row-start-2 lg:border-r-0",
                  i === 1 ? "lg:pt-[100px]" : "",
                  i >= 2 ? "lg:flex lg:flex-col lg:justify-center" : "lg:flex lg:flex-col lg:justify-end",
                )}
              >
                <Appear y={20}>
                  <p className="text-grad font-num text-[80px] leading-[0.9] tracking-[-0.03em] min-[810px]:text-[98px]">
                    <Counter value={st.value} />
                    {st.suffix}
                  </p>
                  <h3 className="mt-6 text-[18px] leading-[1.05] font-medium">
                    {st.title[0]}
                    <br />
                    {st.title[1]}
                  </h3>
                  <p className="mt-3 max-w-[260px] text-[15px] leading-[1.15] font-light text-white/70">{st.copy}</p>
                </Appear>
              </div>
            ))}
            {["lg:col-start-2 lg:row-start-1", "lg:col-start-4 lg:row-start-1 lg:border-r-0", "lg:col-start-1 lg:row-start-2", "lg:col-start-3 lg:row-start-2"].map((c) => (
              <div key={c} className={cn("hidden border-b border-white/10 lg:block lg:border-r", c)} aria-hidden="true" />
            ))}
          </div>
          <LogoTicker tone="dark" />
        </div>
      </section>
    </div>
  );
}

export function LogoTicker({ tone }: { tone: "dark" | "light" }) {
  const items = Array.from({ length: 6 });
  return (
    <ScrollDrift className="py-6 min-[810px]:py-10" distance={300}>
      {items.map((_, i) => (
        <div key={i} className="flex shrink-0 items-center gap-10 pr-10 min-[810px]:gap-16 min-[810px]:pr-16" aria-hidden="true">
          <PaykaroLogo decorative className={cn("w-[130px] min-[810px]:w-[230px]", tone === "dark" ? "[--logo-base:#ffffff] [--logo-face:#0b0b0b]" : "")} />
          <span className={cn("font-heading text-[96px] leading-none font-semibold tracking-[-0.02em] min-[810px]:text-[190px]", tone === "dark" ? "text-white" : "text-[#171717] dark:text-white")}>PAYKARO</span>
        </div>
      ))}
    </ScrollDrift>
  );
}

const nextStops: { title: string; copy: string; to: Route; image: string; position: string; alt: string }[] = [
  { title: "Explore for Business", copy: "Payments, collections and analytics for merchants and SMEs.", to: { kind: "segment", key: "business" }, image: "/images/business.webp", position: "40% 45%", alt: "A shopkeeper at the counter of his store" },
  { title: "See how the app works", copy: "An intent engine, not a product showroom: home, search, proof, controls and every state.", to: { kind: "page", key: "app" }, image: "/images/personal.webp", position: "60% 40%", alt: "A father and daughter looking at a phone together" },
];

export function WhereNextAndFaq() {
  return (
    <section id="next" aria-labelledby="next-title" className="overflow-x-clip bg-paper">
      <ScrubHeadline className="px-4 pt-[100px] pb-12 text-center min-[810px]:pt-[200px] min-[810px]:pb-[70px]">
        <h2 id="next-title" className="text-[56px] leading-[0.85] font-medium tracking-[-0.02em] min-[810px]:text-[100px]">
          Where
          <br />
          to next
        </h2>
      </ScrubHeadline>
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          {nextStops.map((u, i) => (
            <Appear key={u.title} delay={i * 0.05} as="article">
              <RouteLink to={u.to} className="group block w-full text-left">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-night min-[810px]:aspect-[680/480]">
                  <Image src={u.image} alt={u.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: u.position }} />
                  <span className="absolute inset-0 opacity-60 mix-blend-soft-light" style={{ background: "linear-gradient(to top, var(--seg), transparent 60%)" }} />
                </span>
                <span className="block px-6 pt-6">
                  <span className="flex items-center gap-2 text-[20px] leading-none font-medium tracking-[0.01em]">
                    {u.title} <ArrowUpRight className="size-4 text-seg-ink" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="mt-2 block max-w-[520px] text-[15px] leading-[1.2] text-muted-ink min-[810px]:text-[16px]">{u.copy}</span>
                </span>
              </RouteLink>
            </Appear>
          ))}
        </div>
      </Container>
      <Faq />
    </section>
  );
}

export function Faq({ id = "faq" }: { id?: string }) {
  const { openDialog, go } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div id={id} className="mx-auto grid max-w-[1580px] scroll-mt-10 gap-[60px] px-4 pt-[100px] pb-[100px] min-[810px]:px-10 min-[810px]:pt-20 min-[810px]:pb-10 lg:grid-cols-[447px_1fr] lg:gap-20">
      <div className="self-start lg:sticky lg:top-[140px]">
        <h2 className="text-[64px] leading-[0.85] font-medium tracking-[-0.02em] min-[810px]:text-[100px]">FAQ</h2>
        <p className="mt-10 max-w-[380px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">The questions people ask first about PayKaro and this website.</p>
        <ArrowAction className="mt-8" onClick={() => go({ kind: "page", key: "help" })}>
          Get Help
        </ArrowAction>
      </div>
      <ul className="border-t border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Appear key={f.q} as="li" delay={(i % 3) * 0.04} className="border-b border-line">
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`${id}-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-start justify-between gap-6 py-6 text-left text-[16px] font-medium min-[810px]:text-[17px]">
                  {f.q}
                  <span className={cn("font-num text-[24px] leading-none transition-colors duration-300", isOpen ? "text-ink" : "text-faint-ink/70")} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`${id}-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }} className="overflow-hidden">
                    <div className="max-w-[560px] pb-6 text-[15px] leading-[1.35] text-muted-ink">
                      <p>{f.a}</p>
                      {f.info && (
                        <ArrowAction className="mt-3 text-[15px]" onClick={() => openDialog({ type: "info", key: f.info! })}>
                          About fees
                        </ArrowAction>
                      )}
                      {f.link && (
                        <ArrowAction className="mt-3 text-[15px]" onClick={() => go({ kind: "page", key: "trust" }, "how-we-earn")}>
                          How PayKaro is funded
                        </ArrowAction>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Appear>
          );
        })}
      </ul>
    </div>
  );
}

/** Money Dashboard concept: insight that leads to a next action (brief §8). */
export function ConceptShowcase() {
  const { openDialog } = useSite();
  return (
    <section aria-labelledby="concept-title" className="overflow-hidden bg-card">
      <div className="bg-paper px-4 pt-[100px] text-center min-[810px]:pt-[150px]">
        <Appear y={24}>
          <h2 id="concept-title" className="text-[40px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
            Insight that leads
            <br />
            to action.
          </h2>
          <p className="mx-auto mt-8 max-w-[640px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            Money Dashboard shows where your money goes, then turns it into a clear, useful next step. A concept, with sample figures.
          </p>
          <PillButton label="About Money Dashboard" size="lg" className="mt-8" onClick={() => openDialog({ type: "service", key: "dashboard" })} />
        </Appear>
        <Appear y={24} delay={0.08} className="relative mx-auto mt-14 max-w-[1100px]">
          <div className="[mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
            <DashboardConcept />
          </div>
        </Appear>
      </div>
    </section>
  );
}

function DashboardConcept() {
  const nav = ["Home", "Money Dashboard", "Cards", "Super Savers", "Help"];
  const cats = [
    ["Groceries", 42],
    ["Bills", 26],
    ["Transport", 18],
    ["Sent to family", 14],
  ] as const;
  return (
    <div aria-hidden="true" className="grid overflow-hidden rounded-t-2xl border border-line bg-card text-left shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] min-[810px]:grid-cols-[200px_1fr]">
      <aside className="hidden border-r border-line p-4 min-[810px]:block">
        <PaykaroLogo decorative className="w-10" />
        <ul className="mt-6 space-y-1 text-[13px]">
          {nav.map((n, i) => (
            <li key={n} className={cn("rounded-lg px-3 py-2", i === 1 ? "bg-seg-soft font-medium text-[#171717]" : "text-muted-ink")}>
              {n}
            </li>
          ))}
        </ul>
      </aside>
      <div className="p-4 min-[810px]:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[18px] font-medium min-[810px]:text-[22px]">This month</p>
            <p className="text-[12px] text-faint-ink">Money Dashboard · concept, sample figures</p>
          </div>
          <span className="rounded-full bg-seg-fill px-3 py-1.5 text-[12px] font-medium text-seg-on">Concept</span>
        </div>
        <div className="mt-5 grid gap-3 min-[810px]:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-line p-4">
            <p className="text-[12px] text-faint-ink">Where it went</p>
            <ul className="mt-4 space-y-3">
              {cats.map(([k, v]) => (
                <li key={k} className="text-[13px]">
                  <div className="flex justify-between">
                    <span>{k}</span>
                    <span className="text-muted-ink">{v}%</span>
                  </div>
                  <span className="mt-1.5 block h-2 rounded-full bg-ink/10">
                    <span className="block h-full rounded-full bg-seg" style={{ width: `${v * 2}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col rounded-xl border border-line p-4">
            <p className="text-[12px] text-faint-ink">Insight</p>
            <p className="mt-2 text-[16px] leading-[1.2] font-medium">Bills landed earlier than last month.</p>
            <p className="mt-2 text-[13px] text-muted-ink">Next step</p>
            <span className="mt-2 flex h-10 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">Set some aside in Super Savers</span>
            <span className="mt-2 flex h-10 items-center justify-center rounded-full border border-line text-[13px]">Not now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const { openDialog } = useSite();
  const link = "text-left text-[14px] text-ink hover:text-seg-ink";
  const head = "text-[14px] text-faint-ink";
  return (
    <footer className="relative bg-paper">
      <div className="mx-auto max-w-[1580px] px-4 pt-16 pb-[60px] min-[810px]:px-10 min-[810px]:pt-[140px] min-[810px]:pb-[100px]">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-5">
          <div>
            <p className={head}>PayKaro for</p>
            <ul className="mt-6 space-y-2.5">
              {SEGMENT_KEYS.map((k) => (
                <li key={k}>
                  <SegmentLink segment={k} className={link}>
                    {segments[k].pathway}
                  </SegmentLink>
                </li>
              ))}
              <li>
                <RouteLink to={{ kind: "page", key: "app" }} className={link}>
                  {pages.app.label}
                </RouteLink>
              </li>
            </ul>
          </div>
          <div>
            <p className={head}>Services</p>
            <ul className="mt-6 space-y-2.5">
              {SERVICE_ORDER.slice(0, 8).map((k) => (
                <li key={k}>
                  <button type="button" className={link} onClick={() => openDialog({ type: "service", key: k })}>
                    {services[k].name}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" className={link} onClick={() => openDialog({ type: "all-services" })}>
                  All 16 services
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className={head}>Help</p>
            <ul className="mt-6 space-y-2.5">
              <li>
                <RouteLink to={{ kind: "page", key: "help" }} className={link}>
                  Get Help
                </RouteLink>
              </li>
              <li>
                <RouteLink to={{ kind: "page", key: "trust" }} className={link}>
                  Security &amp; Trust
                </RouteLink>
              </li>
              <li>
                <RouteLink to={HOME} hash="faq" className={link}>
                  FAQ
                </RouteLink>
              </li>
              {(
                [
                  ["fees", "Fees"],
                  ["accessibility", "Accessibility"],
                ] as const
              ).map(([k, l]) => (
                <li key={k}>
                  <button type="button" className={link} onClick={() => openDialog({ type: "info", key: k })}>
                    {l}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" lang="ur" className={link} onClick={() => openDialog({ type: "urdu" })}>
                  اردو
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className={head}>About Us</p>
            <ul className="mt-6 space-y-2.5">
              {ABOUT_KEYS.map((k) => (
                <li key={k}>
                  <RouteLink to={{ kind: "about", key: k }} className={link}>
                    {aboutPages[k].menuLabel}
                  </RouteLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={head}>Website</p>
            <ul className="mt-6 space-y-2.5">
              {(
                [
                  ["getpaykaro", "Get PayKaro"],
                  ["website", "Website information"],
                  ["login", "Log in"],
                ] as const
              ).map(([k, l]) => (
                <li key={k}>
                  <button type="button" className={link} onClick={() => openDialog({ type: "info", key: k })}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_1fr_1fr] lg:pl-[80px]">
          <div className="max-w-[340px] space-y-4 text-[14px] leading-[1.25] text-faint-ink">
            <p>Availability, eligibility and terms aren’t published on this website yet. App screens and walkthroughs are illustrative concepts.</p>
            <p>This website does not open accounts, process payments or collect banking details.</p>
            <p>© {new Date().getFullYear()} PayKaro. All rights reserved.</p>
          </div>
          <div>
            <p className={head}>Contact</p>
            <p className="mt-4 text-[14px]">Official channels will be published here.</p>
          </div>
          <div>
            <p className={head}>Pakistan</p>
            <p className="mt-4 text-[14px]">Built for Pakistan, to an international standard.</p>
          </div>
        </div>
      </div>
      <LogoTicker tone="light" />
      <div aria-hidden="true" className="flex flex-col">
        {["var(--seg-15)", "var(--seg-35)", "var(--seg-60)", "var(--seg)"].map((c) => (
          <span key={c} className="h-2.5" style={{ background: c }} />
        ))}
      </div>
      <div className="bg-night px-4 py-4 text-[14px] text-white/85 min-[810px]:px-10">
        <div className="mx-auto flex max-w-[1580px] flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} PAYKARO</span>
          <button type="button" className="hover:text-white" onClick={() => openDialog({ type: "info", key: "website" })}>
            Privacy &amp; website use
          </button>
        </div>
      </div>
    </footer>
  );
}