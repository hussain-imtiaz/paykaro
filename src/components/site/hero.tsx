"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { scrollToTarget } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./nav";
import { PillButton } from "./primitives";

const EASE_GRID = [1, -0.13, 0.18, 0.96] as const;

export type HeroAction = { label: string; onClick: () => void };

function useEntrance() {
  const reduce = useReducedMotion();
  return <T extends object>(initial: T, transition: object) =>
    reduce ? {} : { initial, animate: Object.fromEntries(Object.keys(initial).map((k) => [k, k === "scale" || k === "opacity" ? 1 : 0])), transition };
}

/** Soft segment-coloured light ribbon drifting across the hero, like the reference's "Light source". */
function LightRibbon({ className }: { className?: string }) {
  const anim = useEntrance();
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-[-10%] top-[8%] -z-10 h-[70%] mix-blend-screen", className)}
      {...anim({ opacity: 0 }, { delay: 1.1, duration: 1.9, type: "spring", bounce: 0.2 })}
    >
      <svg viewBox="0 0 1600 600" className="motion-anim h-full w-full [animation:light-drift_16s_ease-in-out_infinite]" preserveAspectRatio="none">
        <defs>
          <filter id="light-glow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="light-soft" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <path d="M-50 360 C 300 180, 620 520, 1000 300 S 1500 160, 1650 260" fill="none" stroke="var(--seg)" strokeWidth="60" opacity="0.35" filter="url(#light-glow)" />
        {[0, 1, 2, 3, 4].map((n) => (
          <path
            key={n}
            d={`M-50 ${330 + n * 14} C 300 ${150 + n * 22}, 620 ${500 - n * 10}, 1000 ${280 + n * 12} S 1500 ${140 + n * 18}, 1650 ${240 + n * 16}`}
            fill="none"
            stroke="var(--seg)"
            strokeWidth={n === 2 ? 2.5 : 1.2}
            opacity={n === 2 ? 0.8 : 0.45}
            filter="url(#light-soft)"
          />
        ))}
      </svg>
    </motion.div>
  );
}

function GridLines() {
  const anim = useEntrance();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <motion.div className="absolute inset-x-0 top-[68px] bottom-0" {...anim({ x: -1920 }, { duration: 1.4, ease: EASE_GRID })}>
        <span className="absolute inset-x-0 top-0 h-px bg-white/15" />
        <span className="absolute inset-x-0 top-[calc(40.7%)] h-px bg-white/15 max-lg:top-[30%]" />
      </motion.div>
      <motion.div className="absolute inset-x-0 top-[68px] bottom-0" {...anim({ y: 1080 }, { delay: 0.7, duration: 0.9, ease: EASE_GRID })}>
        <span className="absolute top-0 bottom-0 left-1/3 w-px bg-white/15" />
        <span className="absolute top-0 bottom-0 left-2/3 w-px bg-white/15" />
      </motion.div>
    </div>
  );
}

/** Diagonal beams of light over black, the reference's product-page hero backdrop. */
function LightBeams() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 900], [0, 120]);
  const anim = useEntrance();
  const beams = [
    { left: "38%", width: "15%", opacity: 0.2, delay: 0.2 },
    { left: "54%", width: "7%", opacity: 0.14, delay: 0.35 },
    { left: "66%", width: "22%", opacity: 0.24, delay: 0.5 },
    { left: "92%", width: "10%", opacity: 0.12, delay: 0.65 },
  ];
  return (
    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" style={reduce ? undefined : { y: drift }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(90% 70% at 70% 10%, color-mix(in srgb, var(--seg) 22%, transparent), transparent 70%)" }} />
      {beams.map((b) => (
        <motion.span
          key={b.left}
          className="absolute top-[-30%] h-[160%] origin-top rotate-[24deg] blur-2xl"
          style={{ left: b.left, width: b.width, background: `linear-gradient(180deg, rgba(255,255,255,${b.opacity}), color-mix(in srgb, var(--seg) ${Math.round(b.opacity * 160)}%, transparent) 55%, transparent)` }}
          {...anim({ opacity: 0 }, { delay: b.delay, duration: 1.6, ease: [0.44, 0, 0.56, 1] })}
        />
      ))}
    </motion.div>
  );
}

