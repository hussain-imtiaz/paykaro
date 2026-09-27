"use client";

import { ArrowDownLeft, ArrowLeftRight, Crown, Gift, Globe, LockKeyhole, ShieldCheck, ShoppingBag, ToggleRight, Wallet, Watch } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useRef, useState, type ReactNode } from "react";
import { segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CenterHead, FinalCta, GlassCard, H2_LG, LEAD, Photo, PhoneConcept, Sheet, Split, TrustList } from "./blocks";
import { CardControlsConcept, HomeLikelyNext, ReceiptConcept } from "./app-concepts";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { ArrowAction, Container } from "./primitives";
import { StatusPhone } from "./sections-b";
import { useSite } from "./site-context";

const s = segments.individuals;

const pillars = [
  { icon: ArrowDownLeft, title: "Receive", copy: "Money in, from people here and eligible remittances from family abroad." },
  { icon: Wallet, title: "Hold", copy: "Your balance, always visible, as the anchor of the app." },
  { icon: Watch, title: "Pay", copy: "By card, physical or virtual, or with a supported wearable." },
  { icon: ArrowLeftRight, title: "Move", copy: "Send money on, with the amount, recipient and any fee shown first." },
];

const screens: ReactNode[] = [
  <HomeLikelyNext key="wallet" />,
  <CardControlsConcept key="cards" frozen />,
  <StatusPhone key="remit" label="Remittance" title="On its way" status="pending" rows={[["From", "Family abroad"], ["Status", "On its way"], ["Next", "We’ll tell you when it lands"]]} />,
  <PhoneConcept key="insights" caption="Money Dashboard" title="Bills landed earlier this month." rows={[{ label: "Groceries", value: "42%" }, { label: "Bills", value: "26%" }, { label: "Sent to family", value: "14%" }]} cta="Set some aside" />,
  <PhoneConcept key="grow" caption="Super Savers" title="Put money aside." rows={[{ label: "Eligible partner offering", done: true }, { label: "See the terms first", done: true }, { label: "Move money in" }]} cta="Explore options" />,
];

export function IndividualsPage() {
  const { openDialog, scrollToSection, navigate } = useSite();
  const get = { label: "Get PayKaro", onClick: () => openDialog({ type: "info", key: "getpaykaro" }) };
  return (
    <>
      <div>
        <PageHero eyebrow={s.eyebrow} title={s.title} description={s.description} actions={[get, { label: "See what’s inside", onClick: () => scrollToSection("ind-intro") }]} />
        <Sheet id="ind-intro" labelledBy="ind-intro-title" roundBottom={false} className="pt-[100px] min-[810px]:pt-[160px]">
          <CenterHead id="ind-intro-title" eyebrow="PayKaro Wallet" title="Start with what you want to do." lead="Your balance stays put as the anchor. Below it, the things you’re most likely to do next, not a grid of every product." />
          <div className="mt-12 flex justify-center overflow-hidden pb-0 min-[810px]:mt-16">
            <Appear y={60}>
              <HomeLikelyNext className="translate-y-10" />
            </Appear>
          </div>
        </Sheet>
      </div>

      <section aria-labelledby="ind-bento-title" data-theme="dark" className="bg-night text-white">
        <Container className="py-[80px] min-[810px]:py-[140px]">
          <h2 id="ind-bento-title" className="sr-only">
            Everyday money
          </h2>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr_1fr]">
            <Appear className="flex flex-col rounded-[var(--radius-card)] bg-[#232323] p-7 min-[810px]:p-10">
              <p className="text-[24px] leading-none font-medium">{services.wallet.name}</p>
              <p className="mt-4 max-w-[300px] font-ui text-[16px] leading-[1.2] text-white/65">{services.wallet.proposition}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-12">
                {pillars.map((p) => (
                  <li key={p.title} className="rounded-full border border-white/20 px-3 py-1.5 text-[14px]">
                    {p.title}
                  </li>
                ))}
              </ul>
            </Appear>
            <Appear delay={0.05} className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-card)]">
              <Photo src="/images/agri.webp" alt="A man in a green field checking his phone" position="50% 35%" className="absolute inset-0 rounded-none" />
              <GlassCard title="Money from abroad" sub="Received in your wallet" rows={[["Status", "Received"], ["Proof", "Ready to share"]]} icon={Globe} className="absolute bottom-6 left-6" />
            </Appear>
            <Appear delay={0.1} className="flex flex-col rounded-[var(--radius-card)] bg-[#232323] p-7 min-[810px]:p-10">
              <Watch className="size-6 text-seg-bright" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-6 font-num text-[80px] leading-[0.9] tracking-[-0.03em]">Wear</p>
              <p className="font-num text-[40px] leading-[0.9] text-seg-bright">&amp; Pay</p>
              <p className="mt-auto max-w-[300px] pt-10 font-ui text-[16px] leading-[1.2] text-white/65">{services.wearpay.proposition}</p>
            </Appear>
          </div>
        </Container>
      </section>

      <section aria-labelledby="ind-pillars-title" data-theme="dark" className="overflow-x-clip bg-night pb-[100px] text-white min-[810px]:pb-[160px]">
        <CenterHead id="ind-pillars-title" dark title="Receive. Hold. Pay. Move." lead="Four everyday verbs, one wallet. Each shows you what is happening and what comes next." />
        <Container className="mt-14 min-[810px]:mt-20">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Appear key={p.title} as="li" delay={i * 0.05} y={24} className="rounded-[var(--radius-card)] border border-white/10 bg-[#1d1d1d] p-7">
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
          eyebrow="Membership & extras"
          title={["More, if you", "want it."]}
          copy={`${services.premium.proposition} ${services.rewards.proposition} ${services.marketplace.proposition}`}
          points={["Premium is always optional", "Rewards linked to how you use PayKaro", "Partner services when they’re relevant, not as banners"]}
          actions={[
            { label: "PayKaro Premium", onClick: () => openDialog({ type: "service", key: "premium" }) },
            { label: "Rewards", onClick: () => openDialog({ type: "service", key: "rewards" }) },
          ]}
          visual={
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--radius-card)] bg-night" aria-hidden="true">
              <div className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, var(--seg) 45%, transparent), transparent 70%)" }} />
              <div className="relative grid grid-cols-3 gap-3">
                {[Crown, Gift, ShoppingBag].map((I, i) => (
                  <span key={i} className={cn("flex size-24 items-center justify-center rounded-3xl text-white ring-1 ring-white/15 backdrop-blur-md min-[810px]:size-32", i === 1 ? "bg-seg-fill text-seg-on" : "bg-white/10")}>
                    <I className="size-10 min-[810px]:size-12" strokeWidth={1.25} />
                  </span>
                ))}
              </div>
            </div>
          }
        />
        <Split
          reverse
          eyebrow="Optional protection"
          title={["Protection you", "choose."]}
          copy={`${services.fraud.name}: ${services.fraud.proposition.charAt(0).toLowerCase()}${services.fraud.proposition.slice(1)} Its terms aren’t published on this website yet.`}
          actions={[{ label: "Digital Fraud Insurance", onClick: () => openDialog({ type: "service", key: "fraud" }) }]}
          visual={
            <div className="relative">
              <Photo src="/images/personal.webp" alt="A father showing his daughter something on his phone in their living room" position="20% 45%" className="aspect-[4/3]" />
              <GlassCard title="Digital Fraud Insurance" sub="Optional · licensed insurance partner" icon={ShieldCheck} className="absolute -bottom-6 left-4" />
            </div>
          }
        />
      </Sheet>

      <section aria-labelledby="ind-controls-title" data-theme="dark" className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <Container className="grid items-center gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-2">
          <div>
            <Appear y={24}>
              <h2 id="ind-controls-title" className={H2_LG}>
                Your controls.
                <br />
                Right where you need them.
              </h2>
              <p className={cn(LEAD, "mt-6 max-w-[480px] text-white/70")}>Routine controls are self-service, immediate and reversible wherever permitted, so you’re never waiting on someone else.</p>
            </Appear>
            <div className="mt-10">
              <TrustList
                dark
                items={[
                  { icon: ToggleRight, title: "Card and security controls", copy: "Freeze, unfreeze and adjust your cards yourself, with the change shown straight away." },
                  { icon: LockKeyhole, title: "Consent and partner access", copy: "See what you’ve agreed to and which partners can access what, and change it." },
                  { icon: ShieldCheck, title: "Your details stay yours", copy: "Never share your PIN, password or one-time code. This website never asks for them." },
                ]}
              />
            </div>
          </div>
          <div className="relative flex h-[520px] items-center justify-center" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--seg) 30%, transparent), transparent 70%)" }} />
            <ParticleSphere className="absolute inset-0 opacity-60" colorVar="--seg" count={1200} speed={0.08} />
            <ReceiptConcept className="relative" />
          </div>
        </Container>
      </section>

      <FinalCta
        id="ind-cta"
        title={["Your everyday money,", "one PayKaro."]}
        copy="The app isn’t available to download from this website yet. Explore the services, or see how PayKaro works for businesses."
        actions={[get, { label: "Explore for Business", onClick: () => navigate("business") }]}
      />
    </>
  );
}

