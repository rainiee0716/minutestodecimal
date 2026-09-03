import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for minutestodecimal.org.",
  alternates: { canonical: "https://www.minutestodecimal.org/privacy" },
};

export default function Privacy() {
  return (
    <article>
      <PageHeader title="Privacy Policy" />

      <div className="container pb-16">
        <ProseSection title="Information we collect">
          <p>
            minutestodecimal.org (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a free
            time-conversion tool. This page explains what data we handle.
          </p>
          <p>
            The calculator runs entirely in your browser. We do not require an account and do not
            store the numbers you enter. We may use privacy-friendly analytics and advertising
            partners (such as Google AdSense) that collect standard anonymous data such as country,
            device type, and pages viewed.
          </p>
        </ProseSection>

        <ProseSection title="Cookies and advertising">
          <p>
            Third-party vendors, including Google, may use cookies to serve ads based on your prior
            visits. You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="font-medium text-brand-600 no-underline transition-colors hover:text-brand-700"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </ProseSection>

        <ProseSection title="Contact">
          <p>
            Questions about this policy can be sent to the site administrator via the contact
            information published on the site.
          </p>
        </ProseSection>
      </div>
    </article>
  );
}
