import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "minutestodecimal.org builds free, fast time-conversion tools for timesheets, payroll, and everyday scheduling.",
  alternates: { canonical: "https://minutestodecimal.org/about" },
};

export default function Page() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">About minutestodecimal.org</h1>
      <p className="mb-6 text-muted">
        A small, independent set of free tools for converting work time.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">What this site is for</h2>
        <p className="text-slate-700">
          This site helps hourly employees, freelancers, and small-business owners turn work time into the format
          their timesheet or payroll system expects. Whether you need decimal hours for a pay run, total minutes for a
          shift log, or a quick read of &ldquo;1.75 hours&rdquo; as &ldquo;1h 45m&rdquo;, the calculators here do it
          instantly, with no sign-up.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">How the tools work</h2>
        <p className="text-slate-700">
          Every calculator runs in your browser. The math is simple and standard (60 minutes in an hour, 60 seconds in
          a minute), and each page shows the formula it uses. Nothing you type is sent to a server.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Keeping it free</h2>
        <p className="text-slate-700">
          The site is supported by advertising. That is how it stays free to use and ad-free in every other way. If
          something looks wrong or you have a suggestion, the{" "}
          <a href="/contact" className="text-brand no-underline hover:text-brand-dark">
            contact page
          </a>{" "}
          is the place to reach us.
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-4 text-sm text-muted">
        Tools:{" "}
        <a href="/" className="text-brand no-underline hover:text-brand-dark">
          Minutes to Decimal
        </a>{" "}
        ·{" "}
        <a href="/time-to-decimal-calculator" className="text-brand no-underline hover:text-brand-dark">
          Time to Decimal
        </a>{" "}
        ·{" "}
        <a href="/hours-to-minutes-calculator" className="text-brand no-underline hover:text-brand-dark">
          Hours to Minutes
        </a>
      </section>
    </article>
  );
}
