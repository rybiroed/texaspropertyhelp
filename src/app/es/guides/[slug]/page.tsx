import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ES } from "@/lib/translations-es";
import DisclaimerBoxES from "@/components/sections/es/DisclaimerBoxES";

const categoryLabels: Record<string, string> = {
  "storm-damage": "Daños por Tormenta",
  roofing: "Techado",
  hvac: "HVAC",
  "insurance-claims": "Seguro",
  financing: "Financiamiento",
  "emergency-repair": "Emergencia",
  general: "General",
};

function getGuideContent(slug: string) {
  const guides: Record<string, { disclaimer?: "insurance" | "legal" | "financing" | "general"; sections: { heading: string; content: string }[] }> = {
    "que-hacer-despues-de-danos-por-granizo-texas": {
      disclaimer: "insurance",
      sections: [
        { heading: "Paso 1: Priorice la Seguridad", content: "Después de una tormenta de granizo, no suba al techo para inspeccionar los daños. Las superficies de techo mojadas o dañadas son resbaladizas y peligrosas. Busque daños visibles desde el suelo — canaletas abolladas, ventanas rotas, revestimiento dañado — y anote todo lo que pueda ver de manera segura." },
        { heading: "Paso 2: Documente Todo Antes de Tocar Nada", content: "Use su teléfono para tomar fotos y videos de todos los daños visibles — techo (desde el suelo), revestimiento, canaletas, bajantes, ventanas, pantallas de ventanas, unidad de HVAC/AC, vehículos y cualquier daño interior por agua. Registre la fecha en sus fotos. Esta documentación es crítica para su reclamación de seguro." },
        { heading: "Paso 3: Haga Reparaciones Temporales para Prevenir Más Daños", content: "Si hay una fuga activa de techo o ventanas rotas, haga reparaciones temporales para prevenir más infiltración de agua — lonas sobre áreas del techo, plástico sobre ventanas rotas. Guarde todos los recibos de estas reparaciones de emergencia. Muchas pólizas cubren costos razonables de reparación de emergencia." },
        { heading: "Paso 4: Contacte a su Aseguradora de Propietarios", content: "Presente una reclamación con su compañía de seguros rápidamente. La ley de Texas generalmente requiere presentar reclamaciones dentro de un año del evento. Tenga su número de póliza listo. Anote su número de reclamación, el nombre del ajustador y todas las fechas de comunicación." },
        { heading: "Paso 5: Prepárese para la Inspección del Ajustador", content: "Un ajustador de seguros programará una inspección. Puede tener a su propio contratista o inspector presente. Asegúrese de que todos los daños documentados en sus fotos sean visibles y accesibles. Lleve al ajustador a través de todo lo que documentó." },
        { heading: "Paso 6: Obtenga Estimados Independientes", content: "Antes de aceptar cualquier acuerdo, obtenga estimados de reparación escritos de contratistas con licencia. Esto le ayuda a comprender si el estimado de la aseguradora es apropiado. No está obligado a aceptar la primera oferta de liquidación." },
        { heading: "Recordatorios Importantes", content: "No firme ningún contrato de reparación antes de que se revise su reclamación de seguro. Tenga cuidado con contratistas que ofrecen 'manejar su seguro' o renunciar a su deducible — esto es ilegal en Texas. Siempre verifique la licencia de un contratista a través del Departamento de Licencias y Regulación de Texas." },
      ],
    },
    "lista-verificacion-reclamacion-seguro-techo": {
      disclaimer: "insurance",
      sections: [
        { heading: "Antes de Presentar", content: "☐ Localice su póliza de seguro de propietarios y la página de declaraciones\n☐ Anote el monto de su deducible y el tipo de cobertura (ACV vs RCV)\n☐ Verifique si su póliza tiene un deducible separado por viento/granizo\n☐ Registre la fecha, hora de la tormenta y cualquier cobertura de noticias o datos meteorológicos públicos del evento" },
        { heading: "Lista de Documentación", content: "☐ Fotos y videos de todos los daños exteriores (techo, canaletas, revestimiento, ventanas, unidad de AC)\n☐ Fotos y videos de daños interiores (manchas en el techo, daños en paredes, infiltración de agua)\n☐ Descripción escrita de cuándo se descubrieron los daños\n☐ Registro de cualquier reparación o mantenimiento previo del techo\n☐ Recibos de cualquier reparación temporal de emergencia (lonas, tablas)" },
        { heading: "Presentación de la Reclamación", content: "☐ Contacte a su aseguradora para abrir una reclamación (tenga el número de póliza listo)\n☐ Registre su número de reclamación\n☐ Anote el nombre de su ajustador asignado y su información de contacto\n☐ Confirme la fecha y hora de la inspección programada por escrito" },
        { heading: "Visita del Ajustador", content: "☐ Tenga toda su documentación y fotos disponibles\n☐ Lleve al ajustador a través de todos los daños documentados\n☐ Pida el alcance de la pérdida del ajustador por escrito después de la visita\n☐ Puede tener a un contratista con licencia presente — considere programar uno" },
        { heading: "Después del Estimado", content: "☐ Revise cuidadosamente el alcance de daños y el estimado de la aseguradora\n☐ Compare con estimados de contratistas independientes\n☐ Si no está de acuerdo, documente las discrepancias por escrito\n☐ Guarde todos los registros de comunicación\n☐ Consulte a un ajustador público con licencia o abogado si necesita disputar" },
      ],
    },
    "fuga-techo-emergencia-pasos": {
      disclaimer: "general",
      sections: [
        { heading: "Paso 1: Proteja a las Personas y la Propiedad Ahora", content: "Mueva muebles, electrónicos y objetos de valor lejos de las fugas activas. Coloque cubetas, toallas o plástico para capturar el agua. Si hay preocupación por seguridad eléctrica (agua cerca de enchufes o paneles), apague la electricidad en las áreas afectadas y llame a un electricista." },
        { heading: "Paso 2: Encuentre la Fuente de la Fuga de Forma Segura", content: "Trabaje desde adentro — busque manchas de agua o goteos activos en el techo. El agua a menudo viaja por las vigas antes de gotear, por lo que el lugar visible de humedad puede no estar directamente debajo de la fuga. No suba al techo durante la lluvia o si el techo está mojado." },
        { heading: "Paso 3: Aplique una Solución Interior Temporal", content: "Si puede acceder al ático de forma segura, colocar una cubeta debajo de la fuga y plástico sobre el aislamiento puede reducir los daños interiores. No intente reparar el techo desde adentro — esto no es una solución permanente." },
        { heading: "Paso 4: Cubra el Techo con Lona (Cuando Sea Seguro)", content: "Una vez que haya parado la lluvia y sea seguro acceder al techo, una lona impermeable asegurada sobre el área de la fuga puede prevenir la infiltración adicional de agua. Use tablas pesadas o sacos de arena para asegurar los bordes de la lona. Guarde todos los recibos de materiales." },
        { heading: "Paso 5: Documente Todo", content: "Tome fotos y videos con fecha de todos los daños interiores y exteriores antes, durante y después de las reparaciones temporales. Esta documentación respalda su reclamación de seguro." },
        { heading: "Paso 6: Contacte a su Compañía de Seguros", content: "Notifique a su aseguradora de los daños. Un ajustador deberá evaluar los daños. Presentar rápidamente es importante — la mayoría de las pólizas tienen requisitos de tiempo." },
        { heading: "Paso 7: Solicite una Evaluación Profesional", content: "Una solución temporal no es una reparación permanente. Contacte a un contratista de techos con licencia para una evaluación profesional de la causa y el alcance total del daño. Guarde todos los estimados para su reclamación." },
      ],
    },
    "financiamiento-reemplazo-hvac-basicos": {
      disclaimer: "financing",
      sections: [
        { heading: "Por Qué el Financiamiento de HVAC Importa en Texas", content: "El reemplazo de sistemas de HVAC es una de las reparaciones del hogar más costosas — a menudo de $5,000 a $15,000 o más dependiendo del tipo de sistema y el tamaño del hogar. En Texas, un HVAC que funcione no es opcional. Conocer sus opciones de financiamiento antes de una crisis le brinda mejores alternativas." },
        { heading: "Opción 1: Préstamos Personales / para Mejoras del Hogar", content: "Los préstamos personales no garantizados están disponibles de bancos, cooperativas de crédito y prestamistas en línea específicamente para reparaciones del hogar. No necesita capital en su hogar. Las tasas de interés varían según el puntaje crediticio y el prestamista. Compare múltiples ofertas antes de decidir." },
        { heading: "Opción 2: Línea de Crédito sobre el Valor de la Vivienda (HELOC)", content: "Si tiene capital en su hogar, un HELOC o préstamo sobre el valor de la vivienda puede ofrecer tasas de interés más bajas. Estos préstamos usan su hogar como garantía. El proceso de aprobación puede tomar varias semanas — planifique con anticipación si es posible." },
        { heading: "Opción 3: Financiamiento del Contratista o Fabricante", content: "Muchos contratistas de HVAC y fabricantes ofrecen financiamiento directamente o a través de socios prestamistas. Los términos varían ampliamente. Los períodos promocionales de 0% de interés son comunes, pero regresan a tasas altas si no se pagan a tiempo. Lea el acuerdo completo cuidadosamente antes de firmar." },
        { heading: "Opción 4: Reembolsos y Financiamiento de Servicios Públicos", content: "Las compañías de servicios públicos de Texas (AEP Texas, Oncor, CPS Energy, etc.) a veces ofrecen reembolsos o financiamiento de bajo interés para actualizaciones de HVAC eficientes energéticamente. Los programas cambian. Verifique directamente con su proveedor de servicios públicos para las ofertas actuales." },
        { heading: "Opción 5: Programas de Asistencia de Emergencia", content: "Para propietarios de bajos ingresos, las Agencias de Acción Comunitaria, organizaciones sin fines de lucro locales y programas como LIHEAP (Programa de Asistencia de Energía para Hogares de Bajos Ingresos) pueden proporcionar asistencia. Llame al 211 de Texas (marque 2-1-1) para referencias locales en su área." },
        { heading: "Antes de Firmar Cualquier Acuerdo de Financiamiento", content: "Comprenda la tasa de interés (APR), el costo total del financiamiento, el monto del pago mensual, la duración del préstamo y cualquier penalidad por pago anticipado. Nunca firme bajo presión. Obtenga múltiples cotizaciones de contratistas antes de comprometerse con una oferta de financiamiento específica." },
      ],
    },
  };

  return guides[slug] || null;
}

