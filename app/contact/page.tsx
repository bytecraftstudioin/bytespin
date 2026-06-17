import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Contact Us - ByteSpin",
  description:
    "Get in touch with ByteSpin. Have feedback, utility suggestions, or business inquiries? Reach out to the Bytecraft Studio team directly.",
  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-left space-y-12">
        {/* Header Block */}
        <div className="border-b border-white/10 pb-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">
            Have questions, feature requests, or scaling feedback? We would love to hear from you.
          </p>
        </div>

        {/* Core Explanatory Frame */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-violet-400">Get In Touch</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            ByteSpin is built and maintained as an open choice utility engine under the supervision of 
            <strong> Bytecraft Studio</strong>. We strive to maintain absolute high performance layouts across 
            all digital randomizers, and your active inputs help us refine execution logic matrices.
          </p>
        </div>

        {/* Dynamic Support Channels Mapping cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Support Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="text-3xl">📧</div>
            <h3 className="text-xl font-bold text-gray-100">Support Email</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              For general optimization bugs, technical site faults, data logic reporting, or utility framework updates:
            </p>
            <p className="text-violet-400 font-bold text-sm select-all pt-2">
              support@bytecraftstudio.com
            </p>
          </div>

          {/* Business Inquiries Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="text-3xl">💼</div>
            <h3 className="text-xl font-bold text-gray-100">Business & Collaboration</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              For administrative feedback, generic utility cross-integration partnerships, AdSense clearance tracking, or licensing questions:
            </p>
            <p className="text-indigo-400 font-bold text-sm select-all pt-2">
              contact@bytecraftstudio.com
            </p>
          </div>
        </div>

        {/* Operational Response Commitment (EEAT Trust Indicator) */}
        <div className="bg-gradient-to-r from-violet-950/20 to-indigo-950/20 border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-violet-400 uppercase tracking-wider mb-2">Response Guidelines</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            As a dedicated development ecosystem framework, our response validation loop typically reviews tracking submissions inside a 24 to 48-hour timeline framework. We explicitly guarantee that your structural communication text arrays are utilized solely to address your technical report questions and are never indexed for third-party marketing actions.
          </p>
        </div>
      </section>

      {/* --- TRUST-LEVELED GLOBAL APPLICATION FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pb-16 text-center border-t border-white/10 pt-8">
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-400">
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <span className="text-white/10">•</span>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-white/10">•</span>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <span className="text-white/10">•</span>
          <a href="/contact" className="text-white font-bold transition-colors">Contact</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">
          © 2026 ByteSpin by Bytecraft Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}