import type { Metadata } from "next";
import UnitConverter from "@/components/UnitConverter";

export const metadata: Metadata = {
  title: "Seconds to Minutes Converter",
  description:
    "Convert seconds into minutes (e.g. 90s → 1.5 min). Free, instant tool for timers, workouts, and time math.",
  alternates: { canonical: "https://minutestodecimal.org/seconds-to-minutes-converter" },
};

const faq = [
  {
    q: "How do I convert 90 seconds to minutes?",
    a: "90 seconds = 1.5 minutes, because 90 ÷ 60 = 1.5. Enter 90 above to see it instantly.",
  },
  {
    q: "How many minutes are in 3600 seconds?",
    a: "3600 seconds = 60 minutes, which is exactly 1 hour (3600 ÷ 60 = 60).",
  },
  {
    q: "Why convert seconds to minutes?",
    a: "Timers, workouts, video lengths, and lab readings are often shown in seconds. Minutes are easier to read at a glance and to add up.",
  },
  {
    q: "How do I convert minutes back to seconds?",
    a: "Multiply minutes by 60. For example, 5 minutes = 300 seconds (5 × 60).",
  },
];

export default function Page() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">Seconds to Minutes Converter</h1>
      <p className="mb-6 text-muted">
        Change a number of seconds into minutes. Free and instant.
      </p>

      <UnitConverter mode="secondsToMinutes" />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-ink">How to convert seconds to minutes</h2>
        <p className="text-slate-700">
          There are 60 seconds in a minute, so divide the seconds by 60:
        </p>
        <p className="my-3 rounded-lg bg-slate-50 p-3 text-center font-mono text-brand-dark">
          minutes = seconds ÷ 60
        </p>
        <p className="text-slate-700">
          A 90-second clip is 1.5 minutes, and a 3600-second hour is 60 minutes. Use the converter for any value,
          including decimals.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Common conversions</h2>
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {[
            ["30 seconds", "0.5 minutes"],
            ["60 seconds", "1 minute"],
            ["90 seconds", "1.5 minutes"],
            ["600 seconds", "10 minutes"],
            ["3600 seconds", "60 minutes"],
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
        <a href="/hours-to-minutes-calculator" className="text-brand no-underline hover:text-brand-dark">
          Hours to Minutes Calculator
        </a>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Seconds to Minutes Converter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </article>
  );
}
