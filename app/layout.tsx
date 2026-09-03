import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXX in .env.local (or Vercel env) once your
// AdSense account is approved. Until then, no ad script is injected.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.minutestodecimal.org"),
  title: {
    default: "Minutes to Decimal Converter — Free Time Card Calculator",
    template: "%s | minutestodecimal.org",
  },
  description:
    "Convert hours and minutes into decimal time for payroll and timesheets. Free, instant, no sign-up required.",
  applicationName: "Minutes to Decimal Converter",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "minutestodecimal.org",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        {ADSENSE_CLIENT && (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <SiteFooter />
      </body>
    </html>
  );
}
