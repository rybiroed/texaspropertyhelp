import type { Metadata } from "next";

const BASE = "https://texaspropertyhelp.com";

function abs(path: string): string {
  return BASE + (path === "/" ? "" : path);
}

/**
 * Maps EN guide slugs to their ES counterparts and vice versa.
 * Guides use different slugs per language rather than the same slug.
 */
export const GUIDE_SLUG_EN_TO_ES: Record<string, string> = {
  "what-to-do-after-hail-damage-texas": "que-hacer-despues-de-danos-por-granizo-texas",
  "roof-insurance-claim-checklist": "lista-verificacion-reclamacion-seguro-techo",
  "emergency-roof-leak-steps": "fuga-techo-emergencia-pasos",
  "hvac-replacement-financing-basics": "financiamiento-reemplazo-hvac-basicos",
};

export const GUIDE_SLUG_ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(GUIDE_SLUG_EN_TO_ES).map(([en, es]) => [es, en])
);

/**
 * Returns Metadata.alternates with canonical + reciprocal hreflang pairs.
 *
 * @param enPath    EN path, e.g. "/" or "/storm-damage"
 * @param esPath    ES path, e.g. "/es" or "/es/storm-damage", or null when no Spanish page exists
 * @param isSpanish Set true when building metadata for the Spanish page
 */
export function pageAlternates(
  enPath: string,
  esPath: string | null,
  isSpanish = false,
): Metadata["alternates"] {
  const canonical = abs(isSpanish ? (esPath ?? enPath) : enPath);

  if (!esPath) {
    return { canonical };
  }

  return {
    canonical,
    languages: {
      "en-US": abs(enPath),
      "es-US": abs(esPath),
      "x-default": abs(enPath),
    },
  };
}
