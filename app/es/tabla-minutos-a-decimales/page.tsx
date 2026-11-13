import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import UnitConverter from "@/components/UnitConverter";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";
import ConversionTable from "@/components/ConversionTable";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ES_KEEPERS } from "@/lib/longtail-es";

// 西语 1–60 全量换算表：目标查询「minutos a decimales tabla」
export const metadata: Metadata = {
  title: { absolute: "Tabla de Minutos a Decimales (1–60) — Para Nómina" },
  description:
    "Tabla completa de minutos a decimales: cada minuto del 1 al 60 en horas decimales, con los valores clave (15 = 0.25, 30 = 0.50, 45 = 0.75). Conversor gratuito incluido.",
  alternates: {
    canonical: `${SITE_URL}/es/tabla-minutos-a-decimales`,
    languages: {
      en: `${SITE_URL}/minutes-to-decimal-chart`,
      es: `${SITE_URL}/es/tabla-minutos-a-decimales`,
      "x-default": `${SITE_URL}/minutes-to-decimal-chart`,
    },
  },
};

const TABLE_ROWS: [string, string][] = Array.from({ length: 60 }, (_, i) => {
  const minutes = i + 1;
  return [String(minutes), (minutes / 60).toFixed(2)];
});

const faq = [
  {
    q: "¿Cómo se usa la tabla de minutos a decimales?",
    a: "Busca los minutos trabajados en la columna izquierda y lee las horas decimales a la derecha: 15 min = 0.25, 30 min = 0.50, 45 min = 0.75. Ese número va en la columna de horas de tu hoja de tiempos.",
  },
  {
    q: "¿Por qué 60 minutos son 1.00?",
    a: "Una hora completa equivale a 1.00 en formato decimal. Cada minuto vale 1 ÷ 60 ≈ 0.0167, y la tabla acumula ese valor minuto a minuto.",
  },
  {
    q: "¿Qué valores conviene memorizar?",
    a: "Los cuatro cuartos: 15 min = 0.25, 30 min = 0.50, 45 min = 0.75 y 60 min = 1.00. Con ellos estimas de cabeza cualquier otro valor.",
  },
];

export default function EsTablaPage() {
  return (
    <article lang="es">
      <PageHeader
        title="Tabla de Minutos a Decimales (1–60)"
        description="Cada minuto del 1 al 60 en horas decimales, lista para nómina. Conversor gratuito incluido."
      />

      <div className="container pb-16">
        <div className="mx-auto max-w-5xl">
          <UnitConverter mode="minutesToHours" lang="es" />
        </div>

        <ProseSection title="Cómo leer la tabla">
          <p>
            La columna izquierda son los minutos trabajados; la derecha, las horas decimales que va
            en la hoja de tiempos. Los valores que más veces se buscan están marcados: 15 minutos
            son 0.25, 30 minutos son 0.50 y 45 minutos son 0.75 — los cuatro cuartos de hora que
            conviene memorizar.
          </p>
          <p>
            La regla detrás de toda la tabla: <strong>minutos ÷ 60 = horas decimales</strong>. Para
            sumar horas y minutos, convierte cada bloque por separado y súmalos al final.
          </p>
        </ProseSection>

        <section className="mx-auto mt-10 max-w-3xl md:mt-14">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
            Tabla completa: minutos a decimales (1–60)
          </h2>
          <ConversionTable fromHeader="Minutos" toHeader="Horas decimales" rows={TABLE_ROWS} />
        </section>

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
            { href: "/es", label: "Conversor de Minutos a Decimales" },
            { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart (English)" },
          ]}
        />

        <JsonLd
          data={[
            breadcrumbSchema([
              { name: "Inicio", path: "/es" },
              { name: "Tabla de Minutos a Decimales", path: "/es/tabla-minutos-a-decimales" },
            ]),
          ]}
        />
      </div>
    </article>
  );
}
