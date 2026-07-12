import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Corpus Christi Storm Damage Help | Free TX Guide",
  description:
    "Free help for Corpus Christi homeowners after hurricane, hail, or wind damage. TWIA windstorm coverage guidance, vetted TDLR-licensed contractors, and insurance claim support.",
  alternates: { canonical: "https://texaspropertyhelp.com/corpus-christi" },
  openGraph: {
    title: "Corpus Christi Storm Damage Help — Free Roofing, HVAC & Insurance Guidance",
    description: "Free help for Corpus Christi homeowners after hurricane, hail, or wind damage. TWIA guidance, TDLR-licensed contractors, insurance claim support.",
    url: "https://texaspropertyhelp.com/corpus-christi",
    siteName: "Texas Property Help",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/corpus-christi#localbusiness",
  "name": "Texas Property Help — Corpus Christi",
  "url": "https://texaspropertyhelp.com/corpus-christi",
  "description": "Free homeowner assistance for Corpus Christi and Nueces County. Storm damage, roofing, HVAC, TWIA windstorm, hurricane damage, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Corpus Christi" },
    { "@type": "City", "name": "Portland" },
    { "@type": "City", "name": "Rockport" },
    { "@type": "City", "name": "Aransas Pass" },
    { "@type": "City", "name": "Ingleside" },
    { "@type": "City", "name": "Robstown" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const faqs: FAQItem[] = [
  {
    question: "Do Corpus Christi homeowners need TWIA windstorm insurance?",
    answer:
      "Yes — this is critical. Corpus Christi and all of Nueces County are TWIA-eligible areas. Standard homeowners policies typically exclude wind and hail coverage in coastal Texas. You need a separate windstorm policy through the Texas Windstorm Insurance Association (TWIA) to be covered for hurricane and tropical storm wind damage. If you're not sure whether you have TWIA coverage, check your declarations page or call your agent immediately — don't wait until after a storm.",
  },
  {
    question: "My Corpus Christi home was damaged by a hurricane — what do I do first?",
    answer:
      "Document everything before touching anything — photos and video of all exterior and interior damage. Make temporary repairs (tarping, boarding) only to prevent further damage, and keep all receipts. File with your homeowners insurer AND your TWIA insurer separately if wind and water damage are both present. Have a licensed TDLR contractor inspect before either adjuster visits. The split between wind damage (TWIA) and flood damage (NFIP) is the most contested issue in Gulf Coast claims.",
  },
  {
    question: "What is the difference between wind damage and flood damage in a hurricane claim?",
    answer:
      "Wind damage (covered by TWIA or your homeowners policy) includes damage caused directly by hurricane-force winds — roof damage, blown-off shingles, structural damage. Flood damage (only covered by NFIP flood insurance) includes damage from rising storm surge water. When both occur in the same storm, insurers dispute which damage came first. Thorough documentation — including watermarks, debris patterns, and contractor reports — is essential to support your claim.",
  },
  {
    question: "Does Texas Property Help serve Rockport, Portland, and the Coastal Bend?",
    answer:
      "Yes. We serve the entire Corpus Christi metro and Coastal Bend area including Nueces County, San Patricio County, Aransas County, and surrounding communities — Rockport, Portland, Aransas Pass, Ingleside, Gregory, Sinton, Orange Grove, and more.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
};

export default function CorpusChristiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>📍 Corpus Christi — Coastal Bend, Texas</p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Corpus Christi Storm Damage Help —<br /><span style={{ color: "var(--accent)" }}>TWIA, Hurricane & Hail Guidance</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Corpus Christi homeowners face hurricane risk, TWIA windstorm complexities, and active hail season. Texas Property Help connects you with vetted, TDLR-licensed contractors and free guidance on TWIA claims, hurricane damage, and roofing repairs — bilingual EN/ES.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Corpus Christi →
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
            { stat: "TWIA", label: "Nueces County is a TWIA-eligible zone — standard wind coverage may not apply" },
            { stat: "Cat 4", label: "Corpus Christi sits in the direct path of Gulf hurricane tracks" },
            { stat: "50%+", label: "Corpus Christi residents who are Hispanic — full bilingual service available" },
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
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>
            The Most Important Thing Corpus Christi Homeowners Need to Know
          </h2>
          <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ color: "#9a3412", fontWeight: 800, fontSize: "1rem", marginBottom: "10px" }}>⚠️ TWIA Coverage Gap — Check Your Policy Now</h3>
            <p style={{ color: "#7c2d12", fontSize: "0.925rem", lineHeight: 1.8, margin: 0 }}>
              Nueces County is a TWIA-eligible county. This means your standard homeowners insurance policy likely <strong>excludes wind and hail coverage</strong>. You need a separate policy through the Texas Windstorm Insurance Association (TWIA) to be covered for hurricane-force winds. Many Corpus Christi homeowners discover this gap only after a major storm. Check your declarations page under "covered perils" — if wind is excluded, call your agent today.
            </p>
          </div>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Corpus Christi sits directly in the path of Gulf of Mexico hurricanes and tropical storms. The Coastal Bend region has been struck by multiple major storms in recent decades, including Hurricane Harvey (2017) and Hurricane Hanna (2020). The combination of hurricane wind, storm surge flooding, and hail creates layered claim complexity that standard inland homeowners rarely face.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Additionally, Corpus Christi homeowners face the wind-versus-flood dispute that affects every Gulf Coast claim: TWIA covers wind damage; NFIP flood insurance covers rising water. When both occur in the same storm, insurers argue about which damage came first. Proper documentation before and immediately after a storm is your strongest tool.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>How We Help Corpus Christi Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🌀", title: "Hurricane & Tropical Storm Damage", body: "Full guidance on TWIA claims, wind-vs-flood documentation, and connecting with licensed restoration contractors experienced in Gulf Coast hurricane damage.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed roofers familiar with Nueces County code requirements and coastal building standards. Written estimates before you sign anything.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Coastal humidity and intense heat create unique HVAC challenges. Storm-damaged condenser units, emergency repairs, and replacement guidance.", href: "/hvac" },
              { icon: "📋", title: "TWIA & Insurance Claim Help", body: "Navigate TWIA claims, NFIP flood claims, and homeowners claims — including how to document the wind-vs-flood split that determines your payout.", href: "/insurance-claims" },
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

      <section style={{ backgroundColor: "#111827" }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "white", fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>Coastal Bend Areas We Serve</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {["Corpus Christi", "Portland", "Rockport", "Aransas Pass", "Ingleside", "Gregory", "Sinton", "Orange Grove", "Robstown", "Calallen", "Flour Bluff", "North Beach", "Padre Island", "Port Aransas"].map((area) => (
              <span key={area} style={{ backgroundColor: "rgba(118,185,0,0.1)", color: "#76b900", border: "1px solid rgba(118,185,0,0.3)", fontSize: "0.82rem", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>📍 {area}</span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="Corpus Christi Homeowner Questions — Answered" />
      <CTASection heading="Corpus Christi Homeowner? Get Help Now." subheading="Hurricane damage, TWIA claim guidance, roofing, or HVAC — submit your request and we'll connect you with the right resources. Bilingual EN/ES. Always free." primaryLabel="Request Help in Corpus Christi" secondaryLabel="Browse Homeowner Guides" secondaryHref="/guides" />
    </>
  );
}
