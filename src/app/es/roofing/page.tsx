import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con Techado en Texas | Texas Property Help",
  description: "Texas Property Help conecta a propietarios con recursos para inspección, reparación y reemplazo de techo. Aprenda cómo navegar reclamaciones de seguro relacionadas con techos.",
  alternates: pageAlternates("/roofing", "/es/roofing", true),
};

const services = [
  { icon: "🔍", title: "Inspección de Techo", body: "Una inspección profesional identifica daños, evalúa la vida útil restante y documenta problemas para reclamaciones de seguro.", color: "#76b900" },
  { icon: "🔧", title: "Reparación de Techo", body: "Reparaciones parciales para áreas específicas — tejas faltantes, problemas de flashing, pequeñas filtraciones — cuando no se necesita reemplazo total.", color: "#3b82f6" },
  { icon: "🏗️", title: "Reemplazo de Techo", button: "Cuando el daño es extenso o la aseguradora requiere reemplazo después de una pérdida cubierta.", color: "#f59e0b" },
  { icon: "📋", title: "Apoyo con Reclamaciones", body: "Entender qué documentación de techado necesita su aseguradora y cómo comunicarse efectivamente durante el proceso.", color: "#8b5cf6" },
  { icon: "💧", title: "Respuesta de Emergencia", body: "Las filtraciones activas necesitan atención inmediata. Lo conectamos con recursos de respuesta de emergencia.", color: "#ef4444" },
  { icon: "💳", title: "Opciones de Financiamiento", body: "Los costos de techado pueden ser significativos. Explore opciones de financiamiento cuando el seguro no cubre el costo total.", color: "#10b981" },
];

const faqs: FAQItem[] = [
  { question: "¿Cómo sé si necesito reparación o reemplazo completo de techo?", answer: "La decisión depende del alcance y tipo de daño, la edad de su techo y los términos de su póliza de seguro. Una inspección profesional le dará información factual para tomar una decisión informada." },
  { question: "¿Mi seguro pagará un techo nuevo?", answer: "Si el seguro cubre el trabajo de techo depende de su póliza específica, la causa del daño, la edad del techo y si el daño supera su deducible. Las aseguradoras toman esta determinación según su evaluación." },
  { question: "¿Cómo evito estafas de techado después de una tormenta?", answer: "Trabaje con contratistas locales certificados con reseñas verificables y una dirección física. Evite vendedores puerta a puerta que aparecen inmediatamente después de tormentas. Nunca pague el costo total por adelantado." },
  { question: "¿Cuánto tiempo tarda un reemplazo de techo en Texas?", answer: "La mayoría de los reemplazos de techo residenciales en Texas toman 1-3 días dependiendo del tamaño del techo, complejidad y condiciones climáticas. Su contratista debe darle un cronograma por escrito." },
];

