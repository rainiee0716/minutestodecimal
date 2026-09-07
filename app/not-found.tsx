const POPULAR_LINKS = [
  { href: "/", label: "Minutes to Decimal Converter" },
  { href: "/time-to-decimal-calculator", label: "Time to Decimal Calculator" },
  { href: "/hours-to-decimal-calculator", label: "Hours to Decimal Calculator" },
  { href: "/minutes-to-decimal-chart", label: "Minutes to Decimal Chart" },
  { href: "/guides", label: "Timesheet Guides" },
];

export default function NotFound() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-card">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          404 — Page not found
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          We couldn’t find that page
        </h1>
        <p className="mt-4 text-base text-muted">
          The link may be old, or the page may have moved. Try one of the popular tools below.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {POPULAR_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-ink no-underline transition-colors hover:border-brand-300 hover:bg-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
