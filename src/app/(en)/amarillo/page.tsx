import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Amarillo Storm Damage Help — Free Hail, Wind & Insurance Claim Guidance",
  description:
    "Free help for Amarillo homeowners after hail, tornado, or high-wind damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim in the Texas Panhandle.",
  alternates: { canonical: "https://texaspropertyhelp.com/amarillo" },
  openGraph: {
    title: "Amarillo Storm Damage Help — Free Hail, Wind & Insurance Claim Guidance",
    description: "Free help for Amarillo homeowners after hail, tornado, or high-wind damage. TDLR-licensed contractors, insurance claim guidance, Texas Panhandle.",
    url: "https://texaspropertyhelp.com/amarillo",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/amarillo#localbusiness",
  "name": "Texas Property Help — Amarillo",
  "url": "https://texaspropertyhelp.com/amarillo",
  "description": "Free homeowner assistance for Amarillo and the Texas Panhandle. Hail, wind, tornado damage, roofing, HVAC, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Amarillo" },
    { "@type": "City", "name": "Canyon" },
    { "@type": "City", "name": "Pampa" },
    { "@type": "City", "name": "Borger" },
    { "@type": "City", "name": "Dumas" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "What storm damage risks do Amarillo homeowners face?",
    answer:
      "The Texas Panhandle around Amarillo faces some of the most intense severe weather in the U.S. — large hail, tornadoes, straight-line winds exceeding 80 mph, and winter ice storms. Amarillo also experiences the highest average wind speeds of any major Texas city, which accelerates roofing wear and creates unique structural stress. Hail events in the Panhandle frequently produce golf ball to baseball-sized hail that causes severe roof and vehicle damage.",
  },
  {
    question: "Does homeowners insurance cover wind and hail damage in Amarillo?",
    answer:
      "Yes. Amarillo is not in a TWIA coastal zone, so standard homeowners policies cover both wind and hail damage. However, most Panhandle policies have a separate wind and hail deductible — typically 1–3% of the home's insured value. On a $250,000 home, that's $2,500–$7,500 out of pocket. Review your declarations page for your specific deductible type before a storm hits.",
  },
  {
    question: "Does Amarillo get tornadoes?",
    answer:
      "Yes. The Texas Panhandle is in the heart of Tornado Alley. Amarillo and Potter County receive tornado warnings multiple times per year, and the region has experienced several significant tornado events. Wind damage from tornadoes is covered under standard homeowners policies. Document all exterior and structural damage before beginning any repairs.",
  },
  {
    question: "What areas around Amarillo do you serve?",
    answer:
      "We serve the Texas Panhandle region including Amarillo, Canyon, Pampa, Borger, Dumas, Perryton, Dalhart, Hereford, Tulia, and surrounding communities across Potter, Randall, Moore, Gray, and Ochiltree counties.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function AmarilloPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 Amarillo — Texas Panhandle</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Amarillo Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>Hail, Wind & Tornado Guidance</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            The Texas Panhandle faces some of the most severe storm activity in the country. Texas Property Help connects Amarillo homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance after hail, tornadoes, and high-wind events.
          </p>
          <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
            Request Help in Amarillo →
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "#1", label: "Amarillo has the highest average wind speed of any major Texas city" },
            { stat: "Tornado Alley", label: "Texas Panhandle is in the core of U.S. tornado frequency" },
            { stat: "Baseball", label: "Hail size common in major Panhandle events" },
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
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>The Texas Panhandle's Extreme Storm Environment</h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Amarillo and the Texas Panhandle sit at the northern tip of Tornado Alley, where fast-moving cold fronts from the Rocky Mountains collide with warm, moist Gulf air to produce some of the most violent thunderstorms on Earth. The region averages 70+ hail-producing storm days per year and sees regular tornado activity from April through June.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Beyond seasonal storms, Amarillo's persistent high winds — averaging 13–14 mph year-round with frequent gusts above 50 mph — create chronic roofing stress that accelerates aging and increases storm vulnerability. After any significant wind or hail event, a professional inspection from a licensed TDLR contractor is essential.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>How We Help Amarillo Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail & Storm Damage", body: "Connect with licensed Panhandle contractors for documentation and repair after Amarillo hail events.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed roofers who understand high-wind zone requirements for the Texas Panhandle.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Emergency repair referrals for Amarillo's hot summers and cold winters — HVAC failure in either season is urgent.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "Claim guidance from first report to settlement — including dispute options if your Panhandle adjuster underpays.", href: "/insurance-claims" },
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

      <FAQ items={faqs} heading="Amarillo Homeowner Questions — Answered" />
      <CTASection heading="Amarillo Homeowner? Get Help Now." subheading="Hail, tornado, or wind damage in the Texas Panhandle — submit your request and connect with vetted, TDLR-licensed contractors and free insurance guidance. Always free." primaryLabel="Request Help in Amarillo" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