export default function RoofingESPage() {
  return (
    <>
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/roofing-hero.png" alt="Techado Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,15,0,0.45) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", gap: "8px", alignItems: "center", backgroundColor: "rgba(118,185,0,0.15)", border: "1px solid rgba(118,185,0,0.4)", color: "#a3e635", fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", textTransform: "uppercase", marginBottom: "20px" }}>
            🏠 Servicios de Techado en Texas
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Ayuda con Techado para<br /><span style={{ color: "#76b900" }}>Propietarios de Texas</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.75, marginBottom: "28px" }}>
            Desde inspección hasta reemplazo completo — conéctese con profesionales certificados de techado en Texas que conocen las reclamaciones de seguro y los códigos locales.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 28px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 16px rgba(118,185,0,0.4)" }}>
              Obtener Ayuda con Techado →
            </Link>
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }}>
              Guía: ¿Reparar o Reemplazar?
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Servicios</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>Cómo Podemos Ayudar con Su Techo</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", borderTop: `4px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{item.body || item.button}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#f3f4f6" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: "28px", textAlign: "center" }}>Mercado Hispano en Texas</h2>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "28px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", borderLeft: "4px solid #76b900", marginBottom: "20px" }}>
            <p style={{ color: "#374151", fontSize: "0.95rem", lineHeight: 1.75, margin: 0 }}>
              Más del <strong>40% de los propietarios en Houston, San Antonio y Dallas son hispanos</strong>. En Texas Property Help, nos aseguramos de que la barrera del idioma nunca sea un obstáculo para obtener ayuda justa con reclamaciones de seguro, contratistas certificados y recursos de reparación.
            </p>
          </div>
          <DisclaimerBoxES />
        </div>
      </section>

      {/* Materiales de Techado */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Guía de Materiales</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Materiales de Techado Más Usados en Texas</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {[
              { name: "Asfalto (3 Capas)", life: "20–25 años", cost: "$", pros: "Económico y fácil de instalar", cons: "Menor durabilidad contra granizo severo", color: "#6b7280" },
              { name: "Metal (Panel/Teja)", life: "40–70 años", cost: "$$$", pros: "Excelente contra granizo y viento fuerte", cons: "Costo inicial alto", color: "#3b82f6" },
              { name: "TPO / Techo Plano", life: "20–30 años", cost: "$$", pros: "Ideal para techos planos o de poca pendiente", cons: "Requiere instalación especializada", color: "#f59e0b" },
              { name: "Teja de Arcilla/Concreto", life: "50+ años", cost: "$$$", pros: "Muy durable; popular en sur de Texas", cons: "Pesado — requiere estructura reforzada", color: "#ef4444" },
            ].map(mat => (
              <div key={mat.name} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "22px", border: `2px solid ${mat.color}30` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <h3 style={{ color: "#111827", fontWeight: 800, fontSize: "1rem" }}>{mat.name}</h3>
                  <span style={{ color: mat.color, fontWeight: 900, fontSize: "0.9rem" }}>{mat.cost}</span>
                </div>
                <div style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", marginBottom: "10px" }}>Vida útil: {mat.life}</div>
                <p style={{ color: "#16a34a", fontSize: "0.825rem", marginBottom: "6px" }}>✓ {mat.pros}</p>
                <p style={{ color: "#dc2626", fontSize: "0.825rem" }}>✗ {mat.cons}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licencia y Señales de Alerta */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div>
              <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 800, marginBottom: "16px" }}>Contratistas con Licencia en Texas</h2>
              <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: "1.7", marginBottom: "16px" }}>Texas no requiere licencia estatal de techador, pero la mayoría de las aseguradoras exigen contratistas registrados y asegurados.</p>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "16px", border: "1px solid #e5e7eb" }}>
                <p style={{ color: "#374151", fontWeight: 700, fontSize: "0.85rem", marginBottom: "10px" }}>Siempre verifique:</p>
                {["Registro de la empresa en el estado", "Seguro de responsabilidad y compensación al trabajador", "Reseñas verificadas (Google, BBB)", "Dirección física — no solo teléfono", "Referencias de trabajos en Texas"].map(item => (
                  <div key={item} style={{ display: "flex", gap: "8px", fontSize: "0.825rem", color: "#4b5563", marginBottom: "6px" }}>
                    <span style={{ color: "#76b900", fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ color: "#dc2626", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 800, marginBottom: "16px" }}>⚠️ Señales de Alerta</h2>
              <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: "1.7", marginBottom: "16px" }}>Tras una tormenta, contratistas inescrupulosos van de puerta en puerta en Texas. Conozca las señales:</p>
              {[
                "Presión para firmar de inmediato (\"oferta de un solo día\")",
                "Promesas de cubrir su deducible — es ilegal en Texas",
                "Pago total por adelantado antes de iniciar el trabajo",
                "Sin dirección física o seguro verificable",
                "Estimados muy por debajo de los demás",
                "Presión para firmar una Asignación de Beneficios (AOB)",
                "No ofrecen contrato escrito detallado",
                "No están disponibles después de cobrar",
              ].map(flag => (
                <div key={flag} style={{ display: "flex", gap: "8px", fontSize: "0.825rem", color: "#4b5563", marginBottom: "7px" }}>
                  <span style={{ color: "#dc2626", fontWeight: 700, flexShrink: 0 }}>✗</span> {flag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Reclamación */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(59,130,246,0.15)", color: "#93c5fd", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Reclamación de Seguro</span>
            <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Proceso de Reclamación para Techo en Texas</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {[
              { num: "1", title: "Inspecciónelo con Seguridad", body: "Desde el suelo o con escalera — no suba al techo húmedo o dañado." },
              { num: "2", title: "Documente Todo", body: "Fotos y videos antes de cualquier limpieza o reparación temporal." },
              { num: "3", title: "Reparaciones Temporales", body: "Lonas sobre filtraciones activas. Guarde todos los recibos." },
              { num: "4", title: "Presente la Reclamación", body: "Llame a su aseguradora — no espere. Anote el número de reclamación." },
              { num: "5", title: "Obtenga Estimados", body: "2-3 estimados escritos de techadores locales con licencia." },
              { num: "6", title: "Revise el Ajuste", body: "Compare el estimado de la aseguradora con los suyos — dispute si hay diferencias." },
            ].map(step => (
              <div key={step.num} style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "18px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#76b900", color: "#000", fontWeight: 900, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>{step.num}</div>
                <h3 style={{ color: "white", fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.825rem", lineHeight: "1.55", margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Costos Aproximados */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: "24px", textAlign: "center" }}>Costos Aproximados de Techado en Texas (2024)</h2>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
            {[
              { service: "Reparación menor (parche de tejas)", cost: "$150 – $500" },
              { service: "Reemplazo de flashing o botas de ventilación", cost: "$200 – $600" },
              { service: "Reparación de filtración activa (emergencia)", cost: "$300 – $800" },
              { service: "Reemplazo parcial (daño aislado)", cost: "$1,500 – $4,000" },
              { service: "Reemplazo completo — casa promedio Texas", cost: "$8,000 – $18,000" },
              { service: "Techo de metal — instalación completa", cost: "$15,000 – $35,000+" },
            ].map((row, i) => (
              <div key={row.service} style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#374151", fontSize: "0.875rem" }}>{row.service}</span>
                <span style={{ color: "#76b900", fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap" }}>{row.cost}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#9ca3af", fontSize: "0.78rem", marginTop: "12px", textAlign: "center" }}>Los costos varían según tamaño, material, ciudad y condiciones. Siempre obtenga estimados escritos de contratistas locales.</p>
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas Frecuentes sobre Techado" />

      <section style={{ backgroundColor: "#111827" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ color: "white", fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px" }}>¿Necesita un Techador en Texas?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>Envíe una solicitud y lo conectamos con profesionales locales certificados para inspección, reparación o reemplazo.</p>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 32px", borderRadius: "6px", textDecoration: "none" }}>
            Obtener Ayuda con Techado →
          </Link>
        </div>
      </section>
    </>
  );
}

