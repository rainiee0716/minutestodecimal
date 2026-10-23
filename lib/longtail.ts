// 程序化长尾页数据层
//
// 词源：GSC 近 3 个月 630 条真实查询。三类模式已被数据验证：
//   A. "N minutes in decimal"           排名 50-90，无专门承接页（"135 minutes in decimal" 已验证可排 3.2）
//   B. "N seconds to minutes"           排名 7-13，/seconds-to-minutes-converter 距首页一步之遥
//   C. "X.XX hours in minutes"          排名 8-12，反向换算缺口
//   D. "H hours M minutes in decimal"   排名 58-95，组合词缺口
// 每页 = 查询本身作 H1 + 一句话答案 + 预填工具 + 公式推导 + 上下文段落 + 邻近数值表 + FAQ + 内链。

import type { ConverterMode } from "@/components/UnitConverter";

export type LongtailPage = {
  slug: string;
  family: "minutesInDecimal" | "secondsToMinutes" | "hoursInMinutes" | "hmInDecimal";
  h1: string;
  title: string;
  description: string;
  answerValue: string;
  answerSub: string;
  answerNote: string;
  formula: string;
  converter: { mode: ConverterMode; defaults: Record<string, string> };
  prose: { title: string; paras: string[] }[];
  tableTitle: string;
  tableFrom: string;
  tableTo: string;
  tableRows: [string, string][];
  faq: { q: string; a: string }[];
  related: { href: string; label: string }[];
  breadcrumb: { name: string; href: string }[];
};

// ---------------------------------------------------------------------------
// 数值与英文格式化工具

const fmt = (v: number, dp = 4): string =>
  Number(v.toFixed(dp)).toLocaleString("en-US", { maximumFractionDigits: dp });

