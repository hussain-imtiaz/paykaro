"use client";

import Image from "next/image";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { SEGMENT_KEYS, segments } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { ActionButton, Chevron, Roll, SegmentLink, buttonClass } from "./primitives";

export function Hero() {
  const { segment, scrollToSection } = useSite();
  const s = segments[segment];

  return (
    <section
      aria-labelledby="hero-title"
      data-theme="dark"
      className="relative isolate flex min-h-[min(100svh,920px)] flex-col overflow-hidden bg-navy pb-16 text-white"
    >
      {SEGMENT_KEYS.map((key, i) => (
        <Image
          key={key}
          src={segments[key].image}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          priority={i === 0 || key === segment}
          className={cn("-z-20 object-cover", key === segment ? "visible" : "invisible")}
          style={{ objectPosition: segments[key].imagePosition }}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,18,30,0.86)_0%,rgba(15,18,30,0.55)_48%,rgba(15,18,30,0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[rgba(15,18,30,0.92)] to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[10%] -z-10 flex justify-center opacity-70 mix-blend-soft-light [--logo-base:rgba(255,255,255,0.10)] [--logo-face:rgba(255,255,255,0.22)]"
      >
        <PaykaroLogo decorative className="w-[min(92vw,1120px)]" />
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="ribbon-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path
          d="M640 -40 C 520 180, 880 260, 760 460 S 540 720, 820 960"
          fill="none"
          stroke="var(--seg-glow)"
          strokeWidth="26"
          strokeLinecap="round"
          filter="url(#ribbon-blur)"
          opacity="0.55"
        />
        <path
          className="ribbon-path"
          d="M640 -40 C 520 180, 880 260, 760 460 S 540 720, 820 960"
          fill="none"
          stroke="var(--seg)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      <div className="h-[var(--header-h)] shrink-0" />

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-end px-5 sm:px-8">
        <nav aria-label="Choose a segment" className="no-scrollbar -mx-5 mb-10 overflow-x-auto px-5 lg:hidden">
          <ul className="flex w-max gap-2">
            {SEGMENT_KEYS.map((key) => (
              <li key={key} data-seg={key}>
                <SegmentLink
                  segment={key}
                  aria-current={key === segment ? "page" : undefined}
                  className="flex h-10 items-center rounded-[var(--radius-btn)] border border-white/30 px-4 text-[14px] font-medium text-white aria-[current=page]:border-transparent aria-[current=page]:bg-seg-fill aria-[current=page]:text-seg-on"
                >
                  {segments[key].label}
                </SegmentLink>
              </li>
            ))}
          </ul>
        </nav>

        <div key={segment} className="grid items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="animate-rise">
            <p className="mb-5 flex items-center gap-2.5 text-[14px] font-medium text-white/85">
              <span className="inline-block size-2 rounded-full bg-seg" aria-hidden="true" />
              {s.eyebrow}
              <span className="text-white/45" aria-hidden="true">
                ·
              </span>
              <span className="text-white/70">Banking, aasani say</span>
            </p>
            <h1
              id="hero-title"
              className="font-heading text-[44px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[56px] xl:text-[68px]"
            >
              {s.title[0]}
              <br />
              {s.title[1]}
              <br />
              <span className="text-seg-bright">{s.title[2]}</span>
            </h1>
          </div>
          <div className="animate-rise [animation-delay:80ms] lg:pb-2">
            <p className="max-w-[440px] text-[18px] leading-[1.5] text-white/85 sm:text-[20px]">{s.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className={buttonClass("primary")}
                onClick={() => scrollToSection("services")}
              >
                <Roll>{`Explore ${s.label.toLowerCase()} banking`}</Roll>
                <Chevron className="chev-shift" />
              </button>
              <ActionButton variant="ghost-light" label="Try the app concept" onClick={() => scrollToSection("demo")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
