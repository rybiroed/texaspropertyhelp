import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/sections/ServiceCard";
import FAQES from "@/components/sections/es/FAQES";
import { ES } from "@/lib/translations-es";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Texas Property Help | Ayuda para Propietarios en Texas",
  description: "Texas Property Help conecta a propietarios con recursos para daños por tormenta, techos, HVAC, reclamaciones de seguro y financiamiento de reparaciones en Texas.",
  alternates: pageAlternates("/", "/es", true),
};

const services = [
  { title: "Daños por Tormenta", description: "Granizo, viento y daños por agua — obtenga ayuda para documentar y resolver daños a su propiedad después de tormentas en Texas.", href: "/es/storm-damage", icon: "⛈️", image: "https://images.unsplash.com/photo-1504608524841-42785f1c8f8?w=600&q=75", accentColor: "#ef4444" },
  { title: "Ayuda con Techado", description: "Desde inspección hasta reemplazo de techo — conéctese con profesionales certificados de techado en Texas.", href: "/es/roofing", icon: "🏠", image: "/images/roofing-hero.png", accentColor: "#76b900" },
  { title: "Ayuda con HVAC", description: "Reparación de emergencia de AC, reemplazo de sistema y opciones de financiamiento para problemas de calefacción y enfriamiento.", href: "/es/hvac", icon: "🌡️", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=75", accentColor: "#0ea5e9" },
  { title: "Reclamaciones de Seguro", description: "Entienda el proceso de reclamaciones de seguro — documentación, comunicación y qué esperar en cada paso.", href: "/es/insurance-claims", icon: "📄", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=75", accentColor: "#8b5cf6" },
  { title: "Financiamiento de Reparaciones", description: "Explore opciones de financiamiento para reparaciones de emergencia y planificadas cuando los costos son un obstáculo.", href: "/es/financing", icon: "💳", image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=75", accentColor: "#f59e0b" },
  { title: "Guías para Propietarios", description: "Guías paso a paso para respuesta a tormentas, reclamaciones de seguro y planificación de reparaciones.", href: "/es/guides", icon: "📚", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=75", accentColor: "#10b981" },
];

const stats = [
  { number: "9+", label: "Meses sirviendo a propietarios de Texas" },
  { number: "Gratis", label: "Para enviar su solicitud" },
  { number: "5", label: "Principales ciudades de Texas" },
  { number: "24/7", label: "Monitoreo de tormentas activo" },
];

export default function EsHomePage() {
  return (
    <>
      {/* Hero con foto */}
      <section style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80" alt="Casa en Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.70) 50%, rgba(0,20,0,0.82) 100%)" }} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", backgroundColor: "rgba(118,185,0,0.15)", color: "#76b900", border: "1px solid rgba(118,185,0,0.4)", fontSize: "0.8rem", fontWeight: 700, padding: "6px 16px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "24px" }}>
            ⛈️ Temporada de Tormentas 2026 — Obtenga Ayuda Ahora
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "20px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Obtenga la Ayuda Correcta para<br /><span style={{ color: "#76b900" }}>Su Propiedad en Texas</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: "600px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Daños por tormenta, problemas de techo, fallas de HVAC, reclamaciones de seguro y financiamiento — Texas Property Help conecta a propietarios con los recursos correctos en el momento correcto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "16px 36px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 20px rgba(118,185,0,0.4)" }}>
              Solicitar Ayuda Ahora →
            </Link>
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "16px 32px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Guías Gratuitas
            </Link>
          </div>
          {/* Ciudades */}
          <div style={{ marginTop: "36px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth"].map((city) => (
              <span key={city} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", padding: "5px 12px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.05)" }}>
                📍 {city}
              </span>
            ))}
          </div>
          <p style={{ marginTop: "20px", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            Looking for English?{" "}
            <Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "underline" }}>View English version →</Link>
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 900, color: "#76b900", lineHeight: 1, marginBottom: "6px" }}>{s.number}</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Lo Que Cubrimos</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "12px" }}>Cómo Ayudamos a los Propietarios de Texas</h2>
            <p style={{ color: "#6b7280", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem" }}>Desde respuesta de emergencia hasta planificación de reparaciones — explore las áreas donde podemos conectarlo con orientación y recursos.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (<ServiceCard key={s.href} {...s} />))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Proceso Simple</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>Cómo Funciona Texas Property Help</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", icon: "📝", title: "Envíe Su Solicitud", body: "Cuéntenos sobre su problema de propiedad. Toma 2 minutos y es completamente gratis.", color: "#76b900" },
              { num: "02", icon: "🔍", title: "Revisamos y Conectamos", body: "Revisamos su solicitud y lo conectamos con contratistas locales verificados en su área.", color: "#0ea5e9" },
              { num: "03", icon: "🤝", title: "Se Conecta con un Profesional", body: "Un profesional calificado lo contacta directamente. Usted elige con quién trabajar.", color: "#f59e0b" },
              { num: "04", icon: "🏠", title: "Problema Resuelto", body: "Su propiedad recibe la atención que necesita. Hacemos seguimiento para asegurarnos de todo.", color: "#10b981" },
            ].map((step) => (
              <div key={step.num} style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "28px 22px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", borderTop: `3px solid ${step.color}` }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px", width: "52px", height: "52px", backgroundColor: `${step.color}18`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{step.icon}</div>
                <div style={{ color: step.color, fontWeight: 900, fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "8px" }}>PASO {step.num}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "32px", color: "#9ca3af", fontSize: "0.8rem" }}>
            Texas Property Help es una plataforma de asistencia y referidos para propietarios — no es una compañía de seguros, contratista ni bufete de abogados.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ backgroundColor: "#111827" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ color: "white", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, marginBottom: "12px" }}>¿Tiene un Problema de Propiedad?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "28px" }}>Envíe su solicitud gratis — sin obligación. Lo conectamos con los recursos correctos.</p>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "16px 36px", borderRadius: "6px", textDecoration: "none" }}>
            Solicitar Ayuda Ahora →
          </Link>
          <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
            Looking for English? <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>View English version →</Link>
          </p>
        </div>
      </section>
    </>
  );
}

