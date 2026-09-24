import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { PaykaroLogoDefs } from "@/components/brand/paykaro-logo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PayKaro | Banking, aasani say",
  description:
    "PayKaro brings domestic transfers, bill payments, Raast QR and assisted cash access closer to people, families, businesses and communities across Pakistan.",
};

export const viewport: Viewport = {
  themeColor: "#191e30",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body data-seg="personal" data-theme="light" suppressHydrationWarning>
        <PaykaroLogoDefs />
        {children}
      </body>
    </html>
  );
}