const fmtInt = (n: number): string => n.toLocaleString("en-US");

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function underThousand(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : "");
  return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` ${underThousand(n % 100)}` : ""}`;
}

export function numberToWords(n: number): string {
  if (n < 0 || !Number.isInteger(n) || n >= 100000) return String(n);
  if (n < 1000) return underThousand(n);
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  return `${underThousand(th)} thousand${rest ? ` ${underThousand(rest)}` : ""}`;
}

// n 分钟 → 十进制小时；n 秒 → 十进制分钟（60 整除时显示整数，否则保留 4 位以内小数）
const div60 = (n: number): string => fmt(n / 60);

// ---------------------------------------------------------------------------
// A. {n}-minutes-in-decimal

const MIN_CONTEXTS = [
  {
    title: `${"{n}"} minutes on a timesheet`,
    body: (n: number, dec: string) =>
      `Payroll systems multiply hours by wage, so the minutes have to become a decimal first: ${n} ÷ 60 = ${dec}. ` +
      `If you earn $20/hour and worked ${n} minutes, that block pays ${fmt((n / 60) * 20, 2)} dollars. ` +
      `Enter ${n} in the converter above and it shows the same value the moment you type.`,
  },
  {
    title: `${"{n}"} minutes as hours and minutes`,
    body: (n: number, dec: string) =>
      n < 60
        ? `${cap(numberToWords(n))} minutes is less than a full hour, so it stays "${n} minutes" on a clock ` +
          `but becomes ${dec} decimal hours on a timesheet. Timers, ovens, and workout apps show the clock form; ` +
          `spreadsheets and payroll want the decimal.`
        : `On a clock, ${n} minutes reads as ${Math.floor(n / 60)}h ${n % 60}m. On a timesheet the same span ` +
          `is one number: ${dec} decimal hours. Same time, two notations — the decimal is what payroll math needs.`,
  },
  {
    title: `Checking the math for ${"{n}"} minutes`,
    body: (n: number, dec: string) =>
      `Sixty minutes is exactly 1.00 decimal hour, and every additional minute adds 1 ÷ 60 ≈ 0.0167. ` +
      `So ${n} minutes is ${n} × 0.0166… = ${dec} decimal hours. Quarter-hour marks are the anchors worth memorizing: ` +
      `15 min = 0.25, 30 min = 0.50, 45 min = 0.75 — ${n} minutes is ${n / 60 < 0.25 ? "shorter than the first anchor" : `${dec}, which you can now place on that ruler`}.`,
  },
];

export function minutesPage(n: number): LongtailPage {
  const dec = div60(n);
  const h = Math.floor(n / 60);
  const m = n % 60;
  const clock = n >= 60 ? `${h}h ${m}m` : `${n}m`;
  const ctx = MIN_CONTEXTS[n % MIN_CONTEXTS.length];
  const nearby = [n - 10, n - 5, n, n + 5, n + 10].filter((v) => v >= 1 && v <= 600);

  return {
    slug: `${n}-minutes-in-decimal`,
    family: "minutesInDecimal",
    h1: `${n} Minutes in Decimal`,
    title: `${n} Minutes in Decimal = ${dec} Decimal Hours`,
    description: `${n} minutes equals ${dec} decimal hours (${clock}). See the formula, a pre-filled converter, timesheet examples, and nearby conversions for ${n} minutes.`,
    answerValue: dec,
    answerSub: "decimal hours",
    answerNote: `${n} minutes = ${clock} on a clock = ${dec} decimal hours`,
    formula: `${n} minutes ÷ 60 = ${dec} decimal hours`,
    converter: { mode: "minutesToHours", defaults: { m: String(n) } },
    prose: [
      {
        title: `How to convert ${n} minutes to decimal`,
        paras: [
          `There are 60 minutes in an hour, so divide minutes by 60 to get decimal hours:`,
          `${cap(numberToWords(n))} (${n}) minutes ÷ 60 = ${dec} decimal hours. ` +
            `The converter above is pre-filled with ${n} — change it to check any other value.`,
        ],
      },
      {
        title: ctx.title.replace("{n}", String(n)),
        paras: [ctx.body(n, dec)],
      },
    ],
    tableTitle: `${n} minutes in decimal — nearby values`,
    tableFrom: "Minutes",
    tableTo: "Decimal hours",
    tableRows: nearby.map((v) => [`${v} minutes`, div60(v)] as [string, string]),
    faq: [
      {
        q: `What is ${n} minutes in decimal?`,
        a: `${n} minutes = ${dec} decimal hours, because ${n} ÷ 60 = ${dec}.`,
      },
      {
        q: `What is ${n} minutes in hours and minutes?`,
        a: n >= 60
          ? `${n} minutes = ${h} hours ${m} minutes (${clock}).`
          : `${n} minutes is under an hour, so it stays ${n} minutes on a clock (${dec} decimal hours).`,
      },
      {
        q: `How do you write ${n} minutes on a timesheet?`,
        a: `Write ${dec} in the hours column. That is ${n} minutes expressed as decimal hours, ready to multiply by an hourly rate.`,
      },
      {
        q: `What is ${n} minutes in seconds?`,
        a: `${n} minutes = ${fmtInt(n * 60)} seconds (${n} × 60).`,
      },
    ],
    related: [
      { href: "/", label: "Minutes to Decimal Converter" },
      { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart (1–60)" },
      { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
      ...(n !== 30 ? [{ href: "/30-minutes-in-decimal", label: "30 Minutes in Decimal" }] : []),
      ...(n !== 45 ? [{ href: "/45-minutes-in-decimal", label: "45 Minutes in Decimal" }] : []),
      ...(n !== 90 ? [{ href: "/90-minutes-in-decimal", label: "90 Minutes in Decimal" }] : []),
    ],
    breadcrumb: [
      { name: "Home", href: "/" },
      { name: "Minutes to Decimal Chart", href: "/minutes-to-decimal-chart" },
      { name: `${n} Minutes in Decimal`, href: `/${n}-minutes-in-decimal` },
    ],
  };
}

// ---------------------------------------------------------------------------
// B. {n}-seconds-to-minutes

// 基础 1–600 全量；>600 的收录 GSC 真实出现过的值 + 常见整十分钟锚点
const SECONDS_SPECIALS = [
  720, 900, 990, 1080, 1200, 1337, 1500, 1800, 2175, 2268, 2400, 2660, 2700, 2790,
  3000, 3570, 3600, 5400, 7200, 15000, 19000, 32000, 69000, 69420,
];

const SEC_CONTEXTS = [
  {
    title: `${"{n}"} seconds in workouts and timers`,
    body: (n: number, mm: number, ss: number, dec: string) =>
      `Interval timers report seconds because second-level precision matters mid-set. A ${n}-second round is ` +
      `${n % 60 === 0 ? `exactly ${mm} minutes` : `${mm} minutes ${ss} seconds (${dec} decimal minutes)`}. ` +
      `When a training plan says "1:30 rest" and your watch logs 90, they agree — ${n} seconds is ${dec} minutes.`,
  },
  {
    title: `${"{n}"} seconds in video and audio work`,
    body: (n: number, mm: number, ss: number, dec: string) =>
      `Editing software sums clip lengths in raw seconds, then converts once. A ${n}-second clip is ` +
      `${mm}:${String(ss).padStart(2, "0")} on a timeline and ${dec} decimal minutes in a duration report — ` +
      `the divide-by-60 is the only step.`,
  },
  {
    title: `${"{n}"} seconds, minutes, and payroll`,
    body: (n: number, mm: number, ss: number, dec: string) =>
      `Time clocks round seconds away, but task timers keep them. Convert up the chain: ${n} seconds ÷ 60 = ` +
      `${dec} minutes; divide by 60 again for ${fmt(n / 3600)} decimal hours. A ${n}-second task logs as ` +
      `${fmt(n / 3600)} hours on a timesheet.`,
  },
];

export function secondsPage(n: number): LongtailPage {
  const dec = div60(n);
  const mm = Math.floor(n / 60);
  const ss = n % 60;
  const ctx = SEC_CONTEXTS[n % SEC_CONTEXTS.length];
  const anchors = [90, 300, 600, 900, 1800, 3600].filter((a) => a !== n);
  const nearby = [n - 10, n - 5, n, n + 5, n + 10].filter((v) => v >= 1);

  return {
    slug: `${n}-seconds-to-minutes`,
    family: "secondsToMinutes",
    h1: `${n} Seconds to Minutes`,
    title: `${n} Seconds to Minutes = ${n % 60 === 0 ? `${fmtInt(mm)} Minutes` : `${dec} Minutes`}`,
    description: `${n} seconds equals ${n % 60 === 0 ? `exactly ${mm} minutes` : `${dec} decimal minutes (${mm}m ${ss}s)`}. Free converter, formula, and worked example for ${n} seconds.`,
    answerValue: n % 60 === 0 ? fmtInt(mm) : dec,
    answerSub: "minutes",
    answerNote: n % 60 === 0
      ? `${n} seconds = ${mm} minutes exactly`
      : `${n} seconds = ${mm} minutes ${ss} seconds = ${dec} decimal minutes`,
    formula: `${n} seconds ÷ 60 = ${n % 60 === 0 ? `${mm} minutes` : `${dec} minutes`}`,
    converter: { mode: "secondsToMinutes", defaults: { s: String(n) } },
    prose: [
      {
        title: `How to convert ${n} seconds to minutes`,
        paras: [
          `One minute is 60 seconds, so divide the seconds by 60:`,
          `${cap(numberToWords(n))} (${fmtInt(n)}) seconds ÷ 60 = ${n % 60 === 0 ? `${mm} minutes exactly` : `${dec} decimal minutes`}. ` +
            `The converter above starts at ${n} — type any other value to check it.`,
        ],
      },
      {
        title: ctx.title.replace("{n}", fmtInt(n)),
        paras: [ctx.body(n, mm, ss, dec)],
      },
    ],
    tableTitle: `${n} seconds to minutes — nearby values`,
    tableFrom: "Seconds",
    tableTo: "Minutes",
    tableRows: nearby.map((v) => [`${fmtInt(v)} seconds`, div60(v)] as [string, string]),
    faq: [
      {
        q: `How many minutes is ${n} seconds?`,
        a: `${n} seconds = ${n % 60 === 0 ? `exactly ${mm} minutes` : `${dec} minutes (${mm} minutes ${ss} seconds)`}, because ${n} ÷ 60 = ${dec}.`,
      },
      {
        q: `What is ${n} seconds in minutes and seconds?`,
        a: `${n} seconds = ${mm} minutes ${ss} seconds.`,
      },
      {
        q: `How many hours is ${n} seconds?`,
        a: `${n} seconds = ${fmt(n / 3600)} hours (${n} ÷ 3,600).`,
      },
      {
        q: `How do you convert ${n} seconds to minutes by hand?`,
        a: `Divide by 60: ${n} ÷ 60 = ${dec}. If the result is bigger than 60, divide by 60 again for hours.`,
      },
      ...anchors.slice(0, 2).map((a) => ({
        q: `How many minutes is ${fmtInt(a)} seconds?`,
        a: `${fmtInt(a)} seconds = ${div60(a)} minutes (${fmtInt(a)} ÷ 60).`,
      })),
    ],
    related: [
      { href: "/seconds-to-minutes-converter", label: "Seconds to Minutes Converter" },
      { href: "/90-seconds-to-minutes", label: "90 Seconds to Minutes" },
      { href: "/600-seconds-to-minutes", label: "600 Seconds to Minutes" },
      { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
      { href: "/", label: "Minutes to Decimal Converter" },
    ],
    breadcrumb: [
      { name: "Home", href: "/" },
      { name: "Seconds to Minutes Converter", href: "/seconds-to-minutes-converter" },
      { name: `${n} Seconds to Minutes`, href: `/${n}-seconds-to-minutes` },
    ],
  };
}

// ---------------------------------------------------------------------------
// C. {x}-hours-in-minutes（十进制小时 → 分钟 / X 小时 Y 分）

const HOURS_CONTEXTS = [
  {
    title: `${"{x}"} hours on a timesheet`,
    body: (x: number, minutes: number, h: number, m: number) =>
      `${x} decimal hours is what a payroll report prints after the minutes have been converted. Reading it back: ` +
      `${x} × 60 = ${fmtInt(minutes)} minutes, or ${h} hours ${m} minutes on a clock. ` +
      `At $20/hour, ${x} hours pays $${fmt(x * 20, 2)}.`,
  },
  {
    title: `${"{x}"} hours in billing and shifts`,
    body: (x: number, minutes: number, h: number, m: number) =>
      `Consultants bill in decimal hours and schedule in clock hours. A ${x}-hour booking is ` +
      `${h}h ${m}m on a calendar and ${fmtInt(minutes)} minutes on a timer. Quarter values map to quarter hours: ` +
      `0.25 = 15 min, 0.50 = 30, 0.75 = 45 — so ${x} hours is always ${h}:${String(m).padStart(2, "0")} in clock form.`,
  },
];

export function hoursPage(x: number): LongtailPage {
  const minutes = x * 60;
  const h = Math.floor(x);
  const m = Math.round((x - h) * 60);
  const ctx = HOURS_CONTEXTS[Math.round(x * 4) % HOURS_CONTEXTS.length];
  const nearby = [x - 0.5, x - 0.25, x, x + 0.25, x + 0.5].filter((v) => v >= 0.25 && v <= 40);

  return {
    slug: `${x}-hours-in-minutes`,
    family: "hoursInMinutes",
    h1: `${x} Hours in Minutes`,
    title: `${x} Hours in Minutes = ${fmtInt(minutes)} Minutes (${h}h ${m}m)`,
    description: `${x} hours equals ${fmtInt(minutes)} minutes, or ${h} hours ${m} minutes. Converter, formula, and timesheet context for ${x} decimal hours.`,
    answerValue: fmtInt(minutes),
    answerSub: "minutes",
    answerNote: `${x} decimal hours = ${fmtInt(minutes)} minutes = ${h}h ${m}m`,
    formula: `${x} hours × 60 = ${fmtInt(minutes)} minutes`,
    converter: { mode: "decimalToHours", defaults: { d: String(x) } },
    prose: [
      {
        title: `How to convert ${x} hours to minutes`,
        paras: [
          `Each hour holds 60 minutes, so multiply hours by 60:`,
          `${x} × 60 = ${fmtInt(minutes)} minutes. Written as hours and minutes that is ${h}h ${m}m. ` +
            `The converter above starts from ${x} — the middle field accepts decimal hours directly.`,
        ],
      },
      {
        title: ctx.title.replace("{x}", String(x)),
        paras: [ctx.body(x, minutes, h, m)],
      },
    ],
    tableTitle: `${x} hours in minutes — nearby values`,
    tableFrom: "Decimal hours",
    tableTo: "Minutes",
    tableRows: nearby.map((v) => [`${v} hours`, fmtInt(v * 60)] as [string, string]),
    faq: [
      {
        q: `What is ${x} hours in minutes?`,
        a: `${x} hours = ${fmtInt(minutes)} minutes, because ${x} × 60 = ${fmtInt(minutes)}.`,
      },
      {
        q: `What is ${x} hours in hours and minutes?`,
        a: `${x} hours = ${h} hours ${m} minutes. The decimal part is minutes: ${x} − ${h} = ${fmt(x - h, 2)}, and ${fmt(x - h, 2)} × 60 = ${m} minutes.`,
      },
      {
        q: `Is ${x} hours the same as ${h} hours ${m} minutes?`,
        a: `Yes. ${x} decimal hours and ${h}h ${m}m are the same span of time written two ways — decimals for payroll math, hours-and-minutes for clocks.`,
      },
      {
        q: `How do I convert ${x} hours to seconds?`,
        a: `${x} hours = ${fmtInt(x * 3600)} seconds (${x} × 3,600).`,
      },
    ],
    related: [
      { href: "/decimal-to-hours-calculator", label: "Decimal to Hours Calculator" },
      { href: "/decimal-to-minutes", label: "Decimal to Minutes Converter" },
      { href: "/hours-to-minutes-calculator", label: "Hours to Minutes Calculator" },
      { href: "/1.75-hours-in-minutes", label: "1.75 Hours in Minutes" },
      { href: "/", label: "Minutes to Decimal Converter" },
    ],
    breadcrumb: [
      { name: "Home", href: "/" },
      { name: "Decimal to Hours Calculator", href: "/decimal-to-hours-calculator" },
      { name: `${x} Hours in Minutes`, href: `/${x}-hours-in-minutes` },
    ],
  };
}

// ---------------------------------------------------------------------------
// D. {h}-hours-{m}-minutes-in-decimal

const HM_CONTEXTS = [
  (h: number, m: number, dec: string) =>
    `A shift logged as ${h}:${String(m).padStart(2, "0")} pays by the hour, so payroll needs one decimal number: ` +
    `${h} + ${m}⁄60 = ${dec} hours. At $20/hour that shift earns $${fmt(Number(dec.replace(/,/g, "")) * 20, 2)}.`,
  (h: number, m: number, dec: string) =>
    `Spreadsheets multiply wage by hours, not by "hours and minutes". ${h} hours ${m} minutes becomes ` +
    `${dec} decimal hours first — the minutes convert as ${m} ÷ 60 = ${fmt(m / 60)} — then the math is a single multiplication.`,
  (h: number, m: number, dec: string) =>
    `Time clocks print ${h}:${String(m).padStart(2, "0")}; payroll software prints ${dec}. They are the same ${fmtInt(h * 60 + m)} minutes. ` +
    `The rule never changes: minutes ÷ 60, added to the hours.`,
];

export function hmPage(h: number, m: number): LongtailPage {
  const dec = fmt(h + m / 60);
  const totalMin = h * 60 + m;
  const ctx = HM_CONTEXTS[(h + m) % HM_CONTEXTS.length];
  const nearby: [number, number][] = [
    [h, m - 5], [h, m + 5], [h + 1, m], [h, 45], [h, 15],
  ].filter(([hh, mm]) => mm >= 5 && mm <= 55) as [number, number][];

  return {
    slug: `${h}-hours-${m}-minutes-in-decimal`,
    family: "hmInDecimal",
    h1: `${h} Hours ${m} Minutes in Decimal`,
    title: `${h} Hours ${m} Minutes in Decimal = ${dec} Decimal Hours`,
    description: `${h} hours ${m} minutes equals ${dec} decimal hours (${fmtInt(totalMin)} minutes). Formula, converter, and payroll examples for ${h}:${String(m).padStart(2, "0")}.`,
    answerValue: dec,
    answerSub: "decimal hours",
    answerNote: `${h}h ${m}m = ${fmtInt(totalMin)} minutes = ${dec} decimal hours`,
    formula: `${h} + (${m} ÷ 60) = ${dec} decimal hours`,
    converter: { mode: "hoursToMinutes", defaults: { h: String(h), m: String(m) } },
    prose: [
      {
        title: `How to convert ${h} hours ${m} minutes to decimal`,
        paras: [
          `Keep the whole hours, and divide only the minutes by 60:`,
          `${h} + ${m}⁄60 = ${h} + ${fmt(m / 60)} = ${dec} decimal hours. The converter above is pre-filled with ${h}:${String(m).padStart(2, "0")}.`,
        ],
      },
      {
        title: `${h} hours ${m} minutes on a timesheet`,
        paras: [ctx(h, m, dec)],
      },
    ],
    tableTitle: `${h} hours in decimal — nearby minute marks`,
    tableFrom: "Clock time",
    tableTo: "Decimal hours",
    tableRows: nearby.map(([hh, mm]) => [`${hh}:${String(mm).padStart(2, "0")} (${mm} min)`, fmt(hh + mm / 60)] as [string, string]),
    faq: [
      {
        q: `What is ${h} hours ${m} minutes in decimal?`,
        a: `${h} hours ${m} minutes = ${dec} decimal hours (${h} + ${m} ÷ 60 = ${dec}).`,
      },
      {
        q: `What is ${h}:${String(m).padStart(2, "0")} as decimal hours?`,
        a: `${h}:${String(m).padStart(2, "0")} on a time card converts to ${dec} decimal hours. Enter ${h} and ${m} in the converter above to verify.`,
      },
      {
        q: `How many total minutes is ${h} hours ${m} minutes?`,
        a: `${h} × 60 + ${m} = ${fmtInt(totalMin)} minutes.`,
      },
      {
        q: `How do you write ${h} hours ${m} minutes on a timesheet?`,
        a: `Write ${dec} in the hours column — payroll systems expect decimal hours, and ${dec} is exactly ${h}h ${m}m.`,
      },
    ],
    related: [
      { href: "/", label: "Minutes to Decimal Converter" },
      { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
      { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
      { href: "/weekly-timesheet-calculator", label: "Weekly Timesheet Calculator" },
      { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
    ],
    breadcrumb: [
      { name: "Home", href: "/" },
      { name: "Hours to Decimal Calculator", href: "/hours-to-decimal-calculator" },
      { name: `${h} Hours ${m} Minutes in Decimal`, href: `/${h}-hours-${m}-minutes-in-decimal` },
    ],
  };
}

// ---------------------------------------------------------------------------
// Slug 解析与全量清单

export function parseLongtailSlug(slug: string): LongtailPage | null {
  let m = slug.match(/^(\d+)-minutes-in-decimal$/);
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 600) return minutesPage(n);
    return null;
  }
  m = slug.match(/^(\d+)-seconds-to-minutes$/);
  if (m) {
    const n = Number(m[1]);
    if ((n >= 1 && n <= 600) || SECONDS_SPECIALS.includes(n)) return secondsPage(n);
    return null;
  }
  m = slug.match(/^(\d+(\.\d+)?)-hours-in-minutes$/);
  if (m) {
    const x = Number(m[1]);
    // 仅收录 0.25 步进的十进制小时，避免任意小数生成垃圾页
    if (x >= 0.25 && x <= 40 && Math.abs(x * 4 - Math.round(x * 4)) < 1e-9) return hoursPage(x);
    return null;
  }
  m = slug.match(/^(\d+)-hours-(\d+)-minutes-in-decimal$/);
  if (m) {
    const h = Number(m[1]);
    const mm = Number(m[2]);
    if (h >= 1 && h <= 20 && mm >= 5 && mm <= 55 && mm % 5 === 0) return hmPage(h, mm);
    return null;
  }
  return null;
}

export function allLongtailSlugs(): string[] {
  const slugs: string[] = [];
  for (let n = 1; n <= 600; n++) slugs.push(`${n}-minutes-in-decimal`);
  for (let n = 1; n <= 600; n++) slugs.push(`${n}-seconds-to-minutes`);
  for (const n of SECONDS_SPECIALS) slugs.push(`${n}-seconds-to-minutes`);
  for (let i = 1; i <= 160; i++) slugs.push(`${i * 0.25}-hours-in-minutes`);
  for (let h = 1; h <= 20; h++)
    for (let mm = 5; mm <= 55; mm += 5) slugs.push(`${h}-hours-${mm}-minutes-in-decimal`);
  return slugs;
}
