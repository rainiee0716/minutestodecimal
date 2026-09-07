import { HEADER_NAV, TOOL_CATEGORIES } from "@/lib/site";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 no-underline">
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 rounded-lg shadow-card"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#logo-g)" />
        <circle cx="16" cy="16" r="8.5" fill="none" stroke="#fff" strokeWidth="2" />
        <path
          d="M16 11.5V16l3.5 2"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-base font-semibold text-ink">
        minutestodecimal<span className="text-muted">.org</span>
      </span>
    </a>
  );
}

function Chevron() {
  return (
    <svg
      className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
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
  );
}

function ToolsDropdownPanel() {
  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white p-5 opacity-0 shadow-card-hover transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
      <div className="grid gap-5 sm:grid-cols-2">
        {TOOL_CATEGORIES.map((category) => (
          <div key={category.heading}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {category.heading}
            </p>
            <ul className="mt-2 space-y-1.5">
              {category.links.map((tool) => (
                <li key={tool.href}>
                  <a
                    href={tool.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 no-underline transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {tool.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <a
          href="/tools"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 no-underline transition-colors hover:text-brand-700"
        >
          View all tools
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  return (
    <header className="z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur md:sticky md:top-0">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop navigation with hover/focus dropdown */}
          <nav
            className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex"
            aria-label="Primary"
          >
            <div className="group relative">
              <a
                href="/tools"
                className="inline-flex items-center gap-1 no-underline transition-colors hover:text-brand-600"
              >
                Tools
                <Chevron />
              </a>
              <ToolsDropdownPanel />
            </div>

            {HEADER_NAV.filter((item) => item.href !== "/tools").map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="no-underline transition-colors hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile navigation with a native disclosure menu */}
        <nav className="pb-3 text-sm font-medium text-slate-600 md:hidden" aria-label="Primary mobile">
          <details className="group rounded-xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink">
              Tools
              <svg
                className="h-4 w-4 text-muted transition-transform group-open:rotate-180"
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

            <div className="space-y-4 border-t border-slate-100 p-4">
              {TOOL_CATEGORIES.map((category) => (
                <div key={category.heading}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {category.heading}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {category.links.map((tool) => (
                      <li key={tool.href}>
                        <a
                          href={tool.href}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 no-underline transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          {tool.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <a
                href="/tools"
                className="block rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 no-underline"
              >
                View all tools
              </a>
            </div>
          </details>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {HEADER_NAV.filter((item) => item.href !== "/tools").map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="no-underline hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
