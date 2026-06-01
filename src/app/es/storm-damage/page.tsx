import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con Daños por Tormenta en Texas | Texas Property Help",
  description: "Aprenda qué hacer después de daños por granizo, viento o tormenta en su propiedad en Texas. Texas Property Help conecta a propietarios con recursos para evaluación de daños, documentación y reparaciones.",
  alternates: pageAlternates("/storm-damage", "/es/storm-damage", true),
};

const damageTypes = [
  { icon: "🌨️", title: "Daños por Granizo", body: "El granizo puede dañar el techo, canalones, revestimiento, ventanas y unidades de AC. Los daños pueden no ser visibles desde el suelo.", color: "#3b82f6" },
  { icon: "💨", title: "Daños por Viento", body: "Los vientos fuertes pueden levantar tejas, dañar tableros de fascia, romper ventanas y derribar árboles sobre estructuras.", color: "#8b5cf6" },
  { icon: "💧", title: "Filtraciones de Techo", body: "Las filtraciones por tormentas necesitan atención inmediata para prevenir moho, daños estructurales y daños interiores adicionales.", color: "#06b6d4" },
  { icon: "🌊", title: "Intrusión de Agua", body: "Las inundaciones y la intrusión de agua pueden dañar pisos, paredes y sistemas eléctricos. La documentación es crítica.", color: "#10b981" },
  { icon: "🌩️", title: "Cubiertas de Emergencia", body: "La impermeabilización temporal después de daños por tormenta puede prevenir pérdidas adicionales y a menudo está cubierta por su póliza.", color: "#f59e0b" },
  { icon: "📋", title: "Documentación de Seguro", body: "Reunir fotos, reportes de inspección y estimados de reparación es esencial para un proceso de reclamación fluido.", color: "#ef4444" },
];

const steps = [
  { step: "01", icon: "🚨", title: "Priorice la Seguridad", body: "Antes de inspeccionar, confirme que no hay peligros estructurales, cables caídos o fugas de gas. Llame al 911 si hay peligro inmediato." },
  { step: "02", icon: "📸", title: "Documente Todo", body: "Tome fotos y videos de todos los daños visibles — techo, revestimiento, ventanas, daños interiores — antes de limpiar o reparar." },
  { step: "03", icon: "🛠️", title: "Haga Reparaciones Temporales", body: "Cubra ventanas rotas y filtraciones activas con lonas para prevenir más daño. Guarde todos los recibos." },
  { step: "04", icon: "📞", title: "Contacte a su Aseguradora", body: "Presente una reclamación rápidamente. La mayoría de las pólizas tienen plazos. Anote su número de reclamación." },
  { step: "05", icon: "🔍", title: "Solicite una Evaluación Profesional", body: "Solicite una referencia para una evaluación profesional de daños que respalde su documentación de seguro." },
];

const faqs: FAQItem[] = [
  { question: "¿Cuánto tiempo tengo para presentar una reclamación de daños por tormenta en Texas?", answer: "La ley de Texas generalmente requiere presentar una reclamación dentro de un año del evento de tormenta, pero su póliza específica puede tener plazos diferentes. Contacte a su aseguradora inmediatamente." },
  { question: "¿El seguro de mi hogar cubre daños por granizo?", answer: "La mayoría de las pólizas estándar de Texas incluyen cobertura por granizo y viento, pero los montos, deducibles y exclusiones varían. Revise la página de declaraciones de su póliza." },
  { question: "¿Qué es ACV vs RCV en un reclamo de techo?", answer: "ACV (Valor en Efectivo Real) paga el valor depreciado de su techo. RCV (Costo de Reemplazo) paga lo que cuesta reemplazar el material dañado. La diferencia es significativa para techos más viejos." },
  { question: "¿Puedo obtener ayuda si la tormenta ocurrió hace semanas?", answer: "Sí — siempre que esté dentro del plazo de reclamación de su póliza y los daños estén documentados, aún puede tener opciones. Recomendamos actuar rápido para no perder los plazos." },
];

export default function StormDamageESPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/storm-damage-hero.jpg" alt="Daños por tormenta en Texas" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(20,0,0,0.50) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", gap: "8px", alignItems: "center", backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            ⛈️ Temporada de Tormentas Activa en Texas
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Ayuda con Daños por Tormenta para<br /><span style={{ color: "#76b900" }}>Propietarios de Texas</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.75, marginBottom: "28px" }}>
            El granizo, los vientos fuertes y el clima severo pueden causar daños serios a su hogar. Saber qué hacer — rápido y en el orden correcto — protege su propiedad y su reclamación de seguro.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 28px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 16px rgba(118,185,0,0.4)" }}>
              Obtener Ayuda Ahora →
            </Link>
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }}>
              Guía de Inspección Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Tipos de daños - blanco */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Lo Que Cubrimos</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>Tipos de Daños por Tormenta con los que Ayudamos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {damageTypes.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", borderLeft: `4px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos - gris */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Paso a Paso</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>Qué Hacer Después de Daños por Tormenta</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {steps.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: "20px", backgroundColor: "#ffffff", borderRadius: "10px", padding: "22px 24px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", borderLeft: "4px solid #76b900" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", backgroundColor: "#76b90018", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ color: "#76b900", fontWeight: 900, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "4px" }}>PASO {s.step}</div>
                  <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}><DisclaimerBoxES /></div>
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas Frecuentes sobre Daños por Tormenta" />

      <section style={{ backgroundColor: "#111827" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ color: "white", fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px" }}>¿Daños por Tormenta? Le Ayudamos a Comenzar.</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>Envíe una solicitud y lo conectamos con recursos locales para evaluación, reclamación de seguro y reparaciones de emergencia.</p>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 32px", borderRadius: "6px", textDecoration: "none" }}>
            Solicitar Ayuda Ahora →
          </Link>
        </div>
      </section>
    </>
  );
}
