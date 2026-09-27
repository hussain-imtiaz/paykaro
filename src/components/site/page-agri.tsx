"use client";

import Image from "next/image";
import { ArrowLeftRight, CircleCheck, Fingerprint, QrCode, Sprout, Tractor, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { segments, services, type ServiceKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CenterHead, FinalCta, GlassCard, H2_LG, H2_XL, LEAD, Photo, RailLogos, Sheet, Split } from "./blocks";
import { PageHero } from "./hero";
import { Appear, Counter, SPRING, useSectionZoom } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { ArrowAction, Container, serviceIcons } from "./primitives";
import { useSite } from "./site-context";

const s = segments.agri;
const [payments, cashJ, trade] = s.journeys;

const steps = [
  { n: "First", title: "Choose the service", copy: "A transfer, a bill, a Raast QR payment or cash access.", rows: [["Transfer", "1LINK"], ["Bill", "1LINK / Raast"], ["Cash", "Micro ATM"]] },
  { n: "Next", title: "Check who you’re paying", copy: "The recipient, biller or merchant name, every time.", rows: [["Name", "Checked"], ["Account or reference", "Matched"]] },
  { n: "Then", title: "Confirm the amount and charges", copy: "Charges are confirmed before you authorise anything.", rows: [["Amount", "Reviewed"], ["Charges", "Confirmed first"]] },
  { n: "Last", title: "Keep the record", copy: "Save the receipt and reference for the season’s books.", rows: [["Receipt", "Kept"], ["Reference", "Saved"]] },
];

const audiences: { key: string; label: string; icon: typeof Sprout; title: string; copy: string; services: ServiceKey[] }[] = [
  { key: "growers", label: "Growers", icon: Sprout, title: "For the people working the land.", copy: "Send money across Pakistan and get to know bill payments around the rhythms of everyday work.", services: ["transfer", "bills"] },
  { key: "households", label: "Rural households", icon: Users, title: "For the family at home.", copy: "Cash access through Micro ATM devices at participating retailers, with someone there to help.", services: ["atm", "bills"] },
  { key: "traders", label: "Local traders", icon: Tractor, title: "For small traders and rural enterprises.", copy: "Raast QR for participating merchants, and cash collection arrangements subject to confirmation.", services: ["qr", "cash"] },
];

const agriStats = [
  { value: 3, suffix: "", title: ["Journeys for", "rural communities"], copy: "Rural payments, local cash access, and trade & collections." },
  { value: 5, suffix: "", title: ["Retail formats", "in the network plan"], copy: "Kiryana stores, recharge and mobile shops, pharmacies, utility shops and small franchises." },
  { value: 2, suffix: "", title: ["Ways to", "bank"], copy: "Digital on your phone, or assisted at a participating neighbourhood counter." },
  { value: 0, suffix: "", title: ["Credentials asked", "on this website"], copy: "No PINs, passwords, one-time codes or account numbers." },
];

export function AgriPage() {
  const { openDialog, scrollToSection, navigate } = useSite();
  const start = { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) };
  return (
    <>
      <div>
        <PageHero eyebrow={s.eyebrow} title={s.title} description={s.description} actions={[start, { label: "See how it works", onClick: () => scrollToSection("agri-steps") }]} />
        <Sheet tone="white" id="agri-steps" labelledBy="agri-steps-title" className="pt-[100px] pb-[100px] min-[810px]:pt-[160px] min-[810px]:pb-[160px]">
          <CenterHead id="agri-steps-title" title={<>Built for how money<br />moves beyond the field</>} lead="Payments for growers, rural households and local enterprises. Four steps, the same every time." />
          <Container className="mt-14 min-[810px]:mt-20">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((st, i) => (
                <Appear key={st.title} as="li" delay={i * 0.06} y={24} className="flex flex-col rounded-[var(--radius-card)] bg-paper p-6">
                  <p className="text-[14px] font-medium text-seg-ink">{st.n}</p>
                  <h3 className="mt-2 text-[22px] leading-[1.05] font-medium">{st.title}</h3>
                  <p className="mt-2 font-ui text-[15px] leading-[1.2] text-muted-ink">{st.copy}</p>
                  <div aria-hidden="true" className="mt-6 rounded-xl bg-card p-3 text-[12px] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.4)]">
                    {st.rows.map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between border-b border-line py-2 last:border-0">
                        <span className="text-muted-ink">{k}</span>
                        <span className="flex items-center gap-1 font-medium">
                          {v} <CircleCheck className="size-3.5 text-seg-ink" strokeWidth={2} />
                        </span>
                      </div>
                    ))}
                  </div>
                </Appear>
              ))}
            </ol>
          </Container>
        </Sheet>
      </div>

      <Sheet tone="paper" className="-mt-8" roundBottom={false}>
        <Split
          id={payments.id}
          eyebrow={payments.nav}
          title={payments.title}
          copy={payments.copy}
          points={payments.points}
          extra={<RailLogos items={["1link", "raast"]} className="mt-8" />}
          actions={[
            { label: "Money transfers", onClick: () => openDialog({ type: "service", key: "transfer" }) },
            { label: "Bill payments", onClick: () => openDialog({ type: "service", key: "bills" }) },
          ]}
          visual={
            <div className="relative">
              <Photo src={s.image} alt={s.alt} position="50% 35%" className="aspect-[4/3]" />
              <GlassCard title="Send across Pakistan" sub="Interbank transfer through 1LINK" rows={[["Recipient", "Name checked"], ["Amount", "Reviewed"]]} icon={ArrowLeftRight} className="absolute -bottom-6 left-4" />
            </div>
          }
        />
      </Sheet>

      <section aria-labelledby="agri-principle-title" data-theme="dark" className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <div className="relative h-[320px] min-[810px]:h-[460px]" aria-hidden="true">
          <div className="absolute inset-0" style={{ background: "radial-gradient(40% 60% at 50% 100%, color-mix(in srgb, var(--seg) 45%, transparent), transparent 75%)" }} />
          <ParticleSphere className="absolute inset-x-0 bottom-0 mx-auto h-full w-[min(900px,100%)]" colorVar="--seg" count={1400} dashes speed={0.06} />
        </div>
        <Container className="pb-[100px] text-center min-[810px]:pb-[160px]">
          <Appear y={30}>
            <p className="font-num text-[20px] tracking-[0.02em] text-white/60">Principle</p>
            <h2 id="agri-principle-title" className={cn(H2_XL, "mx-auto mt-4 max-w-[900px]")}>
              Charges confirmed
              <br />
              before you pay.
            </h2>
            <p className={cn(LEAD, "mx-auto mt-6 max-w-[560px] text-white/70")}>A verified schedule of charges isn’t published on this website, so PayKaro doesn’t quote fees here. Confirm charges for the service you want before you authorise it.</p>
            <ArrowAction className="mt-8 text-white" onClick={() => openDialog({ type: "info", key: "fees" })}>
              Fees and eligibility
            </ArrowAction>
          </Appear>
        </Container>
      </section>

      <Sheet tone="white" className="-mt-8" roundBottom={false}>
        <Split
          id={cashJ.id}
          reverse
          eyebrow={cashJ.nav}
          title={cashJ.title}
          copy={cashJ.copy}
          points={cashJ.points}
          actions={[{ label: "Micro ATM services", onClick: () => openDialog({ type: "service", key: "atm" }) }]}
          visual={
            <div className="relative">
              <Photo src="/images/business.webp" alt="A neighbourhood retailer at his shop counter" position="30% 45%" className="aspect-[4/3]" tint />
              <GlassCard title="Micro ATM" sub="Biometric verification" rows={[["Location", "Participating retailer"], ["Account", "Supported type"]]} icon={Fingerprint} className="absolute -bottom-6 right-4" />
            </div>
          }
        />
        <Split
          id={trade.id}
          eyebrow={trade.nav}
          title={trade.title}
          copy={trade.copy}
          points={trade.points}
          extra={<RailLogos items={["raast"]} className="mt-8" label="Raast QR for participating merchants" />}
          actions={[
            { label: "Raast QR payments", onClick: () => openDialog({ type: "service", key: "qr" }) },
            { label: "Cash collection", onClick: () => openDialog({ type: "service", key: "cash" }) },
          ]}
          visual={
            <div className="relative">
              <Photo src={s.photo.image} alt={s.photo.alt} position={s.photo.position} className="aspect-[4/3]" />
              <GlassCard title="Raast QR" sub="Confirm the merchant" rows={[["Merchant", "Check the name"], ["Result", "Before you leave"]]} icon={QrCode} className="absolute -bottom-6 left-4" />
            </div>
          }
        />
      </Sheet>

      <AudienceTabs />

      <AgriStats />

      <FinalCta
        id="agri-cta"
        title={["Progress, from", "the ground up."]}
        copy="Payments, cash access and collection services for growers, rural households and local traders."
        actions={[start, { label: "Assisted services", onClick: () => navigate("assisted") }]}
      />
    </>
  );
}

