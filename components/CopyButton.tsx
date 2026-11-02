"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 结果一键复制按钮：放在结果色块右上角
export default function CopyButton({
  value,
  location,
}: {
  value: string;
  location: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      trackEvent("copy_result", { location, value });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用（如非安全上下文）时静默失败
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="absolute right-3 top-3 rounded-lg bg-white/15 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-white/25"
      aria-label={`Copy result ${value}`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
