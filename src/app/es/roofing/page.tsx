import type { Metadata } from "next";
import Link from "next/link";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con Techado en Texas",
  description:
    "Texas Property Help conecta a propietarios de Texas con recursos para inspección, reparación y reemplazo de techos. Sepa qué esperar y cómo navegar reclamaciones de seguro relacionadas con su techo.",
  alternates: pageAlternates("/roofing", "/es/roofing", true),
};

const roofServices = [
  { icon: "🔍", title: "Inspección de Techo", body: "Una inspección profesional puede identificar daños, evaluar la vida útil restante y documentar problemas para reclamaciones de seguro." },
  { icon: "🔧", title: "Reparación de Techo", body: "Reparaciones parciales para áreas específicas dañadas — tejas faltantes, problemas de revestimiento, fugas pequeñas — cuando no se necesita reemplazo completo." },
  { icon: "🏗️", title: "Reemplazo de Techo", body: "Re-techado completo cuando el daño es extenso, el techo llegó al final de su vida útil, o la aseguradora requiere reemplazo tras una pérdida cubierta." },
  { icon: "📋", title: "Apoyo en Reclamaciones de Seguro", body: "Le ayudamos a entender qué documentación necesita su aseguradora y cómo comunicarse eficazmente durante el proceso de reclamación." },
  { icon: "💧", title: "Respuesta a Fugas de Emergencia", body: "Las fugas activas de techo necesitan atención inmediata. Podemos conectarle con recursos de respuesta de emergencia." },
  { icon: "💳", title: "Opciones de Financiamiento", body: "Los costos de techado pueden ser significativos. Explore opciones de financiamiento que pueden ayudar cuando el seguro no cubre el costo total." },
];

const faqs: FAQItem[] = [
  {
    question: "¿Cómo sé si necesito reparación de techo o reemplazo completo?",
    answer:
      "La decisión depende de la extensión y tipo de daño, la edad del techo y los términos de su póliza de seguro. Una inspección profesional puede darle información factual para tomar una decisión informada. Podemos conectarle con un inspector.",
  },
  {
    question: "¿Mi seguro pagará un techo nuevo?",
    answer:
      "Si el seguro cubre el trabajo de techo depende de su póliza específica, la causa del daño, la edad del techo y si el daño supera el deducible. Las aseguradoras determinan esto según su propia evaluación — no está garantizado.",
  },
  {
    question: "¿Cuánto tiempo dura normalmente un reemplazo de techo en Texas?",
    answer:
      "La mayoría de los reemplazos residenciales toman de uno a tres días, dependiendo del tamaño del hogar, el material de techado, las condiciones climáticas y el calendario del contratista. Confirme el tiempo con el contratista que contrate.",
  },
  {
    question: "¿Puedo elegir mi propio contratista de techado para una reclamación de seguro?",
    answer:
      "En Texas, los propietarios generalmente tienen el derecho de elegir su propio contratista con licencia. Sin embargo, confirme con su aseguradora qué documentación y estimados requieren. Los contratistas deben proporcionar estimados escritos detallados.",
  },
  {
    question: "¿Qué es una garantía de mano de obra y por qué importa?",
    answer:
      "Una garantía de mano de obra cubre errores de instalación realizados por el contratista, separada de la garantía del fabricante sobre los materiales. Al comparar estimados, pregunte por ambas garantías y obtenga los términos por escrito.",
  },
];

export default function RoofingESPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Techado
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Ayuda con Techado para Propietarios de Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7, marginBottom: "28px" }}>
            Desde inspecciones de rutina hasta reemplazos por daños de tormenta, los problemas de techado requieren documentación cuidadosa y decisiones informadas. Le ayudamos a entender sus opciones y conectarle con los profesionales adecuados.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Solicitar Ayuda con Techado →
            </Link>
            <Link href="/es/guides/lista-verificacion-reclamacion-seguro-techo" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Lista de Verificación para Reclamación
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "32px" }}>
            Servicios de Techado con los que Ayudamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roofServices.map((item) => (
              <div key={item.title} style={{ backgroundColor: "var(--off-white)", borderRadius: "10px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <DisclaimerBoxES type="insurance" />
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas sobre Techado" />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            ¿Problemas con su Techo? Déjenos Ayudarle.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Envíe una solicitud y lo conectaremos con recursos locales para inspección de techo, apoyo en reclamaciones de seguro y reparaciones de emergencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Solicitar Ayuda Ahora
            </Link>
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Ver Guías
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
