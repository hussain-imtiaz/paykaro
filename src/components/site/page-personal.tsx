"use client";

import { ArrowLeftRight, Banknote, Fingerprint, LockKeyhole, QrCode, ReceiptText } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useRef, useState } from "react";
import { segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, FinalCta, GlassCard, H2_LG, LEAD, Photo, PhoneConcept, RailLogos, RisingPhone, Sheet, Split, TrustList } from "./blocks";
import { PageHero } from "./hero";
import { Appear, SPRING } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { PartnerLogo } from "./partner-logo";
import { ArrowAction, Container } from "./primitives";
import { useSite } from "./site-context";

const s = segments.personal;

const pillars = [
  { icon: ArrowLeftRight, title: "Send", copy: "Domestic interbank transfers through 1LINK, to accounts at other banks." },
  { icon: ReceiptText, title: "Pay", copy: "Bill payments through 1LINK / Raast, with the biller and amount checked first." },
  { icon: QrCode, title: "Scan", copy: "Raast QR payments at participating merchants, result confirmed on screen." },
  { icon: Banknote, title: "Cash", copy: "Micro ATM services at participating retailers, with someone there to help." },
];

const screens = [
  { caption: "Send money", title: "A little closer.", rows: [{ label: "Recipient’s bank", done: true }, { label: "Recipient’s name", done: true }, { label: "Amount and charges" }], cta: "Review transfer" },
  { caption: "Pay a bill", title: "The bills, sorted.", rows: [{ label: "Biller", done: true }, { label: "Consumer reference", done: true }, { label: "Amount due" }], cta: "Check and pay" },
  { caption: "Cash access", title: "Around your corner.", rows: [{ label: "Participating location", done: true }, { label: "Supported account" }, { label: "Charges confirmed" }], cta: "Find out more" },
];

export function PersonalPage() {
  const { openDialog, scrollToSection, navigate } = useSite();
  return (
    <>
      <div>
        <PageHero
          eyebrow={s.eyebrow}
          title={s.title}
          description={s.description}
          actions={[
            { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) },
            { label: "See what’s inside", onClick: () => scrollToSection("personal-intro") },
          ]}
        />
        <Sheet id="personal-intro" labelledBy="personal-intro-title" roundBottom={false} className="pt-[100px] min-[810px]:pt-[160px]">
          <CenterHead id="personal-intro-title" eyebrow="PayKaro Personal" title="Everyday money, in one place." lead="Send money, pay the bills and scan to pay at the counter. The everyday essentials, thoughtfully connected." />
          <RisingPhone className="mt-12 min-[810px]:mt-16">
            <PhoneConcept caption="Assalam-o-Alaikum" title="What would you like to do?" tiles={pillars.map((p) => ({ icon: p.icon, label: p.title }))} cta="Explore services" className="translate-y-10" />
          </RisingPhone>
        </Sheet>
      </div>

      <section aria-labelledby="personal-bento-title" data-theme="dark" className="bg-night text-white">
        <Container className="py-[80px] min-[810px]:py-[140px]">
          <h2 id="personal-bento-title" className="sr-only">
            Everyday banking
          </h2>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr_1fr]">
            <Appear className="flex flex-col rounded-[var(--radius-card)] bg-[#232323] p-7 min-[810px]:p-10">
              <p className="text-[24px] leading-none font-medium">Everyday banking</p>
              <p className="mt-4 max-w-[300px] font-ui text-[16px] leading-[1.2] text-white/65">Transfers, bills and Raast QR, with the details to check before each one.</p>
              <div className="mt-auto flex items-end gap-3 pt-12">
                <PartnerLogo partner="1link" chip className="h-16" />
                <PartnerLogo partner="raast" chip className="h-16" />
              </div>
              <p className="mt-3 text-[13px] text-white/50">Payment rails behind PayKaro’s transfer, bill and QR services.</p>
            </Appear>
            <Appear delay={0.05} className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-card)]">
              <Photo src="/images/personal.webp" alt="A father and his adult daughter looking at a phone together at home" position="55% 40%" className="absolute inset-0 rounded-none" />
              <GlassCard title="Bill payment" sub="Match your consumer reference" rows={[["Biller", "Check the name"], ["Amount due", "Check the figure"]]} icon={ReceiptText} className="absolute bottom-6 left-6" />
            </Appear>
            <Appear delay={0.1} className="flex flex-col rounded-[var(--radius-card)] bg-[#232323] p-7 min-[810px]:p-10">
              <Fingerprint className="size-6 text-seg-bright" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-6 font-num text-[80px] leading-[0.9] tracking-[-0.03em]">Micro</p>
              <p className="font-num text-[40px] leading-[0.9] text-seg-bright">ATM</p>
              <p className="mt-auto max-w-[300px] pt-10 font-ui text-[16px] leading-[1.2] text-white/65">{services.atm.description}</p>
            </Appear>
          </div>
        </Container>
      </section>

      <section aria-labelledby="personal-pillars-title" data-theme="dark" className="bg-night pb-[100px] text-white min-[810px]:pb-[160px]">
        <CenterHead id="personal-pillars-title" dark title="Built around your day." lead="Four everyday moments. Each one starts with a clear check before you confirm." />
        <Container className="mt-14 min-[810px]:mt-20">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Appear key={p.title} as="li" delay={i * 0.06} y={30} className="rounded-[var(--radius-card)] border border-white/10 bg-[#1d1d1d] p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl" style={{ background: "var(--seg-grad)" }}>
                  <p.icon className="size-5 text-[#171717]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-10 text-[28px] leading-none font-medium">{p.title}</h3>
                <p className="mt-3 font-ui text-[15px] leading-[1.25] text-white/65">{p.copy}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </section>

      <JourneyShowcase />

      <Sheet tone="paper" roundTop roundBottom={false}>
        <Split
          eyebrow="Everyday essentials"
          title={["Money that fits", "the way you live."]}
          copy="Make room for the things you would rather be doing. Keep your bill reference and receipt together, and send money home with the recipient’s name checked first."
          actions={[
            { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) },
            { label: "Bill payments", onClick: () => openDialog({ type: "service", key: "bills" }) },
          ]}
          visual={
            <div className="relative">
              <Photo src="/images/personal.webp" alt="A father showing his daughter something on his phone in their living room" position="20% 45%" className="aspect-[4/3]" />
              <GlassCard title="Send money" sub="Across Pakistan" rows={[["Recipient", "Name checked"], ["Reference", "Kept"]]} icon={ArrowLeftRight} className="absolute -bottom-6 left-4 min-[810px]:left-auto min-[810px]:-right-6" />
            </div>
          }
        />
        <Split
          reverse
          eyebrow="Payments, simplified"
          title={["Scan. Pay.", "Carry on."]}
          copy={services.qr.description + " Check the merchant name and amount, then confirm the result before you leave the counter."}
          extra={<RailLogos items={["raast"]} className="mt-8" label="Raast QR at participating merchants" />}
          actions={[{ label: "Raast QR payments", onClick: () => openDialog({ type: "service", key: "qr" }) }]}
          visual={
            <div className="relative">
              <Photo src="/images/business.webp" alt="A shopkeeper checking a phone at the counter of a neighbourhood store" position="70% 45%" className="aspect-[4/3]" />
              <GlassCard title="Raast QR" sub="Confirm the merchant" rows={[["Merchant", "Check the name"], ["Result", "Before you leave"]]} icon={QrCode} className="absolute -bottom-6 left-4" />
            </div>
          }
        />
      </Sheet>

      <section aria-labelledby="personal-protect-title" data-theme="dark" className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <Container className="grid items-center gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-2">
          <div>
            <Appear y={30}>
              <h2 id="personal-protect-title" className={H2_LG}>
                Your details.
                <br />
                Protected by habit.
              </h2>
              <p className={cn(LEAD, "mt-6 max-w-[480px] text-white/70")}>Good habits make everyday banking safer. This website never asks for your PIN, password or one-time code.</p>
            </Appear>
            <div className="mt-10">
              <TrustList
                dark
                items={[
                  { icon: LockKeyhole, title: "Your PIN stays yours", copy: "Never share your PIN, password or one-time code, including on calls and messages." },
                  { icon: ArrowLeftRight, title: "Check before you confirm", copy: "Review the recipient, merchant and amount every time." },
                  { icon: ReceiptText, title: "Keep a clear record", copy: "Save the receipt and reference so it’s easier to follow up." },
                ]}
              />
            </div>
          </div>
          <div className="relative h-[360px] min-[810px]:h-[520px]" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--seg) 35%, transparent), transparent 70%)" }} />
            <ParticleSphere className="absolute inset-0" colorVar="--seg" count={1600} speed={0.12} />
          </div>
        </Container>
      </section>

      <FinalCta
        id="personal-cta"
        title={["Your everyday money,", "one PayKaro."]}
        copy="Account opening isn’t available on this website yet. Explore the services, or see how PayKaro looks after families."
        actions={[
          { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) },
          { label: "PayKaro Family", onClick: () => navigate("family") },
        ]}
        visual={<PhoneConcept caption="Home" title="Everything in one place." tiles={pillars.map((p) => ({ icon: p.icon, label: p.title }))} />}
      />
    </>
  );
}

