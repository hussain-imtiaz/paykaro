"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DEMO_ORDER, SERVICE_ORDER, demos, families, info, services, type ServiceKey } from "@/lib/content";
import { getLenis } from "@/lib/smooth-scroll";
import { useSite, type DialogState } from "./site-context";
import { ArrowUpRight, PillButton, serviceIcons } from "./primitives";

function ServiceList({ keys, onPick }: { keys: readonly ServiceKey[]; onPick: (k: ServiceKey) => void }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
      {keys.map((k) => {
        const Icon = serviceIcons[k];
        return (
          <li key={k}>
            <button type="button" onClick={() => onPick(k)} className="group flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] font-semibold hover:bg-paper">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-seg-fill text-seg-on">
                <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex-1">
                {services[k].name}
                <span className="block text-[13px] font-normal text-muted-ink">{services[k].outcome}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-faint-ink" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-paper p-4 text-[13px] leading-relaxed text-muted-ink">{children}</p>;
}

/** Roman-Urdu words people type, so search works the way customers search. */
const transliteration: Partial<Record<ServiceKey, string>> = {
  wallet: "paise bhejo send money wallet pay",
  cards: "card band karo freeze block",
  remittance: "bahar se paise abroad family remittance",
  supersavers: "bachat savings save",
  dashboard: "kharcha spending insights",
  wearpay: "watch tap contactless",
};

function Body({ state }: { state: Exclude<DialogState, null> }) {
  const { openDialog, showDemo } = useSite();
  const [query, setQuery] = useState("");

  if (state.type === "service") {
    const s = services[state.key];
    const Icon = serviceIcons[state.key];
    const demoKey = DEMO_ORDER.find((d) => demos[d].service === state.key);
    const family = families.find((f) => f.key === s.family)!;
    return (
      <>
        <span className="flex size-12 items-center justify-center rounded-full bg-seg-fill text-seg-on">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-seg-ink">{family.label}</p>
          <DialogTitle className="mt-1 text-[28px] leading-tight font-semibold">{s.name}</DialogTitle>
        </div>
        <DialogDescription className="text-[17px] leading-relaxed">{s.proposition}</DialogDescription>
        {(s.qualifier || s.optional) && (
          <ul className="flex flex-wrap gap-2">
            {s.optional && <li className="rounded-full border border-line px-3 py-1 text-[13px]">Optional</li>}
            {s.qualifier && <li className="rounded-full border border-line px-3 py-1 text-[13px]">{s.qualifier}</li>}
          </ul>
        )}
        <Note>Availability, eligibility and terms aren’t published on this website yet, and nothing can be bought or opened here.</Note>
        {demoKey && <PillButton className="justify-self-start" size="lg" label={`Try it: ${demos[demoKey].label.toLowerCase()}`} onClick={() => showDemo(demoKey)} />}
      </>
    );
  }

  if (state.type === "info") {
    const d = info[state.key];
    return (
      <>
        <p className="text-[13px] font-semibold text-seg-ink">{d.label}</p>
        <DialogTitle className="-mt-2 text-[28px] leading-tight font-semibold">{d.title}</DialogTitle>
        <DialogDescription className="text-[16px] leading-relaxed text-muted-ink">{d.body}</DialogDescription>
        <ul className="space-y-2.5">
          {d.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-seg" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
        <Note>{d.note}</Note>
      </>
    );
  }

  if (state.type === "all-services") {
    return (
      <>
        <p className="text-[13px] font-semibold text-seg-ink">The PayKaro universe</p>
        <DialogTitle className="-mt-2 text-[28px] leading-tight font-semibold">Everything in one place.</DialogTitle>
        <DialogDescription className="sr-only">Choose a service to read its details.</DialogDescription>
        <ServiceList keys={SERVICE_ORDER} onPick={(k) => openDialog({ type: "service", key: k })} />
      </>
    );
  }

  if (state.type === "search") {
    const q = query.toLowerCase().trim();
    const matches = SERVICE_ORDER.filter((k) =>
      `${services[k].name} ${services[k].proposition} ${services[k].outcome} ${transliteration[k] ?? ""}`.toLowerCase().includes(q),
    );
    return (
      <>
        <p className="text-[13px] font-semibold text-seg-ink">Search</p>
        <DialogTitle className="-mt-2 text-[28px] leading-tight font-semibold">What do you want to do?</DialogTitle>
        <DialogDescription className="sr-only">Type in English or Roman Urdu to filter PayKaro services.</DialogDescription>
        <label className="grid gap-2 text-[14px] font-semibold">
          Search services
          <input
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “paise bhejo” or “freeze card”"
            className="h-12 rounded-full border border-input bg-card px-4 text-[16px] font-normal outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          />
        </label>
        <div aria-live="polite">
          {matches.length ? (
            <ServiceList keys={matches} onPick={(k) => openDialog({ type: "service", key: k })} />
          ) : (
            <p className="rounded-xl bg-paper p-4 text-[15px] text-muted-ink">Nothing matches yet. Try “send”, “bachat” or “card”.</p>
          )}
        </div>
      </>
    );
  }

  return (
    <div lang="ur" dir="rtl" className="grid gap-4 text-right">
      <p className="text-[14px] font-semibold text-seg-ink">پے کرو</p>
      <DialogTitle className="text-[28px] leading-[2] font-semibold">پاکستان کے لیے بنایا گیا</DialogTitle>
      <DialogDescription className="text-[17px] leading-[2.1] text-muted-ink">رقم وصول کریں، رکھیں، ادا کریں اور بھیجیں، سب ایک جگہ۔</DialogDescription>
      <ul className="space-y-2 text-[16px] leading-[2.1]">
        <li>تصدیق سے پہلے رقم، وصول کنندہ اور لاگو فیس دیکھیں۔</li>
        <li>اپنا پن، پاس ورڈ یا یک وقتی کوڈ کسی کے ساتھ شیئر نہ کریں۔</li>
        <li>ہر لین دین کا ثبوت محفوظ رکھیں اور شیئر کریں۔</li>
      </ul>
      <Note>یہ ویب سائٹ معلومات کے لیے ہے۔ یہاں اکاؤنٹ نہیں کھولا جا سکتا اور کوئی حقیقی ادائیگی نہیں کی جاتی۔</Note>
    </div>
  );
}

export function SiteDialogs() {
  const { dialog, closeDialog, resolveDialogFocus } = useSite();
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (dialog) lenis.stop();
    else lenis.start();
  }, [dialog]);
  const stateKey = dialog ? `${dialog.type}-${"key" in dialog ? dialog.key : ""}` : "none";
  return (
    <Dialog open={!!dialog} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        finalFocus={resolveDialogFocus}
        className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-[var(--radius-card)] bg-card p-7 text-ink ring-line sm:max-w-[520px] sm:p-9"
        data-lenis-prevent
      >
        {dialog && <Body key={stateKey} state={dialog} />}
      </DialogContent>
    </Dialog>
  );
}
