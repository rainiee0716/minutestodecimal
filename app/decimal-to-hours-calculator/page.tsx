import type { Metadata } from "next";
import UnitConverter from "@/components/UnitConverter";

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

export default function Page() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">Decimal to Hours Calculator</h1>
      <p className="mb-6 text-muted">
        Read a decimal time value as ordinary hours and minutes. Free and instant.
      </p>

      <UnitConverter mode="decimalToHours" />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-ink">How to convert decimal hours to hours and minutes</h2>
        <p className="text-slate-700">
          Keep the whole number as hours, then multiply the decimal part by 60 to get minutes:
        </p>
        <p className="my-3 rounded-lg bg-slate-50 p-3 text-center font-mono text-brand-dark">
          hours = floor(d); minutes = round((d − hours) × 60)
        </p>
        <p className="text-slate-700">
          So 1.75 becomes 1 hour and 45 minutes. This is the reverse of the decimal conversion used on timesheets.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Common conversions</h2>
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {[
            ["0.25 hours", "0h 15m"],
            ["0.50 hours", "0h 30m"],
            ["0.75 hours", "0h 45m"],
            ["1.75 hours", "1h 45m"],
            ["2.25 hours", "2h 15m"],
          ].map(([a, b]) => (
            <li key={a} className="flex justify-between px-4 py-2 text-sm">
              <span className="text-slate-700">{a}</span>
              <span className="font-semibold text-brand-dark">{b}</span>
            </li>
          ))}
        </ul>
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
        </a>{" "}
        ·{" "}
        <a href="/minutes-to-hours-converter" className="text-brand no-underline hover:text-brand-dark">
          Minutes to Hours Converter
        </a>
      </section>

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
    </article>
  );
}
