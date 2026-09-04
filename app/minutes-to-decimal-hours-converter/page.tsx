import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Minutes to Decimal Hours Converter",
  description:
    "Convert a count of minutes into decimal hours for billing, time logs, and payroll. Free, instant, no sign-up required.",
  alternates: { canonical: "https://www.minutestodecimal.org/minutes-to-decimal-hours-converter" },
};

const faq = [
  {
    q: "How do I convert minutes to decimal hours?",
    a: "Divide the number of minutes by 60. 90 minutes is 90 ÷ 60 = 1.50 decimal hours. If your time also has whole hours, enter hours and minutes in the converter above and it adds them together for you.",
  },
  {
    q: "What is 37 minutes in decimal hours?",
    a: "37 ÷ 60 = 0.6167, so 37 minutes is about 0.62 decimal hours (two places) or 0.6167 (four places). This is the kind of awkward number timers produce, and exactly why the converter is faster than long division.",
  },
  {
    q: "How do I convert 100 minutes?",
    a: "100 ÷ 60 = 1.6667 decimal hours, which is 1 hour 40 minutes. Counts longer than an hour still work with one division; you never need to split the minutes into hours first.",
  },
  {
    q: "How do freelancers convert billable minutes?",
    a: "Most freelancers log every task in minutes, then convert the total to hours before invoicing. A 32-minute call plus a 47-minute edit plus a 95-minute build session is 174 minutes, or 174 ÷ 60 = 2.90 decimal hours. Some round to the nearest 6 minutes (one tenth of an hour) or 15 minutes first; whatever you choose, state it on the invoice.",
  },
  {
    q: "Do I enter a duration like 1 hour 15 minutes differently?",
    a: "No conversion needed on your side: enter 1 in the hours box and 15 in the minutes box above. The tool computes 1 + (15 ÷ 60) = 1.25 decimal hours. Only the minutes-only shortcut (just type 75 minutes) skips the hours box.",
  },
  {
    q: "How do I convert minutes with seconds, like 12m 30s?",
    a: "Turn the seconds into minutes first: 30 ÷ 60 = 0.5, so you have 12.5 minutes. Then divide by 60: 12.5 ÷ 60 = 0.2083 decimal hours. Timers that record seconds are the usual source of these values.",
  },
  {
    q: "Why not just bill in minutes?",
    a: "You can, but rates are quoted per hour, so an invoice has to end in hours eventually. Converting once, at the end, keeps every line item consistent and makes the total checkable: hours × rate should equal the invoice amount to the cent.",
  },
  {
    q: "How do I convert decimal hours back to minutes?",
    a: "Multiply by 60. A 2.5-hour task is 2.5 × 60 = 150 minutes. The second box on this page converts a decimal into hours and minutes instead, which is usually easier to read.",
  },
];

// Minute counts that timers and logs actually produce, including awkward ones.
const CONVERSIONS: [string, string][] = [
  ["6 minutes", "0.1000"],
  ["7 minutes", "0.1167"],
  ["12 minutes", "0.2000"],
  ["13 minutes", "0.2167"],
  ["22 minutes", "0.3667"],
  ["24 minutes", "0.4000"],
  ["37 minutes", "0.6167"],
  ["42 minutes", "0.7000"],
  ["47 minutes", "0.7833"],
  ["53 minutes", "0.8833"],
  ["67 minutes", "1.1167"],
  ["75 minutes", "1.2500"],
  ["98 minutes", "1.6333"],
  ["135 minutes", "2.2500"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Minutes to Decimal Hours Converter"
        description="Turn a count of minutes, or hours and minutes, into decimal hours for time logs, billing, and payroll. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="Converting a minutes-only count">
          <p>
            Timers, parking meters, meeting rooms, and task trackers all report time as a plain
            number of minutes. Payroll and invoicing want hours. The bridge between the two is a
            single division, because an hour is 60 minutes:
          </p>
          <Formula>decimal hours = minutes ÷ 60</Formula>
          <p>
            37 minutes of logged work is 37 ÷ 60 = 0.6167 decimal hours. Round to 0.62 for an
            invoice or 0.6167 if the system keeps four places.
          </p>
        </ProseSection>

        <ProseSection title="Adding up a day of logged time">
          <p>
            The usual workflow is to add everything in minutes first, then convert once at the end.
            Say your day has a 25-minute standup, a 40-minute client call, and 35 minutes of email:
            that is 25 + 40 + 35 = 100 minutes, and 100 ÷ 60 = 1.6667 decimal hours, which is 1
            hour 40 minutes.
          </p>
          <p>
            Converting each item separately and then adding (0.4167 + 0.6667 + 0.5833) gives the
            same answer, but it invites rounding slips. One division at the end is safer, and
            easier to audit when a client asks how a total was built.
          </p>
        </ProseSection>

        <ProseSection title="Counts longer than an hour">
          <p>
            Minute counts past 60 need no special handling: 90 minutes is 1.50 decimal hours, 135
            minutes is 2.25, and 174 minutes is 2.90. The whole hours are already inside the
            number. If you would rather see hours and minutes, type the count into the minutes box
            above and read the result in the lower panel.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Awkward minute counts, converted
          </h2>
          <ConversionTable fromHeader="Minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
            Counts that are multiples of 6 (6, 12, 24, 42...) convert to clean two-place decimals;
            everything else needs the four-place form.
          </p>
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Minutes to Decimal Hours Converter",
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
