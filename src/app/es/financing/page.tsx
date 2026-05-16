import type { Metadata } from "next";
import Link from "next/link";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Financiamiento para Reparaciones del Hogar en Texas",
  description:
    "Explore opciones de financiamiento para reparaciones para propietarios de Texas que enfrentan daños por tormenta, techado, HVAC y costos de reparación de emergencia. Texas Property Help no garantiza aprobación ni términos de financiamiento.",
  alternates: pageAlternates("/financing", "/es/financing", true),
};

const optionTypes = [
  {
    icon: "🏠",
    title: "Préstamos para Mejoras del Hogar",
    body: "Préstamos personales no garantizados específicamente para reparaciones del hogar. No se requiere capital acumulado. Los términos, tasas y aprobación varían según el prestamista y el solicitante.",
  },
  {
    icon: "🏦",
    title: "Opciones de Capital del Hogar",
    body: "Los propietarios con capital acumulado pueden acceder a líneas de crédito (HELOC) o préstamos sobre el valor neto de la vivienda. Estos usan su hogar como garantía y generalmente ofrecen tasas de interés más bajas.",
  },
  {
    icon: "🔧",
    title: "Financiamiento a través del Contratista",
    body: "Algunos contratistas se asocian con empresas de financiamiento para ofrecer planes de pago. Los términos varían ampliamente — revise todos los acuerdos cuidadosamente antes de firmar.",
  },
  {
    icon: "⚡",
    title: "Programas de Reembolso de Servicios Públicos",
    body: "Las empresas de servicios públicos de Texas ocasionalmente ofrecen programas de reembolso o financiamiento para actualizaciones de HVAC. Consulte con su proveedor de servicios públicos para ofertas actuales.",
  },
  {
    icon: "🏛️",
    title: "Programas de Asistencia Gubernamental",
    body: "Después de desastres declarados, FEMA y otros programas pueden proporcionar asistencia. Se aplican requisitos de elegibilidad. Visite disasterassistance.gov para programas actuales.",
  },
  {
    icon: "💳",
    title: "Opciones de Crédito",
    body: "Las tarjetas de crédito con APR introductorio del 0% pueden funcionar para reparaciones menores. Entienda los términos completamente — se aplican tasas de interés altas si los saldos no se pagan dentro del período promocional.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "¿Puedo financiar el reemplazo del techo después de una tormenta?",
    answer:
      "Sí, pueden estar disponibles opciones de financiamiento para reemplazo de techo — ya sea que tenga o no una reclamación de seguro activa. La opción correcta depende de su perfil crediticio, capital acumulado y el alcance del trabajo necesario.",
  },
  {
    question: "¿Necesito buen crédito para obtener financiamiento de reparaciones?",
    answer:
      "Depende del tipo de financiamiento. Algunos programas son sensibles al puntaje de crédito (préstamos personales, HELOC), mientras que otros pueden tener requisitos más flexibles. Texas Property Help no toma decisiones de financiamiento — ayudamos a conectarle con recursos relevantes para explorar.",
  },
  {
    question: "¿Qué tan rápido se puede organizar el financiamiento de reparaciones de emergencia?",
    answer:
      "Algunos productos de préstamos personales ofrecen financiamiento el mismo día o al día siguiente. Otros, como los HELOC, pueden tardar semanas. Para situaciones de emergencia, pregunte específicamente sobre los plazos de procesamiento al explorar opciones.",
  },
  {
    question: "¿Es seguro el financiamiento a través de un contratista?",
    answer:
      "El financiamiento del contratista puede ser legítimo, pero lea todos los términos cuidadosamente. Entienda el prestamista, la tasa de interés, el plazo del préstamo y cualquier penalidad antes de aceptar. Nunca firme un acuerdo de financiamiento bajo presión.",
  },
  {
    question: "¿Hay programas de asistencia para propietarios de bajos ingresos en Texas?",
    answer:
      "Sí — las organizaciones locales de vivienda sin fines de lucro, las Agencias de Acción Comunitaria y los fondos de alivio por desastres pueden proporcionar asistencia. La elegibilidad y disponibilidad varían según la ubicación y el programa. Contacte al 211 de Texas para referencias locales.",
  },
];

export default function FinancingESPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Financiamiento de Reparaciones
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Opciones de Financiamiento para Reparaciones del Hogar en Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7, marginBottom: "24px" }}>
            Cuando el seguro no cubre todo — o necesita fondos para reparaciones rápidamente — puede haber opciones de financiamiento disponibles. Ayudamos a los propietarios a entender qué existe.
          </p>
          <DisclaimerBoxES type="financing" />
          <div style={{ marginTop: "24px" }}>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Explorar Ayuda de Financiamiento →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "32px" }}>
            Tipos de Financiamiento de Reparaciones para Explorar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {optionTypes.map((item) => (
              <div key={item.title} style={{ backgroundColor: "var(--off-white)", borderRadius: "10px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "var(--off-white)", border: "1px solid var(--border)", borderLeft: "4px solid var(--accent)", borderRadius: "6px", padding: "20px", marginTop: "32px" }}>
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "10px" }}>
              📌 Antes de Financiar Cualquier Reparación
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Obtenga múltiples estimados escritos de contratistas con licencia",
                "Verifique que el seguro no cubra el trabajo antes de financiarlo",
                "Lea todos los términos del préstamo o financiamiento completamente antes de firmar",
                "Entienda la tasa de interés, el pago mensual y el costo total",
                "Nunca tome decisiones de pago bajo presión de un contratista",
              ].map((tip) => (
                <li key={tip} style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <DisclaimerBoxES type="financing" />
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas sobre Financiamiento de Reparaciones" />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            ¿Necesita Ayuda para Explorar Financiamiento de Reparaciones?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Envíe una solicitud y lo conectaremos con recursos para evaluar sus opciones de financiamiento para reparaciones del hogar de emergencia y planificadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Solicitar Ayuda Ahora
            </Link>
            <Link href="/es/guides/financiamiento-reemplazo-hvac-basicos" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Ver Guía de Financiamiento HVAC
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
