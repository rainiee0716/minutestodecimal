import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI 爬虫显式放行（GEO 五步法第 1 步）：
// 全局 * 已允许一切，这里逐个点名是为了——
//   1. 未来若加默认拒绝规则，AI 抓取不会被误伤；
//   2. 服务器日志里能按 UA 区分各 AI 的抓取频率。
// OAI-SearchBot 管 ChatGPT 搜索收录（走 Bing 索引），ChatGPT-User 管 ChatGPT 内点击。
const AI_CRAWLERS = [
  "GPTBot", // OpenAI 训练
  "OAI-SearchBot", // ChatGPT 搜索
  "ChatGPT-User", // ChatGPT 用户点击
  "ClaudeBot", // Anthropic 训练
  "Claude-User", // Claude 用户点击
  "Claude-SearchBot", // Claude 搜索
  "PerplexityBot", // Perplexity 索引
  "Perplexity-User", // Perplexity 用户点击
  "Google-Extended", // Gemini 训练
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Alexa
  "Meta-ExternalAgent", // Meta AI
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...AI_CRAWLERS], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
