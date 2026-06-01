import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/sections/ServiceCard";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import GuideCard from "@/components/sections/GuideCard";
import NewsStrip from "@/components/sections/NewsStrip";
import { SITE_CONFIG } from "@/lib/config";
import { pageAlternates } from "@/lib/metadata";
import { getPublishedGuides } from "@/lib/guides";
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
    image: "https://images.unsplash.com/photo-1504608524841-42785f1c8f8?w=600&q=75",
    accentColor: "#ef4444",
  },
  {
    title: "Roofing Help",
    description: "From roof inspection to repair and replacement, get connected with qualified roofing professionals across Texas.",
    href: "/roofing",
    icon: "🏠",
    image: "/images/roofing-hero.png",
    accentColor: "#76b900",
  },
  {
    title: "HVAC Help",
    description: "Emergency HVAC repair, system replacement guidance, and financing options for heating and cooling issues.",
    href: "/hvac",
    icon: "🌡️",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=75",
    accentColor: "#0ea5e9",
  },
  {
    title: "Insurance Claim Help",
    description: "Understand the homeowner insurance claim process — documentation, communication, and what to expect.",
    href: "/insurance-claims",
    icon: "📄",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=75",
    accentColor: "#8b5cf6",
  },
  {
    title: "Repair Financing",
    description: "Explore financing options for emergency and planned home repairs when out-of-pocket costs are a barrier.",
    href: "/financing",
    icon: "💳",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=75",
    accentColor: "#f59e0b",
  },
  {
    title: "Property Repair Guides",
    description: "Step-by-step homeowner guides for storm response, insurance claims, and repair planning.",
    href: "/guides",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=75",
    accentColor: "#10b981",
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
  const recentGuides = getPublishedGuides()
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero with background photo */}
      <section style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80"
          alt="Texas home"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 50%, rgba(0,20,0,0.82) 100%)" }} />

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(118,185,0,0.15)",
            color: "#76b900",
            border: "1px solid rgba(118,185,0,0.4)",
            fontSize: "0.8rem",
            fontWeight: 700,
            padding: "6px 16px",
            borderRadius: "100px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}>
            ⛈️ Texas Storm Season 2026 — Get Help Now
          </div>
          <h1 style={{
            color: "white",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "20px",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}>
            Get the Right Help for Your<br />
            <span style={{ color: "#76b900" }}>Texas Property</span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            maxWidth: "580px",
            margin: "0 auto 36px",
            lineHeight: 1.75,
          }}>
            Storm damage, roofing issues, HVAC failures, insurance claims, and repair financing — Texas Property Help connects homeowners with the right resources at the right time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{
              display: "inline-block",
              backgroundColor: "#76b900",
              color: "#000000",
              fontWeight: 800,
              fontSize: "1rem",
              padding: "16px 36px",
              borderRadius: "6px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(118,185,0,0.4)",
            }} className="hover:opacity-90">
              Request Help Now →
            </Link>
            <Link href="/guides" style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "16px 32px",
              borderRadius: "6px",
              border: "2px solid rgba(255,255,255,0.35)",
              textDecoration: "none",
            }} className="hover:border-white hover:bg-white/10">
              Free Homeowner Guides
            </Link>
          </div>

          {/* City badges */}
          <div style={{ marginTop: "36px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth"].map((city) => (
              <Link key={city} href={`/${city.toLowerCase().replace(" ", "-")}`} style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.78rem",
                padding: "5px 12px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
                backgroundColor: "rgba(255,255,255,0.05)",
              }} className="hover:text-white hover:border-white/50">
                📍 {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
              What We Cover
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "12px" }}>
              How We Help Texas Homeowners
            </h2>
            <p style={{ color: "#6b7280", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem" }}>
              From emergency storm response to long-term repair planning — explore the areas where we can connect you with guidance and resources.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Live News Strip */}
      <NewsStrip guides={recentGuides} />

      {/* Recent Guides */}
      <section style={{ backgroundColor: "#111827" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Latest Resources
              </p>
              <h2 style={{ color: "#ffffff", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, margin: 0 }}>
                Recent Homeowner Guides
              </h2>
            </div>
            <Link href="/guides" style={{ color: "#76b900", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none" }}>
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGuides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>
        </div>
      </section>

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


