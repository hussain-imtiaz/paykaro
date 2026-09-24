import type { ReactNode } from "react";
import { PaykaroLogo } from "@/components/brand/paykaro-logo";
import type { ConceptKind, ServiceKey } from "@/lib/content";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Chevron, extraIcons, serviceIcons } from "./primitives";

const rowLabels: Partial<Record<ServiceKey, string>> = {
  transfer: "Send money",
  bills: "Pay bills",
  qr: "Raast QR",
  atm: "Cash access",
  cash: "Collections",
};

function Bar({ w, strong = false }: { w: string; strong?: boolean }) {
  return <span className={cn("block h-2 rounded-full", strong ? "bg-navy/70" : "bg-navy/12")} style={{ width: w }} />;
}

function Row({ service, accent = false }: { service: ServiceKey; accent?: boolean }) {
  const Icon = serviceIcons[service];
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-2.5 py-2",
        accent ? "bg-seg-fill text-seg-on" : "bg-[#f4f3ef] text-navy",
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-lg",
          accent ? "bg-white/25" : "bg-white text-seg-text",
        )}
      >
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <span className="flex-1 text-[11px] font-semibold">{rowLabels[service] ?? services[service].short}</span>
      <Chevron className="size-3 opacity-60" />
    </div>
  );
}

function Avatar({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-10 overflow-hidden rounded-full bg-seg-soft ring-2 ring-white", className)}>
      <span className="absolute top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-seg" />
      <span className="absolute -bottom-2 left-1/2 h-5 w-7 -translate-x-1/2 rounded-full bg-seg/70" />
    </span>
  );
}

function IconDisc({ icon, className }: { icon: ReactNode; className?: string }) {
  return (
    <span className={cn("flex items-center justify-center rounded-full bg-seg-fill text-seg-on", className)}>{icon}</span>
  );
}

