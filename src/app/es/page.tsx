import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/sections/ServiceCard";
import TrustSectionES from "@/components/sections/es/TrustSectionES";
import FAQES from "@/components/sections/es/FAQES";
import { ES } from "@/lib/translations-es";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Texas Property Help | Ayuda para Propietarios en Texas",
  description:
    "Texas Property Help conecta a propietarios con recursos para daños por tormenta, techos, HVAC, reclamaciones de seguro y financiamiento de reparaciones en Texas.",
  alternates: pageAlternates("/", "/es", true),
};

export default function EsHomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)", paddingTop: "72px", paddingBottom: "72px" }} className="px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ display: "inline-block", backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700, padding: "6px 14px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            {ES.home.badge}
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "20px" }}>
            {ES.home.h1}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: "600px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            {ES.home.subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "16px 32px", borderRadius: "8px" }} className="hover:opacity-90">
              {ES.home.ctaPrimary}
            </Link>
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "16px 32px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.35)" }} className="hover:bg-white/10">
              {ES.home.ctaSecondary}
            </Link>
          </div>
          {/* Language toggle */}
          <p style={{ marginTop: "24px", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
            Looking for English?{" "}
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline" }} className="hover:text-white">
              View English version →
            </Link>
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "var(--off-white)" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: "var(--navy)", fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, marginBottom: "12px" }}>
              {ES.home.servicesHeading}
            </h2>
            <p style={{ color: "var(--content-secondary)", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem" }}>
              {ES.home.servicesSubheading}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ES.services.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <TrustSectionES />
      <FAQES items={ES.homeFaqs} heading={ES.home.faqHeading} />

      {/* CTA */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px", lineHeight: 1.3 }}>
            {ES.home.ctaBottomHeading}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "32px", maxWidth: "560px", margin: "0 auto 32px" }}>
            {ES.home.ctaBottomSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
              {ES.home.ctaBottomPrimary}
            </Link>
            <Link href="/es/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)" }} className="hover:bg-white/10">
              {ES.home.ctaBottomSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
