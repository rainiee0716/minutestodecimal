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
        description: "Convert hours and minutes into decimal hours.",
      },
      {
        href: "/minutes-to-decimal-hours-converter",
        label: "Minutes to Decimal Hours Converter",
        description: "Convert a count of minutes into decimal hours.",
      },
      {
        href: "/convert-hours-to-decimal",
        label: "Convert Hours to Decimal",
        description: "Step-by-step hours-to-decimal conversion guide and tool.",
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
      { href: "/time-card-rounding-calculator", label: "Time Card Rounding Calculator" },
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
