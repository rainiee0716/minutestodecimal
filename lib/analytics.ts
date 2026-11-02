// GA4 事件埋点：仅当 gtag 已加载时上报，SSR 安全
type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
