export const HEADER_NAV = [
  { href: "/time-to-decimal-calculator", label: "Time to Decimal" },
  { href: "/hours-to-decimal-calculator", label: "Hours to Decimal" },
  { href: "/convert-hours-to-decimal", label: "Convert Hours" },
  { href: "/hours-to-minutes-calculator", label: "Hours to Minutes" },
  { href: "/minutes-to-hours-converter", label: "Minutes to Hours" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_COLS: {
  heading: string;
  links: { href: string; label: string }[];
}[] = [
  {
    heading: "Converters",
    links: [
      { href: "/", label: "Minutes to Decimal" },
      { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
      { href: "/hours-to-minutes-calculator", label: "Hours to Minutes Calculator" },
      { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
      { href: "/decimal-to-hours-calculator", label: "Decimal to Hours Calculator" },
      { href: "/seconds-to-minutes-converter", label: "Seconds to Minutes Converter" },
      { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
      { href: "/convert-hours-to-decimal", label: "Convert Hours to Decimal" },
      { href: "/minutes-to-decimal-hours-converter", label: "Minutes to Decimal Hours" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [{ href: "/privacy", label: "Privacy Policy" }],
  },
];
