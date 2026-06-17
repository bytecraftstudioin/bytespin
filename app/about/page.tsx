import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "About Us - ByteSpin",
  description:
    "Learn more about ByteSpin, our mission to provide lightning-fast, free online randomizers, decision pickers, and productivity utilities.",
  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-left space-y-12">
        {/* Header Title */}
        <div className="border-b border-white/10 pb-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">About ByteSpin</h1>
          <p className="text-gray-400 text-lg">
            Fast, free, and completely unbiased online randomizers designed for everyday micro-decisions.
          </p>
        </div>

        {/* Brand Description Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-violet-400">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed">
            ByteSpin is a robust ecosystem of micro-utilities designed to take the friction out of decision-making. 
            Whether you need to pick a winner for a giveaway, split a team order, or resolve a friendly dispute, 
            our tools provide objective, instantaneous results right within your web browser engine.
          </p>
          <p className="text-gray-300 leading-relaxed">
            As an utility suite developed under <strong>Bytecraft Studio</strong>, every digital asset we deploy 
            is engineered from the ground up to be ultra-lightweight, beautiful to look at, and hyper-functional 
            on any computer display or mobile device screen.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-violet-950/30 to-indigo-950/30 border border-violet-500/20 rounded-3xl p-8 space-y-3">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Our mission is simple: to provide useful, high-speed online tools that deliver outcomes instantly without 
            the hassle of hidden subscription barriers, personal registration forms, tracking cookie pools, or desktop software installations.
          </p>
        </div>

        {/* Popular Tools Catalog with direct internal links for SEO crawling */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-violet-400">Popular Tools</h2>
          <p className="text-gray-400 text-sm">
            Explore our expanding suite of web applications built to optimize your productivity flow:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <li>
              <a href="/coin-flip" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-violet-500/40 p-4 rounded-xl font-bold text-gray-200 transition-all group">
                <span className="text-xl group-hover:scale-110 transition-transform">🪙</span>
                <span>Coin Flip Tool</span>
              </a>
            </li>
            <li>
              <a href="/random-number-generator" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-violet-500/40 p-4 rounded-xl font-bold text-gray-200 transition-all group">
                <span className="text-xl group-hover:scale-110 transition-transform">🔢</span>
                <span>Random Number Generator</span>
              </a>
            </li>
            <li>
              <a href="/dice-roller" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-violet-500/40 p-4 rounded-xl font-bold text-gray-200 transition-all group">
                <span className="text-xl group-hover:scale-110 transition-transform">🎲</span>
                <span>Dice Roller (Coming Soon)</span>
              </a>
            </li>
            <li>
              <a href="/yes-or-no" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-violet-500/40 p-4 rounded-xl font-bold text-gray-200 transition-all group">
                <span className="text-xl group-hover:scale-110 transition-transform">🙋</span>
                <span>Yes or No Picker (Coming Soon)</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Commitment to Transparency (EEAT Core Block) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-violet-400">Unbiased & Transparent</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            We value your session confidence above everything else. All randomization actions triggered across 
            our tools use localized client-side script math properties. There are zero background network 
            manipulations running on our platform servers, assuring that your digital selection metrics remain 
            100% fair, transparent, and private.
          </p>
        </div>
      </section>

      {/* --- PROFESSIONAL TRUST-FOOTER REGISTRATION --- */}
      <footer className="max-w-4xl mx-auto px-6 pb-16 text-center border-t border-white/10 pt-8">
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-400">
          <a href="/about" className="text-white font-bold transition-colors">About</a>
          <span className="text-white/10">•</span>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-white/10">•</span>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <span className="text-white/10">•</span>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">
          © {new Date().getFullYear()} ByteSpin by Bytecraft Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}