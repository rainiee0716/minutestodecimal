import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "How to Calculate Overtime in Decimal Hours",
  description:
    "Overtime math with decimal hours: the 40-hour weekly rule, time-and-a-half, worked pay examples, and the mistakes that cost people money.",
  alternates: { canonical: "https://www.minutestodecimal.org/guides/overtime-decimal-hours" },
};

export default function OvertimeDecimalHours() {
  return (
    <article>
      <PageHeader
        title="How to Calculate Overtime in Decimal Hours"
        description="The weekly 40-hour rule, time-and-a-half, and worked examples using decimal hours."
      />

      <div className="container pb-16">
        <ProseSection title="The rule in one paragraph">
          <p>
            Under the federal Fair Labor Standards Act (FLSA), most hourly employees must be paid
            1.5 times their regular rate for every hour worked over 40 in a single workweek. A
            workweek is seven fixed 24-hour periods, defined by the employer: Sunday-to-Saturday
            and Monday-to-Sunday are both common. The 40-hour threshold applies to each workweek on
            its own. It never resets mid-week, and hours cannot be carried into the next week to
            avoid overtime.
          </p>
        </ProseSection>

        <ProseSection title="Why decimal hours make overtime visible">
          <p>
            Overtime is a threshold question: is the week over 40.00 hours or not? In
            hours-and-minutes form that comparison is annoying (is 40h 50m over? by how much?). In
            decimal form it is a subtraction. Convert each day, add the week, and read the answer
            straight off:
          </p>
          <Formula>overtime hours = weekly decimal total − 40.00</Formula>
          <p>
            A week that adds to 43.50 decimal hours has 3.50 overtime hours. There is no ambiguity
            about where the threshold was crossed or by how much.
          </p>
        </ProseSection>

        <ProseSection title="A worked week">
          <p>
            Take a week at $20.00 an hour with the following decimal days: Monday 8.50, Tuesday
            9.25, Wednesday 8.00, Thursday 10.00, Friday 8.25. The total is 44.00 hours.
          </p>
          <p>
            Regular hours: 40.00 × $20.00 = $800.00. Overtime hours: 4.00, paid at 1.5 × $20.00 =
            $30.00 an hour, so 4.00 × $30.00 = $120.00. Gross pay for the week: $920.00. Two lines
            of multiplication once the week is in decimal form.
          </p>
        </ProseSection>

        <ProseSection title="A week with awkward minutes">
          <p>
            Real timesheets are rarely round. Say the same $20.00-an-hour week adds up to 42.17
            hours. The overtime is 2.17 hours, and overtime pay is 2.17 × $30.00 = $65.10. Regular
            pay is 40.00 × $20.00 = $800.00, so the week grosses $865.10.
          </p>
          <p>
            The 0.17 is no typo: 0.17 decimal hours is about 10 minutes (0.17 × 60), so the week
            was 42 hours 10 minutes. Payroll systems keep the decimal all the way through the
            multiplication, which is exactly why they store hours that way.
          </p>
        </ProseSection>

        <ProseSection title="The regular rate is not always your base wage">
          <p>
            Time-and-a-half is computed on your <em>regular rate</em>, not necessarily your stated
            hourly wage. If you earn shift differentials (nights, weekends), commissions, or
            non-discretionary bonuses, those amounts generally fold into the regular rate first,
            and the overtime premium is 1.5 times the higher figure. A $18.00 wage with a $100
            weekly bonus across 45 hours has a regular rate of (18 × 45 + 100) ÷ 45 = $20.22, so
            overtime pays $30.33 an hour, not $27.00.
          </p>
        </ProseSection>

        <ProseSection title="Daily overtime: the state exception">
          <p>
            Federal law counts overtime by the week, but several states add daily triggers.
            California is the best known: hours over 8 in a day earn overtime, hours over 12 earn
            double time, and a seventh consecutive workday triggers overtime too. Colorado, Alaska,
            and Nevada have their own daily rules. If you work in one of these states, convert each
            day to decimal hours and check the day total as well as the week total.
          </p>
        </ProseSection>

        <ProseSection title="Four mistakes that cost real money">
          <p>
            <strong>Averaging two weeks.</strong> A biweekly total of 80 hours does not cancel
            overtime earned in week one. If week one was 44.00 and week two was 36.00, you are owed
            4.00 overtime hours for week one regardless of the two-week total.
          </p>
          <p>
            <strong>Unpaid prep and cleanup.</strong> Time spent booting a register, stocking, or
            traveling between sites during a shift is generally work time and counts toward the 40.
          </p>
          <p>
            <strong>Working through lunch.</strong> If 30 minutes are auto-deducted but you
            actually worked, the week is 2.50 hours higher over five days, which can be the
            difference between 39.50 and 42.00.
          </p>
          <p>
            <strong>Pre-shift waiting.</strong> If you must be present and cannot use the time
            freely, it is usually compensable even before the shift officially starts.
          </p>
        </ProseSection>

        <ProseSection title="Double time, holidays, and comp time">
          <p>
            Federal law requires only time-and-a-half over 40 hours. Double time (2.0 times your
            rate) is not required by the FLSA at all; it exists where union contracts, state rules,
            or employer policy create it. California is again the exception, with double time over
            12 hours in a day. Working on a holiday is paid at your regular rate under federal law
            unless a contract or policy says otherwise, and the hours still count toward the
            weekly 40.
          </p>
          <p>
            Compensatory time off instead of overtime pay is generally not permitted for private
            employers; it is a public-sector arrangement. If a private employer offers{" "}
            &ldquo;comp time&rdquo; in place of overtime, the hours still legally belong on the
            paycheck. In decimal terms: a 45.00-hour week owes 5.00 hours at 1.5 times the rate,
            not 5.00 hours of vacation.
          </p>
        </ProseSection>

        <ProseSection title="Checking your pay stub">
          <p>
            Pay stubs list hours in decimal form. To audit one, convert your own daily records the
            same way (each day as decimal hours, summed per week), then compare week by week. Any
            week over 40.00 should show a separate overtime line at 1.5 times your regular rate. If
            the stub shows a lump sum, divide gross pay by an implied blended rate as a rough check,
            and ask payroll for the breakdown when the numbers do not reconcile.
          </p>
          <p>
            This article is general information about how the math works, not legal advice. For a
            specific dispute, your state labor agency or an employment lawyer is the right
            resource.
          </p>
        </ProseSection>

        <RelatedLinks
          links={[
            { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "How to Calculate Overtime in Decimal Hours",
              description:
                "Overtime math with decimal hours: the 40-hour weekly rule, time-and-a-half, worked pay examples, and the mistakes that cost people money.",
              author: { "@type": "Organization", name: "minutestodecimal.org" },
              publisher: { "@type": "Organization", name: "minutestodecimal.org" },
              datePublished: "2026-09-04",
            }),
          }}
        />
      </div>
    </article>
  );
}
