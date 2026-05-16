import Link from "next/link";
import { ES } from "@/lib/translations-es";

const NAV_LINKS_ES = [
  { label: ES.nav.stormDamage, href: "/es/storm-damage" },
  { label: ES.nav.roofing, href: "/es/roofing" },
  { label: ES.nav.hvac, href: "/es/hvac" },
  { label: ES.nav.insuranceClaims, href: "/es/insurance-claims" },
  { label: ES.nav.financing, href: "/es/financing" },
  { label: ES.nav.guides, href: "/es/guides" },
];

export default function FooterES() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "#000000", color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ backgroundColor: "var(--accent)", color: "#000000", fontWeight: 800, fontSize: "0.9rem", padding: "3px 7px", borderRadius: "4px" }}>TPH</span>
              <span style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>Texas Property Help</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "rgba(255,255,255,0.6)" }}>{ES.footer.tagline}</p>
            <p style={{ fontSize: "0.8rem", marginTop: "12px", color: "rgba(255,255,255,0.65)" }}>{ES.footer.disclaimer}</p>
          </div>

          <div>
            <h3 style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {ES.footer.services}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS_ES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }} className="hover:text-[var(--accent)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {ES.footer.getHelp}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>{ES.footer.getHelpText}</p>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "0.875rem", padding: "10px 20px", borderRadius: "4px" }} className="hover:opacity-90">
              {ES.footer.requestHelp}
            </Link>
            <div style={{ marginTop: "16px" }}>
              <Link href="/" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }} className="hover:text-[var(--accent)]">
                🇺🇸 View in English
              </Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "40px", paddingTop: "24px" }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>© {year} {ES.footer.copyright}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }} className="hover:text-[var(--accent)]">
              Acerca de
            </Link>
            <Link href="/privacy-policy" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }} className="hover:text-[var(--accent)]">
              Privacidad
            </Link>
            <Link href="/terms-of-service" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }} className="hover:text-[var(--accent)]">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
