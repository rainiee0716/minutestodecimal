type FAQItem = { q: string; a: string };

type Props = {
  items: FAQItem[];
  title?: string;
};

export default function FAQList({ items, title = "Frequently asked questions" }: Props) {
  return (
    <section className="mt-10 md:mt-14">
      <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {title}
      </h2>
      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-slate-200 bg-white shadow-card"
          >
            <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4">
              <h3 className="text-base font-semibold text-ink">{item.q}</h3>
              <svg
                className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
