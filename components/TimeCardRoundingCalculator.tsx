"use client";

import { useState } from "react";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 text-lg transition focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-500/15 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const resultBoxClass =
  "mt-5 rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-5 text-center";
const resultLabelClass = "text-xs font-medium uppercase tracking-wide text-muted";
const outputClass = "mt-1 block text-4xl font-bold tracking-tight text-brand-700 tabular-nums";

function roundTo(n: number, step: number): number {
  const v = Math.round(n / step) * step;
  // Avoid floating point like 7.8500000001
  return Number(v.toFixed(4));
}

export default function TimeCardRoundingCalculator() {
  const [h, setH] = useState("7");
  const [m, setM] = useState("52");

  const hh = parseFloat(h) || 0;
  const mm = parseFloat(m) || 0;
  const totalMin = hh * 60 + mm;
  const dec = totalMin / 60;

  const rules = [
    { label: "Nearest 1/100 hour", value: roundTo(dec, 0.01) },
    { label: "Nearest 1/10 hour", value: roundTo(dec, 0.1) },
    { label: "Nearest 5 minutes", value: roundTo(dec, 5 / 60) },
    { label: "Nearest 15 minutes (quarter)", value: roundTo(dec, 15 / 60) },
    { label: "Nearest 6 minutes (1/10 hour)", value: roundTo(dec, 6 / 60) },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted">
        Time worked
      </h2>
      <div className="flex items-end gap-3">
        <label className="flex-1">
          <span className={labelClass}>Hours</span>
          <input
            type="number"
            min="0"
            step="1"
            value={h}
            onChange={(e) => setH(e.target.value)}
            className={inputClass}
            aria-label="Hours"
          />
        </label>
        <label className="flex-1">
          <span className={labelClass}>Minutes</span>
          <input
            type="number"
            min="0"
            max="59"
            step="1"
            value={m}
            onChange={(e) => setM(e.target.value)}
            className={inputClass}
            aria-label="Minutes"
          />
        </label>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {rules.map((r) => (
          <div key={r.label} className={resultBoxClass}>
            <span className={resultLabelClass}>{r.label}</span>
            <output className={outputClass} aria-live="polite">
              {r.value.toFixed(2)}
            </output>
          </div>
        ))}
      </div>
    </div>
  );
}
