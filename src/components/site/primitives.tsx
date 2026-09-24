"use client";

import {
  ArrowLeftRight,
  Banknote,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  CreditCard,
  Fingerprint,
  House,
  LockKeyhole,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Sprout,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { segmentPath, type SegmentKey, type ServiceKey } from "@/lib/content";
import { useSite } from "./site-context";

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  transfer: ArrowLeftRight,
  bills: ReceiptText,
  qr: QrCode,
  atm: CreditCard,
  cash: Banknote,
  takaful: ShieldCheck,
};

export const extraIcons = {
  fingerprint: Fingerprint,
  lock: LockKeyhole,
  help: CircleHelp,
  check: CircleCheck,
  receipt: ReceiptText,
  shield: ShieldCheck,
  house: House,
  users: Users,
  store: Store,
  sprout: Sprout,
} satisfies Record<string, LucideIcon>;

export function Chevron({ className }: { className?: string }) {
  return <ChevronRight aria-hidden="true" strokeWidth={1.75} className={cn("size-4 shrink-0", className)} />;
}

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

type Variant = "primary" | "outline" | "ghost-light" | "navy";

const variantClass: Record<Variant, string> = {
  primary: "bg-seg-fill text-seg-on hover:brightness-[1.06]",
  outline: "border border-current/30 text-fg hover:border-current/70",
  "ghost-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  navy: "bg-navy text-white hover:bg-[#232940]",
};

export function buttonClass(variant: Variant = "primary", size: "md" | "sm" = "md") {
  return cn(
    "group inline-flex items-center justify-center gap-3 rounded-[var(--radius-btn)] font-semibold whitespace-nowrap select-none",
    "transition-[background-color,border-color,filter] duration-200",
    size === "md" ? "h-12 px-5 text-[15px]" : "h-10 px-4 text-sm",
    variantClass[variant],
  );
}

export function ActionButton({
  variant = "primary",
  size = "md",
  label,
  chevron = true,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "md" | "sm";
  label: string;
  chevron?: boolean;
}) {
  return (
    <button type="button" className={cn(buttonClass(variant, size), className)} {...props}>
      <Roll>{label}</Roll>
      {chevron && <Chevron className="chev-shift" />}
    </button>
  );
}

function isPlainClick(e: React.MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

export function SegmentLink({
  segment,
  hash,
  onNavigate,
  children,
  ...props
}: Omit<ComponentProps<"a">, "href"> & {
  segment: SegmentKey;
  hash?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const site = useSite();
  const href = segmentPath(segment) + (hash ? `#${hash}` : "");
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (e.defaultPrevented || !isPlainClick(e)) return;
        e.preventDefault();
        onNavigate?.();
        site.navigate(segment, hash);
      }}
    >
      {children}
    </a>
  );
}

export function SegmentButtonLink({
  segment,
  hash,
  label,
  variant = "primary",
  size = "md",
  className,
}: {
  segment: SegmentKey;
  hash?: string;
  label: string;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <SegmentLink segment={segment} hash={hash} className={cn(buttonClass(variant, size), className)}>
      <Roll>{label}</Roll>
      <Chevron className="chev-shift" />
    </SegmentLink>
  );
}

export function TextAction({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-[var(--radius-btn)] text-[15px] font-semibold text-seg-text underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <Chevron className="chev-shift size-4" />
    </button>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Full-width section with Ummah-style rounded top that overlaps the previous one. */
export function Panel({
  id,
  tone = "light",
  className,
  innerClassName,
  children,
  labelledBy,
  overlap = true,
}: {
  id?: string;
  tone?: "light" | "page" | "dark" | "tint";
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
  overlap?: boolean;
}) {
  const { segment } = useSite();
  const dark = tone === "dark";
  const navy = dark && segment !== "business";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={dark ? "dark" : undefined}
      data-tone={navy ? "navy" : undefined}
      className={cn(
        "relative",
        overlap && "-mt-8 rounded-t-[var(--radius-panel)]",
        tone === "light" && "bg-surface",
        tone === "page" && "bg-page",
        tone === "tint" && "bg-page bg-[linear-gradient(var(--tint),var(--tint))]",
        dark && (navy ? "bg-navy text-fg" : "bg-[#121214] text-fg"),
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", innerClassName)}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[13px] font-semibold tracking-[0.02em] text-seg-text", className)}>{children}</p>
  );
}