export async function generateStaticParams() {
  return ES.guideCards.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = ES.guideCards.find((g) => g.slug === slug);
  if (!guide) return { title: "Guía no encontrada" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { languages: { "en-US": `https://texaspropertyhelp.com/guides` } },
  };
}

export default async function GuideDetailESPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = ES.guideCards.find((g) => g.slug === slug);
  if (!guide) notFound();

  const content = getGuideContent(slug);
  if (!content) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "es",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.lastUpdated,
    publisher: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/es/guides" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }} className="hover:text-white">
              ← Guías
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {categoryLabels[guide.category] ?? guide.category}
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "12px" }}>
            {guide.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
            {guide.readTime && `${guide.readTime} · `}
            Actualizado {new Date(guide.lastUpdated).toLocaleDateString("es-MX", { month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "32px", borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
            {guide.description}
          </p>

          <div className="space-y-10">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>
                  {section.heading}
                </h2>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: "1.8" }}>
                  {section.content.split("\n").map((line, i) => (
                    <p key={i} style={{ marginBottom: "8px" }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {content.disclaimer && <DisclaimerBoxES type={content.disclaimer} />}

          <div style={{ backgroundColor: "var(--off-white)", borderRadius: "10px", padding: "24px", marginTop: "40px" }}>
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "1rem", marginBottom: "12px" }}>
              ¿Necesita ayuda personalizada con su propiedad?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "16px" }}>
              Envíe una solicitud y lo conectaremos con recursos apropiados para su situación específica.
            </p>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.9rem", padding: "12px 24px", borderRadius: "6px" }} className="hover:opacity-90">
              Solicitar Ayuda →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            ¿Más Preguntas sobre su Propiedad?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              Ver Todas las Guías
            </Link>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              Solicitar Ayuda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
