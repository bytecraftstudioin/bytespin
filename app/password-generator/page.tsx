"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  
  const [generatedPassword, setGeneratedPassword] = useState<string>("BSpin_p@ss_5tr0ng!");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charset) {
      alert("Please select at least one character type.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedPassword) return;
    try {
      await navigator.clipboard.writeText(generatedPassword);
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
    name: "Strong Password Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/password-generator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this password generator tool safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our strong password generator generates codes purely client-side inside your local browser memory space. No values or password lines are sent across servers or external metrics channels.",
        },
      },
      {
        "@type": "Question",
        name: "What makes a password strong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A highly resilient password structure contains at least 12 to 16 characters matching uniform mixes of uppercase letters, lowercase values, numeric indicators, and alphanumeric special symbol matrices.",
        },
      },
      {
  "@type": "Question",
  name: "Is this password generator free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin Password Generator is completely free to use."
  }
},
{
  "@type": "Question",
  name: "Can I generate passwords for social media accounts?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. You can create secure passwords for email, social media, banking and other online accounts."
  }
},
{
  "@type": "Question",
  name: "Are generated passwords stored anywhere?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "No. Passwords are generated locally in your browser and are never stored on our servers."
  }
},
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Dynamic SEO Structural Meta Headers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <section className="flex flex-col items-center text-center px-4 pt-16 pb-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Password Generator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Instantly create highly secure, custom random passwords to keep your digital accounts safe from security breaks.
        </p>

        {/* Master Interface Layout Panel */}
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 mb-10 text-left">
          
          {/* Dynamic Result Output Screen */}
          <div className="flex items-center justify-between gap-3 bg-slate-950/50 border border-white/5 rounded-2xl p-4 mb-8 font-mono text-sm sm:text-base">
            <span className="text-emerald-400 font-bold tracking-wide select-all truncate max-w-[280px] sm:max-w-md">
              {generatedPassword}
            </span>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all whitespace-nowrap ${
                copied ? "bg-emerald-600 text-white" : "bg-white/10 hover:bg-white/15 text-gray-200"
              }`}
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>

          {/* Length Range Tracking Slider Control */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm font-bold text-gray-300">
              <span>Character Length</span>
              <span className="text-violet-400 font-mono text-lg">{length}</span>
            </div>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

          {/* Configuration Matrix Grid Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <label className="flex items-center gap-3 bg-white/5 border border-white/5 p-3.5 rounded-xl cursor-pointer select-none hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500 bg-slate-950"
              />
              <span className="text-sm font-medium text-gray-200">Uppercase Letters (A-Z)</span>
            </label>

            <label className="flex items-center gap-3 bg-white/5 border border-white/5 p-3.5 rounded-xl cursor-pointer select-none hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500 bg-slate-950"
              />
              <span className="text-sm font-medium text-gray-200">Lowercase Letters (a-z)</span>
            </label>

            <label className="flex items-center gap-3 bg-white/5 border border-white/5 p-3.5 rounded-xl cursor-pointer select-none hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500 bg-slate-950"
              />
              <span className="text-sm font-medium text-gray-200">Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-3 bg-white/5 border border-white/5 p-3.5 rounded-xl cursor-pointer select-none hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500 bg-slate-950"
              />
              <span className="text-sm font-medium text-gray-200">Include Symbols (%@#!)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-violet-600/20"
          >
            🔑 Generate Secure Password
          </button>
        </div>
      </section>

      {/* --- EEAT COMPLIANT QUALITY CONTENT WRAPPER --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Why Use Our Random Password Generator?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Using repeated strings or familiar dates leaves profiles exposed to structural credential brute-force attacks. Our utility addresses this gap by compiling algorithmic random arrays instantly, producing completely random character blocks that are impossible to predict.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Pure Localized Security Execution</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Security tools must maintain maximum data isolation. ByteSpin generates your passwords completely inside your browser using client memory strings. No tokens or text patterns leave your device, ensuring zero server tracking footprint.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION PANEL --- */}
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

      {/* --- SITE ALIGNED SHARED MATRIX FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/yes-or-no" className="hover:text-violet-300 transition-colors">🤷 Yes or No Picker</a>
          <span className="text-white/10">|</span>
          <a href="/name-picker" className="hover:text-violet-300 transition-colors">📋 Name Picker</a>
          <span className="text-white/10">|</span>
          <span className="text-white/10">|</span>
<a href="/dice-roller" className="hover:text-violet-300 transition-colors">
  🎲 Dice Roller
</a>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

        {/* Essential Compliance Policy Hooks */}
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