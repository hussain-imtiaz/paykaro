/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

export type PartnerKey = "1link" | "raast";

/**
 * Official marks, unmodified, from the owners' own websites:
 * - 1LINK: https://1link.net.pk/assets/images/logo.png (colour) and
 *   https://1link.net.pk/assets/images/footer-main-logo.png (white). 1link.net.pk publishes no SVG.
 * - Raast: https://www.sbp.org.pk/assets/images/raast-logo.svg (State Bank of Pakistan).
 * Both are third-party trademarks shown only to name the payment rails PayKaro's services use.
 */
const partners: Record<PartnerKey, { name: string; src: string; srcOnDark?: string; width: number; height: number }> = {
  "1link": { name: "1LINK", src: "/partners/1link.png", srcOnDark: "/partners/1link-white.png", width: 120, height: 114 },
  raast: { name: "Raast", src: "/partners/raast.svg", width: 128, height: 132 },
};

/** A partner mark sized by height. `chip` sets it on a white tile so the colour mark reads on any surface. */
export function PartnerLogo({
  partner,
  className,
  chip = false,
  onDark = false,
  decorative = false,
}: {
  partner: PartnerKey;
  className?: string;
  chip?: boolean;
  onDark?: boolean;
  decorative?: boolean;
}) {
  const p = partners[partner];
  const src = onDark && !chip && p.srcOnDark ? p.srcOnDark : p.src;
  const img = (
    <img
      src={src}
      alt={decorative ? "" : `${p.name} logo`}
      width={p.width}
      height={p.height}
      loading="lazy"
      decoding="async"
      className={cn("block h-full w-auto object-contain", !chip && className)}
    />
  );
  if (!chip) return img;
  return (
    <span className={cn("inline-flex items-center justify-center rounded-[14px] bg-white p-2 shadow-[0_1px_0_rgba(0,0,0,0.06)]", className)}>{img}</span>
  );
}

export const partnerName = (k: PartnerKey) => partners[k].name;
