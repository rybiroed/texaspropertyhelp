import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Check Your Roof After a Storm in Texas | Texas Property Help",
  description:
    "Step-by-step guide for Texas homeowners: how to inspect your roof after hail or a storm, what to document, when to file an insurance claim, and how to find a licensed roofer.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/guides/how-to-check-roof-after-storm-texas",
    languages: { "es-US": "https://texaspropertyhelp.com/es/guides/como-revisar-techo-despues-tormenta" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Check Your Roof After a Storm in Texas",
      description:
        "Step-by-step guide for Texas homeowners: inspect your roof after hail, document damage, decide whether to file an insurance claim, and find a licensed contractor.",
      datePublished: "2026-05-31",
      dateModified: "2026-05-31",
      author: { "@type": "Organization", name: "Texas Property Help" },
      publisher: {
        "@type": "Organization",
        name: "Texas Property Help",
        url: "https://texaspropertyhelp.com",
      },
      mainEntityOfPage: "https://texaspropertyhelp.com/guides/how-to-check-roof-after-storm-texas",
      keywords: "how to check roof after storm Texas, roof inspection after hail Texas, storm damage roof Texas, hail damage insurance claim",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to call my insurance before the roofer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Call a roofer first for a free inspection. If they find real damage, then file the claim. Filing a claim before you know what you're dealing with can backfire.",
          },
        },
        {
          "@type": "Question",
          name: "How long do I have to file a hail claim in Texas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most policies allow 1–2 years from the storm date. Check your policy — some carriers are shortening this window. Don't wait.",
          },
        },
        {
          "@type": "Question",
          name: "Will my rates go up if I file a claim?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Probably yes, somewhat. Roof replacement claims from hail are considered 'acts of nature' and usually raise rates less than liability or water damage claims. The bigger risk is filing a small claim that gets denied but still goes on your record.",
          },
        },
        {
          "@type": "Question",
          name: "What size hail actually damages a roof?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In general: 1 inch (quarter-size) or larger can damage composition shingles. Smaller hail may damage older, brittle shingles. On metal roofs, even pea-sized hail can dent softer metals like aluminum.",
          },
        },
        {
          "@type": "Question",
          name: "Should I fix a small leak myself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only if you're 100% sure it's minor and you know what you're doing. Most DIY roof repairs in Texas end up either voiding the warranty or making the insurance claim harder. A roofer can seal a small penetration properly for $150–300.",
          },
        },
      ],
    },
  ],
};

const tableRows = [
  ["Clear hail damage across multiple roof slopes", "One or two small dents"],
  ["Missing shingles with exposed underlayment", "Granule loss from age (wear, not storm)"],
  ["Gutters and AC units also damaged", "No interior leaks or visible penetration"],
  ["Roof is under 15 years old", "Roof is 20+ years old nearing end of life"],
];

