"use client";

import {
  ArrowLeftRight,
  Banknote,
  Building2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Cross,
  FileCheck2,
  MapPin,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Store,
  Tag,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { useRef, useState } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Actions, CenterHead, FeatureGrid, FinalCta, GlassCard, H2_LG, H2_XL, LEAD, ParallaxBand, Photo, RailLogos, Sheet, Split, TrustList, type Feature } from "./blocks";
import { PageHero } from "./hero";
import { Appear, SPRING } from "./motion";
import { Container, Sparkle } from "./primitives";
import { useSite } from "./site-context";

const s = segments.business;

const features: Feature[] = [
  { icon: QrCode, title: "Raast QR at your counter", copy: "QR payments for participating merchants.", logo: "raast" },
  { icon: ArrowLeftRight, title: "Domestic transfers", copy: "Interbank transfers (IBFT) through 1LINK.", logo: "1link" },
  { icon: ReceiptText, title: "Bill payments", copy: "Through 1LINK / Raast, with coverage confirmed first." },
  { icon: Banknote, title: "Business cash collection", copy: "Arrangements agreed with you before you start." },
  { icon: CircleCheck, title: "Check before the sale closes", copy: "Confirm the payment result on screen." },
  { icon: Tag, title: "Charges confirmed first", copy: "Know the applicable charges before you begin." },
  { icon: FileCheck2, title: "A clear record", copy: "Keep references and receipts together." },
  { icon: Store, title: "Retail partnership", copy: "Explore services for your neighbourhood counter." },
];

const retailFormats = [
  { icon: Store, title: "Kiryana stores", copy: "The everyday shop on every street, and the heart of the network plan.", bg: "#f16557", fg: "#171717" },
  { icon: Smartphone, title: "Recharge & mobile shops", copy: "Counters people already visit for their phones.", bg: "#0663bd", fg: "#ffffff" },
  { icon: Cross, title: "Pharmacies", copy: "Trusted neighbourhood counters with regular footfall.", bg: "#00d164", fg: "#191e30" },
  { icon: Zap, title: "Utility shops", copy: "Where bills and everyday essentials already come together.", bg: "#ffc409", fg: "#191e30" },
  { icon: Building2, title: "Small franchises", copy: "Local franchise stores ready for new service directions.", bg: "#191e30", fg: "#ffffff" },
];

const fanCards = [
  { icon: ClipboardList, title: "Your requirements", sub: "What your business collects, and how often" },
  { icon: MapPin, title: "Locations", sub: "Where collections are needed" },
  { icon: CalendarClock, title: "Schedules", sub: "Agreed with you in advance" },
  { icon: FileCheck2, title: "Applicable terms", sub: "Confirmed before starting" },
];

