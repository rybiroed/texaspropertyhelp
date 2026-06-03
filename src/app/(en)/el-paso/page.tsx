import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "El Paso Storm Damage Help — Free Roofing, HVAC & Insurance Claim Guidance",
  description:
    "Free help for El Paso homeowners after wind, hail, or storm damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim. Bilingual EN/ES service.",
  alternates: { canonical: "https://texaspropertyhelp.com/el-paso" },
  openGraph: {
    title: "El Paso Storm Damage Help — Free Roofing, HVAC & Insurance Claim Guidance",
    description: "Free help for El Paso homeowners after wind, hail, or storm damage. TDLR-licensed contractors, insurance claim guidance, bilingual EN/ES.",
    url: "https://texaspropertyhelp.com/el-paso",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/el-paso#localbusiness",
  "name": "Texas Property Help — El Paso",
  "url": "https://texaspropertyhelp.com/el-paso",
  "description": "Free homeowner assistance for El Paso and El Paso County. Wind damage, roofing, HVAC, insurance claims. Bilingual EN/ES.",
  "areaServed": [
    { "@type": "City", "name": "El Paso" },
    { "@type": "City", "name": "Socorro" },
    { "@type": "City", "name": "Horizon City" },
    { "@type": "City", "name": "Anthony" },
    { "@type": "City", "name": "Fabens" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "What types of property damage are most common in El Paso?",
    answer:
      "El Paso's desert climate produces different storm risks than the rest of Texas. High winds — including dust storms (haboobs) that reach 60+ mph — cause significant roofing damage, broken windows, and fence damage. Monsoon season (July–September) brings intense but brief rain events that can cause flash flooding and roof leaks. Hail is less frequent than North Texas but does occur. HVAC demand is extreme in El Paso's summer heat, and storm-damaged units require prompt attention.",
  },
  {
    question: "Does El Paso homeowners insurance cover wind and dust storm damage?",
    answer:
      "Standard El Paso homeowners policies cover wind damage from storms, including haboob-related damage. Unlike coastal Texas, El Paso is not a TWIA zone — your homeowners policy covers both wind and hail under standard coverage. However, check your policy for any wind or hail deductible (typically 1–3% of insured value). Also note that flooding from monsoon rain requires a separate NFIP flood policy if you're in a flood-prone area near arroyos or the Rio Grande.",
  },
  {
    question: "Can I get help in Spanish in El Paso?",
    answer:
      "Yes. El Paso has one of the highest proportions of Spanish-speaking residents in Texas — over 80% of the population speaks Spanish at home. We offer full bilingual service. Visit texaspropertyhelp.com/es or select Spanish when submitting your request.",
  },
  {
    question: "What areas around El Paso do you serve?",
    answer:
      "We serve all of El Paso County including El Paso, Socorro, Horizon City, Anthony, Fabens, Clint, and surrounding communities. We also serve homeowners in nearby New Mexico communities who are seeking Texas contractor referrals for cross-border properties.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function ElPasoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 El Paso, Texas</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            El Paso Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>Wind, Monsoon & HVAC Guidance</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Desert wind storms, monsoon flooding, and extreme heat make El Paso homeowners face unique property challenges. Texas Property Help connects you with vetted, TDLR-licensed contractors and free insurance guidance — full bilingual EN/ES service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in El Paso →
            </Link>
            <Link href="/es" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Ver en Español
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "80%+", label: "El Paso residents who speak Spanish — full bilingual service" },
            { stat: "60+mph", label: "Haboob (dust storm) wind speeds that damage roofs and fences" },
            { stat: "110°F", label: "Summer highs — HVAC failure is a health emergency in El Paso" },
            { stat: "Free", label: "Homeowner request — no cost, no pressure" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>El Paso's Unique Property Damage Risks</h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            El Paso's Chihuahuan Desert climate produces property damage patterns unlike anywhere else in Texas. High-wind dust storms (haboobs) can arrive with little warning and produce sustained winds over 60 mph — damaging roofing, siding, fencing, and HVAC units. Monsoon season brings intense rain events that overwhelm drainage systems and cause flash flooding in low-lying neighborhoods near arroyos.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "24px" }}>
            Unlike Houston or the Gulf Coast, El Paso homeowners are not subject to TWIA windstorm zone requirements — standard homeowners policies cover wind damage. But El Paso's extreme summer heat creates a separate urgency: HVAC system failures during 110°F heat waves are a health emergency, not just an inconvenience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "💨", title: "Wind & Dust Storm Damage", color: "#f59e0b", body: "Haboobs and high desert winds damage roofing, break windows, and topple fencing. Standard El Paso policies cover wind damage — document all damage before repairs begin." },
              { icon: "🌧️", title: "Monsoon Flash Flooding", color: "#3b82f6", body: "Monsoon rain causes flash flooding near arroyos and low-lying areas. Rising floodwater requires NFIP flood insurance. Rainwater entering through storm damage to your roof or windows is covered under your homeowners policy." },
              { icon: "☀️", title: "Extreme Heat & HVAC", color: "#ef4444", body: "El Paso summers demand 24/7 HVAC performance. Storm-damaged or failed AC units require emergency attention. We prioritize HVAC requests during heat season." },
              { icon: "🏠", title: "Roofing in Desert Climate", color: "#76b900", body: "El Paso's UV intensity and thermal cycling degrade roofing faster than humid climates. After wind storms, have a TDLR-licensed contractor inspect before assuming damage is minor." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderTop: `4px solid ${item.color}`, borderRadius: "8px", padding: "20px" }}>
                <span style={{ fontSize: "1.6rem", display: "block", marginBottom: "8px" }}>{item.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#111827" }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "white", fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>El Paso Areas We Serve</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {["El Paso (all zip codes)", "Socorro", "Horizon City", "Anthony", "Fabens", "Clint", "San Elizario", "Tornillo", "Fort Bliss", "Canutillo", "Sunland Park (NM border area)"].map((area) => (
              <span key={area} style={{ backgroundColor: "rgba(118,185,0,0.1)", color: "#76b900", border: "1px solid rgba(118,185,0,0.3)", fontSize: "0.82rem", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>📍 {area}</span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="El Paso Homeowner Questions — Answered" />
      <CTASection heading="El Paso Homeowner? Get Help Now." subheading="Wind damage, monsoon flooding, HVAC emergencies, or insurance questions — submit your request and we'll connect you with the right resources. Bilingual EN/ES. Always free." primaryLabel="Request Help in El Paso" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
