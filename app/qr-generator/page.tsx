"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Navbar from "@/components/layout/Navbar";

export default function QrGeneratorPage() {
  const [text, setText] = useState<string>("https://bytespin.bytecraftstudio.com");
  const [qrSrc, setQrSrc] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 🔥 Live generation mechanism hook tracking string inputs
  useEffect(() => {
    if (!text.trim()) {
      setQrSrc("");
      return;
    }
    QRCode.toDataURL(
      text,
      {
        width: 300,
        margin: 2,
        color: {
          dark: "#0f172a",  // Dark slate modules
          light: "#ffffff", // Pure white background matrix
        },
      },
      (err, url) => {
        if (err) console.error(err);
        if (url) setQrSrc(url);
      }
    );
  }, [text]);

  const handleDownload = () => {
    if (!qrSrc) return;
    const link = document.createElement("a");
    link.href = qrSrc;
    link.download = "bytespin-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free QR Code Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/qr-generator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do the generated QR codes expire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, our generated matrix patterns are static, meaning the embedded string URLs remain active permanently without any expiry limits.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any commercial download limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely not. You can generate, customize, and download high-resolution PNG data models completely free for personal or commercial campaigns.",
        },
      },
      {
  "@type": "Question",
  name: "Can I generate QR codes for websites?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. You can create QR codes for websites, text, email addresses, phone numbers and more."
  }
},
{
  "@type": "Question",
  name: "Is this QR Code Generator free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin QR Code Generator is completely free to use."
  }
},
{
  "@type": "Question",
  name: "Can I download the generated QR code?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. You can instantly download the generated QR code as a PNG image."
  }
}
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Structural Metadata Optimizations Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Main Core Viewport Container */}
      <section className="flex flex-col items-center text-center px-4 pt-16 pb-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">QR Code Generator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Create functional, high-density matrix QR codes instantly. Perfect for links, contact credentials, or custom textual parameters.
        </p>

        {/* 🔥 Mobile Friendly Split Content Grid Setup */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          
          {/* Left Side Control Panel */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Input Link or Content text
              </label>
              <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a URL, text, email address or phone number..."
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
              <p className="text-[11px] text-gray-500 font-medium italic">
                * Real-time encoding automatically adjusts as you type code data strings.
              </p>
            </div>

            {/* Feature Trigger Toolbar */}
            <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
              <button
                onClick={handleCopyUrl}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all ${
                  copied ? "bg-emerald-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-gray-200"
                }`}
              >
                {copied ? "✓ URL Copied" : "🔥 Copy Tool URL"}
              </button>
            </div>
          </div>

          {/* Right Side 🔥 QR Preview Screen Canvas */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Live Matrix Canvas Preview
            </p>

            <div className="bg-white p-4 rounded-2xl shadow-2xl min-h-[212px] min-w-[212px] flex items-center justify-center transition-all duration-300">
              {qrSrc ? (
                <img
                  src={qrSrc}
                  alt="ByteSpin QR Live Output Matrix"
                  className="w-48 h-48 block object-contain select-none animate-fade-in"
                />
              ) : (
                <span className="text-slate-400 text-xs font-mono max-w-[140px]">
                  Waiting for clean input parameters...
                </span>
              )}
            </div>

            {/* 🔥 Download Action Hub */}
            <button
              onClick={handleDownload}
              disabled={!qrSrc}
              className="mt-6 w-full max-w-[240px] bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-violet-600/10"
            >
              🔥 Download PNG Asset
            </button>
          </div>
        </div>
      </section>

      {/* --- EEAT COMPLIANT MARKETING SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Why Generate Static QR Matrices?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Quick Response symbols convert alphanumeric string blocks into direct matrix clusters that mobile sensors decode natively. Static rendering embeds data directly, avoiding redirect trackers and third-party dependencies, keeping connections private.
          </p>
        </div>
      </section>

      {/* --- FAQ BLOCKS SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-400">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center px-5 py-3.5 font-bold text-base hover:bg-white/5 transition-colors"
              >
                <span>{item.name}</span>
                <span className="text-violet-400">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-3.5 pt-1.5 text-gray-300 text-sm leading-relaxed border-t border-white/5">
                  {item.acceptedAnswer.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- BRAND VERIFIED POLICY DRIVEN SHARED FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/yes-or-no" className="hover:text-violet-300 transition-colors">🤷 Yes or No Picker</a>
          <span className="text-white/10">|</span>
          <a href="/password-generator" className="hover:text-violet-300 transition-colors">🔑 Password Generator</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

        {/* AdSense Structural Legal Safety Layout Links */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-400">
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <span className="text-white/10">•</span>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-white/10">•</span>
          <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="text-white/10">•</span>
          <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
        </div>

        <p className="text-[11px] text-gray-600 font-medium">
          © 2026 ByteSpin by Bytecraft Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}