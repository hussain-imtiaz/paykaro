"use client";

import { BadgeCheck, CircleCheck, Globe, Handshake, KeyRound, Plug, ShoppingBag, Signpost, Users } from "lucide-react";
import { segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CenterHead, FinalCta, GlassCard, H2_LG, LEAD, Photo, Sheet, Split, TrustList } from "./blocks";
import { HomeToday } from "./app-concepts";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { Container } from "./primitives";
import { useSite } from "./site-context";

const s = segments.partners;
const [platform, disbursements, marketplace] = s.journeys;

const outcomes = [
  {
    title: "Embedded payments",
    copy: "Let approved businesses and institutions offer PayKaro payments inside their own experience.",
    ui: [
      ["Pay with PayKaro", "Selected"],
      ["Amount", "Shown"],
      ["Status", "Confirmed"],
    ],
  },
  {
    title: "Disbursements",
    copy: "Enabled services for billers, employers, businesses and institutions paying many people at once.",
    ui: [
      ["Recipients", "Clear list"],
      ["Each payment", "Status visible"],
      ["Proof", "For every recipient"],
    ],
  },
  {
    title: "Remittance partnerships",
    copy: "Eligible inward-remittance arrangements, with receipt into PayKaro Wallet, subject to applicable approvals.",
    ui: [
      ["Incoming", "On its way"],
      ["Received", "In wallet"],
      ["Recipient", "Notified"],
    ],
  },
] as const;

const buildWith = [
  { icon: Plug, title: "APIs / Platform Services", copy: services.platform.proposition },
  { icon: ShoppingBag, title: "PayKaro Marketplace", copy: services.marketplace.proposition },
  { icon: Globe, title: "Remittance partnerships", copy: "Contractual arrangements for eligible inward home remittances, subject to applicable approvals." },
  { icon: Handshake, title: "Partner distribution", copy: "Eligible partner products inside PayKaro, such as savings, investments and optional protection through regulated and licensed partners." },
];

export function PartnersPage() {
  const { openDialog, scrollToSection, go } = useSite();
  const talk = { label: "Partner with PayKaro", onClick: () => openDialog({ type: "info", key: "partners" }) };
  return (
    <>
      <div>
        <PageHero eyebrow={s.eyebrow} title={s.title} description={s.description} actions={[talk, { label: "What you can build", onClick: () => scrollToSection("build-with") }]} />
        <Sheet tone="white" id={platform.id} labelledBy="partners-outcomes-title" className="scroll-mt-0 py-[100px] min-[810px]:py-[160px]">
          <CenterHead id="partners-outcomes-title" title={<>Outcomes,<br />not architecture.</>} lead="What your customers and your organisation get from connecting with PayKaro. The plumbing stays out of the way." />
          <Container className="mt-14 grid gap-4 min-[810px]:mt-20 lg:grid-cols-3">
            {outcomes.map((o, i) => (
              <Appear key={o.title} delay={i * 0.05} y={20} className="flex flex-col rounded-[var(--radius-card)] bg-paper p-6 min-[810px]:p-8">
                <div aria-hidden="true" className="rounded-2xl bg-card p-4 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.45)]">
                  <p className="text-[11px] tracking-[0.04em] text-faint-ink uppercase">Concept</p>
                  <ul className="mt-2 divide-y divide-line text-[13px]">
                    {o.ui.map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between py-2">
                        <span className="text-muted-ink">{k}</span>
                        <span className="flex items-center gap-1 font-medium">
                          {v} <CircleCheck className="size-3.5 text-seg-ink" strokeWidth={2} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className="mt-8 text-[24px] leading-[1.05] font-medium">{o.title}</h3>
                <p className="mt-3 font-ui text-[15px] leading-[1.25] text-muted-ink">{o.copy}</p>
              </Appear>
            ))}
          </Container>
        </Sheet>
      </div>

      <section id="build-with" aria-labelledby="build-with-title" data-theme="dark" className="relative z-10 -mt-8 scroll-mt-0 rounded-[var(--radius-sheet)] bg-night text-white">
        <Container className="grid gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Appear y={24}>
            <h2 id="build-with-title" className={H2_LG}>
              What you can build
              <br />
              with PayKaro
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[420px] text-white/70")}>Four ways approved businesses and institutions work with PayKaro.</p>
          </Appear>
          <ul className="grid gap-3 sm:grid-cols-2">
            {buildWith.map((b, i) => (
              <Appear key={b.title} as="li" delay={i * 0.05} y={20} className="flex min-h-[240px] flex-col rounded-[var(--radius-card)] border border-white/10 bg-[#1f1f1f] p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                  <b.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-auto pt-10 text-[20px] leading-[1.1] font-medium">{b.title}</h3>
                <p className="mt-2 font-ui text-[14px] leading-[1.3] text-white/65">{b.copy}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </section>

      <Sheet tone="white" roundTop={false} className="-mt-8 pt-8" roundBottom={false}>
        <Split
          id={disbursements.id}
          eyebrow={disbursements.nav}
          title={disbursements.title}
          copy={disbursements.copy}
          points={["For billers, employers, businesses and institutions", "Every recipient sees what arrived and why", "Status and proof for each payment"]}
          actions={[talk]}
          visual={
            <div className="relative">
              <Photo src="/images/agri.webp" alt="A man standing in a green field reading his phone" position="50% 35%" className="aspect-[4/3]" />
              <GlassCard title="Payment received" sub="From an employer · reference included" rows={[["Status", "In your wallet"], ["Proof", "Saved"]]} icon={Users} className="absolute -bottom-6 left-4" />
            </div>
          }
        />
        <Split
          id={marketplace.id}
          reverse
          eyebrow={marketplace.nav}
          title={marketplace.title}
          copy={marketplace.copy}
          points={["Context, not banners", "Relevant to the customer’s current task", "The full catalogue stays discoverable"]}
          actions={[{ label: "PayKaro Marketplace", onClick: () => openDialog({ type: "service", key: "marketplace" }) }]}
          visual={
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-seg-soft">
              <HomeToday className="scale-[0.82] min-[810px]:scale-90" />
            </div>
          }
        />
      </Sheet>

      <section aria-labelledby="partners-control-title" className="bg-card">
        <Container className="grid gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-2">
          <Appear y={24}>
            <h2 id="partners-control-title" className={H2_LG}>
              Controlled,
              <br />
              by design.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[440px]")}>Connectivity is for approved businesses and institutions, and customers stay in control of what they share.</p>
          </Appear>
          <TrustList
            items={[
              { icon: BadgeCheck, title: "Approved partners only", copy: "Controlled connectivity and embedded payments are for approved businesses and institutions." },
              { icon: KeyRound, title: "Consent customers can see", copy: "Customers see which partners can access what, and can change it." },
              { icon: Signpost, title: "No dead ends for your customers", copy: "Clear status, plain-language errors and a recovery path in every journey." },
            ]}
          />
        </Container>
      </section>

      <FinalCta
        id="partners-cta"
        title={["Build what customers", "reach for."]}
        copy="An official partner-enquiry channel will be published here. Until then, read how PayKaro handles security, consent and trust."
        actions={[talk, { label: "Security & Trust", onClick: () => go({ kind: "page", key: "trust" }) }]}
      />
    </>
  );
}