function AudienceTabs() {
  const { openDialog } = useSite();
  const [tab, setTab] = useState(0);
  const a = audiences[tab];
  return (
    <Sheet tone="paper" roundTop={false} labelledBy="agri-gives-title" className="py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="agri-gives-title" title={<>What PayKaro Agri<br />gives you</>} lead="Reach, cash and trade services in one place, around the way rural Pakistan works." />
      <div role="tablist" aria-label="Who it’s for" className="mt-12 flex flex-wrap justify-center gap-2 px-4">
        {audiences.map((x, i) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            id={`agri-tab-${i}`}
            aria-selected={tab === i}
            aria-controls="agri-tabpanel"
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setTab(n);
                document.getElementById(`agri-tab-${n}`)?.focus();
              }
            }}
            className={cn("h-10 rounded-full border px-5 font-ui text-[15px] transition-colors duration-300", tab === i ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40")}
          >
            {x.label}
          </button>
        ))}
      </div>
      <Container className="mt-12 max-w-[1100px]">
        <div id="agri-tabpanel" role="tabpanel" aria-labelledby={`agri-tab-${tab}`} className="overflow-hidden rounded-[var(--radius-card)] bg-card">
          <AnimatePresence mode="wait">
            <motion.div key={a.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={SPRING} className="grid gap-8 p-7 min-[810px]:grid-cols-[1fr_1fr] min-[810px]:p-12">
              <div>
                <a.icon className="size-7 text-seg-ink" strokeWidth={1.5} aria-hidden="true" />
                <h3 className={cn(H2_LG, "mt-8 text-[32px] min-[810px]:text-[44px]")}>{a.title}</h3>
                <p className={cn(LEAD, "mt-5")}>{a.copy}</p>
              </div>
              <ul className="self-end rounded-2xl bg-paper p-3">
                {a.services.map((k) => {
                  const Icon = serviceIcons[k];
                  return (
                    <li key={k}>
                      <button type="button" onClick={() => openDialog({ type: "service", key: k })} className="flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-card">
                        <span className="flex size-11 items-center justify-center rounded-full" style={{ background: "var(--seg-grad)" }}>
                          <Icon className="size-4 text-[#171717]" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[17px] font-medium">{services[k].short}</span>
                          <span className="block text-[14px] text-muted-ink">{services[k].tag}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Sheet>
  );
}

function AgriStats() {
  const ref = useRef<HTMLElement>(null);
  const scale = useSectionZoom(ref);
  return (
    <section ref={ref} data-theme="dark" aria-labelledby="agri-stats-title" className="relative overflow-clip bg-black text-white">
      <motion.div className="absolute inset-0" style={scale ? { scale } : undefined} aria-hidden="true">
        <Image src="/images/agri.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.35]" style={{ objectPosition: "80% 60%" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
      </motion.div>
      <div className="relative">
        <Appear className="px-4 pt-[100px] pb-16 text-center min-[810px]:pt-[200px] min-[810px]:pb-[100px]">
          <h2 id="agri-stats-title" className="text-[48px] leading-[0.85] font-medium tracking-[-0.02em] min-[810px]:text-[100px]">
            Everything here
            <br />
            is verifiable
          </h2>
          <p className="mx-auto mt-8 max-w-[520px] text-[16px] leading-[1.25] text-white/75 min-[810px]:text-[18px]">Counted from this website, not from targets or projections.</p>
        </Appear>
        <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {agriStats.map((st, i) => (
            <div key={st.copy} className={cn("border-b border-white/10 px-6 py-12 lg:min-h-[420px] lg:px-11", i > 0 && "lg:border-l", "lg:flex lg:flex-col lg:justify-end")}>
              <Appear y={20}>
                <p className="text-grad font-num text-[80px] leading-[0.9] tracking-[-0.03em] min-[810px]:text-[98px]">
                  <Counter value={st.value} />
                  {st.suffix}
                </p>
                <h3 className="mt-6 text-[18px] leading-[1.05] font-medium">
                  {st.title[0]}
                  <br />
                  {st.title[1]}
                </h3>
                <p className="mt-3 max-w-[260px] text-[15px] leading-[1.15] font-light text-white/70">{st.copy}</p>
              </Appear>
            </div>
          ))}
        </div>
        <RailLogos items={["1link", "raast"]} label="Payment rails" dark className="justify-center py-10" />
      </div>
    </section>
  );
}
