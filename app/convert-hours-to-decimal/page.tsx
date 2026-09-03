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
    "Convert hours and minutes to decimal hours for payroll and time tracking. Free tool, instant results, no sign-up needed.",
  alternates: { canonical: "https://www.minutestodecimal.org/convert-hours-to-decimal" },
};

const faq = [
  {
    q: "How do you convert hours to decimal hours?",
    a: "Add the hours to the minutes divided by 60. So 3 hours 20 minutes = 3 + (20 ÷ 60) = 3.3333 decimal hours. Type it into the calculator above to confirm.",
  },
  {
    q: "What is 8 hours 45 minutes as a decimal?",
    a: "8 hours 45 minutes = 8.75 decimal hours, since 45 minutes is three-quarters of an hour (0.75).",
  },
  {
    q: "How do I convert decimal hours back to hours and minutes?",
    a: "Use the bottom box: enter the decimal (for example 2.5) and it returns 2h 30m. Keep the whole number as hours and multiply the decimal part by 60 for the minutes.",
  },
  {
    q: "Is decimal time the same as decimal hours?",
    a: "Yes. In payroll, \"decimal time\" means expressing a duration as a decimal number of hours instead of hours and minutes, which makes multiplication by an hourly rate straightforward.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["3 hours", "3.0000"],
  ["3 hours 20 minutes", "3.3333"],
  ["5 hours 45 minutes", "5.7500"],
  ["6 hours 30 minutes", "6.5000"],
  ["8 hours 45 minutes", "8.7500"],
  ["10 hours", "10.0000"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Convert Hours to Decimal"
        description="Change hours and minutes into decimal hours for payroll and timesheets. Free, instant, and reversible."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="How to convert hours to decimal">
          <p>
            Time cards and payroll software usually store worked time as a single decimal number
            of hours. To get there from a clock-in time, convert the minutes first:
          </p>
          <Formula>decimal hours = hours + (minutes ÷ 60)</Formula>
          <p>
            For instance, 5 hours 45 minutes becomes 5 + (45 ÷ 60) = 5.75 hours. The calculator
            above does the division and addition as you type, in both directions.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common decimal conversions
          </h2>
          <ConversionTable fromHeader="Hours & minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/minutes-to-decimal-hours-converter", label: "Minutes to Decimal Hours" },
            { href: "/", label: "Minutes to Decimal Converter" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Convert Hours to Decimal",
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
