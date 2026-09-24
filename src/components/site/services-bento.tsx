"use client";

import Image from "next/image";
import { SERVICE_ORDER, demos, segments, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { Chevron, Eyebrow, Panel, Reveal, TextAction, extraIcons, serviceIcons } from "./primitives";

export function ServicesBento() {
  const { segment, openDialog } = useSite();
  const s = segments[segment];
  const checks = demos[s.demo].checks;

  return (
    <Panel id="services" tone="page" labelledBy="services-title" className="pt-20 pb-24 sm:pt-24 sm:pb-28">
      <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Eyebrow>{s.eyebrow} services</Eyebrow>
          <h2 id="services-title" className="mt-3 text-[34px] leading-[1.06] font-semibold sm:text-[46px]">
            {s.heading[0]}
            <br />
            {s.heading[1]}
          </h2>
        </div>
        <p className="max-w-[440px] text-[17px] leading-relaxed text-fg-muted lg:justify-self-end">{s.intro}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {s.products.map((key, i) => {
          const Icon = serviceIcons[key];
          const svc = services[key];
          return (
            <Reveal key={`${segment}-${key}`} delay={i * 70} as="article" className="flex">
              <div className="flex w-full flex-col rounded-[var(--radius-card)] bg-surface p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-seg-fill text-seg-on">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-heading text-[13px] font-semibold text-fg-muted">0{i + 1}</span>
                </div>
                <p className="mt-10 text-[13px] font-semibold text-seg-text">{svc.tag}</p>
                <h3 className="mt-2 text-[24px] leading-tight font-semibold">{svc.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">{svc.description}</p>
                <TextAction className="mt-7 self-start" onClick={() => openDialog({ type: "service", key })}>
                  Explore {svc.short.toLowerCase()}
                </TextAction>
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={60} className="md:col-span-2 lg:col-span-2">
          <div className="grid h-full gap-8 rounded-[var(--radius-card)] bg-surface p-7 sm:p-8 md:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col">
              <h3 className="text-[24px] leading-tight font-semibold">The PayKaro service portfolio</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                Six directions, from everyday transfers to assisted cash access. Availability and eligibility are
                confirmed service by service.
              </p>
              <TextAction className="mt-auto self-start pt-6" onClick={() => openDialog({ type: "all-services" })}>
                View all services
              </TextAction>
            </div>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SERVICE_ORDER.map((key) => {
                const Icon = serviceIcons[key];
                const planned = services[key].planned;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => openDialog({ type: "service", key })}
                      className={cn(
                        "group flex h-full w-full flex-col items-start gap-5 rounded-2xl p-3.5 text-left transition-colors",
                        planned ? "border border-dashed border-hairline" : "bg-page hover:bg-seg-soft hover:text-navy",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-xl",
                          planned ? "bg-page text-fg-muted" : "bg-seg-fill text-seg-on",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="text-[13px] leading-snug font-semibold">
                        {services[key].short}
                        {planned && <span className="mt-1 block text-[12px] font-medium text-fg-muted">Planned</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120} className="grid gap-4 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          <div className="relative min-h-[260px] overflow-hidden rounded-[var(--radius-card)] bg-navy">
            <Image
              src={s.photo.image}
              alt={s.photo.alt}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: s.photo.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-navy/45 p-3 text-white backdrop-blur-md">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-seg-fill text-seg-on">
                <extraIcons.users className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[12px] font-medium text-white/75">{s.photo.label}</span>
                <span className="block text-[15px] leading-snug font-semibold">{s.photo.note}</span>
              </span>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] bg-surface p-6">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-semibold">Before you confirm</p>
              <span className="rounded-[var(--radius-btn)] bg-page px-2 py-1 text-[11px] font-semibold text-fg-muted">
                A good habit
              </span>
            </div>
            <ul className="mt-4 divide-y divide-hairline rounded-xl border border-hairline">
              {[...checks, "Keep your receipt"].map((c) => (
                <li key={c} className="flex items-center justify-between px-3.5 py-2.5 text-[14px]">
                  {c}
                  <extraIcons.check className="size-4 text-seg-text" strokeWidth={2} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="group mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-seg-text hover:underline"
              onClick={() => openDialog({ type: "info", key: "fees" })}
            >
              Fees and eligibility <Chevron className="chev-shift size-3.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </Panel>
  );
}
