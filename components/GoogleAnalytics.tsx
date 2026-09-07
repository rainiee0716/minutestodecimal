"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA4_MEASUREMENT_ID } from "@/lib/seo";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const measurementId = GA4_MEASUREMENT_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId) return;
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [measurementId, pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
