import type { Metadata } from "next";
import LeadFormES from "@/components/sections/es/LeadFormES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { ES } from "@/lib/translations-es";

export const metadata: Metadata = {
  title: "Solicitar Ayuda para su Propiedad",
  description:
    "Envíe su solicitud de ayuda para propiedad en Texas. Cuéntenos sobre su situación — daños por tormenta, techo, HVAC, seguro o financiamiento — y lo conectaremos con los recursos adecuados.",
  alternates: { languages: { "en-US": "https://texaspropertyhelp.com/request-help" } },
};

export default function RequestHelpESPage() {
  const f = ES.form;
  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>{f.badge}</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>{f.h1}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7 }}>{f.subheading}</p>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--off-white)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px 24px", marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {f.trustItems.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <span>{item.icon}</span><span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px" }}>
            <LeadFormES pageSource="request-help-es-page" />
          </div>

          <DisclaimerBoxES type="general" />

          <div style={{ backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "10px", padding: "24px", marginTop: "24px" }}>
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px" }}>{f.whatHappensNext}</h3>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {f.nextSteps.map((step, i) => (
                <li key={i} style={{ display: "flex", gap: "14px", paddingBottom: "14px", marginBottom: "14px", borderBottom: i < f.nextSteps.length - 1 ? "1px solid var(--border)" : "none", alignItems: "flex-start" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>{i + 1}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6" }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
