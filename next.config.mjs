/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // /embed 供第三方 iframe 引用，显式放行 framing（Vercel 默认不设 X-Frame-Options，这里明确声明）
        source: "/embed",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Consolidated near-duplicate "hours to decimal" pages (doorway cleanup, 2026-09-28)
      {
        source: "/convert-hours-to-decimal",
        destination: "/hours-to-decimal-calculator",
        permanent: true,
      },
      {
        source: "/minutes-to-decimal-hours-converter",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
