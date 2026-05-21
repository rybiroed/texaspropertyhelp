import type { Metadata } from "next";
import ContractorForm from "@/components/sections/ContractorForm";

export const metadata: Metadata = {
  title: "For Professionals | Texas Property Help",
  description:
    "Contractors and trade professionals: apply to receive homeowner repair leads from Texas Property Help. Roofing, HVAC, storm damage, insurance claims, and more.",
  robots: { index: true, follow: true },
};

const LEAD_TYPES = [
  { icon: "🏠", label: "Roofing repairs and replacements" },
  { icon: "❄️", label: "HVAC repair and replacement" },
  { icon: "⛈️", label: "Storm and hail damage" },
  { icon: "📋", label: "Insurance claim assistance" },
  { icon: "🔧", label: "General property repair" },
];

export default function ForProfessionalsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: "12px",
            }}
          >
            Trade Professionals
          </p>
          <h1
            style={{
              color: "white",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Receive Homeowner Repair Leads in Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7 }}>
            Texas Property Help connects homeowners with qualified contractors. Apply below and we will contact you when leads match your service area and trade.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            style={{
              color: "var(--heading-primary)",
              fontFamily: "Georgia, serif",
              fontSize: "1.375rem",
              fontWeight: 800,
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              color: "var(--content-secondary)",
              fontSize: "0.9375rem",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            We are a referral and intake platform — not a contractor, insurer, or lender.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ marginBottom: "40px" }}>
            {[
              {
                step: "1",
                heading: "Homeowner submits a request",
                body: "Homeowners describe their property repair need — roofing, HVAC, storm damage, insurance claim guidance, or general repairs.",
              },
              {
                step: "2",
                heading: "We review and match",
                body: "We review each request and match it to approved contractors based on trade, service area, and availability.",
              },
              {
                step: "3",
                heading: "You receive the lead",
                body: "Matched contractors receive the homeowner's contact details. You follow up directly — we do not manage the job or the relationship.",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  backgroundColor: "var(--content-bg-subtle)",
                  border: "1px solid var(--content-border)",
                  borderRadius: "10px",
                  padding: "24px 20px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--navy)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    color: "var(--content-primary)",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    marginBottom: "8px",
                  }}
                >
                  {item.heading}
                </h3>
                <p style={{ color: "var(--content-secondary)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Lead types */}
          <div
            style={{
              backgroundColor: "var(--content-bg-subtle)",
              border: "1px solid var(--content-border)",
              borderRadius: "10px",
              padding: "24px 28px",
            }}
          >
            <h3
              style={{
                color: "var(--content-primary)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                marginBottom: "16px",
              }}
            >
              Types of Leads We Send
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {LEAD_TYPES.map((item) => (
                <li
                  key={item.label}
                  style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9375rem", color: "var(--content-secondary)" }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              border: "1px solid var(--content-border)",
              borderRadius: "8px",
              padding: "16px 20px",
              marginTop: "24px",
              backgroundColor: "white",
            }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--content-muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              <strong style={{ color: "var(--content-secondary)" }}>Platform disclosure:</strong> Texas Property Help is a referral and intake service only. We are not a licensed contractor, insurance company, or lender. We do not guarantee lead volume or exclusivity. Approved contractors are responsible for their own licensing, insurance, and compliance with Texas law.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section style={{ backgroundColor: "var(--off-white)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                color: "var(--heading-primary)",
                fontFamily: "Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "8px",
              }}
            >
              Apply to Receive Leads
            </h2>
            <p style={{ color: "var(--content-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
              Fill out the form below. We review every application before sending any leads.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "32px",
            }}
          >
            <ContractorForm />
          </div>
        </div>
      </section>
    </>
  );
}
