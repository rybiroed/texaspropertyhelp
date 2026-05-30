import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Dallas Property Help | Storm Damage, Roofing & HVAC",
  description:
    "Texas Property Help serves Dallas-Fort Worth homeowners with storm damage assessment, roofing referrals, HVAC help, and insurance claim guidance across DFW.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/dallas",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Texas Property Help — Dallas",
  url: "https://texaspropertyhelp.com/dallas",
  description: "Homeowner assistance platform serving Dallas-Fort Worth, TX. Storm damage, roofing, HVAC, insurance claims.",
  areaServed: [
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Fort Worth" },
    { "@type": "City", name: "Arlington" },
    { "@type": "City", name: "Plano" },
    { "@type": "City", name: "Irving" },
    { "@type": "City", name: "Garland" },
    { "@type": "City", name: "Frisco" },
    { "@type": "City", name: "McKinney" },
  ],
  availableLanguage: ["English", "Spanish"],
  priceRange: "Free",
};

const dallasFaqs: FAQItem[] = [
  {
    question: "Does Texas Property Help serve the Dallas-Fort Worth area?",
    answer: "Yes. We serve Dallas, Fort Worth, and the greater DFW metroplex including Plano, Irving, Arlington, Garland, Frisco, McKinney, Denton, and surrounding communities.",
  },
  {
    question: "DFW gets severe hail often — can you help after hail damage?",
    answer: "Yes. North Texas is one of the most hail-prone areas in the country. We help homeowners document hail damage, understand their insurance coverage, and connect with qualified roofing contractors.",
  },
  {
    question: "How fast can I get a contractor referral in Dallas after a storm?",
    answer: "We review and route requests within 1 business day under normal conditions. After major DFW hail or tornado events, submit as early as possible — contractor availability fills quickly after widespread storm events.",
  },
  {
    question: "Do Dallas-area contractors in your network handle both roofing and HVAC?",
    answer: "Our contractor network includes separate roofing and HVAC professionals. When you submit your request, select all the services you need and we match accordingly.",
  },
];

export default function DallasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Dallas – Fort Worth, Texas
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
            Dallas Property Help — Storm Damage, Roofing & HVAC
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 32px" }}>
            DFW leads Texas in hail storms. Texas Property Help connects Dallas-Fort Worth homeowners with qualified contractors and insurance claim guidance — fast.
          </p>
          <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
            Request Help in Dallas →
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "var(--heading-primary)", fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>
            Services for Dallas-Fort Worth Homeowners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Tornado Damage", body: "North Texas sees some of the largest hail in the US. Get help with damage documentation and insurance claims before contractor demand spikes.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "Connect with licensed DFW roofers for inspection, repair, and replacement — including insurance-related claims across Dallas and Tarrant counties.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Texas summers demand reliable HVAC. Emergency repair referrals and financing options for system replacements across the DFW metro.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claims", body: "Insurance claim guidance from documentation to final settlement — understand your policy and avoid common mistakes.", href: "/insurance-claims" },
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

      <FAQ items={dallasFaqs} heading="Dallas-Fort Worth Homeowner Questions" />

      <CTASection
        heading="DFW Homeowner? Get the Right Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — connect with the right resources for your Dallas-Fort Worth property."
        primaryLabel="Request Help in Dallas"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
