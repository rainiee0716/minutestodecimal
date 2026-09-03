import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";

export const metadata: Metadata = {
  title: "Time to Decimal Calculator",
  description:
    "Convert clock time and work shifts into decimal hours for payroll and timesheets. Free and instant.",
  alternates: { canonical: "https://minutestodecimal.org/time-to-decimal-calculator" },
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
      <h1 className="mb-2 text-3xl font-bold text-ink">Time to Decimal Calculator</h1>
      <p className="mb-6 text-muted">
        Turn a work shift or clock duration into decimal hours for your timesheet. Free and instant.
      </p>

      <TimeDecimalCalculator />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-ink">Why convert time to decimal?</h2>
        <p className="text-slate-700">
          When you log a shift on a timesheet, payroll needs a single decimal number, not &ldquo;7h 30m.&rdquo;
          Converting makes the math straightforward: multiply decimal hours by your hourly rate to get gross pay. The
          converter above handles both directions.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Frequently asked questions</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q}>
              <h3 className="font-semibold text-ink">{item.q}</h3>
              <p className="text-slate-700">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-4 text-sm text-muted">
        Related:{" "}
        <a href="/" className="text-brand no-underline hover:text-brand-dark">
          Minutes to Decimal Converter
        </a>
      </section>

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
    </article>
  );
}
