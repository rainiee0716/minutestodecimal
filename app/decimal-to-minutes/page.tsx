import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Decimal to Minutes Converter",
  description:
    "Convert decimal hours to minutes for payroll and timesheets. See what 0.25, 0.5, or 0.75 hours equal in minutes, plus a free converter.",
  alternates: { canonical: "https://www.minutestodecimal.org/decimal-to-minutes" },
};

const faq = [
  {
    q: "How do you convert decimal hours to minutes?",
    a: "Multiply the decimal part by 60. For 1.5 hours: the 1 is one full hour, and 0.5 × 60 = 30 minutes, so 1.5 hours = 1 hour 30 minutes. The converter above does this for any value.",
  },
  {
    q: "What is 0.5 hours in minutes?",
    a: "0.5 hours = 30 minutes (0.5 × 60 = 30).",
  },
  {
    q: "What is 0.75 hours in minutes?",
    a: "0.75 hours = 45 minutes (0.75 × 60 = 45).",
  },
  {
    q: "What is 0.25 hours in minutes?",
    a: "0.25 hours = 15 minutes (0.25 × 60 = 15).",
  },
  {
    q: "Why does payroll show time as decimal hours?",
    a: "Payroll multiplies decimal hours by your hourly rate. Keeping one number format lets every entry in a pay period be added with plain addition, so wages calculate without converting back and forth.",
  },
];

const DEC_ROWS: [string, string][] = [
  ["0.25 hours", "15 minutes"],
  ["0.50 hours", "30 minutes"],
  ["0.75 hours", "45 minutes"],
  ["1.00 hours", "60 minutes"],
  ["1.25 hours", "75 minutes (1h 15m)"],
  ["1.50 hours", "90 minutes (1h 30m)"],
  ["1.75 hours", "105 minutes (1h 45m)"],
  ["2.00 hours", "120 minutes (2h)"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Decimal to Minutes Converter"
        description="Turn decimal hours back into minutes for your timesheet. Free and instant, no sign-up."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="How to convert decimal hours to minutes">
          <p>
            A decimal hour is just a fraction of an hour written in base 10. To get minutes back,
            multiply the decimal part by 60.
          </p>
          <p className="text-lg font-medium text-ink">
            Example: 1.5 hours = 1 hour + (0.5 × 60) = 1 hour 30 minutes.
          </p>
          <p>
            Use the right-hand converter above: type a decimal like 1.5 and it shows 1h 30m. For
            common values, scan the chart below.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Decimal hours to minutes
          </h2>
          <ConversionTable fromHeader="Decimal hours" toHeader="Minutes" rows={DEC_ROWS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
            { href: "/", label: "Minutes to Decimal Converter" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Decimal to Minutes Converter",
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
