"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useRef, type ReactNode } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { cn } from "@/lib/utils";
import { Appear, ScrubHeadline, SPRING } from "./motion";
import { Container, icons, PillButton } from "./primitives";
import type { LucideIcon } from "lucide-react";

export type Action = { label: string; onClick: () => void };

export const H2_XL = "text-[44px] leading-[0.9] font-medium tracking-[-0.02em] min-[810px]:text-[80px]";
export const H2_LG = "text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[56px]";
export const LEAD = "text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]";

export function Actions({ actions, className, light }: { actions: Action[]; className?: string; light?: boolean }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((a, i) => (
        <PillButton key={a.label} label={a.label} size="lg" variant={i === 0 ? "fill" : light ? "outline-light" : "outline"} onClick={a.onClick} />
      ))}
    </div>
  );
}

/** Centred section headline, scrubbed into place as on the reference. */
export function CenterHead({
  id,
  eyebrow,
  title,
  lead,
  scrub = true,
  className,
  dark,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  scrub?: boolean;
  className?: string;
  dark?: boolean;
}) {
  const inner = (
    <>
      {eyebrow && <p className={cn("mb-5 font-num text-[20px] leading-none tracking-[0.02em]", dark ? "text-white/70" : "text-muted-ink")}>{eyebrow}</p>}
      <h2 id={id} className={cn(H2_XL, "mx-auto max-w-[1000px]")}>
        {title}
      </h2>
      {lead && <p className={cn(LEAD, "mx-auto mt-6 max-w-[620px]", dark && "text-white/70")}>{lead}</p>}
    </>
  );
  return scrub ? (
    <ScrubHeadline className={cn("overflow-x-clip px-4 text-center", className)}>{inner}</ScrubHeadline>
  ) : (
    <Appear y={30} className={cn("px-4 text-center", className)}>
      {inner}
    </Appear>
  );
}

export type Feature = { icon: LucideIcon; title: string; copy: string };

/** Ummah's "What your … gives you" grid: white cards, round icon well, two-line title. */
export function FeatureGrid({ items, className }: { items: Feature[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((f, i) => (
        <Appear key={f.title} as="li" delay={(i % 4) * 0.05} y={20} className="flex min-h-[220px] flex-col rounded-[var(--radius-card)] bg-card p-6 min-[810px]:p-7">
          <span className="flex size-10 items-center justify-center rounded-full bg-paper">
            <f.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="mt-auto pt-10 text-[20px] leading-[1.1] font-medium">{f.title}</h3>
          <p className="mt-3 font-ui text-[15px] leading-[1.2] text-muted-ink">{f.copy}</p>
        </Appear>
      ))}
    </ul>
  );
}

/** Photo, cropped, with an optional segment wash. */
export function Photo({ src, alt, position, className, sizes = "(min-width: 1024px) 50vw, 100vw", tint }: { src: string; alt: string; position?: string; className?: string; sizes?: string; tint?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-night", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      {tint && <span aria-hidden="true" className="absolute inset-0 opacity-50 mix-blend-soft-light" style={{ background: "linear-gradient(to top, var(--seg), transparent 65%)" }} />}
    </div>
  );
}

/** Frosted notification card laid over photos. Illustrative, never a real transaction. */
export function GlassCard({ title, sub, rows, className, icon: Icon = icons.check }: { title: string; sub?: string; rows?: [string, string][]; className?: string; icon?: LucideIcon }) {
  return (
    <div aria-hidden="true" className={cn("w-[260px] rounded-2xl bg-white/85 p-4 text-[#171717] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--seg-grad)" }}>
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium">{title}</p>
          {sub && <p className="truncate text-[12px] text-black/55">{sub}</p>}
        </div>
      </div>
      {rows && (
        <div className="mt-3 divide-y divide-black/10 text-[12px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-1.5">
              <span className="text-black/55">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] tracking-[0.04em] text-black/45 uppercase">App concept</p>
    </div>
  );
}

/** Text beside a visual; the reference's Value_2 rows. */
export function Split({
  id,
  eyebrow,
  title,
  copy,
  points,
  actions,
  visual,
  reverse,
  dark,
  extra,
}: {
  id?: string;
  eyebrow?: string;
  title: string[];
  copy: ReactNode;
  points?: string[];
  actions?: Action[];
  visual: ReactNode;
  reverse?: boolean;
  dark?: boolean;
  extra?: ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-10">
      <Container className={cn("grid items-center gap-10 py-[60px] min-[810px]:py-[100px] lg:grid-cols-2 lg:gap-20", reverse && "lg:[&>*:first-child]:order-2")}>
        <Appear y={30}>{visual}</Appear>
        <Appear y={30} delay={0.05} className={cn("max-w-[560px]", reverse ? "lg:justify-self-start" : "lg:justify-self-start lg:pl-6")}>
          {eyebrow && <p className={cn("font-num text-[20px] leading-none tracking-[0.02em]", dark ? "text-white/70" : "text-muted-ink")}>{eyebrow}</p>}
          <h2 id={headingId} className={cn(H2_LG, "mt-4")}>
            {title.map((t) => (
              <span key={t} className="block">
                {t}
              </span>
            ))}
          </h2>
          <p className={cn(LEAD, "mt-6", dark && "text-white/70")}>{copy}</p>
          {points && (
            <ul className="mt-6 space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px]">
                  <icons.check className="mt-0.5 size-4 shrink-0 text-seg-ink" strokeWidth={1.75} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {extra}
          {actions && <Actions actions={actions} light={dark} className="mt-8" />}
        </Appear>
      </Container>
    </section>
  );
}

export type ScreenRow = { label: string; value?: string; done?: boolean };

/** Minimal PayKaro phone concept. Segment-coloured, clearly labelled, no real data. */
export function PhoneConcept({ title, caption, rows, cta, className, tiles }: { title: string; caption?: string; rows?: ScreenRow[]; cta?: string; className?: string; tiles?: { icon: LucideIcon; label: string }[] }) {
  return (
    <div aria-hidden="true" className={cn("w-[260px] rounded-[40px] bg-[#171717] p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]", className)}>
      <div className="flex h-[500px] flex-col rounded-[33px] bg-white p-5 text-[#171717]">
        <div className="flex items-center justify-between">
          <PaykaroLogo decorative className="w-9" />
          <span className="rounded-full bg-seg-soft px-2 py-0.5 text-[10px] font-medium">Concept</span>
        </div>
        <p className="mt-6 text-[12px] text-black/55">{caption}</p>
        <p className="mt-1 text-[24px] leading-[1.05] font-medium tracking-[-0.01em]">{title}</p>
        {tiles && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-2xl bg-[#f5f5f5] p-3">
                <span className="flex size-8 items-center justify-center rounded-full" style={{ background: "var(--seg-grad)" }}>
                  <t.icon className="size-4" strokeWidth={1.75} />
                </span>
                <p className="mt-3 text-[12px] font-medium">{t.label}</p>
              </div>
            ))}
          </div>
        )}
        {rows && (
          <ul className="mt-5 space-y-2">
            {rows.map((r) => (
              <li key={r.label} className="flex items-center justify-between rounded-xl bg-[#f5f5f5] px-3 py-2.5 text-[12px]">
                <span className="flex items-center gap-2 font-medium">
                  <span className={cn("flex size-4 items-center justify-center rounded-full", r.done ? "bg-seg-fill text-seg-on" : "border border-black/20")}>
                    {r.done && <icons.check className="size-3" strokeWidth={2.5} />}
                  </span>
                  {r.label}
                </span>
                {r.value && <span className="text-black/55">{r.value}</span>}
              </li>
            ))}
          </ul>
        )}
        {cta && <span className="mt-auto flex h-11 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">{cta}</span>}
      </div>
    </div>
  );
}

