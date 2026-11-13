import { pageMetadata } from "@/lib/seo";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = pageMetadata({
  title: "Minutes to Decimal Chart (1–60) — Printable Timesheet Conversion",
  description: "Full minutes to decimal chart for timesheets and payroll: every minute 1–60 as decimal hours, with the common values (15, 20, 30, 45) answered directly. Printable PDF included, plus a free converter.",
  path: "/minutes-to-decimal-chart",
  esPath: "/es/tabla-minutos-a-decimales",
  absoluteTitle: false,
});

const faq = [
  {
    q: "What is 20 minutes in decimal?",
    a: "20 minutes = 0.33 decimal hours. The math is 20 ÷ 60 = 0.3333, which rounds to 0.33 on a standard two-place timesheet.",
  },
  {
    q: "What is 20 minutes as a decimal?",
    a: "20 minutes as a decimal is 0.33 hours (20 ÷ 60 = 0.3333, rounded to 0.33).",
  },
  {
    q: "What is 18 minutes in decimal?",
    a: "18 minutes = 0.30 decimal hours, because 18 ÷ 60 = 0.30 exactly.",
  },
  {
    q: "What is 45 minutes in decimal?",
    a: "45 minutes = 0.75 decimal hours, because 45 ÷ 60 = 0.75. This is one of the most common conversions on a timesheet.",
  },
  {
    q: "What is 30 minutes in decimal?",
    a: "30 minutes = 0.50 decimal hours (30 ÷ 60 = 0.50).",
  },
  {
    q: "What is 25 minutes in decimal?",
    a: "25 minutes = 0.42 decimal hours. The exact value is 25 ÷ 60 = 0.4167, which rounds to 0.42 on a two-place timesheet.",
  },
  {
    q: "What is 40 minutes in decimal?",
    a: "40 minutes = 0.67 decimal hours (40 ÷ 60 = 0.6667, rounded to 0.67).",
  },
  {
    q: "What is 50 minutes in decimal?",
    a: "50 minutes = 0.83 decimal hours (50 ÷ 60 = 0.8333, rounded to 0.83).",
  },
  {
    q: "What is 35 minutes in decimal?",
    a: "35 minutes = 0.58 decimal hours (35 ÷ 60 = 0.5833, rounded to 0.58).",
  },
  {
    q: "How do you convert minutes to decimal?",
    a: "Divide the minutes by 60. For example, to convert 20 minutes to decimal hours: 20 ÷ 60 = 0.33. The converter above does this for any value, and the chart below lists every minute from 1 to 60.",
  },
  {
    q: "Can I print this minutes to decimal chart?",
    a: "Yes. The chart prints cleanly on one page: use your browser's print command and it renders as a simple two-column table. Many people keep a copy taped near the time clock or inside a timesheet folder.",
  },
  {
    q: "Why does payroll use decimal minutes instead of 20m?",
    a: "Payroll multiplies decimal hours by your hourly rate. Sticking to one number format (decimal) lets every entry in a pay period be added with plain addition, so wages calculate without converting back and forth.",
  },
];

