type Props = { children: string };

export default function Formula({ children }: Props) {
  return (
    <p className="mx-auto my-4 max-w-xl rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-center font-mono text-sm text-brand-700 md:text-base">
      {children}
    </p>
  );
}
