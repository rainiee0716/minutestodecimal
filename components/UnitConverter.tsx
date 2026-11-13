"use client";

import { useEffect, useRef, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { trackEvent } from "@/lib/analytics";

type Mode = "hoursToMinutes" | "minutesToHours" | "decimalToHours" | "secondsToMinutes";

export type { Mode as ConverterMode };

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

// 西语 UI 标签覆盖（LatAm 中性用词，小数点用句点与工具一致）
const ES_MODES: Partial<
  Record<Mode, { title: string; labels: Record<string, string>; placeholders: Record<string, string>; sub: string; formula: string }>
> = {
  hoursToMinutes: {
    title: "Horas y Minutos → Minutos Totales",
    labels: { h: "Horas", m: "Minutos" },
    placeholders: { h: "p. ej. 1.5", m: "p. ej. 30" },
    sub: "minutos",
    formula: "minutos totales = (horas × 60) + minutos",
  },
  minutesToHours: {
    title: "Minutos → Horas Decimales",
    labels: { m: "Minutos" },
    placeholders: { m: "p. ej. 90" },
    sub: "horas decimales",
    formula: "horas decimales = minutos ÷ 60",
  },
  decimalToHours: {
    title: "Horas Decimales → Horas y Minutos",
    labels: { d: "Horas decimales" },
    placeholders: { d: "p. ej. 1.75" },
    sub: "horas y minutos",
    formula: "horas = floor(d); minutos = round((d − horas) × 60)",
  },
  secondsToMinutes: {
    title: "Segundos → Minutos",
    labels: { s: "Segundos" },
    placeholders: { s: "p. ej. 90" },
    sub: "minutos",
    formula: "minutos = segundos ÷ 60",
  },
};

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 text-lg transition focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-500/15 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function UnitConverter({
  mode,
  defaults,
  lang = "en",
}: {
  mode: Mode;
  defaults?: Record<string, string>;
  lang?: "en" | "es";
}) {
  const cfg = MODES[mode];
  const es = lang === "es" ? ES_MODES[mode] : undefined;
  const [vals, setVals] = useState<Record<string, string>>({ ...cfg.defaults, ...defaults });
  const numeric = Object.fromEntries(
    cfg.inputs.map((i) => [i.key, parseFloat(vals[i.key]) || 0])
  );
  const res = cfg.compute(numeric);

  // 换算使用埋点：输入停顿 1.5s 后上报，同一输入串不重复，10s 节流，跳过首屏默认值
  const seenInput = useRef<string | null>(null);
  const lastFireAt = useRef(0);
  useEffect(() => {
    const key = cfg.inputs.map((i) => vals[i.key] || "").join("|");
    if (seenInput.current === null) {
      seenInput.current = key;
      return;
    }
    if (key === seenInput.current) return;
    const t = setTimeout(() => {
      if (key === seenInput.current) return;
      seenInput.current = key;
      if (Date.now() - lastFireAt.current < 10000) return;
      lastFireAt.current = Date.now();
      trackEvent("calculator_used", { mode });
    }, 1500);
    return () => clearTimeout(t);
  }, [vals, cfg.inputs, mode]);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted">
        {es?.title ?? cfg.title}
      </h2>
      <div className="flex flex-wrap items-end gap-3">
        {cfg.inputs.map((inp) => (
          <label
            key={inp.key}
            className={cfg.inputs.length > 1 ? "min-w-[120px] flex-1" : "w-full"}
          >
            <span className={labelClass}>{es?.labels[inp.key] ?? inp.label}</span>
            <input
              type="number"
              min="0"
              step={inp.step}
              value={vals[inp.key]}
              onChange={(e) => setVals((p) => ({ ...p, [inp.key]: e.target.value }))}
              className={inputClass}
              aria-label={es?.labels[inp.key] ?? inp.label}
              placeholder={es?.placeholders[inp.key] ?? inp.placeholder}
            />
          </label>
        ))}
      </div>
      <div className="relative mt-5 rounded-xl bg-result-gradient p-5 text-center shadow-card ring-1 ring-inset ring-white/15">
        <CopyButton value={res.value} location={mode} />
        <span className="text-xs font-medium uppercase tracking-wide text-brand-100">
          {es?.sub ?? res.sub ?? "Result"}
        </span>
        <output
          className="mt-1 block text-4xl font-bold tracking-tight text-white tabular-nums"
          aria-live="polite"
        >
          {res.value}
        </output>
      </div>
      <p className="mx-auto mt-4 w-fit rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-500">
        {es?.formula ?? cfg.formula}
      </p>
    </section>
  );
}