function HeroCopy({
  eyebrow,
  title,
  description,
  actions,
  titleClass,
}: {
  eyebrow?: string;
  title: string[];
  description: ReactNode;
  actions: HeroAction[];
  titleClass?: string;
}) {
  const anim = useEntrance();
  return (
    <motion.div
      className="mx-auto w-full max-w-[1580px] px-4 pb-10 min-[810px]:px-10 lg:pb-[100px]"
      style={{ originY: 1 }}
      {...anim({ scale: 1.2, y: 80, opacity: 0 }, { delay: 1, duration: 1, ease: [1, 0.08, 0.34, 0.95], opacity: { delay: 0.6, duration: 0.6 } })}
    >
      {eyebrow && <p className="text-[16px] font-medium lg:text-[18px]">{eyebrow}</p>}
      <div className="mt-4 grid items-end gap-6 lg:mt-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        <h1
          id="hero-title"
          className={cn(
            "text-[48px] leading-[0.95] font-medium tracking-[-0.02em] min-[810px]:text-[72px] lg:text-[clamp(72px,6.46vw,102px)] lg:leading-[0.85]",
            titleClass,
          )}
        >
          {title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <div className="lg:justify-self-end">
          <p className="max-w-[440px] text-[18px] leading-[1.15] font-normal lg:text-[clamp(24px,2.5vw,36px)] lg:leading-none">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
            {actions.map((a, i) => (
              <PillButton
                key={a.label}
                label={a.label}
                size="lg"
                variant={i === 0 && actions.length > 1 ? "fill" : "outline-light"}
                className={i === 0 && actions.length > 1 ? "[--pill-hover:#fff] [--pill-hover-fg:#171717]" : undefined}
                onClick={a.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      aria-labelledby="hero-title"
      data-theme="dark"
      className={cn("sticky top-0 isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden text-white", className)}
      onFocusCapture={(e) => {
        // The pinned hero sits under the next sheet once scrolled, so keyboard focus landing in it must bring it back.
        if (window.scrollY > 0 && e.target.matches(":focus-visible")) scrollToTarget(0, { immediate: true });
      }}
    >
      {children}
    </section>
  );
}

/** Homepage hero: full-bleed photograph with a slow zoom. */
export function Hero({
  image,
  imagePosition,
  eyebrow,
  title,
  description,
  actions,
}: {
  image: string;
  imagePosition: string;
  eyebrow?: string;
  title: string[];
  description: ReactNode;
  actions: HeroAction[];
}) {
  const anim = useEntrance();
  return (
    <HeroShell className="bg-[#2b2b2b]">
      <motion.div className="absolute inset-0 -z-20" {...anim({ opacity: 0 }, { delay: 0.3, duration: 1 })}>
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          className="motion-anim object-cover [animation:kenburns_12s_ease-out_both]"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>
      <LightRibbon />
      <GridLines />
      <DesktopNav />
      <div className="h-[68px] shrink-0 lg:hidden" />
      <div className="flex-1" />
      <HeroCopy eyebrow={eyebrow} title={title} description={description} actions={actions} />
    </HeroShell>
  );
}

/** Segment and About hero: black with diagonal light, as on the reference's product pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string[];
  description: ReactNode;
  actions: HeroAction[];
}) {
  return (
    <HeroShell className="bg-[#0d0d0d]">
      <LightBeams />
      <GridLines />
      <DesktopNav />
      <div className="h-[68px] shrink-0 lg:hidden" />
      <div className="flex-1" />
      <HeroCopy eyebrow={eyebrow} title={title} description={description} actions={actions} />
    </HeroShell>
  );
}