/** Pinned phone beside the three Personal journeys; the screen follows whichever journey is in view. */
function JourneyShowcase() {
  const { openDialog, showDemo } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(2, Math.max(0, Math.floor(v * 3)))));
  const screen = screens[active];
  return (
    <Sheet tone="white" labelledBy="personal-journeys-title" className="py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="personal-journeys-title" title={s.journeysTitle.join(" ")} lead={s.journeysIntro} />
      <Container className="mt-14 grid gap-10 min-[810px]:mt-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="hidden lg:block">
          <div className="sticky top-[12vh] flex h-[76vh] items-center justify-center rounded-[var(--radius-card)] bg-paper">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -24, scale: 0.97 }} transition={SPRING}>
                <PhoneConcept {...screen} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div ref={ref}>
          {s.journeys.map((j, i) => (
            <article key={j.id} id={j.id} aria-labelledby={`${j.id}-title`} className="flex scroll-mt-24 flex-col justify-center py-10 lg:min-h-[76vh]">
              <p className={cn("font-num text-[20px] leading-none tracking-[0.02em] transition-colors duration-300", i === active ? "text-seg-ink" : "text-faint-ink")}>{String(i + 1).padStart(2, "0")} · {j.nav}</p>
              <h3 id={`${j.id}-title`} className={cn(H2_LG, "mt-4")}>
                {j.title[0]}
                <br />
                {j.title[1]}
              </h3>
              <p className={cn(LEAD, "mt-6 max-w-[480px]")}>{j.copy}</p>
              <ul className="mt-6 space-y-2">
                {j.services.map((k) => (
                  <li key={k}>
                    <ArrowAction onClick={() => openDialog({ type: "service", key: k })}>{services[k].short}</ArrowAction>
                  </li>
                ))}
              </ul>
              {j.id === "transfers" && <RailLogos items={["1link", "raast"]} className="mt-8" />}
              <div className="mt-8 lg:hidden">
                <PhoneConcept {...screens[i]} className="mx-auto" />
              </div>
              {i === 2 && <Actions className="mt-8" actions={[{ label: "Try the walkthrough", onClick: () => showDemo("transfer") }]} />}
            </article>
          ))}
        </div>
      </Container>
    </Sheet>
  );
}
