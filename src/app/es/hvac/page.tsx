import type { Metadata } from "next";
import Link from "next/link";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con HVAC en Texas",
  description:
    "Texas Property Help conecta a propietarios de Texas con recursos para reparación y reemplazo de HVAC. Obtenga orientación sobre reparación de emergencia de aire acondicionado y opciones de financiamiento.",
  alternates: pageAlternates("/hvac", "/es/hvac", true),
};

const faqs: FAQItem[] = [
  {
    question: "¿El seguro de hogar cubre fallas de HVAC?",
    answer:
      "Las pólizas estándar generalmente no cubren fallas de HVAC por desgaste normal. Sin embargo, daños por tormenta a una unidad de HVAC — como granizo que golpea el condensador — pueden estar cubiertos. Revise su póliza o contacte a su agente.",
  },
  {
    question: "¿Qué debo hacer si mi aire acondicionado deja de funcionar durante el verano de Texas?",
    answer:
      "Para alivio inmediato: cierre persianas y cortinas, use ventiladores para circular el aire, minimice el uso de aparatos que generen calor y considere alojamiento temporal si tiene miembros vulnerables en el hogar (personas mayores, bebés, mascotas). Luego solicite asistencia de emergencia para HVAC.",
  },
  {
    question: "¿Cuánto duran los sistemas de HVAC en Texas?",
    answer:
      "Los sistemas de HVAC en Texas a menudo trabajan más duro debido al calor extremo. Los aires acondicionados en Texas pueden durar 10 a 15 años, a veces menos, dependiendo del mantenimiento y el uso. Una evaluación profesional puede darle información específica sobre su sistema.",
  },
  {
    question: "¿Hay opciones de financiamiento para el reemplazo de HVAC?",
    answer:
      "Sí — pueden estar disponibles varias opciones de financiamiento para reemplazo de HVAC, incluyendo financiamiento del fabricante, préstamos para mejoras del hogar y algunos programas de reembolso de servicios públicos. Nuestra página de financiamiento provee más información.",
  },
  {
    question: "¿Los daños por tormenta pueden causar problemas de HVAC?",
    answer:
      "Sí. El granizo puede abollar y dañar las aletas y bobinas del condensador. Las inundaciones pueden dañar componentes eléctricos y la base de la unidad. Si tiene daños por tormenta y problemas de HVAC juntos, documente ambos al presentar su reclamación de seguro.",
  },
];

export default function HVACESPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            HVAC
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Ayuda con Reparación y Reemplazo de HVAC en Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7, marginBottom: "28px" }}>
            En el calor de Texas, un sistema de HVAC que falla es más que una incomodidad — puede ser un riesgo para la salud. Ya sea que necesite reparación de emergencia o esté evaluando opciones de reemplazo, podemos conectarle con los recursos adecuados.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Solicitar Ayuda con HVAC →
            </Link>
            <Link href="/es/financing" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Explorar Opciones de Financiamiento
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "32px" }}>
            Cómo Ayudamos con Problemas de HVAC
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🚨", title: "Reparación de Emergencia", body: "Para situaciones urgentes — especialmente durante el calor extremo de Texas — podemos ayudarle a conectar con recursos de servicio de emergencia de HVAC." },
              { icon: "🔧", title: "Referencias para Reparación", body: "Ayudamos a conectar a los propietarios con técnicos calificados de HVAC para diagnóstico y reparación de sistemas de enfriamiento, calefacción y ventilación." },
              { icon: "🏗️", title: "Ayuda para Reemplazo de Sistema", body: "Cuando la reparación no es rentable, le ayudamos a entender el proceso de reemplazo, qué preguntas hacer y cómo evaluar presupuestos." },
              { icon: "⛈️", title: "Daños de HVAC por Tormenta", body: "El granizo y las tormentas pueden dañar unidades exteriores de HVAC. Le ayudamos a entender cómo los daños por tormenta al HVAC pueden relacionarse con su reclamación de seguro." },
              { icon: "💳", title: "Financiamiento de HVAC", body: "El reemplazo de HVAC es un costo significativo. Podemos ayudarle a explorar opciones de financiamiento que pueden reducir la carga financiera inmediata." },
              { icon: "📋", title: "Documentación para Seguro", body: "Si hay daños por tormenta involucrados, la documentación correcta de los daños al HVAC es importante para una reclamación de seguro completa y precisa." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "var(--off-white)", borderRadius: "10px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#fff8f0", border: "1px solid #e8c898", borderLeft: "4px solid #e05c00", borderRadius: "6px", padding: "16px 20px", marginTop: "32px" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--charcoal)", fontWeight: 600, marginBottom: "6px" }}>
              ⚠️ Aviso de Seguridad por Calor
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              El calor extremo puede ser peligroso, especialmente para personas mayores, niños pequeños y personas con condiciones médicas. Si su HVAC falla durante una advertencia de calor, considere centros de enfriamiento, amigos o familiares, o alojamiento temporal mientras organiza las reparaciones.
            </p>
          </div>

          <DisclaimerBoxES type="general" />
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas Frecuentes sobre HVAC" />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            ¿Problemas con su HVAC en Texas?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Envíe una solicitud y lo conectaremos con recursos de reparación, reemplazo y financiamiento de HVAC en su área.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Solicitar Ayuda Ahora
            </Link>
            <Link href="/es/financing" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Ver Opciones de Financiamiento
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
