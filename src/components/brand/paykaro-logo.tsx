import { cn } from "@/lib/utils";
import { WORDMARK_GROUP, WORDMARK_SYMBOL_ID, WORDMARK_VIEWBOX } from "./wordmark-data";

/**
 * Rendered once in the root layout. Every <PaykaroLogo> references it, so the
 * 25 KB path data is not duplicated. Colours come from --logo-base (backing
 * shape) and --logo-face (glyphs), which segment tokens set.
 */
export function PaykaroLogoDefs() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs dangerouslySetInnerHTML={{ __html: WORDMARK_GROUP }} />
    </svg>
  );
}

export function PaykaroLogo({
  className,
  title = "PayKaro",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={cn("block h-auto", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      <use href={`#${WORDMARK_SYMBOL_ID}`} />
    </svg>
  );
}
