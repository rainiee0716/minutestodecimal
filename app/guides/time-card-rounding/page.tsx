import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Time Card Rounding Rules: the 15-Minute and 7-Minute Rules Explained",
  description:
    "How employers round clock times to the nearest quarter hour, what the 7-minute rule means, and what federal law allows. With worked examples in decimal hours.",
  alternates: { canonical: "https://www.minutestodecimal.org/guides/time-card-rounding" },
};

const ROUNDED: [string, string][] = [
  ["8:01 – 8:07", "8:00"],
  ["8:08 – 8:14", "8:15"],
  ["8:16 – 8:22", "8:15"],
  ["8:23 – 8:29", "8:30"],
  ["8:31 – 8:37", "8:30"],
  ["8:38 – 8:44", "8:45"],
  ["8:46 – 8:52", "8:45"],
  ["8:53 – 8:59", "9:00"],
];

export default function TimeCardRounding() {
  return (
    <article>
      <PageHeader
        title="Time Card Rounding Rules"
        description="The 15-minute rule, the 7-minute rule, and what federal law allows employers to do with your clock times."
      />

      <section className="mx-auto mt-8 max-w-3xl rounded-xl border border-black/10 bg-black/[0.03] p-5">
        <h2 className="mb-2 text-base font-semibold text-ink">Key takeaways</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Rounding snaps each punch to the nearest increment (usually 15 minutes); the 7-minute rule is the boundary.</li>
          <li>Federal law allows rounding only if it is neutral &mdash; it must favor the employer and the employee equally over time.</li>
          <li>Rounding can cut either way, so track your own punches and watch for a pattern that always rounds against you.</li>
          <li>Many modern systems keep the exact time and never round; check your employer&rsquo;s written policy.</li>
        </ul>
      </section>

      <div className="container pb-16">
        <ProseSection title="What time card rounding is">
          <p>
            When you clock in, the time clock records the exact minute: 8:06, 8:39, 16:52. Many
            payroll systems do not use those exact punches. Instead they snap each punch to the
            nearest fixed increment, most commonly 15 minutes, sometimes 5 or 10. A punch at 8:06
            might be recorded as 8:00. A punch at 16:52 might become 17:00.
          </p>
          <p>
            The practice dates from the era of mechanical punch clocks and paper cards, when
            bookkeepers did not want to add up columns of minutes like &ldquo;7h 38m.&rdquo;
            Rounding every punch to a quarter hour made the addition trivial. Modern systems keep
            the exact time and round only for the payroll math, or skip rounding entirely.
          </p>
        </ProseSection>

        <ProseSection title="The 15-minute rule">
          <p>
            Under 15-minute rounding, every punch moves to the closest of :00, :15, :30, or :45.
            The midpoint between two quarter-hour marks is 7½ minutes, which produces the boundary
            everyone calls the <strong>7-minute rule</strong>: a punch made within 7 minutes of a
            quarter-hour mark rounds to that mark; a punch made 8 or more minutes past it rounds up
            to the next one.
          </p>
          <p>
            In practice, for the 8 o&rsquo;clock hour:
          </p>
        </ProseSection>

        <section className="mt-6 md:mt-8">
          <ConversionTable fromHeader="Actual punch" toHeader="Rounded to" rows={ROUNDED} />
        </section>

        <ProseSection title="Rounding works in both directions">
          <p>
            The rule is the same whether you are clocking in or out. Clock out at 17:07 and the
            punch rounds back to 17:00, which shortens your day by 7 minutes. Clock out at 17:08
            and it rounds forward to 17:15, which lengthens it by 7 minutes. Some days you win, some
            days you lose.
          </p>
          <p>
            That symmetry is the legal core of the whole topic. Rounding is only defensible when it
            is neutral, over time, in both directions. A system that rounds clock-ins down and
            clock-outs down is not rounding; it is shaving time, and it is a violation.
          </p>
        </ProseSection>

        <ProseSection title="What federal law says">
          <p>
            Under the Fair Labor Standards Act (FLSA), employees must be paid for all hours worked.
            The Department of Labor has long accepted rounding to the nearest 5, 10, or 15 minutes
            as compliant, on the condition that the practice averages out and does not
            systematically favor the employer. If rounding always seems to cost employees minutes,
            the practice fails the test and the employer owes the difference.
          </p>
          <p>
            Two practical notes. First, some states are stricter than the federal floor: California
            courts, for example, have questioned rounding when the employer already keeps exact
            electronic records. Second, this article is general information, not legal advice. If
            you believe rounding is costing you real pay, your state labor agency is the right
            first stop.
          </p>
        </ProseSection>

        <ProseSection title="A worked day, rounded and unrounded">
          <p>
            Say you clock in at 7:56, take a 30-minute unpaid lunch, and clock out at 16:24. The
            exact day is 8 hours 28 minutes of work minus the lunch, which is 7 hours 58 minutes:
            in decimal hours, 7 + (58 ÷ 60) = 7.9667, so 7.97.
          </p>
          <p>
            Under 15-minute rounding, the punches become 8:00 in and 16:30 out. That day is 8 hours
            30 minutes minus the lunch, or 8.00 decimal hours. The rounded day pays 2 minutes more
            than the exact one. Flip the punch times to 7:54 and 16:26 and the rounded day pays less.
            Over many days the two effects are supposed to cancel.
          </p>
          <p>
            Notice what rounding did not touch: the lunch. Break deductions follow their own rules,
            and an automatically deducted 30-minute lunch you actually worked through is a separate
            (and more serious) compliance issue than minute-level rounding.
          </p>
        </ProseSection>

        <ProseSection title="Rounding versus grace periods">
          <p>
            Some employers advertise a &ldquo;7-minute grace period&rdquo; meaning something
            different: if you clock in up to 7 minutes late, no action is taken and your shift
            starts on time. That is a management policy, not rounding. Your punch stays what it was;
            the schedule is what flexes. Ask payroll which one you are looking at, because the
            paycheck math differs: grace keeps your exact hours, rounding changes them.
          </p>
        </ProseSection>

        <ProseSection title="Checking your own timesheet">
          <p>
            If your employer rounds, do the same math on your side. Convert each day to decimal
            hours using the rounded punches, add them up, and compare the total with your pay stub
            every period. A standing 15-minute gap between your own records and your paycheck is
            worth a conversation, and keeping your own log (a photo of each punch works) makes that
            conversation much easier.
          </p>
          <p>
            The converters on this site handle the arithmetic: enter the shift duration as hours
            and minutes to get the decimal value, or read a pay-stub decimal back out as hours and
            minutes.
          </p>
        </ProseSection>

        <RelatedLinks
          links={[
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/decimal-to-hours-calculator", label: "Decimal to Hours Calculator" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Time Card Rounding Rules: the 15-Minute and 7-Minute Rules Explained",
              description:
                "How employers round clock times to the nearest quarter hour, what the 7-minute rule means, and what federal law allows.",
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
