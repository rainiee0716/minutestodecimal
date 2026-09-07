import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Minutes to Decimal Converter — Free Time Card Calculator",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Convert hours and minutes into decimal time for payroll and timesheets. Free, instant, no sign-up required.",
  applicationName: "Minutes to Decimal Converter",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Minutes to Decimal Converter — Free Timesheet & Payroll Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <GoogleAnalytics />
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
        <JsonLd data={siteSchema} />
      </body>
    </html>
  );
}
