"use client";

import { useMemo, useRef, useState } from "react";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type DayState = {
  start: string;
  end: string;
  lunch: string;
};

const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday", short: "Mon" },
  { key: "tue", label: "Tuesday", short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday", short: "Thu" },
  { key: "fri", label: "Friday", short: "Fri" },
  { key: "sat", label: "Saturday", short: "Sat" },
  { key: "sun", label: "Sunday", short: "Sun" },
];

const DEFAULT_DAYS: Record<DayKey, DayState> = {
  mon: { start: "09:00", end: "17:30", lunch: "30" },
  tue: { start: "09:00", end: "17:30", lunch: "30" },
  wed: { start: "09:00", end: "17:30", lunch: "30" },
  thu: { start: "09:00", end: "17:30", lunch: "30" },
  fri: { start: "09:00", end: "17:30", lunch: "30" },
  sat: { start: "", end: "", lunch: "0" },
  sun: { start: "", end: "", lunch: "0" },
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 text-base transition focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-500/15 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const resultBoxClass =
  "rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-5 text-center";
const resultLabelClass = "text-xs font-medium uppercase tracking-wide text-muted";
const outputClass = "mt-1 block text-3xl font-bold tracking-tight text-brand-700 tabular-nums";

function timeToMinutes(value: string): number | null {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function calculateDay(day: DayState): number {
  const start = timeToMinutes(day.start);
  const end = timeToMinutes(day.end);
  if (start === null || end === null) return 0;

  let minutes = end - start;
  if (minutes < 0) minutes += 24 * 60; // overnight shift

  const lunch = Math.max(0, parseFloat(day.lunch) || 0);
  return Math.max(0, minutes - lunch) / 60;
}

function formatHours(hours: number): string {
  return hours.toFixed(2);
}

export default function WeeklyTimesheetCalculator() {
  const [days, setDays] = useState(DEFAULT_DAYS);
  const [threshold, setThreshold] = useState("40");
  const [rate, setRate] = useState("");
  const [copied, setCopied] = useState(false);
  const lastTrackedRef = useRef(0);

  const trackUse = () => {
    const now = Date.now();
    if (now - lastTrackedRef.current < 1000) return;
    lastTrackedRef.current = now;
    window.gtag?.("event", "calculator_used", {
      calculator_name: "weekly_timesheet_calculator",
    });
  };

  const results = useMemo(() => {
    const dayHours = DAYS.map((day) => ({
      ...day,
      hours: calculateDay(days[day.key]),
    }));

    const totalHours = dayHours.reduce((sum, day) => sum + day.hours, 0);
    const overtimeThreshold = Math.max(0, parseFloat(threshold) || 0);
    const regularHours = Math.min(totalHours, overtimeThreshold);
    const overtimeHours = Math.max(0, totalHours - overtimeThreshold);

    const hourlyRate = Math.max(0, parseFloat(rate) || 0);
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * 1.5;
    const totalPay = regularPay + overtimePay;

    return {
      dayHours,
      totalHours,
      regularHours,
      overtimeHours,
      hourlyRate,
      regularPay,
      overtimePay,
      totalPay,
    };
  }, [days, threshold, rate]);

  const updateDay = (key: DayKey, field: keyof DayState, value: string) => {
    trackUse();
    setDays((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const copySummary = async () => {
    trackUse();
    const lines = [
      "Weekly timesheet summary",
      ...results.dayHours.map(
        (day) => `${day.label}: ${formatHours(day.hours)} hours`
      ),
      `Total hours: ${formatHours(results.totalHours)}`,
      `Regular hours: ${formatHours(results.regularHours)}`,
      `Overtime hours: ${formatHours(results.overtimeHours)}`,
    ];

    if (results.hourlyRate > 0) {
      lines.push(
        `Regular pay: $${results.regularPay.toFixed(2)}`,
        `Overtime pay: $${results.overtimePay.toFixed(2)}`,
        `Total pay: $${results.totalPay.toFixed(2)}`
      );
    }

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted">
        Weekly timesheet entries
      </h2>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <div
            key={day.key}
            className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:grid-cols-[110px_1fr_1fr_110px_110px] md:items-end"
          >
            <div>
              <span className={labelClass}>{day.label}</span>
              <div className="rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-ink">
                {formatHours(results.dayHours.find((d) => d.key === day.key)?.hours ?? 0)}
                <span className="ml-1 text-xs font-normal text-muted">hrs</span>
              </div>
            </div>

            <label>
              <span className={labelClass}>Start</span>
              <input
                type="time"
                value={days[day.key].start}
                onChange={(e) => updateDay(day.key, "start", e.target.value)}
                className={inputClass}
                aria-label={`${day.label} start time`}
              />
            </label>

            <label>
              <span className={labelClass}>End</span>
              <input
                type="time"
                value={days[day.key].end}
                onChange={(e) => updateDay(day.key, "end", e.target.value)}
                className={inputClass}
                aria-label={`${day.label} end time`}
              />
            </label>

            <label>
              <span className={labelClass}>Unpaid lunch</span>
              <input
                type="number"
                min="0"
                step="5"
                value={days[day.key].lunch}
                onChange={(e) => updateDay(day.key, "lunch", e.target.value)}
                className={inputClass}
                aria-label={`${day.label} unpaid lunch minutes`}
              />
            </label>

            <div className="text-sm text-muted md:text-right">
              <span className="block text-xs font-semibold uppercase tracking-wide">
                Decimal
              </span>
              <span className="font-mono text-base font-semibold text-brand-700">
                {formatHours(results.dayHours.find((d) => d.key === day.key)?.hours ?? 0)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>Overtime threshold</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={threshold}
            onChange={(e) => {
              trackUse();
              setThreshold(e.target.value);
            }}
            className={inputClass}
            aria-label="Weekly overtime threshold in hours"
          />
        </label>

        <label>
          <span className={labelClass}>Hourly rate, optional</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={rate}
            onChange={(e) => {
              trackUse();
              setRate(e.target.value);
            }}
            className={inputClass}
            aria-label="Hourly rate in dollars"
            placeholder="e.g. 25.00"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className={resultBoxClass}>
          <span className={resultLabelClass}>Total hours</span>
          <output className={outputClass} aria-live="polite">
            {formatHours(results.totalHours)}
          </output>
        </div>
        <div className={resultBoxClass}>
          <span className={resultLabelClass}>Regular hours</span>
          <output className={outputClass} aria-live="polite">
            {formatHours(results.regularHours)}
          </output>
        </div>
        <div className={resultBoxClass}>
          <span className={resultLabelClass}>Overtime hours</span>
          <output className={outputClass} aria-live="polite">
            {formatHours(results.overtimeHours)}
          </output>
        </div>
      </div>

      {results.hourlyRate > 0 && (
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className={resultBoxClass}>
            <span className={resultLabelClass}>Regular pay</span>
            <output className={outputClass} aria-live="polite">
              ${results.regularPay.toFixed(2)}
            </output>
          </div>
          <div className={resultBoxClass}>
            <span className={resultLabelClass}>Overtime pay</span>
            <output className={outputClass} aria-live="polite">
              ${results.overtimePay.toFixed(2)}
            </output>
          </div>
          <div className={resultBoxClass}>
            <span className={resultLabelClass}>Total pay</span>
            <output className={outputClass} aria-live="polite">
              ${results.totalPay.toFixed(2)}
            </output>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Overtime is calculated at 1.5× your hourly rate. Adjust the threshold if your local rules
          differ.
        </p>
        <button
          type="button"
          onClick={copySummary}
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-brand-700"
        >
          {copied ? "Copied" : "Copy summary"}
        </button>
      </div>
    </section>
  );
}
