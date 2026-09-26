import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "paper" | "card" | "night" | "black" | "tint" | "hero" | "clear";

const toneBg: Record<Tone, string> = {
  paper: "var(--paper)",
  card: "var(--card)",
  night: "#171717",
  black: "#0b0b0b",
  tint: "var(--tint)",
  hero: "#2b2b2b",
  clear: "transparent",
};

/**
 * A full-width section. When rounded, the corners reveal the neighbouring sections'
 * colours (`above` for the top corners, `below` for the bottom ones), as on the reference.
 */
export function SheetSection({
  id,
  tone,
  above,
  below,
  roundTop = false,
  roundBottom = false,
  className,
  children,
  labelledBy,
  dark,
  raised,
}: {
  id?: string;
  tone: Tone;
  above?: Tone;
  below?: Tone;
  roundTop?: boolean;
  roundBottom?: boolean;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  dark?: boolean;
  /** Stack above a pinned section it scrolls over. */
  raised?: boolean;
}) {
  const top = toneBg[above ?? tone];
  const bottom = toneBg[below ?? tone];
  return (
    <div
      className={cn(raised && "relative z-10")}
      style={{ background: `linear-gradient(to bottom, ${top} 0 50%, ${bottom} 50% 100%)` }}
    >
      <section
        id={id}
        aria-labelledby={labelledBy}
        data-theme={dark ? "dark" : undefined}
        className={cn(
          "relative overflow-clip",
          roundTop && "rounded-t-[var(--radius-sheet)]",
          roundBottom && "rounded-b-[var(--radius-sheet)]",
          dark && "text-white",
          className,
        )}
        style={{ background: toneBg[tone] }}
      >
        {children}
      </section>
    </div>
  );
}
