"use client";

import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_ORDER, demos, type DemoKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { Chevron, Eyebrow, Panel, Reveal, extraIcons, serviceIcons } from "./primitives";

function StepVisual({ demo, step }: { demo: DemoKey; step: number }) {
  const d = demos[demo];
  const Icon = serviceIcons[demo];
  if (step === 1) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-seg-soft text-seg-text">
          <Icon className="size-7" strokeWidth={1.75} />
        </span>
        <ul className="w-full space-y-2">
          {d.checks.map((c) => (
            <li key={c} className="flex items-center gap-2.5 rounded-xl bg-[#f4f3ef] px-3 py-2.5 text-[13px] font-medium text-navy">
              <span className="flex size-5 items-center justify-center rounded-full bg-seg-fill text-seg-on">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="relative flex size-24 items-center justify-center">
          <span className="motion-safe-anim absolute inset-0 rounded-full bg-seg/25 [animation:pulse-ring_2s_ease-out_infinite]" />
          <span className="flex size-20 items-center justify-center rounded-full bg-seg-fill text-seg-on">
            <Check className="size-9" strokeWidth={2.5} />
          </span>
        </span>
        <span className="text-[12px] font-semibold text-navy/60">Demo complete</span>
      </div>
    );
  }
  const visuals: Record<DemoKey, React.ReactNode> = {
    transfer: (
      <div className="flex w-full items-center justify-between px-2">
        {["You", "Them"].map((who, i) => (
          <span key={who} className={cn("flex size-16 items-center justify-center rounded-full text-[12px] font-semibold", i === 0 ? "bg-seg-fill text-seg-on" : "bg-seg-soft text-navy")}>
            {who}
          </span>
        ))}
        <span className="absolute left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-white text-seg-text shadow-md">
          <Chevron className="size-4" />
        </span>
      </div>
    ),
    bills: (
      <div className="grid w-full grid-cols-3 gap-2">
        {[
          ["Electricity", extraIcons.receipt],
          ["Water", serviceIcons.bills],
          ["Utilities", extraIcons.house],
        ].map(([label, I]) => {
          const IconC = I as typeof Check;
          return (
            <span key={label as string} className="flex flex-col items-center gap-2 rounded-xl bg-seg-soft px-1 py-3 text-[11px] font-semibold text-navy">
              <IconC className="size-5 text-seg-text" strokeWidth={1.75} />
              {label as string}
            </span>
          );
        })}
      </div>
    ),
    qr: (
      <span className="relative flex size-32 items-center justify-center overflow-hidden rounded-2xl bg-seg-soft">
        <serviceIcons.qr className="size-16 text-navy/80" strokeWidth={1.5} />
        <span className="motion-safe-anim absolute inset-x-3 top-3 h-0.5 bg-seg shadow-[0_0_10px_var(--seg)] [--sweep:100px] [animation:scan-sweep_2.6s_ease-in-out_infinite]" />
      </span>
    ),
    atm: (
      <span className="relative flex size-32 items-center justify-center">
        <span className="motion-safe-anim absolute inset-2 rounded-full border-2 border-seg [animation:pulse-ring_2.4s_ease-out_infinite]" />
        <span className="flex size-24 items-center justify-center rounded-full bg-seg-fill text-seg-on">
          <extraIcons.fingerprint className="size-10" strokeWidth={1.5} />
        </span>
      </span>
    ),
  };
  return <div className="relative flex w-full items-center justify-center">{visuals[demo]}</div>;
}

export function PhoneDemo() {
  const { demo, setDemo } = useSite();
  const [step, setStep] = useState(0);
  const [stepFor, setStepFor] = useState(demo);
  const activeStep = stepFor === demo ? step : 0;
  const d = demos[demo];

  const select = (key: DemoKey) => {
    setDemo(key);
    setStepFor(key);
    setStep(0);
  };
  const next = () => {
    if (activeStep === 2) {
      const nextKey = DEMO_ORDER[(DEMO_ORDER.indexOf(demo) + 1) % DEMO_ORDER.length];
      select(nextKey);
      requestAnimationFrame(() => document.getElementById(`demo-tab-${nextKey}`)?.focus());
      return;
    }
    setStepFor(demo);
    setStep(activeStep + 1);
  };

  const heading = activeStep === 0 ? d.title : activeStep === 1 ? d.lead : d.finish;
  const caption = activeStep === 0 ? d.hint : activeStep === 1 ? "Take a moment before you continue." : d.end;
  const nextLabel = activeStep === 0 ? "Continue" : activeStep === 1 ? "Preview result" : "Try another service";

  return (
    <Panel id="demo" tone="dark" labelledBy="demo-title" className="overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[62%] size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-seg/20 blur-[120px]"
      />
      <Tabs
        value={demo}
        onValueChange={(v) => select(v as DemoKey)}
        className="relative grid items-center gap-14 lg:grid-cols-[1fr_auto_0.7fr] lg:gap-16"
      >
        <Reveal>
          <Eyebrow>One app. All services.</Eyebrow>
          <h2 id="demo-title" className="mt-3 text-[38px] leading-[1.02] font-semibold sm:text-[52px]">
            A little tap.
            <br />A lot of possibility.
          </h2>
          <p className="mt-5 max-w-[420px] text-[17px] leading-relaxed text-fg-muted">
            Pick a service and try three simple steps. See how everyday banking could feel.
          </p>
          <TabsList
            activateOnFocus
            aria-label="Choose a demo service"
            className="mt-9 grid h-auto w-full max-w-[420px] grid-cols-2 gap-2 bg-transparent p-0 group-data-horizontal/tabs:h-auto"
          >
            {DEMO_ORDER.map((key) => {
              const Icon = serviceIcons[key];
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  id={`demo-tab-${key}`}
                  className={cn(
                    "h-14 justify-start gap-3 rounded-[var(--radius-btn)] border border-hairline px-4 text-[15px] font-semibold text-fg",
                    "hover:border-white/40 data-active:border-transparent data-active:bg-seg-fill data-active:text-seg-on",
                    "dark:data-active:border-transparent dark:data-active:bg-seg-fill dark:data-active:text-seg-on",
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  {demos[key].label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <p className="mt-5 text-[13px] text-fg-muted">An interactive concept. No real transactions and no details collected.</p>
        </Reveal>

        <Reveal delay={80} className="justify-self-center">
          <div className="relative w-[300px] sm:w-[320px]">
            <div className="rounded-[46px] bg-[#0d1020] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[36px] bg-white text-navy">
                <span aria-hidden="true" className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0d1020]" />
                <div className="flex items-center justify-between px-5 pt-12 pb-3">
                  <PaykaroLogo className="w-11" />
                  <span className="rounded-[var(--radius-btn)] bg-seg-soft px-2 py-1 text-[10px] font-bold tracking-[0.08em] text-navy">
                    DEMO
                  </span>
                </div>
                {DEMO_ORDER.map((key) => (
                  <TabsContent key={key} value={key} className="flex flex-1 flex-col px-5 pb-5" tabIndex={0}>
                    {key === demo && (
                      <div key={`${key}-${activeStep}`} className="flex flex-1 flex-col animate-rise">
                        <p className="text-[12px] font-semibold text-seg-text [--accent-text:var(--seg-ink)]">{d.label}</p>
                        <h3 className="mt-1 text-[24px] leading-tight font-semibold">{heading}</h3>
                        <div className="flex flex-1 items-center justify-center py-4">
                          <StepVisual demo={key} step={activeStep} />
                        </div>
                        <p className="text-center text-[13px] leading-snug text-navy/65">{caption}</p>
                        <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
                          {[0, 1, 2].map((i) => (
                            <span key={i} className={cn("h-1.5 rounded-full", i === activeStep ? "w-6 bg-seg" : "w-1.5 bg-navy/15")} />
                          ))}
                        </div>
                        <p className="mt-1.5 text-center text-[11px] font-medium text-navy/50">Step {activeStep + 1} of 3</p>
                        <button
                          type="button"
                          onClick={next}
                          className="group mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-seg-fill text-[15px] font-semibold text-seg-on"
                        >
                          {nextLabel}
                          <Chevron className="chev-shift" />
                        </button>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </div>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {`${d.label}, step ${activeStep + 1} of 3. ${heading}`}
            </p>
          </div>
        </Reveal>

        <Reveal delay={140} className="hidden lg:block">
          <ol className="space-y-3">
            {["Choose a service", "Check the details", "Keep your record"].map((label, i) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-[15px] font-medium backdrop-blur",
                  i === activeStep ? "border-seg/60 bg-white/[0.08] text-fg" : "border-hairline text-fg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full font-heading text-[13px] font-semibold",
                    i === activeStep ? "bg-seg-fill text-seg-on" : "bg-white/10",
                  )}
                >
                  {i + 1}
                </span>
                {label}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => {
              setStepFor(demo);
              setStep(0);
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius-btn)] px-1 text-[14px] font-semibold text-fg-muted hover:text-fg"
          >
            <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Restart demo
          </button>
        </Reveal>
      </Tabs>
      <div className="mt-8 flex justify-center lg:hidden">
        <button
          type="button"
          onClick={() => {
            setStepFor(demo);
            setStep(0);
          }}
          className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] px-2 py-2 text-[14px] font-semibold text-fg-muted hover:text-fg"
        >
          <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" />
          Restart demo
        </button>
      </div>
    </Panel>
  );
}
