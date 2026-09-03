import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Time to Decimal Calculator",
  description:
    "Convert clock time and work shifts into decimal hours for payroll and timesheets. Free and instant.",
  alternates: { canonical: "https://www.minutestodecimal.org/time-to-decimal-calculator" },
};

const faq = [
  {
    q: "How do I convert a shift time to decimal hours?",
    a: "Take the total elapsed time of the shift and enter it as hours and minutes above. For example, an 8-hour 45-minute shift becomes 8.75 decimal hours.",
  },
  {
    q: "What is 7 hours 30 minutes in decimal?",
    a: "7 hours 30 minutes = 7.5 decimal hours (30 ÷ 60 = 0.5). Enter 7 and 30 to confirm.",
  },
  {
    q: "Can I convert decimal hours back to a shift length?",
    a: "Yes. Use the right-hand converter: 7.5 decimal hours becomes 7 hours 30 minutes.",
  },
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Time to Decimal Calculator"
        description="Turn a work shift or clock duration into decimal hours for your timesheet. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="Why convert time to decimal?">
          <p>
            When you log a shift on a timesheet, payroll needs a single decimal number, not
            &ldquo;7h 30m.&rdquo; Converting makes the math straightforward: multiply decimal hours
            by your hourly rate to get gross pay. The converter above handles both directions.
          </p>
        </ProseSection>

        <FAQList items={faq} />

        <RelatedLinks links={[{ href: "/", label: "Minutes to Decimal Converter" }]} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Time to Decimal Calculator",
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
