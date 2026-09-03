import { FOOTER_COLS } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="container">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-white">minutestodecimal.org</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Free time-conversion tools for timesheets and payroll.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-white">{col.heading}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} minutestodecimal.org
        </div>
      </div>
    </footer>
  );
}
