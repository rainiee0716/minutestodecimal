import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { allLongtailSlugs } from "@/lib/longtail";

// 站点最近一次内容更新时间，供爬虫判断抓取优先级
const LAST_MODIFIED = new Date("2026-10-11");
const LONGTAIL_MODIFIED = new Date("2026-10-23");

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/time-to-decimal-calculator`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/weekly-timesheet-calculator`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/hours-to-minutes-calculator`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/minutes-to-hours-converter`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/decimal-to-hours-calculator`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/seconds-to-minutes-converter`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/hours-to-decimal-calculator`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/minutes-to-decimal-chart`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/decimal-to-minutes`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/time-card-rounding-calculator`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/tools`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/time-card-rounding`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/overtime-decimal-hours`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/biweekly-timesheet-guide`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/military-time-on-timesheets`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 程序化长尾页（minutes/seconds/hours 具体数字换算），优先级低于核心工具页
  const longtail: MetadataRoute.Sitemap = allLongtailSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: LONGTAIL_MODIFIED,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...core, ...longtail];
}