export function BusinessPage() {
  const { openDialog, navigate } = useSite();
  const start = { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) };
  return (
    <>
      <div>
        <PageHero
          eyebrow={s.eyebrow}
          title={s.title}
          description={s.description}
          actions={[start, { label: "Retail partnerships", onClick: () => openDialog({ type: "info", key: "retail" }) }]}
        />
        <section aria-labelledby="biz-intro-title" className="relative z-10 overflow-clip rounded-t-[var(--radius-sheet)] bg-black text-white">
          <Container className="pt-[100px] text-center min-[810px]:pt-[150px]">
            <Appear y={30}>
              <h2 id="biz-intro-title" className={cn(H2_XL, "mx-auto max-w-[900px]")}>
                From the counter
                <br />
                to the next opportunity.
              </h2>
            </Appear>
          </Container>
          <div className="relative mx-auto mt-10 h-[420px] max-w-[1200px] min-[810px]:mt-14 min-[810px]:h-[600px]">
            <Photo src="/images/business.webp" alt={s.alt} position="60% 40%" className="absolute inset-0 rounded-none [mask-image:radial-gradient(70%_75%_at_50%_45%,black_55%,transparent)]" sizes="(min-width: 1200px) 1200px, 100vw" />
            <GlassCard title="Raast QR" sub="Participating merchant" rows={[["Payment result", "Check on screen"]]} icon={QrCode} className="absolute bottom-10 left-1/2 -translate-x-1/2" />
          </div>
          <p className={cn(LEAD, "mx-auto max-w-[620px] px-4 pt-4 pb-[80px] text-center text-white/70 min-[810px]:pb-[110px]")}>{s.intro}</p>
        </section>
      </div>

      <Sheet tone="paper" roundTop={false} labelledBy="biz-features-title" className="py-[100px] min-[810px]:py-[160px]">
        <CenterHead id="biz-features-title" title={<>What PayKaro Business<br />gives you</>} />
        <Container className="mt-14 max-w-[1240px] min-[810px]:mt-20">
          <FeatureGrid items={features} />
          <Appear className="mt-14 text-center">
            <p className={cn(LEAD, "mx-auto max-w-[560px]")}>{s.journeysIntro} Eligibility, coverage and charges are confirmed with you first.</p>
            <Actions className="mt-8 justify-center" actions={[start, { label: "Fees and eligibility", onClick: () => openDialog({ type: "info", key: "fees" }) }]} />
          </Appear>
        </Container>
      </Sheet>

      <Sheet tone="paper" roundTop={false} roundBottom={false} className="border-t border-line">
        <Split
          id="merchant-payments"
          eyebrow={s.journeys[0].nav}
          title={s.journeys[0].title}
          copy={s.journeys[0].copy}
          points={s.journeys[0].points}
          extra={<RailLogos items={["raast", "1link"]} className="mt-8" />}
          actions={[{ label: "Raast QR payments", onClick: () => openDialog({ type: "service", key: "qr" }) }]}
          visual={
            <div className="relative">
              <Photo src="/images/business.webp" alt="A customer waiting at a retail counter while the shopkeeper checks a phone" position="25% 50%" className="aspect-[4/5] max-h-[640px] w-full" />
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 min-[810px]:inset-x-8 min-[810px]:bottom-8">
                <GlassCard title="Raast QR" sub="Participating merchant · Active" icon={QrCode} className="w-full max-w-[340px]" />
                <GlassCard title="Payment result" sub="Check before completing the sale" icon={CircleCheck} className="w-full max-w-[340px]" />
              </div>
            </div>
          }
        />
      </Sheet>

      <MovesMoney />

      <CollectionsFan />

      <RetailCarousel />

      <ParallaxBand src="/images/business.webp" alt="Shelves of everyday goods behind a neighbourhood shop counter" position="85% 50%" />

      <Sheet tone="white" roundBottom={false} labelledBy="biz-trust-title" className="-mt-8">
        <Container className="grid gap-12 py-[100px] min-[810px]:py-[160px] lg:grid-cols-2">
          <Appear y={30}>
            <h2 id="biz-trust-title" className={H2_XL}>
              Checked
              <br />
              before it
              <br />
              moves.
            </h2>
            <p className={cn(LEAD, "mt-6 max-w-[420px]")}>Every business payment deserves the same four checks, at the counter and away from it.</p>
          </Appear>
          <TrustList
            items={[
              { icon: Tag, title: "Charges confirmed first", copy: "A verified schedule of charges isn’t published on this website. Confirm charges for your service before you start." },
              { icon: QrCode, title: "Merchant and amount checked", copy: "Customers check the merchant name and amount; you check the result before completing the sale." },
              { icon: ReceiptText, title: "Receipts and references kept", copy: "A clear record makes it easier to follow up." },
              { icon: ShieldCheck, title: "Verified channels only", copy: "This website never asks for your banking details, PINs or one-time codes." },
            ]}
          />
        </Container>
      </Sheet>

      <FinalCta
        id="biz-cta"
        title={["Your counter,", "connected."]}
        copy="Payments, collections and partnerships for the businesses that keep Pakistan moving."
        actions={[start, { label: "Assisted services", onClick: () => navigate("assisted") }]}
      />
    </>
  );
}

