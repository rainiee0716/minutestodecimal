import { pageMetadata } from "@/lib/seo";
import UnitConverter from "@/components/UnitConverter";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = pageMetadata({
  title: "Decimal to Hours Calculator",
  description: "Convert decimal hours back into hours and minutes (e.g. 1.75 \u2192 1h 45m). Free, instant tool for reading timesheets and pay stubs.",
  path: "/decimal-to-hours-calculator",
  absoluteTitle: false,
});

const faq = [
  {
    q: "What is 1.75 in hours?",
    a: "1.75 decimal hours is 1 hour 45 minutes. The whole number 1 is the hours, and 0.75 × 60 = 45 minutes. Enter 1.75 above to confirm.",
  },
  {
    q: "What is 2.5 hours in hours and minutes?",
    a: "2.5 hours = 2 hours 30 minutes (0.5 × 60 = 30). It is a common value on pay stubs for a two-and-a-half-hour shift or meeting block.",
  },
  {
    q: "What is 0.3 hours?",
    a: "0.3 hours is 18 minutes (0.3 × 60 = 18). Note it is not 30 minutes — thirty minutes is 0.50 decimal hours.",
  },
  {
    q: "What is 1.5 hours in hours and minutes?",
    a: "1.5 hours = 1 hour 30 minutes. Half an hour is 0.50, so any x.5 value is x hours plus exactly 30 minutes.",
  },
  {
    q: "What is 3.5 hours in hours and minutes?",
    a: "3.5 hours = 3 hours 30 minutes, the same pattern as 1.5 and 2.5: the .5 after the point is always 30 minutes.",
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
  ["0.30 hours", "0h 18m"],
  ["0.50 hours", "0h 30m"],
  ["0.75 hours", "0h 45m"],
  ["1.20 hours", "1h 12m"],
  ["1.50 hours", "1h 30m"],
  ["1.75 hours", "1h 45m"],
  ["2.25 hours", "2h 15m"],
  ["2.50 hours", "2h 30m"],
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

        <ProseSection title="The exact values people look up most">
          <p>
            <strong>1.75 in hours is 1 hour 45 minutes</strong> — probably the single most-looked-up
            decimal on pay stubs. <strong>1.5 hours is 1 hour 30 minutes</strong>.{" "}
            <strong>2.5 hours is 2 hours 30 minutes</strong>. <strong>0.75 hours is 45
            minutes</strong>, <strong>0.5 hours is 30 minutes</strong>, and{" "}
            <strong>0.25 hours is 15 minutes</strong>.
          </p>
          <p>
            One value trips people up: <strong>0.3 hours is 18 minutes</strong>, not 30 — the part
            after the point counts sixtieths of an hour, so multiply it by 60. Thirty minutes as a
            decimal is 0.50.
          </p>
          <p>
            Any value ending in .25, .50, or .75 converts on sight (15, 30, or 45 minutes).
            Everything else, type into the converter above.
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
            { href: "/decimal-to-minutes", label: "Decimal to Minutes Converter" },
            { href: "/", label: "Minutes to Decimal Converter" },
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
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
