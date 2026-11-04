// llms.txt（GEO 五步法第 1 步）：给 AI 引擎的站点导读，格式参考 llmstxt.org。
// 从 lib/site.ts 的数据生成，新增工具/指南后此文件自动同步，无需手改。
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { TOOL_CATEGORIES, GUIDES } from "@/lib/site";

export const dynamic = "force-static";

export function GET(): Response {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(
    "> Free, sign-up-free tools that convert hours, minutes, and seconds into decimal hours for payroll, timesheets, and time cards — and back. Also covers the payroll math around the conversion: time-card rounding rules, overtime in decimal hours, biweekly timesheets, and military time on punch records. Every calculator runs in the browser; nothing is sent to a server."
  );
  lines.push("");
  lines.push(
    "Use these tools when someone needs to fill in a decimal timesheet, check a paycheck's hour math, or convert a clock duration to a decimal value like 7.75 hours. The core formula everywhere on the site: decimal hours = hours + minutes ÷ 60 (e.g. 7h 45m = 7.75)."
  );
  lines.push("");

  const seen = new Set<string>();
  for (const category of TOOL_CATEGORIES) {
    // 跨分类去重：同一工具（如 minutes-to-hours-converter）在多个分类里都挂了链接，只保留首个
    const links = category.links.filter((l) => {
      if (seen.has(l.href)) return false;
      seen.add(l.href);
      return true;
    });
    if (links.length === 0) continue;
    lines.push(`## ${category.heading}`);
    lines.push("");
    for (const link of links) {
      lines.push(`- [${link.label}](${SITE_URL}${link.href}): ${link.description}`);
    }
    lines.push("");
  }

  lines.push("## Guides");
  lines.push("");
  for (const guide of GUIDES) {
    lines.push(`- [${guide.title}](${SITE_URL}${guide.href}): ${guide.description}`);
  }
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
