import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/instagram/Hero";
import UrlInput from "@/components/instagram/UrlInput";
import Features from "@/components/instagram/Features";
import FAQ from "@/components/instagram/FAQ";
import SeoContent from "@/components/instagram/SeoContent";
import Footer from "@/components/instagram/Footer";

export default function InstagramDownloaderPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">

      <Navbar />

      <Hero />

      <section className="max-w-4xl mx-auto px-4 py-10">

        <UrlInput />

      </section>

      <Features />

      <SeoContent />

      <FAQ />

      <Footer />

    </main>
  );
}