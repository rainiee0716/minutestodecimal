import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Minutes to Decimal in Excel: Formulas & Examples",
  description: "Excel formulas to convert time to decimal hours: =A1*24, =A1*1440, HOUR/MINUTE decomposition, the fraction-of-a-day trap, and a worked timesheet example.",
  path: "/guides/minutes-to-decimal-excel",
  absoluteTitle: false,
});

const FORMULAS: [string, string][] = [
  ["=A1*24", "7.75"],
  ["=A1*1440", "465"],
  ["=A1*86400", "27,900"],
  ["=HOUR(A1)+MINUTE(A1)/60", "7.75"],
  ["=ROUND(A1*24, 2)", "7.75"],
  ["=TEXT(A1*24, \"0.00\")", "7.75"],
];

const FORMULA_NOTES: [string, string][] = [
  ["=A1*24", "decimal hours — the payroll format"],
  ["=A1*1440", "total minutes"],
  ["=A1*86400", "total seconds"],
  ["=HOUR(A1)+MINUTE(A1)/60", "decimal hours built from the parts, no day-fraction reasoning needed"],
  ["=ROUND(A1*24, 2)", "two-place rounding, as most timesheets want"],
  ["=TEXT(A1*24, \"0.00\")", "the same value as text, safe to concatenate into labels"],
];

const EXAMPLE_ROWS: [string, string, string, string][] = [
  ["09:00", "17:45", "=B2-A2", "8.75"],
  ["08:30", "17:00", "=B3-A3", "8.50"],
  ["09:15", "18:45", "=B4-A4", "9.50"],
];

