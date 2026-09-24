"use client";

import type { SegmentKey } from "@/lib/content";
import { SiteHeader } from "./header";
import { Hero } from "./hero";
import { Journeys } from "./journeys";
import { PhoneDemo } from "./phone-demo";
import { Community, Faq, GetStarted, PortfolioFacts, Safety, SegmentsOverview, SiteFooter } from "./sections";
import { ServicesBento } from "./services-bento";
import { SiteProvider, useSite } from "./site-context";
import { SiteDialogs } from "./site-dialogs";

function Shell() {
  const { segment } = useSite();
  return (
    <div data-seg={segment} data-theme={segment === "business" ? "dark" : "light"} className="min-h-screen bg-page text-fg">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-[var(--radius-btn)] bg-seg-fill px-4 py-2.5 text-[14px] font-semibold text-seg-on focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <ServicesBento />
        <Journeys />
        <PhoneDemo />
        <PortfolioFacts />
        <Community />
        <Safety />
        <SegmentsOverview />
        <Faq />
        <GetStarted />
      </main>
      <SiteFooter />
      <SiteDialogs />
    </div>
  );
}

export function Site({ initialSegment }: { initialSegment: SegmentKey }) {
  return (
    <SiteProvider initialSegment={initialSegment}>
      <Shell />
    </SiteProvider>
  );
}
