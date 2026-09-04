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
  alternates: { canonical: "https://www.minutestodecimal.org/" },
};

const faq = [
  {
    q: "How do I convert 30 minutes to decimal?",
    a: "30 minutes equals 0.50 decimal hours, because 30 ÷ 60 = 0.50. Use the converter above: enter 0 hours and 30 minutes to see it instantly.",
  },
  {
    q: "What is 1 hour 45 minutes in decimal?",
    a: "1 hour 45 minutes = 1.75 decimal hours (45 ÷ 60 = 0.75). Enter 1 and 45 above to confirm.",
  },
  {
    q: "Why do payroll systems use decimal time?",
    a: "Payroll calculates wages per decimal hour. Converting 1h 30m to 1.5 makes it easy to multiply by an hourly rate, and it lets every entry in a pay period be added with plain addition. Most timesheets require decimal format for exactly this reason.",
  },
  {
    q: "How do I convert decimal time back to hours and minutes?",
    a: "Use the right-hand converter. For example, 1.5 decimal hours becomes 1 hour 30 minutes; 2.25 becomes 2 hours 15 minutes. The rule is: keep the whole number as hours, multiply the decimal part by 60 to get minutes.",
  },
  {
    q: "What is 15 minutes in decimal?",
    a: "0.25. A quarter of an hour is 15 minutes, and a quarter as a decimal is 0.25. The four quarter-hour landmarks worth memorizing are 15 minutes = 0.25, 30 = 0.50, 45 = 0.75, and 60 = 1.00.",
  },
  {
    q: "Does 4.35 mean 4 hours 35 minutes?",
    a: "No. On a decimal timesheet, 4.35 means 4 hours and 0.35 of an hour, which is 21 minutes (0.35 × 60). If you worked 4 hours 35 minutes, the correct decimal entry is 4 + (35 ÷ 60) = 4.58.",
  },
  {
    q: "How do I convert a whole week of times?",
    a: "Convert each day separately, then add the decimals. A week of 8.00, 7.50, 8.25, 7.75, and 8.00 decimal hours totals 39.50 hours. Multiplying by your rate once at the end gives gross pay.",
  },
  {
    q: "Is decimal time the same as military time?",
    a: "No. Military time (like 14:30) is a clock time written in 24-hour format. Decimal time is a duration written as hours with a decimal fraction (14:30 as a duration converts to 14.50 decimal hours, but the two systems answer different questions).",
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

        <ProseSection title="Reading the decimal correctly">
          <p>
            The part after the decimal point counts sixtieths of an hour, not minutes. So 0.50 is
            half an hour (30 minutes), and 0.30 is 18 minutes (0.30 × 60), not 30. This is the most
            common mistake on hand-written time cards: someone who worked 3 hours 20 minutes writes
            &ldquo;3.20&rdquo; when payroll expects 3.33.
          </p>
          <p>
            A safe habit is to convert first and check second: type your hours and minutes into the
            converter at the top of this page, then compare what you were about to write with what
            the tool shows.
          </p>
        </ProseSection>

        <ProseSection title="From time card to paycheck">
          <p>
            Once every entry is decimal, pay is one multiplication. A week of 8.00, 8.25, 7.75,
            8.00, and 7.50 decimal hours adds to 39.50 hours; at $20 an hour that is $790.00 gross.
            Overtime rules kick in past 40 hours in a week for most US hourly jobs, and decimal
            hours make it obvious when you cross that line.
          </p>
          <p>
            If you fill out a timesheet every pay period, the guides on this site go deeper: how
            employers round clock times (and what the rules allow), how overtime is calculated from
            decimal hours, and a full walkthrough of a biweekly timesheet.
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
          links={[
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
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
                name: "Minutes to Decimal Converter",
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
