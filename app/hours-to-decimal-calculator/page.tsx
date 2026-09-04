import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Hours to Decimal Calculator",
  description:
    "Convert hours and minutes into decimal hours for payroll and timesheets. Free, instant tool with both directions, plus wage and pay-period examples.",
  alternates: { canonical: "https://www.minutestodecimal.org/hours-to-decimal-calculator" },
};

const faq = [
  {
    q: "How do I convert hours and minutes to decimal for a timesheet?",
    a: "Divide the minutes by 60 and add the result to the hours. A shift of 8 hours 45 minutes becomes 8 + (45 ÷ 60) = 8.75 decimal hours. Enter the numbers above and the calculator fills the decimal box as you type.",
  },
  {
    q: "What is 7 hours 30 minutes in decimal hours?",
    a: "7.50. Thirty minutes is half an hour, so 7h 30m is written 7.50 on a timesheet. This is one of the most common biweekly entries, because it is exactly 15 hours across two weeks at 7.5 hours a day.",
  },
  {
    q: "How do I turn decimal hours into pay?",
    a: "Multiply decimal hours by your hourly rate. If you worked 7.75 hours at $18.50 an hour, gross pay is 7.75 × 18.50 = $143.38 (payroll rounds to the cent). Always convert to decimal before multiplying.",
  },
  {
    q: "Does 8.30 on a timesheet mean 8 hours 30 minutes?",
    a: "No, and this trips up a lot of people. On a decimal timesheet, 8.30 means 8 hours and 0.30 of an hour, which is 18 minutes. If you worked 8 hours 30 minutes, the correct entry is 8.50. The second box above converts any decimal back to hours and minutes so you can check.",
  },
  {
    q: "How many decimal places should I use?",
    a: "Most payroll systems accept two decimal places (7.75), and some time clocks record four (7.7500). Two places is safe for manual timesheets; use four only if your employer asks for it, because 6h 20m is 6.3333 and rounding it to 6.33 loses a third of a minute.",
  },
  {
    q: "Should I round my time entries before or after converting?",
    a: "Convert first, then round to the precision your payroll system wants. If you round the minutes first (for example, snapping 47 minutes down to 45) you may lose pay you are entitled to. Employers that round usually do it by the quarter hour, and rounding rules are covered in our time card rounding guide.",
  },
  {
    q: "Why do employers want decimal hours instead of hours and minutes?",
    a: "Payroll software multiplies an hourly rate by a single number of hours. Decimal hours make every entry the same format, so 40 hours of entries can be summed and multiplied without anyone converting fractions of an hour by hand at the end of the period.",
  },
  {
    q: "How do I go back from decimal to hours and minutes?",
    a: "Use the second box above: type 1.75 and it shows 1h 45m. The whole number is the hours, and multiplying the decimal part by 60 gives the minutes.",
  },
];

// Quarter-hour increments from 0:15 to 8:00, the range most shifts fall into.
const CONVERSIONS: [string, string][] = [
  ["0h 15m", "0.25"],
  ["0h 30m", "0.50"],
  ["0h 45m", "0.75"],
  ["1h 00m", "1.00"],
  ["1h 15m", "1.25"],
  ["1h 30m", "1.50"],
  ["1h 45m", "1.75"],
  ["2h 00m", "2.00"],
  ["2h 15m", "2.25"],
  ["2h 30m", "2.50"],
  ["2h 45m", "2.75"],
  ["3h 00m", "3.00"],
  ["3h 15m", "3.25"],
  ["3h 30m", "3.50"],
  ["3h 45m", "3.75"],
  ["4h 00m", "4.00"],
  ["4h 15m", "4.25"],
  ["4h 30m", "4.50"],
  ["4h 45m", "4.75"],
  ["5h 00m", "5.00"],
  ["5h 15m", "5.25"],
  ["5h 30m", "5.50"],
  ["5h 45m", "5.75"],
  ["6h 00m", "6.00"],
  ["6h 15m", "6.25"],
  ["6h 30m", "6.50"],
  ["6h 45m", "6.75"],
  ["7h 00m", "7.00"],
  ["7h 15m", "7.25"],
  ["7h 30m", "7.50"],
  ["7h 45m", "7.75"],
  ["8h 00m", "8.00"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Hours to Decimal Calculator"
        description="Turn hours and minutes into decimal hours for payroll, timesheets, and billing. Free, instant, and works both ways."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="Why payroll works in decimal hours">
          <p>
            When you clock out, payroll needs one number it can multiply by your hourly rate.
            &ldquo;7 hours 30 minutes&rdquo; cannot be multiplied by $18.50 directly, but{" "}
            <strong>7.50 decimal hours</strong> can: 7.50 × 18.50 = $138.75. That is the whole
            reason timesheets ask for decimals. The conversion itself never changes:
          </p>
          <Formula>decimal hours = hours + (minutes ÷ 60)</Formula>
          <p>
            Two more examples. A shift of 8 hours 45 minutes is 8 + (45 ÷ 60) = 8.75. A short
            3-hour 20-minute shift is 3 + (20 ÷ 60) = 3.3333, usually rounded to 3.33.
          </p>
        </ProseSection>

        <ProseSection title="Adding up a full pay period">
          <p>
            The real payoff comes at the end of the week. Once every day is in decimal form, the
            total is plain addition. Say your week looks like this:
          </p>
          <p>
            Monday 8.00, Tuesday 7.75, Wednesday 8.50, Thursday 7.25, Friday 6.50. The sum is 38.00
            hours, and at $18.50 an hour the gross pay is 38.00 × 18.50 = $703.00. If the same
            entries had stayed in hours-and-minutes form (8h 00m, 7h 45m, 8h 30m, 7h 15m, 6h 30m),
            you would have to convert each one before you could add anything.
          </p>
          <p>
            Biweekly pay runs work the same way: convert each day, add all ten working days, then
            multiply once. Our biweekly timesheet guide walks through a full two-week example,
            including overtime.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Quarter-hour conversion table (0:15 to 8:00)
          </h2>
          <ConversionTable
            fromHeader="Hours & minutes"
            toHeader="Decimal hours"
            rows={CONVERSIONS}
          />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
            { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
            { href: "/convert-hours-to-decimal", label: "Convert Hours to Decimal" },
            { href: "/minutes-to-decimal-hours-converter", label: "Minutes to Decimal Hours" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Hours to Decimal Calculator",
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
            ]),
          }}
        />
      </div>
    </article>
  );
}
