import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with minutestodecimal.org about a tool, a correction, or a suggestion.",
  alternates: { canonical: "https://minutestodecimal.org/contact" },
};

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Contact"
        description="Questions, corrections, or suggestions? Send a note and we will take a look."
      />

      <div className="container pb-16">
        <section className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-card md:mt-14">
          <h2 className="text-base font-semibold text-ink">Email</h2>
          <p className="mt-3 text-slate-600">The easiest way to reach us is by email:</p>
          <p className="mt-5">
            <a
              href="mailto:rainiee0716@gmail.com"
              className="inline-block rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:bg-brand-700"
            >
              rainiee0716@gmail.com
            </a>
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Please include the page name and what you saw if you are reporting a problem. We read
            every message, though replies may take a few days.
          </p>
        </section>

        <ProseSection title="Before you write">
          <p>
            Most questions are about how a conversion works. Each calculator page already shows its
            formula and a list of common examples, so checking that first may answer it
            immediately. For anything else, the email above works well.
          </p>
        </ProseSection>

        <RelatedLinks links={[{ href: "/", label: "Minutes to Decimal Converter" }]} />
      </div>
    </article>
  );
}
