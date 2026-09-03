import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXX in .env.local (or Vercel env) once your
// AdSense account is approved. Until then, no ad script is injected.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://minutestodecimal.org"),
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
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="container flex items-center justify-between py-3">
            <a href="/" className="text-lg font-bold text-brand no-underline">
              minutestodecimal<span className="text-brand-dark">.org</span>
            </a>
            <nav className="flex gap-4 text-sm text-muted">
              <a href="/time-to-decimal-calculator" className="no-underline hover:text-brand">
                Time to Decimal
              </a>
              <a href="/about" className="no-underline hover:text-brand">
                About
              </a>
              <a href="/contact" className="no-underline hover:text-brand">
                Contact
              </a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        {ADSENSE_CLIENT && (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <footer className="border-t border-slate-200 bg-white">
          <div className="container flex flex-wrap gap-4 py-6 text-sm text-muted">
            <a href="/privacy" className="no-underline hover:text-brand">
              Privacy Policy
            </a>
            <a href="/about" className="no-underline hover:text-brand">
              About
            </a>
            <a href="/contact" className="no-underline hover:text-brand">
              Contact
            </a>
            <span>© {new Date().getFullYear()} minutestodecimal.org</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
