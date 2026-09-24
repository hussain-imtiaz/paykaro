import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Site } from "@/components/site/site";
import { SEGMENT_KEYS, isSegmentKey, segments, type SegmentKey } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ segment: [] }, ...SEGMENT_KEYS.filter((k) => k !== "personal").map((k) => ({ segment: [k] }))];
}

function resolve(segment: string[] | undefined): SegmentKey {
  if (!segment || segment.length === 0) return "personal";
  if (segment.length === 1 && isSegmentKey(segment[0]) && segment[0] !== "personal") return segment[0];
  notFound();
}

export async function generateMetadata({ params }: PageProps<"/[[...segment]]">): Promise<Metadata> {
  const key = resolve((await params).segment);
  const s = segments[key];
  return {
    title: `PayKaro ${s.label} | Banking, aasani say`,
    description: s.description,
    icons: { icon: `/brand/logo-${key}.svg` },
  };
}

export default async function Page({ params }: PageProps<"/[[...segment]]">) {
  const key = resolve((await params).segment);
  return <Site initialSegment={key} />;
}
