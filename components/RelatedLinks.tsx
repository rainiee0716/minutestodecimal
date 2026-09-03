type Props = {
  links: { href: string; label: string }[];
  title?: string;
};

export default function RelatedLinks({ links, title = "Related" }: Props) {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-slate-200 bg-white p-5 text-center text-sm shadow-card md:mt-14">
      <span className="mr-2 font-medium text-muted">{title}:</span>
      {links.map((link, i) => (
        <span key={link.href}>
          {i > 0 && <span className="mx-2 text-slate-300">·</span>}
          <a
            href={link.href}
            className="font-medium text-brand-600 no-underline transition-colors hover:text-brand-700"
          >
            {link.label}
          </a>
        </span>
      ))}
    </div>
  );
}
