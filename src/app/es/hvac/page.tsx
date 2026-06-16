import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con HVAC en Texas | Reparación y Reemplazo de AC",
  description: "Texas Property Help conecta a propietarios con recursos para reparación y reemplazo de HVAC. Obtenga orientación sobre reparación de emergencia de AC y opciones de financiamiento en Texas.",
  alternates: pageAlternates("/hvac", "/es/hvac", true),
};

const services = [
  { icon: "🚨", title: "Reparación de Emergencia", body: "Para situaciones urgentes — especialmente durante el calor extremo de Texas — lo conectamos con servicios de HVAC de emergencia.", color: "#ef4444" },
  { icon: "🔧", title: "Referencias para Reparación", body: "Técnicos calificados de HVAC para diagnóstico y reparación de sistemas de enfriamiento, calefacción y ventilación.", color: "#3b82f6" },
  { icon: "🏗️", title: "Reemplazo de Sistema", body: "Cuando la reparación no es rentable, le ayudamos a entender el proceso de reemplazo y cómo evaluar cotizaciones.", color: "#76b900" },
  { icon: "⛈️", title: "Daños por Tormenta", body: "El granizo puede dañar unidades exteriores de HVAC. Lo ayudamos a documentar los daños para su reclamación de seguro.", color: "#8b5cf6" },
  { icon: "💳", title: "Financiamiento de HVAC", body: "El reemplazo de HVAC es un costo significativo. Explore opciones de financiamiento que reduzcan la carga financiera inicial.", color: "#f59e0b" },
  { icon: "📋", title: "Documentación de Seguro", body: "Si hay daños por tormenta involucrados, la documentación adecuada del HVAC es crítica para una reclamación completa.", color: "#10b981" },
];

