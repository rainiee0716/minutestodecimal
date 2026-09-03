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
  title: "Minutes to Hours Converter",
  description:
    "Convert minutes into decimal hours for timesheets and payroll. Free, instant, no sign-up required.",
  alternates: { canonical: "https://www.minutestodecimal.org/minutes-to-hours-converter" },
};

const faq = [
  {
    q: "How do I convert 90 minutes to hours?",
    a: "90 minutes = 1.5 hours, because 90 ÷ 60 = 1.5. Enter 90 above to see it instantly.",
  },
  {
    q: "What is 45 minutes in decimal hours?",
    a: "45 minutes = 0.75 hours (45 ÷ 60 = 0.75). This is the decimal form most payroll systems expect.",
  },
  {
    q: "Why do timesheets use decimal hours?",
    a: "Payroll multiplies decimal hours by your hourly rate. 1.5 hours × $20 = $30. Decimal format keeps the math simple across a whole pay period.",
  },
  {
    q: "How do I convert hours and minutes (like 1h 30m) to decimal?",
    a: "Use the Minutes to Decimal Converter: enter 1 hour and 30 minutes to get 1.5 decimal hours.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["15 minutes", "0.25 hours"],
  ["30 minutes", "0.50 hours"],
  ["45 minutes", "0.75 hours"],
  ["90 minutes", "1.50 hours"],
  ["120 minutes", "2.00 hours"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Minutes to Hours Converter"
        description="Change a number of minutes into decimal hours for your timesheet. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="minutesToHours" />
        </div>

        <AdSlot />

        <ProseSection title="How to convert minutes to hours">
          <p>Because there are 60 minutes in an hour, divide the minutes by 60 to get decimal hours:</p>
          <Formula>decimal hours = minutes ÷ 60</Formula>
          <p>
            For example, a 90-minute meeting is 1.5 hours, and a 45-minute task is 0.75 hours.
            Payroll software reads these decimal values directly.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common conversions
          </h2>
          <ConversionTable fromHeader="Minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/hours-to-minutes-calculator", label: "Hours to Minutes Calculator" },
            { href: "/", label: "Minutes to Decimal Converter" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Minutes to Hours Converter",
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
