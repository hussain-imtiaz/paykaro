"use client";

import Image from "next/image";
import { Compass, Target, UserRound } from "lucide-react";
import { benchmark, digbex, fiveQuestions } from "@/lib/sections-content";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { board, chairman, company, isPlaceholder, leadership, type Copy, type Person } from "@/lib/about-content";
import { SEGMENT_KEYS, SERVICE_ORDER, segments, services } from "@/lib/content";
import { ABOUT_KEYS, aboutPages, type AboutKey } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, FinalCta, H2_LG, LEAD, Sheet } from "./blocks";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { DesktopNav } from "./nav";
import { ArrowAction, Container, icons, RouteLink, serviceIcons } from "./primitives";
import { useSite } from "./site-context";

/** Renders real copy as-is, and a placeholder as a dashed, labelled box that can’t pass for content. */
export function Text({ copy, className, as: Tag = "p", dark }: { copy: Copy; className?: string; as?: "p" | "span" | "h3"; dark?: boolean }) {
  if (!isPlaceholder(copy)) return <Tag className={className}>{copy}</Tag>;
  return (
    <Tag
      className={cn(
        "rounded-lg border border-dashed px-3 py-2",
        dark ? "border-white/35 bg-white/[0.04] text-white/70" : "border-ink/30 bg-[repeating-linear-gradient(135deg,transparent_0_8px,rgba(0,0,0,0.025)_8px_16px)] text-muted-ink",
        className,
      )}
      data-placeholder={copy.field}
    >
      <span className={cn("mr-2 inline-block rounded-full px-2 py-0.5 align-middle font-ui text-[11px] font-bold tracking-[0.04em] uppercase", dark ? "bg-white/15 text-white" : "bg-ink text-paper")}>
        To be supplied
      </span>
      <span className="align-middle">
        <span className="font-medium">{copy.field}.</span> {copy.hint}
      </span>
    </Tag>
  );
}

