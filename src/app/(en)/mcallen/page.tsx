import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "McAllen Storm Damage Help | Free TX Homeowner Guide",
  description:
    "Free help for McAllen and Rio Grande Valley homeowners after storm, hail, or hurricane damage. TDLR-licensed contractors, insurance claim guidance. Bilingual EN/ES service.",
  alternates: { canonical: "https://texaspropertyhelp.com/mcallen" },
  openGraph: {
    title: "McAllen Storm Damage Help — Free Roofing, HVAC & Insurance Claim Guidance",
    description: "Free help for McAllen and Rio Grande Valley homeowners after storm, hail, or hurricane damage. Bilingual EN/ES service.",
    url: "https://texaspropertyhelp.com/mcallen",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/mcallen#localbusiness",
  "name": "Texas Property Help — McAllen",
  "url": "https://texaspropertyhelp.com/mcallen",
  "description": "Free homeowner assistance for McAllen and the Rio Grande Valley. Storm damage, roofing, HVAC, insurance claims. Bilingual EN/ES.",
  "areaServed": [
    { "@type": "City", "name": "McAllen" },
    { "@type": "City", "name": "Edinburg" },
    { "@type": "City", "name": "Mission" },
    { "@type": "City", "name": "Pharr" },
    { "@type": "City", "name": "Harlingen" },
    { "@type": "City", "name": "Brownsville" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "Does McAllen get hurricane and storm damage?",
    answer:
      "Yes. The Rio Grande Valley including McAllen is directly in the path of Gulf of Mexico hurricanes and tropical storms. Hidalgo County can also be affected by TWIA windstorm coverage requirements depending on your specific location — check your policy to see if wind is covered under your standard policy or requires a TWIA endorsement. Hail and severe thunderstorms are also common in the Valley during spring storm season.",
  },
  {
    question: "Can McAllen homeowners get help in Spanish?",
    answer:
      "Yes. The Rio Grande Valley has one of the highest rates of Spanish-speaking residents in the United States — over 90% of residents speak Spanish. We offer full bilingual service. Visit texaspropertyhelp.com/es or select Spanish when submitting your request.",
  },
  {
    question: "What areas in the Rio Grande Valley do you serve?",
    answer:
      "We serve the entire Rio Grande Valley including McAllen, Edinburg, Mission, Pharr, Harlingen, Brownsville, Weslaco, Mercedes, Donna, San Juan, Alamo, Palmview, and all surrounding Hidalgo, Cameron, and Willacy County communities.",
  },
  {
    question: "Does the Rio Grande Valley need TWIA windstorm insurance?",
    answer:
      "Parts of the Rio Grande Valley — particularly coastal areas of Cameron County near South Padre Island — are in TWIA-eligible zones. Hidalgo County (McAllen area) is generally not TWIA-eligible, meaning standard homeowners policies cover wind. However, check your specific policy — coverage can vary by location and insurer. Coastal Cameron County homeowners should verify TWIA coverage.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function McAllenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 McAllen — Rio Grande Valley, Texas</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            McAllen Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>Free, Fast, and Bilingual</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            The Rio Grande Valley faces hurricane threats, severe hail, and extreme heat. Texas Property Help connects McAllen area homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance — full bilingual EN/ES service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in McAllen →
            </Link>
            <Link href="/es" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Ver en Español
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>How We Help Rio Grande Valley Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🌀", title: "Hurricane & Storm Damage", body: "TWIA guidance, hurricane damage documentation, and connection with licensed RGV restoration contractors.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed roofers serving the Rio Grande Valley for inspection, repair, and full replacement.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Extreme Valley heat makes HVAC critical. Emergency repair referrals and storm-damage condenser assessments.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "Full bilingual claim guidance in English and Spanish — from filing to fighting a low settlement.", href: "/insurance-claims" },
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

      <FAQ items={faqs} heading="McAllen & Rio Grande Valley Questions — Answered" />
      <CTASection heading="McAllen Homeowner? Get Help Now." subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and connect with vetted contractors and free guidance. Bilingual EN/ES. Always free." primaryLabel="Request Help in McAllen" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
