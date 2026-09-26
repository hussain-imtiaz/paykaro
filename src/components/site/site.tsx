"use client";

import type { SegmentKey } from "@/lib/content";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { SmoothScroll } from "./motion";
import { MobileNav } from "./nav";
import { IconGradientDefs, Network, Principles, Story } from "./sections-a";
import { ClarityAndDemo, ServiceTabs } from "./sections-b";
import { ConceptShowcase, LocalByDefault, Safety, SiteFooter, UpdatesAndFaq } from "./sections-c";
import { SiteProvider, useSite } from "./site-context";
import { SiteDialogs } from "./site-dialogs";

function Shell() {
  const { segment } = useSite();
  return (
    <div data-seg={segment} data-theme={segment === "business" ? "dark" : "light"} className="min-h-screen bg-night text-ink">
      <SmoothScroll />
      <IconGradientDefs />
      <a
        href="#main-content"
        className="pill fixed top-3 left-3 z-[70] h-10 -translate-y-20 bg-seg-fill px-5 text-seg-on focus:translate-y-0"
      >
        Skip to content
      </a>
      <MobileNav />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Intro />
        <Principles />
        <Network />
        <Story />
        <ServiceTabs />
        <ClarityAndDemo />
        <Safety />
        <LocalByDefault />
        <UpdatesAndFaq />
        <ConceptShowcase />
      </main>
      <SiteFooter />
      <SiteDialogs />
      <div className="grain" aria-hidden="true" />
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
