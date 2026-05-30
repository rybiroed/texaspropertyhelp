import type { Metadata } from "next";
import ContractorForm from "@/components/sections/ContractorForm";

export const metadata: Metadata = {
  title: "Para Profesionales | Texas Property Help",
  description:
    "Contratistas y profesionales de oficios: aplique para recibir referidos de propietarios de viviendas en Texas. Techados, HVAC, daños por tormenta, reclamaciones de seguros y más.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://texaspropertyhelp.com/es/para-profesionales",
    languages: {
      "en-US": "https://texaspropertyhelp.com/for-professionals",
      "es-US": "https://texaspropertyhelp.com/es/para-profesionales",
      "x-default": "https://texaspropertyhelp.com/for-professionals",
    },
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Programa de Socios Contratistas — Texas Property Help",
  description: "Conectamos a contratistas calificados con propietarios de viviendas en Texas que necesitan reparaciones de techado, HVAC, daños por tormenta y orientación en reclamaciones de seguros.",
  provider: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
  },
  areaServed: { "@type": "State", name: "Texas" },
  availableLanguage: ["Spanish", "English"],
};

const LEAD_TYPES = [
  { icon: "🏠", label: "Reparaciones y reemplazos de techos" },
  { icon: "❄️", label: "Reparación y reemplazo de HVAC" },
  { icon: "⛈️", label: "Daños por tormentas y granizo" },
  { icon: "📋", label: "Asistencia con reclamaciones de seguros" },
  { icon: "🔧", label: "Reparaciones generales de propiedad" },
];

export default function ParaProfesionalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

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
            Profesionales de Oficios
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
            Reciba Referidos de Propietarios en Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7 }}>
            Texas Property Help conecta propietarios de viviendas con contratistas calificados. Aplique a continuación y le contactaremos cuando haya referidos que coincidan con su área de servicio y oficio.
          </p>
        </div>
      </section>

      {/* Cómo funciona */}
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
            Cómo Funciona
          </h2>
          <p
            style={{
              color: "var(--content-secondary)",
              fontSize: "0.9375rem",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Somos una plataforma de referidos — no somos contratistas, aseguradores ni prestamistas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ marginBottom: "40px" }}>
            {[
              {
                step: "1",
                heading: "El propietario envía una solicitud",
                body: "Los propietarios describen su necesidad de reparación — techado, HVAC, daños por tormenta, orientación en reclamaciones de seguros o reparaciones generales.",
              },
              {
                step: "2",
                heading: "Revisamos y conectamos",
                body: "Revisamos cada solicitud y la conectamos con contratistas aprobados según el oficio, área de servicio y disponibilidad.",
              },
              {
                step: "3",
                heading: "Usted recibe el referido",
                body: "Los contratistas conectados reciben los datos de contacto del propietario. Usted hace el seguimiento directamente — nosotros no gestionamos el trabajo.",
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

          {/* Tipos de referidos */}
          <div
            style={{
              backgroundColor: "var(--content-bg-subtle)",
              border: "1px solid var(--content-border)",
              borderRadius: "10px",
              padding: "24px 28px",
              marginBottom: "24px",
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
              Tipos de Referidos que Enviamos
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

          {/* Ventajas para contratistas bilingüe */}
          <div
            style={{
              backgroundColor: "#f0f7ff",
              border: "1px solid #bdd7f5",
              borderRadius: "10px",
              padding: "20px 24px",
              marginBottom: "24px",
            }}
          >
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "10px" }}>
              🌎 Ventaja Bilingüe
            </h3>
            <p style={{ color: "var(--content-secondary)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
              Contratistas que hablan español tienen acceso prioritario a referidos de propietarios hispanos en Texas. Más del 40% de los propietarios en Houston, San Antonio y Dallas prefieren comunicarse en español.
            </p>
          </div>

          {/* Aviso legal */}
          <div
            style={{
              border: "1px solid var(--content-border)",
              borderRadius: "8px",
              padding: "16px 20px",
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
              <strong style={{ color: "var(--content-secondary)" }}>Aviso de plataforma:</strong> Texas Property Help es únicamente un servicio de referidos e intake. No somos contratistas licenciados, compañía de seguros ni prestamistas. No garantizamos volumen ni exclusividad de referidos. Los contratistas aprobados son responsables de sus propias licencias, seguros y cumplimiento con la ley de Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario de aplicación */}
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
              Aplicar para Recibir Referidos
            </h2>
            <p style={{ color: "var(--content-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
              Complete el formulario a continuación. Revisamos cada solicitud antes de enviar cualquier referido.
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
