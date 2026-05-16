import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Texas Property Help. Read the terms governing use of our homeowner assistance and referral platform.",
  alternates: pageAlternates("/terms-of-service", null),
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "January 15, 2025";

export default function TermsOfServicePage() {
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
            Terms of Service
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
              heading: "1. Acceptance of Terms",
              body: `By accessing or using the Texas Property Help platform at ${SITE_CONFIG.url} ("Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.`,
            },
            {
              heading: "2. Nature of the Service",
              body: `Texas Property Help is a homeowner information and referral platform. We provide general educational information about storm damage, roofing, HVAC, insurance claims, and repair financing, and we may connect you with third-party service providers. We are not a licensed contractor, insurance company, law firm, or financial institution. We do not provide legal advice, insurance advice, or professional contracting services.`,
            },
            {
              heading: "3. No Guarantees",
              body: `We do not guarantee the quality, performance, or availability of any third-party service provider we refer you to. We do not guarantee insurance claim approval, financing approval, or any specific outcome. All referrals are provided as a convenience; you are responsible for independently evaluating any service provider before engaging them.`,
            },
            {
              heading: "4. Information Accuracy",
              body: `We make reasonable efforts to keep the information on this Platform accurate and up to date. However, insurance regulations, contractor licensing requirements, financing terms, and legal requirements change. All information is provided for general informational purposes only. Verify any information with appropriate licensed professionals before making decisions.`,
            },
            {
              heading: "5. User Responsibilities",
              body: `You agree to provide accurate information when submitting help requests. You agree not to use the Platform for any unlawful purpose, to submit false or misleading information, or to engage in any activity that damages or disrupts the Platform. You are solely responsible for any decisions you make based on information obtained through the Platform.`,
            },
            {
              heading: "6. Third-Party Service Providers",
              body: `When we refer you to a third-party contractor, service provider, or other resource, that referral does not constitute an endorsement or guarantee. Your relationship with any third-party provider is governed by their own terms and agreements. Texas Property Help is not a party to any contract between you and a third-party provider.`,
            },
            {
              heading: "7. Limitation of Liability",
              body: `To the fullest extent permitted by applicable law, Texas Property Help, its operators, employees, and affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform or reliance on information provided herein. Our total liability for any claim arising from your use of the Platform shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.`,
            },
            {
              heading: "8. Texas Law",
              body: `These Terms of Service are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes arising from these Terms or use of the Platform shall be resolved in the courts of Travis County, Texas.`,
            },
            {
              heading: "9. Contractor Fraud Warning",
              body: `Texas law prohibits contractors from offering to waive your insurance deductible as an inducement to hire them. It is illegal for contractors to negotiate your insurance claim on your behalf without a licensed public adjuster designation. Verify all contractor licenses through the Texas Department of Licensing and Regulation (TDLR) at tdlr.texas.gov before signing any contracts.`,
            },
            {
              heading: "10. Changes to These Terms",
              body: `We reserve the right to modify these Terms at any time. Changes will be posted with an updated effective date. Continued use of the Platform after changes constitutes acceptance of the revised Terms.`,
            },
            {
              heading: "11. Contact",
              body: `Questions about these Terms? Contact us at ${SITE_CONFIG.email}.`,
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
