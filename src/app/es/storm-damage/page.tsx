import type { Metadata } from "next";
import Link from "next/link";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con Daños por Tormenta en Texas",
  description:
    "Aprenda qué hacer después de daños por granizo, viento o tormenta en su propiedad en Texas. Texas Property Help conecta a propietarios con recursos para evaluación de daños, documentación y referencias para reparaciones de emergencia.",
  alternates: pageAlternates("/storm-damage", "/es/storm-damage", true),
};

const steps = [
  { step: "1", title: "Priorice la Seguridad Primero", body: "Antes de inspeccionar los daños, confirme que no hay peligros estructurales, cables eléctricos caídos o fugas de gas. Llame al 911 si hay peligro inmediato." },
  { step: "2", title: "Documente Todo Antes de Tocar Nada", body: "Tome fotos y videos de todos los daños visibles — techo, revestimiento, ventanas, daños interiores por agua — antes de limpiar o hacer reparaciones temporales." },
  { step: "3", title: "Haga Reparaciones Temporales", body: "Si hay una fuga activa o ventanas rotas, haga reparaciones temporales para evitar más daño por agua — lonas sobre el techo, plástico sobre ventanas rotas. Guarde todos los recibos." },
  { step: "4", title: "Contacte a su Aseguradora", body: "Presente una reclamación rápidamente. La ley de Texas generalmente requiere presentar reclamaciones dentro de un año. Anote su número de reclamación y la información del ajustador." },
  { step: "5", title: "Solicite una Evaluación de Propiedad", body: "Use Texas Property Help para solicitar una referencia a una evaluación profesional de daños que respalde su documentación de seguro." },
];

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto tiempo tengo para presentar una reclamación de daños por tormenta en Texas?",
    answer: "La ley de Texas generalmente requiere que los propietarios presenten una reclamación dentro de un año de la fecha del evento de tormenta, pero su póliza específica puede tener plazos diferentes. Contacte a su aseguradora inmediatamente después de los daños.",
  },
  {
    question: "¿El seguro de mi hogar cubre daños por granizo?",
    answer: "La mayoría de las pólizas estándar de propietarios de Texas incluyen cobertura por daños de granizo y viento, pero los montos de cobertura, deducibles y exclusiones varían. Revise la página de declaraciones de su póliza o contacte a su agente.",
  },
  {
    question: "¿Qué es un deducible de granizo separado?",
    answer: "Muchas pólizas de Texas tienen un deducible separado y generalmente más alto para daños causados por granizo o viento. Este deducible puede ser un porcentaje del valor asegurado de su hogar. Revise su póliza cuidadosamente.",
  },
  {
    question: "¿Puedo obtener ayuda si la tormenta ocurrió hace semanas?",
    answer: "Sí — siempre que esté dentro del plazo de reclamación de su póliza y los daños estén documentados, aún puede tener opciones. Recomendamos actuar rápido para no perder plazos.",
  },
];

export default function StormDamageESPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>Daños por Tormenta</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Ayuda con Daños por Tormenta para Propietarios de Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7, marginBottom: "28px" }}>
            El granizo, los vientos fuertes y las tormentas severas pueden causar daños graves a su hogar. Saber qué pasos tomar — rápido y en el orden correcto — puede proteger su propiedad y su reclamación de seguro.
          </p>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
            Solicitar Ayuda por Daños de Tormenta →
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "32px" }}>
            Tipos de Daños por Tormenta con los que Ayudamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌨️", title: "Daños por Granizo", body: "El granizo puede dañar techos, canaletas, revestimiento, ventanas, unidades de HVAC y vehículos. Los daños pueden no ser visibles desde el suelo." },
              { icon: "💨", title: "Daños por Viento", body: "Los vientos fuertes pueden levantar tejas, dañar fascias, romper ventanas y derribar árboles o cercas sobre estructuras." },
              { icon: "💧", title: "Fugas de Techo", body: "Las fugas de techo relacionadas con tormentas necesitan atención inmediata para prevenir moho, daños estructurales y daños interiores adicionales." },
              { icon: "🌊", title: "Infiltración de Agua", body: "Las inundaciones y la infiltración de agua por tormentas pueden dañar pisos, paredes y sistemas eléctricos. La documentación es crítica." },
              { icon: "🌩️", title: "Cobertura Temporal con Lona", body: "La impermeabilización temporal después de daños por tormenta puede prevenir pérdidas adicionales y a menudo es un servicio cubierto por su póliza." },
              { icon: "📋", title: "Documentación para el Seguro", body: "Reunir la documentación correcta — fotos, informes de inspección, estimados de reparación — es esencial para un proceso de reclamación sin problemas." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "var(--off-white)", borderRadius: "10px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--off-white)" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "32px" }}>
            Qué Hacer Después de Daños por Tormenta
          </h2>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: "20px", backgroundColor: "white", borderRadius: "10px", padding: "24px", border: "1px solid var(--border)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <DisclaimerBoxES type="insurance" />
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas sobre Daños por Tormenta" />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            ¿Daños por Tormenta? Déjenos Ayudarle a Comenzar.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Envíe una solicitud y lo conectaremos con recursos locales para evaluación de daños, apoyo en reclamaciones de seguro y reparaciones de emergencia.
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
