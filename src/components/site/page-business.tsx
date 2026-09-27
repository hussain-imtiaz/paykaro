"use client";

import {
  BadgeCheck,
  Building2,
  ChartColumn,
  ChartLine,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Cross,
  Globe,
  HandCoins,
  LockKeyhole,
  Plug,
  ReceiptText,
  Scissors,
  Share2,
  ShieldCheck,
  Store,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { segments, services, type ServiceKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, FeatureGrid, FinalCta, GlassCard, H2_LG, H2_XL, LEAD, ParallaxBand, Photo, Sheet, Split, TrustList, type Feature } from "./blocks";
import { MerchantConcept } from "./app-concepts";
import { PageHero } from "./hero";
import { Appear } from "./motion";
import { Container, Sparkle } from "./primitives";
import { useSite } from "./site-context";

const s = segments.business;
const [payments, collections, insights] = s.journeys;

const features: Feature[] = [
  { icon: Store, title: "Digital payments", copy: "Take payments at the counter and for digital commerce." },
  { icon: HandCoins, title: "Collections", copy: "See where every payment stands, from received to settled." },
  { icon: Wrench, title: "Business-management tools", copy: "Practical tools for the everyday running of the business." },
  { icon: ChartLine, title: "Merchant Analytics", copy: "Payment, settlement and performance visibility." },
  { icon: ChartColumn, title: "Business Analytics", copy: "Financial insights and reporting for the business." },
  { icon: LockKeyhole, title: "Secured Payment", copy: "A protected digital-commerce payment experience, subject to approval." },
  { icon: BadgeCheck, title: "Status and proof", copy: "You and your customer see the confirmation and the proof." },
  { icon: Plug, title: "APIs / Platform Services", copy: "Controlled connectivity for approved businesses." },
];

const merchants = [
  { icon: Store, title: "Corner shops and kiryana", copy: "The everyday shop on every street.", bg: "#f16557", fg: "#171717" },
  { icon: Cross, title: "Pharmacies", copy: "Busy counters where speed and a clear receipt matter.", bg: "#0663bd", fg: "#ffffff" },
  { icon: Globe, title: "Online sellers", copy: "Digital commerce, with a protected way to pay.", bg: "#00d164", fg: "#191e30" },
  { icon: Scissors, title: "Service businesses", copy: "Salons, workshops and tutors who get paid by the job.", bg: "#ffc409", fg: "#191e30" },
  { icon: Building2, title: "Growing SMEs", copy: "More sales, more staff, more need for the numbers.", bg: "#191e30", fg: "#ffffff" },
];

const progress = [
  { icon: HandCoins, title: "Payment in", sub: "A customer pays" },
  { icon: CircleCheck, title: "Confirmed", sub: "Both sides see it" },
  { icon: ReceiptText, title: "Settled", sub: "Settlement visible" },
  { icon: ChartLine, title: "In your numbers", sub: "Performance, updated" },
];

export function BusinessPage() {
  const { openDialog, navigate, scrollToSection } = useSite();
  const get = { label: "Get PayKaro Business", onClick: () => openDialog({ type: "info", key: "business" }) };
  return (
    <>
      <div>
        <PageHero eyebrow={s.eyebrow} title={s.title} description={s.description} actions={[get, { label: "See the analytics", onClick: () => scrollToSection(insights.id) }]} />
        <section aria-labelledby="biz-intro-title" className="relative z-10 overflow-clip rounded-t-[var(--radius-sheet)] bg-black text-white">
          <Container className="pt-[100px] text-center min-[810px]:pt-[150px]">
            <Appear y={24}>
              <h2 id="biz-intro-title" className={cn(H2_XL, "mx-auto max-w-[900px]")}>
                From payment received
                <br />
                to numbers you can use.
              </h2>
            </Appear>
          </Container>
          <div className="relative mx-auto mt-10 h-[420px] max-w-[1200px] min-[810px]:mt-14 min-[810px]:h-[600px]">
            <Photo src="/images/business.webp" alt="A Pakistani shop owner using his phone at the counter of his store" position="60% 40%" className="absolute inset-0 rounded-none [mask-image:radial-gradient(70%_75%_at_50%_45%,black_55%,transparent)]" sizes="(min-width: 1200px) 1200px, 100vw" />
            <GlassCard title="Payment received" sub="Confirmed · settlement visible" icon={CircleCheck} className="absolute bottom-10 left-1/2 -translate-x-1/2" />
          </div>
          <p className={cn(LEAD, "mx-auto max-w-[620px] px-4 pt-4 pb-[80px] text-center text-white/70 min-[810px]:pb-[110px]")}>{services.business.proposition}</p>
        </section>
      </div>

      <Sheet tone="paper" roundTop={false} labelledBy="biz-features-title" className="py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="biz-features-title" title={<>What PayKaro Business<br />gives you</>} />
        <Container className="mt-14 max-w-[1240px] min-[810px]:mt-20">
          <FeatureGrid items={features} />
          <Appear className="mt-14 text-center">
            <p className={cn(LEAD, "mx-auto max-w-[560px]")}>Payments, collections and practical tools for merchants and SMEs, with the insight to act on.</p>
            <Actions className="mt-8 justify-center" actions={[get, { label: "Fees", onClick: () => openDialog({ type: "info", key: "fees" }) }]} />
          </Appear>
        </Container>
      </Sheet>

      <Sheet tone="paper" roundTop={false} roundBottom={false} className="border-t border-line">
        <Split
          id={payments.id}
          eyebrow={payments.nav}
          title={payments.title}
          copy={payments.copy}
          points={["At the counter and online", "Confirmation on both sides", "Secured Payment for digital commerce, subject to regulatory approval"]}
          actions={[
            { label: services.business.name, onClick: () => openDialog({ type: "service", key: "business" }) },
            { label: "Secured Payment", onClick: () => openDialog({ type: "service", key: "secured" }) },
          ]}
          visual={
            <div className="relative">
              <Photo src="/images/business.webp" alt="A customer waiting at a retail counter while the shopkeeper checks a phone" position="25% 50%" className="aspect-[4/5] max-h-[640px] w-full" />
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 min-[810px]:inset-x-8 min-[810px]:bottom-8">
                <GlassCard title="Payment confirmed" sub="Customer and shop both see it" icon={CircleCheck} className="w-full max-w-[340px]" />
                <GlassCard title="Proof ready to share" sub="A receipt for your records" icon={Share2} className="w-full max-w-[340px]" />
              </div>
            </div>
          }
        />
      </Sheet>

      <MovesMoney />

      <CollectionsFan />

      <MerchantCarousel />

      <ParallaxBand src="/images/business.webp" alt="Shelves of everyday goods behind a neighbourhood shop counter" position="85% 50%" />

      <Sheet tone="white" roundBottom={false} className="-mt-8">
        <Split
          id={insights.id}
          eyebrow={insights.nav}
          title={insights.title}
          copy={insights.copy}
          points={["Payments, settlement and performance in one view", "Insight that turns into a next action", "Financial reporting for the whole business"]}
          actions={[
            { label: "Merchant Analytics", onClick: () => openDialog({ type: "service", key: "merchantanalytics" }) },
            { label: "Business Analytics", onClick: () => openDialog({ type: "service", key: "bizanalytics" }) },
          ]}
          visual={
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-paper">
              <div className="absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(55% 55% at 50% 60%, color-mix(in srgb, var(--seg) 30%, transparent), transparent 70%)" }} />
              <MerchantConcept className="relative scale-[0.82] min-[810px]:scale-90" />
            </div>
          }
        />
        <Container className="grid gap-12 pb-[100px] min-[810px]:pb-[160px] lg:grid-cols-2">
          <Appear y={24}>
            <h2 id="biz-trust-title" className={H2_XL}>
              Trust,
              <br />
              designed in.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[420px]")}>Status, confirmation, charges and recovery routes, visible at the moment they matter, for you and for your customers.</p>
          </Appear>
          <TrustList
            items={[
              { icon: BadgeCheck, title: "Status you can see", copy: "Every payment shows where it stands, from received to settled." },
              { icon: ReceiptText, title: "Fees shown before you agree", copy: "Applicable charges are clear before anything is confirmed. A schedule isn’t published here yet." },
              { icon: Share2, title: "Proof on both sides", copy: "A clear confirmation and a receipt you and your customer can keep." },
              { icon: ShieldCheck, title: "Your details stay yours", copy: "This website never asks for banking details, PINs or one-time codes." },
            ]}
          />
        </Container>
      </Sheet>

      <FinalCta
        id="biz-cta"
        title={["Get paid.", "See it clearly."]}
        copy="Payments, collections and analytics for merchants and SMEs. Need to connect your platform? See Partners."
        actions={[get, { label: "For partners", onClick: () => navigate("partners") }]}
      />
    </>
  );
}

