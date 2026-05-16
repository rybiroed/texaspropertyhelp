"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isES = pathname === "/es" || pathname.startsWith("/es/");

  const enPath = isES
    ? pathname === "/es" ? "/" : pathname.slice(3)
    : pathname;
  const esPath = isES
    ? pathname
    : pathname === "/" ? "/es" : `/es${pathname}`;

  return (
    <div
      role="navigation"
      aria-label="Language switcher"
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #d0d0d0",
        borderRadius: "20px",
        overflow: "hidden",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        flexShrink: 0,
      }}
    >
      <Link
        href={enPath}
        aria-current={!isES ? "page" : undefined}
        style={{
          padding: "4px 11px",
          backgroundColor: !isES ? "var(--accent)" : "transparent",
          color: !isES ? "#000000" : "#888888",
          lineHeight: 1.4,
        }}
      >
        EN
      </Link>
      <span
        aria-hidden="true"
        style={{ width: "1px", backgroundColor: "#d0d0d0", alignSelf: "stretch", flexShrink: 0 }}
      />
      <Link
        href={esPath}
        aria-current={isES ? "page" : undefined}
        style={{
          padding: "4px 11px",
          backgroundColor: isES ? "var(--accent)" : "transparent",
          color: isES ? "#000000" : "#888888",
          lineHeight: 1.4,
        }}
      >
        ES
      </Link>
    </div>
  );
}