const faqs: FAQItem[] = [
  { question: "¿El seguro de hogar cubre fallas de HVAC?", answer: "Las pólizas estándar generalmente no cubren fallas de HVAC por desgaste normal. Sin embargo, los daños por tormenta a una unidad de HVAC — como granizo golpeando el condensador — pueden estar cubiertos. Revise su póliza." },
  { question: "¿Qué hago si mi AC deja de funcionar en verano?", answer: "Para alivio inmediato: cierre persianas y cortinas, use ventiladores, minimice el uso de aparatos que generan calor, y considere alojamiento temporal si tiene miembros vulnerables del hogar (mayores, bebés, mascotas). Luego solicite asistencia de emergencia." },
  { question: "¿Cuánto dura un sistema HVAC en Texas?", answer: "Los sistemas HVAC en Texas trabajan más duro por el calor extremo. Los aires acondicionados en Texas pueden durar 10-15 años, a veces menos, dependiendo del mantenimiento y uso." },
  { question: "¿Hay opciones de financiamiento para reemplazo de HVAC?", answer: "Sí — varias opciones pueden estar disponibles, incluyendo financiamiento del fabricante, préstamos para mejoras del hogar y algunos programas de reembolso de empresas de servicios públicos." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HVACESPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/hvac-hero.jpg" alt="HVAC Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,10,30,0.60) 0%, rgba(0,20,40,0.45) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", gap: "8px", alignItems: "center", backgroundColor: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.4)", color: "#38bdf8", fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", textTransform: "uppercase", marginBottom: "20px" }}>
            🌡️ Servicios de Emergencia de Calor en Texas
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Ayuda con HVAC y Aire Acondicionado<br /><span style={{ color: "#76b900" }}>en Texas</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.75, marginBottom: "28px" }}>
            En el calor de Texas, un HVAC fallido es más que incómodo — puede ser un riesgo para la salud. Lo conectamos con los recursos correctos para reparación o reemplazo.
          </p>
          <div style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "8px", padding: "12px 18px", marginBottom: "24px", maxWidth: "480px" }}>
            <p style={{ color: "#fca5a5", fontSize: "0.85rem", fontWeight: 600, margin: 0 }}>
              ⚠️ Seguridad por Calor: Si el AC falla durante una alerta de calor, priorice la seguridad — considere centros de enfriamiento o alojamiento temporal para familiares vulnerables.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 28px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 16px rgba(118,185,0,0.4)" }}>
              Obtener Ayuda con HVAC →
            </Link>
            <Link href="/es/financing" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }}>
              Explorar Financiamiento
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Cómo Ayudamos</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>Servicios de HVAC con los que lo Conectamos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", borderLeft: `4px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#f3f4f6" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>Por Qué el HVAC Importa Más en Texas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { stat: "100°F+", label: "Temperaturas de verano en muchas ciudades de Texas", icon: "🌡️" },
              { stat: "10-15 años", label: "Vida útil promedio del AC bajo el calor de Texas", icon: "⏱️" },
              { stat: "$8K-14K", label: "Costo típico de reemplazo de HVAC en Texas", icon: "💰" },
            ].map((item) => (
              <div key={item.stat} style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "24px", textAlign: "center", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0ea5e9", marginBottom: "6px" }}>{item.stat}</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <DisclaimerBoxES />
        </div>
      </section>

      {/* Reparar vs Reemplazar */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Guía de Decisión</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>¿Reparar o Reemplazar su HVAC?</h2>
            <p style={{ color: "#6b7280", maxWidth: "580px", margin: "12px auto 0", lineHeight: 1.8 }}>La regla del &ldquo;5,000&rdquo;: multiplique la edad del equipo por el costo de reparación. Si supera $5,000, generalmente es más económico reemplazarlo.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "24px" }}>
              <h3 style={{ color: "#15803d", fontWeight: 800, marginBottom: "12px" }}>✓ Considere Reparar Si...</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["El equipo tiene menos de 10 años", "La reparación cuesta menos del 30% de uno nuevo", "El sistema era confiable antes del problema", "Las piezas están disponibles y son económicas"].map(item => (
                  <li key={item} style={{ fontSize: "0.875rem", color: "#374151", paddingBottom: "8px", marginBottom: "8px", borderBottom: "1px solid #dcfce7" }}>• {item}</li>
                ))}
              </ul>
            </div>
            <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "24px" }}>
              <h3 style={{ color: "#1d4ed8", fontWeight: 800, marginBottom: "12px" }}>→ Considere Reemplazar Si...</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["El equipo tiene más de 15 años", "Usa refrigerante R-22 (descontinuado)", "Las reparaciones son frecuentes y costosas", "Las facturas de energía han subido significativamente"].map(item => (
                  <li key={item} style={{ fontSize: "0.875rem", color: "#374151", paddingBottom: "8px", marginBottom: "8px", borderBottom: "1px solid #dbeafe" }}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clasificaciones SEER */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Eficiencia Energética</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Clasificaciones SEER — Lo que Significan para Texas</h2>
            <p style={{ color: "#6b7280", maxWidth: "580px", margin: "12px auto 0", lineHeight: 1.8 }}>SEER mide la eficiencia de su AC. A partir de 2023, el mínimo federal para el Sur de Texas es <strong>SEER 15</strong>. Más alto = menor factura eléctrica.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              { seer: "SEER 14-15", label: "Mínimo estándar", color: "#6b7280", bg: "#f9fafb" },
              { seer: "SEER 16-17", label: "Eficiente — recomendado para Texas", color: "#3b82f6", bg: "#eff6ff" },
              { seer: "SEER 18-20", label: "Muy eficiente — puede calificar para crédito fiscal", color: "#76b900", bg: "#f0fdf4" },
              { seer: "SEER 21+", label: "Máxima eficiencia — menor costo operativo", color: "#8b5cf6", bg: "#f5f3ff" },
            ].map(tier => (
              <div key={tier.seer} style={{ backgroundColor: tier.bg, borderRadius: "10px", padding: "20px", textAlign: "center", border: `1px solid ${tier.color}30` }}>
                <div style={{ color: tier.color, fontWeight: 900, fontSize: "1.2rem", marginBottom: "8px" }}>{tier.seer}</div>
                <p style={{ color: "#374151", fontSize: "0.825rem", lineHeight: "1.5", margin: 0 }}>{tier.label}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "16px", textAlign: "center" }}>Los sistemas SEER 15+ instalados desde 2023 pueden calificar para un crédito fiscal federal de hasta $600. Consulte a un profesional de impuestos.</p>
        </div>
      </section>

      {/* Señales de Advertencia */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Señales de Alerta</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>6 Señales de que su HVAC Necesita Atención</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {[
              { icon: "🔊", title: "Ruidos Inusuales", body: "Traqueteos, chirridos o golpeteos al encender indican problemas mecánicos." },
              { icon: "💧", title: "Humedad o Goteo Excesivo", body: "Charcos o goteo activo señalan bloqueo en el drenaje o refrigerante bajo." },
              { icon: "🌡️", title: "Mal Enfriamiento", body: "AC que corre pero no enfría puede ser compresor, refrigerante o conductos." },
              { icon: "⚡", title: "Facturas de Energía que Suben", body: "Un alza repentina sugiere que el sistema trabaja de más por un componente con falla." },
              { icon: "💨", title: "Flujo de Aire Débil", body: "Ventilas con poco flujo pueden indicar problemas con el soplador o filtros tapados." },
              { icon: "👃", title: "Olores Extraños", body: "Olor a quemado = problema eléctrico. Olor a humedad = posible moho en el sistema." },
            ].map(sign => (
              <div key={sign.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "20px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{sign.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "6px" }}>{sign.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: "1.6", margin: 0 }}>{sign.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HVAC después de tormenta */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(139,92,246,0.15)", color: "#c4b5fd", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Tormentas de Texas</span>
            <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Su HVAC Después de una Tormenta de Granizo</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "580px", margin: "12px auto 0", lineHeight: 1.8 }}>El granizo puede abollar las aletas del condensador y reducir la eficiencia hasta un 30%. Estos daños suelen estar cubiertos por el seguro — pero requieren documentación adecuada.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { num: "1", title: "No encienda el equipo inmediatamente", body: "Primero inspecciónelo visualmente. Operar un compresor dañado puede causar falla irreversible." },
              { num: "2", title: "Fotografíe el daño", body: "Fotos de cerca de las aletas, el gabinete y cualquier granizo. Incluya el número de modelo." },
              { num: "3", title: "Llame a su aseguradora", body: "Presente la reclamación de inmediato — no espere para ver si funciona. Los plazos aplican desde la fecha de la tormenta." },
              { num: "4", title: "Solicite una evaluación HVAC", body: "Un técnico certificado documenta el daño en un informe escrito que respalda su reclamación." },
              { num: "5", title: "Guarde todos los documentos", body: "Conserve el estimado, fotos, comunicación con la aseguradora y recibos de reparaciones temporales." },
            ].map(step => (
              <div key={step.num} style={{ display: "flex", gap: "16px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "18px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#76b900", color: "#000", fontWeight: 900, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step.num}</div>
                <div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px" }}>{step.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: "1.6", margin: 0 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas Frecuentes sobre HVAC" />

      <section style={{ backgroundColor: "#111827" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ color: "white", fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px" }}>¿Problema de HVAC en Texas?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>Envíe una solicitud y lo conectamos con recursos de reparación, reemplazo y financiamiento de HVAC en su área.</p>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 32px", borderRadius: "6px", textDecoration: "none" }}>
            Solicitar Ayuda con HVAC →
          </Link>
        </div>
      </section>
    </>
  );
}
