import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import UnitConverter from "@/components/UnitConverter";
import PageHeader from "@/components/PageHeader";
import ConversionTable from "@/components/ConversionTable";
import ProseSection from "@/components/ProseSection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ES_KEEPERS } from "@/lib/longtail-es";

// 西语首页：主查询「minutos a decimales」的承接页
export const metadata: Metadata = {
  title: { absolute: "Minutos a Decimales — Conversor Gratuito de Nómina" },
  description:
    "Convierte minutos y horas a decimales gratis: 15 min = 0.25, 30 min = 0.50, 45 min = 0.75. Conversor de nómina sin registro, todo en tu navegador.",
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      en: SITE_URL,
      es: `${SITE_URL}/es`,
      "x-default": SITE_URL,
    },
  },
};

const QUICK_REF: [string, string][] = [
  ["5 min", "0.08"],
  ["10 min", "0.17"],
  ["15 min", "0.25"],
  ["20 min", "0.33"],
  ["30 min", "0.50"],
  ["45 min", "0.75"],
  ["60 min", "1.00"],
];

const faq = [
  {
    q: "¿Cómo se convierten los minutos a decimales?",
    a: "Divide los minutos entre 60 y súmalos a las horas: 7 h 45 min = 7 + (45 ÷ 60) = 7.75 horas decimales. Es la fórmula que usa la nómina.",
  },
  {
    q: "¿Cuánto son 30 minutos en decimales?",
    a: "30 ÷ 60 = 0.50 horas decimales. Los puntos clave: 15 min = 0.25, 30 min = 0.50, 45 min = 0.75 y 60 min = 1.00.",
  },
  {
    q: "¿Por qué la nómina usa horas decimales?",
    a: "Porque multiplicar el sueldo requiere un solo número por día: 7.75 horas × tarifa. Con horas y minutos la multiplicación no funciona directo.",
  },
  {
    q: "¿Es gratis el conversor?",
    a: "Sí. Todos los conversores del sitio son gratuitos y sin registro: todo corre en tu navegador y nada se envía a un servidor.",
  },
  {
    q: "¿Funciona igual en Google Sheets o Excel?",
    a: "En las hojas de cálculo el tiempo se guarda como fracción de un día, así que la fórmula es multiplicar por 24: =A1*24. Véase la guía completa en la sección de guías.",
  },
];

export default function EsHomePage() {
  return (
    <article lang="es">
      <PageHeader
        title="Minutos a Decimales — Conversor Gratuito"
        description="Convierte horas y minutos a formato decimal para tu nómina. Instantáneo, sin registro."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="minutesToHours" lang="es" />
        </div>

        <ProseSection title="Cómo se convierten los minutos a decimales">
          <p>
            La nómina calcula el sueldo con un solo número por día, por eso los minutos se
            convierten a decimales. La fórmula no cambia nunca:
          </p>
          <p className="text-lg font-medium text-ink">
            horas decimales = horas + (minutos ÷ 60)
          </p>
          <p>
            Ejemplo: 7 h 45 min = 7 + (45 ÷ 60) = <strong>7.75</strong> — no 7.45, que es el error
            más común al escribir una hoja de tiempos a mano.
          </p>
        </ProseSection>

        <section className="mx-auto mt-10 max-w-3xl md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Referencia rápida de minutos a decimales
          </h2>
          <ConversionTable fromHeader="Tiempo" toHeader="Horas decimales" rows={QUICK_REF} />
        </section>

        <ProseSection title="Los cuatro puntos que lo resuelven todo">
          <p>
            15 min = 0.25 · 30 min = 0.50 · 45 min = 0.75 · 60 min = 1.00. Con esos cuatro puntos
            estimas cualquier otro valor: 20 minutos es un tercio de hora (0.33), 10 minutos es un
            sexto (0.17). Para la tabla completa minuto a minuto, ve a la{" "}
            <a href="/es/tabla-minutos-a-decimales" className="font-medium text-brand-600 hover:text-brand-700">
              tabla de minutos a decimales
            </a>
            .
          </p>
        </ProseSection>

        <section className="mx-auto mt-10 max-w-3xl md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Preguntas frecuentes
          </h2>
        </section>
        <section className="mx-auto max-w-3xl space-y-6 md:mt-6">
          {faq.map((item) => (
            <div key={item.q} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
              <h3 className="mb-2 text-base font-semibold text-ink">{item.q}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </section>

        <RelatedLinks
          title="Conversores específicos"
          links={[
            ...ES_KEEPERS.map((k) => ({ href: `/es/${k.slug}`, label: k.page.h1 })),
            { href: "/es/tabla-minutos-a-decimales", label: "Tabla completa (1–60)" },
            { href: "/", label: "Minutes to Decimal Converter (English)" },
          ]}
        />

        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Conversor de Minutos a Decimales",
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
            breadcrumbSchema([{ name: "Inicio", path: "/es" }]),
          ]}
        />
      </div>
    </article>
  );
}