const MINUTE_ROWS: [string, string][] = Array.from({ length: 60 }, (_, i) => {
  const minutes = i + 1;
  return [String(minutes), (minutes / 60).toFixed(2)];
});

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Minutes to Decimal Conversion Chart"
        description="Every minute from 1 to 60, shown as decimal hours for payroll and timesheets. Free converter included."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="A timesheet decimal chart you can keep">
          <p>
            This page works as a timesheet decimal chart in two ways: scan the full 1–60 table
            below when you fill in a week's hours, or download the printable PDF and pin it next
            to the time clock. HR teams use the same chart to audit rounding, so every value here
            matches the quarter-hour anchors (0.25, 0.50, 0.75, 1.00) payroll systems expect.
          </p>
        </ProseSection>

        <ProseSection title="How to convert minutes to decimal">
          <p>
            To turn minutes into decimal hours, divide the minutes by 60. The result is the decimal
            form payroll expects on a timesheet.
          </p>
          <p className="text-lg font-medium text-ink">
            Example: 20 minutes = 20 ÷ 60 = 0.33 decimal hours.
          </p>
          <p>
            Most timesheets keep two decimal places, so 0.3333 is written as 0.33. Use the converter
            above for any value, or scan the chart below for the common ones.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Minutes to decimal hours (1&ndash;60)
          </h2>
          <ConversionTable fromHeader="Minutes" toHeader="Decimal hours" rows={MINUTE_ROWS} />
        </section>

        <ProseSection title="Quick reference for the common ones">
          <p>
            A few values show up constantly on timesheets, so they are worth memorizing: 15 minutes
            = 0.25, 20 minutes = 0.33, 30 minutes = 0.50, and 45 minutes = 0.75. When a shift has an
            odd length, the chart above or the converter handles it exactly.
          </p>
        </ProseSection>

        <ProseSection title="The most-looked-up values, answered directly">
          <p>
            <strong>20 minutes in decimal is 0.33</strong> (20 ÷ 60 = 0.3333, rounded to two
            places). <strong>25 minutes in decimal is 0.42</strong> (0.4167 exact).{" "}
            <strong>40 minutes in decimal is 0.67</strong> (0.6667 exact).{" "}
            <strong>45 minutes in decimal is 0.75</strong> — one of the cleanest values on the
            whole chart. <strong>50 minutes in decimal is 0.83</strong> (0.8333 exact), and{" "}
            <strong>35 minutes in decimal is 0.58</strong> (0.5833 exact).
          </p>
          <p>
            Every other minute from 1 to 60 is in the chart above, and the converter at the top of
            this page handles values beyond an hour — 90 minutes is 1.50, for example, because the
            whole hours carry over.
          </p>
        </ProseSection>

        <ProseSection title="Printable and pin-ready">
          <p>
            Prefer a ready-made copy? Download the one-page printable version — the full 1–60
            table, the reverse decimal-to-minutes table, the formula, and quarter-hour rounding
            rules, typeset for A4 with a QR code on the footer:
          </p>
          <p>
            <a
              href="/minutes-to-decimal-chart.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
            >
              ⬇ Download printable PDF chart
            </a>
          </p>
          <p>
            You can also print this page directly from any browser (File → Print, or Ctrl/Cmd + P).
            The two-column layout comes out clean without ads or navigation, which is why many
            people keep a copy taped near the time clock, inside a timesheet binder, or on the
            fridge door of a break room.
          </p>
        </ProseSection>

        <ProseSection title="Specific minutes, converted">
          <p>
            If you came here for one exact value, here are the decimal forms people look up most:
            20 minutes in decimal is 0.33 (20 ÷ 60 = 0.3333, rounded to two places), 18 minutes in
            decimal is 0.30 (18 ÷ 60 = 0.30 exactly), and 45 minutes in decimal is 0.75. Other
            frequent ones are 15 minutes = 0.25, 30 minutes = 0.50, and 90 minutes = 1.50 (1 hour 30
            minutes). The full 1–60 chart above lists every minute, and the converter at the top
            handles any number instantly.
          </p>
        </ProseSection>

        <FAQList items={faq} />

        <RelatedLinks
          title="Popular specific conversions"
          links={[
            { href: "/20-minutes-in-decimal", label: "20 Minutes in Decimal" },
            { href: "/45-minutes-in-decimal", label: "45 Minutes in Decimal" },
            { href: "/10-minutes-in-decimal", label: "10 Minutes in Decimal" },
            { href: "/30-minutes-in-decimal", label: "30 Minutes in Decimal" },
          ]}
        />

        <RelatedLinks
          links={[
            { href: "/minutes-to-hours-converter", label: "Minutes to Hours Converter" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
            { href: "/seconds-to-minutes-converter", label: "Seconds to Minutes Converter" },
            { href: "/90-seconds-to-minutes", label: "90 Seconds to Minutes" },
            { href: "/600-seconds-to-minutes", label: "600 Seconds to Minutes" },
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Guide" },
            { href: "/", label: "Minutes to Decimal Converter" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Minutes to Decimal Conversion Chart",
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
