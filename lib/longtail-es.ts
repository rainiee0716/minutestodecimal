// 西语 keeper 页数据工厂：与英文版同构（H1/FAQ/表格/内链），内容由本文件手工维护。
// URL 用西语 slug（对齐 Google autocomplete 证据：minutos a decimales / segundos a minutos）。
// 小数点用句点（墨西哥约定，与工具显示一致）。
import type { ConverterMode } from "@/components/UnitConverter";
import type { LongtailPage } from "@/lib/longtail";

const dec4 = (v: number): string =>
  Number(v.toFixed(4)).toLocaleString("en-US", { maximumFractionDigits: 4 });

const div60 = (n: number): string => dec4(n / 60);

const fmtInt = (n: number): string => n.toLocaleString("en-US");

export type EsKeeperPage = { slug: string; page: LongtailPage };

/* ---------------- N minutos a decimales ---------------- */

export function minutesPageEs(n: number): EsKeeperPage {
  const dec = div60(n);
  const h = Math.floor(n / 60);
  const m = n % 60;
  const clock = n >= 60 ? `${h} h ${m} min` : `${n} minutos`;
  const pay = (n / 60) * 20;
  const nearby = [n - 10, n - 5, n, n + 5, n + 10].filter((v) => v >= 1 && v <= 600);

  const page: LongtailPage = {
    slug: `${n}-minutos-a-decimales`,
    family: "minutesInDecimal",
    h1: `${n} Minutos a Decimales`,
    title: `${n} Minutos a Decimales = ${dec} Horas Decimales`,
    description: `${n} minutos equivalen a ${dec} horas decimales (${n} ÷ 60). Conversor gratuito, fórmula, ejemplos de nómina y tabla de valores cercanos.`,
    answerValue: dec,
    answerSub: "horas decimales",
    answerNote: `${n} minutos = ${dec} horas decimales (${n} ÷ 60)`,
    formula: `${n} minutos ÷ 60 = ${dec} horas decimales`,
    converter: { mode: "minutesToHours", defaults: { m: String(n) } },
    prose: [
      {
        title: `Cómo convertir ${n} minutos a decimales`,
        paras: [
          "Cada hora tiene 60 minutos, así que la conversión es una sola división:",
          `${n} ÷ 60 = ${dec} horas decimales. El conversor de arriba ya viene con ${n} escrito: cambia la cifra para comprobar cualquier otro valor sin salir de esta página.`,
        ],
      },
      {
        title: `${n} minutos en una hoja de tiempos`,
        paras: [
          `Escribe ${dec} en la columna de horas: es el número que multiplica tu tarifa. Con $20 por hora, ese bloque paga $${pay.toFixed(2)}. Los cuatro puntos que conviene memorizar son 15 min = 0.25, 30 min = 0.50, 45 min = 0.75 y 60 min = 1.00 — con ellos estimas cualquier otro valor de cabeza.`,
        ],
      },
      {
        title: "Del reloj a la nómina",
        paras: [
          `El reloj marca ${n} minutos; la nómina quiere ${dec} horas decimales. Es el mismo lapso escrito de dos formas: la primera para las personas, la segunda para la hoja de cálculo que multiplica por tu tarifa. Ninguna regla cambia de un país a otro: la división entre 60 es universal.`,
        ],
      },
    ],
    tableTitle: `${n} minutos a decimales — valores cercanos`,
    tableFrom: "Minutos",
    tableTo: "Horas decimales",
    tableRows: nearby.map((v) => [`${v} min`, div60(v)] as [string, string]),
    faq: [
      {
        q: `¿Cuánto son ${n} minutos en decimales?`,
        a: `${n} ÷ 60 = ${dec} horas decimales. Los puntos de referencia son 15 min = 0.25, 30 min = 0.50 y 45 min = 0.75.`,
      },
      {
        q: `¿Cómo se escriben ${n} minutos en una hoja de tiempos?`,
        a: `Escribe ${dec} en la columna de horas. Es el valor que multiplica tu tarifa por hora para calcular el pago de ese bloque.`,
      },
      {
        q: `${n} minutos son ${h} horas ${m} minutos`,
        a: `Sí. En el reloj son ${clock}; en formato decimal, ${dec} horas. Misma duración, dos formas de escribirla.`,
      },
      {
        q: `¿Cuánto es ${n} minutos en horas y minutos de reloj?`,
        a: `${n} minutos equivalen a ${clock}. Para la nómina conviértelos a decimales: ${n} ÷ 60 = ${dec}.`,
      },
    ],
    related: [
      { href: "/es", label: "Conversor de Minutos a Decimales" },
      { href: "/es/tabla-minutos-a-decimales", label: "Tabla de Minutos a Decimales (1–60)" },
      { href: "/", label: "Minutes to Decimal Converter (English)" },
    ],
    breadcrumb: [
      { name: "Inicio", path: "/es" },
      { name: `${n} Minutos a Decimales`, path: `/es/${n}-minutos-a-decimales` },
    ],
  };
  return { slug: page.slug, page };
}

