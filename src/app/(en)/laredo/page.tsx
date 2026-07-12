import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Laredo Storm Damage Help | Free TX Homeowner Guide",
  description:
    "Free help for Laredo homeowners after storm, wind, or hail damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim. Bilingual EN/ES service.",
  alternates: { canonical: "https://texaspropertyhelp.com/laredo" },
  openGraph: {
    title: "Laredo Storm Damage Help — Free Roofing, HVAC & Insurance Claim Guidance",
    description: "Free help for Laredo homeowners after storm, wind, or hail damage. TDLR-licensed contractors, insurance guidance, bilingual EN/ES.",
    url: "https://texaspropertyhelp.com/laredo",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/laredo#localbusiness",
  "name": "Texas Property Help — Laredo",
  "url": "https://texaspropertyhelp.com/laredo",
  "description": "Free homeowner assistance for Laredo and Webb County. Storm damage, roofing, HVAC, insurance claims. Bilingual EN/ES.",
  "areaServed": [
    { "@type": "City", "name": "Laredo" },
    { "@type": "City", "name": "Nuevo Laredo" },
    { "@type": "City", "name": "El Cenizo" },
    { "@type": "City", "name": "Rio Bravo" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "What property damage risks do Laredo homeowners face?",
    answer:
      "Laredo's South Texas location means extreme summer heat (110°F+), occasional severe thunderstorms, hail events, and high winds. HVAC system reliability is critical — summer failures are a health emergency. Flash flooding from intense storm events also affects low-lying areas of Webb County. Wind and hail are covered under standard homeowners policies; flood damage from rising water requires separate NFIP flood insurance.",
  },
  {
    question: "Can Laredo homeowners get help in Spanish?",
    answer:
      "Yes. Laredo has one of the highest rates of Spanish-speaking residents of any U.S. city — over 95% of residents speak Spanish at home. We offer full bilingual service. Visit texaspropertyhelp.com/es or select Spanish when submitting your request.",
  },
  {
    question: "Does homeowners insurance cover hail damage in Laredo?",
    answer:
      "Yes. Standard Texas homeowners policies cover hail and wind damage in Webb County — Laredo is not in a TWIA coastal zone. Your wind/hail deductible applies first (check your declarations page for the amount). After any hail event, have a TDLR-licensed contractor inspect before your adjuster visits.",
  },
  {
    question: "What areas around Laredo do you serve?",
    answer:
      "We serve Webb County including Laredo, El Cenizo, Rio Bravo, and surrounding communities. We also assist homeowners in Zapata, Cotulla, and the broader South Texas region.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function LaredoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 Laredo — South Texas</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Laredo Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>Free, Fast, and Bilingual</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Extreme heat, severe storms, and HVAC emergencies — Texas Property Help connects Laredo homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance. Full bilingual English &amp; Spanish service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Laredo →
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
            { stat: "95%+", label: "Laredo residents who speak Spanish — full bilingual service available" },
            { stat: "110°F", label: "Summer heat extremes — HVAC failure is a health emergency in Laredo" },
            { stat: "South TX", label: "Severe storm and hail season peaks April–June" },
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
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>How We Help Laredo Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Storm & Hail Damage", body: "Document damage and connect with licensed South Texas contractors before your adjuster visits.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed roofers serving Webb County and South Texas for inspection, repair, and replacement.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Laredo summers are among the most extreme in Texas. Emergency HVAC repair referrals prioritized for heat-season urgency.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "Full bilingual claim guidance — from filing in English or Spanish to resolving disputes with your insurer.", href: "/insurance-claims" },
            ].map((s) => (
              <Link key={s.href} href={s.href} style={{ display: "block", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "24px", textDecoration: "none" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "10px" }}>{s.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="Laredo Homeowner Questions — Answered" />
      <CTASection heading="Laredo Homeowner? Get Help Now." subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and connect with vetted contractors and free guidance. Bilingual EN/ES. Always free." primaryLabel="Request Help in Laredo" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
