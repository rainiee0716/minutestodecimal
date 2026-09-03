import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with minutestodecimal.org about a tool, a correction, or a suggestion.",
  alternates: { canonical: "https://minutestodecimal.org/contact" },
};

export default function Page() {
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold text-ink">Contact</h1>
      <p className="mb-6 text-muted">
        Questions, corrections, or suggestions? Send a note and we will take a look.
      </p>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-ink">Email</h2>
        <p className="text-slate-700">
          The easiest way to reach us is by email:
        </p>
        <p className="mt-3 text-center">
          <a
            href="mailto:hello@minutestodecimal.org"
            className="text-lg font-semibold text-brand no-underline hover:text-brand-dark"
          >
            hello@minutestodecimal.org
          </a>
        </p>
        <p className="mt-3 text-sm text-muted">
          Please include the page name and what you saw if you are reporting a problem. We read every message, though
          replies may take a few days.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-ink">Before you write</h2>
        <p className="text-slate-700">
          Most questions are about how a conversion works. Each calculator page already shows its formula and a list of
          common examples, so checking that first may answer it immediately. For anything else, the email above works
          well.
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-4 text-sm text-muted">
        Back to:{" "}
        <a href="/" className="text-brand no-underline hover:text-brand-dark">
          Minutes to Decimal Converter
        </a>
      </section>
    </article>
  );
}
