import { pageMetadata } from "@/lib/seo";
import TimeCardRoundingCalculator from "@/components/TimeCardRoundingCalculator";
import PageHeader from "@/components/PageHeader";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = pageMetadata({
  title: "Time Card Rounding Calculator",
  description: "Round work hours to the nearest 1/100, 1/10, 5, 6, or 15 minutes for payroll. See how 7h 52m rounds under each common rule, plus a free tool.",
  path: "/time-card-rounding-calculator",
  absoluteTitle: false,
});

const faq = [
  {
    q: "How do you round 7 hours 52 minutes to decimal?",
    a: "7h 52m = 7.87 decimal hours. Under 15-minute (quarter-hour) rounding it becomes 7.75, because 52 minutes is closer to 45 than to 60. Under 1/100-hour rounding it stays 7.87. The calculator above shows every common rule at once.",
  },
  {
    q: "What is quarter-hour rounding?",
    a: "Quarter-hour rounding snaps clock time to the nearest 15 minutes (0, 15, 30, 45). Minutes 1–7 round down, 8–22 round to 0.25, 23–37 to 0.50, 38–52 to 0.75, and 53–59 up to the next hour.",
  },
  {
    q: "Is rounding time cards legal?",
    a: "Rounding is legal in the US when it is neutral — it rounds both for and against the employee over time. The federal rule comes from the 1946 Supreme Court case Anderson v. Mount Clemens Pottery Co. Check state law, since some states restrict it.",
  },
  {
    q: "What is 1/10 hour rounding?",
    a: "1/10-hour rounding snaps to the nearest sixth of an hour (every 6 minutes): 0, 6, 12, 18, 24, 30, 36, 42, 48, 54. So 52 minutes rounds to 54, or 0.90 decimal hours.",
  },
  {
    q: "Which rounding rule does my timesheet use?",
    a: "That depends on your employer's payroll policy, not on the math. The calculator above shows all five common rules for the same time, so you can match whichever your timesheet specifies.",
  },
];

const QUARTER_ROWS: [string, string][] = [
  ["1–7 minutes", "0.00"],
  ["8–22 minutes", "0.25"],
  ["23–37 minutes", "0.50"],
  ["38–52 minutes", "0.75"],
  ["53–59 minutes", "1.00"],
];

export default function Page() {
  return (
    <article>
      <PageHeader
        title="Time Card Rounding Calculator"
        description="Round work hours to the nearest 1/100, 1/10, 5, 6, or 15 minutes. Free and instant."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <TimeCardRoundingCalculator />
        </div>

        <AdSlot />

        <ProseSection title="Why time cards get rounded">
          <p>
            Many employers round clock times to a fixed increment so payroll stays consistent and
            easy to add up. The same shift can land on a different decimal depending on the rule, so
            it helps to see them side by side. Enter your time above to compare all five at once.
          </p>
        </ProseSection>

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Quarter-hour (15-minute) rounding
          </h2>
          <ConversionTable fromHeader="Minutes worked" toHeader="Rounded decimal" rows={QUARTER_ROWS} />
        </section>

        <ProseSection title="A worked example">
          <p>
            Take 7 hours 52 minutes. As a straight decimal that is 7.87 hours. Under quarter-hour
            rounding, 52 minutes sits between 45 and 60 and is closer to 45, so it becomes 7.75.
            Under 1/100-hour rounding it stays 7.87. Neither is &ldquo;wrong&rdquo; — they are just
            different policies, which is why the calculator shows each one.
          </p>
        </ProseSection>

        <FAQList items={faq} />

        <RelatedLinks
          links={[
            { href: "/guides/time-card-rounding", label: "Time Card Rounding Guide" },
            { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
            { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Time Card Rounding Calculator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
            ]),
          }}
        />
      </div>
    </article>
  );
}
