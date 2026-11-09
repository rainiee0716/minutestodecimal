// GA4 事件埋点：gtag.js 就绪前触发的事件先入队，脚本加载完成后补发（否则慢网络下首屏交互会丢）
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __gaEvtQueue?: [string, EventParams][];
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  // gtag.js 未就绪（慢网络首屏）：入队等待补发
  window.__gaEvtQueue = window.__gaEvtQueue || [];
  window.__gaEvtQueue.push([name, params]);
}

// gtag.js 加载完成后由 GoogleAnalytics 的 Script onLoad 调用
export function flushQueuedEvents() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  const queue = window.__gaEvtQueue;
  if (!queue || queue.length === 0) return;
  window.__gaEvtQueue = [];
  for (const [name, params] of queue) {
    window.gtag("event", name, params);
  }
}
