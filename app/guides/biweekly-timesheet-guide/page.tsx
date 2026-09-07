import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "How to Fill Out a Biweekly Timesheet: a Complete Walkthrough",
  description:
    "A step-by-step guide to biweekly timesheets: recording daily hours, subtracting breaks, converting to decimal hours, handling overtime, and checking your paycheck.",
  alternates: { canonical: "https://www.minutestodecimal.org/guides/biweekly-timesheet-guide" },
};

const SAMPLE_WEEK: [string, string][] = [
  ["Mon · 8:15 – 16:45 (30m lunch)", "8.00"],
  ["Tue · 8:00 – 16:30 (30m lunch)", "8.00"],
  ["Wed · 7:45 – 17:10 (30m lunch)", "8.92"],
  ["Thu · 8:05 – 16:40 (30m lunch)", "8.08"],
  ["Fri · 8:00 – 14:25 (30m lunch)", "5.92"],
];

export default function BiweeklyTimesheetGuide() {
  return (
    <article>
      <PageHeader
        title="How to Fill Out a Biweekly Timesheet"
        description="From clock times to a paycheck: the complete walkthrough, with a worked two-week example."
      />

      <section className="mx-auto mt-8 max-w-3xl rounded-xl border border-black/10 bg-black/[0.03] p-5">
        <h2 className="mb-2 text-base font-semibold text-ink">Key takeaways</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>A biweekly pay period is 14 days (26 per year); overtime is counted per workweek, not per timesheet.</li>
          <li>Record each shift as a length first (out minus in, minus unpaid lunch), then convert to decimal hours (minutes &divide; 60 + hours).</li>
          <li>Total each workweek separately &mdash; only the week that passes 40.00 hours triggers time-and-a-half.</li>
          <li>Before submitting: week totals should match your schedule, every day stays between 0 and 24 hours, and re-add in minutes if anything looks off.</li>
          <li>Keep your own copy of every submitted timesheet; the person with the record wins any later pay dispute.</li>
        </ul>
      </section>

      <div className="container pb-16">
        <ProseSection title="What biweekly actually means">
          <p>
            A biweekly pay period covers 14 fixed days, and a year has 26 of them. It is not the
            same as semimonthly (24 periods, paid on fixed dates like the 15th and last day).
            Biweekly paydays drift across the calendar, and twice a year there is a three-paycheck
            month. On the timesheet itself, the practical difference matters more: a biweekly
            timesheet always spans exactly two workweeks, and overtime is calculated per workweek,
            not per timesheet.
          </p>
          <p>
            A full-time year is 2,080 hours (52 weeks × 40), which over 26 biweekly periods averages
            to 80.00 hours per paycheck. Nearly every real paycheck deviates a little, because
            schedules and start and end times never land on round numbers.
          </p>
        </ProseSection>

        <ProseSection title="Step 1: record durations, not clock times">
          <p>
            Timesheets want the length of each shift. If your source is a punch record, subtract:
            out minus in, then subtract any unpaid lunch. A shift from 8:15 to 16:45 with a 30-minute
            unpaid lunch is 8 hours 30 minutes of work minus 30 minutes, or 8 hours 00 minutes.
          </p>
          <p>
            Write the raw duration down first, even if the timesheet wants decimals. Trying to do
            the subtraction and the conversion in one step is where most errors start.
          </p>
        </ProseSection>

        <ProseSection title="Step 2: convert each day to decimal hours">
          <p>
            Divide each day&rsquo;s minutes by 60 and add the hours: 8h 00m becomes 8.00, 7h 50m
            becomes 7.83, 8h 55m becomes 8.92. Two decimal places is the standard manual
            precision; the converters on this site do it instantly if you would rather not divide
            by hand.
          </p>
          <p>
            Here is week one of a sample timesheet, with each day already converted:
          </p>
        </ProseSection>

        <section className="mt-6 md:mt-8">
          <ConversionTable fromHeader="Day" toHeader="Decimal hours" rows={SAMPLE_WEEK} />
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
            Week one total: 8.00 + 8.00 + 8.92 + 8.08 + 5.92 = 38.92 decimal hours.
          </p>
        </section>

        <ProseSection title="Step 3: total each workweek separately">
          <p>
            This is the step people skip, and it is the one that matters for overtime. Federal law
            (and every payroll system) counts overtime by the workweek. Week one above totaled
            38.92 hours, under 40, so all of it is regular time.
          </p>
          <p>
            Now say week two of the same timesheet totals 43.50 hours: 10 shifts, two weeks, 82.42
            hours combined. The two-week number is not what payroll uses. Week two is over 40 by
            3.50 hours, and those 3.50 hours must be paid at 1.5 times the regular rate. The
            overtime guide covers that multiplication with worked examples.
          </p>
        </ProseSection>

        <ProseSection title="Step 4: check the totals before submitting">
          <p>
            Three sanity checks catch almost every mistake. First, the week totals should be close
            to the scheduled hours; a week of 43.00 when you were scheduled 40 is either real
            overtime or a fat-fingered entry. Second, every day should be between 0 and 24 decimal
            hours; anything outside that range means a date got mixed up. Third, re-add the
            columns once using minutes instead of decimals if anything looks off: minutes are the
            ground truth.
          </p>
          <p>
            Then submit on time. Late timesheets are the most common reason a paycheck needs a
            manual correction on the next cycle.
          </p>
        </ProseSection>

        <ProseSection title="Step 5: audit the paycheck when it arrives">
          <p>
            Compare the hours on the pay stub with what you submitted, week by week. The stub will
            show decimal hours (for example 82.42, or a split like 78.92 regular + 3.50 overtime).
            To read an unfamiliar decimal as real time, multiply the fractional part by 60: 0.42
            hours is 25 minutes, so 82.42 is 82 hours 25 minutes across the period.
          </p>
          <p>
            If the stub does not match, check rounding first. Many employers round punches to the
            nearest 15 minutes before computing hours, which explains small differences in either
            direction. The time card rounding guide explains what is allowed and what is not.
          </p>
        </ProseSection>

        <ProseSection title="Keep your own copy">
          <p>
            Photograph or save every submitted timesheet. When a pay dispute comes up months later,
            the person with the contemporaneous record wins the argument. Your own log of clock-in
            and clock-out times is also the only way to tell whether an auto-deducted lunch or a
            rounding rule is quietly changing your totals.
          </p>
        </ProseSection>

        <RelatedLinks
          links={[
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
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
              headline: "How to Fill Out a Biweekly Timesheet: a Complete Walkthrough",
              description:
                "A step-by-step guide to biweekly timesheets: recording daily hours, subtracting breaks, converting to decimal hours, handling overtime, and checking your paycheck.",
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
