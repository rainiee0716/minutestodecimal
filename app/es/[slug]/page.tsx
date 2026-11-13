import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { buildEsKeeperPage, allEsKeeperSlugs } from "@/lib/longtail-es";
import PageHeader from "@/components/PageHeader";
import UnitConverter from "@/components/UnitConverter";
import ProseSection from "@/components/ProseSection";
import Formula from "@/components/Formula";
import ConversionTable from "@/components/ConversionTable";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// 西语 keeper 路由：/es/20-minutos-a-decimales 等，静态生成
export function generateStaticParams() {
  return allEsKeeperSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = buildEsKeeperPage(params.slug);
  if (!page) return {};
  const url = `${SITE_URL}/es/${page.slug}`;
  const enSlug = page.slug
    .replace("-minutos-a-decimales", "-minutes-in-decimal")
    .replace("-segundos-a-minutos", "-seconds-to-minutes");

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/${enSlug}`,
        es: url,
        "x-default": `${SITE_URL}/${enSlug}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "website",
    },
  };
}

export default function EsKeeperRoute({ params }: { params: { slug: string } }) {
  const page = buildEsKeeperPage(params.slug);
  if (!page) notFound();

  return (
    <article lang="es">
      <PageHeader title={page.h1} description={page.answerNote} />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode={page.converter.mode} defaults={page.converter.defaults} lang="es" />
        </div>

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

        <section className="mx-auto mt-10 max-w-3xl md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Preguntas frecuentes
          </h2>
        </section>
        <section className="mx-auto max-w-3xl space-y-6 md:mt-6">
          {page.faq.map((item) => (
            <div key={item.q} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
              <h3 className="mb-2 text-base font-semibold text-ink">{item.q}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </section>

        <RelatedLinks title="Relacionados" links={page.related} />

        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
            breadcrumbSchema(page.breadcrumb),
          ]}
        />
      </div>
    </article>
  );
}
