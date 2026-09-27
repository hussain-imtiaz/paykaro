"use client";

import Image from "next/image";
import { LayoutGrid, Smartphone } from "lucide-react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { SEGMENT_KEYS, segments, type SegmentKey } from "@/lib/content";
import { promise, proposition } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Appear } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { ArrowAction, ArrowUpRight, Container, RouteLink, SegmentLink } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

const card = "relative overflow-hidden rounded-[var(--radius-card)] bg-card p-6 min-[810px]:p-[52px]";

/** Homepage section 2: the problem PayKaro solves, then the experience it promises (brief §1, §6). */
export function Intro() {
  const { openDialog } = useSite();
  return (
    <SheetSection id="promise" tone="paper" above="clear" below="night" roundTop roundBottom raised labelledBy="promise-title">
      <Container className="pt-5 pb-[60px] min-[810px]:pt-[100px] min-[810px]:pb-[200px]">
        <Appear className="mx-auto max-w-[980px] pb-10 text-center min-[810px]:pb-16">
          <p className="font-num text-[20px] tracking-[0.02em] text-muted-ink">The problem we’re solving</p>
          <h2 id="promise-title" className="mt-4 text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[64px]">
            Everyday money shouldn’t need a branch, a queue or a manual.
          </h2>
        </Appear>
        <div className="grid gap-5 lg:grid-cols-3">
          <Appear className={cn(card, "flex min-h-[260px] flex-col gap-6 lg:h-[472px]")}>
            <Smartphone className="size-6" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-[24px] leading-[1.05] font-medium">Not a bank app compressed onto a phone.</h3>
            <p className="max-w-[300px] font-ui text-[16px] leading-[1.2] text-muted-ink min-[810px]:text-[17px]">
              Most banking apps are branch processes on a small screen. PayKaro starts from what you want to do.
            </p>
            <ParticleSphere className="pointer-events-none absolute -right-10 bottom-0 h-[130px] w-[260px] lg:right-auto lg:-left-4 lg:h-[200px] lg:w-[420px] lg:translate-x-[20%]" colorVar="--ink" count={1100} />
          </Appear>

          <Appear delay={0.05} className={cn(card, "flex flex-col gap-6 lg:h-[472px]")}>
            <LayoutGrid className="size-6" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-[24px] leading-[1.05] font-medium">Not a crowded wallet catalogue.</h3>
            <div className="flex items-end gap-3" aria-hidden="true">
              <p className="font-num text-[98px] leading-[0.8] tracking-[-0.03em]">1</p>
              <p className="pb-1 font-num text-[36px] leading-[0.9] font-medium text-seg-ink">screen, 1 job</p>
            </div>
            <p className="mt-auto max-w-[300px] font-ui text-[16px] leading-[1.2] text-muted-ink min-[810px]:text-[17px]">
              No wall of product icons. The thing you came to do is obvious; everything else is one layer deeper.
            </p>
          </Appear>

          <Appear delay={0.1} className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] bg-night lg:h-[472px]">
            <Image src="/images/personal.webp" alt="A father and his adult daughter looking at a phone together at home" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" style={{ objectPosition: "55% 40%" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-6 bottom-6 text-white min-[810px]:inset-x-[52px] min-[810px]:bottom-[52px]">
              <p className="text-[20px] leading-[1.1] font-medium">Self-service by default. A person when you genuinely need one.</p>
            </div>
          </Appear>

          <Appear className={cn(card, "grid gap-8 lg:col-span-2 lg:h-[472px] lg:grid-cols-[1fr_1.2fr]")}>
            <div className="flex flex-col">
              <h3 className="text-[32px] leading-none font-medium min-[810px]:text-[28px]">Our promise</h3>
              <p className="mt-5 max-w-[340px] font-ui text-[16px] leading-[1.2] text-muted-ink min-[810px]:text-[18px]">
                Help you reach what you came to do quickly, understand what is happening, stay in control and always know the next step.
              </p>
              <ArrowAction className="mt-6 lg:mt-auto" onClick={() => openDialog({ type: "all-services" })}>
                Explore all services
              </ArrowAction>
            </div>
            <PromisePath />
          </Appear>

          <Appear delay={0.05} className={cn(card, "flex flex-col gap-6 lg:h-[472px]")}>
            <p className="text-[15px] font-medium">Built for Pakistan</p>
            <div aria-hidden="true" className="rounded-xl bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-line">
              <div className="flex items-center justify-between text-[18px] font-medium">
                <span>Send money</span>
                <span lang="ur" dir="rtl" className="text-[18px]">
                  پیسے بھیجیں
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[15px] text-muted-ink">
                <span>Freeze card</span>
                <span lang="ur" dir="rtl">
                  کارڈ روکیں
                </span>
              </div>
            </div>
            <p className="mt-auto max-w-[300px] font-ui text-[16px] leading-[1.2] text-muted-ink min-[810px]:text-[18px]">{proposition.local}</p>
          </Appear>
        </div>

        <SegmentList />
      </Container>
    </SheetSection>
  );
}

