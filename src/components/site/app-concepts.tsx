"use client";

import { ArrowDownLeft, ArrowUpRight, CreditCard, Globe, PiggyBank, Search, Share2, Snowflake, Store } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Minimal PayKaro app-screen concepts. Sample data only, clearly labelled; PayKaro's
 * real app design is not final. Built from the brief's app ideology (s5) and benchmark (s8).
 */
export function Phone({ children, className, label = "Concept" }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div aria-hidden="true" className={cn("w-[260px] shrink-0 rounded-[40px] bg-[#171717] p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]", className)}>
      <div className="flex h-[520px] flex-col overflow-hidden rounded-[33px] bg-white p-5 text-[#171717]">
        <div className="flex items-center justify-between">
          <PaykaroLogo decorative className="w-9" />
          <span className="rounded-full bg-seg-soft px-2 py-0.5 text-[10px] font-medium">{label}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function IntentRow({ icon: Icon, label, sub }: { icon: typeof Globe; label: string; sub?: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-[#f5f5f5] px-3 py-2.5">
      <span className="flex size-8 items-center justify-center rounded-full" style={{ background: "var(--seg-grad)" }}>
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium">{label}</span>
        {sub && <span className="block truncate text-[11px] text-black/50">{sub}</span>}
      </span>
    </li>
  );
}

function Balance({ small }: { small?: boolean }) {
  return (
    <div className={cn("rounded-2xl bg-[#171717] text-white", small ? "mt-4 p-3" : "mt-5 p-4")}>
      <p className="text-[11px] text-white/60">Balance</p>
      <p className={cn("font-medium tracking-[-0.01em]", small ? "text-[20px]" : "text-[26px]")}>Rs 24,500</p>
    </div>
  );
}

function SearchBar({ text = "What do you want to do?" }: { text?: string }) {
  return (
    <div className="mt-4 flex items-center gap-2 rounded-full border border-black/10 px-3 py-2.5 text-[12px] text-black/55">
      <Search className="size-3.5" strokeWidth={2} />
      {text}
    </div>
  );
}

/** Concept A: balance as the anchor, likely next actions below. */
export function HomeLikelyNext({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <p className="mt-5 text-[12px] text-black/55">Assalam-o-Alaikum</p>
      <Balance />
      <p className="mt-5 text-[11px] font-medium tracking-[0.04em] text-black/45 uppercase">Likely next</p>
      <ul className="mt-2 space-y-2">
        <IntentRow icon={ArrowUpRight} label="Send to Ammi" sub="You usually do this on the 1st" />
        <IntentRow icon={Globe} label="Money from abroad" sub="On its way" />
        <IntentRow icon={PiggyBank} label="Set some aside" sub="Super Savers" />
      </ul>
      <SearchBar />
    </Phone>
  );
}

/** Concept B: search first, with typed intent in English or Roman Urdu. */
export function HomeSearchFirst({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <p className="mt-6 text-[26px] leading-[1.05] font-medium tracking-[-0.01em]">What do you want to do?</p>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border-2 border-seg px-3 py-3 text-[14px]">
        <Search className="size-4 text-black/50" strokeWidth={2} />
        paise bhejo
      </div>
      <ul className="mt-3 space-y-2">
        <IntentRow icon={ArrowUpRight} label="Send money" sub="Matched “paise bhejo”" />
        <IntentRow icon={ArrowDownLeft} label="Request money" />
      </ul>
      <Balance small />
    </Phone>
  );
}

/** Concept C: a quiet timeline of what happened today and what needs you. */
export function HomeToday({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <div className="mt-5 flex items-end justify-between">
        <p className="text-[22px] leading-none font-medium">Today</p>
        <p className="text-[12px] text-black/55">Rs 24,500</p>
      </div>
      <ol className="mt-5 space-y-3 border-l border-black/10 pl-4 text-[12px]">
        <li>
          <p className="font-medium">Money from abroad arrived</p>
          <p className="text-black/50">Proof saved</p>
        </li>
        <li>
          <p className="font-medium">Paid at a shop with your watch</p>
          <p className="text-black/50">Contactless · receipt saved</p>
        </li>
        <li className="rounded-2xl bg-seg-soft p-3">
          <p className="font-medium">Card ending 4821 isn’t used much</p>
          <p className="text-black/60">Freeze it until you need it?</p>
          <span className="mt-2 inline-flex rounded-full bg-seg-fill px-3 py-1 text-[11px] font-medium text-seg-on">Freeze</span>
        </li>
      </ol>
      <SearchBar />
    </Phone>
  );
}

/** Transaction proof: amount, counterparty, applicable fee, confirmation, shareable proof. */
export function ReceiptConcept({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <Phone className={className}>
      <div className="mt-6 flex flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-[#def7e9] text-[#00652f]">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
          </svg>
        </span>
        <p className="mt-3 text-[13px] text-black/55">Sent to Ammi</p>
        <p className="text-[30px] font-medium tracking-[-0.01em]">Rs 5,000</p>
      </div>
      <dl className="mt-5 divide-y divide-black/10 rounded-2xl bg-[#f5f5f5] px-3 text-[12px]">
        {[
          ["To", "Ammi"],
          ["Applicable fee", "Shown before you confirmed"],
          ["Status", "Completed"],
          ["Reference", "Kept for you"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 py-2.5">
            <dt className="text-black/55">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-auto flex h-11 items-center justify-center gap-2 rounded-full bg-seg-fill text-[13px] font-medium text-seg-on">
        <Share2 className="size-4" strokeWidth={2} /> Share proof
      </span>
    </Phone>
  );
}

/** Card controls: immediate, understandable and reversible. */
export function CardControlsConcept({ frozen, className }: { frozen: boolean; className?: string }) {
  return (
    <Phone className={className}>
      <div className={cn("mt-5 rounded-2xl p-4 text-white transition-colors duration-300", frozen ? "bg-[#9aa6b8]" : "bg-[#171717]")}>
        <div className="flex items-center justify-between">
          <CreditCard className="size-5" strokeWidth={1.5} />
          {frozen && <Snowflake className="size-5" strokeWidth={1.5} />}
        </div>
        <p className="mt-8 font-num text-[18px] tracking-[0.1em]">•••• 4821</p>
        <p className="text-[11px] text-white/70">{frozen ? "Frozen" : "Active"}</p>
      </div>
      <ul className="mt-5 space-y-2 text-[12px]">
        {[
          ["Freeze card", frozen ? "On" : "Off"],
          ["Online payments", "On"],
          ["Contactless", "On"],
          ["Partner access", "Review"],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between rounded-xl bg-[#f5f5f5] px-3 py-2.5">
            <span className="font-medium">{k}</span>
            <span className={cn("text-black/55", k === "Freeze card" && frozen && "font-medium text-seg-ink")}>{v}</span>
          </li>
        ))}
      </ul>
      <p className="mt-auto text-[11px] text-black/50">{frozen ? "Payments paused. Unfreeze any time." : "Changes take effect straight away."}</p>
    </Phone>
  );
}

/** Merchant view: payments in, settlement and performance (Merchant Analytics). */
export function MerchantConcept({ className }: { className?: string }) {
  return (
    <Phone className={className} label="Merchant concept">
      <div className="mt-5 flex items-center gap-2">
        <Store className="size-4" strokeWidth={1.75} />
        <p className="text-[13px] font-medium">Your shop · today</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-2xl bg-[#f5f5f5] p-3">
          <p className="text-black/55">Payments in</p>
          <p className="mt-1 text-[18px] font-medium">86</p>
        </div>
        <div className="rounded-2xl bg-[#f5f5f5] p-3">
          <p className="text-black/55">Settled</p>
          <p className="mt-1 text-[18px] font-medium">Visible</p>
        </div>
      </div>
      <div className="mt-3 flex h-[110px] items-end gap-1.5 rounded-2xl bg-[#f5f5f5] p-3">
        {[30, 45, 38, 60, 52, 75, 68, 90].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i === 7 ? "var(--seg)" : "var(--seg-35)" }} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-seg-soft p-3 text-[12px]">
        <p className="font-medium">Busiest hour: 6–7 pm</p>
        <p className="text-black/60">Insight from sample data</p>
      </div>
    </Phone>
  );
}
