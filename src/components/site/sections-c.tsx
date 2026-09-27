"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { DEMO_ORDER, SEGMENT_KEYS, demos, segments, type InfoKey } from "@/lib/content";
import { faqs, safetyItems, stats, updates } from "@/lib/sections-content";
import { scrollToTarget } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { Appear, Counter, ScrollDrift, ScrubHeadline, useSectionZoom } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { ABOUT_KEYS, HOME, aboutPages } from "@/lib/routes";
import { ArrowAction, Container, DividerCta, icons, PillButton, RouteLink, SegmentLink, serviceIcons } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

export function Safety() {
  return (
    <SheetSection id="safety" tone="tint" above="card" below="black" roundTop roundBottom labelledBy="safety-title">
      <ScrubHeadline className="px-4 pt-[100px] pb-10 text-center min-[810px]:px-10 min-[810px]:pt-[200px] min-[810px]:pb-[60px]">
        <h2 id="safety-title" className="text-[44px] leading-[0.85] font-semibold min-[810px]:text-[clamp(72px,7.5vw,108px)]">
          Safety &amp;
          <br />
          confidence
        </h2>
        <p className="mx-auto mt-8 max-w-[520px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
          Good habits make everyday banking safer, wherever you start.
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
        {safetyItems.map((it, i) => (
          <Appear
            key={it.title}
            as="li"
            delay={i * 0.05}
            className={cn("px-6 py-8 text-center", i > 0 && "border-t border-line sm:border-t-0", i % 2 === 1 && "sm:border-l", i >= 2 && "sm:border-t lg:border-t-0", i > 0 && "lg:border-l")}
          >
            <h3 className="text-[18px] font-medium">{it.title}</h3>
            <p className="mx-auto mt-2 max-w-[300px] text-[15px] leading-[1.2] text-muted-ink min-[810px]:text-[16px]">{it.copy}</p>
          </Appear>
        ))}
      </ul>
      <div className="relative h-[200px] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 h-full" style={{ background: "radial-gradient(60% 90% at 50% 100%, color-mix(in srgb, var(--seg) 55%, transparent), transparent 70%)" }} />
        <ParticleSphere className="absolute bottom-0 left-1/2 h-[190px] w-[420px] -translate-x-1/2" colorVar="--seg" count={900} dashes speed={0.08} />
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
              Local by
              <br />
              default
            </h2>
            <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.25] text-white/80 min-[810px]:text-[18px]">
              Services organised around the way Pakistan lives and works: at home, at the counter, in the field and on the move.
            </p>
          </Appear>
          <div className="grid border-t border-white/10 lg:grid-cols-4 lg:grid-rows-2">
            {stats.map((st, i) => (
              <div
                key={st.copy}
                className={cn(
                  "border-b border-white/10 px-6 py-12 lg:min-h-[500px] lg:border-r lg:px-11",
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
            {[
              "lg:col-start-2 lg:row-start-1",
              "lg:col-start-4 lg:row-start-1 lg:border-r-0",
              "lg:col-start-1 lg:row-start-2",
              "lg:col-start-3 lg:row-start-2",
            ].map((c) => (
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
          <PaykaroLogo
            decorative
            className={cn("w-[130px] min-[810px]:w-[230px]", tone === "dark" ? "[--logo-base:#ffffff] [--logo-face:#0b0b0b]" : "")}
          />
          <span className={cn("font-heading text-[96px] leading-none font-semibold tracking-[-0.02em] min-[810px]:text-[190px]", tone === "dark" ? "text-white" : "text-[#171717] dark:text-white")}>
            PAYKARO
          </span>
        </div>
      ))}
    </ScrollDrift>
  );
}

export function UpdatesAndFaq() {
  const { openDialog } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="updates" aria-labelledby="updates-title" className="overflow-x-clip bg-paper">
      <ScrubHeadline className="px-4 pt-[100px] pb-12 text-center min-[810px]:pt-[200px] min-[810px]:pb-[70px]">
        <h2 id="updates-title" className="text-[56px] leading-[0.85] font-medium tracking-[-0.02em] min-[810px]:text-[100px]">
          What’s
          <br />
          next
        </h2>
        <p className="mx-auto mt-8 max-w-[380px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
          Directions from PayKaro’s plan. Not launched products, and nothing to sign up for here.
        </p>
      </ScrubHeadline>
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          {updates.map((u, i) => (
            <Appear key={u.title} delay={i * 0.05} as="article">
              <button
                type="button"
                className="group block w-full text-left"
                onClick={() => (u.info ? openDialog({ type: "info", key: u.info as InfoKey }) : openDialog({ type: "service", key: "takaful" }))}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-night min-[810px]:aspect-[680/480]">
                  <Image src={u.image} alt={u.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: u.position }} />
                  <span className="absolute inset-0 opacity-60 mix-blend-soft-light" style={{ background: "linear-gradient(to top, var(--seg), transparent 60%)" }} />
                </span>
                <span className="block px-6 pt-6">
                  <span className="block text-[20px] leading-none font-medium tracking-[0.01em]">{u.title}</span>
                  <span className="mt-2 block max-w-[520px] text-[15px] leading-[1.2] text-muted-ink min-[810px]:text-[16px]">{u.copy}</span>
                </span>
              </button>
            </Appear>
          ))}
        </div>
        <DividerCta>
          <ArrowAction className="text-[18px]" onClick={() => openDialog({ type: "all-services" })}>
            All services
          </ArrowAction>
        </DividerCta>
      </Container>

      <div id="faq" className="mx-auto grid max-w-[1580px] gap-[60px] px-4 pt-[100px] pb-[100px] min-[810px]:px-10 min-[810px]:pt-20 min-[810px]:pb-10 lg:grid-cols-[447px_1fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-[140px]">
          <h2 className="text-[64px] leading-[0.85] font-medium tracking-[-0.02em] min-[810px]:text-[100px]">FAQ</h2>
          <p className="mt-10 max-w-[380px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            Understand PayKaro’s services, segments and this website. Here are the most common questions from customers and retailers.
          </p>
          <ArrowAction className="mt-8" onClick={() => openDialog({ type: "info", key: "website" })}>
            About this website
          </ArrowAction>
        </div>
        <ul className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Appear key={f.q} as="li" delay={(i % 3) * 0.05} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left text-[16px] font-medium min-[810px]:text-[17px]"
                  >
                    {f.q}
                    <span className={cn("font-num text-[24px] leading-none transition-colors duration-300", isOpen ? "text-ink" : "text-faint-ink/70")} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[560px] pb-6 text-[15px] leading-[1.35] text-muted-ink">
                        <p>{f.a}</p>
                        {f.info && (
                          <ArrowAction className="mt-3 text-[15px]" onClick={() => openDialog({ type: "info", key: f.info! })}>
                            {f.info === "retail" ? "Retail partner information" : "Fees and eligibility"}
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
    </section>
  );
}

export function ConceptShowcase() {
  const { segment } = useSite();
  const s = segments[segment];
  return (
    <section aria-labelledby="concept-title" className="overflow-hidden bg-card">
      <div className="bg-paper px-4 pt-[100px] text-center min-[810px]:pt-[150px]">
        <Appear y={40}>
          <h2 id="concept-title" className="text-[40px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
            See how
            <br />
            PayKaro could feel.
          </h2>
          <p className="mx-auto mt-8 max-w-[640px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            A concept of the everyday essentials in one place. PayKaro’s mobile app and product journeys are still being designed.
          </p>
          <PillButton
            label="Try the app concept"
            size="lg"
            className="mt-8"
            onClick={() => {
              const el = document.getElementById("demo");
              if (el) scrollToTarget(el);
            }}
          />
        </Appear>
        <Appear y={40} delay={0.1} className="relative mx-auto mt-14 max-w-[1100px]">
          <div className="[mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
            <DashboardConcept label={s.label} />
          </div>
        </Appear>
      </div>
    </section>
  );
}

function DashboardConcept({ label }: { label: string }) {
  const nav = ["Home", ...DEMO_ORDER.map((k) => demos[k].label)];
  return (
    <div aria-hidden="true" className="grid overflow-hidden rounded-t-2xl border border-line bg-card text-left shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] min-[810px]:grid-cols-[200px_1fr]">
      <aside className="hidden border-r border-line p-4 min-[810px]:block">
        <PaykaroLogo decorative className="w-10" />
        <ul className="mt-6 space-y-1 text-[13px]">
          {nav.map((n, i) => (
            <li key={n} className={cn("rounded-lg px-3 py-2", i === 0 ? "bg-seg-soft font-medium text-[#171717]" : "text-muted-ink")}>
              {n}
            </li>
          ))}
        </ul>
      </aside>
      <div className="p-4 min-[810px]:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[18px] font-medium min-[810px]:text-[22px]">Assalam-o-Alaikum</p>
            <p className="text-[12px] text-faint-ink">PayKaro {label} · app concept</p>
          </div>
          <span className="rounded-full bg-seg-fill px-3 py-1.5 text-[12px] font-medium text-seg-on">Concept</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[810px]:grid-cols-4">
          {DEMO_ORDER.map((k) => {
            const Icon = serviceIcons[k];
            return (
              <div key={k} className="rounded-xl border border-line p-3">
                <Icon className="size-4 text-seg-ink" strokeWidth={1.75} />
                <p className="mt-3 text-[12px] font-medium">{demos[k].label}</p>
                <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-ink/10" />
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid gap-3 min-[810px]:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-line p-4">
            <p className="text-[12px] text-faint-ink">Your activity, illustrated</p>
            <div className="mt-4 flex h-[120px] items-end gap-1.5 min-[810px]:h-[160px]">
              {[40, 62, 48, 70, 55, 82, 66, 90, 58, 74, 64, 86, 60, 78].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i % 3 === 0 ? "var(--seg)" : "var(--seg-35)" }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[12px] text-faint-ink">Before you confirm</p>
            <ul className="mt-3 space-y-2 text-[12px]">
              {["Check the recipient", "Check the amount", "Confirm charges", "Keep your receipt"].map((c, i) => (
                <li key={c} className="flex items-center gap-2">
                  <icons.check className={cn("size-4", i < 2 ? "text-seg-ink" : "text-faint-ink")} strokeWidth={1.75} />
                  {c}
                </li>
              ))}
            </ul>
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
            <p className={head}>Banking for you</p>
            <ul className="mt-6 space-y-2.5">
              {SEGMENT_KEYS.map((k) => (
                <li key={k}>
                  <SegmentLink segment={k} className={link}>
                    {segments[k].label}
                  </SegmentLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={head}>Services</p>
            <ul className="mt-6 space-y-2.5">
              {(["transfer", "bills", "qr", "atm", "cash", "takaful"] as const).map((k) => (
                <li key={k}>
                  <button type="button" className={link} onClick={() => openDialog({ type: "service", key: k })}>
                    {{ transfer: "Money transfers", bills: "Bill payments", qr: "Raast QR payments", atm: "Micro ATM services", cash: "Business cash collection", takaful: "Micro Takaful (planned)" }[k]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={head}>Help</p>
            <ul className="mt-6 space-y-2.5">
              <li>
                <RouteLink to={HOME} hash="faq" className={link}>
                  FAQ
                </RouteLink>
              </li>
              <li>
                <RouteLink to={HOME} hash="safety" className={link}>
                  Safety &amp; confidence
                </RouteLink>
              </li>
              {(
                [
                  ["fees", "Fees & eligibility"],
                  ["retail", "Retail partnerships"],
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
                  اردو رہنمائی
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className={head}>Website</p>
            <ul className="mt-6 space-y-2.5">
              {(
                [
                  ["website", "Website information"],
                  ["login", "Login"],
                  ["onboarding", "Getting started"],
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
            <p>
              Service availability, eligibility and applicable charges are subject to confirmation. Walkthroughs and app screens are
              illustrative concepts.
            </p>
            <p>This website does not open accounts, process payments or collect banking details.</p>
            <p>1LINK and Raast logos are trademarks of their owners, shown only to name the payment rails PayKaro’s services use.</p>
            <p>© {new Date().getFullYear()} PayKaro. All rights reserved.</p>
          </div>
          <div>
            <p className={head}>Contact</p>
            <p className="mt-4 text-[14px]">Official channels will be published here.</p>
          </div>
          <div>
            <p className={head}>Pakistan</p>
            <p className="mt-4 text-[14px]">Banking, aasani say.</p>
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
          <span>© {new Date().getFullYear()} PAYKARO · Banking, aasani say</span>
          <button type="button" className="hover:text-white" onClick={() => openDialog({ type: "info", key: "website" })}>
            Privacy &amp; website use
          </button>
        </div>
      </div>
    </footer>
  );
}


