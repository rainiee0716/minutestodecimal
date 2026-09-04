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
  title: "Hours to Minutes Calculator",
  description:
    "Convert hours (including decimal hours) and minutes into total minutes. Free, instant tool for time tracking, shifts, and payroll.",
  alternates: { canonical: "https://www.minutestodecimal.org/hours-to-minutes-calculator" },
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
    a: "8 hours = 480 minutes (8 × 60). This is the length of a standard full-time shift without a lunch break.",
  },
  {
    q: "Why convert hours to minutes?",
    a: "Some timesheets, billing systems, and scheduling tools record time in minutes. Converting makes it easy to add up a day or a week of work, and minute totals are what most time clocks store internally.",
  },
  {
    q: "How many minutes are in a full work week?",
    a: "A 40-hour week is 40 × 60 = 2,400 minutes. A 37.5-hour week is 2,250 minutes. These totals are useful when a scheduling app or a phone timer reports your week in minutes.",
  },
  {
    q: "How do I convert decimal hours like 7.75 into minutes?",
    a: "Multiply by 60: 7.75 × 60 = 465 minutes. The whole part (7 hours) contributes 420 minutes and the 0.75 contributes 45.",
  },
  {
    q: "How do I go from minutes back to hours?",
    a: "Divide by 60. 465 minutes ÷ 60 = 7.75 hours. If you want hours and minutes instead of decimal hours, note that 465 = (7 × 60) + 45, so it is 7 hours 45 minutes.",
  },
  {
    q: "Why are there 60 minutes in an hour anyway?",
    a: "Blame the Babylonians. Their counting system was base 60, and 60 divides cleanly by 2, 3, 4, 5, 6, 10, 12, 15, 20, and 30, which made fractions of an hour easy to work with before decimals existed.",
  },
  {
    q: "How many minutes are in 7.5 hours?",
    a: "7.5 × 60 = 450 minutes. This is the paid length of a standard 8-hour day with a 30-minute unpaid lunch, which is why 450 shows up so often on scheduling reports.",
  },
  {
    q: "How many minutes are in a month of full-time work?",
    a: "About 160 hours per month (2,080 ÷ 12), which is 9,600 minutes. Payroll systems use the 2,080-hour year (52 weeks × 40) as the baseline, so monthly totals drift slightly depending on where the weeks fall.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["0.25 hours", "15 minutes"],
  ["0.5 hours", "30 minutes"],
  ["1 hour", "60 minutes"],
  ["1.25 hours", "75 minutes"],
  ["1.5 hours", "90 minutes"],
  ["2 hours 15 minutes", "135 minutes"],
  ["3.5 hours", "210 minutes"],
  ["4.75 hours", "285 minutes"],
  ["6 hours", "360 minutes"],
  ["7.75 hours", "465 minutes"],
  ["8 hours", "480 minutes"],
  ["40 hours (one week)", "2,400 minutes"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Hours to Minutes Calculator"
        description="Turn hours and minutes into a single total of minutes. Useful for timesheets, shift logs, and billing. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="hoursToMinutes" />
        </div>

        <AdSlot />

        <ProseSection title="How to convert hours to minutes">
          <p>There are 60 minutes in one hour. To convert, multiply the hours by 60 and add any extra minutes:</p>
          <Formula>total minutes = (hours × 60) + minutes</Formula>
          <p>
            Decimal hours work too. 1.25 hours means 1 hour and 0.25 of an hour (15 minutes), so it
            equals 75 minutes. The calculator above handles both whole and decimal hours.
          </p>
        </ProseSection>

        <ProseSection title="When minute totals are the right format">
          <p>
            Payroll runs on decimal hours, but plenty of other systems run on plain minutes. Phone
            screen-time reports, project timers, kitchen timers, and many scheduling apps all
            report a count of minutes, so to compare a 25-minute task against a 1.75-hour block you
            need them in the same unit.
          </p>
          <p>
            Minutes are also the safest unit for adding things up, the same way cents are safer
            than dollars. A week logged as 450, 420, 465, 480, and 390 minutes adds to 2,205
            minutes, which divides back to 36.75 hours exactly. No fractions are lost along the
            way.
          </p>
        </ProseSection>

        <ProseSection title="Checking a minute total against a timesheet">
          <p>
            If your timesheet says 7.75 hours and your timer says 452 minutes, something is off:
            7.75 × 60 = 465, not 452. The gap of 13 minutes usually means a missed break
            subtraction or a timer that was left running. Converting both sides to minutes makes
            the discrepancy visible in seconds.
          </p>
          <p>
            When you need the number to move in the other direction, the minutes-to-hours converter
            divides by 60 and formats the result for payroll.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common conversions
          </h2>
          <ConversionTable fromHeader="Hours" toHeader="Minutes" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
            { href: "/", label: "Minutes to Decimal Converter" },
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
                name: "Hours to Minutes Calculator",
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
