import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Lubbock Hail & Storm Damage Help | Free TX Guide",
  description:
    "Free help for Lubbock homeowners after hail, tornado, or wind damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim across West Texas.",
  alternates: { canonical: "https://texaspropertyhelp.com/lubbock" },
  openGraph: {
    title: "Lubbock Storm Damage Help — Free Hail, Wind & Insurance Claim Guidance",
    description: "Free help for Lubbock homeowners after hail, tornado, or wind damage. TDLR-licensed contractors, insurance claim guidance, West Texas.",
    url: "https://texaspropertyhelp.com/lubbock",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/lubbock#localbusiness",
  "name": "Texas Property Help — Lubbock",
  "url": "https://texaspropertyhelp.com/lubbock",
  "description": "Free homeowner assistance for Lubbock and West Texas. Hail damage, wind damage, roofing, HVAC, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Lubbock" },
    { "@type": "City", "name": "Wolfforth" },
    { "@type": "City", "name": "Slaton" },
    { "@type": "City", "name": "Plainview" },
    { "@type": "City", "name": "Levelland" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "Does Lubbock get significant hail damage?",
    answer:
      "Yes. The South Plains region including Lubbock is in the heart of the Texas hail corridor. Lubbock averages 60+ hail-producing storm days per year, and large-hail events (2 inches or larger) are common in spring and early summer. The flat terrain and open sky give storms full energy to develop — resulting in some of the largest hailstones recorded in Texas.",
  },
  {
    question: "Are there tornado risks for Lubbock homeowners?",
    answer:
      "Yes. The Texas Panhandle and South Plains see frequent tornado activity. Lubbock was struck by a catastrophic tornado in 1970, and the area continues to receive tornado watches and warnings regularly. Wind damage from tornadoes and straight-line winds is covered under standard homeowners policies — document everything before repairs begin.",
  },
  {
    question: "What areas around Lubbock do you serve?",
    answer:
      "We serve Lubbock County and surrounding South Plains communities including Wolfforth, Slaton, Plainview, Levelland, Tahoka, Brownfield, Post, and Idalou.",
  },
  {
    question: "How do I file a hail damage claim in Lubbock?",
    answer:
      "First, get a licensed TDLR contractor to document damage before your insurance adjuster visits. File your claim promptly — Texas law requires most claims to be filed within one year of the storm. Know your deductible type: many Lubbock policies have a separate wind/hail deductible (1–3% of insured value). If your adjuster's estimate is low, you can dispute it, invoke the appraisal clause, or file a complaint with the Texas Department of Insurance at 800-252-3439.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function LubbockPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 Lubbock — West Texas</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Lubbock Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>Hail, Tornado & Insurance Guidance</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Lubbock sits in Texas's most active hail corridor. Texas Property Help connects West Texas homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance after hail, tornadoes, and severe storms.
          </p>
          <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
            Request Help in Lubbock →
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "60+", label: "Annual hail-producing storm days in the Lubbock area" },
            { stat: "Top 10", label: "Lubbock among highest hail claim cities in Texas" },
            { stat: "1970", label: "Lubbock Tornado — a reminder of the region's severe weather history" },
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
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>Why Lubbock Homeowners Face High Storm Risk</h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            The South Plains of West Texas — where Lubbock sits — is one of the most hail-prone regions in the United States. The Llano Estacado's flat, elevated terrain provides ideal conditions for severe thunderstorm development, with warm Gulf moisture colliding with dry continental air from New Mexico to produce supercell storms capable of baseball and softball-sized hail.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Lubbock homeowners also face tornado risk, straight-line wind events, and — uniquely — blowing dust and sand that accelerates wear on roofing, siding, and HVAC equipment. After every major storm, connect with a licensed TDLR contractor for a professional assessment before calling your insurer.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>How We Help Lubbock Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Storm Damage", body: "Document damage and connect with licensed Lubbock contractors before your adjuster visits.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed West Texas roofers for inspection, repair, and full replacement after hail events.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "West Texas summers demand reliable HVAC. Emergency repair referrals and storm-damage assessments.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "ACV vs. RCV, deductible guidance, supplemental claims, and dispute options for Lubbock homeowners.", href: "/insurance-claims" },
            ].map((s) => (
              <Link key={s.href} href={s.href} style={{ display: "block", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "24px", textDecoration: "none" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "10px" }}>{s.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="Lubbock Homeowner Questions — Answered" />
      <CTASection heading="Lubbock Homeowner? Get Help Now." subheading="Hail damage, tornado damage, roofing, or insurance questions — connect with vetted, TDLR-licensed West Texas contractors and free guidance. Always free." primaryLabel="Request Help in Lubbock" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
