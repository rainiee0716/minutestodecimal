import type { Metadata } from "next";
import UnitConverter from "@/components/UnitConverter";

export const metadata: Metadata = {
  title: "Hours to Minutes Calculator",
  description:
    "Convert hours (including decimal hours) and minutes into total minutes. Free, instant tool for time tracking, shifts, and payroll.",
  alternates: { canonical: "https://minutestodecimal.org/hours-to-minutes-calculator" },
};

const faq = [
  {
    q: "What is 1.5 hours in minutes?",
    a: "1.5 hours = 90 minutes, because 1 hour is 60 minutes and 0.5 hour is 30 minutes (60 + 30 = 90). Enter 1.5 above to confirm.",
  },
  {
    q: "How many minutes are in 2 hours 15 minutes?",
    a: "2 hours 15 minutes = 135 minutes (2 × 60 = 120, plus 15 = 135). Enter 2 and 15 in the converter.",
  },
  {
    q: "How many minutes are in 8 hours?",
    a: "8 hours = 480 minutes (8 × 60). This is the length of a standard full-time shift.",
  },
  {
    q: "Why convert hours to minutes?",
    a: "Some timesheets, billing systems, and scheduling tools record time in minutes. Converting makes it easy to add up a day or a week of work.",
  },
];

export default function Page() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">Hours to Minutes Calculator</h1>
      <p className="mb-6 text-muted">
        Turn hours and minutes into a single total of minutes. Useful for timesheets, shift logs, and billing. Free and
        instant.
      </p>

      <UnitConverter mode="hoursToMinutes" />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-ink">How to convert hours to minutes</h2>
        <p className="text-slate-700">
          There are 60 minutes in one hour. To convert, multiply the hours by 60 and add any extra minutes:
        </p>
        <p className="my-3 rounded-lg bg-slate-50 p-3 text-center font-mono text-brand-dark">
          total minutes = (hours × 60) + minutes
        </p>
        <p className="text-slate-700">
          Decimal hours work too. 1.25 hours means 1 hour and 0.25 of an hour (15 minutes), so it equals 75 minutes.
          The calculator above handles both whole and decimal hours.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Common conversions</h2>
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {[
            ["0.5 hours", "30 minutes"],
            ["1 hour", "60 minutes"],
            ["1.5 hours", "90 minutes"],
            ["2 hours 15 minutes", "135 minutes"],
            ["8 hours", "480 minutes"],
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
        <a href="/minutes-to-hours-converter" className="text-brand no-underline hover:text-brand-dark">
          Minutes to Hours Converter
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
            name: "Hours to Minutes Calculator",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </article>
  );
}
