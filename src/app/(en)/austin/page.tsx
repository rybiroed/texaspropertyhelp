import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Austin Property Help | Storm Damage, Roofing & HVAC",
  description:
    "Texas Property Help serves Austin homeowners with storm damage assessment, roofing repair referrals, HVAC help, and insurance claim guidance across the Austin metro.",
  alternates: { canonical: "https://texaspropertyhelp.com/austin" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Texas Property Help — Austin",
  url: "https://texaspropertyhelp.com/austin",
  description: "Homeowner assistance platform serving Austin, TX. Storm damage, roofing, HVAC, insurance claims.",
  areaServed: [
    { "@type": "City", name: "Austin" },
    { "@type": "City", name: "Round Rock" },
    { "@type": "City", name: "Cedar Park" },
    { "@type": "City", name: "Pflugerville" },
    { "@type": "City", name: "Georgetown" },
    { "@type": "City", name: "Kyle" },
    { "@type": "City", name: "Buda" },
  ],
  availableLanguage: ["English", "Spanish"],
  priceRange: "Free",
};

const austinFaqs: FAQItem[] = [
  {
    question: "Does Texas Property Help serve Austin and the surrounding area?",
    answer: "Yes. We serve Austin and the greater Travis County area including Round Rock, Cedar Park, Pflugerville, Georgetown, Kyle, Buda, Leander, and surrounding communities.",
  },
  {
    question: "Austin is growing fast — are there qualified contractors available?",
    answer: "Austin's construction boom means high demand for qualified contractors. We vet contractors before approving them on our platform, so homeowners get access to licensed professionals without having to sort through unqualified listings.",
  },
  {
    question: "Does Austin get hail storms?",
    answer: "Yes. Central Texas including Austin sees significant hail activity, especially from spring through early summer. Hail damage to roofs and HVAC units is one of the most common homeowner claims we handle in the Austin area.",
  },
  {
    question: "Can I get help with an insurance claim in Austin?",
    answer: "Yes. We provide guidance on the insurance claim process — documenting damage, communicating with your adjuster, understanding your policy coverage, and avoiding common mistakes that delay or reduce claims.",
  },
  {
    question: "My HVAC failed during a Texas heat wave — can you help fast?",
    answer: "Yes. We prioritize HVAC emergency requests. Submit your request marked as Emergency and we route it to contractors with emergency availability first.",
  },
];

export default function AustinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Austin, Texas
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Austin Property Help — Storm Damage, Roofing & HVAC
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 32px" }}>
            Hail damage, roof leaks, HVAC emergencies in Texas heat — Texas Property Help connects Austin homeowners with qualified contractors and insurance guidance fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Austin →
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
            Services for Austin Homeowners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Storm Damage", body: "Central Texas hail storms can hit without warning. We help Austin homeowners document damage and file claims before contractor demand peaks.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "Connect with licensed Austin-area roofers for inspection, repair, and full replacement — including insurance-related roof claims in Travis County.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Austin summers are extreme. Emergency HVAC repair referrals and replacement financing options — prioritized for emergencies.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claims", body: "Navigate your homeowner insurance claim from first report to final settlement. Avoid the common mistakes that slow down or reduce your payout.", href: "/insurance-claims" },
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

      <FAQ items={austinFaqs} heading="Austin Homeowner Questions" />

      <CTASection
        heading="Austin Homeowner? Get the Right Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — connect with the right resources for your Austin property."
        primaryLabel="Request Help in Austin"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