function PortraitPlaceholder({ label, className, dark }: { label: string; className?: string; dark?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${label}: photo to be supplied`}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed",
        dark ? "border-white/30 bg-white/[0.04] text-white/60" : "border-ink/25 bg-paper text-faint-ink",
        className,
      )}
    >
      <UserRound className="size-14" strokeWidth={1} aria-hidden="true" />
      <span className="font-ui text-[12px] font-bold tracking-[0.04em] uppercase">Photo to be supplied</span>
    </div>
  );
}

function PersonCard({ person, index, group }: { person: Person; index: number; group: string }) {
  const label = isPlaceholder(person.name) ? `${group} ${index + 1}` : person.name;
  return (
    <Appear as="li" delay={(index % 3) * 0.06} y={30} className="flex flex-col">
      {person.photo ? (
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-night">
          <Image src={person.photo} alt={typeof person.name === "string" ? person.name : ""} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <PortraitPlaceholder label={label} className="aspect-[4/5]" />
      )}
      <div className="mt-5 space-y-2">
        <Text copy={person.name} as="h3" className="text-[20px] leading-[1.1] font-medium" />
        <Text copy={person.role} className="text-[15px] text-muted-ink" />
        <Text copy={person.bio} className="text-[14px] leading-[1.3] text-muted-ink" />
      </div>
    </Appear>
  );
}

function AboutCrossLinks({ current }: { current: AboutKey }) {
  return (
    <nav aria-label="About Us pages" className="flex flex-wrap justify-center gap-2 px-4">
      {ABOUT_KEYS.map((k) => (
        <RouteLink
          key={k}
          to={{ kind: "about", key: k }}
          aria-current={k === current ? "page" : undefined}
          className={cn("flex h-10 items-center rounded-full border px-5 font-ui text-[15px] transition-colors", k === current ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40")}
        >
          {aboutPages[k].menuLabel}
        </RouteLink>
      ))}
    </nav>
  );
}

export function CompanyPage() {
  const { go, openDialog } = useSite();
  return (
    <>
      <div>
        <PageHero
          eyebrow="About PayKaro"
          title={["Built for", "Pakistan. To a", "world standard."]}
          description="PayKaro is a digital financial experience for individuals, businesses and partners: immediate, understandable, self-service and human."
          actions={[
            { label: "Leadership & Board", onClick: () => go({ kind: "about", key: "leadership" }) },
            { label: "Chairman’s message", onClick: () => go({ kind: "about", key: "chairmans-message" }) },
          ]}
        />
        <Sheet tone="paper" roundTop roundBottom labelledBy="company-core-title" className="py-[60px] min-[810px]:py-[100px]">
          <h2 id="company-core-title" className="sr-only">
            What PayKaro is and promises
          </h2>
          <Container className="grid gap-4 lg:grid-cols-2">
            {[
              { icon: Compass, title: "What PayKaro is", copy: company.proposition },
              { icon: Target, title: "Our promise", copy: company.promise },
            ].map((c, i) => (
              <Appear key={c.title} delay={i * 0.06} className="flex min-h-[320px] flex-col rounded-[var(--radius-card)] bg-card p-7 min-[810px]:p-10">
                <span className="flex size-10 items-center justify-center rounded-full bg-paper">
                  <c.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-auto pt-12 text-[28px] leading-none font-medium">{c.title}</h3>
                <Text copy={c.copy} className="mt-4 max-w-[440px] text-[16px] leading-[1.25]" />
              </Appear>
            ))}
          </Container>
        </Sheet>
      </div>

      <Sheet tone="white" roundTop={false} labelledBy="company-name-title" className="-mt-8 pt-8">
        <Container className="max-w-[820px] space-y-14 py-[80px] min-[810px]:py-[120px]">
          <Appear>
            <h2 id="company-name-title" className="text-[24px] font-medium">
              The name
            </h2>
            <div className="mt-5 flex items-center gap-4">
              <PaykaroLogo decorative className="w-[72px] shrink-0" />
              <p className={LEAD}>{company.nameFact}</p>
            </div>
            <Text copy={company.nameStory} className="mt-4 text-[16px]" />
          </Appear>
          <Appear>
            <h3 className="text-[24px] font-medium">Everyday money, without the friction</h3>
            <p className="mt-4 text-[16px] leading-[1.45] text-muted-ink">{company.everyday}</p>
          </Appear>
          <Appear>
            <h3 className="text-[24px] font-medium">Our character</h3>
            <p className="mt-4 text-[16px] leading-[1.45] text-muted-ink">{company.character}</p>
          </Appear>
          <Appear>
            <h3 className="text-[24px] font-medium">Local relevance</h3>
            <p className="mt-4 text-[16px] leading-[1.45] text-muted-ink">{company.local}</p>
          </Appear>
          <Appear>
            <h3 className="text-[24px] font-medium">How PayKaro is funded</h3>
            <p className="mt-4 text-[16px] leading-[1.45] text-muted-ink">Core consumer money movement should not be monetised through friction. The broader ecosystem funds the model.</p>
            <ArrowAction className="mt-4" onClick={() => go({ kind: "page", key: "trust" }, "how-we-earn")}>
              The eight parts of that ecosystem
            </ArrowAction>
          </Appear>
        </Container>
      </Sheet>

      <section aria-labelledby="company-segments-title" data-theme="dark" className="relative -mt-8 overflow-hidden rounded-t-[var(--radius-sheet)] bg-night text-white">
        <CenterHead id="company-segments-title" dark className="pt-[100px] min-[810px]:pt-[160px]" title={<>Three pathways.<br />One PayKaro.</>} lead="Clear routes for individuals, businesses and merchants, and partners and institutions." />
        <Container className="mt-14 pb-[100px] min-[810px]:mt-20 min-[810px]:pb-[160px]">
          <ul className="grid gap-3 lg:grid-cols-3">
            {SEGMENT_KEYS.map((k, i) => (
              <Appear key={k} as="li" delay={i * 0.05} y={24}>
                <RouteLink to={{ kind: "segment", key: k }} data-seg={k} className="group flex h-full min-h-[260px] flex-col rounded-[var(--radius-card)] border border-white/10 bg-[#1f1f1f] p-6 transition-colors hover:border-white/30">
                  <PaykaroLogo decorative className="w-[52px]" />
                  <p className="mt-auto pt-10 text-[24px] leading-none font-medium">{segments[k].pathway}</p>
                  <p className="mt-2 font-ui text-[14px] leading-[1.25] text-white/65">{segments[k].cardDescription}</p>
                  <span className="mt-4 h-[3px] w-10 rounded-full bg-seg transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </RouteLink>
              </Appear>
            ))}
          </ul>
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="text-[28px] leading-[1.05] font-medium">The PayKaro universe</h3>
              <p className="mt-4 max-w-[380px] text-[15px] leading-[1.3] text-white/65">Sixteen services. Availability, eligibility and terms aren’t published on this website yet.</p>
            </div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {SERVICE_ORDER.map((k) => {
                const Icon = serviceIcons[k];
                return (
                  <li key={k} className="border-b border-white/10">
                    <button type="button" onClick={() => openDialog({ type: "service", key: k })} className="flex w-full items-center gap-4 py-4 text-left hover:text-seg-bright">
                      <Icon className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      <span className="text-[16px]">
                        {services[k].name}
                        {services[k].optional && <span className="ml-2 rounded-full border border-white/30 px-2 py-0.5 text-[11px] tracking-[0.04em] uppercase">Optional</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <Sheet tone="white" labelledBy="company-team-title" className="-mt-8 py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="company-team-title" title={<>Meet the team<br />behind PayKaro</>} lead="Names, photos and biographies will appear here once PayKaro supplies them." />
        <Container className="mt-14 min-[810px]:mt-20">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p, i) => (
              <PersonCard key={i} person={p} index={i} group="Leader" />
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <Actions actions={[{ label: "Leadership & Board Members", onClick: () => go({ kind: "about", key: "leadership" }) }]} />
          </div>
        </Container>
      </Sheet>

      <section aria-labelledby="company-details-title" className="bg-paper py-[100px] min-[810px]:py-[140px]">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Appear>
            <h2 id="company-details-title" className={H2_LG}>
              Company
              <br />
              information
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[400px]")}>Legal and contact details are published only once PayKaro confirms them. Nothing here is inferred.</p>
          </Appear>
          <dl className="border-t border-line">
            {company.details.map((d) => (
              <div key={d.label} className="grid gap-2 border-b border-line py-5 min-[810px]:grid-cols-[220px_1fr]">
                <dt className="text-[15px] font-medium">{d.label}</dt>
                <dd>
                  <Text copy={d.value} className="text-[15px]" />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-paper pb-[100px]">
        <AboutCrossLinks current="company" />
      </section>
    </>
  );
}

export function ChairmanPage() {
  const { go } = useSite();
  return (
    <>
      <section aria-labelledby="chairman-title" data-theme="dark" className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <DesktopNav />
        <div className="h-[68px] lg:hidden" />
        <Container className="pt-16 pb-[80px] min-[810px]:pt-[90px] min-[810px]:pb-[140px]">
          <Appear y={40}>
            <p className="font-display text-[14px] font-medium tracking-[0.06em] text-white/60 uppercase">About Us</p>
            <h1 id="chairman-title" className="mt-4 text-[64px] leading-[0.9] font-medium tracking-[-0.02em] min-[810px]:text-[140px]">
              Chairman’s
              <br />
              message
            </h1>
          </Appear>
          <div className="mt-14 grid gap-8 min-[810px]:mt-20 lg:grid-cols-[1fr_2fr]">
            <div />
            <div>
              <Text copy={chairman.intro} dark className="text-[28px] leading-[1.15] font-medium min-[810px]:text-[40px]" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="The message" data-theme="dark" className="bg-[#0b0b0b] text-white">
        <Container className="grid gap-12 pb-[100px] min-[810px]:pb-[160px] lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-[100px] lg:self-start">
            <p className="font-display text-[28px] leading-none font-semibold tracking-[0.02em] uppercase min-[810px]:text-[34px]">The message</p>
            <PortraitPlaceholder label="Chairman" dark className="mt-8 aspect-[4/5] max-w-[320px]" />
            <div className="mt-5 max-w-[320px] space-y-2">
              <Text copy={chairman.name} dark className="text-[16px] font-medium" />
              <Text copy={chairman.title} dark className="text-[14px]" />
            </div>
          </div>
          <div className="border-t border-white/12">
            {chairman.body.map((p, i) => (
              <Appear key={i} y={24} className="border-b border-white/12 py-10">
                <p className="font-display text-[12px] font-medium tracking-[0.08em] text-white/50 uppercase">{String(i + 1).padStart(2, "0")}</p>
                <Text copy={p} dark className="mt-4 text-[18px] leading-[1.45] min-[810px]:text-[20px]" />
              </Appear>
            ))}
            <Appear y={24} className="py-10">
              <Text copy={chairman.signOff} dark className="text-[16px]" />
              <ArrowAction className="mt-10 text-white" onClick={() => go({ kind: "about", key: "leadership" })}>
                Leadership & Board Members
              </ArrowAction>
            </Appear>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-[80px]">
        <AboutCrossLinks current="chairmans-message" />
      </section>
    </>
  );
}

export function LeadershipPage() {
  const { go, openDialog } = useSite();
  return (
    <>
      <div>
        <PageHero
          eyebrow="About Us"
          title={["Leadership &", "Board Members"]}
          description="The people who lead PayKaro and oversee its direction. Names, roles and biographies are published once PayKaro confirms them."
          actions={[
            { label: "Chairman’s message", onClick: () => go({ kind: "about", key: "chairmans-message" }) },
            { label: "Company", onClick: () => go({ kind: "about", key: "company" }) },
          ]}
        />
        <Sheet tone="white" id="leadership-team" labelledBy="leadership-team-title" className="py-[100px] min-[810px]:py-[160px]">
          <CenterHead id="leadership-team-title" title={<>Leadership<br />team</>} lead="The executives responsible for PayKaro’s day-to-day direction." />
          <Container className="mt-14 min-[810px]:mt-20">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((p, i) => (
                <PersonCard key={i} person={p} index={i} group="Leader" />
              ))}
            </ul>
          </Container>
        </Sheet>
      </div>

      <Sheet tone="paper" id="board" labelledBy="board-title" className="-mt-8 py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="board-title" title={<>Board of<br />Directors</>} lead="The board members who oversee PayKaro’s governance." />
        <Container className="mt-14 min-[810px]:mt-20">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {board.map((p, i) => (
              <PersonCard key={i} person={p} index={i} group="Board member" />
            ))}
          </ul>
        </Container>
      </Sheet>

      <FinalCta
        id="leadership-cta"
        title={["Built for Pakistan.", "To a world standard."]}
        copy="Explore PayKaro for individuals, businesses and merchants, and partners and institutions."
        actions={[
          { label: "Get PayKaro", onClick: () => openDialog({ type: "info", key: "getpaykaro" }) },
          { label: "Company", onClick: () => go({ kind: "about", key: "company" }) },
        ]}
      />
      <section className="bg-paper py-[80px]">
        <AboutCrossLinks current="leadership" />
      </section>
    </>
  );
}

/** DIGBEX (brief s4), benchmark disciplines (s8), design direction (s7) and the five-question test (s11). */
export function DigbexPage() {
  const { go } = useSite();
  return (
    <>
      <div>
        <PageHero
          eyebrow="Our approach"
          title={["DIGBEX: designed", "from your intent", "backwards."]}
          description="DIGBEX, Digital Banking Experience, is PayKaro’s governing customer-experience philosophy. The website explains it; the app is built on it."
          actions={[
            { label: "See it in the app", onClick: () => go({ kind: "page", key: "app" }) },
            { label: "Company", onClick: () => go({ kind: "about", key: "company" }) },
          ]}
        />
        <Sheet tone="white" labelledBy="digbex-principles-title" className="py-[100px] min-[810px]:py-[160px]">
          <CenterHead id="digbex-principles-title" title={<>Ten principles.<br />One experience.</>} lead="Design from what the customer wants to do, not from the product catalogue forward." />
          <Container className="mt-14 min-[810px]:mt-20">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {digbex.map((p, i) => {
                const Icon = icons[p.icon];
                return (
                  <Appear key={p.title} as="li" delay={(i % 5) * 0.04} y={20} className="flex min-h-[280px] flex-col rounded-[var(--radius-card)] bg-paper p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-full bg-card">
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="font-num text-[28px] leading-none text-faint-ink">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-auto pt-10 text-[20px] leading-[1.1] font-medium">{p.title}</h3>
                    <p className="mt-2 font-ui text-[14px] leading-[1.3] text-muted-ink">{p.copy}</p>
                  </Appear>
                );
              })}
            </ol>
          </Container>
        </Sheet>
      </div>

      <section aria-labelledby="benchmark-title" data-theme="dark" className="relative z-10 -mt-8 rounded-[var(--radius-sheet)] bg-night text-white">
        <Container className="py-[100px] min-[810px]:py-[160px]">
          <Appear y={24} className="max-w-[900px]">
            <p className="font-num text-[20px] tracking-[0.02em] text-white/60">Winning the phone</p>
            <h2 id="benchmark-title" className="mt-4 text-[44px] leading-[0.9] font-medium tracking-[-0.02em] min-[810px]:text-[80px]">
              The standard is the best app on your phone.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[620px] text-white/70")}>
              PayKaro is measured against the best digital financial apps people already use, not the average local banking app: immediate, intuitive, personal and dependable.
            </p>
          </Appear>
          <ol className="mt-14 border-t border-white/12 min-[810px]:mt-20">
            {benchmark.map((b, i) => (
              <Appear key={b.title} as="li" delay={0.03 * i} className="grid gap-3 border-b border-white/12 py-7 min-[810px]:grid-cols-[120px_1fr_1.2fr] min-[810px]:items-baseline">
                <span className="font-num text-[40px] leading-none text-seg-bright">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[26px] leading-[1.05] font-medium min-[810px]:text-[32px]">{b.title}</h3>
                <p className="max-w-[520px] text-[16px] leading-[1.35] text-white/70">{b.copy}</p>
              </Appear>
            ))}
          </ol>
        </Container>
      </section>

      <Sheet tone="paper" roundTop={false} labelledBy="design-title" className="-mt-8 pt-8">
        <Container className="py-[100px] min-[810px]:py-[140px]">
          <CenterHead id="design-title" scrub={false} title={<>One design language,<br />everywhere</>} lead="Website, app, English and Urdu share the same typography, spacing, iconography and motion." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Related everywhere", "Typography, spacing, iconography and motion feel related across website, app, English and Urdu."],
              ["Motion that means something", "Motion signals state, progress or completion. Nothing decorative that slows comprehension."],
              ["Original, Pakistani imagery", "Real Pakistani customers, merchants and contexts, not generic global stock."],
              ["Daylight and modest devices first", "Designed for daylight legibility, modest phones and real network conditions."],
              ["Premium through restraint", "Premium comes from restraint, clarity and craft, not visual density."],
            ].map(([t, c], i) => (
              <Appear key={t} as="li" delay={i * 0.04} className="rounded-[var(--radius-card)] bg-card p-6">
                <p className="font-num text-[18px] text-seg-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-[19px] leading-[1.1] font-medium">{t}</h3>
                <p className="mt-2 font-ui text-[14px] leading-[1.3] text-muted-ink">{c}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </Sheet>

      <section aria-labelledby="test-title" className="bg-card">
        <Container className="grid gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Appear y={24}>
            <p className="font-num text-[20px] tracking-[0.02em] text-muted-ink">The test</p>
            <h2 id="test-title" className={cn(H2_LG, "mt-4")}>
              Five questions every screen must pass
            </h2>
            <blockquote className="mt-8 max-w-[460px] border-l-2 border-seg pl-5 text-[17px] leading-[1.4] text-muted-ink">
              A customer who has used a leading international wallet should find nothing here that feels like a step down. A customer who has never used one should feel that PayKaro was built specifically for them.
            </blockquote>
          </Appear>
          <ol className="border-t border-line">
            {fiveQuestions.map((q, i) => (
              <Appear key={q} as="li" delay={i * 0.05} className="flex items-baseline gap-6 border-b border-line py-6">
                <span className="font-num text-[48px] leading-none text-seg-ink">{i + 1}</span>
                <p className="text-[22px] leading-[1.15] font-medium min-[810px]:text-[28px]">{q}</p>
              </Appear>
            ))}
          </ol>
        </Container>
      </section>

      <FinalCta
        id="digbex-cta"
        title={["See DIGBEX", "in the app."]}
        copy="Intent-led home screens, proof on every transaction, immediate controls, and every state designed, in concept."
        actions={[
          { label: "The App", onClick: () => go({ kind: "page", key: "app" }) },
          { label: "Security & Trust", onClick: () => go({ kind: "page", key: "trust" }) },
        ]}
      />
      <section className="bg-paper py-[80px]">
        <AboutCrossLinks current="digbex" />
      </section>
    </>
  );
}
