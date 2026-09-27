"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useEffect, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { segments } from "@/lib/content";
import { metrics, networkFeatures, networkNotices, principles } from "@/lib/sections-content";
import { Appear, Counter, ScrubHeadline, SPRING, WordReveal } from "./motion";
import { ArrowAction, Container, DividerCta, icons, PillButton } from "./primitives";
import { PartnerLogo } from "./partner-logo";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

/** SVG gradient used to stroke icons in the segment colour, like the reference's orange icons. */
export function IconGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="seg-icon-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--seg)" }} />
          <stop offset="100%" style={{ stopColor: "var(--seg)", stopOpacity: 0.35 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Principles() {
  return (
    <SheetSection tone="night" dark labelledBy="principles-title">
      <div className="px-4 pt-5 pb-[60px] min-[810px]:px-8 min-[810px]:pt-0 min-[810px]:pb-[119px]">
        <ScrubHeadline className="px-4 pt-[100px] pb-[60px] text-center min-[810px]:px-10 min-[810px]:pt-[80px] min-[810px]:pb-[40px]">
          <h2 id="principles-title" className="text-[40px] leading-[0.95] font-medium tracking-[-0.01em] text-white min-[810px]:text-[72px]">
            Our principles
          </h2>
        </ScrubHeadline>
        <ul className="mx-auto grid max-w-[1516px] gap-2.5 min-[810px]:mt-[25px] sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Appear key={p.icon} as="li" className="relative flex min-h-[243px] flex-col rounded-[var(--radius-card)] bg-white/[0.02] p-4 ring-1 ring-white/[0.04] lg:h-[322px]">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/10 font-heading text-[18px] font-medium">{i + 1}</span>
                <span className="flex flex-1 items-center justify-center py-6">
                  <Icon className="size-[72px]" stroke="url(#seg-icon-grad)" strokeWidth={1.3} aria-hidden="true" />
                </span>
                <p className="text-[21px] leading-[1.3] text-white lg:text-center">
                  {p.title[0]}
                  <br />
                  {p.title[1]}
                </p>
              </Appear>
            );
          })}
        </ul>
      </div>
    </SheetSection>
  );
}

export function Network() {
  const { openDialog } = useSite();
  return (
    <SheetSection id="network" tone="card" above="night" below="paper" roundTop roundBottom labelledBy="network-title">
      <ScrubHeadline className="px-4 pt-[100px] pb-[60px] text-center min-[810px]:px-10 min-[810px]:pt-[200px] min-[810px]:pb-[100px]">
        <h2 id="network-title" className="text-[44px] leading-[0.85] font-semibold min-[810px]:text-[clamp(72px,7.5vw,108px)]">
          Neighbourhood
          <br />
          network
        </h2>
        <p className="mx-auto mt-10 max-w-[560px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
          Assisted banking brings PayKaro’s services into everyday shops, with a person at the counter to help you check each
          step. Participating locations are confirmed before you visit.
        </p>
      </ScrubHeadline>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ul className="divide-y divide-line">
            {networkFeatures.map((f, i) => {
              const Icon = icons[f.icon];
              return (
                <Appear key={f.title} as="li" delay={i * 0.15} className="flex gap-6 py-8 first:pt-0 min-[810px]:gap-7">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper">
                    <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[22px] leading-none font-medium min-[810px]:text-[24px]">{f.title}</h3>
                    <p className="mt-3 max-w-[420px] text-[16px] leading-[1.15] font-light text-muted-ink min-[810px]:text-[18px]">{f.copy}</p>
                  </div>
                </Appear>
              );
            })}
          </ul>
          <Appear className="justify-self-center lg:justify-self-end">
            <NoticeCard />
          </Appear>
        </div>
        <DividerCta>
          <ArrowAction onClick={() => openDialog({ type: "info", key: "retail" })}>Retail partner information</ArrowAction>
        </DividerCta>
      </Container>
    </SheetSection>
  );
}

