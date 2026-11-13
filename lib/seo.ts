import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.minutestodecimal.org";

export const SITE_NAME = "minutestodecimal.org";

export const OG_IMAGE = `${SITE_URL}/og.png`;

// GA4 Measurement ID is public, so it is safe to keep in source code.
// The environment variable remains available as an override for future deployments.
export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "G-BNLGTS6BZJ";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  /** 西语对应页路径（如 "/es/20-minutos-a-decimales"）：传入即生成互惠 hreflang */
  esPath?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  esPath,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;

  const languages: Record<string, string> = esPath
    ? { en: url, es: `${SITE_URL}${esPath}`, "x-default": url }
    : {};

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: esPath ? "es_MX" : "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
