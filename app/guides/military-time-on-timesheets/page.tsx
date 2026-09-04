import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Military Time on Timesheets: Reading the 24-Hour Clock",
  description:
    "How 24-hour clock times work on timesheets, how to convert them to and from 12-hour time, and why clock times and decimal hours are not the same thing.",
  alternates: { canonical: "https://www.minutestodecimal.org/guides/military-time-on-timesheets" },
};

const MILITARY: [string, string][] = [
  ["0000 / 2400", "12:00 AM (midnight)"],
  ["0100", "1:00 AM"],
  ["0630", "6:30 AM"],
  ["0900", "9:00 AM"],
  ["1130", "11:30 AM"],
  ["1200", "12:00 PM (noon)"],
  ["1230", "12:30 PM"],
  ["1500", "3:00 PM"],
  ["1730", "5:30 PM"],
  ["2100", "9:00 PM"],
  ["2345", "11:45 PM"],
];

export default function MilitaryTimeOnTimesheets() {
  return (
    <article>
      <PageHeader
        title="Military Time on Timesheets"
        description="Reading the 24-hour clock on punch records, and why clock times and decimal hours are different things."
      />

      <div className="container pb-16">
        <ProseSection title="Why timesheets use the 24-hour clock">
          <p>
            Hospitals, factories, security teams, and the military itself run around the clock, and
            &ldquo;6:00&rdquo; is ambiguous in that world: morning or evening? The 24-hour clock
            removes the ambiguity by counting hours from 0000 (midnight) to 2359 (one minute before
            the next midnight). A punch of 1830 means 6:30 PM, always.
          </p>
          <p>
            Payroll systems love it for the same reason: subtracting a start time from an end time
            works without any AM/PM logic. From 0700 to 1530 is simply 1530 − 0700 = 8 hours 30
            minutes.
          </p>
        </ProseSection>

        <ProseSection title="Converting 24-hour to 12-hour time">
          <p>
            Two rules cover everything. Hours from 00 to 12 keep their number and gain an AM (or
            noon at exactly 1200). Hours from 13 to 23 switch to PM after subtracting 12: 1300 is
            1:00 PM, 1830 is 6:30 PM, 2345 is 11:45 PM. The minutes never change.
          </p>
          <p>
            Going the other way, add 12 to any PM hour: 6:30 PM becomes 1830, and 12:30 PM (the
            tricky one) becomes 1230, because noon hour is 12 in both systems.
          </p>
        </ProseSection>

        <section className="mt-6 md:mt-8">
          <ConversionTable fromHeader="24-hour clock" toHeader="12-hour clock" rows={MILITARY} />
        </section>

        <ProseSection title="The one trap: 1430 is a time, 14.30 is not 2:30 PM">
          <p>
            The 24-hour clock and decimal hours look similar on a screen, but they measure
            different things. <strong>1430 is a clock time</strong> (2:30 in the afternoon).{" "}
            <strong>14.30 decimal hours is a duration</strong>: 14 hours and 18 minutes. And{" "}
            <strong>14.50 decimal hours is 14 hours 30 minutes</strong>, the duration that 1430 as
            a time has passed since midnight.
          </p>
          <p>
            On a timesheet the columns are usually labeled, but people still mix them up when
            transferring numbers by hand. The safe habit: clock times in the in/out columns (no
            decimal points), decimal hours only in the daily total column.
          </p>
        </ProseSection>

        <ProseSection title="A worked shift, start to paycheck">
          <p>
            Say a punch card reads IN 0645, OUT 1130 for lunch, IN 1215, OUT 1645. Morning block:
            1130 − 0645 = 4 hours 45 minutes. Afternoon block: 1645 − 1215 = 4 hours 30 minutes.
            The day is 9 hours 15 minutes of paid time.
          </p>
          <p>
            For the daily total column, convert once: 9 + (15 ÷ 60) = 9.25 decimal hours. At $19.00
            an hour, the day grosses 9.25 × 19.00 = $175.75. Five such days is a 46.25-hour week,
            which is over 40, so 6.25 hours must be paid at time and a half, the overtime guide
            explains.
          </p>
        </ProseSection>

        <ProseSection title="Shifts that cross midnight">
          <p>
            Night shifts are where 24-hour time earns its keep. A shift from 2200 to 0630 crosses
            midnight, so plain subtraction gives a negative number. Count forward instead: 2200 to
            2400 is 2 hours, plus 0000 to 0630 is 6 hours 30 minutes, for a total of 8 hours 30
            minutes, or 8.50 decimal hours.
          </p>
          <p>
            Which workweek those hours belong to depends on the day the shift started, not the day
            it ended. Payroll systems split the shift at midnight for the daily record but charge
            the whole shift to the starting day for weekly overtime purposes; check how your
            employer does it if you regularly work past midnight, because it changes which week
            crosses 40 hours.
          </p>
        </ProseSection>

        <ProseSection title="Time zones and the Z suffix">
          <p>
            Schedules that span regions sometimes show times like 1400Z. The Z stands for Zulu
            time, which is UTC (Greenwich Mean Time). Aircrew, dispatchers, and some logistics
            operations log in Zulu to avoid time-zone arguments; everyone else&rsquo;s timesheet
            uses local time. If a schedule mixes the two, convert before subtracting, or the shift
            length will be wrong by whole hours.
          </p>
        </ProseSection>

        <ProseSection title="Writing it correctly">
          <p>
            The convention is four digits, no colon: <strong>0730</strong>, not 7:30 or 07:30. The
            leading zero matters, because 0730 and 1730 are ten hours apart, and a dropped zero on
            a night-shift timesheet is a real payroll error. Spoken form usually reads the digits
            out (&ldquo;oh seven thirty&rdquo; or &ldquo;zero seven three zero&rdquo;).
          </p>
          <p>
            Midnight has two conventions. A day that <em>starts</em> at midnight uses 0000; a
            shift that <em>ends</em> at midnight is usually written 2400, because that is the end
            of the day being worked, not the start of the next one. So a 16:00-to-midnight shift
            is 1600 to 2400, exactly 8.00 hours, and the shift after it runs 0000 to 0800, also
            8.00 hours.
          </p>
        </ProseSection>

        <RelatedLinks
          links={[
            { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Military Time on Timesheets: Reading the 24-Hour Clock",
              description:
                "How 24-hour clock times work on timesheets, how to convert them to and from 12-hour time, and why clock times and decimal hours are not the same thing.",
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
