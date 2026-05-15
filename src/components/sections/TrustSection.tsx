export default function TrustSection() {
  const items = [
    {
      icon: "🤝",
      title: "A Homeowner Referral Platform",
      body: "Texas Property Help collects your project details and connects you with relevant local service providers. We are not a contractor.",
    },
    {
      icon: "📋",
      title: "Not an Insurance Company",
      body: "We provide guidance on the insurance claim process based on general homeowner information. We do not adjust claims or guarantee any outcome.",
    },
    {
      icon: "🔍",
      title: "You Choose Your Contractor",
      body: "Final contractor selection, hiring decisions, and signing of any agreements are always the homeowner's responsibility.",
    },
    {
      icon: "🔒",
      title: "Your Information Is Secure",
      body: "We collect only the information needed to connect you with appropriate help. We do not sell your personal data.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#000000", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.3rem, 3vw, 1.65rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          How Texas Property Help Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.title} style={{ textAlign: "center", padding: "8px 4px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
              <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.6" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
