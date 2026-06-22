import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy - ByteSpin",
  description:
    "Read the Privacy Policy for ByteSpin. Learn how we maintain a 100% anonymous, safe, and tracking-free ecosystem for our online tools.",
  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-left space-y-10">
        {/* Header Section */}
        <div className="border-b border-white/10 pb-6 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">
            Last Updated: June 2026
          </p>
        </div>

        <p className="text-gray-300 leading-relaxed">
          At ByteSpin, accessible from bytespin.bytecraftstudio.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected or processed by ByteSpin and how we manage it.
        </p>

        {/* 1. Client-Side Processing Assurance */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-violet-400">1. Localized Data Processing (No Data Collection)</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            ByteSpin operates fundamentally as a decentralized utility suite. Our tools, including the 
            <strong> Coin Flip</strong> and <strong>Random Number Generator</strong>, process all mathematical logic and random determinations natively inside your personal web browser layout framework. 
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            Because of this client-side configuration architecture, your session inputs, ranges, and generated history states are never transmitted to our host servers, making your interaction 100% private and anonymous.
          </p>
        </div>

        {/* 2. Log Files Context */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-violet-400">2. Log Files</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Like standard web infrastructure deployment workflows, ByteSpin follows a routine procedure of using server log files. These files log visitors when they visit web pages. The information collected by log files includes internet protocol (IP) addresses, browser application type, Internet Service Provider (ISP), date and time stamps, referring/exit pathways, and possibly the number of clicks. 
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            These metrics are completely isolated from any personally identifiable information. The purpose of this structural data is solely for analyzing core performance trends, administering the site layouts, tracking server errors, and optimizing demographic scaling.
          </p>
        </div>

        {/* 3. Cookies and Adsense readiness */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-violet-400">3. Cookies and Web Beacons</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            ByteSpin does not directly deploy operational profile cookies to identify our users. However, third-party vendor platforms such as Google may use cookies (like the DART cookie) to serve relevant advertisements based on a user's visit to our digital utilities and other platforms across the web network.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            You can choose to disable cookies through your individual browser options or manage third-party processing limits via the official network choice opt-out configurations.
          </p>
        </div>

        {/* 4. Children Information */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-violet-400">4. Children's Privacy</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Another core component of our service mapping is adding protection for children while using the internet safely. We do not knowingly collect or request any personal tracking signatures from children under the age of 13. Since our micro-applications execute completely safely inside your local device cache, our platform remains completely benign and open for students and global learners.
          </p>
        </div>

        {/* 5. Consent */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-violet-400">5. Consent</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            By utilizing our web properties, you hereby explicitly consent to the operational conditions stated inside our Privacy Policy overview and agree to its native execution terms.
          </p>
        </div>
      </section>

      {/* --- PROFESSIONAL TRUST-FOOTER REGISTRATION --- */}
      <footer className="max-w-4xl mx-auto px-6 pb-16 text-center border-t border-white/10 pt-8">
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-400">
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <span className="text-white/10">•</span>
          <a href="/privacy" className="text-white font-bold transition-colors">Privacy Policy</a>
          <span className="text-white/10">•</span>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <span className="text-white/10">•</span>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">
          © 2026 ByteSpin by Bytecraft Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}