export default function MinutesToDecimalExcel() {
  return (
    <article>
      <PageHeader
        title="Minutes to Decimal in Excel"
        description="The exact formulas that turn clock time into decimal hours in Excel, and the fraction-of-a-day trap behind the wrong answers."
      />

      <section className="mx-auto mt-8 max-w-3xl rounded-xl border border-black/10 bg-black/[0.03] p-5">
        <h2 className="mb-2 text-base font-semibold text-ink">Key takeaways</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Excel stores 7:45 not as &ldquo;7 hours 45 minutes&rdquo; but as a fraction of a day: 0.322917.</li>
          <li>That is why the decimal-hours formula is <strong>=A1*24</strong> — multiply the day-fraction back into hours.</li>
          <li>Multiplying by 24 on a cell that shows 7.75 in time format gives a wrong time-looking answer; set the result cell format to <strong>Number</strong>.</li>
          <li>For total minutes use <strong>=A1*1440</strong>; for hours-and-minutes parts use <strong>=HOUR(A1)+MINUTE(A1)/60</strong>.</li>
          <li>Shifts that cross midnight need <strong>=MOD(B1-A1, 1)</strong> before multiplying, or the result comes out negative.</li>
        </ul>
      </section>

      <div className="container pb-16">
        <ProseSection title="Why ÷60 is not the Excel way">
          <p>
            On paper, converting minutes to decimals is one division: 45 ÷ 60 = 0.75, so 7h 45m
            becomes 7.75. In Excel the same job is a multiplication instead, because Excel stores
            every time as a <strong>fraction of a 24-hour day</strong>. The value you see as
            &ldquo;7:45&rdquo; is really 0.322917 — seven hours and forty-five minutes expressed
            as a share of one full day. Multiply that fraction by 24 and the day-fraction turns
            back into plain decimal hours:
          </p>
          <Formula>decimal hours = time cell × 24</Formula>
          <p>
            So if A1 contains 7:45, then <strong>=A1*24 returns 7.75</strong> — the exact number a
            payroll system expects in the hours column. The division by 60 already happened inside
            Excel&rsquo;s time storage; multiplying by 24 undoes the &ldquo;day&rdquo; part, and
            what remains is hours with a decimal fraction.
          </p>
        </ProseSection>

        <ProseSection title="The formula reference">
          <p>
            All six formulas assume the time value sits in cell A1. Copy the one that matches the
            output you need:
          </p>
        </ProseSection>

        <section className="mt-6 md:mt-8">
          <ConversionTable
            fromHeader="Formula"
            toHeader="Result for 7:45"
            rows={FORMULAS}
          />
        </section>

        <ProseSection title="What each formula is for">
          <ul className="list-disc space-y-2 pl-5">
            {FORMULA_NOTES.map(([f, note]) => (
              <li key={f}>
                <span className="font-mono text-sm font-semibold text-ink">{f}</span> — {note}.
              </li>
            ))}
          </ul>
        </ProseSection>

        <ProseSection title="The trap everyone hits: the result looks like a time again">
          <p>
            The single most common failure is not the formula — it is the <strong>cell format</strong>.
            Excel keeps the result of =A1*24 in the same format as A1, so 7.75 can display as
            &ldquo;18:00&rdquo; (0.322917 of the next day) or &ldquo;7:45&rdquo; lookalikes. The math
            is right; the display is lying. Fix it once: select the result cells, open Format Cells
            (Ctrl/Cmd + 1), and set the category to <strong>Number</strong> with two decimals. From
            then on every =A1*24 reads as plain decimal hours.
          </p>
          <p>
            The second trap is <strong>text that looks like time</strong>. If 7:45 was pasted in as
            text (often from PDFs and web tables), =A1*24 returns a #VALUE! error. Either retype the
            value, or convert it first with =TIMEVALUE(A1)*24 — TIMEVALUE turns the text back into a
            true time fraction.
          </p>
        </ProseSection>

        <ProseSection title="A worked week, from punch times to payroll">
          <p>
            Here is the whole chain on a real three-day week. Start and end times go in columns A
            and B; the shift duration is their difference; the decimal hours multiply that duration
            by 24; pay multiplies the decimals by an hourly rate.
          </p>
        </ProseSection>

        <section className="mt-6 md:mt-8">
          <ConversionTable
            fromHeader="Clock in / out (duration formula)"
            toHeader="Decimal hours"
            rows={EXAMPLE_ROWS.map(([inT, outT, f, d]) => [`${inT} – ${outT}  (${f}×24)`, d])}
          />
        </section>

        <ProseSection title="Totals and the midnight crossing">
          <p>
            Add the daily decimals with plain SUM — decimal hours are plain numbers, so
            <strong> =SUM(D2:D4)</strong> gives 26.75 for the week above. There is one exception that
            needs a different formula: a shift that starts before midnight and ends after it (22:30
            to 06:30) gives a negative difference, because the end is numerically smaller than the
            start. Wrap the subtraction in MOD to flip it positive:
          </p>
          <Formula>=MOD(B2-A2, 1) * 24</Formula>
          <p>
            MOD returns the duration as a day-fraction between 0 and 1 even across midnight, and the
            × 24 turns it into the same decimal hours as every other row. For the rounding rules
            that decide whether 8:07 logs as 8.00 or 8.25, see the time card rounding guide.
          </p>
        </ProseSection>

        <ProseSection title="Google Sheets: the same formulas">
          <p>
            Google Sheets stores time exactly like Excel — a fraction of a day — so every formula on
            this page works unchanged. =A1*24, =A1*1440, HOUR/MINUTE decomposition and the MOD
            midnight fix all behave identically; the only difference is the menu path for setting
            the result format (Format → Number → Number).
          </p>
        </ProseSection>

        <RelatedLinks
          links={[
            { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
            { href: "/", label: "Minutes to Decimal Converter" },
            { href: "/weekly-timesheet-calculator", label: "Weekly Timesheet Calculator" },
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
          ]}
        />

        <JsonLd
          data={[
            articleSchema({
              headline: "Minutes to Decimal in Excel: Formulas & Examples",
              description:
                "Excel formulas to convert time to decimal hours: =A1*24, =A1*1440, HOUR/MINUTE decomposition, the fraction-of-a-day trap, and a worked timesheet example.",
              path: "/guides/minutes-to-decimal-excel",
              datePublished: "2026-11-09",
              dateModified: "2026-11-09",
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: "Minutes to Decimal in Excel", path: "/guides/minutes-to-decimal-excel" },
            ]),
          ]}
        />
      </div>
    </article>
  );
}
