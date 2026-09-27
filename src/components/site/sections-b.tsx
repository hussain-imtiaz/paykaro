"use client";

import { CircleAlert, CircleCheck, LifeBuoy, LoaderCircle, RotateCcw, Share2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_ORDER, demos, families, services, servicesIn, type DemoKey, type FamilyKey, type ScreenStatus } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Appear, ScrubHeadline } from "./motion";
import { Container, OswaldLabel, PillButton, RouteLink, serviceIcons, Sparkle } from "./primitives";
import { SheetSection } from "./sheet";
import { useSite } from "./site-context";

/** The 16 propositions from the brief, grouped into five families, in the reference's dark tabbed list. */
export function ServiceTabs() {
  const { openDialog } = useSite();
  const [tab, setTab] = useState<FamilyKey>("everyday");
  const fam = families.find((f) => f.key === tab)!;
  return (
    <SheetSection id="universe" tone="night" above="paper" below="card" roundTop roundBottom dark labelledBy="tabs-title">
      <ScrubHeadline className="px-4 pt-[60px] pb-10 min-[810px]:px-10 min-[810px]:pt-[200px] min-[810px]:pb-[60px]">
        <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[330px_1fr]">
          <OswaldLabel className="text-white">The PayKaro universe</OswaldLabel>
          <div>
            <h2 id="tabs-title" className="max-w-[640px] text-[32px] leading-none font-medium tracking-[-0.01em] min-[810px]:text-[48px]">
              Sixteen services. One experience.
            </h2>
            <p className="mt-6 max-w-[520px] text-[16px] leading-[1.25] text-white/85 min-[810px]:text-[18px]">
              You don’t need to learn PayKaro’s product structure to use PayKaro. But if you want to see everything, here it is.
            </p>
          </div>
        </div>
      </ScrubHeadline>
      <Tabs value={tab} onValueChange={(v) => setTab(v as FamilyKey)} className="gap-0">
        <div className="border-b border-white/10">
          <TabsList
            activateOnFocus
            aria-label="Service families"
            className="no-scrollbar mx-auto flex h-auto w-full max-w-[1100px] justify-start gap-0 overflow-x-auto rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-auto min-[810px]:justify-center"
          >
            {families.map((f) => (
              <TabsTrigger
                key={f.key}
                value={f.key}
                className="relative h-auto shrink-0 rounded-none border-0 px-4 py-5 font-heading text-[14px] font-normal text-white/80 hover:text-white data-active:bg-transparent data-active:text-seg-bright data-active:shadow-none dark:data-active:border-transparent dark:data-active:bg-transparent dark:data-active:text-seg-bright min-[810px]:flex-1 min-[810px]:px-5 min-[810px]:text-[15px]"
              >
                {f.label}
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-seg opacity-0 transition-opacity duration-300 in-data-active:opacity-100 min-[810px]:inset-x-5" aria-hidden="true" />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div role="tabpanel" aria-label={fam.title}>
          <p className="mx-auto max-w-[1580px] px-4 pt-8 text-[15px] text-white/60 min-[810px]:px-10">{fam.copy}</p>
          {servicesIn(tab).map((k, i) => {
            const s = services[k];
            const Icon = serviceIcons[k];
            return (
              <Appear key={`${tab}-${k}`} delay={i * 0.04} className="border-b border-white/10 last:border-b-0">
                <button type="button" onClick={() => openDialog({ type: "service", key: k })} className="group mx-auto grid w-full max-w-[1580px] gap-6 px-4 py-10 text-left min-[810px]:px-10 min-[810px]:py-[48px] lg:grid-cols-[1fr_420px] lg:items-center">
                  <span>
                    <span className="flex items-center gap-4">
                      <Icon className="size-8 shrink-0 text-seg-bright" strokeWidth={1.4} aria-hidden="true" />
                      <span className="text-[36px] leading-[0.95] font-medium tracking-[-0.01em] group-hover:text-seg-bright min-[810px]:text-[56px]">{s.name.replace(/^PayKaro /, "")}</span>
                    </span>
                    <span className="mt-4 block max-w-[640px] text-[16px] leading-[1.2] font-light text-white/80 min-[810px]:text-[18px]">{s.proposition}</span>
                  </span>
                  <span className="flex flex-wrap gap-x-4 gap-y-1.5 lg:block lg:space-y-1.5">
                    <span className="flex items-center gap-2 text-[14px] font-medium">
                      <Sparkle className="text-white/60" />
                      {s.name}
                    </span>
                    {s.optional && (
                      <span className="flex items-center gap-2 text-[14px] font-medium">
                        <Sparkle className="text-white/60" />
                        Optional
                      </span>
                    )}
                    {s.qualifier && (
                      <span className="flex items-center gap-2 text-[14px] font-medium">
                        <Sparkle className="text-white/60" />
                        {s.qualifier}
                      </span>
                    )}
                  </span>
                </button>
              </Appear>
            );
          })}
        </div>
      </Tabs>
      <div className="h-[60px] min-[810px]:h-[100px]" />
    </SheetSection>
  );
}

const proofRows: [string, string][] = [
  ["Amount", "Exactly what leaves your wallet"],
  ["Counterparty", "Who it’s going to"],
  ["Applicable fee", "Shown before you agree"],
  ["Confirmation", "Clear, the moment it’s done"],
];

/** "Trust is designed" card (brief §5 Transactions, §8), then the intent-led demo. */
export function ClarityAndDemo() {
  const { go } = useSite();
  const reduce = useReducedMotion();
  return (
    <SheetSection id="clarity" tone="card" above="night" below="tint" roundTop roundBottom labelledBy="clarity-title">
      <Container className="pb-[100px] min-[810px]:pb-[200px]">
        <ScrubHeadline className="pt-[100px] pb-12 text-center min-[810px]:pt-[200px] min-[810px]:pb-[60px]">
          <h2 id="clarity-title" className="text-[44px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[80px]">
            See it all.
            <br />
            Before you confirm.
          </h2>
          <p className="mx-auto mt-8 max-w-[600px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            Every transaction shows the amount, who it’s going to, any applicable fee, a clear confirmation and proof you can share.
          </p>
        </ScrubHeadline>
        <motion.div
          initial={reduce ? false : { opacity: 1, y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
          className="mx-auto max-w-[580px] rounded-[var(--radius-sheet)] bg-paper p-6 min-[810px]:p-[52px]"
        >
          <PaykaroLogo className="w-[72px]" />
          <p className="mt-10 text-[14px] tracking-[0.03em] text-faint-ink">Before you confirm</p>
          <ul className="mt-4 space-y-2.5">
            {proofRows.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-4 text-[15px] min-[810px]:text-[18px]">
                <span className="flex items-center gap-3 font-semibold">
                  <Sparkle className="text-[18px]" />
                  {k}
                </span>
                <span className="text-right font-light">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-6 text-[15px] min-[810px]:text-[18px]">
            <span className="flex items-center gap-3 font-semibold">
              <Sparkle className="text-[18px]" />
              Proof
            </span>
            <span className="font-light">Yours to keep and share</span>
          </div>
          <PillButton label="Security & Trust" className="mt-12 w-full" onClick={() => go({ kind: "page", key: "trust" })} />
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
        <OswaldLabel>Intent before catalogue</OswaldLabel>
        <Appear>
          <h2 className="max-w-[900px] text-[44px] leading-[0.85] font-semibold min-[810px]:text-[clamp(72px,7.5vw,108px)]">Start with what you want to do.</h2>
          <p className="mt-8 max-w-[520px] text-[16px] leading-[1.25] text-muted-ink min-[810px]:text-[18px]">
            Pick an intent and walk through it, including what happens when something goes wrong. An illustrative concept: no real transactions, no details collected.
          </p>
          <RouteLink to={{ kind: "page", key: "app" }} className="mt-6 inline-flex items-center gap-2 text-[16px] hover:text-seg-ink">
            <Sparkle /> More in The App
          </RouteLink>
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
                  <span className="px-4 text-[22px] font-medium tracking-[-0.01em] min-[810px]:px-10 min-[810px]:text-[32px]">“{demos[k].intent}”</span>
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 flex h-full w-[22%] items-start justify-end pt-1 pr-4 font-num text-[64px] leading-[0.9] font-normal text-white/90 min-[810px]:w-[20%] min-[810px]:pr-10 min-[810px]:text-[98px]"
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
                    transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
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

export function DemoSteps({ demoKey, onFinish }: { demoKey: DemoKey; onFinish?: () => void }) {
  const { setDemo } = useSite();
  const [step, setStep] = useState(0);
  const d = demos[demoKey];
  const s = d.steps[step];
  const next = () => {
    if (step < 2) return setStep(step + 1);
    if (onFinish) return onFinish();
    const nextKey = DEMO_ORDER[(DEMO_ORDER.indexOf(demoKey) + 1) % DEMO_ORDER.length];
    setDemo(nextKey);
    requestAnimationFrame(() => document.getElementById(`demo-tab-${nextKey}`)?.focus());
  };

  return (
    <div className="grid gap-8 px-4 pt-4 pb-10 min-[810px]:grid-cols-[1fr_auto] min-[810px]:px-10 min-[810px]:pb-14">
      <div className="max-w-[520px]">
        <div className="flex items-center gap-3">
          <p className="text-[16px] font-medium">{d.label}</p>
          <span className="rounded-full bg-seg-soft px-2.5 py-0.5 text-[12px] font-medium text-[#171717]">Concept</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <p className="mt-6 text-[32px] leading-none font-medium tracking-[-0.01em] min-[810px]:text-[40px]">{s.heading}</p>
            <p className="mt-3 text-[16px] text-muted-ink min-[810px]:text-[18px]">{s.caption}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <span key={n} className={cn("h-1.5 rounded-full transition-all duration-300", n === step ? "w-8 bg-seg" : n < step ? "w-1.5 bg-seg" : "w-1.5 bg-ink/20")} />
          ))}
          <span className="ml-2 font-num text-[14px] text-faint-ink">Step {step + 1} of 3</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton label={s.button} size="lg" onClick={next} />
          {step > 0 && (
            <button type="button" onClick={() => setStep(0)} className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-ui text-[16px] text-muted-ink hover:text-ink">
              <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" /> Restart
            </button>
          )}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{`${d.label}, step ${step + 1} of 3. ${s.heading}`}</p>
      </div>
      <StatusPhone title={s.screenTitle} status={s.status} rows={s.rows} label={d.label} cta={s.button} />
    </div>
  );
}

const statusMeta: Record<ScreenStatus, { label: string; icon: typeof CircleCheck; tone: string } | null> = {
  idle: null,
  pending: { label: "In progress", icon: LoaderCircle, tone: "bg-[#fff4d1] text-[#795506]" },
  success: { label: "Done", icon: CircleCheck, tone: "bg-[#def7e9] text-[#00652f]" },
  failure: { label: "Didn’t go through", icon: CircleAlert, tone: "bg-[#fdebe6] text-[#a7220f]" },
  recovery: { label: "Next step", icon: LifeBuoy, tone: "bg-[#e4f0ff] text-[#0663bd]" },
};

/** Phone concept whose only motion shows state: a spinner while pending, a tick drawing on success. */
export function StatusPhone({ title, status, rows, label, cta, className }: { title: string; status: ScreenStatus; rows?: [string, string][]; label: string; cta?: string; className?: string }) {
  const meta = statusMeta[status];
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className={cn("mx-auto w-[260px] rounded-[36px] bg-[#171717] p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] min-[810px]:mx-0", className)}>
      <div className="flex h-[400px] flex-col rounded-[30px] bg-white p-5 text-[#171717]">
        <div className="flex items-center justify-between">
          <PaykaroLogo decorative className="w-9" />
          <span className="text-[11px] font-medium text-black/45">{label}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={`${title}-${status}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col">
            <div className="mt-6 flex items-center gap-3">
              {meta && (
                <span className={cn("flex size-11 items-center justify-center rounded-full", meta.tone)}>
                  {status === "success" ? (
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }} />
                    </svg>
                  ) : (
                    <meta.icon className={cn("size-5", status === "pending" && !reduce && "animate-spin [animation-duration:1.6s]")} strokeWidth={2} />
                  )}
                </span>
              )}
              <div>
                <p className="text-[22px] leading-none font-medium">{title}</p>
                {meta && <p className="mt-1 text-[12px] text-black/55">{meta.label}</p>}
              </div>
            </div>
            {rows && (
              <ul className="mt-5 space-y-2">
                {rows.map(([k, v]) => (
                  <li key={k + v} className="flex items-center justify-between gap-3 rounded-xl bg-[#f5f5f5] px-3 py-2.5 text-[12px]">
                    <span className="text-black/55">{k}</span>
                    <span className="text-right font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            )}
            {status === "success" && (
              <span className="mt-3 flex items-center gap-1.5 self-start rounded-full border border-black/10 px-3 py-1.5 text-[12px] font-medium">
                <Share2 className="size-3.5" strokeWidth={2} /> Share proof
              </span>
            )}
          </motion.div>
        </AnimatePresence>
        {cta && <span className="flex h-10 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">{cta}</span>}
      </div>
    </div>
  );
}