const blocks: Record<ConceptKind, (service: ServiceKey) => ReactNode> = {
  transfer: () => (
    <>
      <div className="flex items-center justify-between rounded-2xl bg-seg-soft px-4 py-5">
        <Avatar />
        <span className="relative mx-2 h-px flex-1 bg-seg/50">
          <IconDisc
            icon={<serviceIcons.transfer className="size-3.5" strokeWidth={2.25} />}
            className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2"
          />
        </span>
        <Avatar />
      </div>
      <div className="space-y-2 rounded-2xl border border-navy/8 p-3">
        <Bar w="45%" strong />
        <Bar w="75%" />
        <div className="flex gap-1 pt-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-navy/35" />
          ))}
        </div>
      </div>
      <Row service="transfer" accent />
    </>
  ),
  bills: () => (
    <>
      <div className="relative rounded-2xl bg-seg-soft px-4 pt-4 pb-6 [clip-path:polygon(0_0,100%_0,100%_92%,92%_100%,84%_92%,76%_100%,68%_92%,60%_100%,52%_92%,44%_100%,36%_92%,28%_100%,20%_92%,12%_100%,4%_92%,0_100%)]">
        <IconDisc icon={<serviceIcons.bills className="size-4" strokeWidth={2} />} className="size-9" />
        <p className="mt-3 text-[12px] font-semibold text-navy">Your essentials</p>
        <div className="mt-2 space-y-1.5">
          <Bar w="80%" />
          <Bar w="55%" />
          <Bar w="68%" />
        </div>
      </div>
      <Row service="bills" accent />
      <Row service="transfer" />
    </>
  ),
  cash: () => (
    <>
      <div className="flex items-center justify-center gap-3 rounded-2xl bg-seg-soft py-6">
        <IconDisc icon={<serviceIcons.atm className="size-6" strokeWidth={1.75} />} className="size-16" />
        <span className="flex h-12 w-9 items-center justify-center rounded-lg bg-white text-seg-text shadow-sm">
          <serviceIcons.cash className="size-4" strokeWidth={2} />
        </span>
      </div>
      <Row service="atm" accent />
      <div className="flex items-center gap-2.5 rounded-xl bg-[#f4f3ef] px-2.5 py-2 text-navy">
        <span className="flex size-7 items-center justify-center rounded-lg bg-white text-seg-text">
          <extraIcons.lock className="size-3.5" strokeWidth={2} />
        </span>
        <span className="flex-1 text-[11px] font-semibold">Your details stay yours</span>
      </div>
    </>
  ),
  scan: () => (
    <>
      <div className="relative mx-auto flex aspect-square w-[78%] items-center justify-center rounded-2xl bg-seg-soft">
        {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "right-2 bottom-2 border-r-2 border-b-2"].map((c) => (
          <span key={c} className={cn("absolute size-5 rounded-[3px] border-seg", c)} />
        ))}
        <serviceIcons.qr className="size-16 text-navy/80" strokeWidth={1.5} />
        <span
          className="motion-safe-anim absolute inset-x-5 top-5 h-0.5 rounded-full bg-seg shadow-[0_0_12px_var(--seg)] [--sweep:96px] [animation:scan-sweep_2.8s_ease-in-out_infinite]"
        />
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-[12px] font-semibold text-navy">Participating merchant</p>
        <span className="mx-auto block w-1/2">
          <Bar w="100%" />
        </span>
      </div>
      <Row service="qr" accent />
    </>
  ),
  collection: () => (
    <>
      <div className="rounded-2xl bg-seg-soft p-4">
        <p className="text-[11px] font-semibold text-navy/70">This week</p>
        <div className="mt-3 flex h-24 items-end gap-2">
          {[38, 55, 46, 72, 90].map((h, i) => (
            <span
              key={h}
              className={cn("flex-1 rounded-t-md", i === 4 ? "bg-seg-fill" : "bg-seg/35")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <Row service="cash" accent />
      <Row service="transfer" />
    </>
  ),
  network: (service) => (
    <>
      <div className="relative grid grid-cols-2 gap-2.5 rounded-2xl bg-seg-soft p-3">
        {(["qr", "bills", "atm", "transfer"] as ServiceKey[]).map((k) => {
          const Icon = serviceIcons[k];
          return (
            <span key={k} className="flex aspect-[4/3] flex-col items-start justify-between rounded-xl bg-white p-2.5">
              <Icon className="size-4 text-seg-text" strokeWidth={2} />
              <Bar w="70%" />
            </span>
          );
        })}
        <IconDisc
          icon={<extraIcons.store className="size-4" strokeWidth={2} />}
          className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 ring-4 ring-seg-soft"
        />
      </div>
      <Row service={service} accent />
    </>
  ),
  household: () => (
    <>
      <div className="flex items-center gap-3 rounded-2xl bg-seg-soft p-4">
        <IconDisc icon={<extraIcons.house className="size-5" strokeWidth={2} />} className="size-12" />
        <div className="flex-1 space-y-1.5">
          <p className="text-[12px] font-semibold text-navy">Home essentials</p>
          <Bar w="70%" />
        </div>
      </div>
      <Row service="bills" accent />
      <Row service="bills" />
      <Row service="transfer" />
    </>
  ),
  family: () => (
    <>
      <div className="relative flex h-32 items-end justify-center rounded-2xl bg-seg-soft pb-4">
        <svg className="absolute inset-x-6 top-5 h-16 w-[calc(100%-48px)]" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M10 55 Q 100 -20 190 55" fill="none" stroke="var(--seg)" strokeWidth="2" strokeDasharray="4 5" />
        </svg>
        <div className="flex items-end gap-3">
          <Avatar />
          <Avatar className="size-12" />
          <Avatar />
        </div>
      </div>
      <Row service="transfer" accent />
      <Row service="transfer" />
    </>
  ),
  access: () => (
    <>
      <div className="relative flex h-40 items-center justify-center rounded-2xl bg-seg-soft">
        <span className="motion-safe-anim absolute size-20 rounded-full border-2 border-seg [animation:pulse-ring_2.4s_ease-out_infinite]" />
        <span className="motion-safe-anim absolute size-20 rounded-full border-2 border-seg [animation:pulse-ring_2.4s_ease-out_1.2s_infinite]" />
        <IconDisc icon={<extraIcons.fingerprint className="size-8" strokeWidth={1.5} />} className="size-20" />
      </div>
      <Row service="atm" accent />
    </>
  ),
  trade: () => (
    <div className="space-y-2.5">
      {(["qr", "cash", "transfer"] as ServiceKey[]).map((k, i) => {
        const Icon = serviceIcons[k];
        return (
          <div key={k} className={cn("rounded-2xl p-3", i === 1 ? "bg-seg-fill text-seg-on" : "bg-seg-soft text-navy")}>
            <div className="flex items-center gap-2.5">
              <span className={cn("flex size-8 items-center justify-center rounded-lg", i === 1 ? "bg-white/25" : "bg-white text-seg-text")}>
                <Icon className="size-4" strokeWidth={2} />
              </span>
              <span className="text-[11px] font-semibold">{rowLabels[k]}</span>
            </div>
            <span className={cn("mt-3 block h-1.5 overflow-hidden rounded-full", i === 1 ? "bg-white/30" : "bg-navy/10")}>
              <span className={cn("block h-full rounded-full", i === 1 ? "bg-white" : "bg-seg")} style={{ width: `${40 + i * 22}%` }} />
            </span>
          </div>
        );
      })}
    </div>
  ),
  help: () => (
    <>
      <div className="space-y-2.5 rounded-2xl bg-seg-soft p-3">
        <div className="w-[78%] space-y-1.5 rounded-2xl rounded-bl-md bg-white p-3">
          <Bar w="85%" strong />
          <Bar w="60%" />
        </div>
        <div className="ml-auto flex w-[70%] items-center gap-2 rounded-2xl rounded-br-md bg-seg-fill p-3 text-seg-on">
          <span className="flex-1 space-y-1.5">
            <span className="block h-2 w-[80%] rounded-full bg-current/60" />
            <span className="block h-2 w-[50%] rounded-full bg-current/30" />
          </span>
          <extraIcons.check className="size-4" strokeWidth={2.25} />
        </div>
      </div>
      <Row service="bills" />
      <Row service="transfer" accent />
    </>
  ),
};

export function ScreenConcept({
  kind,
  service,
  caption,
  segmentLabel,
  journeyLabel,
  className,
}: {
  kind: ConceptKind;
  service: ServiceKey;
  caption: string;
  segmentLabel: string;
  journeyLabel: string;
  className?: string;
}) {
  const FloatIcon = serviceIcons[service];
  return (
    <figure
      role="img"
      aria-label={`Abstract ${segmentLabel.toLowerCase()} app concept for ${journeyLabel.toLowerCase()}. Illustrative, not an actual app design.`}
      className={cn(
        "relative isolate flex aspect-[4/3.6] w-full items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-seg-soft dark:bg-surface",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <span className="absolute -top-1/4 -right-1/4 size-[80%] rounded-full bg-seg/25 blur-3xl" />
        <span className="absolute -bottom-1/3 -left-1/4 size-[70%] rounded-full bg-white/60 blur-3xl dark:bg-white/5" />
      </div>
      <span className="absolute top-4 left-4 rounded-[var(--radius-btn)] bg-white/70 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-navy/70 uppercase backdrop-blur">
        App concept
      </span>

      <div
        aria-hidden="true"
        className="relative flex h-[86%] max-h-[440px] aspect-[9/17.5] flex-col overflow-hidden rounded-[28px] border-[5px] border-navy bg-white shadow-[0_30px_60px_-20px_rgba(25,30,48,0.45)]"
      >
        <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
          <PaykaroLogo decorative className="w-8" />
          <span className="h-1.5 w-8 rounded-full bg-navy/10" />
        </div>
        <div className="flex flex-1 flex-col gap-2 px-3 pb-3">{blocks[kind](service)}</div>
        <div className="flex justify-around border-t border-navy/8 py-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("size-1.5 rounded-full", i === 0 ? "bg-seg" : "bg-navy/20")} />
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[5%] bottom-[9%] flex max-w-[58%] items-center gap-2.5 rounded-2xl border border-white/60 bg-white/75 p-2.5 pr-3 shadow-[0_18px_40px_-18px_rgba(25,30,48,0.4)] backdrop-blur-md"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-seg-fill text-seg-on">
          <FloatIcon className="size-4" strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold text-navy/60">PayKaro {segmentLabel}</span>
          <span className="block truncate text-[13px] font-semibold text-navy">{caption}</span>
        </span>
      </div>
    </figure>
  );
}
