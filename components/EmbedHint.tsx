"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 仅在直接访问 /embed（非 iframe 内）时显示嵌入代码；被第三方 iframe 加载时不渲染
export default function EmbedHint({ mode }: { mode: string }) {
  const [framed, setFramed] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFramed(window.self !== window.top);
  }, []);

  if (framed) return null;

  const snippet = `<iframe src="https://www.minutestodecimal.org/embed?mode=${mode}" style="width:100%;max-width:480px;height:420px;border:0;border-radius:16px" title="Minutes to Decimal Calculator" loading="lazy"></iframe>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      trackEvent("copy_embed_snippet", { mode });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };

  return (
    <section className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
      <h2 className="mb-2 text-sm font-semibold text-ink">Add this calculator to your site</h2>
      <p className="mb-3 text-xs text-muted">
        Free to embed, no attribution required. Paste this anywhere in your HTML:
      </p>
      <textarea
        readOnly
        value={snippet}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-600 focus:outline-none"
        onFocus={(e) => e.currentTarget.select()}
      />
      <button
        type="button"
        onClick={copy}
        className="mt-2 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700"
      >
        {copied ? "Copied ✓" : "Copy embed code"}
      </button>
    </section>
  );
}
