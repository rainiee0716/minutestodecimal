import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProseSection from "@/components/ProseSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for minutestodecimal.org.",
  alternates: { canonical: "https://www.minutestodecimal.org/privacy" },
};

const linkClass = "font-medium text-brand-600 no-underline transition-colors hover:text-brand-700";

export default function Privacy() {
  return (
    <article>
      <PageHeader title="Privacy Policy" />

      <div className="container pb-16">
        <ProseSection title="Overview">
          <p>
            minutestodecimal.org (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;this site&rdquo;)
            provides free time-conversion tools. This policy explains what information we and our
            service providers collect when you visit, how it is used, and the choices you have.
            It applies to every page on this site.
          </p>
          <p>
            <em>Last updated: September 4, 2026.</em> If we change this policy, we will update the
            date above.
          </p>
        </ProseSection>

        <ProseSection title="Information we collect">
          <p>
            <strong>Calculator input stays on your device.</strong> Every converter on this site
            runs entirely in your browser. The numbers you type are processed by JavaScript on your
            own device and are never transmitted to us or to any third party. We do not require an
            account and do not store the values you enter.
          </p>
          <p>
            <strong>Server logs.</strong> Like nearly every website, our hosting provider
            automatically records basic technical information for each request: your IP address,
            browser type and version, device type, operating system, referring page, the pages you
            request, and the date and time of the request. These logs exist to operate and secure
            the site and are retained by our hosting provider for a limited period.
          </p>
          <p>
            <strong>Aggregate statistics.</strong> We may use privacy-friendly analytics that
            report anonymized, aggregate usage data such as country, device type, and pages
            viewed. This data cannot reasonably be used to identify you.
          </p>
        </ProseSection>

        <ProseSection title="Cookies and web beacons">
          <p>
            This site itself does not set any cookies. However, third-party vendors, including
            Google, may use cookies and web beacons (small graphic files, also called pixels) to
            serve ads based on your prior visits to this or other websites. Cookies are small text
            files stored on your device; web beacons are used to track whether a page or
            advertisement was viewed.
          </p>
          <p>
            Google&rsquo;s use of advertising cookies (including the DoubleClick cookie) enables it
            and its partners to serve ads to you based on your visit to this site and/or other
            sites on the Internet. You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" className={linkClass}>
              Google Ads Settings
            </a>
            , or opt out of third-party vendor cookies generally at{" "}
            <a href="https://www.aboutads.info/choices/" className={linkClass}>
              www.aboutads.info/choices
            </a>{" "}
            or{" "}
            <a href="https://www.youronlinechoices.eu/" className={linkClass}>
              www.youronlinechoices.eu
            </a>
            .
          </p>
          <p>
            If required by law in your region, we will ask for your consent before advertising
            cookies are set, through a consent banner presented on your first visit.
          </p>
        </ProseSection>

        <ProseSection title="Google AdSense and advertising">
          <p>
            This site is supported by advertising. We may use Google AdSense and other advertising
            partners to display ads. Third-party vendors, including Google, use cookies and web
            beacons to serve ads based on your prior visits to this website or other websites.
          </p>
          <p>
            Where required (for example, for visitors in the European Economic Area, the United
            Kingdom, and Switzerland), personalized advertising and certain measurement cookies are
            only used after you give consent. If you decline, you will still see non-personalized
            ads, and the tools on this site will continue to work normally.
          </p>
        </ProseSection>

        <ProseSection title="Your rights — EEA and United Kingdom (GDPR)">
          <p>
            If you are located in the European Economic Area or the United Kingdom, you have the
            right under the General Data Protection Regulation (GDPR) to: access the personal data
            we hold about you; have inaccurate data corrected; have your personal data erased;
            restrict or object to processing; receive your data in a portable format; and withdraw
            consent at any time for processing based on consent (such as advertising cookies),
            without affecting the lawfulness of processing based on consent before its withdrawal.
          </p>
          <p>
            Our legal bases for processing are: legitimate interest (operating and securing the
            site via server logs), and consent (advertising and measurement cookies, where
            applicable). You also have the right to lodge a complaint with your local data
            protection authority.
          </p>
          <p>
            To exercise any of these rights, email us at the address in the Contact section below.
            Because the calculators run locally and we do not maintain user accounts, we typically
            hold no personal data about you beyond short-lived server logs.
          </p>
        </ProseSection>

        <ProseSection title="Your rights — California (CCPA/CPRA)">
          <p>
            If you are a California resident, the California Consumer Privacy Act, as amended by
            the California Privacy Rights Act, gives you the right to know what personal
            information is collected about you, to request deletion of your personal information,
            and to not be discriminated against for exercising these rights. We do not sell or
            share personal information as those terms are defined by California law. To make a
            request, email us at the address below.
          </p>
        </ProseSection>

        <ProseSection title="Children">
          <p>
            This site is directed at adults in a workplace context and is not directed at children
            under 13. We do not knowingly collect personal information from children under 13. If
            you believe a child has provided us personal information, email us and we will delete
            it.
          </p>
        </ProseSection>

        <ProseSection title="Data retention and security">
          <p>
            Calculator input is never stored, so there is nothing to retain. Server logs are kept
            by our hosting provider only as long as needed for security and operational purposes.
            We use HTTPS across the entire site to protect data in transit.
          </p>
        </ProseSection>

        <ProseSection title="Contact">
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:rainiee0716@gmail.com" className={linkClass}>
              rainiee0716@gmail.com
            </a>
            . We read every message and will respond where a response is required by law or
            reasonably warranted.
          </p>
        </ProseSection>
      </div>
    </article>
  );
}
