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
    "Convert decimal hours back into hours and minutes (e.g. 1.75 → 1h 45m). Free, instant tool for reading timesheets.",
  alternates: { canonical: "https://minutestodecimal.org/decimal-to-hours-calculator" },
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
    q: "Why would I convert decimal hours back to hours and minutes?",
    a: "When a timesheet shows 7.5 hours, it helps to see that as 7 hours 30 minutes to plan a shift or compare it with a clock-in time.",
  },
  {
    q: "How do I go the other way, minutes to decimal?",
    a: "Use the Minutes to Decimal Converter to turn hours and minutes into a single decimal number.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["0.25 hours", "0h 15m"],
  ["0.50 hours", "0h 30m"],
  ["0.75 hours", "0h 45m"],
  ["1.75 hours", "1h 45m"],
  ["2.25 hours", "2h 15m"],
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
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Decimal to Hours Calculator",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </div>
    </article>
  );
}
