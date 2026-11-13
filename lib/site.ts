export type ToolLink = {
  href: string;
  label: string;
  description: string;
};

export type Guide = {
  href: string;
  title: string;
  description: string;
  summary: string;
};

export type ToolCategory = {
  heading: string;
  description: string;
  links: ToolLink[];
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    heading: "Time & decimal converters",
    description: "Convert clock times, hours, minutes, seconds, and decimal hours.",
    links: [
      {
        href: "/",
        label: "Minutes to Decimal Converter",
        description: "Convert hours and minutes into decimal payroll hours.",
      },
      {
        href: "/time-to-decimal-calculator",
        label: "Time to Decimal Calculator",
        description: "Turn a work shift or duration into decimal hours.",
      },
      {
        href: "/hours-to-decimal-calculator",
        label: "Hours to Decimal Calculator",
        description: "Convert hours and minutes into decimal hours, step by step or by tool.",
      },
      {
        href: "/decimal-to-hours-calculator",
        label: "Decimal to Hours Calculator",
        description: "Convert decimal hours back into hours and minutes.",
      },
      {
        href: "/decimal-to-minutes",
        label: "Decimal to Minutes Converter",
        description: "Convert decimal hours into minutes.",
      },
      {
        href: "/hours-to-minutes-calculator",
        label: "Hours to Minutes Calculator",
        description: "Convert hours and minutes into total minutes.",
      },
      {
        href: "/minutes-to-hours-converter",
        label: "Minutes to Hours Converter",
        description: "Convert minutes into decimal hours or hours and minutes.",
      },
      {
        href: "/seconds-to-minutes-converter",
        label: "Seconds to Minutes Converter",
        description: "Convert seconds into minutes.",
      },
    ],
  },
  {
    heading: "Timesheet & payroll calculators",
    description: "Calculate weekly hours, overtime, rounding, and estimated pay.",
    links: [
      {
        href: "/weekly-timesheet-calculator",
        label: "Weekly Timesheet Calculator",
        description: "Calculate weekly hours, regular/overtime split, and pay.",
      },
      {
        href: "/time-card-rounding-calculator",
        label: "Time Card Rounding Calculator",
        description: "Round work hours under common payroll rules.",
      },
    ],
  },
  {
    heading: "Charts & reference tables",
    description: "Quick lookup tables for payroll and timesheet math.",
    links: [
      {
        href: "/minutes-to-decimal-chart",
        label: "Minutes to Decimal Chart",
        description: "Full 1–60 minute conversion chart.",
      },
    ],
  },
  {
    heading: "Popular specific conversions",
    description: "The most-looked-up values, each with its own pre-filled converter and chart.",
    links: [
      {
        href: "/20-minutes-in-decimal",
        label: "20 Minutes in Decimal",
        description: "What 20 minutes is in decimal hours (0.33).",
      },
      {
        href: "/45-minutes-in-decimal",
        label: "45 Minutes in Decimal",
        description: "What 45 minutes is in decimal hours (0.75).",
      },
      {
        href: "/10-minutes-in-decimal",
        label: "10 Minutes in Decimal",
        description: "What 10 minutes is in decimal hours (0.1667).",
      },
      {
        href: "/30-minutes-in-decimal",
        label: "30 Minutes in Decimal",
        description: "What 30 minutes is in decimal hours (0.50).",
      },
      {
        href: "/90-seconds-to-minutes",
        label: "90 Seconds to Minutes",
        description: "What 90 seconds is in minutes (1.5).",
      },
      {
        href: "/600-seconds-to-minutes",
        label: "600 Seconds to Minutes",
        description: "What 600 seconds is in minutes (10).",
      },
    ],
  },
  {
    heading: "Minutes-only conversions",
    description: "For timers and logs that report plain minute counts.",
    links: [
      {
        href: "/minutes-to-hours-converter",
        label: "Minutes to Hours Converter",
        description: "Convert minutes into decimal hours or hours and minutes.",
      },
    ],
  },
];

