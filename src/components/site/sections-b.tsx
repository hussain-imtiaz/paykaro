"use client";

import { Check, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_ORDER, SEGMENT_KEYS, demos, segments, services, type DemoKey, type SegmentKey, type ServiceKey } from "@/lib/content";
import { clarityRows, serviceChecklist } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Appear, ScrubHeadline, SPRING } from "./motion";
import { Container, icons, OswaldLabel, PillButton, serviceIcons, Sparkle } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

const rowTitles: Record<ServiceKey, string> = {
  transfer: "Send money",
  bills: "Pay bills",
  qr: "Raast QR",
  atm: "Micro ATM",
  cash: "Cash collection",
  takaful: "Micro Takaful",
};

function rowsFor(key: SegmentKey): ServiceKey[] {
  const p = segments[key].products;
  const extra = (["cash", "atm", "bills", "transfer", "qr"] as ServiceKey[]).find((k) => !p.includes(k))!;
  return [...p, extra];
}

export function ServiceTabs() {
  const { segment } = useSite();
  const [choice, setChoice] = useState<{ page: SegmentKey; tab: SegmentKey } | null>(null);
  const tab = choice?.page === segment ? choice.tab : segment;

  return (
    <SheetSection id="service-tabs" tone="night" above="paper" below="card" roundTop roundBottom dark labelledBy="tabs-title">
      <ScrubHeadline className="px-4 pt-[60px] pb-10 min-[810px]:px-10 min-[810px]:pt-[200px] min-[810px]:pb-[60px]">
        <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[330px_1fr]">
          <OswaldLabel className="text-white">PayKaro Services</OswaldLabel>
          <div>
            <h2 id="tabs-title" className="max-w-[560px] text-[32px] leading-none font-medium tracking-[-0.01em] min-[810px]:text-[48px]">
              Every everyday payment, organised around your life
            </h2>
            <p className="mt-6 max-w-[520px] text-[16px] leading-[1.25] text-white/85 min-[810px]:text-[18px]">
              Choose a segment to see the services that fit it, and what to check before each one.
            </p>
          </div>
        </div>
      </ScrubHeadline>
      <Tabs value={tab} onValueChange={(v) => setChoice({ page: segment, tab: v as SegmentKey })} className="gap-0">
        <div className="border-b border-white/10">
          <TabsList
            activateOnFocus
            aria-label="Segments"
            className="no-scrollbar mx-auto flex h-auto w-full max-w-[1000px] justify-start gap-0 overflow-x-auto rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-auto min-[810px]:justify-center"
          >
            {SEGMENT_KEYS.map((k) => (
              <TabsTrigger
                key={k}
                value={k}
                data-seg={k}
                className="relative h-auto flex-1 rounded-none border-0 px-2 py-5 font-heading min-[810px]:px-5 text-[14px] font-normal text-white/80 hover:text-white data-active:bg-transparent data-active:text-seg-bright data-active:shadow-none dark:data-active:text-seg-bright dark:data-active:border-transparent dark:data-active:bg-transparent min-[810px]:flex-1 min-[810px]:text-[15px]"
              >
                {segments[k].label}
                <span className="absolute inset-x-2 bottom-0 h-0.5 bg-seg min-[810px]:inset-x-5 opacity-0 transition-opacity duration-300 in-data-active:opacity-100" aria-hidden="true" />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div data-seg={tab} role="tabpanel" aria-label={`${segments[tab].label} services`}>
          {rowsFor(tab).map((k, i) => (
            <Appear key={`${tab}-${k}`} delay={i * 0.05} className="border-b border-white/10 last:border-b-0">
              <div className="mx-auto grid max-w-[1580px] gap-6 px-4 py-10 min-[810px]:px-10 min-[810px]:py-[52px] lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <h3 className="text-[44px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[64px]">{rowTitles[k]}</h3>
                  <p className="mt-4 max-w-[640px] text-[16px] leading-[1.1] font-light text-white/80 min-[810px]:text-[18px]">{services[k].description}</p>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 lg:block lg:space-y-1.5">
                  {serviceChecklist[k].map((c) => (
                    <li key={c} className="flex items-center gap-2 text-[14px] font-medium">
                      <Sparkle className="text-white/60" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Appear>
          ))}
        </div>
      </Tabs>
      <div className="h-[60px] min-[810px]:h-[100px]" />
    </SheetSection>
  );
}

export function ClarityAndDemo() {
  const { openDialog } = useSite();
  const reduce = useReducedMotion();
  return (
    <SheetSection id="clarity" tone="card" above="night" below="tint" roundTop roundBottom labelledBy="clarity-title">
      <Container className="pb-[100px] min-[810px]:pb-[200px]">
        <ScrubHeadline className="pt-[100px] pb-12 text-center min-[810px]:pt-[200px] min-[810px]:pb-[60px]">
          <h2 id="clarity-title" className="text-[44px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
            Know every detail.
            <br />
            Before you pay.
          </h2>
          <p className="mx-auto mt-8 max-w-[600px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            Every transaction deserves the same four checks: who, how much, what it costs and a record to keep. A verified schedule
            of charges is not published on this website yet, so confirm charges before you pay.
          </p>
        </ScrubHeadline>
        <motion.div
          initial={reduce ? false : { opacity: 1, scale: 0.9, y: 100 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.61, 0.01, 0.24, 0.92] }}
          className="mx-auto max-w-[580px] rounded-[var(--radius-sheet)] bg-paper p-6 min-[810px]:p-[52px]"
        >
          <PaykaroLogo className="w-[72px]" />
          <p className="mt-10 text-[14px] tracking-[0.03em] text-faint-ink">Before you confirm</p>
          <ul className="mt-4 space-y-2.5">
            {clarityRows.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-4 text-[15px] min-[810px]:text-[18px]">
                <span className="flex items-center gap-3 font-semibold">
                  <Sparkle className="text-[18px]" />
                  {k}
                </span>
                <span className="font-light">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-6 text-[15px] min-[810px]:text-[18px]">
            <span className="flex items-center gap-3 font-semibold">
              <Sparkle className="text-[18px]" />
              Total
            </span>
            <span className="font-light">What you agreed, before you pay</span>
          </div>
          <PillButton label="Fees and eligibility" className="mt-12 w-full" onClick={() => openDialog({ type: "info", key: "fees" })} />
        </motion.div>
      </Container>
      <DemoAccordion />
    </SheetSection>
  );
}

function DemoAccordion() {
  const { demo, setDemo } = useSite();
  const shades = ["var(--seg-15)", "var(--seg-35)", "var(--seg-60)", "var(--seg)"];
  return (
    <div id="demo" className="scroll-mt-10">
      <Container className="grid gap-8 pb-10 min-[810px]:pb-[80px] lg:grid-cols-[330px_1fr]">
        <OswaldLabel>App concept</OswaldLabel>
        <Appear>
          <h2 className="max-w-[900px] text-[44px] leading-[0.85] font-semibold min-[810px]:text-[clamp(72px,7.5vw,108px)]">
            Everyday banking in a few taps.
          </h2>
          <p className="mt-8 max-w-[520px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            Pick a service and walk through three simple steps. An interactive concept: no real transactions, no details collected,
            and not the final PayKaro app.
          </p>
        </Appear>
      </Container>
      <div className="overflow-hidden rounded-b-[var(--radius-sheet)]">
        {DEMO_ORDER.map((k, i) => {
          const open = demo === k;
          return (
            <div key={k} style={{ background: open ? "var(--card)" : shades[i] }} className="relative">
              <h3>
                <button
                  type="button"
                  id={`demo-tab-${k}`}
                  aria-expanded={open}
                  aria-controls={`demo-panel-${k}`}
                  onClick={() => setDemo(open ? null : k)}
                  className="relative flex h-[60px] w-full items-center overflow-hidden text-left text-[#171717] min-[810px]:h-[84px]"
                >
                  <span className="px-4 text-[24px] font-medium tracking-[-0.01em] min-[810px]:px-10 min-[810px]:text-[32px]">{demos[k].label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 flex h-full w-[28%] items-start justify-end pt-1 pr-4 font-num text-[72px] leading-[0.9] font-normal text-white/90 min-[810px]:w-[20%] min-[810px]:pr-10 min-[810px]:text-[98px]"
                    style={{ background: open ? shades[i] : "transparent" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`demo-panel-${k}`}
                    role="region"
                    aria-labelledby={`demo-tab-${k}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
                    className="overflow-hidden"
                  >
                    <DemoSteps demoKey={k} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DemoSteps({ demoKey }: { demoKey: DemoKey }) {
  const { setDemo } = useSite();
  const [step, setStep] = useState(0);
  const d = demos[demoKey];
  const Icon = serviceIcons[demoKey];
  const heading = step === 0 ? d.title : step === 1 ? d.lead : d.finish;
  const caption = step === 0 ? d.hint : step === 1 ? "Take a moment before you continue." : d.end;
  const next = () => {
    if (step < 2) return setStep(step + 1);
    const nextKey = DEMO_ORDER[(DEMO_ORDER.indexOf(demoKey) + 1) % DEMO_ORDER.length];
    setDemo(nextKey);
    requestAnimationFrame(() => document.getElementById(`demo-tab-${nextKey}`)?.focus());
  };

  return (
    <div className="grid gap-8 px-4 pt-4 pb-10 min-[810px]:grid-cols-[1fr_auto] min-[810px]:px-10 min-[810px]:pb-14">
      <div className="max-w-[520px]">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-paper">
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p className="text-[16px] font-medium">{d.label}</p>
          <span className="rounded-full bg-seg-soft px-2.5 py-0.5 text-[12px] font-medium text-[#171717]">Concept</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={SPRING}>
            <p className="mt-6 text-[32px] leading-none font-medium tracking-[-0.01em] min-[810px]:text-[40px]">{heading}</p>
            <p className="mt-3 text-[16px] text-muted-ink min-[810px]:text-[18px]">{caption}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <span key={n} className={cn("h-1.5 rounded-full transition-all duration-300", n === step ? "w-8 bg-seg" : "w-1.5 bg-ink/20")} />
          ))}
          <span className="ml-2 font-num text-[14px] text-faint-ink">Step {step + 1} of 3</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton label={step === 0 ? "Continue" : step === 1 ? "Preview result" : "Try another service"} size="lg" onClick={next} />
          {step > 0 && (
            <button type="button" onClick={() => setStep(0)} className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-ui text-[16px] text-muted-ink hover:text-ink">
              <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" /> Restart
            </button>
          )}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{`${d.label}, step ${step + 1} of 3. ${heading}`}</p>
      </div>
      <PhoneStep demoKey={demoKey} step={step} />
    </div>
  );
}

function PhoneStep({ demoKey, step }: { demoKey: DemoKey; step: number }) {
  const d = demos[demoKey];
  const Icon = serviceIcons[demoKey];
  return (
    <div aria-hidden="true" className="mx-auto w-[260px] rounded-[36px] bg-[#171717] p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] min-[810px]:mx-0">
      <div className="flex h-[360px] flex-col rounded-[30px] bg-white p-5 text-[#171717]">
        <div className="flex items-center justify-between">
          <PaykaroLogo decorative className="w-9" />
          <span className="h-1.5 w-10 rounded-full bg-black/10" />
        </div>
        <p className="mt-5 text-[12px] font-medium text-black/55">{d.label}</p>
        <div className="flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={SPRING} className="w-full">
              {step === 0 && (
                <div className="flex flex-col items-center gap-4">
                  <span className="flex size-20 items-center justify-center rounded-full" style={{ background: "var(--seg-grad)" }}>
                    <Icon className="size-8 text-[#171717]" strokeWidth={1.5} />
                  </span>
                  <span className="h-2 w-24 rounded-full bg-black/10" />
                  <span className="h-2 w-16 rounded-full bg-black/10" />
                </div>
              )}
              {step === 1 && (
                <ul className="space-y-2">
                  {d.checks.map((c) => (
                    <li key={c} className="flex items-center gap-2 rounded-xl bg-[#f5f5f5] px-3 py-2.5 text-[13px] font-medium">
                      <span className="flex size-5 items-center justify-center rounded-full bg-seg-fill text-seg-on">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              {step === 2 && (
                <div className="flex flex-col items-center gap-3">
                  <span className="flex size-20 items-center justify-center rounded-full bg-seg-fill text-seg-on">
                    <icons.check className="size-9" strokeWidth={1.5} />
                  </span>
                  <span className="text-[12px] font-medium text-black/55">Demo complete</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="flex h-10 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">
          {step === 0 ? "Continue" : step === 1 ? "Preview result" : "Done"}
        </span>
      </div>
    </div>
  );
}
