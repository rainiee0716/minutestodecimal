type Props = {
  title: string;
  description?: string;
  className?: string;
};

export default function PageHeader({ title, description, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-hero-dark ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_30%,transparent_100%)]"
      />
      <div className="container relative mx-auto max-w-3xl pb-10 pt-10 text-center md:pb-12 md:pt-14">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-lg text-slate-300">{description}</p>}
      </div>
    </div>
  );
}
