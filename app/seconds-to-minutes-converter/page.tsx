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
];

const CONVERSIONS: [string, string][] = [
  ["30 seconds", "0.5 minutes"],
  ["60 seconds", "1 minute"],
  ["90 seconds", "1.5 minutes"],
  ["600 seconds", "10 minutes"],
  ["3600 seconds", "60 minutes"],
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
          ]}
        />

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
      </div>
    </article>
  );
}
