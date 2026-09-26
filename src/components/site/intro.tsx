"use client";

import Image from "next/image";
import { Fragment } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { SERVICE_ORDER, segments, services, type DemoKey } from "@/lib/content";
import { serviceFigure } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Appear } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { ArrowAction, ArrowUpRight, Container, icons, serviceIcons } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

const card = "relative overflow-hidden rounded-[var(--radius-card)] bg-card p-6 min-[810px]:p-[52px]";

export function Intro() {
  const { segment, openDialog, showDemo } = useSite();
  const s = segments[segment];
  const [a, b, c] = s.products;
  const fa = serviceFigure[a];
  const fb = serviceFigure[b];
  const fc = serviceFigure[c];
  const IconB = serviceIcons[b];
  const IconC = serviceIcons[c];

  return (
    <SheetSection id="services" tone="paper" above="hero" below="night" roundTop roundBottom labelledBy="ways-title">
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
              <div className="flex items-start justify-between">
                <Appear y={20} delay={0.15}>
                  <p className="font-num text-[72px] leading-[0.9] tracking-[-0.03em] min-[810px]:text-[98px]">{fb.figure}</p>
                </Appear>
                <p className="font-num text-[36px] leading-[0.9] font-medium tracking-[-0.03em] text-seg-ink min-[810px]:text-[48px]">{fb.suffix}</p>
              </div>
              <p className="mt-1 text-[18px] min-[810px]:text-[21px]">{fb.label}</p>
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

        <Ways onDemo={showDemo} />
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
          const label = t.key === "1link" ? "1LINK" : t.key === "raast" ? "Raast" : services[t.key as keyof typeof services].short;
          const inner = Icon ? <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" /> : <span className="font-num text-[13px] font-medium">{label}</span>;
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
                <span className="flex size-12 items-center justify-center rounded-[10px] min-[810px]:size-[52px]" style={{ background: t.bg, color: t.fg }}>
                  {inner}
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

function Ways({ onDemo }: { onDemo: (k: DemoKey) => void }) {
  const { segment, openDialog } = useSite();
  const s = segments[segment];
  const rules = ["var(--seg)", "#191e30", "var(--seg-ink)"];
  return (
    <div className="pt-[37px] min-[810px]:pt-[152px]">
      <Appear>
        <h2 id="ways-title" className="mx-auto max-w-[760px] text-center text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
          Three ways in. Pick the one that is yours.
        </h2>
      </Appear>
      <div className="mt-[60px] grid gap-5 min-[810px]:mt-[100px] lg:grid-cols-3 lg:px-10">
        {s.journeys.map((j, i) => {
          const demoKey = j.services.find((k): k is DemoKey => ["transfer", "bills", "qr", "atm"].includes(k));
          return (
            <Appear key={j.id} delay={i * 0.06} as="article" id={j.id} className="scroll-mt-24">
              <div className="flex h-full flex-col rounded-[var(--radius-card)] bg-card p-6 min-[810px]:p-8 lg:min-h-[472px]">
                <div className="flex items-center gap-3">
                  <PaykaroLogo decorative className="w-[46px]" />
                  <p className="font-heading text-[19px] leading-[0.95] font-semibold tracking-[-0.01em] uppercase">
                    {j.nav.split(" & ").map((w, n, arr) => (
                      <Fragment key={w}>
                        {w}
                        {n < arr.length - 1 && " &"}
                        <br />
                      </Fragment>
                    ))}
                  </p>
                </div>
                <h3 className="sr-only">{j.nav}</h3>
                <p className="mt-10 font-ui text-[16px] leading-[1.15] text-muted-ink lg:mt-auto">{j.copy}</p>
                <ul className="mt-6 space-y-1.5">
                  {j.services.map((k) => (
                    <li key={k}>
                      <ArrowAction onClick={() => openDialog({ type: "service", key: k })}>{services[k].short}</ArrowAction>
                    </li>
                  ))}
                  {demoKey && (
                    <li>
                      <ArrowAction onClick={() => onDemo(demoKey)}>See how it works</ArrowAction>
                    </li>
                  )}
                  {j.partner && (
                    <li>
                      <ArrowAction onClick={() => openDialog({ type: "info", key: "retail" })}>Retail partnerships</ArrowAction>
                    </li>
                  )}
                </ul>
                <span className="mt-6 h-[2px] w-full rounded-full" style={{ background: rules[i] }} aria-hidden="true" />
              </div>
            </Appear>
          );
        })}
      </div>
    </div>
  );
}
