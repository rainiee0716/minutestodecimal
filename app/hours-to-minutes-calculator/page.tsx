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

const CONVERSIONS: [string, string][] = [
  ["0.5 hours", "30 minutes"],
  ["1 hour", "60 minutes"],
  ["1.5 hours", "90 minutes"],
  ["2 hours 15 minutes", "135 minutes"],
  ["8 hours", "480 minutes"],
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
          ]}
        />

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
      </div>
    </article>
  );
}
