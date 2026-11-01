export type ToolLink = {
  href: string;
  label: string;
  description: string;
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
    ],
  },
];
