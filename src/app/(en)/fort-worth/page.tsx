import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Fort Worth Property Help | Storm Damage, Roofing & HVAC",
  description:
    "Texas Property Help serves Fort Worth homeowners with storm damage, roofing repairs, HVAC help, and insurance claim guidance across Tarrant County.",
  alternates: { canonical: "https://texaspropertyhelp.com/fort-worth" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Texas Property Help — Fort Worth",
  url: "https://texaspropertyhelp.com/fort-worth",
  description: "Homeowner assistance platform serving Fort Worth and Tarrant County, TX.",
  areaServed: [
    { "@type": "City", name: "Fort Worth" },
    { "@type": "City", name: "Arlington" },
    { "@type": "City", name: "Mansfield" },
    { "@type": "City", name: "Burleson" },
    { "@type": "City", name: "Haltom City" },
    { "@type": "City", name: "North Richland Hills" },
  ],
  availableLanguage: ["English", "Spanish"],
  priceRange: "Free",
};

const fwFaqs: FAQItem[] = [
  {
    question: "Does Texas Property Help serve Fort Worth?",
    answer: "Yes. We serve Fort Worth and Tarrant County including Arlington, Mansfield, Burleson, Haltom City, North Richland Hills, Euless, Grapevine, and surrounding communities.",
  },
  {
    question: "Fort Worth gets severe weather often — what do you help with?",
    answer: "Fort Worth and Tarrant County experience hail storms, severe thunderstorms, and occasional tornadoes. We help homeowners with roof damage documentation, insurance claims, and contractor referrals after storm events.",
  },
  {
    question: "How is Fort Worth different from Dallas for property damage?",
    answer: "Fort Worth is covered by Tarrant County building codes and has its own licensed contractor requirements. Our network includes contractors specifically approved for Tarrant County work.",
  },
  {
    question: "Can I get Spanish-language help in Fort Worth?",
    answer: "Yes. A significant portion of Fort Worth's population is Spanish-speaking. Select Spanish when submitting your request and we'll match you with bilingual resources.",
  },
];

export default function FortWorthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Fort Worth — Tarrant County, Texas
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Fort Worth Property Help — Storm Damage, Roofing & HVAC
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 32px" }}>
            Storm damage, hail, roof leaks, HVAC failures — Texas Property Help connects Fort Worth and Tarrant County homeowners with qualified contractors and insurance guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Fort Worth →
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
            Services for Fort Worth Homeowners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Storm Damage", body: "Tarrant County sees frequent hail events. Get help documenting damage and connecting with roofers before the post-storm backlog fills up.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "Licensed Fort Worth roofers for inspection, repair, and replacement — including insurance claims across Tarrant County.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Emergency AC repair and system replacement referrals for Fort Worth homeowners — prioritized based on urgency.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claims", body: "Insurance claim guidance from damage documentation to final settlement — avoid the mistakes that cost homeowners thousands.", href: "/insurance-claims" },
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

      <FAQ items={fwFaqs} heading="Fort Worth Homeowner Questions" />

      <CTASection
        heading="Fort Worth Homeowner? We Can Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — get connected with the right resources for your Tarrant County property."
        primaryLabel="Request Help in Fort Worth"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
