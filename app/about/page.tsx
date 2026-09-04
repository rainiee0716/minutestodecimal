import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "minutestodecimal.org builds free, fast time-conversion tools for timesheets, payroll, and everyday scheduling. Who we are and how the content is maintained.",
  alternates: { canonical: "https://www.minutestodecimal.org/about" },
};

export default function Page() {
  return (
    <article>
      <PageHeader
        title="About minutestodecimal.org"
        description="A small, independent set of free tools for converting work time."
      />

      <div className="container pb-16">
        <ProseSection title="What this site is for">
          <p>
            This site helps hourly employees, freelancers, and small-business owners turn work time
            into the format their timesheet or payroll system expects. Whether you need decimal
            hours for a pay run, total minutes for a shift log, or a quick read of &ldquo;1.75
            hours&rdquo; as &ldquo;1h 45m&rdquo;, the calculators here do it instantly, with no
            sign-up.
          </p>
        </ProseSection>

        <ProseSection title="Why we built it">
          <p>
            The math behind timesheets is simple: 60 minutes in an hour, divide or multiply
            accordingly. What makes it hard is that the formats keep shifting under your feet.
            Clock times are 24-hour, durations are hours-and-minutes, payroll wants decimals, and
            the difference between 2.30 and 2h 30m is 12 minutes of your pay. Most of the errors
            people make on timesheets are format errors, not arithmetic errors.
          </p>
          <p>
            So this site is deliberately narrow. Each page does one conversion, shows the formula
            it used, and explains the surrounding payroll context, such as rounding rules and
            overtime thresholds, in the guides section. We would rather explain 8.75 clearly than
            offer fifty half-working widgets.
          </p>
        </ProseSection>

        <ProseSection title="How the content is maintained">
          <p>
            Every formula on this site is checked against the standard conventions used by US
            payroll systems: quarter-hour rounding landmarks, two- and four-decimal hour formats,
            and the 40-hour weekly overtime threshold under the FLSA. The guides that touch labor
            law describe how the rules generally work; they are general information, not legal
            advice, and state rules vary. When a reader points out an error, we fix it and credit
            the catch.
          </p>
          <p>
            Where a guide cites a specific legal standard, we re-verify it against the primary
            source (the Department of Labor&rsquo;s published guidance for the FLSA, for example)
            rather than repeating secondhand summaries.
          </p>
          <p>
            The audience we write for is the person filling out the form at the end of a shift,
            not a payroll professional who already knows the answer. That is why every guide
            carries worked numbers all the way through to dollars, and why the calculators show
            the formula they used instead of hiding it.
          </p>
        </ProseSection>

        <ProseSection title="Privacy, in practice">
          <p>
            Every calculator runs in your browser. Nothing you type is sent to a server, and we
            have no accounts, so there is no profile of you to leak. The site is supported by
            advertising, and the privacy policy explains exactly what our hosting provider and ad
            partners can see and what choices you have.
          </p>
        </ProseSection>

        <ProseSection title="Corrections and suggestions">
          <p>
            If a number looks wrong on any page, tell us. Small sites get accuracy right through
            reader feedback, and timesheet math is one area where being wrong by 12 minutes
            matters. The{" "}
            <a
              href="/contact"
              className="font-medium text-brand-600 no-underline transition-colors hover:text-brand-700"
            >
              contact page
            </a>{" "}
            has the email address; a sentence about what you expected and what you saw is all we
            need.
          </p>
        </ProseSection>

        <RelatedLinks
          title="Tools"
          links={[
            { href: "/", label: "Minutes to Decimal" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal" },
            { href: "/hours-to-minutes-calculator", label: "Hours to Minutes" },
            { href: "/guides", label: "Timesheet Guides" },
          ]}
        />
      </div>
    </article>
  );
}