/** Tabs over a three-card collage, the reference's "Built for how business moves money". */
function MovesMoney() {
  const { openDialog } = useSite();
  const [tab, setTab] = useState(0);
  const cards = [
    { ...s.journeys[0], photo: { position: "25% 50%" }, service: "qr" as const },
    { ...s.journeys[1], photo: { position: "62% 38%" }, service: "cash" as const },
    { ...s.journeys[2], photo: { position: "85% 50%" }, service: "atm" as const },
  ];
  const order = [(tab + 2) % 3, tab, (tab + 1) % 3];
  return (
    <Sheet tone="white" labelledBy="biz-moves-title" className="py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="biz-moves-title" title={<>Built for how<br />business moves money</>} lead={s.intro} />
      <div role="tablist" aria-label="Business services" className="mt-12 flex flex-wrap justify-center gap-2 px-4">
        {cards.map((c, i) => (
          <button
            key={c.id}
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
            {c.nav}
          </button>
        ))}
      </div>
      <Container className="mt-12 min-[810px]:mt-16">
        <div id="biz-tabpanel" role="tabpanel" aria-labelledby={`biz-tab-${tab}`} className="grid items-center gap-4 lg:grid-cols-[1fr_1.4fr_1fr]">
          {order.map((idx, pos) => {
            const c = cards[idx];
            const main = pos === 1;
            return (
              <motion.div
                key={c.id}
                layout
                transition={SPRING}
                className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-night text-white", main ? "h-[520px] min-[810px]:h-[600px]" : "hidden h-[440px] opacity-80 lg:block")}
              >
                <Photo src="/images/business.webp" alt="" position={c.photo.position} className="absolute inset-0 rounded-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-6 bottom-6 min-[810px]:inset-x-8 min-[810px]:bottom-8">
                  <p className={cn("font-medium", main ? "text-[28px] leading-[1.05]" : "text-[18px]")}>{c.title.join(" ")}</p>
                  <AnimatePresence mode="wait">
                    {main && (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={SPRING}>
                        <p className="mt-3 max-w-[440px] font-ui text-[15px] leading-[1.25] text-white/80">{c.copy}</p>
                        <button
                          type="button"
                          onClick={() => openDialog(c.partner ? { type: "info", key: "retail" } : { type: "service", key: c.service })}
                          className="pill mt-5 h-10 bg-white px-5 text-[15px] text-[#171717]"
                        >
                          <span className="roll">
                            <span>{c.partner ? "Retail partner information" : services[c.service].short}</span>
                            <span aria-hidden="true">{c.partner ? "Retail partner information" : services[c.service].short}</span>
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

/** Pinned dark sheet: collection cards fan out as the page scrolls, then the headline takes over. */
function CollectionsFan() {
  const { openDialog } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.75], [60, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.62], [0, 1, 1, 0]);
  return (
    <section id="collections" aria-labelledby="collections-title" data-theme="dark" className="relative z-10 -mt-8 scroll-mt-0 rounded-[var(--radius-sheet)] bg-night text-white">
      <div ref={ref} className={cn(reduce ? "" : "h-[260vh]")}>
        <div className={cn("flex flex-col items-center justify-center overflow-hidden px-4", reduce ? "py-[100px]" : "sticky top-0 h-[100svh]")}>
          <div className="relative grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-2">
            <div className="relative mx-auto h-[300px] w-[300px] min-[810px]:h-[380px] min-[810px]:w-[420px]" aria-hidden="true">
              {fanCards.map((c, i) => (
                <FanCard key={c.title} index={i} progress={scrollYProgress} reduce={!!reduce} {...c} />
              ))}
            </div>
            <motion.div style={reduce ? { opacity: 1 } : { opacity: introOpacity }}>
              <p className="font-num text-[20px] tracking-[0.02em] text-white/60">{s.journeys[1].nav}</p>
              <h2 id="collections-title" className={cn(H2_LG, "mt-4")}>
                {s.journeys[1].title[0]}
                <br />
                {s.journeys[1].title[1]}
              </h2>
              <p className={cn(LEAD, "mt-6 max-w-[440px] text-white/70")}>{s.journeys[1].copy}</p>
            </motion.div>
          </div>
          <motion.div style={reduce ? { opacity: 1, y: 0 } : { opacity: textOpacity, y: textY }} className={cn("text-center", reduce ? "mt-16" : "absolute inset-x-4 bottom-[8vh]")}>
            <p className="text-[36px] leading-[0.95] font-medium tracking-[-0.01em] min-[810px]:text-[64px]">
              Collections for every way
              <br />
              your business trades
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {s.journeys[1].points.map((p) => (
                <li key={p} className="rounded-full border border-white/20 px-4 py-2 text-[14px] text-white/80">
                  {p}
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => openDialog({ type: "service", key: "cash" })} className="pill mt-8 h-11 bg-white px-6 text-[16px] text-[#171717]">
              <span className="roll">
                <span>Cash collection details</span>
                <span aria-hidden="true">Cash collection details</span>
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
  const tints = ["color-mix(in srgb, var(--seg) 70%, #3a2a24)", "rgba(255,255,255,0.14)", "color-mix(in srgb, var(--seg) 45%, #2a2a2a)", "rgba(255,255,255,0.22)"];
  return (
    <motion.div
      className="absolute inset-x-6 top-10 bottom-10 origin-bottom rounded-[22px] border border-white/15 p-6 backdrop-blur-md"
      style={{ ...style, background: tints[index], zIndex: index }}
    >
      <div className="flex items-center justify-between">
        <PaykaroLogo decorative className="w-10" />
        <Icon className="size-5 text-white/80" strokeWidth={1.5} />
      </div>
      <p className="absolute right-6 bottom-12 left-6 text-[22px] leading-[1.05] font-medium">{title}</p>
      <p className="absolute right-6 bottom-6 left-6 text-[13px] text-white/70">{sub}</p>
    </motion.div>
  );
}

/** Horizontal carousel of retail formats, like the reference's use-case carousel. */
function RetailCarousel() {
  const { openDialog } = useSite();
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: number) => track.current?.scrollBy({ left: dir * Math.min(420, track.current.clientWidth * 0.8), behavior: "smooth" });
  const j = s.journeys[2];
  return (
    <Sheet tone="white" id="retail-partners" labelledBy="retail-partners-title" roundTop className="relative -mt-8 scroll-mt-0 py-[100px] min-[810px]:py-[160px]">
      <CenterHead id="retail-partners-title" title={<>Made for the way<br />you trade</>} lead={j.copy} />
      <div className="mt-12 min-[810px]:mt-16">
        <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 min-[810px]:px-10 lg:px-[max(40px,calc((100vw-1240px)/2))]">
          {retailFormats.map((f, i) => (
            <Appear key={f.title} as="li" delay={i * 0.05} y={20} className="shrink-0 snap-start">
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
            <button type="button" aria-label="Previous retail format" onClick={() => step(-1)} className="flex size-11 items-center justify-center rounded-full border border-line hover:border-ink/40">
              <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next retail format" onClick={() => step(1)} className="flex size-11 items-center justify-center rounded-full border border-line hover:border-ink/40">
              <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="flex items-center gap-2 text-[16px] hover:text-seg-ink" onClick={() => openDialog({ type: "info", key: "retail" })}>
            <Sparkle /> Retail partner information
          </button>
        </Container>
      </div>
    </Sheet>
  );
}
