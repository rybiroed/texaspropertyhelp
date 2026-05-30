import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "San Antonio Property Help | Storm Damage, Roofing & HVAC",
  description:
    "Texas Property Help serves San Antonio homeowners with storm damage, roofing repair, HVAC help, and insurance claim guidance. Bilingual English/Spanish service available.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/san-antonio",
    languages: {
      "en-US": "https://texaspropertyhelp.com/san-antonio",
      "x-default": "https://texaspropertyhelp.com/san-antonio",
    },
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Texas Property Help — San Antonio",
  url: "https://texaspropertyhelp.com/san-antonio",
  description: "Homeowner assistance platform serving San Antonio, TX. Storm damage, roofing, HVAC, insurance claims, bilingual EN/ES.",
  areaServed: [
    { "@type": "City", name: "San Antonio", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "New Braunfels" },
    { "@type": "City", name: "Schertz" },
    { "@type": "City", name: "Converse" },
    { "@type": "City", name: "Boerne" },
  ],
  availableLanguage: ["English", "Spanish"],
  priceRange: "Free",
};

const saFaqs: FAQItem[] = [
  {
    question: "Does Texas Property Help serve the San Antonio area?",
    answer: "Yes. We serve San Antonio and the surrounding Bexar County area including New Braunfels, Schertz, Converse, Boerne, Universal City, and surrounding communities.",
  },
  {
    question: "Can San Antonio homeowners get help in Spanish?",
    answer: "Absolutely. Over 60% of San Antonio residents are Hispanic or Latino. We offer full bilingual service — select Spanish when submitting your request.",
  },
  {
    question: "What kind of storm damage is most common in San Antonio?",
    answer: "San Antonio experiences hail storms, severe thunderstorms, and occasional flash flooding. Hail damage to roofing and siding is the most common homeowner claim we see from the SA area.",
  },
  {
    question: "How does the contractor referral process work in San Antonio?",
    answer: "After you submit a request, we review it and match it to contractors in our network who serve your zip code and the type of work needed. You receive their contact information directly.",
  },
];

export default function SanAntonioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            San Antonio, Texas
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
            San Antonio Property Help — Storm Damage, Roofing & HVAC
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 32px" }}>
            Hail damage, roof leaks, HVAC failures — Texas Property Help connects San Antonio homeowners with qualified contractors and insurance guidance. Bilingual English &amp; Spanish.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in San Antonio →
            </Link>
            <Link href="/es" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Ver en Español
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "var(--heading-primary)", fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>
            Services for San Antonio Homeowners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Storm Damage", body: "San Antonio's storm season brings heavy hail. Get help documenting damage and filing claims before contractor availability tightens.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "Connect with licensed roofers for inspections, repairs, and replacements — including insurance-related roof claims in Bexar County.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "San Antonio summers are brutal. Fast HVAC repair and replacement referrals, plus financing options for unexpected system failures.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "Understand the insurance claim process from documentation to settlement. Available in English and Spanish.", href: "/insurance-claims" },
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

      <FAQ items={saFaqs} heading="San Antonio Homeowner Questions" />

      <CTASection
        heading="San Antonio Homeowner? We Can Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — get connected with the right resources for your San Antonio property."
        primaryLabel="Request Help in San Antonio"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
