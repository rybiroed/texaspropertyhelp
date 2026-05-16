"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GUIDE_SLUG_EN_TO_ES, GUIDE_SLUG_ES_TO_EN } from "@/lib/metadata";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isES = pathname === "/es" || pathname.startsWith("/es/");

  const enGuideMatch = pathname.match(/^\/guides\/([^/]+)$/);
  const esGuideMatch = pathname.match(/^\/es\/guides\/([^/]+)$/);

  let enPath: string;
  let esPath: string;

  if (enGuideMatch) {
    const esSlug = GUIDE_SLUG_EN_TO_ES[enGuideMatch[1]];
    enPath = pathname;
    esPath = esSlug ? `/es/guides/${esSlug}` : "/es/guides";
  } else if (esGuideMatch) {
    const enSlug = GUIDE_SLUG_ES_TO_EN[esGuideMatch[1]];
    enPath = enSlug ? `/guides/${enSlug}` : "/guides";
    esPath = pathname;
  } else {
    enPath = isES ? (pathname === "/es" ? "/" : pathname.slice(3)) : pathname;
    esPath = isES ? pathname : (pathname === "/" ? "/es" : `/es${pathname}`);
  }

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
