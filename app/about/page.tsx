import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "minutestodecimal.org builds free, fast time-conversion tools for timesheets, payroll, and everyday scheduling.",
  alternates: { canonical: "https://minutestodecimal.org/about" },
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

        <ProseSection title="How the tools work">
          <p>
            Every calculator runs in your browser. The math is simple and standard (60 minutes in
            an hour, 60 seconds in a minute), and each page shows the formula it uses. Nothing you
            type is sent to a server.
          </p>
        </ProseSection>

        <ProseSection title="Keeping it free">
          <p>
            The site is supported by advertising. That is how it stays free to use and ad-free in
            every other way. If something looks wrong or you have a suggestion, the{" "}
            <a
              href="/contact"
              className="font-medium text-brand-600 no-underline transition-colors hover:text-brand-700"
            >
              contact page
            </a>{" "}
            is the place to reach us.
          </p>
        </ProseSection>

        <RelatedLinks
          title="Tools"
          links={[
            { href: "/", label: "Minutes to Decimal" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal" },
            { href: "/hours-to-minutes-calculator", label: "Hours to Minutes" },
          ]}
        />
      </div>
    </article>
  );
}
