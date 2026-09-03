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
    "Convert hours and minutes into decimal hours for payroll and timesheets. Free, instant tool with both directions (hours & minutes to decimal, and decimal back to hours & minutes).",
  alternates: { canonical: "https://www.minutestodecimal.org/hours-to-decimal-calculator" },
};

const faq = [
  {
    q: "How do I convert hours and minutes to decimal?",
    a: "Divide the minutes by 60 and add them to the hours. For example, 1 hour 30 minutes = 1 + (30 ÷ 60) = 1.50 decimal hours. The calculator above does this for you as you type.",
  },
  {
    q: "What is 7 hours 30 minutes in decimal?",
    a: "7 hours 30 minutes = 7.50 decimal hours, because 30 minutes is half an hour (0.5). This is the most common entry on a biweekly timesheet.",
  },
  {
    q: "Why do employers want decimal hours?",
    a: "Payroll systems multiply an hourly rate by decimal hours. Decimal time removes the need to handle fractions of an hour by hand and avoids rounding errors across a pay period.",
  },
  {
    q: "How do I go back from decimal to hours and minutes?",
    a: "Use the second box above: enter a decimal like 1.75 and it shows 1h 45m. The whole number is the hours; multiply the remainder by 60 to get the minutes.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["1 hour", "1.0000"],
  ["1 hour 30 minutes", "1.5000"],
  ["2 hours 15 minutes", "2.2500"],
  ["4 hours 45 minutes", "4.7500"],
  ["7 hours 30 minutes", "7.5000"],
  ["8 hours", "8.0000"],
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

        <ProseSection title="How to convert hours to decimal">
          <p>
            There are 60 minutes in an hour, so a minute is 1/60 of an hour (about 0.0167). To
            convert, take the minutes, divide by 60, and add the result to the whole hours:
          </p>
          <Formula>decimal hours = hours + (minutes ÷ 60)</Formula>
          <p>
            Example: 2 hours 15 minutes. 15 ÷ 60 = 0.25, so the decimal time is 2.25 hours. The
            tool above shows the same result the moment you type the numbers in.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common hours to decimal conversions
          </h2>
          <ConversionTable fromHeader="Hours & minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/convert-hours-to-decimal", label: "Convert Hours to Decimal" },
            { href: "/minutes-to-decimal-hours-converter", label: "Minutes to Decimal Hours" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Hours to Decimal Calculator",
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
