"use client";

import { ArrowLeftRight, Banknote, HeartHandshake, ReceiptText, ShieldCheck } from "lucide-react";
import { segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CenterHead, FinalCta, GlassCard, H2_XL, LEAD, Photo, PhoneConcept, RailLogos, Sheet, Split } from "./blocks";
import { PageHero } from "./hero";
import { Appear, ScrubHeadline } from "./motion";
import { ParticleSphere } from "./particle-sphere";
import { PartnerLogo } from "./partner-logo";
import { ArrowAction, Container } from "./primitives";
import { useSite } from "./site-context";

const s = segments.family;
const [bills, home, cash] = s.journeys;

export function FamilyPage() {
  const { openDialog, scrollToSection, navigate } = useSite();
  const start = { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) };
  return (
    <>
      <div>
        <PageHero eyebrow={s.eyebrow} title={s.title} description={s.description} actions={[start, { label: "Household bills", onClick: () => scrollToSection(bills.id) }]} />
        <Sheet tone="white" labelledBy="family-intro-title" className="pt-[100px] pb-[80px] min-[810px]:pt-[160px] min-[810px]:pb-[140px]">
          <CenterHead id="family-intro-title" title={<>Everything a<br />household needs.</>} lead="Household bills, money for loved ones and cash for the everyday. Three things, done properly, in one place." />
          <Container className="mt-14 grid gap-4 min-[810px]:mt-20 lg:grid-cols-[1.25fr_1fr]">
            <Appear className="grid gap-8 rounded-[var(--radius-card)] bg-paper p-7 min-[810px]:grid-cols-[1fr_300px] min-[810px]:p-10">
              <div className="flex flex-col">
                <h3 className="text-[28px] leading-[1.05] font-medium">
                  Household bills,
                  <br />
                  checked properly.
                </h3>
                <p className="mt-4 max-w-[320px] font-ui text-[16px] leading-[1.2] text-muted-ink">{services.bills.description}</p>
                <div className="mt-auto flex items-center gap-3 pt-10">
                  <PartnerLogo partner="1link" chip className="h-14" />
                  <PartnerLogo partner="raast" chip className="h-14" />
                </div>
              </div>
              <div aria-hidden="true" className="rounded-2xl bg-card p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
                <p className="text-[12px] text-faint-ink">Before you pay · concept</p>
                <p className="mt-1 text-[20px] font-medium">Utility bill</p>
                <div className="mt-4 divide-y divide-line text-[13px]">
                  {[
                    ["Biller", "Check the name"],
                    ["Consumer reference", "Match your bill"],
                    ["Amount due", "Check the figure"],
                    ["Receipt", "Keep it safe"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2.5">
                      <span className="text-muted-ink">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <span className="mt-4 flex h-10 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">Check and pay</span>
              </div>
            </Appear>
            <Appear delay={0.05} className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-card)]">
              <Photo src="/images/personal.webp" alt={s.photo.alt} position={s.photo.position} className="absolute inset-0 rounded-none" />
              <GlassCard title="Send money home" sub="Across Pakistan, through 1LINK" icon={ArrowLeftRight} className="absolute bottom-6 left-6" />
            </Appear>
            <Appear className="flex flex-col rounded-[var(--radius-card)] bg-seg-fill p-7 text-seg-on min-[810px]:p-10">
              <HeartHandshake className="size-6" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-10 text-[28px] leading-[1.05] font-medium">Money for the people who matter.</h3>
              <p className="mt-3 max-w-[420px] font-ui text-[16px] leading-[1.2] opacity-85">For a parent, a sibling or someone starting a new chapter. Confirm the recipient’s name and account first.</p>
            </Appear>
            <Appear delay={0.05} className="flex flex-col rounded-[var(--radius-card)] bg-paper p-7 min-[810px]:p-10">
              <Banknote className="size-6 text-seg-ink" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-10 text-[28px] leading-[1.05] font-medium">Everyday cash, close to home.</h3>
              <p className="mt-3 max-w-[420px] font-ui text-[16px] leading-[1.2] text-muted-ink">{services.atm.description}</p>
            </Appear>
          </Container>
        </Sheet>
      </div>

      <section aria-labelledby="family-sum-title" data-theme="dark" className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <Photo src="/images/personal.webp" alt="" position="75% 40%" className="absolute inset-0 rounded-none opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-night via-night/40 to-night" />
        </div>
        <ScrubHeadline className="relative px-4 py-[140px] text-center min-[810px]:py-[220px]">
          <h2 id="family-sum-title" className={cn(H2_XL, "mx-auto max-w-[1000px]")}>
            The monthly bills,
            <br />
            done properly.
          </h2>
          <p className={cn(LEAD, "mx-auto mt-6 max-w-[520px] text-white/75")}>{bills.copy}</p>
        </ScrubHeadline>
      </section>

      <Sheet tone="white" roundBottom={false} className="-mt-8">
        <Split
          id={bills.id}
          eyebrow={bills.nav}
          title={bills.title}
          copy={bills.copy}
          points={bills.points}
          actions={[{ label: "Bill payments", onClick: () => openDialog({ type: "service", key: "bills" }) }]}
          visual={<ConceptPanel image="/images/personal.webp" position="30% 45%"><PhoneConcept caption="Household bills" title="One less thing to do." rows={[{ label: "Biller", done: true }, { label: "Consumer reference", done: true }, { label: "Amount due" }]} cta="Check and pay" className="scale-[0.82]" /></ConceptPanel>}
        />
        <Split
          id={home.id}
          reverse
          eyebrow={home.nav}
          title={home.title}
          copy={home.copy}
          points={home.points}
          extra={<RailLogos items={["1link"]} className="mt-8" label="Domestic transfers through" />}
          actions={[{ label: "Money transfers", onClick: () => openDialog({ type: "service", key: "transfer" }) }]}
          visual={<ConceptPanel image="/images/personal.webp" position="60% 35%"><GlassCard title="Send money home" sub="Recipient’s name checked" rows={[["Recipient’s bank", "Confirmed"], ["Amount", "Reviewed"], ["Reference", "Kept"]]} icon={ArrowLeftRight} className="w-[300px]" /></ConceptPanel>}
        />
        <Split
          id={cash.id}
          eyebrow={cash.nav}
          title={cash.title}
          copy={cash.copy}
          points={cash.points}
          actions={[{ label: "Micro ATM services", onClick: () => openDialog({ type: "service", key: "atm" }) }]}
          visual={<ConceptPanel image="/images/business.webp" position="40% 45%"><GlassCard title="Cash access" sub="At a participating retailer" rows={[["Service", "Available here"], ["Charges", "Confirmed first"]]} icon={Banknote} className="w-[300px]" /></ConceptPanel>}
        />
      </Sheet>

      <section aria-labelledby="family-impact-title" data-theme="dark" className="relative overflow-hidden bg-[#070b12] text-white">
        <Container className="grid items-center gap-10 py-[100px] min-[810px]:py-[160px] lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Appear y={30}>
              <h2 id="family-impact-title" className={H2_XL}>
                Close to home.
                <br />
                Across Pakistan.
              </h2>
              <p className={cn(LEAD, "mt-6 max-w-[460px] text-white/70")}>Everyday services that help you stay connected to your family’s practical money needs.</p>
            </Appear>
            <ul className="mt-10 space-y-5">
              {[
                { icon: ReceiptText, t: "Household bills", c: "Through 1LINK / Raast", id: bills.id },
                { icon: ArrowLeftRight, t: "Send money home", c: "Interbank transfers through 1LINK", id: home.id },
                { icon: Banknote, t: "Everyday cash", c: "Micro ATM at participating retailers", id: cash.id },
                { icon: ShieldCheck, t: "Micro Takaful", c: "Planned. Not offered yet", id: undefined },
              ].map((it, i) => (
                <Appear key={it.t} as="li" delay={i * 0.05} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <it.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    {it.id ? (
                      <ArrowAction className="text-[18px] font-medium text-white" onClick={() => scrollToSection(it.id!)}>
                        {it.t}
                      </ArrowAction>
                    ) : (
                      <button type="button" className="text-left text-[18px] font-medium hover:text-seg-bright" onClick={() => openDialog({ type: "service", key: "takaful" })}>
                        {it.t}
                      </button>
                    )}
                    <p className="text-[14px] text-white/60">{it.c}</p>
                  </div>
                </Appear>
              ))}
            </ul>
          </div>
          <div className="relative h-[380px] min-[810px]:h-[600px]" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: "radial-gradient(45% 45% at 50% 55%, color-mix(in srgb, var(--seg) 45%, transparent), transparent 75%)" }} />
            <ParticleSphere className="absolute inset-0" colorVar="--seg" count={2200} speed={0.1} />
          </div>
        </Container>
      </section>

      <FinalCta
        id="family-cta"
        title={["Look after family", "from where your money", "already lives."]}
        copy="Household bills, transfers to loved ones and everyday cash access. Account opening isn’t available on this website yet."
        actions={[start, { label: "PayKaro Assisted", onClick: () => navigate("assisted") }]}
        visual={<PhoneConcept caption="Family" title="For the people you call home." rows={[{ label: "Household bills", done: true }, { label: "Send money home", done: true }, { label: "Everyday cash" }]} />}
      />
    </>
  );
}

function ConceptPanel({ image, position, children }: { image: string; position: string; children: React.ReactNode }) {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-seg-soft">
      <Photo src={image} alt="" position={position} className="absolute inset-0 rounded-none opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}