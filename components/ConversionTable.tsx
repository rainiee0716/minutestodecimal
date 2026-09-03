type Props = {
  fromHeader: string;
  toHeader: string;
  rows: [string, string][];
  className?: string;
};

export default function ConversionTable({ fromHeader, toHeader, rows, className = "" }: Props) {
  return (
    <div
      className={`mx-auto max-w-3xl overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card ${className}`}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-muted">
            <th className="px-4 py-3">{fromHeader}</th>
            <th className="px-4 py-3 text-right">{toHeader}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([from, to]) => (
            <tr key={from} className="border-t border-slate-100 odd:bg-slate-50/50">
              <td className="px-4 py-2.5 text-slate-700">{from}</td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-brand-700">
                {to}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