/* ---------------- N segundos a minutos ---------------- */

export function secondsPageEs(n: number): EsKeeperPage {
  const dec = div60(n);
  const mm = Math.floor(n / 60);
  const ss = n % 60;
  const hours = dec4(n / 3600);
  const nearby = [n - 30, n - 15, n, n + 15, n + 30].filter((v) => v >= 1 && v <= 7200);

  const page: LongtailPage = {
    slug: `${n}-segundos-a-minutos`,
    family: "secondsToMinutes",
    h1: `${n} Segundos a Minutos`,
    title: `${n} Segundos a Minutos = ${dec} Minutos`,
    description: `${n} segundos equivalen a ${dec} minutos (${mm} min ${ss} s). Conversor gratuito, fórmula y ejemplos con cronómetros y videos.`,
    answerValue: dec,
    answerSub: "minutos",
    answerNote: `${n} segundos = ${dec} minutos (${mm} min ${ss} s)`,
    formula: `${n} segundos ÷ 60 = ${dec} minutos`,
    converter: { mode: "secondsToMinutes", defaults: { s: String(n) } },
    prose: [
      {
        title: `Cómo convertir ${n} segundos a minutos`,
        paras: [
          "Un minuto tiene 60 segundos, así que la conversión es una división:",
          `${n} ÷ 60 = ${dec} minutos. El conversor de arriba empieza en ${n}: escribe cualquier otra cifra para comprobarla al instante.`,
        ],
      },
      {
        title: `${n} segundos en la vida real`,
        paras: [
          `Los temporales de intervalos, los videos y los cronómetros cuentan en segundos; sumar y registrar se hace en minutos. ${n} segundos son ${mm} minutos ${ss} segundos en el reloj y ${dec} minutos decimales en la hoja de cálculo. Si necesitas horas, divide otra vez entre 60: ${n} segundos son ${hours} horas decimales.`,
        ],
      },
    ],
    tableTitle: `${n} segundos a minutos — valores cercanos`,
    tableFrom: "Segundos",
    tableTo: "Minutos",
    tableRows: nearby.map((v) => [`${fmtInt(v)} s`, div60(v)] as [string, string]),
    faq: [
      {
        q: `¿Cuántos minutos son ${n} segundos?`,
        a: `${n} ÷ 60 = ${dec} minutos, es decir ${mm} minutos ${ss} segundos.`,
      },
      {
        q: `¿Cómo se convierten ${n} segundos a minutos?`,
        a: `Divide entre 60: ${n} ÷ 60 = ${dec} minutos. Si el resultado supera 60, divide otra vez entre 60 para obtener horas.`,
      },
      {
        q: `¿Cuántas horas son ${n} segundos?`,
        a: `${n} ÷ 3,600 = ${hours} horas decimales.`,
      },
      {
        q: `${n} segundos son ${mm} minutos y ${ss} segundos`,
        a: `Sí. En el reloj son ${mm}:${String(ss).padStart(2, "0")}; en formato decimal, ${dec} minutos.`,
      },
    ],
    related: [
      { href: "/es", label: "Conversor de Minutos a Decimales" },
      { href: "/es/tabla-minutos-a-decimales", label: "Tabla de Minutos a Decimales (1–60)" },
      { href: "/", label: "Minutes to Decimal Converter (English)" },
    ],
    breadcrumb: [
      { name: "Inicio", path: "/es" },
      { name: `${n} Segundos a Minutos`, path: `/es/${n}-segundos-a-minutos` },
    ],
  };
  return { slug: page.slug, page };
}

/* ---------------- 首批西语 keeper 清单 ---------------- */

export const ES_KEEPERS: EsKeeperPage[] = [
  minutesPageEs(20),
  minutesPageEs(45),
  minutesPageEs(10),
  minutesPageEs(30),
  secondsPageEs(90),
  secondsPageEs(600),
];

export function buildEsKeeperPage(slug: string): LongtailPage | null {
  const hit = ES_KEEPERS.find((k) => k.slug === slug);
  return hit ? hit.page : null;
}

export function allEsKeeperSlugs(): string[] {
  return ES_KEEPERS.map((k) => k.slug);
}
