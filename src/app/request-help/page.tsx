import type { Metadata } from "next";
import LeadForm from "@/components/sections/LeadForm";
import DisclaimerBox from "@/components/sections/DisclaimerBox";

export const metadata: Metadata = {
  title: "Request Property Help",
  description:
    "Submit your Texas property help request. Tell us about your situation — storm damage, roofing, HVAC, insurance, or financing — and we'll connect you with the right resources.",
  robots: { index: true, follow: true },
};

export default function RequestHelpPage() {
  return (
    <>
      {/* Header */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Get Connected
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Request Property Help
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7 }}>
            Tell us about your property situation. We&apos;ll review your information and connect you with appropriate resources — at no cost to explore.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section style={{ backgroundColor: "var(--off-white)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Trust bar */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px 24px",
              marginBottom: "32px",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {[
              { icon: "🔒", label: "Secure Form" },
              { icon: "🤝", label: "Free to Submit" },
              { icon: "🇪🇸", label: "En Español También" },
              { icon: "📞", label: "We Review Every Request" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* The form */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "32px",
            }}
          >
            <LeadForm pageSource="request-help-page" />
          </div>

          <DisclaimerBox type="general" />

          {/* What happens next */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "24px",
              marginTop: "24px",
            }}
          >
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px" }}>
              What Happens After You Submit
            </h3>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "steps" }}>
              {[
                "We review your request to understand your situation.",
                "We identify relevant resources and service providers in your area.",
                "A team member follows up to connect you with appropriate help.",
                "You decide what steps, if any, to take from there.",
              ].map((step, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    paddingBottom: "14px",
                    marginBottom: "14px",
                    borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: "var(--navy)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
