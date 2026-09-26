"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SERVICE_ORDER, demos, info, services, type ServiceKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite, type DialogState } from "./site-context";
import { ArrowUpRight, PillButton, serviceIcons } from "./primitives";
import { getLenis } from "@/lib/smooth-scroll";
import { useEffect } from "react";

function ServiceList({ keys, onPick }: { keys: ServiceKey[]; onPick: (k: ServiceKey) => void }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
      {keys.map((k) => {
        const Icon = serviceIcons[k];
        return (
          <li key={k}>
            <button
              type="button"
              onClick={() => onPick(k)}
              className="group flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] font-semibold hover:bg-paper"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl",
                  services[k].planned ? "bg-paper text-muted-ink" : "bg-seg-fill text-seg-on",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex-1">
                {services[k].short}
                {services[k].planned && <span className="ml-2 text-[12px] font-medium text-muted-ink">Planned</span>}
              </span>
              <ArrowUpRight className="size-4 text-faint-ink" strokeWidth={1.75} aria-hidden="true" />
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

function Body({ state }: { state: Exclude<DialogState, null> }) {
  const { openDialog, showDemo } = useSite();
  const [query, setQuery] = useState("");

  if (state.type === "service") {
    const s = services[state.key];
    const Icon = serviceIcons[state.key];
    const demoKey = state.key in demos ? (state.key as keyof typeof demos) : null;
    return (
      <>
        <span className="flex size-12 items-center justify-center rounded-full bg-seg-fill text-seg-on">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-seg-ink">{s.tag}</p>
          <DialogTitle className="mt-1 text-[28px] leading-tight font-semibold">{s.short}</DialogTitle>
        </div>
        <DialogDescription className="text-[16px] leading-relaxed text-muted-ink">{s.detail}</DialogDescription>
        <div>
          <h3 className="text-[15px] font-semibold">Before you get started</h3>
          <ol className="mt-3 space-y-2">
            {s.steps.map((t, i) => (
              <li key={t} className="flex gap-3 text-[15px] leading-relaxed">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-paper font-heading text-[12px] font-semibold">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <Note>
          Service availability, eligibility, limits and charges are subject to confirmation. No live transaction can
          be made on this website.
        </Note>
        {demoKey && (
          <PillButton className="justify-self-start" size="lg" label="Explore the walkthrough" onClick={() => showDemo(demoKey)} />
        )}
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
        <p className="text-[13px] font-semibold text-seg-ink">The PayKaro service portfolio</p>
        <DialogTitle className="-mt-2 text-[28px] leading-tight font-semibold">Everyday possibilities.</DialogTitle>
        <DialogDescription className="sr-only">Choose a service to read its details.</DialogDescription>
        <ServiceList keys={SERVICE_ORDER} onPick={(k) => openDialog({ type: "service", key: k })} />
      </>
    );
  }

  if (state.type === "search") {
    const q = query.toLowerCase().trim();
    const matches = SERVICE_ORDER.filter((k) =>
      `${k} ${services[k].short} ${services[k].description} ${services[k].tag}`.toLowerCase().includes(q),
    );
    return (
      <>
        <p className="text-[13px] font-semibold text-seg-ink">Find your way</p>
        <DialogTitle className="-mt-2 text-[28px] leading-tight font-semibold">What can we help you find?</DialogTitle>
        <DialogDescription className="sr-only">Type to filter PayKaro services.</DialogDescription>
        <label className="grid gap-2 text-[14px] font-semibold">
          Search services
          <input
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try bills, cash or transfers"
            className="h-12 rounded-full border border-input bg-card px-4 text-[16px] font-normal outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          />
        </label>
        <div aria-live="polite">
          {matches.length ? (
            <ServiceList keys={matches} onPick={(k) => openDialog({ type: "service", key: k })} />
          ) : (
            <p className="rounded-xl bg-paper p-4 text-[15px] text-muted-ink">
              No matching services. Try “payments”, “cash” or “transfer”.
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <div lang="ur" dir="rtl" className="grid gap-4 text-right">
      <p className="text-[14px] font-semibold text-seg-ink">پے کرو</p>
      <DialogTitle className="text-[30px] leading-snug font-semibold">بینکاری، آسانی سے۔</DialogTitle>
      <DialogDescription className="text-[17px] leading-loose text-muted-ink">
        رقم بھیجنے، بل ادا کرنے اور نقد رقم کی سہولیات کے بارے میں جانیں۔
      </DialogDescription>
      <ul className="space-y-2 text-[16px] leading-loose">
        <li>ادائیگی سے پہلے نام، رقم اور تمام تفصیلات کی تصدیق کریں۔</li>
        <li>اپنا پن، پاس ورڈ یا یک وقتی کوڈ کسی کے ساتھ شیئر نہ کریں۔</li>
        <li>ہر لین دین کی رسید اور حوالہ نمبر محفوظ رکھیں۔</li>
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
