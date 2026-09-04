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
  title: "Time to Decimal Calculator",
  description:
    "Convert a work shift or clock duration into decimal hours for payroll and timesheets. Free, instant, with worked shift examples.",
  alternates: { canonical: "https://www.minutestodecimal.org/time-to-decimal-calculator" },
};

const faq = [
  {
    q: "How do I convert a shift time to decimal hours?",
    a: "Work out how long the shift lasted, then enter that duration as hours and minutes above. A shift from 9:00 to 17:45 is 8 hours 45 minutes, which the calculator shows as 8.75 decimal hours.",
  },
  {
    q: "What is 7 hours 30 minutes in decimal?",
    a: "7.5 decimal hours (30 ÷ 60 = 0.5). Enter 7 and 30 to confirm. On a two-week timesheet, ten shifts of 7.5 hours add up to exactly 75.00 hours.",
  },
  {
    q: "How do I subtract a lunch break before converting?",
    a: "Subtract the break from the shift length first, then convert. A 9:00-to-17:00 day is 8 hours; with a 30-minute unpaid lunch the payable time is 7 hours 30 minutes, which converts to 7.50 decimal hours.",
  },
  {
    q: "My timesheet has clock times, not durations. What do I enter?",
    a: "Convert to a duration first. From 8:15 to 12:40 is 4 hours 25 minutes (12:40 minus 8:15); enter 4 and 25 above to get 4.4167, usually rounded to 4.42. The calculator converts durations, not clock readings.",
  },
  {
    q: "Can I convert decimal hours back to a shift length?",
    a: "Yes. Use the right-hand converter: 7.5 decimal hours becomes 7 hours 30 minutes. This is handy when payroll sends back a decimal total and you want to check it against your own hours.",
  },
  {
    q: "How do I handle a shift that crosses midnight?",
    a: "Count forward through midnight. A 22:00-to-06:00 shift is 8 hours, not negative 16. One way to see it: 22:00 to 24:00 is 2 hours, plus 00:00 to 06:00 is 6 hours, so the duration is 8 hours, which enters as 8.00 decimal hours.",
  },
  {
    q: "Should the break be paid or unpaid time on the timesheet?",
    a: "That depends on your employer and local law, not on the math. Paid breaks stay inside the duration you convert; unpaid breaks get subtracted first. US federal law does not require paid breaks, but several states do, so check your state rules or ask payroll.",
  },
  {
    q: "How many decimal places do timesheets use?",
    a: "Two places is the manual standard (8.75); four places is what most time clocks record (8.7500). Both mean the same thing here.",
  },
];

const CONVERSIONS: [string, string][] = [
  ["4 hours 15 minutes", "4.25"],
  ["4 hours 25 minutes", "4.4167"],
  ["5 hours 30 minutes", "5.50"],
  ["6 hours 45 minutes", "6.75"],
  ["7 hours 30 minutes", "7.50"],
  ["8 hours 15 minutes", "8.25"],
  ["8 hours 45 minutes", "8.75"],
  ["9 hours 20 minutes", "9.3333"],
  ["10 hours 30 minutes", "10.50"],
  ["12 hours", "12.00"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Time to Decimal Calculator"
        description="Turn a work shift or clock duration into decimal hours for your timesheet. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeDecimalCalculator />
        </div>

        <AdSlot />

        <ProseSection title="Why convert time to decimal?">
          <p>
            When you log a shift on a timesheet, payroll needs a single decimal number, not
            &ldquo;7h 30m.&rdquo; Converting makes the math straightforward: multiply decimal hours
            by your hourly rate to get gross pay. The converter above handles both directions.
          </p>
        </ProseSection>

        <ProseSection title="From clock times to a duration">
          <p>
            Time clocks record when you started and stopped, so the first job is finding the length
            of the shift. Subtract the start time from the end time: 9:00 to 17:45 is 8 hours 45
            minutes. Then convert the duration:
          </p>
          <Formula>decimal hours = hours + (minutes ÷ 60)</Formula>
          <p>
            8 + (45 ÷ 60) = 8.75. Enter 8 and 45 in the converter above and it shows the same
            result the moment you type.
          </p>
        </ProseSection>

        <ProseSection title="A full worked shift, including lunch">
          <p>
            Take a typical day: clock in at 8:15, lunch from 12:00 to 12:30, clock out at 16:40.
            The morning block is 8:15 to 12:00, which is 3 hours 45 minutes. The afternoon block is
            12:30 to 16:40, which is 4 hours 10 minutes. The unpaid lunch is already excluded by
            splitting the day this way.
          </p>
          <p>
            Total duration: 3h 45m + 4h 10m = 7 hours 55 minutes. Convert each block or the total;
            either way you get 7 + (55 ÷ 60) = 7.9167 decimal hours, which rounds to 7.92 on a
            two-place timesheet. At $22 an hour that day pays 7.92 × 22 = $174.24.
          </p>
          <p>
            Doing this arithmetic by hand every day is where errors creep in, which is why the
            converter keeps the conversion step mechanical. For a complete two-week walkthrough,
            see the biweekly timesheet guide.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Common shift lengths in decimal
          </h2>
          <ConversionTable fromHeader="Shift duration" toHeader="Decimal hours" rows={CONVERSIONS} />
        </section>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
            { href: "/guides/military-time-on-timesheets", label: "Military Time on Timesheets" },
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
                name: "Time to Decimal Calculator",
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
