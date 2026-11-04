"use client";

// AI 流量归因（GEO 五步法第 4 步）：
// AI 助手带来的访客 referrer 含来源域名，命中即打 ai_visit 事件。
// GA4 后台即可用 ai_source 维度单独看各 AI 的导流量能力，不再混进 direct/referral。
// 局限：部分 AI 点击会剥掉 referrer，这类会落进 (direct)，属已知盲区。

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const AI_SOURCES: [RegExp, string][] = [
  [/chatgpt\.com|chat\.openai\.com/i, "chatgpt"],
  [/perplexity\.ai/i, "perplexity"],
  [/claude\.ai|anthropic\.com/i, "claude"],
  [/gemini\.google\.com/i, "gemini"],
  [/copilot\.microsoft\.com/i, "copilot"],
  [/grok\.com/i, "grok"],
  [/meta\.ai/i, "meta_ai"],
  [/poe\.com/i, "poe"],
  [/you\.com/i, "you"],
];

const SESSION_KEY = "ai_visit_tracked";

export default function AiReferralTracker() {
  useEffect(() => {
    const ref = document.referrer;
    if (!ref) return;
    const hit = AI_SOURCES.find(([pattern]) => pattern.test(ref));
    if (!hit) return;
    try {
      // 每会话只记一次，AI 内部多次跳转不重复计数
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // 隐私模式下 sessionStorage 不可用，照常上报
    }
    trackEvent("ai_visit", {
      ai_source: hit[1],
      referrer_url: ref,
    });
  }, []);

  return null;
}
