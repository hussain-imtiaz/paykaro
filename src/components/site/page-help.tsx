"use client";

import { ArrowUpRight, Bot, MessageCircleQuestion, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { support } from "@/lib/about-content";
import type { DemoKey, InfoKey, SegmentKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Text } from "./about";
import { H2_LG, H2_XL, LEAD, Sheet } from "./blocks";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { Container, PillButton } from "./primitives";
import { Faq } from "./sections-c";
import { useSite } from "./site-context";

type Next = { label: string } & ({ demo: DemoKey } | { info: InfoKey } | { segment: SegmentKey } | { urdu: true });

const topics: { q: string; a: string; next?: Next }[] = [
  { q: "I want to get the PayKaro app", a: "The app can’t be downloaded from this website yet. Official app-store links will be published here, so only download PayKaro from those.", next: { label: "Get PayKaro", info: "getpaykaro" } },
  { q: "A payment didn’t go through", a: "In the app, a payment that doesn’t go through tells you why in plain language, what happened to your money, and what you can do next: try again, try another way, or get help.", next: { label: "See how that works", demo: "recover" } },
  { q: "I can’t find my card", a: "Freeze it yourself in the app. It takes effect straight away, and you can unfreeze it just as quickly if it turns up.", next: { label: "Try it: freeze a card", demo: "card" } },
  { q: "Money is coming from family abroad", a: "PayKaro Remittance is for digital receipt of eligible inward home remittances, subject to applicable approvals and arrangements. The app shows the status from the moment it’s on its way.", next: { label: "See how that works", demo: "remit" } },
  { q: "Something looks suspicious", a: "Don’t share your PIN, password or one-time code with anyone, and don’t enter them on a site or message you weren’t expecting. PayKaro will never ask for them. An official fraud-reporting channel will be published on this page." },
  { q: "I want to know about fees", a: "Any applicable fee is shown with the amount and recipient before you confirm. A schedule of charges isn’t published on this website yet.", next: { label: "About fees", info: "fees" } },
  { q: "I run a business", a: "PayKaro Business brings digital payments, collections and practical tools for merchants and SMEs, with Merchant and Business Analytics.", next: { label: "Explore for Business", segment: "business" } },
  { q: "I’m a partner or institution", a: "PayKaro works with approved businesses and institutions through APIs / Platform Services, disbursements and curated Marketplace services.", next: { label: "For partners", segment: "partners" } },
  { q: "مجھے اردو میں مدد چاہیے", a: "PayKaro is designed so English and Urdu both feel native. There’s an Urdu summary of the essentials here.", next: { label: "اردو", urdu: true } },
];

export function HelpPage() {
  const { go, scrollToSection } = useSite();
  return (
    <>
      <div>
        <PageHero
          eyebrow="Get Help"
          title={["Help that gets", "you to the", "next step."]}
          description="No dead ends. Start with what you’re trying to do, and find the answer or the right route."
          actions={[
            { label: "Find your answer", onClick: () => scrollToSection("topics") },
            { label: "Security & Trust", onClick: () => go({ kind: "page", key: "trust" }) },
          ]}
        />
        <Sheet tone="white" id="topics" labelledBy="topics-title" className="scroll-mt-0 py-[100px] min-[810px]:py-[160px]">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Appear y={24} className="lg:sticky lg:top-[120px] lg:self-start">
              <p className="font-num text-[20px] tracking-[0.02em] text-muted-ink">Intent before catalogue</p>
              <h2 id="topics-title" className={cn(H2_XL, "mt-4")}>
                Tell us what you’re trying to do.
              </h2>
              <p className={cn(LEAD, "mt-6 max-w-[420px]")}>No forms and no details collected. Pick the closest match and we’ll point you to the next step.</p>
            </Appear>
            <Topics />
          </Container>
        </Sheet>
      </div>

      <section aria-labelledby="ask-title" data-theme="dark" className="relative z-10 -mt-8 rounded-[var(--radius-sheet)] bg-night text-white">
        <Container className="py-[100px] text-center min-[810px]:py-[160px]">
          <Appear y={24}>
            <h2 id="ask-title" className={cn(H2_XL, "mx-auto max-w-[900px]")}>
              What happens when
              <br />
              you need help
            </h2>
            <p className={cn(LEAD, "mx-auto mt-6 max-w-[560px] text-white/70")}>Automation first, so routine things never wait for a queue. A person when you genuinely need one.</p>
          </Appear>
          <ol className="mx-auto mt-14 grid max-w-[1100px] gap-4 text-left lg:grid-cols-3">
            {[
              { icon: Bot, t: "Do it yourself, straight away", c: "Routine tasks and controls are self-service and immediate, with no call and no queue." },
              { icon: MessageCircleQuestion, t: "A plain-language answer", c: "If something goes wrong, you’re told what happened and what you can do next." },
              { icon: UserRound, t: "A person, when it’s needed", c: "Human help for the cases that genuinely need it, with the context already known, so you don’t repeat yourself." },
            ].map((s, i) => (
              <Appear key={s.t} as="li" delay={i * 0.06} y={20} className="rounded-[var(--radius-card)] border border-white/10 bg-[#1f1f1f] p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl" style={{ background: "var(--seg-grad)" }}>
                  <s.icon className="size-5 text-[#171717]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className="mt-8 font-num text-[16px] text-white/50">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-[22px] leading-[1.1] font-medium">{s.t}</h3>
                <p className="mt-3 font-ui text-[15px] leading-[1.3] text-white/65">{s.c}</p>
              </Appear>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="channels-title" className="bg-card pt-[100px] pb-10 min-[810px]:pt-[140px]">
        <Container>
          <h2 id="channels-title" className={H2_LG}>
            Contact channels
          </h2>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {support.map((s) => (
              <li key={s.label} className="flex flex-col rounded-[var(--radius-card)] bg-paper p-6">
                <h3 className="text-[18px] font-medium">{s.label}</h3>
                <Text copy={s.value} className="mt-4 text-[14px]" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <div className="bg-paper">
        <Faq id="help-faq" />
      </div>
    </>
  );
}

function Topics() {
  const { showDemo, openDialog, navigate } = useSite();
  const [open, setOpen] = useState<number | null>(0);
  const act = (n: Next) => {
    if ("demo" in n) showDemo(n.demo);
    else if ("info" in n) openDialog({ type: "info", key: n.info });
    else if ("segment" in n) navigate(n.segment);
    else openDialog({ type: "urdu" });
  };
  return (
    <ul className="border-t border-line">
      {topics.map((t, i) => {
        const isOpen = open === i;
        const ur = /[\u0600-\u06FF]/.test(t.q);
        return (
          <li key={t.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`topic-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[18px] font-medium min-[810px]:text-[22px]"
              >
                <span lang={ur ? "ur" : undefined} dir={ur ? "rtl" : undefined}>
                  {t.q}
                </span>
                <ArrowUpRight className={cn("size-5 shrink-0 text-seg-ink transition-transform duration-300", isOpen && "rotate-90")} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`topic-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }} className="overflow-hidden">
                  <div className="max-w-[560px] pb-6">
                    <p className="text-[16px] leading-[1.4] text-muted-ink">{t.a}</p>
                    {t.next && <PillButton className="mt-4" label={t.next.label} onClick={() => act(t.next!)} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
