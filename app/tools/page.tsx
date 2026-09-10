import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { TOOL_CATEGORIES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "All Time & Timesheet Tools",
  description:
    "Browse every free time-conversion and timesheet calculator on minutestodecimal.org, including decimal hours, weekly timesheets, overtime, rounding, and quick reference charts.",
  path: "/tools",
  absoluteTitle: false,
});

const POPULAR_TOOLS = [
  {
    href: "/",
    label: "Minutes to Decimal Converter",
    description: "The fastest way to convert hours and minutes into payroll decimal hours.",
  },
  {
    href: "/weekly-timesheet-calculator",
    label: "Weekly Timesheet Calculator",
    description: "Calculate a full workweek, split regular and overtime hours, and estimate pay.",
  },
  {
    href: "/minutes-to-decimal-chart",
    label: "Minutes to Decimal Chart",
    description: "See every minute from 1 to 60 as decimal hours.",
  },
  {
    href: "/time-card-rounding-calculator",
    label: "Time Card Rounding Calculator",
    description: "Compare 1/100, 1/10, 5-minute, 6-minute, and 15-minute rounding rules.",
  },
];

const categoryAnchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ToolsPage() {
  return (
    <article>
      <PageHeader
        title="All Time & Timesheet Tools"
        description="Every free converter, calculator, and reference table on minutestodecimal.org, grouped by what you need to do."
      />

      <div className="container pb-16">
        <section className="mx-auto mt-10 max-w-5xl md:mt-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {POPULAR_TOOLS.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 no-underline shadow-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
              >
                <h2 className="text-lg font-semibold text-ink">{tool.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tool.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
                  Open tool
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {TOOL_CATEGORIES.map((category) => (
          <section
            key={category.heading}
            id={categoryAnchor(category.heading)}
            className="mx-auto mt-12 max-w-5xl scroll-mt-24 md:mt-16"
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {category.heading}
              </h2>
              <p className="mt-2 text-sm text-muted">{category.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {category.links.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 no-underline shadow-card transition-colors hover:border-brand-300"
                >
                  <h3 className="text-base font-semibold text-ink">{tool.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {tool.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
                    Open
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <ProseSection title="How to choose the right tool">
          <p>
            If you need a one-off conversion, start with the minutes-to-decimal converter. If you
            are filling out a timesheet for a full week, use the weekly timesheet calculator. If you
            are checking why payroll shows a different number, the time card rounding calculator and
            the overtime guide are the best places to start.
          </p>
          <p>
            Every tool runs in your browser. Nothing you type is sent to a server, and no account is
            required.
          </p>
        </ProseSection>

        <RelatedLinks
          title="Guides"
          links={[
            { href: "/guides", label: "All Guides" },
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Rules" },
            { href: "/guides/overtime-decimal-hours", label: "Overtime in Decimal Hours" },
            { href: "/guides/biweekly-timesheet-guide", label: "Biweekly Timesheet Guide" },
          ]}
        />

        <JsonLd
          data={[
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "All Tools", path: "/tools" },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "All Time & Timesheet Tools",
              description:
                "Every free time-conversion and timesheet calculator on minutestodecimal.org.",
              url: "https://www.minutestodecimal.org/tools",
              hasPart: TOOL_CATEGORIES.flatMap((category) =>
                category.links.map((tool) => ({
                  "@type": "WebApplication",
                  name: tool.label,
                  url: `https://www.minutestodecimal.org${tool.href}`,
                  applicationCategory: "UtilitiesApplication",
                  operatingSystem: "Any",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                }))
              ),
            },
          ]}
        />
      </div>
    </article>
  );
}
