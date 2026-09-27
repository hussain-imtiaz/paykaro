"use client";

import { ArrowDownLeft, CircleCheck, Globe, Hand, Languages, MonitorSmartphone, PiggyBank, Rocket, Search, Share2, SignalLow, Snowflake, Sun, Type } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { demos, services, type DemoKey, type ScreenStatus, type ServiceKey } from "@/lib/content";
import { appPrinciples } from "@/lib/sections-content";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, FeatureGrid, FinalCta, H2_LG, H2_XL, LEAD, Sheet, Split, type Feature } from "./blocks";
import { CardControlsConcept, HomeLikelyNext, HomeSearchFirst, HomeToday, Phone, ReceiptConcept } from "./app-concepts";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { Container, icons, PillButton } from "./primitives";
import { StatusPhone } from "./sections-b";
import { useSite } from "./site-context";

const intents: { q: string; lang: "English" | "Roman Urdu" | "Urdu"; match: string; demo?: DemoKey; service: ServiceKey }[] = [
  { q: "send 5,000 to Ammi", lang: "English", match: "Send money", demo: "send", service: "wallet" },
  { q: "paise bhejo", lang: "Roman Urdu", match: "Send money", demo: "send", service: "wallet" },
  { q: "پیسے بھیجیں", lang: "Urdu", match: "Send money", demo: "send", service: "wallet" },
  { q: "card band karo", lang: "Roman Urdu", match: "Freeze your card", demo: "card", service: "cards" },
  { q: "money from abroad", lang: "English", match: "Money from abroad", demo: "remit", service: "remittance" },
  { q: "bachat", lang: "Roman Urdu", match: "Put money aside", service: "supersavers" },
  { q: "payment failed", lang: "English", match: "When something goes wrong", demo: "recover", service: "wallet" },
];

const designedFor: Feature[] = appPrinciples.map((p, i) => ({
  icon: [Rocket, Search, Hand, CircleCheck, Snowflake, icons.signpost, Languages, MonitorSmartphone][i],
  title: p.title,
  copy: p.copy,
}));

const states: { key: ScreenStatus; label: string; title: string; copy: string; rows: [string, string][] }[] = [
  { key: "success", label: "Success", title: "Sent", copy: "A clear confirmation, the details you’ll want later, and proof you can share.", rows: [["To", "Ammi"], ["Amount", "Rs 5,000"], ["Status", "Completed"]] },
  { key: "pending", label: "Pending", title: "On its way", copy: "Motion shows progress, and the words say exactly what’s happening and when you’ll hear next.", rows: [["Status", "Processing"], ["Next update", "When it lands"]] },
  { key: "failure", label: "Failure", title: "Not sent", copy: "Never a generic error. A plain-language reason, and confirmation of what happened to your money.", rows: [["Why", "The recipient’s account didn’t respond"], ["Your money", "Not taken"]] },
  { key: "recovery", label: "Recovery", title: "What next", copy: "Every failure leads somewhere: try again, try another way, or get help.", rows: [["Try again", "›"], ["Send another way", "›"], ["Get help", "›"]] },
];

const firstUse = [
  { icon: Rocket, title: "Open the app", copy: "No wall of products. One clear place to start." },
  { icon: Languages, title: "Choose English or اردو", copy: "Both are designed to feel native, and you can switch any time." },
  { icon: CircleCheck, title: "Get set up", copy: "Only the steps the approved process needs, and nothing asked twice." },
  { icon: ArrowDownLeft, title: "Do the first thing", copy: "Receive or send money, with the next step always obvious." },
];

