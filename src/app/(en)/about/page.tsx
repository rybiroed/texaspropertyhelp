import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Texas Property Help",
  description:
    "Learn about Texas Property Help — a homeowner assistance and referral platform connecting Texas homeowners with resources for storm damage, roofing, HVAC, insurance claims, and repair financing.",
  alternates: pageAlternates("/about", null),
};

const values = [
  {
    icon: "🏠",
    heading: "Homeowner-First",
    body: "Everything we do is designed to help Texas homeowners understand their options and connect with the right resources — not to sell them something.",
  },
  {
    icon: "📋",
    heading: "Straightforward Information",
    body: "We provide clear, practical guidance on storm damage, insurance claims, roofing, HVAC, and repair financing — without jargon or pressure.",
  },
  {
    icon: "🤝",
    heading: "Referral, Not Sales",
    body: "Texas Property Help is a referral and assistance platform. We connect homeowners with resources; we do not employ contractors or sell insurance.",
  },
  {
    icon: "⚖️",
    heading: "Honest About Our Limits",
    body: "We are not a law firm, insurance company, or licensed contractor. We make that clear on every page because your protection depends on knowing the difference.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            About
          </p>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            About Texas Property Help
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: "580px",
            }}
          >
            Texas Property Help is a homeowner assistance and referral platform. We help Texas
            homeowners understand their options after property damage, navigate insurance claims,
            and connect with relevant service providers.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: "#0a0a0a" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Our Mission
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.975rem" }}>
            Texas weather is unforgiving. Hailstorms, hurricanes, extreme heat, and sudden freezes
            leave homeowners facing urgent, expensive repairs — often while also dealing with
            insurance adjusters, contractor estimates, and financing decisions they were not
            prepared for. Texas Property Help exists to make that process less overwhelming.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.975rem",
              marginTop: "16px",
            }}
          >
            We serve homeowners across Texas, including{" "}
            {SITE_CONFIG.serviceAreas.slice(0, 6).join(", ")}, and surrounding communities. Our
            guides, checklists, and referral assistance are free for homeowners to use.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "#000000" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "32px",
            }}
          >
            How We Operate
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.heading}>
                <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{v.icon}</div>
                <h3
                  style={{
                    color: "var(--accent)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    marginBottom: "8px",
                  }}
                >
                  {v.heading}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ backgroundColor: "#0a0a0a" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div
            style={{
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "24px",
              backgroundColor: "#111",
            }}
          >
            <h3
              style={{
                color: "var(--accent)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "12px",
              }}
            >
              Important Disclaimer
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.75 }}>
              Texas Property Help is a homeowner information and referral platform. We are{" "}
              <strong style={{ color: "white" }}>not</strong> an insurance company, licensed
              contractor, law firm, or financial institution. We do not guarantee insurance claim
              outcomes, contractor quality, or financing approval. All information provided is for
              general educational purposes only and should not be construed as legal, financial,
              or professional advice. Always verify contractor licenses through the{" "}
              <a
                href="https://www.tdlr.texas.gov"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                Texas Department of Licensing and Regulation
              </a>{" "}
              and consult your insurance policy or a licensed professional for advice specific to
              your situation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#000000" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>
            Ready to Get Help?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.925rem",
              marginBottom: "24px",
              lineHeight: 1.7,
            }}
          >
            Submit a request and we&apos;ll help identify the right resources for your property
            situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/request-help"
              style={{
                display: "inline-block",
                backgroundColor: "var(--accent)",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "14px 28px",
                borderRadius: "4px",
              }}
              className="hover:opacity-90"
            >
              Request Help →
            </Link>
            <Link
              href="/guides"
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: "var(--accent)",
                fontWeight: 600,
                fontSize: "0.95rem",
                padding: "14px 28px",
                borderRadius: "4px",
                border: "1px solid var(--accent)",
              }}
              className="hover:opacity-80"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
