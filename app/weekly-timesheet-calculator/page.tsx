import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import WeeklyTimesheetCalculator from "@/components/WeeklyTimesheetCalculator";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Weekly Timesheet Calculator",
  description:
    "Calculate weekly work hours from clock times, subtract unpaid lunch breaks, split regular and overtime hours, and estimate gross pay. Free, instant, no sign-up.",
  path: "/weekly-timesheet-calculator",
  absoluteTitle: false,
});

const faq = [
  {
    q: "How do I calculate my weekly hours from clock times?",
    a: "For each day, subtract the start time from the end time, subtract any unpaid lunch break, then divide the result by 60 to get decimal hours. Add the daily decimal hours together to get the weekly total. The calculator above does this automatically, including overnight shifts.",
  },
  {
    q: "How does this calculator handle unpaid lunch breaks?",
    a: "Enter the unpaid lunch length in minutes for each day. The calculator subtracts those minutes before converting the work time into decimal hours. Paid breaks should not be subtracted because they count as hours worked.",
  },
  {
    q: "How is overtime calculated?",
    a: "The calculator compares your weekly total with the overtime threshold, which defaults to 40 hours. Any hours above the threshold are shown as overtime. If you enter an hourly rate, overtime is multiplied by 1.5 to estimate gross pay.",
  },
  {
    q: "Can I use this for overnight shifts?",
    a: "Yes. If the end time is earlier than the start time, the calculator treats the shift as crossing midnight. For example, 22:00 to 06:00 is counted as 8 hours, not negative hours.",
  },
  {
    q: "Does the calculator round my times?",
    a: "No. It shows the exact decimal total for the times you enter. If your employer rounds punches to the nearest 5, 6, or 15 minutes, use the time card rounding calculator after you apply your employer's rule.",
  },
  {
    q: "Is 40 hours always the overtime threshold?",
    a: "No. Forty hours per workweek is the common U.S. federal threshold under the FLSA, but state rules, collective bargaining agreements, and employer policies can differ. You can change the threshold in the calculator to match your situation.",
  },
  {
    q: "Why does my paycheck show different hours?",
    a: "Common reasons include unpaid lunch deductions, paid break treatment, rounding rules, a different workweek definition, or overtime being calculated by day instead of by week. Compare your own records with the pay stub week by week before contacting payroll.",
  },
];

export default function WeeklyTimesheetCalculatorPage() {
  return (
    <article>
      <PageHeader
        title="Weekly Timesheet Calculator"
        description="Turn clock-in and clock-out times into weekly decimal hours, regular hours, overtime hours, and estimated gross pay."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <WeeklyTimesheetCalculator />
        </div>

        <AdSlot />

        <ProseSection title="How the weekly timesheet calculator works">
          <p>
            Enter each day&rsquo;s start time, end time, and unpaid lunch break. The calculator
            converts the worked time into decimal hours, adds the week together, and separates
            regular hours from overtime hours.
          </p>
          <Formula>
            daily decimal hours = (end time − start time − unpaid lunch) ÷ 60
          </Formula>
          <p>
            If a shift crosses midnight, the calculator counts forward through the next day. A
            22:00-to-06:00 shift is treated as 8 hours, not a negative number.
          </p>
        </ProseSection>

        <ProseSection title="How overtime is split">
          <p>
            The calculator uses a weekly overtime threshold, which defaults to 40 hours. Hours up to
            the threshold are regular hours. Hours above the threshold are overtime hours.
          </p>
          <Formula>
            overtime hours = max(0, weekly total hours − overtime threshold)
          </Formula>
          <p>
            If you enter an hourly rate, regular hours are multiplied by that rate. Overtime hours
            are multiplied by 1.5 times that rate. For example, 43.75 total hours at $20.00 per hour
            produce 40.00 regular hours and 3.75 overtime hours. The estimated gross pay is $800.00
            plus $112.50, or $912.50.
          </p>
          <p>
            This follows the common U.S. federal overtime approach, but state rules and employment
            agreements can differ. For the official federal rule, see the{" "}
            <a
              href="https://www.dol.gov/agencies/whd/overtime"
              className="font-medium text-brand-600 no-underline transition-colors hover:text-brand-700"
            >
              U.S. Department of Labor overtime guidance
            </a>
            .
          </p>
        </ProseSection>

        <ProseSection title="When to use decimal hours">
          <p>
            Payroll systems usually total hours as decimal numbers because wages are calculated by
            multiplication. A shift of 8 hours 30 minutes becomes 8.50 hours, not 8.30. Keeping the
            week in decimal form also makes overtime easier to audit because you can compare the
            weekly total directly with the threshold.
          </p>
          <p>
            If you need to convert a single day rather than a full week, use the minutes-to-decimal
            converter. If you need to check how an employer rounds punches, use the time card
            rounding calculator.
          </p>
        </ProseSection>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
            { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
            { href: "/time-card-rounding-calculator", label: "Time Card Rounding Calculator" },
          ]}
        />

        <JsonLd
          data={[
            articleSchema({
              headline: "Weekly Timesheet Calculator",
              description:
                "Calculate weekly work hours from clock times, subtract unpaid lunch breaks, split regular and overtime hours, and estimate gross pay.",
              path: "/weekly-timesheet-calculator",
              datePublished: "2026-09-07",
              dateModified: "2026-09-07",
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Weekly Timesheet Calculator", path: "/weekly-timesheet-calculator" },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Weekly Timesheet Calculator",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]}
        />
      </div>
    </article>
  );
}