/** Pinned phone beside the Individuals journeys; the screen follows whichever journey is in view. */
function JourneyShowcase() {
  const { openDialog, showDemo } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = s.journeys.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));
  return (
    <Sheet tone="white" labelledBy="ind-journeys-title" className="py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="ind-journeys-title" title="Made for the way you live." lead="Five everyday needs, and the PayKaro services that fit around them." />
      <Container className="mt-14 grid gap-10 min-[810px]:mt-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="hidden lg:block">
          <div className="sticky top-[12vh] flex h-[76vh] items-center justify-center rounded-[var(--radius-card)] bg-paper">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -16 }} transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}>
                {screens[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div ref={ref}>
          {s.journeys.map((j, i) => (
            <article key={j.id} id={j.id} aria-labelledby={`${j.id}-title`} className="flex scroll-mt-24 flex-col justify-center py-10 lg:min-h-[76vh]">
              <p className={cn("font-num text-[20px] leading-none tracking-[0.02em] transition-colors duration-300", i === active ? "text-seg-ink" : "text-faint-ink")}>
                {String(i + 1).padStart(2, "0")} · {j.nav}
              </p>
              <h3 id={`${j.id}-title`} className={cn(H2_LG, "mt-4")}>
                {j.title[0]}
                <br />
                {j.title[1]}
              </h3>
              <p className={cn(LEAD, "mt-6 max-w-[480px]")}>{j.copy}</p>
              <ul className="mt-6 space-y-2">
                {j.services.map((k) => (
                  <li key={k}>
                    <ArrowAction onClick={() => openDialog({ type: "service", key: k })}>{services[k].name}</ArrowAction>
                  </li>
                ))}
                {j.id === "cards" && (
                  <li>
                    <ArrowAction onClick={() => showDemo("card")}>Try it: freeze a card</ArrowAction>
                  </li>
                )}
                {j.id === "remittance" && (
                  <li>
                    <ArrowAction onClick={() => showDemo("remit")}>Try it: money from abroad</ArrowAction>
                  </li>
                )}
              </ul>
              <div className="mt-8 flex justify-center lg:hidden">{screens[i]}</div>
            </article>
          ))}
        </div>
      </Container>
    </Sheet>
  );
}
