"use client";

import { Building2, Cross, Fingerprint, LockKeyhole, MessageCircle, ReceiptText, RotateCcw, ScanLine, Smartphone, Store, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { segments } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, GlassCard, H2_LG, H2_XL, LEAD, Photo, PhoneConcept, Sheet, Split } from "./blocks";
import { PageHero } from "./hero";
import { Appear, SPRING } from "./motion";
import { Container, PillButton } from "./primitives";
import { useSite } from "./site-context";

const s = segments.assisted;
const [counter, atm, network] = s.journeys;

const howSteps = [
  { icon: MessageCircle, title: "Tell the retailer what you need", copy: "A bill to pay, money to send or cash to take out." },
  { icon: ScanLine, title: "Check the details together", copy: "The recipient or biller, the amount and any charges, before anything is confirmed." },
  { icon: Fingerprint, title: "Verify, then keep your receipt", copy: "Biometric verification where required, and a receipt for your records." },
];

const formats = [
  { icon: Store, title: "Kiryana stores", copy: "The everyday shop on your street." },
  { icon: Smartphone, title: "Recharge & mobile shops", copy: "Counters you already visit for your phone." },
  { icon: Cross, title: "Pharmacies", copy: "Familiar, trusted neighbourhood counters." },
  { icon: Zap, title: "Utility shops", copy: "Where bills and essentials already meet." },
  { icon: Building2, title: "Small franchises", copy: "Local stores ready for new services." },
];

const walkthrough = [
  { title: "What do you need today?", caption: "At the counter", rows: [{ label: "Pay a bill" }, { label: "Send money" }, { label: "Cash access", done: true }], cta: "Continue" },
  { title: "Check it together.", caption: "Cash access", rows: [{ label: "Service available here", done: true }, { label: "Supported account", done: true }, { label: "Charges confirmed" }], cta: "Preview verification" },
  { title: "Verified. Keep your receipt.", caption: "Cash access", rows: [{ label: "Biometric verification", done: true }, { label: "Cash counted", done: true }, { label: "Receipt kept", done: true }], cta: "Done" },
];

export function AssistedPage() {
  const { openDialog, scrollToSection } = useSite();
  const start = { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) };
  return (
    <>
      <div>
        <PageHero eyebrow={s.eyebrow} title={s.title} description={s.description} actions={[start, { label: "How it works", onClick: () => scrollToSection(counter.id) }]} />
        <Sheet tone="white" id={atm.id} labelledBy={`${atm.id}-title`} className="scroll-mt-0 pt-[100px] pb-[100px] min-[810px]:pt-[160px] min-[810px]:pb-[140px]">
          <CenterHead id={`${atm.id}-title`} eyebrow={atm.nav} title={<>Cash access,<br />verified by you.</>} lead={atm.copy} />
          <Container className="mt-12 max-w-[1100px] min-[810px]:mt-16">
            <Appear y={40} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] min-[810px]:aspect-[16/9]">
              <Photo src={s.image} alt={s.alt} position="35% 45%" className="absolute inset-0 rounded-none" sizes="(min-width: 1100px) 1100px, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
              <GlassCard title="Biometric verification" sub="Micro ATM · participating retailer" icon={Fingerprint} className="absolute top-6 left-6" />
              <div aria-hidden="true" className="absolute right-6 bottom-6 w-[220px] rounded-[28px] bg-[#171717] p-2 shadow-2xl min-[810px]:right-12 min-[810px]:bottom-12">
                <div className="rounded-[22px] bg-white p-4 text-[#171717]">
                  <p className="text-[11px] text-black/55">Micro ATM · concept</p>
                  <div className="mt-3 flex h-24 items-center justify-center rounded-2xl bg-seg-soft">
                    <Fingerprint className="size-12 text-seg-ink" strokeWidth={1.25} />
                  </div>
                  <p className="mt-3 text-center text-[12px] font-medium">Place your finger to verify</p>
                </div>
              </div>
            </Appear>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {atm.points.map((p) => (
                <li key={p} className="rounded-full bg-paper px-4 py-2 text-[14px]">
                  {p}
                </li>
              ))}
            </ul>
          </Container>
        </Sheet>
      </div>

      <section id={counter.id} aria-labelledby={`${counter.id}-title`} data-theme="dark" className="relative z-10 -mt-8 scroll-mt-0 rounded-[var(--radius-sheet)] bg-night text-white">
        <Container className="grid gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Appear y={30}>
            <p className="font-num text-[20px] tracking-[0.02em] text-white/60">How it works</p>
            <h2 id={`${counter.id}-title`} className={cn(H2_XL, "mt-4")}>
              Every step
              <br />
              explained,
              <br />
              at the counter.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[460px] text-white/70")}>{counter.copy}</p>
            <Actions
              light
              className="mt-10"
              actions={[
                { label: "Bill payments", onClick: () => openDialog({ type: "service", key: "bills" }) },
                { label: "Money transfers", onClick: () => openDialog({ type: "service", key: "transfer" }) },
              ]}
            />
          </Appear>
          <ol className="space-y-3 self-center">
            {howSteps.map((st, i) => (
              <Appear key={st.title} as="li" delay={i * 0.08} y={24} className="flex gap-5 rounded-[var(--radius-card)] border border-white/10 bg-[#1f1f1f] p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: "var(--seg-grad)" }}>
                  <st.icon className="size-5 text-[#171717]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[20px] leading-[1.1] font-medium">{st.title}</h3>
                  <p className="mt-2 font-ui text-[15px] leading-[1.25] text-white/65">{st.copy}</p>
                </div>
              </Appear>
            ))}
          </ol>
        </Container>
      </section>

      <Sheet tone="white" roundTop={false} className="-mt-8 pt-8">
        <Split
          eyebrow="Your details"
          title={["Your PIN never", "leaves your hands."]}
          copy="The retailer helps with the steps. You confirm the transaction, and you never share your PIN, password or one-time code, even at a counter."
          actions={[start, { label: "Micro ATM services", onClick: () => openDialog({ type: "service", key: "atm" }) }]}
          visual={
            <div className="relative">
              <Photo src="/images/business.webp" alt="A neighbourhood retailer helping a customer at his shop counter" position="70% 40%" className="aspect-[4/3]" />
              <GlassCard title="Your PIN stays yours" sub="Never shared with anyone" icon={LockKeyhole} className="absolute -bottom-6 left-4" />
            </div>
          }
        />

        <section id={network.id} aria-labelledby={`${network.id}-title`} className="scroll-mt-10">
          <Container className="grid gap-12 pt-[60px] pb-[100px] min-[810px]:pb-[160px] lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Appear y={30}>
                <p className="font-num text-[20px] tracking-[0.02em] text-muted-ink">{network.nav}</p>
                <h2 id={`${network.id}-title`} className={cn(H2_LG, "mt-4")}>
                  Built for every kind
                  <br />
                  of counter visit.
                </h2>
                <p className={cn(LEAD, "mt-6 max-w-[480px]")}>{network.copy}</p>
              </Appear>
              <ul className="mt-10">
                {formats.map((f, i) => (
                  <Appear key={f.title} as="li" delay={i * 0.04} className={cn("flex items-center gap-5 py-4", i > 0 && "border-t border-line")}>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper">
                      <f.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[18px] font-medium">{f.title}</h3>
                      <p className="text-[15px] text-muted-ink">{f.copy}</p>
                    </div>
                  </Appear>
                ))}
              </ul>
              <Actions className="mt-8" actions={[{ label: "Retail partnerships", onClick: () => openDialog({ type: "info", key: "retail" }) }]} />
            </div>
            <Appear y={40} className="relative min-h-[480px] overflow-hidden rounded-[var(--radius-card)] lg:min-h-0">
              <Photo src="/images/business.webp" alt="Shelves of everyday goods behind a neighbourhood shop counter" position="85% 50%" className="absolute inset-0 rounded-none" />
              <GlassCard title="Participating retailer" sub="Part of the network plan" icon={Store} className="absolute right-6 bottom-6" />
            </Appear>
          </Container>
        </section>
      </Sheet>

      <CounterWalkthrough />
    </>
  );
}

