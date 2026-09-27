import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Oswald, Zalando_Sans } from "next/font/google";
import localFont from "next/font/local";
import "@fontsource/apfel-grotezk/400.css";
import "@fontsource/apfel-grotezk/700.css";
import { PaykaroLogoDefs } from "@/components/brand/paykaro-logo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], display: "swap" });
const zalando = Zalando_Sans({ variable: "--font-zalando", subsets: ["latin"], display: "swap", adjustFontFallback: false });
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
  title: "PayKaro | Banking, aasani say",
  description:
    "PayKaro brings domestic transfers, bill payments, Raast QR and assisted cash access closer to people, families, businesses and communities across Pakistan.",
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${oswald.variable} ${zalando.variable} ${clash.variable}`}
      suppressHydrationWarning
    >
      <body data-seg="personal" data-theme="light" suppressHydrationWarning>
        <PaykaroLogoDefs />
        {children}
      </body>
    </html>
  );
}
