import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/sections/ServiceCard";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import { SITE_CONFIG } from "@/lib/config";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Texas Property Help | Storm Damage, Roofing, HVAC & Insurance Help",
  description:
    "Texas Property Help connects homeowners with local service professionals for storm damage, roofing, HVAC, insurance claim guidance, and repair financing across Texas.",
  alternates: pageAlternates("/", "/es"),
};

const services = [
  {
    title: "Storm Damage",
    description: "Hail, wind, and water damage — get help documenting, assessing, and addressing property damage after Texas storms.",
    href: "/storm-damage",
    icon: "⛈️",
  },
  {
    title: "Roofing Help",
    description: "From roof inspection to repair and replacement, get connected with qualified roofing professionals across Texas.",
    href: "/roofing",
    icon: "🏠",
  },
  {
    title: "HVAC Help",
    description: "Emergency HVAC repair, system replacement guidance, and financing options for heating and cooling issues.",
    href: "/hvac",
    icon: "🌡️",
  },
  {
    title: "Insurance Claim Help",
    description: "Understand the homeowner insurance claim process — documentation, communication, and what to expect.",
    href: "/insurance-claims",
    icon: "📄",
  },
  {
    title: "Repair Financing",
    description: "Explore financing options for emergency and planned home repairs when out-of-pocket costs are a barrier.",
    href: "/financing",
    icon: "💳",
  },
  {
    title: "Property Repair Guides",
    description: "Step-by-step homeowner guides for storm response, insurance claims, and repair planning.",
    href: "/guides",
    icon: "📚",
  },
];

const homeFaqs: FAQItem[] = [
  {
    question: "What is Texas Property Help?",
    answer:
      "Texas Property Help is a homeowner assistance and referral platform. We help Texas homeowners understand their options after property damage, navigate insurance claims, and connect with relevant service providers. We are not a contractor, insurance company, or law firm.",
  },
  {
    question: "Is this service free for homeowners?",
    answer:
      "Submitting a request and receiving information through our platform is free. If you are connected with a service provider, their individual fees and terms apply and vary.",
  },
  {
    question: "What areas of Texas do you serve?",
    answer:
      `We currently assist homeowners across Texas, including ${SITE_CONFIG.serviceAreas.slice(0, 6).join(", ")}, and surrounding areas. Coverage is expanding.`,
  },
  {
    question: "Do you guarantee insurance claim approval?",
    answer:
      "No. We do not guarantee insurance claim outcomes. All claim decisions are made by your insurance company based on your specific policy and the documented damage.",
  },
  {
    question: "Can I get help in Spanish?",
    answer:
      "Yes. When you submit your request, select Spanish as your preferred language and we will make every effort to connect you with a Spanish-speaking resource.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ backgroundColor: "#000000", paddingTop: "72px", paddingBottom: "72px" }}
        className="px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            style={{
              display: "inline-block",
              backgroundColor: "var(--accent-muted)",
              color: "var(--accent)",
              fontSize: "0.8rem",
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: "4px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Texas Homeowner Resources
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            Get the Right Help for Your Texas Property
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              maxWidth: "600px",
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Storm damage, roofing issues, HVAC failures, insurance claims, and repair financing — Texas Property Help connects homeowners with the right resources at the right time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/request-help"
              style={{
                display: "inline-block",
                backgroundColor: "var(--accent)",
                color: "#000000",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "16px 32px",
                borderRadius: "4px",
              }}
              className="hover:opacity-90"
            >
              Request Help →
            </Link>
            <Link
              href="/guides"
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: "var(--accent)",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "16px 32px",
                borderRadius: "4px",
                border: "2px solid var(--accent)",
              }}
              className="hover:opacity-80"
            >
              Get a Free Property Help Review
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#0a0a0a" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                fontWeight: 800,
                marginBottom: "12px",
              }}
            >
              How We Help Texas Homeowners
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem" }}>
              From emergency storm response to long-term repair planning — explore the areas where we can connect you with guidance and resources.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* FAQ */}
      <FAQ items={homeFaqs} heading="Common Questions About Texas Property Help" />

      <CTASection
        heading="Have a Property Issue You Need Help With?"
        subheading="Submit a quick request and we'll help identify the right resources for your situation — storm damage, roofing, HVAC, insurance, or financing."
        primaryLabel="Request Help Now"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
