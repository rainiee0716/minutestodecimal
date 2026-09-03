import type { Metadata } from "next";
import TimeDecimalCalculator from "@/components/TimeDecimalCalculator";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

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

const QUICK_REF: [string, string][] = [
  ["1 minute", "0.0167 hours"],
  ["5 minutes", "0.0833 hours"],
  ["10 minutes", "0.1667 hours"],
  ["15 minutes", "0.25 hours"],
  ["20 minutes", "0.3333 hours"],
  ["25 minutes", "0.4167 hours"],
  ["30 minutes", "0.50 hours"],
  ["35 minutes", "0.5833 hours"],
  ["40 minutes", "0.6667 hours"],
  ["45 minutes", "0.75 hours"],
  ["50 minutes", "0.8333 hours"],
  ["55 minutes", "0.9167 hours"],
  ["1 hour", "1.00 hours"],
  ["1 hour 30 minutes", "1.50 hours"],
  ["2 hours 45 minutes", "2.75 hours"],
  ["8 hours 45 minutes", "8.75 hours"],
];

export default function Home() {
  return (
    <article>
      {/* Full-bleed hero */}
      <section className="relative bg-hero-glow bg-no-repeat pb-14 pt-12 md:pb-20 md:pt-20">
        <div className="container text-center">
          <span className="inline-block rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-card">
            Free time card calculator &middot; No sign-up
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Minutes to Decimal Converter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Convert hours and minutes into decimal time for payroll, timesheets, and time cards.
            Free, instant, no sign-up.
          </p>
          <div className="mx-auto mt-10 max-w-4xl">
            <TimeDecimalCalculator />
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Runs in your browser &middot; Nothing is sent to a server
          </p>
        </div>
      </section>

      <div className="container pb-16">
        <AdSlot />

        <ProseSection title="What is decimal time?">
          <p>
            Decimal time expresses a duration as a single number of hours. Instead of writing a
            shift as &ldquo;1 hour 30 minutes,&rdquo; you write it as <strong>1.5 hours</strong>.
            Employers and payroll software use this format because it is easy to multiply by an
            hourly wage. The formula is simple:
          </p>
          <Formula>decimal hours = hours + (minutes ÷ 60)</Formula>
          <p>
            It is used by hourly employees, freelancers, and small-business owners who track work
            time on a timesheet.
          </p>
        </ProseSection>

        <section className="mx-auto mt-10 max-w-3xl md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Minutes to decimal quick reference
          </h2>
          <ConversionTable fromHeader="Time" toHeader="Decimal hours" rows={QUICK_REF} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[{ href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" }]}
        />

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
      </div>
    </article>
  );
}