function NoticeCard() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % networkNotices.length), 3200);
    return () => window.clearInterval(t);
  }, [reduce]);
  const n = networkNotices[i];
  return (
    <div className="rounded-[30px] bg-paper p-1.5">
      <div className="relative h-[420px] w-[min(86vw,440px)] overflow-hidden rounded-[24px] bg-night" role="img" aria-label="Illustrative counter checklist cycling through bill payment, Micro ATM and Raast QR steps">
        <Image src="/images/business.webp" alt="" fill sizes="440px" className="object-cover" style={{ objectPosition: "35% 50%" }} />
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <div className="absolute inset-x-8 top-8 space-y-2 text-white" aria-hidden="true">
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/15 p-3 backdrop-blur-md">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white">
              <PaykaroLogo decorative className="w-7" />
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-semibold">At the counter</span>
              <span className="block text-[12px] text-white/75">Check each step together</span>
            </span>
            <span className="text-[11px] text-white/70">Illustrative</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ ...SPRING, duration: 0.5 }}
              className="rounded-2xl border border-white/15 bg-white/15 p-3 backdrop-blur-md"
            >
              <p className="text-[15px] font-medium">{n.title}</p>
              <p className="text-[12px] text-white/70">{n.sub}</p>
              <div className="mt-2 border-t border-white/15 pt-2 text-[13px] font-light">
                {n.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5">
                    <span>{k}</span>
                    <span className="flex items-center gap-1 text-white/90">
                      {v} <icons.check className="size-3.5" strokeWidth={2} />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Story() {
  const { segment, navigate } = useSite();
  const s = segments[segment];
  const photo =
    (["business", "personal", "agri"] as const).map((k) => segments[k]).find((p) => p.image !== s.image && p.image !== s.photo.image) ??
    segments.agri;
  return (
    <SheetSection id="story" tone="paper" labelledBy="story-title">
      <Container className="py-[60px] min-[810px]:py-[150px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
          <Appear className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-night lg:aspect-[650/647]">
            <Image src={photo.image} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: photo.imagePosition }} />
            <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-80 mix-blend-multiply" style={{ background: "linear-gradient(to top, var(--seg), transparent)" }} aria-hidden="true" />
          </Appear>
          <div className="flex flex-col">
            <p className="text-[21px]">Why PayKaro</p>
            <div className="mt-10 lg:mt-auto">
              <WordReveal
                as="h2"
                text={"From the shop around the corner\nto the phone in your pocket"}
                className="text-[30px] leading-none font-medium tracking-[-0.01em] min-[810px]:text-[36px]"
              />
              <p className="mt-8 max-w-[520px] text-[17px] leading-[1.35] text-muted-ink min-[810px]:text-[18px]">
                PayKaro is a Pakistani banking and digital-services brand built around everyday life: the bills, the little plans and the
                people who matter. Some things work best on your phone. Others work best with a familiar face at a neighbourhood counter.
                PayKaro brings both together, so the essentials feel simpler wherever you start.
              </p>
              <PillButton
                label={segment === "assisted" ? "See the Micro ATM journey" : "Discover assisted banking"}
                variant="outline"
                size="lg"
                className="mt-8"
                onClick={() => (segment === "assisted" ? navigate("assisted", "micro-atm") : navigate("assisted"))}
              />
              <span className="sr-only">Currently viewing {s.label}.</span>
            </div>
          </div>
        </div>
      </Container>
      <div className="pb-[100px]">
        <Container>
          <ul className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Appear key={m.label} as="li" y={40} delay={i >= 2 ? 0.1 : 0} className="px-4 text-center lg:border-l lg:border-line lg:first:border-l-0">
                {m.value === null ? (
                  <p className="flex h-[78px] items-center justify-center">
                    <PartnerLogo partner="1link" className="h-[60px]" />
                  </p>
                ) : (
                  <p className="text-[56px] leading-[1.4] font-medium tracking-[-0.02em]">
                    <Counter value={m.value} />
                  </p>
                )}
                <p className="text-[14px]">{m.label}</p>
                <p className="mt-1 text-[13px] text-faint-ink">{m.sub}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </div>
    </SheetSection>
  );
}
