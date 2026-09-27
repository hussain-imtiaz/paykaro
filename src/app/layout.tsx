import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Noto_Nastaliq_Urdu, Oswald, Zalando_Sans } from "next/font/google";
import localFont from "next/font/local";
import "@fontsource/apfel-grotezk/400.css";
import "@fontsource/apfel-grotezk/700.css";
import { PaykaroLogoDefs } from "@/components/brand/paykaro-logo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], display: "swap" });
const zalando = Zalando_Sans({ variable: "--font-zalando", subsets: ["latin"], display: "swap", adjustFontFallback: false });
const urdu = Noto_Nastaliq_Urdu({ variable: "--font-urdu", subsets: ["arabic"], weight: ["400", "600"], display: "swap", preload: false });
// Clash Display (Indian Type Foundry, ITF Free Font License, see fonts/ClashDisplay-LICENSE.txt).
const clash = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600" },
  ],
});

export const metadata: Metadata = {
  title: "PayKaro | Everyday money, built for Pakistan",
  description:
    "PayKaro is a digital financial experience built for Pakistan: immediate, understandable, self-service and human. For individuals, businesses and partners.",
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${oswald.variable} ${zalando.variable} ${clash.variable} ${urdu.variable}`}
      suppressHydrationWarning
    >
      <body data-seg="individuals" data-theme="light" suppressHydrationWarning>
        <PaykaroLogoDefs />
        {children}
      </body>
    </html>
  );
}
