/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
