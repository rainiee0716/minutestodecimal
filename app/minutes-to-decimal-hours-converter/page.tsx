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
  title: "Minutes to Decimal Hours Converter",
  description:
    "Convert minutes (or hours and minutes) into decimal hours for payroll and timesheets. Free, instant, no sign-up required.",
  alternates: { canonical: "https://www.minutestodecimal.org/minutes-to-decimal-hours-converter" },
};

const faq = [
  {
    q: "How do I convert minutes to decimal hours?",
    a: "Divide the minutes by 60. 90 minutes ÷ 60 = 1.5 decimal hours. If you have hours and minutes, enter them above; the tool adds the two together automatically.",
  },
  {
    q: "What is 45 minutes in decimal hours?",
    a: "45 minutes = 0.75 decimal hours, because 45 is three-quarters of 60. Enter 0 hours and 45 minutes to see it.",
  },
  {
    q: "What is 90 minutes as decimal hours?",
    a: "90 minutes = 1.50 decimal hours. This is the same as 1 hour 30 minutes entered into the calculator.",
  },
  {
    q: "Why convert minutes to decimal hours for payroll?",
    a: "Payroll multiplies an hourly rate by decimal hours. Converting logged minutes to a decimal first keeps the math exact across every shift in a pay period.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["30 minutes", "0.5000"],
  ["45 minutes", "0.7500"],
  ["90 minutes", "1.5000"],
  ["1 hour 15 minutes", "1.2500"],
  ["2 hours 30 minutes", "2.5000"],
  ["3 hours 45 minutes", "3.7500"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Minutes to Decimal Hours Converter"
        description="Turn minutes, or hours and minutes, into decimal hours for payroll and timesheets. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="How to convert minutes to decimal hours">
          <p>
            A decimal hour is just the fraction of an hour your minutes represent. Since 1 hour =
            60 minutes, divide the minutes by 60:
          </p>
          <Formula>decimal hours = minutes ÷ 60</Formula>
          <p>
            If you logged a time like 1 hour 15 minutes, add them together: 1 + (15 ÷ 60) = 1.25
            decimal hours. The converter above handles the hours and minutes together, and also
            reverses the math if you start from a decimal.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common minutes to decimal hours
          </h2>
          <ConversionTable fromHeader="Minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/convert-hours-to-decimal", label: "Convert Hours to Decimal" },
            { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Minutes to Decimal Hours Converter",
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
