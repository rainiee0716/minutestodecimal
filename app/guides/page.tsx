import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { GUIDES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Timesheet Guides",
  description: "Plain-language guides to timesheet math: rounding rules, overtime in decimal hours, biweekly timesheets, and military time.",
  path: "/guides",
  absoluteTitle: false,
});

export default function GuidesIndex() {
  return (
    <article>
      <PageHeader
        title="Timesheet Guides"
        description="Plain-language guides to the math behind timesheets, rounding, and overtime. No jargon, worked examples throughout."
      />

      <div className="container pb-16">
        <div className="mx-auto mb-8 max-w-3xl text-center text-slate-600">
          <p>
            The converters on this site do the arithmetic; these guides explain what the arithmetic
            is for. Each one covers a single payroll topic with worked numbers, from how employers
            round clock times to how overtime is computed from decimal hours.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {GUIDES.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="block rounded-xl border border-slate-200 bg-white p-6 no-underline shadow-card transition-colors hover:border-brand-300"
            >
              <h2 className="text-lg font-semibold text-ink">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.summary}</p>
            </a>
          ))}
        </div>

        <RelatedLinks
          title="Tools"
          links={[
            { href: "/tools", label: "All Tools" },
            { href: "/weekly-timesheet-calculator", label: "Weekly Timesheet Calculator" },
            { href: "/", label: "Minutes to Decimal Converter" },
            { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
          ]}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ])}
        />
      </div>
    </article>
  );
}