export function AppPage() {
  const { openDialog, scrollToSection, go } = useSite();
  const get = { label: "Get PayKaro", onClick: () => openDialog({ type: "info", key: "getpaykaro" }) };
  return (
    <>
      <div>
        <PageHero eyebrow="The PayKaro app" title={["An intent engine,", "not a product", "showroom."]} description="Tell PayKaro what you want to do. It takes you there, shows you what’s happening, and what comes next." actions={[get, { label: "Try the search", onClick: () => scrollToSection("intent") }]} />
        <IntentSearch />
      </div>

      <section aria-labelledby="app-trust-title" data-theme="dark" className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <Container className="grid items-center gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-2">
          <Appear y={24}>
            <p className="font-num text-[20px] tracking-[0.02em] text-white/60">Principle</p>
            <h2 id="app-trust-title" className={cn(H2_XL, "mt-4")}>
              Trust is
              <br />
              designed.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[460px] text-white/70")}>
              Every transaction shows the amount, the counterparty, any applicable fee, a clear confirmation and proof you can share, at the moment it matters.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-2 text-[15px] sm:max-w-[440px]">
              {["Amount", "Counterparty", "Applicable fee", "Confirmation", "Shareable proof", "Recovery route"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-seg-bright" strokeWidth={1.75} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Appear>
          <div className="relative flex justify-center">
            <div className="absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(45% 45% at 50% 50%, color-mix(in srgb, var(--seg) 35%, transparent), transparent 70%)" }} />
            <Appear y={30} className="relative">
              <ReceiptConcept />
            </Appear>
          </div>
        </Container>
      </section>

      <Sheet tone="white" id="home-concepts" labelledBy="home-concepts-title" roundBottom={false} className="-mt-8 py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="home-concepts-title" eyebrow="The home screen learns" title={<>Three ways home<br />could feel</>} lead="Balance stays as an anchor. What’s around it puts your likely intents first, and gets more relevant with use, without a fixed product grid." />
        <Container className="mt-14 min-[810px]:mt-20">
          <ul className="no-scrollbar flex gap-6 overflow-x-auto pb-4 lg:justify-center lg:overflow-visible">
            {[
              { el: <HomeLikelyNext />, t: "A · Likely next", c: "Your balance, then the two or three things you’re most likely to do now." },
              { el: <HomeSearchFirst />, t: "B · Search first", c: "Type what you want, in English or Roman Urdu, and go straight there." },
              { el: <HomeToday />, t: "C · Today", c: "A quiet timeline of what happened and the one thing that needs you." },
            ].map((h, i) => (
              <Appear key={h.t} as="li" delay={i * 0.06} y={24} className="flex w-[260px] shrink-0 flex-col items-center">
                {h.el}
                <p className="mt-6 text-[18px] font-medium">{h.t}</p>
                <p className="mt-1 text-center text-[14px] leading-[1.3] text-muted-ink">{h.c}</p>
              </Appear>
            ))}
          </ul>
          <p className="mt-10 text-center text-[13px] text-faint-ink">Concepts with sample data. PayKaro’s app design isn’t final.</p>
        </Container>
      </Sheet>

      <Sheet tone="white" roundTop={false} roundBottom={false} className="border-t border-line">
        <ControlsSplit />
      </Sheet>

      <Sheet tone="paper" labelledBy="designed-for-title" className="py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="designed-for-title" title={<>What the app<br />is designed for</>} lead="Quiet, intelligent and highly usable. You shouldn’t have to learn PayKaro’s product structure to use PayKaro." />
        <Container className="mt-14 max-w-[1240px] min-[810px]:mt-20">
          <FeatureGrid items={designedFor} />
        </Container>
      </Sheet>

      <StatesShowcase />

      <Sheet tone="white" id="first-use" labelledBy="first-use-title" className="-mt-8 py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="first-use-title" eyebrow="Onboarding is the product" title={<>From opening the app<br />to your first payment</>} lead="Download to first successful use is a flagship journey: fewer screens, fewer repeated questions, less waiting." />
        <Container className="mt-14 min-[810px]:mt-20">
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute top-[34px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-seg via-seg/40 to-seg lg:block" />
            {firstUse.map((f, i) => (
              <Appear key={f.title} as="li" delay={i * 0.06} y={20} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex size-[68px] items-center justify-center rounded-full bg-seg-fill text-seg-on">
                  <f.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-4 font-num text-[16px] text-faint-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-[20px] font-medium">{f.title}</h3>
                <p className="mt-2 max-w-[240px] font-ui text-[15px] leading-[1.25] text-muted-ink">{f.copy}</p>
              </Appear>
            ))}
          </ol>
        </Container>
      </Sheet>

      <Bilingual />

      <Sheet tone="white" labelledBy="device-title" className="py-[100px] min-[810px]:py-[140px]">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Appear y={24}>
            <p className="font-num text-[20px] tracking-[0.02em] text-muted-ink">Device reality</p>
            <h2 id="device-title" className={cn(H2_LG, "mt-4")}>
              Legible in daylight.
              <br />
              Fast on everyday phones.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[460px]")}>Designed for modest devices and real network conditions before presentation screens. Premium comes from restraint, clarity and craft, not visual density.</p>
          </Appear>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Sun, t: "Daylight legibility", c: "Strong contrast and type sizes that hold up outdoors." },
              { icon: Hand, t: "Generous touch targets", c: "Controls you can hit first time, on a small screen." },
              { icon: SignalLow, t: "Real network conditions", c: "Short journeys that don’t stall on a weak signal." },
              { icon: Type, t: "Restrained animation", c: "Motion that shows state and progress, and nothing else." },
            ].map((d, i) => (
              <Appear key={d.t} as="li" delay={i * 0.05} className="rounded-[var(--radius-card)] bg-paper p-6">
                <d.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-8 text-[18px] font-medium">{d.t}</h3>
                <p className="mt-2 font-ui text-[14px] leading-[1.3] text-muted-ink">{d.c}</p>
              </Appear>
            ))}
          </ul>
        </Container>
      </Sheet>

      <FinalCta
        id="app-cta"
        title={["Would you open it", "again tomorrow?"]}
        copy="That’s the last of five questions every PayKaro screen has to pass. The app isn’t available to download from this website yet."
        actions={[get, { label: "How we design", onClick: () => go({ kind: "about", key: "digbex" }) }]}
      />
    </>
  );
}

