import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/es/HeaderES";
import Footer from "@/components/layout/es/FooterES";

export const metadata: Metadata = {
  metadataBase: new URL("https://texaspropertyhelp.com"),
  title: {
    default: "Texas Property Help | Ayuda para Propietarios de Texas",
    template: "%s | Texas Property Help",
  },
  description:
    "Texas Property Help conecta a propietarios con recursos para daños por tormenta, techos, HVAC, reclamaciones de seguro y financiamiento de reparaciones en todo Texas.",
  openGraph: {
    type: "website",
    locale: "es_US",
    url: "https://texaspropertyhelp.com/es",
    siteName: "Texas Property Help",
  },
  // alternates (canonical + hreflang) are set per-page, not here, because
  // a layout-level canonical would incorrectly stamp the same URL on all child routes.
};

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
