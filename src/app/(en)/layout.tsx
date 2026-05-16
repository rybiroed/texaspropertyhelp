import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