/** Tabs over a three-card collage, the reference's "Built for how business moves money". */
function MovesMoney() {
  const { openDialog } = useSite();
  const [tab, setTab] = useState(0);
  const cards: { j: (typeof s.journeys)[number]; position: string; service: ServiceKey }[] = [
    { j: payments, position: "25% 50%", service: "business" },
    { j: collections, position: "62% 38%", service: "merchantanalytics" },
    { j: insights, position: "85% 50%", service: "bizanalytics" },
  ];
  const order = [(tab + 2) % 3, tab, (tab + 1) % 3];
  return (
    <Sheet tone="white" labelledBy="biz-moves-title" className="py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="biz-moves-title" title={<>Built for how<br />business moves money</>} lead="From the first payment of the day to the numbers at the end of the month." />
      <div role="tablist" aria-label="Business" className="mt-12 flex flex-wrap justify-center gap-2 px-4">
        {cards.map((c, i) => (
          <button
            key={c.j.id}
            type="button"
            role="tab"
            id={`biz-tab-${i}`}
            aria-selected={tab === i}
            aria-controls="biz-tabpanel"
            onClick={() => setTab(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setTab(n);
                document.getElementById(`biz-tab-${n}`)?.focus();
              }
            }}
            tabIndex={tab === i ? 0 : -1}
            className={cn("h-10 rounded-full border px-5 font-ui text-[15px] transition-colors duration-300", tab === i ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink/40")}
          >
            {c.j.nav}
          </button>
        ))}
      </div>
      <Container className="mt-12 min-[810px]:mt-16">
        <div id="biz-tabpanel" role="tabpanel" aria-labelledby={`biz-tab-${tab}`} className="grid items-center gap-4 lg:grid-cols-[1fr_1.4fr_1fr]">
          {order.map((idx, pos) => {
            const c = cards[idx];
            const main = pos === 1;
            return (
              <motion.div key={c.j.id} layout transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }} className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-night text-white", main ? "h-[520px] min-[810px]:h-[600px]" : "hidden h-[440px] opacity-80 lg:block")}>
                <Photo src="/images/business.webp" alt="" position={c.position} className="absolute inset-0 rounded-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-6 bottom-6 min-[810px]:inset-x-8 min-[810px]:bottom-8">
                  <p className={cn("font-medium", main ? "text-[28px] leading-[1.05]" : "text-[18px]")}>{c.j.title.join(" ")}</p>
                  <AnimatePresence mode="wait">
                    {main && (
                      <motion.div key={c.j.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        <p className="mt-3 max-w-[440px] font-ui text-[15px] leading-[1.25] text-white/80">{c.j.copy}</p>
                        <button type="button" onClick={() => openDialog({ type: "service", key: c.service })} className="pill mt-5 h-10 bg-white px-5 text-[15px] text-[#171717]">
                          <span className="roll">
                            <span>{services[c.service].name}</span>
                            <span aria-hidden="true">{services[c.service].name}</span>
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Sheet>
  );
}

/** Pinned dark sheet: a payment's progress states fan out as you scroll, so the motion shows progress. */
function CollectionsFan() {
  const { openDialog } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.75], [30, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.62], [0.4, 1, 1, 0]);
  return (
    <section id={collections.id} aria-labelledby="collections-title" data-theme="dark" className="relative z-10 -mt-8 scroll-mt-0 rounded-[var(--radius-sheet)] bg-night text-white">
      <div ref={ref} className={cn(reduce ? "" : "h-[200vh]")}>
        <div className={cn("flex flex-col items-center justify-center overflow-hidden px-4", reduce ? "py-[100px]" : "sticky top-0 h-[100svh]")}>
          <div className="relative grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-2">
            <div className="relative mx-auto h-[300px] w-[300px] min-[810px]:h-[380px] min-[810px]:w-[420px]" aria-hidden="true">
              {progress.map((c, i) => (
                <FanCard key={c.title} index={i} progress={scrollYProgress} reduce={!!reduce} {...c} />
              ))}
            </div>
            <motion.div style={reduce ? { opacity: 1 } : { opacity: introOpacity }}>
              <p className="font-num text-[20px] tracking-[0.02em] text-white/60">{collections.nav}</p>
              <h2 id="collections-title" className={cn(H2_LG, "mt-4")}>
                {collections.title[0]}
                <br />
                {collections.title[1]}
              </h2>
              <p className={cn(LEAD, "mt-6 max-w-[440px] text-white/70")}>{collections.copy}</p>
            </motion.div>
          </div>
          <motion.div style={reduce ? { opacity: 1, y: 0 } : { opacity: textOpacity, y: textY }} className={cn("relative z-20 text-center", reduce ? "mt-16" : "absolute inset-x-4 bottom-[8vh]")}>
            <p className="text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[64px]">
              Every payment,
              <br />
              every step, visible
            </p>
            <button type="button" onClick={() => openDialog({ type: "service", key: "merchantanalytics" })} className="pill mt-8 h-11 bg-white px-6 text-[16px] text-[#171717]">
              <span className="roll">
                <span>Merchant Analytics</span>
                <span aria-hidden="true">Merchant Analytics</span>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FanCard({ index, progress, reduce, icon: Icon, title, sub }: { index: number; progress: MotionValue<number>; reduce: boolean; icon: typeof Store; title: string; sub: string }) {
  const angle = [-24, -8, 8, 24][index];
  const rotate = useTransform(progress, [0.05, 0.45], [0, angle]);
  const x = useTransform(progress, [0.05, 0.45], [0, angle * 3.2]);
  const style = reduce ? { rotate: angle * 0.6, x: angle * 2 } : { rotate, x };
  const tints = ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.18)", "color-mix(in srgb, var(--seg) 45%, #2a2a2a)", "color-mix(in srgb, var(--seg) 75%, #3a2a24)"];
  return (
    <motion.div className="absolute inset-x-6 top-10 bottom-10 origin-bottom rounded-[22px] border border-white/15 p-6 backdrop-blur-md" style={{ ...style, background: tints[index], zIndex: index }}>
      <div className="flex items-center justify-between">
        <PaykaroLogo decorative className="w-10" />
        <span className="font-num text-[14px] text-white/70">{index + 1}/4</span>
      </div>
      <Icon className="absolute top-20 left-6 size-6 text-white/80" strokeWidth={1.5} />
      <p className="absolute right-6 bottom-12 left-6 text-[22px] leading-[1.05] font-medium">{title}</p>
      <p className="absolute right-6 bottom-6 left-6 text-[13px] text-white/70">{sub}</p>
    </motion.div>
  );
}

/** Horizontal carousel of merchant contexts, like the reference's use-case carousel. */
function MerchantCarousel() {
  const { openDialog } = useSite();
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: number) => track.current?.scrollBy({ left: dir * Math.min(420, track.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <Sheet tone="white" id="merchants" labelledBy="merchants-title" roundTop className="relative -mt-8 scroll-mt-0 py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="merchants-title" title={<>Made for the way<br />you trade</>} lead="From the corner shop to a growing SME, PayKaro Business is built around Pakistani merchants." />
      <div className="mt-12 min-[810px]:mt-16">
        <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 min-[810px]:px-10 lg:px-[max(40px,calc((100vw-1240px)/2))]">
          {merchants.map((f, i) => (
            <Appear key={f.title} as="li" delay={i * 0.04} y={16} className="shrink-0 snap-start">
              <div className="flex h-[380px] w-[280px] flex-col rounded-[var(--radius-card)] p-7 ring-1 ring-white/10 ring-inset min-[810px]:h-[420px] min-[810px]:w-[340px]" style={{ background: f.bg, color: f.fg }}>
                <f.icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-auto text-[30px] leading-[1] font-medium">{f.title}</h3>
                <p className="mt-3 font-ui text-[15px] leading-[1.25] opacity-80">{f.copy}</p>
              </div>
            </Appear>
          ))}
        </ul>
        <Container className="mt-8 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button type="button" aria-label="Previous" onClick={() => step(-1)} className="flex size-11 items-center justify-center rounded-full border border-line hover:border-ink/40">
              <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next" onClick={() => step(1)} className="flex size-11 items-center justify-center rounded-full border border-line hover:border-ink/40">
              <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="flex items-center gap-2 text-[16px] hover:text-seg-ink" onClick={() => openDialog({ type: "info", key: "business" })}>
            <Sparkle /> Explore for Business
          </button>
        </Container>
      </div>
    </Sheet>
  );
}