/** Intent search: chips in English, Roman Urdu and Urdu resolve to the same action (brief s5 Navigation, Language). */
function IntentSearch() {
  const { showDemo, openDialog } = useSite();
  const [pick, setPick] = useState(0);
  const it = intents[pick];
  const step = it.demo ? demos[it.demo].steps[0] : null;
  return (
    <Sheet tone="white" id="intent" labelledBy="intent-title" className="scroll-mt-0 py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="intent-title" eyebrow="Intent before catalogue" title={<>Say what you want.<br />Go straight there.</>} lead="Search and natural-language intent replace menus, with transliteration built in, so “paise bhejo” finds the same place as “send money”." />
      <Container className="mt-14 grid items-center gap-10 min-[810px]:mt-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 rounded-full border-2 border-seg bg-card px-5 py-4 text-[18px] min-[810px]:text-[22px]" aria-hidden="true">
            <Search className="size-5 shrink-0 text-muted-ink" strokeWidth={2} />
            <span lang={it.lang === "Urdu" ? "ur" : undefined} dir={it.lang === "Urdu" ? "rtl" : undefined} className="truncate">
              {it.q}
            </span>
          </div>
          <p className="mt-6 text-[14px] text-faint-ink">Try one:</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Example searches">
            {intents.map((x, i) => (
              <li key={x.q}>
                <button
                  type="button"
                  aria-pressed={pick === i}
                  onClick={() => setPick(i)}
                  className={cn("rounded-full border px-4 py-2 text-[15px] transition-colors", pick === i ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40")}
                >
                  <span lang={x.lang === "Urdu" ? "ur" : undefined}>{x.q}</span>
                  <span className={cn("ml-2 text-[12px]", pick === i ? "text-paper/70" : "text-faint-ink")}>{x.lang}</span>
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait">
            <motion.div key={pick} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8 rounded-2xl bg-paper p-5" aria-live="polite">
              <p className="text-[13px] text-faint-ink">Takes you to</p>
              <p className="mt-1 text-[24px] font-medium">{it.match}</p>
              <p className="mt-1 text-[14px] text-muted-ink">{services[it.service].name}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {it.demo ? (
                  <PillButton label="Walk through it" onClick={() => showDemo(it.demo!)} />
                ) : (
                  <PillButton label={`About ${services[it.service].name}`} onClick={() => openDialog({ type: "service", key: it.service })} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center">
          {step ? (
            <StatusPhone key={it.q} label={demos[it.demo!].label} title={step.screenTitle} status={step.status} rows={step.rows} cta={step.button} />
          ) : (
            <Phone>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-seg-soft">
                  <PiggyBank className="size-5" strokeWidth={1.75} />
                </span>
                <p className="text-[22px] font-medium">Put money aside</p>
              </div>
              <p className="mt-4 text-[12px] text-black/55">Super Savers · eligible partner offerings</p>
              <span className="mt-auto flex h-10 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">See options</span>
            </Phone>
          )}
        </div>
      </Container>
    </Sheet>
  );
}

function ControlsSplit() {
  const [frozen, setFrozen] = useState(false);
  return (
    <Split
      id="controls"
      eyebrow="Controls"
      title={["Immediate.", "And reversible."]}
      copy="Card, security, consent and partner-access controls should feel immediate and understandable. Try it: the change takes effect, and the screen says so."
      extra={
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            role="switch"
            aria-checked={frozen}
            onClick={() => setFrozen((f) => !f)}
            className={cn("relative h-9 w-16 rounded-full transition-colors duration-200", frozen ? "bg-seg-fill" : "bg-ink/20")}
          >
            <span className={cn("absolute top-1 left-1 size-7 rounded-full bg-white shadow transition-transform duration-200", frozen && "translate-x-7")} />
            <span className="sr-only">Freeze card (concept)</span>
          </button>
          <span className="text-[16px] font-medium" aria-live="polite">
            {frozen ? "Card frozen. Payments paused." : "Card active."}
          </span>
        </div>
      }
      visual={
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-paper">
          <CardControlsConcept frozen={frozen} className="scale-[0.82] min-[810px]:scale-90" />
        </div>
      }
    />
  );
}

function StatesShowcase() {
  const [tab, setTab] = useState(0);
  const st = states[tab];
  return (
    <section id="states" aria-labelledby="states-title" data-theme="dark" className="relative z-10 -mt-8 scroll-mt-0 rounded-[var(--radius-sheet)] bg-night text-white">
      <Container className="grid items-center gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <Appear y={24}>
            <p className="font-num text-[20px] tracking-[0.02em] text-white/60">No dead ends</p>
            <h2 id="states-title" className={cn(H2_XL, "mt-4")}>
              Every state,
              <br />
              designed.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[480px] text-white/70")}>Success, pending, failure and recovery are part of the core experience, not added later.</p>
          </Appear>
          <div role="tablist" aria-label="Transaction states" className="mt-10 flex flex-wrap gap-2">
            {states.map((x, i) => (
              <button
                key={x.key}
                type="button"
                role="tab"
                id={`state-tab-${i}`}
                aria-selected={tab === i}
                aria-controls="state-panel"
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const n = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                    setTab(n);
                    document.getElementById(`state-tab-${n}`)?.focus();
                  }
                }}
                className={cn("h-10 rounded-full border px-5 font-ui text-[15px] transition-colors", tab === i ? "border-white bg-white text-[#171717]" : "border-white/25 hover:border-white/60")}
              >
                {x.label}
              </button>
            ))}
          </div>
          <div id="state-panel" role="tabpanel" aria-labelledby={`state-tab-${tab}`} className="mt-6 max-w-[460px]">
            <p className="text-[18px] leading-[1.35] text-white/85">{st.copy}</p>
          </div>
        </div>
        <StatusPhone key={st.key} label="Send money" title={st.title} status={st.key} rows={st.rows} cta={st.key === "failure" ? "What can I do?" : st.key === "recovery" ? "Try again" : st.key === "success" ? "Done" : undefined} />
      </Container>
    </section>
  );
}

/** Representative bilingual layout: the same screen designed natively in English and Urdu (brief s5, s10). */
function Bilingual() {
  const { scrollToSection } = useSite();
  const rows = [
    { en: "Send money", ur: "پیسے بھیجیں", icon: Share2 },
    { en: "Money from abroad", ur: "بیرونِ ملک سے رقم", icon: Globe },
    { en: "Freeze card", ur: "کارڈ روکیں", icon: Snowflake },
  ];
  return (
    <section id="bilingual" aria-labelledby="bilingual-title" className="bg-paper py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="bilingual-title" eyebrow="Language" title={<>English and Urdu,<br />both native.</>} lead="Urdu is a first-class design system, not an English layout translated at the end. The same screen, designed for each." />
      <Container className="mt-14 grid items-start gap-10 min-[810px]:mt-20 lg:grid-cols-[auto_auto_1fr] lg:justify-center lg:gap-12">
        <Phone label="English">
          <p className="mt-6 text-[24px] leading-[1.05] font-medium">What do you want to do?</p>
          <ul className="mt-5 space-y-2">
            {rows.map((r) => (
              <li key={r.en} className="flex items-center gap-3 rounded-2xl bg-[#f5f5f5] px-3 py-3 text-[14px] font-medium">
                <r.icon className="size-4" strokeWidth={1.75} />
                {r.en}
              </li>
            ))}
          </ul>
          <span className="mt-auto flex h-11 items-center justify-center rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">Continue</span>
        </Phone>
        <Phone label="اردو">
          <div lang="ur" dir="rtl" className="flex flex-1 flex-col text-right">
            <p className="mt-4 text-[22px] leading-[1.9] font-semibold">آپ کیا کرنا چاہتے ہیں؟</p>
            <ul className="mt-3 space-y-2">
              {rows.map((r) => (
                <li key={r.ur} className="flex items-center gap-3 rounded-2xl bg-[#f5f5f5] px-3 py-1.5 text-[16px]">
                  <r.icon className="size-4 shrink-0" strokeWidth={1.75} />
                  {r.ur}
                </li>
              ))}
            </ul>
            <span className="mt-auto flex h-11 items-center justify-center rounded-full bg-seg-fill text-[15px] font-semibold text-seg-on">آگے بڑھیں</span>
          </div>
        </Phone>
        <Appear y={20} className="max-w-[420px]">
          <h3 className="text-[24px] font-medium">Typography approach</h3>
          <ul className="mt-5 space-y-4 text-[16px] leading-[1.35] text-muted-ink">
            <li>
              <span className="font-medium text-ink">Urdu in Nastaliq.</span> Set in Noto Nastaliq Urdu, a size up from English, with a line height near 1.9 for its tall ascenders and deep descenders.
            </li>
            <li>
              <span className="font-medium text-ink">Mirrored, not squeezed.</span> Layouts flip right-to-left, and icons that point a direction flip with them.
            </li>
            <li>
              <span className="font-medium text-ink">One spacing system.</span> The same grid, radii and touch targets in both languages, so the app feels related everywhere.
            </li>
            <li>
              <span className="font-medium text-ink">Search that understands both.</span> English, Urdu script and Roman Urdu reach the same action.
            </li>
          </ul>
          <p className="mt-6 text-[13px] text-faint-ink">Urdu copy here is a design sample and needs native-language review before use.</p>
          <Actions className="mt-6" actions={[{ label: "Try the search", onClick: () => scrollToSection("intent") }]} />
        </Appear>
      </Container>
    </section>
  );
}
