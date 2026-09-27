"use client";

import { CircleCheck, Eye, KeyRound, LockKeyhole, ShieldCheck, ToggleRight } from "lucide-react";
import { disclosures } from "@/lib/about-content";
import { commercialPhilosophy, revenueFamilies } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Text } from "./about";
import { CenterHead, FinalCta, GlassCard, H2_LG, H2_XL, LEAD, Photo, Sheet, Split } from "./blocks";
import { Phone } from "./app-concepts";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { Container } from "./primitives";
import { useSite } from "./site-context";

const moments = [
  { when: "Before", title: "What it will cost", rows: [["Amount", "Rs 5,000"], ["To", "Ammi"], ["Applicable fee", "Shown here"]] },
  { when: "During", title: "What is happening", rows: [["Status", "Processing"], ["Next update", "When it lands"]] },
  { when: "After", title: "What happened", rows: [["Status", "Completed"], ["Proof", "Ready to share"]] },
  { when: "Any time", title: "What you control", rows: [["Card", "Freeze or unfreeze"], ["Consent", "Review and change"]] },
] as const;

export function TrustPage() {
  const { go, scrollToSection } = useSite();
  const help = { label: "Get Help", onClick: () => go({ kind: "page", key: "help" }) };
  return (
    <>
      <div>
        <PageHero
          eyebrow="Security & Trust"
          title={["Trust through", "clarity."]}
          description="Privacy, consent, fees, status and proof of every transaction, visible and understandable at the moment they matter."
          actions={[help, { label: "How PayKaro is funded", onClick: () => scrollToSection("how-we-earn") }]}
        />
        <Sheet tone="white" labelledBy="moments-title" className="py-[100px] min-[810px]:py-[160px]">
          <CenterHead id="moments-title" title={<>What you’ll always<br />be able to see</>} lead="Trust is designed, not explained. These are visible before, during and after every payment." />
          <Container className="mt-14 min-[810px]:mt-20">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {moments.map((m, i) => (
                <Appear key={m.when} as="li" delay={i * 0.05} y={20} className="flex flex-col rounded-[var(--radius-card)] bg-paper p-6">
                  <p className="text-[14px] font-medium text-seg-ink">{m.when}</p>
                  <h3 className="mt-2 text-[22px] leading-[1.05] font-medium">{m.title}</h3>
                  <div aria-hidden="true" className="mt-6 rounded-xl bg-card p-3 text-[12px] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.4)]">
                    {m.rows.map(([k, v]) => (
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
            <p className="mt-6 text-center text-[13px] text-faint-ink">Sample data. A schedule of charges isn’t published on this website yet.</p>
          </Container>
        </Sheet>
      </div>

      <Sheet tone="paper" className="-mt-8" roundBottom={false}>
        <Split
          id="security"
          eyebrow="Security"
          title={["Your details", "stay yours."]}
          copy="PayKaro will never ask for your PIN, password or one-time code on a call, a message or this website. The website doesn’t collect account numbers, CNICs or contact details."
          points={["Never share your PIN, password or one-time code", "Only use the official app and channels published here", "Card and security controls are yours to change, immediately"]}
          visual={
            <div className="relative">
              <Photo src="/images/personal.webp" alt="A father and his adult daughter looking at a phone together at home" position="60% 40%" className="aspect-[4/3]" />
              <GlassCard title="We’ll never ask for your PIN" sub="Not by call, message or website" icon={LockKeyhole} className="absolute -bottom-6 left-4" />
            </div>
          }
        />
        <Split
          id="privacy"
          reverse
          eyebrow="Privacy & consent"
          title={["Consent you can", "see and change."]}
          copy="Privacy, consent and partner access should be visible and understandable, and routine controls reversible wherever permitted. Information PayKaro already has shouldn’t be asked for again."
          points={["See what you’ve agreed to", "See which partners can access what", "Change it yourself"]}
          visual={
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-seg-soft">
              <Phone className="scale-[0.82] min-[810px]:scale-90" label="Concept">
                <p className="mt-6 text-[22px] leading-none font-medium">Privacy & consent</p>
                <ul className="mt-5 space-y-2 text-[12px]">
                  {[
                    ["Marketplace partner", "Access: on"],
                    ["Savings partner", "Access: off"],
                    ["Marketing messages", "Off"],
                    ["Data you’ve shared", "View"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between rounded-xl bg-[#f5f5f5] px-3 py-2.5">
                      <span className="font-medium">{k}</span>
                      <span className="text-black/55">{v}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto text-[11px] text-black/50">Changes take effect straight away.</p>
              </Phone>
            </div>
          }
        />
      </Sheet>

      <section id="how-we-earn" aria-labelledby="earn-title" data-theme="dark" className="relative scroll-mt-0 overflow-hidden bg-[#0b0b0b] text-white">
        <Container className="py-[100px] text-center min-[810px]:py-[160px]">
          <Appear y={24}>
            <p className="font-num text-[20px] tracking-[0.02em] text-white/60">How PayKaro is funded</p>
            <h2 id="earn-title" className={cn(H2_XL, "mx-auto mt-4 max-w-[1000px]")}>
              Money movement isn’t monetised through friction.
            </h2>
            <p className={cn(LEAD, "mx-auto mt-6 max-w-[600px] text-white/70")}>
              {commercialPhilosophy.line} {commercialPhilosophy.follow}
            </p>
          </Appear>
          <Appear y={30} className="mt-14 min-[810px]:mt-20">
            <RevenueRing />
          </Appear>
          <ul className="mx-auto mt-14 grid max-w-[1200px] gap-x-8 text-left sm:grid-cols-2 lg:grid-cols-4">
            {revenueFamilies.map((r, i) => (
              <Appear key={r.title} as="li" delay={(i % 4) * 0.04} className="border-t border-white/12 py-6">
                <p className="font-num text-[16px] text-seg-bright">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[18px] leading-[1.1] font-medium">{r.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.3] text-white/65">{r.copy}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </section>

      <section id="disclosures" aria-labelledby="disclosures-title" className="bg-paper py-[100px] min-[810px]:py-[140px]">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Appear>
            <h2 id="disclosures-title" className={H2_LG}>
              Regulatory status
              <br />& disclosures
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[400px]")}>What the brief confirms is stated here. Everything else is published once it is approved.</p>
          </Appear>
          <dl className="border-t border-line">
            {disclosures.map((d) => (
              <div key={d.label} className="grid gap-2 border-b border-line py-5 min-[810px]:grid-cols-[240px_1fr]">
                <dt className="text-[15px] font-medium">{d.label}</dt>
                <dd>
                  <Text copy={d.value} className="text-[15px]" />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="trust-principles-title" className="bg-card">
        <Container className="py-[80px] min-[810px]:py-[120px]">
          <h2 id="trust-principles-title" className="sr-only">
            Trust principles
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Eye, t: "Explainability", c: "Decisions and statuses are understandable, not opaque." },
              { icon: ToggleRight, t: "Customer control", c: "Routine controls are self-service, immediate and reversible where permitted." },
              { icon: KeyRound, t: "Never ask twice", c: "Information already known isn’t repeatedly requested." },
              { icon: ShieldCheck, t: "No dead ends", c: "Every error explains what happened and what you can do next." },
            ].map((p, i) => (
              <Appear key={p.t} as="li" delay={i * 0.05} className="rounded-[var(--radius-card)] bg-paper p-6">
                <p.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-8 text-[18px] font-medium">{p.t}</h3>
                <p className="mt-2 font-ui text-[14px] leading-[1.3] text-muted-ink">{p.c}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta
        id="trust-cta"
        title={["Something doesn’t", "look right?"]}
        copy="Don’t share your PIN, password or one-time code. Start from Get Help to find the right next step."
        actions={[help, { label: "How we design", onClick: () => go({ kind: "about", key: "digbex" }) }]}
      />
    </>
  );
}

/** The broader ecosystem around everyday money movement: eight revenue families in a ring (brief s3). */
function RevenueRing() {
  const n = revenueFamilies.length;
  const short = ["Treasury", "Cards", "Acceptance", "Remittance", "Disbursements", "Subscriptions", "Platform", "Distribution"];
  return (
    <figure className="mx-auto w-full max-w-[760px]">
      <svg viewBox="-130 -20 900 680" className="h-auto w-full" role="img" aria-labelledby="ring-title">
        <title id="ring-title">Everyday money movement at the centre, surrounded by the eight parts of the ecosystem that fund PayKaro</title>
        <defs>
          <radialGradient id="ring-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--seg)", stopOpacity: 0.55 }} />
            <stop offset="100%" style={{ stopColor: "var(--seg)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle cx="320" cy="320" r="250" fill="none" stroke="rgba(255,255,255,0.14)" strokeDasharray="2 8" />
        <circle cx="320" cy="320" r="170" fill="url(#ring-core)" />
        {short.map((label, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = 320 + Math.cos(a) * 250;
          const y = 320 + Math.sin(a) * 250;
          return (
            <g key={label}>
              <line x1={320 + Math.cos(a) * 118} y1={320 + Math.sin(a) * 118} x2={x - Math.cos(a) * 34} y2={y - Math.sin(a) * 34} stroke="rgba(255,255,255,0.18)" />
              <circle cx={x} cy={y} r="34" fill="#1f1f1f" stroke="rgba(255,255,255,0.18)" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fill="#fff" fontFamily="var(--font-oswald)">
                {String(i + 1).padStart(2, "0")}
              </text>
              <text x={320 + Math.cos(a) * 305} y={320 + Math.sin(a) * 305 + 7} textAnchor="middle" fontSize="21" fill="rgba(255,255,255,0.8)">
                {label}
              </text>
            </g>
          );
        })}
        <circle cx="320" cy="320" r="112" fill="#111" stroke="var(--seg)" strokeWidth="1.5" />
        <text x="320" y="304" textAnchor="middle" fontSize="23" fill="#fff" fontWeight="500">
          Everyday money
        </text>
        <text x="320" y="332" textAnchor="middle" fontSize="23" fill="#fff" fontWeight="500">
          movement
        </text>
        <text x="320" y="360" textAnchor="middle" fontSize="15" fill="rgba(255,255,255,0.65)">
          not monetised through friction
        </text>
      </svg>
    </figure>
  );
}
