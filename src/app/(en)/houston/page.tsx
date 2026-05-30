import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Houston Property Help | Storm Damage, Roofing & HVAC",
  description:
    "Texas Property Help serves Houston homeowners with storm damage assessment, roofing repair referrals, HVAC help, and insurance claim guidance. Bilingual English/Spanish service.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/houston",
    languages: {
      "en-US": "https://texaspropertyhelp.com/houston",
      "x-default": "https://texaspropertyhelp.com/houston",
    },
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Texas Property Help — Houston",
  url: "https://texaspropertyhelp.com/houston",
  description: "Homeowner assistance platform serving Houston, TX. Storm damage, roofing, HVAC, insurance claims, bilingual EN/ES.",
  areaServed: [
    { "@type": "City", name: "Houston", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Pasadena" },
    { "@type": "City", name: "Pearland" },
    { "@type": "City", name: "Sugar Land" },
    { "@type": "City", name: "Katy" },
    { "@type": "City", name: "The Woodlands" },
  ],
  availableLanguage: ["English", "Spanish"],
  priceRange: "Free",
};

const houstonFaqs: FAQItem[] = [
  {
    question: "Do you help Houston homeowners with hurricane and tropical storm damage?",
    answer: "Yes. Houston's Gulf Coast location makes hurricane and tropical storm damage extremely common. We help homeowners document damage, understand their insurance coverage, and connect with qualified roofing and restoration contractors.",
  },
  {
    question: "What areas around Houston do you serve?",
    answer: "We serve the greater Houston metro area including Pasadena, Pearland, Sugar Land, Katy, The Woodlands, Humble, Baytown, League City, and surrounding communities.",
  },
  {
    question: "Can I get help in Spanish in Houston?",
    answer: "Yes. Houston has one of the largest Spanish-speaking populations in Texas. We offer bilingual service — select Spanish when submitting your request and we will connect you with Spanish-speaking resources.",
  },
  {
    question: "How quickly can I get connected with a contractor after a storm?",
    answer: "We aim to review and route requests within 1 business day. After major storms affecting the Houston area, demand increases significantly — submitting your request early helps secure faster contractor availability.",
  },
  {
    question: "Does Houston's humidity affect roofing and HVAC costs?",
    answer: "Houston's heat and humidity create specific challenges for roofing materials and HVAC systems. Our guides cover what to expect for Houston's climate, and the contractors we work with are experienced in local conditions.",
  },
];

export default function HoustonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Houston, Texas
          </p>
          <h1
            style={{
              color: "white",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Houston Property Help — Storm Damage, Roofing & HVAC
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 32px" }}>
            From hurricane damage to broken AC in 100-degree heat — Texas Property Help connects Houston homeowners with the right resources fast. Bilingual English &amp; Spanish service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Houston →
            </Link>
            <Link href="/es" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Ver en Español
            </Link>
          </div>
        </div>
      </section>

      {/* Houston-specific services */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "var(--heading-primary)", fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>
            How We Help Houston Homeowners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hurricane & Storm Damage", body: "Houston faces tropical storms, flooding, and hail. We help you document damage and connect with restoration contractors before the backlog builds.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "From post-hurricane roof tarping to full replacement — connect with licensed Houston-area roofers who know Harris County requirements.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Houston summers demand reliable AC. Emergency repairs, system replacements, and financing options for heating and cooling systems.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claims", body: "Navigate your homeowner's insurance claim from first report to settlement. Understand your policy, document correctly, and avoid common mistakes.", href: "/insurance-claims" },
            ].map((s) => (
              <Link key={s.href} href={s.href} style={{ display: "block", backgroundColor: "var(--content-bg-subtle)", border: "1px solid var(--content-border)", borderRadius: "10px", padding: "24px", textDecoration: "none" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "10px" }}>{s.icon}</span>
                <h3 style={{ color: "var(--content-primary)", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "var(--content-secondary)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "#1", label: "Most storm-impacted major city in the US" },
            { stat: "40%+", label: "Houston residents are Spanish-speaking" },
            { stat: "2.3M+", label: "Housing units in the Houston metro" },
            { stat: "Free", label: "Homeowner request — no cost to you" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", margin: 0 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQ items={houstonFaqs} heading="Houston Homeowner Questions" />

      <CTASection
        heading="Houston Homeowner? Get Help Now."
        subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and we'll connect you with the right resources in the Houston area."
        primaryLabel="Request Help in Houston"
        secondaryLabel="Read Houston Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
