import type { Metadata } from "next";
import GuideCard from "@/components/sections/GuideCard";
import CTASection from "@/components/sections/CTASection";
import { getPublishedGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Homeowner Guides for Texas Property Owners",
  description:
    "Step-by-step guides for Texas homeowners covering storm damage response, roof insurance claims, emergency repairs, and HVAC financing.",
};

export default function GuidesPage() {
  const guides = getPublishedGuides();

  return (
    <>
      <section style={{ backgroundColor: "#000000" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Homeowner Resources
          </p>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Property Help Guides for Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Practical, straightforward information to help you navigate property damage, insurance claims, and repair decisions.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #333" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px dashed #444444",
              borderRadius: "4px",
              padding: "32px",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            <p style={{ color: "#888888", fontSize: "0.875rem" }}>
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