export default function HowToCheckRoofAfterStorm() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ backgroundColor: "#7c2d12", color: "#fed7aa", fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Storm Damage
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>6 min read · Updated May 2026</span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            How to Check Your Roof After a Storm in Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px" }}>
            Texas hail season runs March through June, with a second peak in the fall. If a storm just rolled through your neighborhood, here's exactly what to do — in order — to protect your roof, your home, and your insurance claim.
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
            🇪🇸 <Link href="/es/guides/como-revisar-techo-despues-tormenta" style={{ color: "var(--accent)" }}>Ver en español</Link>
          </p>
        </div>
      </section>

      {/* Content */}
      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ color: "var(--content-primary)", lineHeight: 1.75, fontSize: "1rem" }}>

          {/* Step 1 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", marginTop: "0", color: "var(--navy)" }}>
            1. Wait Until It&apos;s Safe
          </h2>
          <p style={{ marginBottom: "24px" }}>
            Do not go on your roof during or immediately after a storm. Wet shingles are extremely slippery, and hidden damage (loose flashing, lifted shingles) can make the roof unstable. Wait until the storm has passed and the roof is dry — usually the next morning.
          </p>

          {/* Step 2 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy)" }}>
            2. Do a Ground Inspection First
          </h2>
          <p style={{ marginBottom: "12px" }}>Walk around your house and look for these signs from ground level:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Granules in the gutters</strong> — a lot of black/gray sand-like material means shingles lost their protective coating</li>
            <li style={{ marginBottom: "8px" }}><strong>Dented gutters, downspouts, or AC units</strong> — hail that dents metal almost certainly damaged your roof</li>
            <li style={{ marginBottom: "8px" }}><strong>Bruised or missing shingles</strong> — look for dark spots on asphalt shingles (bruises) or bare spots where granules are gone</li>
            <li style={{ marginBottom: "8px" }}><strong>Broken tree branches</strong> — limbs on the roof can scrape off granules and puncture the underlayment</li>
            <li style={{ marginBottom: "8px" }}><strong>Cracked skylights or roof vents</strong> — these are weak points and often the first to show hail damage</li>
          </ul>

          {/* Step 3 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy)" }}>
            3. Then Go Up (If Comfortable and Safe)
          </h2>
          <p style={{ marginBottom: "12px" }}>If you can safely access your roof with a ladder, check:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Shingle condition</strong> — press down gently on suspect areas. If the shingle feels soft or spongy (like a bruised apple), the fiberglass mat underneath is fractured</li>
            <li style={{ marginBottom: "8px" }}><strong>Flashing</strong> — look for dents, separation, or lifted edges around chimneys, vents, and skylights</li>
            <li style={{ marginBottom: "8px" }}><strong>Ridge caps</strong> — these take the most direct hail impact and often show damage first</li>
            <li style={{ marginBottom: "8px" }}><strong>Pipe boots</strong> — rubber seals around plumbing vents crack in the Texas sun; hail can finish them off</li>
          </ul>
          <div style={{ backgroundColor: "#fef3c7", border: "1px solid #fcd34d", borderRadius: "6px", padding: "14px 18px", marginBottom: "24px" }}>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>⚠️ <strong>If you&apos;re not comfortable on a roof, stop here.</strong> Don&apos;t risk a fall for a DIY inspection. A licensed roofer will do it for free.</p>
          </div>

          {/* Step 4 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy)" }}>
            4. Document Everything
          </h2>
          <p style={{ marginBottom: "12px" }}>Take photos and video of:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
            <li style={{ marginBottom: "8px" }}>Every dent, bruise, or missing granule spot</li>
            <li style={{ marginBottom: "8px" }}>Gutters with granule accumulation</li>
            <li style={{ marginBottom: "8px" }}>Dented AC units, outdoor faucets, or metal patio covers (these help prove hail size and severity)</li>
            <li style={{ marginBottom: "8px" }}>Time-stamped shots of the damage before any repairs</li>
          </ul>
          <p style={{ marginBottom: "24px", fontStyle: "italic", color: "var(--content-secondary)" }}>
            This documentation is your strongest tool when filing an insurance claim.
          </p>

          {/* Step 5 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy)" }}>
            5. Call a Licensed Roofing Contractor for a Free Inspection
          </h2>
          <p style={{ marginBottom: "12px" }}>Most reputable Texas roofers offer free inspections. A licensed contractor will:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
            <li style={{ marginBottom: "8px" }}>Walk the roof and take their own photos</li>
            <li style={{ marginBottom: "8px" }}>Identify hail versus wind versus wear damage</li>
            <li style={{ marginBottom: "8px" }}>Give you an honest assessment of whether a claim is worth filing</li>
            <li style={{ marginBottom: "8px" }}>Help with the insurance supplement process if needed</li>
          </ul>
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "14px 18px", marginBottom: "24px" }}>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>🚩 <strong>Avoid door-knockers who show up the day after a storm.</strong> Use a local company with verifiable reviews and a physical address in your city.</p>
          </div>

          {/* Step 6 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy)" }}>
            6. Contact Your Homeowners Insurance — If Appropriate
          </h2>
          <p style={{ marginBottom: "16px" }}>Not every storm requires a claim. Here&apos;s how to decide:</p>
          <div style={{ overflowX: "auto", marginBottom: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--navy)", color: "white" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700 }}>Do file a claim</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700 }}>Don&apos;t file a claim</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([yes, no], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f9fafb" : "white" }}>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>✅ {yes}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>❌ {no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "6px", padding: "14px 18px", marginBottom: "24px" }}>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>📌 Every claim goes on your CLUE report — too many claims (even small ones) can raise your rates or get you non-renewed. Don&apos;t file for minor damage.</p>
          </div>

          {/* Step 7 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy)" }}>
            7. If You File a Claim
          </h2>
          <ul style={{ paddingLeft: "20px", marginBottom: "32px" }}>
            <li style={{ marginBottom: "8px" }}>You&apos;ll pay your deductible (typically 1–2% of your home&apos;s insured value for hail)</li>
            <li style={{ marginBottom: "8px" }}>The adjuster will inspect and write a scope of work</li>
            <li style={{ marginBottom: "8px" }}>Your contractor can submit a supplement if the adjuster missed items</li>
            <li style={{ marginBottom: "8px" }}>In Texas, you typically have 1–2 years from the storm date to file (check your policy)</li>
          </ul>

          {/* Divider */}
          <hr style={{ border: "none", borderTop: "2px solid var(--content-border)", margin: "40px 0" }} />

          {/* Spanish version */}
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "24px", marginBottom: "40px" }}>
            <p style={{ fontWeight: 700, color: "#166534", marginBottom: "6px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>🇪🇸 En Español</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "#14532d", marginBottom: "16px" }}>
              Cómo revisar tu techo después de una tormenta en Texas
            </h2>
            <p style={{ marginBottom: "12px", color: "#166534" }}>La temporada de granizo en Texas va de marzo a junio. Si acaba de pasar una tormenta, esto es lo que debes hacer paso a paso.</p>

            <ol style={{ paddingLeft: "20px", color: "#15803d" }}>
              <li style={{ marginBottom: "10px" }}><strong>Espera a que sea seguro</strong> — No te subas al techo durante la tormenta ni inmediatamente después. Las tejas mojadas son muy resbaladizas. Espera al día siguiente.</li>
              <li style={{ marginBottom: "10px" }}><strong>Inspecciona desde el suelo</strong> — Busca granulado en las canaletas (arena negra/gris), canaletas abolladas, tejas con manchas oscuras, ramas rotas, y claraboyas rotas.</li>
              <li style={{ marginBottom: "10px" }}><strong>Si te sientes seguro, sube al techo</strong> — Revisa tejas que se sientan blandas, flashing alrededor de chimeneas, tapas de cumbre, y sellos de goma (pipe boots).</li>
              <li style={{ marginBottom: "10px" }}><strong>Toma fotos de TODO</strong> — Cada abolladura, cada mancha, canaletas con granulado, y tu unidad de AC. Estas fotos son tu mejor evidencia para el seguro.</li>
              <li style={{ marginBottom: "10px" }}><strong>Llama a un contratista con licencia</strong> — La mayoría ofrece inspección gratuita. ⚠️ Cuidado con los que tocan puertas después de la tormenta.</li>
              <li style={{ marginBottom: "10px" }}><strong>Decide si hacer el reclamo</strong> — Haz el reclamo si hay daño visible en varias áreas, tejas faltantes, o canaletas y AC dañados. Cada reclamo queda en tu historial CLUE.</li>
              <li style={{ marginBottom: "0" }}><strong>Si haces el reclamo</strong> — Pagas tu deducible, el ajustador inspecciona, y tu contratista puede pedir un suplemento si el ajustador no incluyó todo.</li>
            </ol>
          </div>

          {/* FAQ */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "24px", color: "var(--navy)" }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "Do I need to call my insurance before the roofer?",
              a: "No. Call a roofer first for a free inspection. If they find real damage, then file the claim. Filing a claim before you know what you're dealing with can backfire.",
            },
            {
              q: "How long do I have to file a hail claim in Texas?",
              a: "Most policies allow 1–2 years from the storm date. Check your policy — some carriers are shortening this window. Don't wait.",
            },
            {
              q: "Will my rates go up if I file a claim?",
              a: "Probably yes, somewhat. Roof replacement claims from hail are considered \"acts of nature\" and usually raise rates less than liability or water damage claims. The bigger risk is filing a small claim that gets denied but still goes on your record.",
            },
            {
              q: "What size hail actually damages a roof?",
              a: "In general: 1 inch (quarter-size) or larger can damage composition shingles. Smaller hail may damage older, brittle shingles. On metal roofs, even pea-sized hail can dent softer metals like aluminum.",
            },
            {
              q: "Should I fix a small leak myself?",
              a: "Only if you're 100% sure it's minor and you know what you're doing. Most DIY roof repairs in Texas end up either voiding the warranty or making the insurance claim harder. A roofer can seal a small penetration properly for $150–300 — worth the peace of mind.",
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: "1px solid var(--content-border)", paddingBottom: "20px", marginBottom: "20px" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "8px", color: "var(--content-primary)" }}>{q}</h3>
              <p style={{ color: "var(--content-secondary)", margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>
            Need Help Finding a Licensed Roofer in Texas?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "24px", fontSize: "0.95rem" }}>
            Free matching with local, licensed contractors who know the insurance claim process.
          </p>
          <Link
            href="/request-help"
            style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", borderRadius: "4px", textDecoration: "none" }}
          >
            Get Matched with a Contractor →
          </Link>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "14px" }}>
            🇪🇸 ¿Necesitas ayuda en español?{" "}
            <Link href="/es/request-help" style={{ color: "var(--accent)" }}>Solicita ayuda aquí</Link>
          </p>
        </div>
      </section>
    </>
  );
}
