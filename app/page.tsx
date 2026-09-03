import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";

export const metadata: Metadata = {
  title: "Minutes to Decimal Converter",
  description:
    "Free tool to convert hours and minutes into decimal time for payroll and timesheets. Instant, accurate, no sign-up.",
  alternates: { canonical: "https://minutestodecimal.org/" },
};

const faq = [
  {
    q: "How do I convert 30 minutes to decimal?",
    a: "30 minutes equals 0.5 decimal hours, because 30 ÷ 60 = 0.5. Use the converter above: enter 0 hours and 30 minutes to see it instantly.",
  },
  {
    q: "What is 1 hour 45 minutes in decimal?",
    a: "1 hour 45 minutes = 1.75 decimal hours (45 ÷ 60 = 0.75). Enter 1 and 45 above to confirm.",
  },
  {
    q: "Why do payroll systems use decimal time?",
    a: "Payroll calculates wages per decimal hour. Converting 1h 30m to 1.5 makes it easy to multiply by an hourly rate. Most timesheets require decimal format.",
  },
  {
    q: "How do I convert decimal time back to hours and minutes?",
    a: "Use the right-hand converter. For example, 1.5 decimal hours becomes 1 hour 30 minutes; 2.25 becomes 2 hours 15 minutes.",
  },
];

export default function Home() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">Minutes to Decimal Converter</h1>
      <p className="mb-6 text-muted">
        Convert hours and minutes into decimal time for payroll, timesheets, and time cards. Free, instant, no
        sign-up.
      </p>

      <TimeDecimalCalculator />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-ink">What is decimal time?</h2>
        <p className="text-slate-700">
          Decimal time expresses a duration as a single number of hours. Instead of writing a shift as &ldquo;1 hour
          30 minutes,&rdquo; you write it as <strong>1.5 hours</strong>. Employers and payroll software use this
          format because it is easy to multiply by an hourly wage. The formula is simple:
        </p>
        <p className="my-3 rounded-lg bg-slate-50 p-3 text-center font-mono text-brand-dark">
          decimal hours = hours + (minutes ÷ 60)
        </p>
        <p className="text-slate-700">
          It is used by hourly employees, freelancers, and small-business owners who track work time on a timesheet.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Examples</h2>
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {[
            ["15 minutes", "0.25 hours"],
            ["30 minutes", "0.50 hours"],
            ["45 minutes", "0.75 hours"],
            ["1 hour 30 minutes", "1.50 hours"],
            ["2 hours 45 minutes", "2.75 hours"],
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
        <a href="/time-to-decimal-calculator" className="text-brand no-underline hover:text-brand-dark">
          Time to Decimal Calculator
        </a>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Minutes to Decimal Converter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </article>
  );
}
