import { HEADER_NAV } from "@/lib/site";

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

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            {HEADER_NAV.map((item) => (
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
        {/* Mobile nav: wraps to a second row, no JS needed */}
        <nav className="flex flex-wrap gap-x-5 gap-y-1 pb-3 text-sm font-medium text-slate-600 md:hidden">
          {HEADER_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="no-underline hover:text-brand-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
