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
  title: "Seconds to Minutes Converter",
  description:
    "Convert seconds into minutes (e.g. 90s → 1.5 min). Free, instant tool for timers, workouts, and time math.",
  alternates: { canonical: "https://www.minutestodecimal.org/seconds-to-minutes-converter" },
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
  {
    q: "How do I convert seconds straight to hours?",
    a: "Divide by 3600, because an hour is 60 × 60 = 3,600 seconds. 7,200 seconds ÷ 3,600 = 2 hours. For decimal hours in payroll form, that is the same as converting to minutes first, then dividing by 60 again.",
  },
  {
    q: "What is 1,000 seconds in minutes?",
    a: "1,000 ÷ 60 = 16.6667 minutes, or 16 minutes 40 seconds. This kind of value comes up constantly with interval timers and video timestamps.",
  },
  {
    q: "How do I convert something like 2m 45s into decimal minutes?",
    a: "The seconds are the only part that changes: 45 ÷ 60 = 0.75, so 2m 45s is 2.75 decimal minutes. It is the same divide-by-60 pattern used everywhere else on this site, just one unit smaller.",
  },
  {
    q: "Why is everything in 60s?",
    a: "Hours and minutes inherit their base-60 structure from Babylonian astronomy, kept because 60 divides evenly by so many numbers. It is also why converting between hours, minutes, and seconds is always a matter of multiplying or dividing by 60.",
  },
  {
    q: "How do I convert a pace like 92 seconds per lap into minutes?",
    a: "Divide by 60: 92 ÷ 60 = 1.5333, so about 1.53 minutes per lap. Multiplying by the number of laps gives the total, so ten laps at that pace is 15.33 minutes, or 15 minutes 20 seconds.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["15 seconds", "0.25 minutes"],
  ["30 seconds", "0.5 minutes"],
  ["45 seconds", "0.75 minutes"],
  ["60 seconds", "1 minute"],
  ["90 seconds", "1.5 minutes"],
  ["120 seconds", "2 minutes"],
  ["300 seconds", "5 minutes"],
  ["600 seconds", "10 minutes"],
  ["900 seconds", "15 minutes"],
  ["1,800 seconds", "30 minutes"],
  ["3,600 seconds", "60 minutes"],
  ["7,200 seconds", "120 minutes"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Seconds to Minutes Converter"
        description="Change a number of seconds into minutes. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="secondsToMinutes" />
        </div>

        <AdSlot />

        <ProseSection title="How to convert seconds to minutes">
          <p>There are 60 seconds in a minute, so divide the seconds by 60:</p>
          <Formula>minutes = seconds ÷ 60</Formula>
          <p>
            A 90-second clip is 1.5 minutes, and a 3600-second hour is 60 minutes. Use the
            converter for any value, including decimals.
          </p>
        </ProseSection>

        <ProseSection title="Where seconds pile up">
          <p>
            Workouts are the classic case: a HIIT session of 8 rounds at 40 seconds work and 20
            seconds rest is 8 × 60 = 480 seconds of intervals, or 8 minutes. Planks, stretches, and
            rest timers all report in seconds, and adding a list of them as seconds is exact, while
            adding &ldquo;1 minute 30 seconds&rdquo; style values by hand is not.
          </p>
          <p>
            Video work has the same problem. Three clips of 95, 130, and 145 seconds total 370
            seconds, which is 6 minutes 10 seconds. Editing software usually shows each clip in
            seconds precisely so the sum stays clean, then converts once at the end.
          </p>
        </ProseSection>

        <ProseSection title="Seconds, minutes, and payroll">
          <p>
            Payroll almost never needs seconds; time clocks round them away before you see them.
            But if you are tracking work in an app that records seconds (some task timers do),
            convert up the chain: seconds to minutes by dividing by 60, then minutes to decimal
            hours by dividing by 60 again. A 5,400-second task is 90 minutes, which is 1.50 decimal
            hours, ready for a timesheet.
          </p>
        </ProseSection>

        <ProseSection title="Pace, splits, and intervals">
          <p>
            Runners and swimmers live in seconds. A 400-meter repeat at 92 seconds is 1.53 decimal
            minutes, and a 5K target of 25:30 is 25.5 minutes. The conversion matters when a
            training plan quotes intervals in one format and your watch records the other, so
            after a session you are comparing 8 × 92 seconds against a plan that says{" "}
            &ldquo;8 × 1:30.&rdquo; Convert once, write it down, and the log stays comparable week
            over week.
          </p>
          <p>
            Interval timers on gym equipment are the same: 45 seconds work and 15 seconds rest is
            a 60-second cycle, so 20 rounds take exactly 20 minutes. Plans that look complicated in
            seconds often collapse to round minute totals once converted.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common conversions
          </h2>
          <ConversionTable fromHeader="Seconds" toHeader="Minutes" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
            { href: "/hours-to-minutes-calculator", label: "Hours to Minutes Calculator" },
            { href: "/guides", label: "Timesheet Guides" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Seconds to Minutes Converter",
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
