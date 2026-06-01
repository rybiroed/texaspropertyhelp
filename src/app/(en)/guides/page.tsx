import type { Metadata } from "next";
import Image from "next/image";
import GuideCard from "@/components/sections/GuideCard";
import CTASection from "@/components/sections/CTASection";
import { getPublishedGuides } from "@/lib/guides";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Homeowner Guides for Texas Property Owners",
  description:
    "Step-by-step guides for Texas homeowners covering storm damage response, roof insurance claims, emergency repairs, and HVAC financing.",
  alternates: pageAlternates("/guides", "/es/guides"),
};

export default function GuidesPage() {
  const guides = getPublishedGuides();

  return (
    <>
      <section style={{ position: "relative", minHeight: "380px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/guides-hero.jpg" alt="Texas homeowner guides" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,20,10,0.65) 0%, rgba(0,30,15,0.50) 100%)" }} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(118,185,0,0.15)", color: "#76b900", border: "1px solid rgba(118,185,0,0.4)", fontSize: "0.8rem", fontWeight: 700, padding: "6px 16px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            📚 Homeowner Resources
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Property Help Guides for Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Practical, straightforward information to help you navigate property damage, insurance claims, and repair decisions.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#f3f4f6" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px dashed #d1d5db",
              borderRadius: "4px",
              padding: "32px",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              More guides are in development — covering insurance procedures, storm preparedness, contractor selection, and financing options.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a Specific Question?"
        subheading="Don't see what you're looking for? Submit a request and we'll help connect you with the right guidance for your situation."
        primaryLabel="Submit a Request"
        variant="dark"
        secondaryLabel={undefined}
        secondaryHref={undefined}
      />
    </>
  );
}
