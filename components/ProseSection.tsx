import type { ReactNode } from "react";

type Props = {
  title: string;
  className?: string;
  children: ReactNode;
};

export default function ProseSection({ title, className = "", children }: Props) {
  return (
    <section className={`mx-auto mt-10 max-w-3xl md:mt-14 ${className}`}>
      <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-slate-600 [&>p]:leading-relaxed">{children}</div>
    </section>
  );
}
