import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Oswald, Zalando_Sans } from "next/font/google";
import "@fontsource/apfel-grotezk/400.css";
import "@fontsource/apfel-grotezk/700.css";
import { PaykaroLogoDefs } from "@/components/brand/paykaro-logo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], display: "swap" });
const zalando = Zalando_Sans({ variable: "--font-zalando", subsets: ["latin"], display: "swap", adjustFontFallback: false });

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
      className={`${bricolage.variable} ${oswald.variable} ${zalando.variable}`}
      suppressHydrationWarning
    >
      <body data-seg="personal" data-theme="light" suppressHydrationWarning>
        <PaykaroLogoDefs />
        {children}
      </body>
    </html>
  );
}
