import type { Metadata } from "next";
import UnitConverter from "@/components/UnitConverter";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Decimal to Hours Calculator",
  description:
    "Convert decimal hours back into hours and minutes (e.g. 1.75 → 1h 45m). Free, instant tool for reading timesheets and pay stubs.",
  alternates: { canonical: "https://www.minutestodecimal.org/decimal-to-hours-calculator" },
};

const faq = [
  {
    q: "What is 1.75 decimal hours in hours and minutes?",
    a: "1.75 hours = 1 hour 45 minutes. The 0.75 of an hour is 45 minutes (0.75 × 60 = 45). Enter 1.75 above to confirm.",
  },
  {
    q: "How do I read 2.25 hours?",
    a: "2.25 hours = 2 hours 15 minutes (0.25 × 60 = 15). Decimal hours split the fractional part into minutes this way.",
  },
  {
    q: "What does 7.67 hours mean on my pay stub?",
    a: "0.67 × 60 = 40.2, so 7.67 hours is 7 hours and about 40 minutes, most likely a shift of 7 hours 40 minutes (7 + 40 ÷ 60 = 7.6667, rounded to 7.67). Any two-place decimal can be read this way: multiply the part after the point by 60.",
  },
  {
    q: "Why would I convert decimal hours back to hours and minutes?",
    a: "When a timesheet shows 7.5 hours, it helps to see that as 7 hours 30 minutes to plan a shift or compare it with a clock-in time. Payroll math wants decimals; humans planning their day think in hours and minutes.",
  },
  {
    q: "Is 0.25 hours 25 minutes?",
    a: "No, 0.25 hours is 15 minutes. Twenty-five minutes is 25 ÷ 60 = 0.4167 decimal hours. The decimal part of an hour counts sixtieths, so multiply it by 60 to get minutes.",
  },
  {
    q: "How do I convert a weekly total like 38.42 hours?",
    a: "The whole number stays: 38 hours. The fraction: 0.42 × 60 = 25.2, about 25 minutes. So 38.42 hours is roughly 38 hours 25 minutes across the week. The converter above does the same math for any value, to the minute.",
  },
  {
    q: "How do I go the other way, minutes to decimal?",
    a: "Use the Minutes to Decimal Converter to turn hours and minutes into a single decimal number.",
  },
  {
    q: "Does this work for values over 24 hours?",
    a: "Yes. 45.75 decimal hours is 45 hours 45 minutes. Decimal hours are a duration, not a clock time, so there is no 24-hour limit to worry about.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["0.25 hours", "0h 15m"],
  ["0.50 hours", "0h 30m"],
  ["0.75 hours", "0h 45m"],
  ["1.20 hours", "1h 12m"],
  ["1.75 hours", "1h 45m"],
  ["2.25 hours", "2h 15m"],
  ["3.60 hours", "3h 36m"],
  ["6.50 hours", "6h 30m"],
  ["7.67 hours", "7h 40m"],
  ["8.75 hours", "8h 45m"],
  ["40.00 hours", "40h 00m"],
  ["42.50 hours", "42h 30m"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Decimal to Hours Calculator"
        description="Read a decimal time value as ordinary hours and minutes. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="decimalToHours" />
        </div>

        <AdSlot />

        <ProseSection title="How to convert decimal hours to hours and minutes">
          <p>Keep the whole number as hours, then multiply the decimal part by 60 to get minutes:</p>
          <Formula>hours = floor(d); minutes = round((d − hours) × 60)</Formula>
          <p>
            So 1.75 becomes 1 hour and 45 minutes. This is the reverse of the decimal conversion
            used on timesheets.
          </p>
        </ProseSection>

        <ProseSection title="Reading a pay stub in decimal hours">
          <p>
            Pay stubs and payroll reports list hours in decimal form, which is compact but not how
            anyone thinks about their day. A line reading <strong>86.67 hours</strong> for a
            two-week period is awkward to picture; converting it gives 86 hours 40 minutes, and the
            extra 6.67 hours over 80 stand out immediately as overtime once you see them.
          </p>
          <p>
            The trick that makes this fast: the decimal part is sixtieths. To read 0.67, ask what
            fraction of 60 it is: 0.67 × 60 ≈ 40 minutes. Landmarks help too: .25 is 15 minutes,
            .50 is 30, and .75 is 45. More than half the decimals you will meet on a pay stub are
            one of those three.
          </p>
        </ProseSection>

        <ProseSection title="Spotting errors in a payroll total">
          <p>
            Converting back is also a quick audit. Suppose you know you worked five 8-hour days and
            one 4-hour day, and payroll reports 44.25 hours. Converting 44.25 gives 44 hours 15
            minutes, but your own count is 44 hours flat. The 15-minute difference is small enough
            to hide in a rounding rule and big enough to be worth asking payroll about.
          </p>
          <p>
            For the rules employers are allowed to round by, see the time card rounding guide; for
            how overtime hours get calculated from these decimals, see the overtime guide.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common conversions
          </h2>
          <ConversionTable fromHeader="Decimal hours" toHeader="Hours & minutes" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/", label: "Minutes to Decimal Converter" },
            { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Decimal to Hours Calculator",
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
