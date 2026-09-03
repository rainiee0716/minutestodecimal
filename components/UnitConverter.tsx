"use client";

import { useState } from "react";

type Mode = "hoursToMinutes" | "minutesToHours" | "decimalToHours" | "secondsToMinutes";

type Cfg = {
  title: string;
  formula: string;
  inputs: { key: string; label: string; placeholder: string; step: string }[];
  compute: (v: Record<string, number>) => { value: string; sub?: string };
  defaults: Record<string, string>;
};

const MODES: Record<Mode, Cfg> = {
  hoursToMinutes: {
    title: "Hours & Minutes → Total Minutes",
    formula: "total minutes = (hours × 60) + minutes",
    inputs: [
      { key: "h", label: "Hours", placeholder: "e.g. 1.5", step: "0.25" },
      { key: "m", label: "Minutes", placeholder: "e.g. 30", step: "1" },
    ],
    defaults: { h: "1", m: "30" },
    compute: (v) => ({ value: ((v.h || 0) * 60 + (v.m || 0)).toFixed(2), sub: "minutes" }),
  },
  minutesToHours: {
    title: "Minutes → Decimal Hours",
    formula: "decimal hours = minutes ÷ 60",
    inputs: [{ key: "m", label: "Minutes", placeholder: "e.g. 90", step: "1" }],
    defaults: { m: "90" },
    compute: (v) => ({ value: ((v.m || 0) / 60).toFixed(4), sub: "hours" }),
  },
  decimalToHours: {
    title: "Decimal Hours → Hours & Minutes",
    formula: "hours = floor(d); minutes = round((d − hours) × 60)",
    inputs: [{ key: "d", label: "Decimal hours", placeholder: "e.g. 1.75", step: "0.25" }],
    defaults: { d: "1.75" },
    compute: (v) => {
      const d = v.d || 0;
      const h = Math.floor(d);
      const m = Math.round((d - h) * 60);
      return { value: `${h}h ${m}m` };
    },
  },
  secondsToMinutes: {
    title: "Seconds → Minutes",
    formula: "minutes = seconds ÷ 60",
    inputs: [{ key: "s", label: "Seconds", placeholder: "e.g. 90", step: "1" }],
    defaults: { s: "90" },
    compute: (v) => ({ value: ((v.s || 0) / 60).toFixed(4), sub: "minutes" }),
  },
};

export default function UnitConverter({ mode }: { mode: Mode }) {
  const cfg = MODES[mode];
  const [vals, setVals] = useState<Record<string, string>>(cfg.defaults);
  const numeric = Object.fromEntries(
    cfg.inputs.map((i) => [i.key, parseFloat(vals[i.key]) || 0])
  );
  const res = cfg.compute(numeric);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-ink">{cfg.title}</h2>
      <div className="flex flex-wrap items-end gap-3">
        {cfg.inputs.map((inp) => (
          <label
            key={inp.key}
            className={cfg.inputs.length > 1 ? "min-w-[120px] flex-1" : "w-full"}
          >
            <span className="mb-1 block text-xs text-muted">{inp.label}</span>
            <input
              type="number"
              min="0"
              step={inp.step}
              value={vals[inp.key]}
              onChange={(e) => setVals((p) => ({ ...p, [inp.key]: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-lg focus:border-brand focus:outline-none"
              aria-label={inp.label}
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center">
        <span className="text-xs text-muted">{res.sub ?? "Result"}</span>
        <output className="block text-3xl font-bold text-brand" aria-live="polite">
          {res.value}
        </output>
      </div>
      <p className="mt-3 text-center font-mono text-sm text-brand-dark">{cfg.formula}</p>
    </section>
  );
}
