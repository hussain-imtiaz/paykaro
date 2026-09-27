import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Site } from "@/components/site/site";
import { withBase } from "@/lib/base-path";
import { ALL_ROUTES, parseRoute, routeDescription, routePath, routeSegment, routeTitle } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_ROUTES.map((r) => ({ slug: routePath(r).split("/").filter(Boolean) }));
}

async function resolve(params: PageProps<"/[[...slug]]">["params"]) {
  const route = parseRoute((await params).slug);
  if (!route) notFound();
  return route;
}

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const route = await resolve(params);
  return {
    title: routeTitle(route),
    description: routeDescription(route),
    icons: { icon: withBase(`/brand/logo-${routeSegment(route)}.svg`) },
  };
}

export default async function Page({ params }: PageProps<"/[[...slug]]">) {
  const route = await resolve(params);
  return <Site initialRoute={route} />;
}
