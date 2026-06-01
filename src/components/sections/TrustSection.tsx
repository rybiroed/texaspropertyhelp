export default function TrustSection() {
  const stats = [
    { number: "9+", label: "Months Serving Texas Homeowners" },
    { number: "Free", label: "To Submit Your Request" },
    { number: "5", label: "Major Texas Cities Covered" },
    { number: "24/7", label: "Storm Monitoring Active" },
  ];

  const steps = [
    {
      number: "01",
      icon: "📝",
      title: "Submit Your Request",
      body: "Tell us about your property issue — storm damage, roofing, HVAC, or insurance claim. Takes 2 minutes.",
      color: "#76b900",
    },
    {
      number: "02",
      icon: "🔍",
      title: "We Review & Match",
      body: "Our team reviews your request and matches you with vetted local contractors in your area.",
      color: "#0ea5e9",
    },
    {
      number: "03",
      icon: "🤝",
      title: "Get Connected",
      body: "A qualified professional contacts you directly. You choose who to work with — no pressure.",
      color: "#f59e0b",
    },
    {
      number: "04",
      icon: "🏠",
      title: "Problem Solved",
      body: "Your property gets the attention it needs. We follow up to make sure everything went well.",
      color: "#10b981",
    },
  ];

  return (
    <>
      {/* Stats band */}
      <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 900, color: "#76b900", lineHeight: 1, marginBottom: "6px" }}>
                  {s.number}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 600, lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
              Simple Process
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, marginBottom: "12px" }}>
              How Texas Property Help Works
            </h2>
            <p style={{ color: "#6b7280", maxWidth: "480px", margin: "0 auto", fontSize: "0.95rem" }}>
              From your first request to a resolved property issue — here&apos;s the process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "28px 22px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                position: "relative",
                borderTop: `3px solid ${step.color}`,
              }}>
                <div style={{
                  fontSize: "2rem",
                  marginBottom: "12px",
                  width: "52px",
                  height: "52px",
                  backgroundColor: `${step.color}18`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {step.icon}
                </div>
                <div style={{ color: step.color, fontWeight: 900, fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  STEP {step.number}
                </div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p style={{ textAlign: "center", marginTop: "32px", color: "#9ca3af", fontSize: "0.8rem" }}>
            Texas Property Help is a homeowner assistance and referral platform — not an insurance company, contractor, or law firm.
          </p>
        </div>
      </section>
    </>
  );
}
