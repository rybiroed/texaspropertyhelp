import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Texas Property Help privacy policy. Learn how we collect, use, and protect the information you share when using our homeowner assistance platform.",
  alternates: pageAlternates("/privacy-policy", null),
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "January 15, 2025";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto" style={{ color: "#1a1a1a" }}>
          {[
            {
              heading: "1. Who We Are",
              body: `Texas Property Help ("we," "us," or "our") operates ${SITE_CONFIG.url}, a homeowner information and referral platform. We are not an insurance company, contractor, or law firm. Contact us at ${SITE_CONFIG.email}.`,
            },
            {
              heading: "2. Information We Collect",
              body: `When you submit a help request through our platform, we collect the information you provide, which may include your name, email address, phone number, property address, a description of your property issue, your preferred language, and your urgency level. We also collect standard server logs (IP address, browser type, referring page) for security and analytics purposes.`,
            },
            {
              heading: "3. How We Use Your Information",
              body: `We use the information you submit to match you with relevant service providers and resources in Texas, respond to your inquiry, improve our platform and content, and — if you opt in — send you relevant follow-up information. We do not sell your personal information to third parties. We may share your information with service providers who help us operate the platform (e.g., email delivery, analytics tools) under appropriate data processing agreements.`,
            },
            {
              heading: "4. Analytics",
              body: `We use Google Analytics (GA4) and Vercel Analytics to understand how visitors use our site. These tools collect anonymized usage data, including pages visited, session duration, and device type. Google Analytics data is processed in accordance with Google's privacy policy. Vercel Analytics does not use cookies and does not track individuals across sites.`,
            },
            {
              heading: "5. Cookies",
              body: `Our site uses minimal cookies. Google Analytics may set cookies to distinguish users and track sessions. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on. We do not use advertising cookies or cross-site tracking pixels.`,
            },
            {
              heading: "6. Your Rights (CCPA and General)",
              body: `If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA) including the right to know what personal information we collect, the right to delete personal information, and the right to opt out of the sale of personal information (we do not sell personal information). To exercise any of these rights, contact us at ${SITE_CONFIG.email}.`,
            },
            {
              heading: "7. Data Retention",
              body: `We retain submitted help request data for up to 24 months for the purpose of service improvement and to respond to follow-up inquiries. You may request deletion of your data at any time by contacting us.`,
            },
            {
              heading: "8. Children",
              body: `Our platform is not directed to individuals under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.`,
            },
            {
              heading: "9. Changes to This Policy",
              body: `We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. Continued use of the platform after changes constitutes acceptance of the updated policy.`,
            },
            {
              heading: "10. Contact",
              body: `For privacy-related questions or to exercise your data rights, contact us at ${SITE_CONFIG.email}.`,
            },
          ].map((section) => (
            <div key={section.heading} style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#000000",
                  marginBottom: "8px",
                }}
              >
                {section.heading}
              </h2>
              <p style={{ fontSize: "0.925rem", lineHeight: 1.8, color: "#333333" }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