/** Interactive three-step counter visit, where the reference shows its product dashboard. No real transaction. */
function CounterWalkthrough() {
  const [step, setStep] = useState(0);
  const w = walkthrough[step];
  return (
    <section aria-labelledby="assisted-walk-title" className="bg-paper">
      <div className="px-4 pt-[100px] text-center min-[810px]:pt-[150px]">
        <CenterHead id="assisted-walk-title" scrub={false} title={<>See how a counter<br />visit could feel.</>} lead="An illustrative walkthrough of cash access with a retailer’s help. No real transactions, and no details collected." />
      </div>
      <Container className="grid items-center gap-10 py-14 min-[810px]:py-20 lg:grid-cols-[1fr_auto_1fr]">
        <ol className="space-y-2 lg:justify-self-end">
          {walkthrough.map((x, i) => (
            <li key={x.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={step === i ? "step" : undefined}
                className={cn("flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors lg:w-[360px]", step === i ? "bg-card shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]" : "hover:bg-card/60")}
              >
                <span className={cn("font-num text-[28px] leading-none", step === i ? "text-seg-ink" : "text-faint-ink")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[17px] font-medium">{howSteps[i].title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.97 }} transition={SPRING}>
              <PhoneConcept {...w} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="max-w-[360px] lg:justify-self-start">
          <p className="text-[14px] text-faint-ink">Step {step + 1} of 3</p>
          <p className="mt-2 text-[28px] leading-[1.05] font-medium">{w.title}</p>
          <p className="mt-3 text-[16px] text-muted-ink">{howSteps[step].copy}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton label={step < 2 ? "Next step" : "Start again"} size="lg" onClick={() => setStep((step + 1) % 3)} />
            {step > 0 && (
              <button type="button" onClick={() => setStep(0)} className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-ui text-[16px] text-muted-ink hover:text-ink">
                <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" /> Restart
              </button>
            )}
          </div>
          <p className="sr-only" role="status" aria-live="polite">{`Step ${step + 1} of 3. ${w.title}`}</p>
          <p className="mt-8 flex items-center gap-2 text-[13px] text-faint-ink">
            <ReceiptText className="size-4" strokeWidth={1.5} aria-hidden="true" /> Illustrative concept, not the PayKaro app.
          </p>
        </div>
      </Container>
    </section>
  );
}
