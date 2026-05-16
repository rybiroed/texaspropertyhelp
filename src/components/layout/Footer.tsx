import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#000000", color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#000000",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  padding: "3px 7px",
                  borderRadius: "4px",
                }}
              >
                TPH
              </span>
              <span style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>
                Texas Property Help
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "rgba(255,255,255,0.6)" }}>
              Helping Texas homeowners navigate storm damage, roofing issues, HVAC problems, insurance claims, and repair financing.
            </p>
            <p style={{ fontSize: "0.8rem", marginTop: "12px", color: "rgba(255,255,255,0.4)" }}>
              Texas Property Help is a homeowner assistance and referral platform — not an insurance company, contractor, or law firm.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h3 style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Services
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.filter((l) => !l.cta).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}
                    className="hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + CTA */}
          <div>
            <h3 style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Get Help
            </h3>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>
              Tell us about your property issue and we&apos;ll help connect you with the right resources.
            </p>
            <Link
              href="/request-help"
              style={{
                display: "inline-block",
                backgroundColor: "var(--accent)",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.875rem",
                padding: "10px 20px",
                borderRadius: "4px",
              }}
              className="hover:opacity-90"
            >
              Request Help →
            </Link>
            {SITE_CONFIG.email && (
              <p style={{ fontSize: "0.8rem", marginTop: "14px", color: "rgba(255,255,255,0.5)" }}>
                Email:{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[var(--accent)]">
                  {SITE_CONFIG.email}
                </a>
              </p>
            )}
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "40px", paddingTop: "24px" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            © {year} Texas Property Help. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/guides" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }} className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <Link href="/request-help" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }} className="hover:text-[var(--accent)]">
              Contact
            </Link>
            <Link href="/about" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }} className="hover:text-[var(--accent)]">
              About
            </Link>
            <Link href="/privacy-policy" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }} className="hover:text-[var(--accent)]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }} className="hover:text-[var(--accent)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
