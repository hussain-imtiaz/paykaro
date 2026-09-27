"use client";

import { segments } from "@/lib/content";
import type { Route } from "@/lib/routes";
import { routeKey } from "@/lib/routes";
import { ChairmanPage, CompanyPage, LeadershipPage } from "./about";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { SmoothScroll } from "./motion";
import { MobileNav } from "./nav";
import { AgriPage } from "./page-agri";
import { AssistedPage } from "./page-assisted";
import { BusinessPage } from "./page-business";
import { FamilyPage } from "./page-family";
import { PersonalPage } from "./page-personal";
import { IconGradientDefs, Network, Principles, Story } from "./sections-a";
import { ClarityAndDemo, ServiceTabs } from "./sections-b";
import { ConceptShowcase, LocalByDefault, Safety, SiteFooter, UpdatesAndFaq } from "./sections-c";
import { SiteProvider, useSite } from "./site-context";
import { SiteDialogs } from "./site-dialogs";

function HomePage() {
  const { scrollToSection, openDialog } = useSite();
  return (
    <>
      <div>
        <Hero
          image={segments.personal.image}
          imagePosition={segments.personal.imagePosition}
          eyebrow="PayKaro · Banking and digital services for Pakistan"
          title={["Banking,", "aasani say."]}
          description="Transfers, bill payments, Raast QR and assisted cash access, for people, families, businesses and communities across Pakistan."
          actions={[
            { label: "Find your PayKaro", onClick: () => scrollToSection("segments") },
            { label: "Get started", onClick: () => openDialog({ type: "info", key: "onboarding" }) },
          ]}
        />
        <Intro />
      </div>
      <Principles />
      <Network />
      <Story />
      <ServiceTabs />
      <ClarityAndDemo />
      <Safety />
      <LocalByDefault />
      <UpdatesAndFaq />
      <ConceptShowcase />
    </>
  );
}

function Page({ route }: { route: Route }) {
  if (route.kind === "home") return <HomePage />;
  if (route.kind === "about") {
    if (route.key === "company") return <CompanyPage />;
    if (route.key === "chairmans-message") return <ChairmanPage />;
    return <LeadershipPage />;
  }
  switch (route.key) {
    case "personal":
      return <PersonalPage />;
    case "business":
      return <BusinessPage />;
    case "family":
      return <FamilyPage />;
    case "agri":
      return <AgriPage />;
    case "assisted":
      return <AssistedPage />;
  }
}

function Shell() {
  const { route, segment } = useSite();
  const dark = route.kind === "segment" && route.key === "business";
  return (
    <div data-seg={segment} data-theme={dark ? "dark" : "light"} className="min-h-screen bg-night text-ink">
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
        <Page key={routeKey(route)} route={route} />
      </main>
      <SiteFooter />
      <SiteDialogs />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}

export function Site({ initialRoute }: { initialRoute: Route }) {
  return (
    <SiteProvider initialRoute={initialRoute}>
      <Shell />
    </SiteProvider>
  );
}
