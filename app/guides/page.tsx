import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Timesheet Guides",
  description: "Plain-language guides to timesheet math: rounding rules, overtime in decimal hours, biweekly timesheets, and military time.",
  path: "/guides",
  absoluteTitle: false,
});

const GUIDES = [
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
];

export default function GuidesIndex() {
  return (
    <article>
      <PageHeader
        title="Timesheet Guides"
        description="Plain-language guides to the math behind timesheets, rounding, and overtime. No jargon, worked examples throughout."
      />

      <div className="container pb-16">
        <div className="mx-auto mb-8 max-w-3xl text-center text-slate-600">
          <p>
            The converters on this site do the arithmetic; these guides explain what the arithmetic
            is for. Each one covers a single payroll topic with worked numbers, from how employers
            round clock times to how overtime is computed from decimal hours.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {GUIDES.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="block rounded-xl border border-slate-200 bg-white p-6 no-underline shadow-card transition-colors hover:border-brand-300"
            >
              <h2 className="text-lg font-semibold text-ink">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.summary}</p>
            </a>
          ))}
        </div>

        <RelatedLinks
          title="Tools"
          links={[
            { href: "/tools", label: "All Tools" },
            { href: "/weekly-timesheet-calculator", label: "Weekly Timesheet Calculator" },
            { href: "/", label: "Minutes to Decimal Converter" },
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
          ]}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ])}
        />
      </div>
    </article>
  );
}
