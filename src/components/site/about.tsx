"use client";

import Image from "next/image";
import { Compass, Target, UserRound } from "lucide-react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { board, chairman, company, isPlaceholder, leadership, type Copy, type Person } from "@/lib/about-content";
import { SEGMENT_KEYS, SERVICE_ORDER, segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, FinalCta, H2_LG, LEAD, Sheet } from "./blocks";
import { PageHero } from "./hero";
import { Appear, ScrollHighlight } from "./motion";
import { DesktopNav } from "./nav";
import { PartnerLogo } from "./partner-logo";
import { ArrowAction, Container, RouteLink, serviceIcons } from "./primitives";
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

function AboutCrossLinks({ current }: { current: "company" | "chairmans-message" | "leadership" }) {
  const links = [
    { key: "company", label: "Company" },
    { key: "chairmans-message", label: "Chairman’s Message" },
    { key: "leadership", label: "Leadership & Board Members" },
  ] as const;
  return (
    <nav aria-label="About Us pages" className="flex flex-wrap justify-center gap-2">
      {links.map((l) => (
        <RouteLink
          key={l.key}
          to={{ kind: "about", key: l.key }}
          aria-current={l.key === current ? "page" : undefined}
          className={cn("flex h-10 items-center rounded-full border px-5 font-ui text-[15px] transition-colors", l.key === current ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40")}
        >
          {l.label}
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
          title={["Banking and", "digital services", "for Pakistan."]}
          description="PayKaro brings domestic transfers, bill payments, Raast QR and assisted cash access closer to people, families, businesses and communities."
          actions={[
            { label: "Leadership & Board", onClick: () => go({ kind: "about", key: "leadership" }) },
            { label: "Chairman’s message", onClick: () => go({ kind: "about", key: "chairmans-message" }) },
          ]}
        />
        <Sheet tone="paper" roundTop roundBottom labelledBy="company-core-title" className="py-[60px] min-[810px]:py-[100px]">
          <h2 id="company-core-title" className="sr-only">
            Vision and mission
          </h2>
          <Container className="grid gap-4 lg:grid-cols-2">
            {[
              { icon: Compass, title: "Our vision", copy: company.vision },
              { icon: Target, title: "Our mission", copy: company.mission },
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
            <h3 className="text-[24px] font-medium">Why PayKaro exists</h3>
            <Text copy={company.why} className="mt-4 text-[16px]" />
          </Appear>
          <Appear>
            <h3 className="text-[24px] font-medium">The founding conviction</h3>
            <Text copy={company.conviction} className="mt-4 text-[16px]" />
          </Appear>
        </Container>
      </Sheet>

      <section aria-labelledby="company-segments-title" data-theme="dark" className="relative -mt-8 overflow-hidden rounded-t-[var(--radius-sheet)] bg-night text-white">
        <CenterHead id="company-segments-title" dark className="pt-[100px] min-[810px]:pt-[160px]" title={<>Five segments.<br />One PayKaro.</>} lead="PayKaro is organised around the people it serves, each with its own colour, journeys and services." />
        <Container className="mt-14 pb-[100px] min-[810px]:mt-20 min-[810px]:pb-[160px]">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SEGMENT_KEYS.map((k, i) => (
              <Appear key={k} as="li" delay={i * 0.05} y={24}>
                <RouteLink to={{ kind: "segment", key: k }} data-seg={k} className="group flex h-full min-h-[260px] flex-col rounded-[var(--radius-card)] border border-white/10 bg-[#1f1f1f] p-6 transition-colors hover:border-white/30">
                  <PaykaroLogo decorative className="w-[52px]" />
                  <p className="mt-auto pt-10 text-[24px] leading-none font-medium">{segments[k].label}</p>
                  <p className="mt-2 font-ui text-[14px] leading-[1.25] text-white/65">{segments[k].cardDescription}</p>
                  <span className="mt-4 h-[3px] w-10 rounded-full bg-seg transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </RouteLink>
              </Appear>
            ))}
          </ul>
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="text-[28px] leading-[1.05] font-medium">What PayKaro offers</h3>
              <p className="mt-4 max-w-[380px] text-[15px] leading-[1.3] text-white/65">The verified service portfolio. Availability, eligibility and charges are confirmed for each service.</p>
              <div className="mt-6 flex gap-3">
                <PartnerLogo partner="1link" chip className="h-14" />
                <PartnerLogo partner="raast" chip className="h-14" />
              </div>
            </div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {SERVICE_ORDER.map((k) => {
                const Icon = serviceIcons[k];
                return (
                  <li key={k} className="border-b border-white/10">
                    <button type="button" onClick={() => openDialog({ type: "service", key: k })} className="flex w-full items-center gap-4 py-4 text-left hover:text-seg-bright">
                      <Icon className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      <span className="text-[16px]">
                        {services[k].short}
                        {services[k].planned && <span className="ml-2 rounded-full border border-white/30 px-2 py-0.5 text-[11px] tracking-[0.04em] uppercase">Planned</span>}
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
  const introText = isPlaceholder(chairman.intro) ? `${chairman.intro.field}: ${chairman.intro.hint}` : chairman.intro;
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
              {isPlaceholder(chairman.intro) && (
                <p className="mb-4 inline-block rounded-full border border-dashed border-white/40 px-3 py-1 font-ui text-[11px] font-bold tracking-[0.04em] uppercase">To be supplied</p>
              )}
              <ScrollHighlight text={introText} className={cn("text-[28px] leading-[1.15] font-medium min-[810px]:text-[40px]", isPlaceholder(chairman.intro) && "text-white/90")} />
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
        title={["Banking,", "aasani say."]}
        copy="Explore PayKaro’s services for people, families, businesses and communities across Pakistan."
        actions={[
          { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) },
          { label: "Company", onClick: () => go({ kind: "about", key: "company" }) },
        ]}
      />
      <section className="bg-paper py-[80px]">
        <AboutCrossLinks current="leadership" />
      </section>
    </>
  );
}