"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SEGMENT_KEYS, segments } from "@/lib/content";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./nav";
import { useSite } from "./site-context";
import { PillButton } from "./primitives";

const EASE_GRID = [1, -0.13, 0.18, 0.96] as const;

export function Hero() {
  const { segment, scrollToSection } = useSite();
  const s = segments[segment];
  const reduce = useReducedMotion();
  const anim = <T extends object>(initial: T, transition: object) =>
    reduce ? {} : { initial, animate: Object.fromEntries(Object.keys(initial).map((k) => [k, k === "scale" || k === "opacity" ? 1 : 0])), transition };

  return (
    <section
      aria-labelledby="hero-title"
      data-theme="dark"
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-[#2b2b2b] text-white"
    >
      <motion.div className="absolute inset-0 -z-20" {...anim({ opacity: 0 }, { delay: 0.3, duration: 1 })}>
        {SEGMENT_KEYS.map((key, i) => (
          <Image
            key={key}
            src={segments[key].image}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            priority={i === 0 || key === segment}
            className={cn("motion-anim object-cover [animation:kenburns_12s_ease-out_both]", key === segment ? "visible" : "invisible")}
            style={{ objectPosition: segments[key].imagePosition }}
          />
        ))}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-10%] top-[8%] -z-10 h-[70%] mix-blend-screen"
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

      <DesktopNav />
      <div className="h-[68px] shrink-0 lg:hidden" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none flex flex-1 items-start justify-center overflow-hidden pr-5 lg:max-h-[366px]"
        {...anim({ opacity: 0 }, { delay: 1.6, duration: 2, ease: [0.65, 0.62, 0.46, 0.62] })}
      >
        <span className="font-heading text-[26vw] leading-[1.1] font-semibold tracking-[-0.01em] whitespace-nowrap text-white/[0.09] lg:text-[min(20.8vw,330px)]">
          PAYKARO
        </span>
      </motion.div>

      <motion.div
        className="mx-auto w-full max-w-[1580px] px-4 pb-10 min-[810px]:px-10 lg:pb-[100px]"
        style={{ originY: 1 }}
        {...anim({ scale: 1.2, y: 80 }, { delay: 1, duration: 1, ease: [1, 0.08, 0.34, 0.95] })}
      >
        <p className="text-[16px] font-medium lg:text-[18px]">{s.eyebrow} · Banking and digital services for Pakistan</p>
        <div className="mt-4 grid items-end gap-6 lg:mt-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <h1
            id="hero-title"
            className="text-[48px] leading-[0.95] font-medium tracking-[-0.02em] min-[810px]:text-[72px] lg:text-[clamp(72px,6.46vw,102px)] lg:leading-[0.85]"
          >
            {s.title[0]}
            <br />
            {s.title[1]}
            <br />
            {s.title[2]}
          </h1>
          <div className="lg:justify-self-end">
            <p className="max-w-[440px] text-[18px] leading-[1.15] font-normal lg:text-[clamp(24px,2.5vw,36px)] lg:leading-none">
              {s.description}
            </p>
            <PillButton
              label={`Explore ${s.label.toLowerCase()}`}
              variant="outline-light"
              size="lg"
              className="mt-8 lg:mt-10"
              onClick={() => scrollToSection("services")}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
