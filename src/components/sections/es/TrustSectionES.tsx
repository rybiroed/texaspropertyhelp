import { ES } from "@/lib/translations-es";

export default function TrustSectionES() {
  return (
    <section style={{ backgroundColor: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "clamp(1.3rem, 3vw, 1.65rem)", fontWeight: 700, textAlign: "center", marginBottom: "36px" }}>
          {ES.home.trustHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ES.trust.map((item) => (
            <div key={item.title} style={{ textAlign: "center", padding: "8px 4px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
              <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.6" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
