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

export default function HVACESPage() {
  return (
    <>
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
