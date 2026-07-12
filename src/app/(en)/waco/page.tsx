import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Waco Storm Damage Help | Free TX Homeowner Guide",
  description:
    "Free help for Waco homeowners after hail, tornado, or storm damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim across McLennan County.",
  alternates: { canonical: "https://texaspropertyhelp.com/waco" },
  openGraph: {
    title: "Waco Storm Damage Help — Free Hail, Roofing & Insurance Claim Guidance",
    description: "Free help for Waco homeowners after hail, tornado, or storm damage. TDLR-licensed contractors, insurance claim guidance.",
    url: "https://texaspropertyhelp.com/waco",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/waco#localbusiness",
  "name": "Texas Property Help — Waco",
  "url": "https://texaspropertyhelp.com/waco",
  "description": "Free homeowner assistance for Waco and McLennan County. Hail damage, storm damage, roofing, HVAC, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Waco" },
    { "@type": "City", "name": "Temple" },
    { "@type": "City", "name": "Killeen" },
    { "@type": "City", "name": "Belton" },
    { "@type": "City", "name": "Hewitt" },
    { "@type": "City", "name": "Woodway" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "Does Waco get significant hail and storm damage?",
    answer:
      "Yes. Waco and Central Texas sit in an active storm corridor between the DFW hail belt to the north and the Gulf moisture systems to the south. McLennan County averages 40–60 hail events per year, with peak activity in spring. Waco also has tornado history — including the devastating 1953 tornado that struck downtown. Wind and hail coverage is included in standard homeowners policies for the Waco area.",
  },
  {
    question: "Does Texas Property Help serve Temple, Killeen, and the Central Texas area?",
    answer:
      "Yes. We serve the greater Central Texas corridor including Waco, Temple, Killeen, Belton, Hewitt, Woodway, Lorena, Hillsboro, Corsicana, and surrounding McLennan, Bell, and Coryell County communities.",
  },
  {
    question: "How do I find a licensed roofing contractor in Waco after a hail storm?",
    answer:
      "Verify any contractor at license.tdlr.texas.gov before signing anything. Texas requires roofing contractors to hold an active TDLR license. After major Central Texas hail events, unlicensed out-of-state storm chasers arrive quickly — verification is essential. Get at least two written estimates from licensed, local contractors before choosing.",
  },
  {
    question: "What should I do first after storm damage in Waco?",
    answer:
      "Document all exterior and interior damage with photos and video before touching anything. Make emergency temporary repairs (tarping, boarding) to prevent further damage — keep receipts as these are reimbursable. Then contact a licensed TDLR contractor for a written inspection report before your insurance adjuster visits. File your claim promptly — Texas requires most claims within one year of the storm date.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function WacoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 Waco — Central Texas</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Waco Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>Hail, Tornado & Insurance Guidance</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Central Texas storm season hits Waco hard. Texas Property Help connects McLennan County homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance after hail, tornadoes, and severe storms.
          </p>
          <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
            Request Help in Waco →
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>How We Help Waco Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Storm Damage", body: "Document damage correctly and connect with licensed Central Texas contractors before the post-storm backlog builds.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed Waco-area roofers for inspection, repair, and replacement — written estimates before signing.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Central Texas summers demand reliable HVAC. Emergency repair referrals and storm-damage condenser assessments.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "Step-by-step guidance from filing to settlement, including dispute options if your adjuster underpays your Waco claim.", href: "/insurance-claims" },
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

      <FAQ items={faqs} heading="Waco Homeowner Questions — Answered" />
      <CTASection heading="Waco Homeowner? Get Help Now." subheading="Hail damage, storm damage, roofing, HVAC, or insurance questions — connect with vetted, TDLR-licensed Central Texas contractors and free guidance. Always free." primaryLabel="Request Help in Waco" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
