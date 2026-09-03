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

export default function TimeDecimalCalculator() {
  const [h, setH] = useState("1");
  const [m, setM] = useState("30");
  const dec = toDecimal(parseFloat(h) || 0, parseFloat(m) || 0);

  const [dec2, setDec2] = useState("1.5");
  const { h: h2, m: m2 } = toHm(parseFloat(dec2) || 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Hours & Minutes -> Decimal */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-ink">Hours &amp; Minutes &rarr; Decimal</h2>
        <div className="flex items-end gap-3">
          <label className="flex-1">
            <span className="mb-1 block text-xs text-muted">Hours</span>
            <input
              type="number"
              min="0"
              step="1"
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-lg focus:border-brand focus:outline-none"
              aria-label="Hours"
            />
          </label>
          <label className="flex-1">
            <span className="mb-1 block text-xs text-muted">Minutes</span>
            <input
              type="number"
              min="0"
              max="59"
              step="1"
              value={m}
              onChange={(e) => setM(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-lg focus:border-brand focus:outline-none"
              aria-label="Minutes"
            />
          </label>
        </div>
        <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center">
          <span className="text-xs text-muted">Decimal hours</span>
          <output className="block text-3xl font-bold text-brand" aria-live="polite">
            {dec.toFixed(4)}
          </output>
        </div>
      </section>

      {/* Decimal -> Hours & Minutes */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-ink">Decimal &rarr; Hours &amp; Minutes</h2>
        <label className="block">
          <span className="mb-1 block text-xs text-muted">Decimal hours</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={dec2}
            onChange={(e) => setDec2(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-lg focus:border-brand focus:outline-none"
            aria-label="Decimal hours"
          />
        </label>
        <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center">
          <span className="text-xs text-muted">Result</span>
          <output className="block text-3xl font-bold text-brand" aria-live="polite">
            {h2}h {m2}m
          </output>
        </div>
      </section>
    </div>
  );
}
