import type { MetadataRoute } from "next";

const BASE = "https://www.minutestodecimal.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/time-to-decimal-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/hours-to-minutes-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/minutes-to-hours-converter`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/decimal-to-hours-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/seconds-to-minutes-converter`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/hours-to-decimal-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/convert-hours-to-decimal`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/minutes-to-decimal-hours-converter`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