/** The four parts of the core promise as a path that ends in PayKaro. */
function PromisePath() {
  return (
    <ol className="relative grid content-center gap-3" aria-label="PayKaro’s promise">
      <span className="absolute top-6 bottom-6 left-[21px] w-px bg-gradient-to-b from-seg to-seg/10" aria-hidden="true" />
      {promise.map((p, i) => (
        <Appear key={p.title} as="li" delay={0.08 * i} y={12} className="relative flex items-start gap-4">
          <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-seg-fill font-num text-[18px] text-seg-on">{i + 1}</span>
          <span className="pt-1">
            <span className="block text-[18px] leading-[1.1] font-medium">{p.title}</span>
            <span className="mt-1 block font-ui text-[14px] leading-[1.25] text-muted-ink">{p.copy}</span>
          </span>
        </Appear>
      ))}
    </ol>
  );
}

/** Each row wears its own pathway's colours; the logo sits on a tile in its approved treatment. */
const rowColour: Record<SegmentKey, { bg: string; fg: string; sub: string; tile: string }> = {
  individuals: { bg: "#f16557", fg: "#171717", sub: "rgba(23,23,23,0.75)", tile: "#ffffff" },
  business: { bg: "#1c1c1f", fg: "#ffffff", sub: "rgba(255,255,255,0.7)", tile: "#1c1c1f" },
  partners: { bg: "#0663bd", fg: "#ffffff", sub: "rgba(255,255,255,0.8)", tile: "#ffffff" },
};

function SegmentList() {
  return (
    <div id="segments" className="scroll-mt-10 pt-[60px] min-[810px]:pt-[152px]">
      <Appear>
        <h2 id="segments-title" className="mx-auto max-w-[1040px] text-center text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
          Three ways in. Pick the one that is yours.
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-center text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
          Whether you’re managing your own money, running a business or building with us, start here.
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
                aria-label={`PayKaro for ${s.pathway}: ${s.cardDescription}`}
                className="group relative grid overflow-hidden rounded-[var(--radius-card)] p-6 transition-[padding] duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] min-[810px]:grid-cols-[88px_minmax(0,1fr)_minmax(0,1.1fr)_auto] min-[810px]:items-center min-[810px]:gap-8 min-[810px]:px-10 min-[810px]:py-9 lg:hover:py-12"
                style={{ background: c.bg, color: c.fg }}
              >
                <span className="flex size-[64px] items-center justify-center rounded-2xl min-[810px]:size-[88px]" style={{ background: c.tile }}>
                  <PaykaroLogo decorative className="w-[44px] min-[810px]:w-[60px]" />
                </span>
                <span className="mt-5 block min-[810px]:mt-0">
                  <span className="block text-[40px] leading-[0.9] font-medium tracking-[-0.02em] min-[810px]:text-[60px]">{s.pathway}</span>
                  <span className="mt-2 block text-[15px] font-medium" style={{ color: c.sub }}>
                    {s.menuTitle}
                  </span>
                </span>
                <span className="mt-4 block min-[810px]:mt-0">
                  <span className="block max-w-[460px] font-ui text-[16px] leading-[1.2]">{s.cardDescription}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {s.journeys.slice(0, 4).map((j) => (
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
                  <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:rotate-45" style={{ borderColor: c.fg }}>
                    <ArrowUpRight className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-[15px] font-medium min-[810px]:hidden">Explore {s.label}</span>
                </span>
              </SegmentLink>
            </Appear>
          );
        })}
      </ul>
      <Appear className="mt-6 text-center lg:px-10">
        <RouteLink to={{ kind: "page", key: "app" }} className="inline-flex items-center gap-2 text-[16px] hover:text-seg-ink">
          <ArrowUpRight className="size-4 text-seg-ink" strokeWidth={1.75} aria-hidden="true" /> Or see how the app works
        </RouteLink>
      </Appear>
    </div>
  );
}
