import type { Metadata } from "next";
import UnitConverter from "@/components/UnitConverter";

export const metadata: Metadata = {
  title: "Minutes to Hours Converter",
  description:
    "Convert minutes into decimal hours for timesheets and payroll. Free, instant, no sign-up required.",
  alternates: { canonical: "https://minutestodecimal.org/minutes-to-hours-converter" },
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

export default function Page() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">Minutes to Hours Converter</h1>
      <p className="mb-6 text-muted">
        Change a number of minutes into decimal hours for your timesheet. Free and instant.
      </p>

      <UnitConverter mode="minutesToHours" />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-ink">How to convert minutes to hours</h2>
        <p className="text-slate-700">
          Because there are 60 minutes in an hour, divide the minutes by 60 to get decimal hours:
        </p>
        <p className="my-3 rounded-lg bg-slate-50 p-3 text-center font-mono text-brand-dark">
          decimal hours = minutes ÷ 60
        </p>
        <p className="text-slate-700">
          For example, a 90-minute meeting is 1.5 hours, and a 45-minute task is 0.75 hours. Payroll software reads
          these decimal values directly.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Common conversions</h2>
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {[
            ["15 minutes", "0.25 hours"],
            ["30 minutes", "0.50 hours"],
            ["45 minutes", "0.75 hours"],
            ["90 minutes", "1.50 hours"],
            ["120 minutes", "2.00 hours"],
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
        <a href="/hours-to-minutes-calculator" className="text-brand no-underline hover:text-brand-dark">
          Hours to Minutes Calculator
        </a>{" "}
        ·{" "}
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
            name: "Minutes to Hours Converter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </article>
  );
}
