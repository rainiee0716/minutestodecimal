type Props = {
  fromHeader: string;
  toHeader: string;
  /** 三列表的中间列头（如秒→分钟→小时中的 “Minutes”）；不传则保持两列 */
  midHeader?: string;
  rows: [string, string, string?][];
  className?: string;
};

export default function ConversionTable({ fromHeader, toHeader, midHeader, rows, className = "" }: Props) {
  const hasMid = Boolean(midHeader);
  return (
    <div
      className={`mx-auto max-w-3xl overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card ${className}`}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-brand-800 via-brand-700 to-indigo-700 text-left text-xs font-semibold uppercase tracking-wider text-white/90">
            <th className="px-4 py-3">{fromHeader}</th>
            {hasMid && <th className="px-4 py-3">{midHeader}</th>}
            <th className="px-4 py-3 text-right">{toHeader}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([from, mid, to], i) => (
            <tr key={`${from}-${i}`} className="border-t border-slate-100 transition-colors odd:bg-slate-50/50 hover:bg-brand-50/60">
              <td className="px-4 py-2.5 text-slate-700">{from}</td>
              {hasMid && <td className="px-4 py-2.5 text-slate-700">{mid ?? ""}</td>}
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