// 指南数据：页面与 llms.txt 共用，避免两处维护
export const GUIDES: Guide[] = [
  {
    href: "/guides/time-card-rounding",
    title: "Time Card Rounding Rules",
    description:
      "How the 15-minute and 7-minute rules work, what federal law allows employers to round, and how to check whether rounding is costing you pay.",
    summary:
      "Federal law lets employers round punch times to the nearest quarter hour, as long as the rounding is neutral over time — it must favor neither the employer nor the employee across a pay period. This guide walks through where the 7-minute boundary falls, why 8:07 rounds down but 8:08 rounds up, and how a two-week timesheet can quietly lose 20 to 40 minutes a period to one-sided rounding. You will also find a worked comparison: the same punch times converted exactly versus rounded, with the pay difference at $18 an hour.",
  },
  {
    href: "/guides/overtime-decimal-hours",
    title: "Overtime in Decimal Hours",
    description:
      "The 40-hour weekly rule, time-and-a-half math with worked pay examples, state daily-overtime rules, and four mistakes that cost real money.",
    summary:
      "Overtime is triggered by a plain comparison: total decimal hours in a workweek against 40.00. That is why the conversion matters — a week recorded as 39.50 in decimals is genuinely under the line, while the same hours written as 39:50 on a hand-converted sheet may actually be 40.33 and owed an overtime premium. The guide covers the federal time-and-a-half calculation with full numbers, the states that add daily overtime (California over 8 hours a day, for example), and four recurring mistakes: rounding before totaling, skipping the premium on the decimal portion, miscounting a shift that crosses midnight, and treating paid breaks as unpaid time.",
  },
  {
    href: "/guides/biweekly-timesheet-guide",
    title: "Biweekly Timesheet Guide",
    description:
      "A complete walkthrough: from clock times to decimal hours, week-by-week totals, overtime handling, and auditing the paycheck that follows.",
    summary:
      "A biweekly pay period is ten working days, and the arithmetic only stays honest if every day is converted to decimals before anything is added. This guide follows one real two-week timesheet from raw punch times to the paycheck that results: converting each day with the hours-plus-minutes formula, totaling each week separately (because overtime is weekly, not per-period), carrying the second week's total even when it crosses a month boundary, and then multiplying regular and overtime hours at their own rates. It ends with a short audit checklist you can run against your own pay stub — the three numbers that should match, and the two that commonly do not.",
  },
  {
    href: "/guides/military-time-on-timesheets",
    title: "Military Time on Timesheets",
    description:
      "Reading the 24-hour clock on punch records, converting to and from 12-hour time, night shifts across midnight, and why 1430 and 14.30 are not the same.",
    summary:
      "Time clocks in hospitals, factories, and transit often punch in 24-hour time: 0730 for 7:30 AM, 1745 for 5:45 PM. The notation is compact, but it collides badly with decimal hours — writing 14.30 when the punch said 1430 is the single most expensive notation error on a timesheet, because 14.30 decimal hours is 14 hours 18 minutes, not 14 hours 30 minutes. The guide covers converting 24-hour times to 12-hour times and back, handling night shifts that cross midnight (2200 to 0600 is 8 hours, not negative 16), and a conversion table of the most common punch times with their true decimal equivalents.",
  },
  {
    href: "/guides/minutes-to-decimal-excel",
    title: "Minutes to Decimal in Excel",
    description:
      "Excel formulas for decimal hours: =A1*24, =A1*1440, HOUR/MINUTE decomposition, the fraction-of-a-day trap, cell-format fixes, and a worked three-day timesheet.",
    summary:
      "Excel stores 7:45 as a fraction of a day (0.322917), which is why the decimal-hours formula is a multiplication — =A1*24 returns 7.75 where a ÷60 approach gives nonsense. This guide gives the full formula reference (decimal hours, total minutes, seconds, HOUR/MINUTE decomposition, two-place rounding), the two traps that break it (the result cell inheriting time format, and time stored as text with a #VALUE! error), the MOD fix for shifts that cross midnight, and a worked three-day week from punch times to decimal hours. The same formulas work unchanged in Google Sheets.",
  },
];

// EN ↔ ES hreflang 对照（首批西语页；有新对照页时在此登记，两侧 metadata 自动生效）
export const ES_ALTERNATES: Record<string, string> = {
  "/": "/es",
  "/minutes-to-decimal-chart": "/es/tabla-minutos-a-decimales",
  "/20-minutes-in-decimal": "/es/20-minutos-a-decimales",
  "/45-minutes-in-decimal": "/es/45-minutos-a-decimales",
  "/30-minutes-in-decimal": "/es/30-minutos-a-decimales",
  "/10-minutes-in-decimal": "/es/10-minutos-a-decimales",
  "/90-seconds-to-minutes": "/es/90-segundos-a-minutos",
  "/600-seconds-to-minutes": "/es/600-segundos-a-minutos",
};

// 西语页反向映射（es 路径 → en 路径）
export const EN_ALTERNATES: Record<string, string> = Object.fromEntries(
  Object.entries(ES_ALTERNATES).map(([en, es]) => [es, en])
);

export const HEADER_NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_COLS: {
  heading: string;
  links: { href: string; label: string }[];
}[] = [
  {
    heading: "Tools",
    links: [
      { href: "/tools", label: "All Tools" },
      { href: "/", label: "Minutes to Decimal" },
      { href: "/weekly-timesheet-calculator", label: "Weekly Timesheet Calculator" },
      { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
      { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
      { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
      { href: "/embed", label: "Embed Widget" },
    ],
  },
  {
    heading: "More converters",
    links: [
      { href: "/hours-to-minutes-calculator", label: "Hours to Minutes Calculator" },
      { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
      { href: "/decimal-to-hours-calculator", label: "Decimal to Hours Calculator" },
      { href: "/decimal-to-minutes", label: "Decimal to Minutes Converter" },
      { href: "/seconds-to-minutes-converter", label: "Seconds to Minutes Converter" },
      { href: "/90-seconds-to-minutes", label: "90 Seconds to Minutes" },
      { href: "/600-seconds-to-minutes", label: "600 Seconds to Minutes" },
      { href: "/time-card-rounding-calculator", label: "Time Card Rounding Calculator" },
      { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { href: "/guides", label: "All Guides" },
      { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
      { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
      { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
      { href: "/guides/military-time-on-timesheets", label: "Military Time on Timesheets" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/es", label: "Español" },
    ],
  },
];
