"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/config";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e0e0e0" }}
      className="sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              style={{
                backgroundColor: "var(--accent)",
                color: "#000000",
                fontWeight: 800,
                fontSize: "1rem",
                padding: "4px 8px",
                borderRadius: "4px",
                letterSpacing: "0.02em",
              }}
            >
              TPH
            </span>
            <span
              style={{ color: "#1a1a1a", fontWeight: 700, fontSize: "0.95rem" }}
              className="hidden sm:inline leading-tight"
            >
              Texas Property Help
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.cta ? (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    padding: "8px 18px",
                    borderRadius: "4px",
                    marginLeft: "8px",
                  }}
                  className="hover:opacity-90"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "#1a1a1a",
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
                  className="hover:text-[var(--accent)]"
                >
                  {link.label}
                </Link>
              )
            )}
            <span style={{ marginLeft: "12px" }}>
              <LanguageSwitcher />
            </span>
          </nav>

          {/* Mobile: language switcher + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md"
              style={{ color: "#1a1a1a" }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{ backgroundColor: "#f4f4f4", borderTop: "1px solid #e0e0e0" }}
          className="lg:hidden"
        >
          <nav className="flex flex-col px-4 py-3 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: link.cta ? "var(--accent)" : "#1a1a1a",
                  fontWeight: link.cta ? 700 : 500,
                  fontSize: "0.95rem",
                  padding: "10px 8px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
