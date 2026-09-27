"use client";

import { MotionConfig } from "motion/react";
import type { Route } from "@/lib/routes";
import { routeKey } from "@/lib/routes";
import { ChairmanPage, CompanyPage, DigbexPage, LeadershipPage } from "./about";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { SmoothScroll } from "./motion";
import { MobileNav } from "./nav";
import { AppPage } from "./page-app";
import { BusinessPage } from "./page-business";
import { HelpPage } from "./page-help";
import { IndividualsPage } from "./page-individuals";
import { PartnersPage } from "./page-partners";
import { TrustPage } from "./page-trust";
import { DigbexPrinciples, IconGradientDefs, Scenarios, Story } from "./sections-a";
import { ClarityAndDemo, ServiceTabs } from "./sections-b";
import { ConceptShowcase, LocalByDefault, Safety, SiteFooter, WhereNextAndFaq } from "./sections-c";
import { SiteProvider, useSite } from "./site-context";
import { SiteDialogs } from "./site-dialogs";

/** Brief s6: lead with the problem and the experience, then service families and use cases. */
function HomePage() {
  const { openDialog, navigate } = useSite();
  return (
    <>
      <div>
        <Hero
          image="/images/personal.webp"
          imagePosition="58% 40%"
          eyebrow="PayKaro · Built for Pakistan"
          title={["Everyday money,", "done in moments."]}
          description="No branch, no queue, no crowded menus. Do what you came to do, understand every step, and always know what’s next."
          actions={[
            { label: "Get PayKaro", onClick: () => openDialog({ type: "info", key: "getpaykaro" }) },
            { label: "Explore for Business", onClick: () => navigate("business") },
          ]}
        />
        <Intro />
      </div>
      <DigbexPrinciples compact />
      <Scenarios />
      <Story />
      <ServiceTabs />
      <ClarityAndDemo />
      <Safety />
      <LocalByDefault />
      <WhereNextAndFaq />
      <ConceptShowcase />
    </>
  );
}

function Page({ route }: { route: Route }) {
  switch (route.kind) {
    case "home":
      return <HomePage />;
    case "segment":
      return route.key === "individuals" ? <IndividualsPage /> : route.key === "business" ? <BusinessPage /> : <PartnersPage />;
    case "page":
      return route.key === "app" ? <AppPage /> : route.key === "trust" ? <TrustPage /> : <HelpPage />;
    case "about":
      if (route.key === "company") return <CompanyPage />;
      if (route.key === "digbex") return <DigbexPage />;
      if (route.key === "chairmans-message") return <ChairmanPage />;
      return <LeadershipPage />;
  }
}

function Shell() {
  const { route, segment } = useSite();
  const dark = route.kind === "segment" && route.key === "business";
  return (
    <div data-seg={segment} data-theme={dark ? "dark" : "light"} className="min-h-screen bg-night text-ink">
      <SmoothScroll />
      <IconGradientDefs />
      <a href="#main-content" className="pill fixed top-3 left-3 z-[70] h-10 -translate-y-20 bg-seg-fill px-5 text-seg-on focus:translate-y-0">
        Skip to content
      </a>
      <MobileNav />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Page key={routeKey(route)} route={route} />
      </main>
      <SiteFooter />
      <SiteDialogs />
      <div className="grain max-lg:hidden" aria-hidden="true" />
    </div>
  );
}

export function Site({ initialRoute }: { initialRoute: Route }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteProvider initialRoute={initialRoute}>
        <Shell />
      </SiteProvider>
    </MotionConfig>
  );
}
