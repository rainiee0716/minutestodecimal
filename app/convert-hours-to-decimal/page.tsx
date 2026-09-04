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
  title: "Convert Hours to Decimal",
  description:
    "Learn to convert hours and minutes to decimal hours by hand, step by step, with a minute-by-minute lookup table and the common mistakes to avoid.",
  alternates: { canonical: "https://www.minutestodecimal.org/convert-hours-to-decimal" },
};

const faq = [
  {
    q: "How do you convert hours to decimal hours by hand?",
    a: "Keep the whole hours aside, divide the minutes by 60, then add the two results. For 5 hours 47 minutes: 47 ÷ 60 = 0.7833, and 5 + 0.7833 = 5.7833 decimal hours.",
  },
  {
    q: "Is there a mental shortcut for dividing minutes by 60?",
    a: "Yes. Dividing by 60 is the same as dividing by 6 and then moving the decimal point one place left. For 42 minutes: 42 ÷ 6 = 7, so 42 minutes is 0.7 of an hour. For 24 minutes: 24 ÷ 6 = 4, so 0.4 of an hour.",
  },
  {
    q: "What is 3 hours 20 minutes in decimal?",
    a: "20 ÷ 60 = 0.3333, so 3 hours 20 minutes is 3.3333 decimal hours, usually written 3.33. This is a common one on timesheets because 20 minutes does not fall on a quarter-hour mark.",
  },
  {
    q: "Why is 0.30 not the same as 30 minutes?",
    a: "Because the decimal part counts sixtieths, not hundredths. 0.30 of an hour is 0.30 × 60 = 18 minutes. Thirty minutes is 30 ÷ 60 = 0.50. Writing 2.30 when you mean 2 hours 30 minutes (correctly 2.50) is the single most common timesheet error.",
  },
  {
    q: "What are the quarter-hour landmark values worth memorizing?",
    a: "Four of them cover most timesheet entries: 15 minutes = 0.25, 30 minutes = 0.50, 45 minutes = 0.75, and a full hour = 1.00. If your shift is 6h 45m you can write 6.75 without any division.",
  },
  {
    q: "What do I do with repeating decimals like 20 ÷ 60?",
    a: "Round to two decimal places for a manual timesheet (0.3333 becomes 0.33) or to four places if your system records them (3.3333). Over one shift the difference is under a minute; payroll systems that track four places do it so tiny remainders add up fairly across a pay period.",
  },
  {
    q: "How do I convert seconds as well as minutes?",
    a: "Convert seconds to minutes first by dividing by 60, then fold the result into the minutes before dividing by 60 again. For 2h 45m 30s: 30 seconds is 0.5 minutes, so you have 2h 45.5m, which is 2 + (45.5 ÷ 60) = 2.7583 decimal hours.",
  },
  {
    q: "How do I convert decimal hours back to hours and minutes?",
    a: "Keep the whole number as hours and multiply the decimal part by 60 to get minutes. 4.6 hours is 4 hours and 0.6 × 60 = 36 minutes, or 4h 36m. The second box on this page does it for you.",
  },
];

// Five-minute increments across one hour: the practical hand-conversion lookup.
const CONVERSIONS: [string, string][] = [
  ["5 minutes", "0.0833"],
  ["10 minutes", "0.1667"],
  ["15 minutes", "0.2500"],
  ["20 minutes", "0.3333"],
  ["25 minutes", "0.4167"],
  ["30 minutes", "0.5000"],
  ["35 minutes", "0.5833"],
  ["40 minutes", "0.6667"],
  ["45 minutes", "0.7500"],
  ["50 minutes", "0.8333"],
  ["55 minutes", "0.9167"],
  ["60 minutes", "1.0000"],
  ["70 minutes", "1.1667"],
  ["80 minutes", "1.3333"],
  ["90 minutes", "1.5000"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Convert Hours to Decimal"
        description="Convert hours and minutes to decimal hours by hand or with the free tool below. Step-by-step method, lookup table, and common mistakes."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="The formula">
          <p>
            One minute is 1/60 of an hour, so the conversion is a single division and a single
            addition:
          </p>
          <Formula>decimal hours = hours + (minutes ÷ 60)</Formula>
          <p>
            The hours pass through untouched. Only the minutes change. If you logged 3 hours 10
            minutes, the 3 stays a 3, and 10 ÷ 60 = 0.1667, giving 3.1667 decimal hours.
          </p>
        </ProseSection>

        <ProseSection title="A worked example, step by step">
          <p>
            Say your time card shows <strong>5 hours 47 minutes</strong> and payroll wants a decimal.
          </p>
          <p>
            Step 1: set the hours aside. You will add them back at the end, so remember the 5.
            Step 2: divide the minutes by 60. On paper, 47 ÷ 60 = 0.7833 (the calculator on this
            page shows four decimal places). Step 3: add the hours back: 5 + 0.7833 = 5.7833.
          </p>
          <p>
            Most timesheets only want two places, so write 5.78. Check it in the converter above by
            entering 5 and 47: you get the same 5.7833 before rounding.
          </p>
        </ProseSection>

        <ProseSection title="The mistake almost everyone makes once">
          <p>
            Decimal hours count fractions of an hour in <em>tenths</em>, not in minutes. So 0.30 of
            an hour is 18 minutes (0.30 × 60), not 30. If you mean &ldquo;2 hours and 30
            minutes,&rdquo; the decimal is 2.50, because 30 ÷ 60 = 0.50.
          </p>
          <p>
            A quick self-check: whole quarter hours always end in .00, .25, .50, or .75. So 2 hours
            30 minutes must be written 2.50. The entry 2.30 is still a legal value, but it means
            something different: 2 hours and 18 minutes (0.30 × 60 = 18).
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Minutes to decimal lookup table
          </h2>
          <ConversionTable fromHeader="Minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
            For minute counts not in the table, divide by 60, or just enter the full hours and
            minutes in the converter above.
          </p>
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/minutes-to-decimal-hours-converter", label: "Minutes to Decimal Hours" },
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Convert Hours to Decimal",
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
