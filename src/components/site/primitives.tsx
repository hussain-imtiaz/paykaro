"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  ChartColumn,
  ChartLine,
  ChartPie,
  ChevronDown,
  CircleCheck,
  Copy,
  CreditCard,
  Crown,
  Eye,
  Gauge,
  Gift,
  Globe,
  Languages,
  LockKeyhole,
  PiggyBank,
  Plug,
  ReceiptText,
  ScanEye,
  ShieldCheck,
  ShoppingBag,
  Signpost,
  Store,
  Tag,
  Target,
  ToggleRight,
  TrendingUp,
  Users,
  Wallet,
  Watch,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SegmentKey, ServiceKey } from "@/lib/content";
import { routePath, type Route } from "@/lib/routes";
import { useSite } from "./site-context";

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  wallet: Wallet,
  cards: CreditCard,
  remittance: Globe,
  wearpay: Watch,
  secured: LockKeyhole,
  dashboard: ChartPie,
  wealth: TrendingUp,
  supersavers: PiggyBank,
  premium: Crown,
  rewards: Gift,
  marketplace: ShoppingBag,
  fraud: ShieldCheck,
  business: Store,
  bizanalytics: ChartColumn,
  merchantanalytics: ChartLine,
  platform: Plug,
};

export const icons = {
  lock: LockKeyhole,
  check: CircleCheck,
  receipt: ReceiptText,
  shield: ShieldCheck,
  users: Users,
  store: Store,
  tag: Tag,
  target: Target,
  copy: Copy,
  focus: ScanEye,
  toggle: ToggleRight,
  signpost: Signpost,
  zap: Zap,
  eye: Eye,
  gauge: Gauge,
  languages: Languages,
  badge: BadgeCheck,
  remit: Globe,
  watch: Watch,
  card: CreditCard,
} satisfies Record<string, LucideIcon>;

export { ArrowUpRight, ChevronDown };

/** Ummah's max-width container: 1580px, 40px gutters on desktop, 16px on mobile. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1580px] px-4 min-[810px]:px-10", className)}>{children}</div>;
}

type PillVariant = "fill" | "outline" | "outline-light";

const pillVariant: Record<PillVariant, string> = {
  fill: "bg-seg-fill text-seg-on",
  outline: "border border-ink/25 text-ink",
  "outline-light": "border border-white/40 text-white",
};

export function pillClass(variant: PillVariant = "fill", size: "md" | "lg" = "md") {
  return cn("pill", pillVariant[variant], size === "md" ? "h-10 px-5 text-[16px]" : "h-11 px-6 text-[16px]");
}

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function PillButton({
  label,
  variant = "fill",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; variant?: PillVariant; size?: "md" | "lg" }) {
  return (
    <button type="button" className={cn(pillClass(variant, size), className)} {...props}>
      <Roll>{label}</Roll>
    </button>
  );
}

function isPlainClick(e: React.MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

type LinkProps = Omit<ComponentProps<"a">, "href"> & { hash?: string; onNavigate?: () => void; children: ReactNode };

/** Client-side link to any page; the page swaps in place, so colours and logo change in the same frame. */
export function RouteLink({ to, hash, onNavigate, children, ref, ...props }: LinkProps & { to: Route }) {
  const site = useSite();
  return (
    <a
      ref={ref}
      href={routePath(to) + (hash ? `#${hash}` : "")}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (e.defaultPrevented || !isPlainClick(e)) return;
        e.preventDefault();
        onNavigate?.();
        site.go(to, hash);
      }}
    >
      {children}
    </a>
  );
}

export function SegmentLink({ segment, ...props }: LinkProps & { segment: SegmentKey }) {
  return <RouteLink to={{ kind: "segment", key: segment }} {...props} />;
}

/** "↗ Label" link, the reference's inline call to action. */
export function ArrowAction({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        "group inline-flex items-center gap-2 rounded-md text-[16px] text-ink transition-colors duration-200 hover:text-seg-ink",
        className,
      )}
      {...props}
    >
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.75}
        className="size-4 text-seg-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      {children}
    </button>
  );
}

/** ⊹ bullet used throughout the reference's lists and dividers. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-block leading-none text-faint-ink", className)}>
      ⊹
    </span>
  );
}

/** Oswald label, e.g. "Ummah Pay Infrastructure" / "Developer-First" on the reference. */
export function OswaldLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-num text-[24px] leading-[0.9] font-medium tracking-[0.02em]", className)}>{children}</p>;
}

/** Divider row: ⊹ ——— action, used under several sections. */
export function DividerCta({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center gap-6 py-16">
      <Sparkle className="text-[20px]" />
      <span className="h-px flex-1 bg-line" />
      {children}
    </div>
  );
}
