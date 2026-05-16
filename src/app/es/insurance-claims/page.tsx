import type { Metadata } from "next";
import Link from "next/link";
import FAQES from "@/components/sections/es/FAQES";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Ayuda con Reclamaciones de Seguro para Propietarios de Texas",
  description:
    "Entienda el proceso de reclamación de seguro de propietarios en Texas. Texas Property Help ofrece orientación general sobre documentación y comunicación — no asesoría legal ni de seguros.",
  alternates: pageAlternates("/insurance-claims", "/es/insurance-claims", true),
};

const processSteps = [
  { step: "1", title: "Revise su Póliza", body: "Antes de presentar una reclamación, localice la página de declaraciones de su póliza. Anote su deducible, el tipo de cobertura (ACV vs RCV) y cualquier exclusión relevante al tipo de daño." },
  { step: "2", title: "Documente los Daños", body: "Tome fotos y videos detallados antes de cualquier limpieza. Documente la fecha, hora y causa del daño. Incluya daños interiores y exteriores, y cualquier propiedad personal afectada." },
  { step: "3", title: "Haga Reparaciones Temporales", body: "Prevenga daños adicionales con medidas temporales (lonas, tableros). Guarde todos los recibos — muchas pólizas cubren costos razonables de reparación de emergencia." },
  { step: "4", title: "Presente su Reclamación", body: "Contacte a su compañía de seguros para presentar la reclamación. Recibirá un número de reclamación y se le asignará un ajustador. Documente toda comunicación." },
  { step: "5", title: "Prepárese para la Visita del Ajustador", body: "El ajustador inspeccionará la propiedad. Tenga lista su documentación. Tiene permitido que su propio contratista esté presente para señalar los daños." },
  { step: "6", title: "Revise la Oferta de Liquidación", body: "Su aseguradora proporcionará un estimado de reclamación. Revíselo cuidadosamente. Si no está de acuerdo, tiene derecho a disputar el monto — consulte a un ajustador público con licencia o un abogado si es necesario." },
];

const faqs: FAQItem[] = [
  {
    question: "¿Qué es un ajustador público y necesito uno?",
    answer:
      "Un ajustador público es un profesional con licencia que representa sus intereses — no los de la aseguradora — en una reclamación de daños a la propiedad. Pueden ayudar a maximizar su liquidación, pero generalmente cobran un porcentaje de la reclamación. Esta es una decisión personal. Texas Property Help no recomienda ni avala ajustadores específicos.",
  },
  {
    question: "¿Qué es un deducible y cuándo lo pago?",
    answer:
      "Su deducible es la porción de una pérdida cubierta que usted paga de su bolsillo antes de que el seguro pague. Por ejemplo, si su deducible es $2,500 y el daño cubierto es $10,000, el seguro pagaría $7,500. Nota: muchas pólizas de Texas tienen deducibles separados y más altos para tormentas nombradas o granizo.",
  },
  {
    question: "¿Puede un contratista 'trabajar con mi seguro' para cubrir mi deducible?",
    answer:
      "En Texas, es ilegal que un contratista renuncie, absorba o de otro modo pague el deducible de seguro de un propietario. Esto es fraude de seguros. Tenga cuidado con cualquier contratista que sugiera que puede hacer 'desaparecer' su deducible.",
  },
  {
    question: "¿Qué pasa si mi reclamación es denegada?",
    answer:
      "Tiene el derecho de disputar una reclamación denegada. Las opciones incluyen solicitar una reinspección, presentar una queja ante el Departamento de Seguros de Texas, o consultar a un abogado con licencia o ajustador público.",
  },
  {
    question: "¿Cuánto tiempo toma una reclamación de seguro de propietarios?",
    answer:
      "La ley de Texas requiere que las aseguradoras reconozcan las reclamaciones dentro de 15 días, acepten o rechacen dentro de 15 días hábiles de recibir la documentación, y paguen dentro de 5 días hábiles de la aceptación. Los plazos pueden extenderse para reclamaciones complejas.",
  },
];

export default function InsuranceClaimsESPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Reclamaciones de Seguro
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Entendiendo el Proceso de Reclamación de Seguro de Propietarios
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7, marginBottom: "24px" }}>
            Presentar una reclamación de seguro de propietarios puede sentirse abrumador. Proporcionamos orientación general sobre el proceso — no asesoría legal ni de seguros — para ayudarle a navegar con más confianza.
          </p>
          <DisclaimerBoxES type="legal" />
          <div style={{ marginTop: "24px" }}>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Obtener Ayuda con su Reclamación →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--off-white)" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "32px" }}>
            El Proceso General de Reclamación
          </h2>
          <div className="space-y-4">
            {processSteps.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: "20px", backgroundColor: "white", borderRadius: "10px", padding: "24px", border: "1px solid var(--border)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "#374151", fontSize: "0.875rem", lineHeight: "1.6", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "10px", padding: "24px", marginTop: "32px" }}>
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>📎 Documentos Clave que Debe Conservar</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "La página de declaraciones de su póliza de seguro",
                "Número de reclamación e información de contacto del ajustador",
                "Toda comunicación escrita y por correo electrónico con su aseguradora",
                "Fotos y videos de todos los daños (con fecha)",
                "Estimados y facturas de contratistas",
                "Recibos de reparaciones temporales",
                "Un registro de daños con fechas y descripciones",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "#374151", paddingBottom: "8px", marginBottom: "8px", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <DisclaimerBoxES type="insurance" />
        </div>
      </section>

      <FAQES items={faqs} heading="Preguntas sobre Reclamaciones de Seguro" />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            ¿Necesita Ayuda con una Reclamación de Seguro de Propiedad?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Envíe una solicitud y lo conectaremos con recursos que le ayuden a documentar los daños y entender el proceso general de reclamación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Obtener Ayuda Ahora
            </Link>
            <Link href="/es/guides/lista-verificacion-reclamacion-seguro-techo" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Ver Lista de Verificación
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
