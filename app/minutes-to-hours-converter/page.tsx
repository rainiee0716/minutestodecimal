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
  title: "Minutes to Hours Converter",
  description:
    "Convert minutes into decimal hours for timesheets and payroll, or into hours and minutes for scheduling. Free, instant, no sign-up.",
  alternates: { canonical: "https://www.minutestodecimal.org/minutes-to-hours-converter" },
};

const faq = [
  {
    q: "How do I convert 90 minutes to hours?",
    a: "90 minutes = 1.5 hours, because 90 ÷ 60 = 1.5. Enter 90 above to see it instantly.",
  },
  {
    q: "What is 45 minutes in decimal hours?",
    a: "45 minutes = 0.75 hours (45 ÷ 60 = 0.75). This is the decimal form most payroll systems expect.",
  },
  {
    q: "Why do timesheets use decimal hours?",
    a: "Payroll multiplies decimal hours by your hourly rate. 1.5 hours × $20 = $30. Decimal format keeps the math simple across a whole pay period.",
  },
  {
    q: "How do I convert 225 minutes to hours?",
    a: "225 ÷ 60 = 3.75 decimal hours, which is 3 hours 45 minutes. The calculator gives you the decimal form payroll wants; the hours-and-minutes form is easier for scheduling.",
  },
  {
    q: "How many hours is 1,000 minutes?",
    a: "1,000 ÷ 60 = 16.6667 decimal hours, or 16 hours 40 minutes. Large counts like this show up in weekly screen-time reports and project timers.",
  },
  {
    q: "What is the difference between 2.5 hours and 2h 50m?",
    a: "2.5 hours is 2 hours 30 minutes. If something ran 2 hours 50 minutes, that is 2 + (50 ÷ 60) = 2.8333 in decimal. The two notations are easy to mix up because 50 looks like half of 100, but hours count in sixtieths.",
  },
  {
    q: "How do I convert hours and minutes (like 1h 30m) to decimal?",
    a: "Use the Minutes to Decimal Converter: enter 1 hour and 30 minutes to get 1.5 decimal hours. This page handles counts that are already expressed in minutes only.",
  },
  {
    q: "How do I round for payroll?",
    a: "Payroll typically wants two decimal places: 2.8333 becomes 2.83. Rounding down from 2.8367 to 2.83 loses 24 seconds a shift, which is why time clocks often record four places. Employers may also round to the nearest quarter hour, which our time card rounding guide explains.",
  },
  {
    q: "How many hours is 600 minutes?",
    a: "600 ÷ 60 = 10.00 hours exactly. Counts that are multiples of 60 (60, 120, 600, 1,440) always convert to whole hours; 1,440 minutes is a full 24-hour day.",
  },
  {
    q: "Should my timesheet be in minutes or decimal hours?",
    a: "Check what the form asks for. Paper timesheets often have an hours-and-minutes column plus a decimal column, and payroll systems import the decimal one. If only one column exists, it is almost always decimal hours, which is what the converter above produces.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["15 minutes", "0.25 hours"],
  ["30 minutes", "0.50 hours"],
  ["45 minutes", "0.75 hours"],
  ["60 minutes", "1.00 hour"],
  ["75 minutes", "1.25 hours"],
  ["90 minutes", "1.50 hours"],
  ["120 minutes", "2.00 hours"],
  ["150 minutes", "2.50 hours"],
  ["210 minutes", "3.50 hours"],
  ["300 minutes", "5.00 hours"],
  ["480 minutes", "8.00 hours"],
  ["1,200 minutes", "20.00 hours"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Minutes to Hours Converter"
        description="Change a number of minutes into decimal hours for your timesheet, or into hours and minutes for planning. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="minutesToHours" />
        </div>

        <AdSlot />

        <ProseSection title="How to convert minutes to hours">
          <p>Because there are 60 minutes in an hour, divide the minutes by 60 to get decimal hours:</p>
          <Formula>decimal hours = minutes ÷ 60</Formula>
          <p>
            For example, a 90-minute meeting is 1.5 hours, and a 45-minute task is 0.75 hours.
            Payroll software reads these decimal values directly.
          </p>
        </ProseSection>

        <ProseSection title="Two answers, two uses">
          <p>
            The same count of minutes has two useful forms. A 95-minute task is{" "}
            <strong>1.5833 decimal hours</strong> (95 ÷ 60), which is what payroll and invoicing
            need, and it is also <strong>1 hour 35 minutes</strong>, which is what you would put in
            a calendar or tell a colleague.
          </p>
          <p>
            Neither form is more correct; they answer different questions. &ldquo;How much do I
            bill?&rdquo; uses the decimal, because your rate is per hour and 1.5833 × $60 = $95.00
            falls straight out of the multiplication. &ldquo;When will this finish if we start at
            2:00?&rdquo; uses the hours-and-minutes form, because clocks are built that way.
          </p>
        </ProseSection>

        <ProseSection title="Converting a batch of logged minutes">
          <p>
            If your week is logged in minutes, convert the total once rather than each entry. A
            week of 455 + 480 + 445 + 470 + 390 minutes adds to 2,240 minutes, and 2,240 ÷ 60 =
            37.3333 hours, or 37 hours 20 minutes. One division, one result, and no rounding
            errors accumulated from converting each day separately.
          </p>
          <p>
            Screen-time reports are the everyday version of this. A phone that reports 214 minutes
            today is reporting 3.57 hours, and a weekly report of 1,860 minutes is 31.00 hours,
            which lands differently when you see it in hours. The number has not changed; only the
            unit has.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common conversions
          </h2>
          <ConversionTable fromHeader="Minutes" toHeader="Decimal hours" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/hours-to-minutes-calculator", label: "Hours to Minutes Calculator" },
            { href: "/decimal-to-hours-calculator", label: "Decimal to Hours Calculator" },
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Minutes to Hours Converter",
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
