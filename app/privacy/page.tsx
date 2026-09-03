import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for minutestodecimal.org.",
  alternates: { canonical: "https://minutestodecimal.org/privacy" },
};

export default function Privacy() {
  return (
    <article>
      <h1 className="mb-4 text-3xl font-bold text-ink">Privacy Policy</h1>
      <p className="text-slate-700">
        minutestodecimal.org (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a free time-conversion tool. This page
        explains what data we handle.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-ink">Information we collect</h2>
      <p className="text-slate-700">
        The calculator runs entirely in your browser. We do not require an account and do not store the numbers you
        enter. We may use privacy-friendly analytics and advertising partners (such as Google AdSense) that collect
        standard anonymous data such as country, device type, and pages viewed.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-ink">Cookies and advertising</h2>
      <p className="text-slate-700">
        Third-party vendors, including Google, may use cookies to serve ads based on your prior visits. You can opt out
        of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" className="text-brand no-underline">
          Google Ads Settings
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold text-ink">Contact</h2>
      <p className="text-slate-700">
        Questions about this policy can be sent to the site administrator via the contact information published on the
        site.
      </p>
    </article>
  );
}
