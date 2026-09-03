type Props = {
  title: string;
  description?: string;
  className?: string;
};

export default function PageHeader({ title, description, className = "" }: Props) {
  return (
    <div className={`container pt-10 md:pt-14 ${className}`}>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-lg text-muted">{description}</p>}
      </div>
    </div>
  );
}
