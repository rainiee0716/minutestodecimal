import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLongtailSlugs, parseLongtailSlug } from "@/lib/longtail";
import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import UnitConverter from "@/components/UnitConverter";
import AdSlot from "@/components/AdSlot";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import FAQList from "@/components/FAQList";
import RelatedLinks from "@/components/RelatedLinks";

// 只允许预生成的 slug，未匹配的直接 404，不与任何静态路由冲突
export const dynamicParams = false;

export function generateStaticParams() {
  return allLongtailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = parseLongtailSlug(params.slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
  });
}

export default function LongtailPage({ params }: { params: { slug: string } }) {
  const page = parseLongtailSlug(params.slug);
  if (!page) notFound();

  return (
    <article>
      <PageHeader title={page.h1} description={page.answerNote} />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode={page.converter.mode} defaults={page.converter.defaults} />
        </div>

        <AdSlot />

        {page.prose.map((section, si) => (
          <ProseSection key={section.title} title={section.title}>
            {section.paras.map((p, pi) => (
              <p key={pi}>{p}</p>
            ))}
            {si === 0 && <Formula>{page.formula}</Formula>}
          </ProseSection>
        ))}

        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            {page.tableTitle}
          </h2>
          <ConversionTable fromHeader={page.tableFrom} toHeader={page.tableTo} rows={page.tableRows} />
        </section>

        <FAQList items={page.faq} />

        <RelatedLinks title="Related conversions" links={page.related} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      </div>
    </article>
  );
}
