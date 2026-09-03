"use client";

import { useState } from "react";

function toDecimal(h: number, m: number): number {
  return Number((h + m / 60).toFixed(4));
}

function toHm(dec: number): { h: number; m: number } {
  const total = Math.round(dec * 60);
  const h = Math.floor(total / 60);
  const m = total - h * 60;
  return { h, m };
}

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 text-lg transition focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-500/15 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const resultBoxClass =
  "mt-5 rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-5 text-center";
const resultLabelClass = "text-xs font-medium uppercase tracking-wide text-muted";
const outputClass = "mt-1 block text-4xl font-bold tracking-tight text-brand-700 tabular-nums";

export default function TimeDecimalCalculator() {
  const [h, setH] = useState("1");
  const [m, setM] = useState("30");
  const dec = toDecimal(parseFloat(h) || 0, parseFloat(m) || 0);

  const [dec2, setDec2] = useState("1.5");
  const { h: h2, m: m2 } = toHm(parseFloat(dec2) || 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Hours & Minutes -> Decimal */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted">
          Hours &amp; Minutes &rarr; Decimal
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
        <div className={resultBoxClass}>
          <span className={resultLabelClass}>Decimal hours</span>
          <output className={outputClass} aria-live="polite">
            {dec.toFixed(4)}
          </output>
        </div>
      </section>

      {/* Decimal -> Hours & Minutes */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted">
          Decimal &rarr; Hours &amp; Minutes
        </h2>
        <label className="block">
          <span className={labelClass}>Decimal hours</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={dec2}
            onChange={(e) => setDec2(e.target.value)}
            className={inputClass}
            aria-label="Decimal hours"
          />
        </label>
        <div className={resultBoxClass}>
          <span className={resultLabelClass}>Result</span>
          <output className={outputClass} aria-live="polite">
            {h2}h {m2}m
          </output>
        </div>
      </section>
    </div>
  );
}
