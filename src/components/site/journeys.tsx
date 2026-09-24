"use client";

import { segments } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSite } from "./site-context";
import { Eyebrow, Panel, Reveal, TextAction, extraIcons } from "./primitives";
import { ScreenConcept } from "./screen-concept";

export function Journeys() {
  const { segment, openDialog, showDemo } = useSite();
  const s = segments[segment];

  return (
    <Panel id="journeys" tone="light" labelledBy="journeys-title" className="pt-20 pb-24 sm:pt-28 sm:pb-32">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <Eyebrow>{s.eyebrow} journeys</Eyebrow>
        <h2 id="journeys-title" className="mt-3 text-[38px] leading-[1.02] font-semibold sm:text-[56px]">
          {s.journeysTitle[0]}
          <br />
          {s.journeysTitle[1]}
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-fg-muted">{s.journeysIntro}</p>
      </Reveal>

      <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
        {s.journeys.map((j, i) => {
          const demoKey = j.services.find((k): k is "transfer" | "bills" | "qr" | "atm" =>
            ["transfer", "bills", "qr", "atm"].includes(k),
          );
          return (
            <article
              key={`${segment}-${j.id}`}
              id={j.id}
              aria-labelledby={`${j.id}-title`}
              className="grid scroll-mt-[calc(var(--header-h)+24px)] items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <ScreenConcept
                  kind={j.concept.kind}
                  service={j.concept.service}
                  caption={j.concept.caption}
                  segmentLabel={s.label}
                  journeyLabel={j.nav}
                />
              </Reveal>
              <Reveal delay={80}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-page font-heading text-[14px] font-semibold text-seg-text">
                    0{i + 1}
                  </span>
                  <p className="text-[14px] font-semibold text-fg-muted">{j.nav}</p>
                </div>
                <h3 id={`${j.id}-title`} className="mt-6 text-[32px] leading-[1.08] font-semibold sm:text-[40px]">
                  {j.title[0]}
                  <br />
                  {j.title[1]}
                </h3>
                <p className="mt-5 max-w-[500px] text-[17px] leading-relaxed text-fg-muted">{j.copy}</p>
                <ul className="mt-7 max-w-[500px] divide-y divide-hairline border-y border-hairline">
                  {j.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 py-3.5 text-[15px] font-medium">
                      <extraIcons.check className="size-[18px] shrink-0 text-seg-text" strokeWidth={2} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
                  {demoKey && <TextAction onClick={() => showDemo(demoKey)}>See how it works</TextAction>}
                  {j.partner ? (
                    <TextAction onClick={() => openDialog({ type: "info", key: "retail" })}>
                      Explore retail partnerships
                    </TextAction>
                  ) : (
                    <TextAction onClick={() => openDialog({ type: "service", key: j.services[0] })}>
                      View service details
                    </TextAction>
                  )}
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}
