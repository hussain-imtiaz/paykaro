"use client";

import Image from "next/image";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { SEGMENT_KEYS, SERVICE_ORDER, segments, services, type SegmentKey, type ServiceKey } from "@/lib/content";
import { serviceFigure } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Appear } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { PartnerLogo, type PartnerKey } from "./partner-logo";
import { ArrowAction, ArrowUpRight, Container, icons, SegmentLink, serviceIcons } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

const card = "relative overflow-hidden rounded-[var(--radius-card)] bg-card p-6 min-[810px]:p-[52px]";

const railsFor: Partial<Record<ServiceKey, PartnerKey[]>> = { transfer: ["1link"], bills: ["raast", "1link"], qr: ["raast"] };

export function Intro() {
  const { segment, openDialog } = useSite();
  const s = segments[segment];
  const [a, b, c] = s.products;
  const fa = serviceFigure[a];
  const fb = serviceFigure[b];
  const fc = serviceFigure[c];
  const IconB = serviceIcons[b];
  const IconC = serviceIcons[c];

  return (
    <SheetSection id="services" tone="paper" above="clear" below="night" roundTop roundBottom raised labelledBy="segments-title">
      <Container className="pt-5 pb-[60px] min-[810px]:pt-[100px] min-[810px]:pb-[200px]">
        <h2 className="sr-only">{s.label} services</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          <Appear className={cn(card, "flex min-h-[170px] flex-col gap-6 lg:h-[472px] lg:gap-8")}>
            <h3 className="text-[20px] leading-none font-medium tracking-[0.01em] min-[810px]:text-[24px]">{services[a].short}</h3>
            <p className="max-w-[260px] font-ui text-[15px] leading-[1.15] text-muted-ink min-[810px]:text-[17px]">{fa.copy}</p>
            <ParticleSphere className="pointer-events-none absolute -right-10 bottom-0 h-[130px] w-[260px] lg:right-auto lg:-left-4 lg:h-[230px] lg:w-[460px] lg:translate-x-[20%]" colorVar="--ink" count={1400} />
          </Appear>

          <Appear delay={0.05} className={cn(card, "flex flex-col gap-6 lg:h-[472px] lg:gap-10")}>
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium">{fb.eyebrow}</p>
              <button
                type="button"
                aria-label={`About ${services[b].short}`}
                onClick={() => openDialog({ type: "service", key: b })}
                className="flex size-9 items-center justify-center rounded-full bg-paper transition-colors hover:bg-seg-soft"
              >
                <IconB className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div>
              {railsFor[b] ? (
                <Appear y={20} delay={0.15} className="flex items-end gap-4">
                  {railsFor[b]!.map((r) => (
                    <PartnerLogo key={r} partner={r} className="h-[84px] min-[810px]:h-[112px]" />
                  ))}
                </Appear>
              ) : (
                <div className="flex items-start justify-between">
                  <Appear y={20} delay={0.15}>
                    <p className="font-num text-[72px] leading-[0.9] tracking-[-0.03em] min-[810px]:text-[98px]">{fb.figure}</p>
                  </Appear>
                  <p className="font-num text-[36px] leading-[0.9] font-medium tracking-[-0.03em] text-seg-ink min-[810px]:text-[48px]">{fb.suffix}</p>
                </div>
              )}
              <p className="mt-3 text-[18px] min-[810px]:text-[21px]">{fb.label}</p>
            </div>
            <p className="mt-auto max-w-[300px] text-[16px] leading-[1.15] min-[810px]:text-[18px]">{fb.copy}</p>
          </Appear>

          <Appear delay={0.1} className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] bg-night lg:h-[472px]">
            <Image src={s.photo.image} alt={s.photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" style={{ objectPosition: s.photo.position }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-6 bottom-6 text-white min-[810px]:inset-x-[52px] min-[810px]:bottom-[52px]">
              <IconC className="size-5" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-3 text-[18px] leading-none font-medium tracking-[0.01em] min-[810px]:text-[20px]">
                {fc.eyebrow}. {s.photo.note}
              </p>
            </div>
          </Appear>

          <Appear className={cn(card, "grid gap-8 lg:col-span-2 lg:h-[472px] lg:grid-cols-[1fr_1.1fr]")}>
            <div className="flex flex-col max-lg:items-center max-lg:text-center">
              <h3 className="text-[32px] leading-none font-medium min-[810px]:text-[24px]">Every everyday payment, one PayKaro</h3>
              <p className="mt-5 max-w-[320px] font-ui text-[16px] leading-[1.15] text-muted-ink min-[810px]:text-[18px]">
                Transfers, bills, Raast QR, Micro ATM and business collections. Micro Takaful is planned.
              </p>
              <ArrowAction className="mt-6 lg:mt-auto" onClick={() => openDialog({ type: "all-services" })}>
                Explore all services
              </ArrowAction>
            </div>
            <ServiceGraph />
          </Appear>

          <Appear delay={0.05} className={cn(card, "flex flex-col gap-6 lg:h-[472px]")}>
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium">Grow at your counter</p>
              <button
                type="button"
                aria-label="Retail partnership information"
                onClick={() => openDialog({ type: "info", key: "retail" })}
                className="flex size-9 items-center justify-center rounded-full bg-paper transition-colors hover:bg-seg-soft"
              >
                <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="rounded-xl bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-line">
              <p className="text-[12px] tracking-[0.03em] text-faint-ink">Retail partner concept</p>
              <p className="mt-1 flex items-center gap-2 text-[22px] font-medium">
                <icons.store className="size-5" strokeWidth={1.75} aria-hidden="true" /> Your shop
              </p>
              <div className="mt-4 divide-y divide-line font-ui text-[15px]">
                {[
                  ["Raast QR", "To explore"],
                  ["Micro ATM", "Ask about devices"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-2.5">
                    <span>{k}</span>
                    <span className="flex items-center gap-1.5 text-seg-ink">
                      {v} <icons.check className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-auto max-w-[300px] font-ui text-[16px] leading-[1.15] text-muted-ink min-[810px]:text-[18px]">
              Kiryana stores, pharmacies, recharge shops and small franchises are at the heart of PayKaro’s retail network strategy.
            </p>
          </Appear>
        </div>

        <SegmentList />
      </Container>
    </SheetSection>
  );
}

function ServiceGraph() {
  const { openDialog } = useSite();
  const tiles: { key: (typeof SERVICE_ORDER)[number] | "1link" | "raast"; bg: string; fg: string }[] = [
    { key: "1link", bg: "#191e30", fg: "#fff" },
    { key: "raast", bg: "#e4f0ff", fg: "#0663bd" },
    { key: "transfer", bg: "#f16557", fg: "#171717" },
    { key: "bills", bg: "#0663bd", fg: "#fff" },
    { key: "qr", bg: "#1c1c1f", fg: "#fff" },
    { key: "atm", bg: "#00d164", fg: "#171717" },
    { key: "cash", bg: "#ffc409", fg: "#171717" },
    { key: "takaful", bg: "#fff", fg: "#767676" },
  ];
  return (
    <div className="relative flex flex-col items-center">
      <ul className="grid grid-cols-4 gap-2.5">
        {tiles.map((t) => {
          const Icon = t.key in services ? serviceIcons[t.key as keyof typeof serviceIcons] : null;
          const label = t.key === "1link" || t.key === "raast" ? "" : services[t.key as keyof typeof services].short;
          const inner = Icon ? <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" /> : null;
          return (
            <li key={t.key}>
              {Icon ? (
                <button
                  type="button"
                  title={label}
                  aria-label={label}
                  onClick={() => openDialog({ type: "service", key: t.key as keyof typeof services })}
                  className={cn(
                    "flex size-12 items-center justify-center rounded-[10px] transition-transform duration-300 hover:-translate-y-0.5 min-[810px]:size-[52px]",
                    t.key === "takaful" && "border border-dashed border-faint-ink",
                  )}
                  style={{ background: t.bg, color: t.fg }}
                >
                  {inner}
                </button>
              ) : (
                <span className="flex size-12 items-center justify-center rounded-[10px] bg-white p-1.5 ring-1 ring-line min-[810px]:size-[52px]">
                  <PartnerLogo partner={t.key as PartnerKey} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <svg viewBox="0 0 260 110" className="h-[90px] w-[240px] min-[810px]:h-[120px] min-[810px]:w-[280px]" aria-hidden="true">
        {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
          <path key={n} d={`M${130 + n * 36} 0 C ${130 + n * 36} 60, 130 50, 130 110`} fill="none" stroke="var(--seg)" strokeOpacity="0.45" strokeWidth="1" />
        ))}
      </svg>
      <span className="flex size-[72px] items-center justify-center rounded-2xl shadow-[0_12px_30px_-10px_var(--seg)]" style={{ background: "var(--seg-grad)" }}>
        <PaykaroLogo decorative className="w-[48px] [--logo-base:#fff] [--logo-face:#171717]" />
      </span>
    </div>
  );
}

/** Each row wears its own segment's colours; the logo sits on a tile in its approved treatment. */
const rowColour: Record<SegmentKey, { bg: string; fg: string; sub: string; tile: string }> = {
  personal: { bg: "#f16557", fg: "#171717", sub: "rgba(23,23,23,0.75)", tile: "#ffffff" },
  business: { bg: "#1c1c1f", fg: "#ffffff", sub: "rgba(255,255,255,0.7)", tile: "#1c1c1f" },
  family: { bg: "#0663bd", fg: "#ffffff", sub: "rgba(255,255,255,0.8)", tile: "#ffffff" },
  agri: { bg: "#00d164", fg: "#191e30", sub: "rgba(25,30,48,0.78)", tile: "#ffffff" },
  assisted: { bg: "#ffc409", fg: "#191e30", sub: "rgba(25,30,48,0.78)", tile: "#ffffff" },
};

function SegmentList() {
  return (
    <div id="segments" className="scroll-mt-10 pt-[60px] min-[810px]:pt-[152px]">
      <Appear>
        <h2 id="segments-title" className="mx-auto max-w-[1040px] text-center text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
          Five ways in. Pick the one that is yours.
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-center text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
          PayKaro is organised around the people it serves. Each segment has its own page, journeys and services.
        </p>
      </Appear>
      <ul className="mt-[48px] space-y-3 min-[810px]:mt-[80px] lg:px-10">
        {SEGMENT_KEYS.map((k, i) => {
          const s = segments[k];
          const c = rowColour[k];
          return (
            <Appear key={k} as="li" delay={i * 0.05} y={30}>
              <SegmentLink
                segment={k}
                data-seg={k}
                aria-label={`PayKaro ${s.label}: ${s.cardDescription}`}
                className="group relative grid overflow-hidden rounded-[var(--radius-card)] p-6 transition-[padding] duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] min-[810px]:grid-cols-[88px_minmax(0,1fr)_minmax(0,1.1fr)_auto] min-[810px]:items-center min-[810px]:gap-8 min-[810px]:px-10 min-[810px]:py-9 lg:hover:py-12"
                style={{ background: c.bg, color: c.fg }}
              >
                <span className="flex size-[64px] items-center justify-center rounded-2xl min-[810px]:size-[88px]" style={{ background: c.tile }}>
                  <PaykaroLogo decorative className="w-[44px] min-[810px]:w-[60px]" />
                </span>
                <span className="mt-5 block min-[810px]:mt-0">
                  <span className="block text-[40px] leading-[0.9] font-medium tracking-[-0.02em] min-[810px]:text-[64px]">{s.label}</span>
                  <span className="mt-2 block text-[15px] font-medium" style={{ color: c.sub }}>
                    {s.menuTitle}
                  </span>
                </span>
                <span className="mt-4 block min-[810px]:mt-0">
                  <span className="block max-w-[460px] font-ui text-[16px] leading-[1.2]">{s.cardDescription}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {s.journeys.map((j) => (
                      <span key={j.id} className="rounded-full border px-3 py-1 text-[13px]" style={{ borderColor: c.sub }}>
                        {j.nav}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="mt-6 flex items-center gap-3 min-[810px]:mt-0">
                  <span className="font-num text-[56px] leading-none opacity-40 max-[809px]:hidden" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:rotate-45"
                    style={{ borderColor: c.fg }}
                  >
                    <ArrowUpRight className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-[15px] font-medium min-[810px]:hidden">Explore {s.label}</span>
                </span>
              </SegmentLink>
            </Appear>
          );
        })}
      </ul>
    </div>
  );
}