/** Phone that rises out of the section as it scrolls into view, like the reference's app intro. */
export function RisingPhone({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [8, 0]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? { y: 0, rotate: 0 } : { y, rotate }} className="flex justify-center">
        {children}
      </motion.div>
    </div>
  );
}

/** Full-bleed photo band with a slow parallax drift. */
export function ParallaxBand({ src, alt, position, className }: { src: string; alt: string; position?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} className={cn("relative h-[60vh] min-h-[380px] overflow-hidden bg-night min-[810px]:h-[900px]", className)}>
      <motion.div className="absolute inset-x-0 -inset-y-[14%]" style={reduce ? { y: 0 } : { y }}>
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </div>
  );
}

/** Rows with an icon well and a rule, the reference's "Entrusted money" list. */
export function TrustList({ items, dark }: { items: { icon: LucideIcon; title: string; copy: string }[]; dark?: boolean }) {
  return (
    <ul>
      {items.map((it, i) => (
        <Appear key={it.title} as="li" delay={i * 0.05} className={cn("flex gap-5 py-6", i > 0 && (dark ? "border-t border-white/12" : "border-t border-line"))}>
          <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", dark ? "bg-white/10" : "bg-paper")}>
            <it.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[20px] leading-[1.1] font-medium">{it.title}</h3>
            <p className={cn("mt-2 max-w-[440px] font-ui text-[15px] leading-[1.25]", dark ? "text-white/65" : "text-muted-ink")}>{it.copy}</p>
          </div>
        </Appear>
      ))}
    </ul>
  );
}

/** Dark closing sheet: big centred line and two pills. */
export function FinalCta({ id, title, copy, actions, visual }: { id: string; title: string[]; copy: string; actions: Action[]; visual?: ReactNode }) {
  return (
    <section aria-labelledby={id} data-theme="dark" className="relative overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(60% 60% at 50% 110%, color-mix(in srgb, var(--seg) 40%, transparent), transparent 70%)" }} />
      <Container className="relative flex flex-col items-center py-[100px] text-center min-[810px]:py-[160px]">
        <Appear y={30}>
          <h2 id={id} className={cn(H2_XL, "mx-auto max-w-[900px]")}>
            {title.map((t) => (
              <span key={t} className="block">
                {t}
              </span>
            ))}
          </h2>
          <p className={cn(LEAD, "mx-auto mt-6 max-w-[560px] text-white/70")}>{copy}</p>
          <Actions actions={actions} light className="mt-10 justify-center" />
        </Appear>
        {visual && (
          <motion.div className="mt-16" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...SPRING, duration: 0.8 }}>
            {visual}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

/** White sheet with 32px corners, stacked over its neighbours. */
export function Sheet({ children, className, tone = "white", id, labelledBy, roundTop = true, roundBottom = true }: { children: ReactNode; className?: string; tone?: "white" | "paper" | "night"; id?: string; labelledBy?: string; roundTop?: boolean; roundBottom?: boolean }) {
  const bg = tone === "white" ? "bg-card" : tone === "paper" ? "bg-paper" : "bg-night text-white";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={tone === "night" ? "dark" : undefined}
      className={cn("relative z-10 overflow-clip", bg, roundTop && "rounded-t-[var(--radius-sheet)]", roundBottom && "rounded-b-[var(--radius-sheet)]", className)}
    >
      {children}
    </section>
  );
}
