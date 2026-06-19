"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function NamePickerPage() {
  const [inputNames, setInputNames] = useState<string>(
    "Thunder\nShadow\nPhoenix\nTitan\nBlaze"
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [totalPicks, setTotalPicks] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePick = () => {
    if (picking) return;

    // Split input lines, clear white spaces, filter clean valid text arrays
    const namesArray = inputNames
      .split("\n")
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (namesArray.length === 0) {
      alert("Please enter at least one valid name.");
      return;
    }

    setPicking(true);
    setWinner(null);

    // Dynamic countdown logic tracking structure loop for suspense engagement
    let counter = 0;
    const interval = setInterval(() => {
      const tempRandomIndex = Math.floor(Math.random() * namesArray.length);
      setWinner(namesArray[tempRandomIndex]);
      counter++;

      if (counter > 12) {
        clearInterval(interval);
        
        // Absolute authentic final destination calculation selection
        const finalRandomIndex = Math.floor(Math.random() * namesArray.length);
        const finalSelectedName = namesArray[finalRandomIndex];
        
        setWinner(finalSelectedName);
        setHistory(prev => [finalSelectedName, ...prev].slice(0, 10));
        setTotalPicks(prev => prev + 1);
        setPicking(false);
      }
    }, 120);
  };

  const resetAll = () => {
    setWinner(null);
    setHistory([]);
    setTotalPicks(0);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Random Name Picker",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/name-picker",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the Random Name Picker choose a winner?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Name Picker randomly selects one name from your list. Every name has an equal chance of being chosen.",
        },
      },
      {
        "@type": "Question",
        name: "Is my input name data secure on this layout framework?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. ByteSpin processes code arrays purely client-side inside your live browser caching layer. No tracking records, network payloads, or server-side tables log your data strings.",
        },
      },
      {
  "@type": "Question",
  name: "Can I use this tool for giveaways?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The Name Picker is perfect for giveaways, lucky draws and contests."
  }
},
{
  "@type": "Question",
  name: "Is the Name Picker free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin Name Picker is completely free to use."
  }
},
{
  "@type": "Question",
  name: "Does the tool store my names?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "No. All names remain inside your browser and are not stored on our servers."
  }
},
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Dynamic SEO Structural Configurations Injections */}
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Name Picker</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Enter a list of names or custom titles to choose a single random winner instantly without bias.
        </p>

        {/* Master Name Input & Winner Showcase Block */}
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 mb-10 text-left">
          
          {/* Real-time Dynamic Winner Showcase Screen */}
          <div className="h-32 rounded-2xl bg-slate-950/50 border border-white/5 flex flex-col items-center justify-center mb-6 px-4 text-center">
            {picking ? (
              <span className="text-xl font-bold text-violet-400 animate-pulse tracking-wide">Shuffling Line Matrices...</span>
            ) : winner ? (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">🎉 Selected Winner 🎉</p>
                <h2 className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.25)] select-all truncate max-w-md">
                  {winner}
                </h2>
                <p className="text-sm text-gray-400 mt-4">
  Total Names: {
    inputNames
      .split("\n")
      .filter(name => name.trim().length > 0).length
  }
</p>
              </div>
            ) : (
              <span className="text-gray-500 font-medium text-sm">Winner value displays here after simulation sequence.</span>
            )}
          </div>

          {/* Core Input Field Box */}
          <div className="space-y-2 mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Enter Names (One per line)</label>
            <textarea
              rows={6}
              value={inputNames}
              onChange={(e) => setInputNames(e.target.value)}
              disabled={picking}
              placeholder="Enter item list here thalaiva..."
              className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-violet-500 transition-colors resize-y disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            onClick={handlePick}
            disabled={picking}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 text-white py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-violet-600/20"
          >
            {picking ? "Selecting..." : "Pick a Random Name"}
          </button>
        </div>

        {/* Operational Statistics Tracker */}
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-around items-center">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Rounds Played</p>
              <p className="text-3xl font-black text-violet-400">{totalPicks}</p>
            </div>
            {history.length > 0 && (
              <>
                <div className="h-8 w-px bg-white/10" />
                <button onClick={resetAll} className="text-xs font-bold text-rose-400 hover:underline transition-all">
                  Clear History
                </button>
              </>
            )}
          </div>

          {history.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left">
              <h3 className="text-sm font-bold mb-4 text-center text-gray-300">Recent Winners History</h3>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-2.5 border border-white/5">
                    <span className="text-gray-500 font-mono text-xs">Pick #{history.length - idx}</span>
                    <span className="font-bold text-gray-300 text-sm truncate max-w-[200px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- EEAT EXCLUSIVE EDITORIAL WRAPPER --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">What is the Random Name Picker?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            The Random Name Picker is an advanced digital raffle and automated choice generator asset. By collecting distinct user inputs structured sequentially line-by-line, the underlying computing script guarantees completely uniform draw weights across all indexed items.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Why Choose Local Client Choice Systems?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Unlike heavy external database servers that demand subscription pipelines or network payload routing steps, ByteSpin executes everything completely inside your personal machine runtime memory. This preserves absolute high-speed response frameworks while treating your inputs with high-level encryption standards.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION DISPLAY --- */}
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

      {/* --- TRUST DIRECTED ALIGNED SITE LAYOUT FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/yes-or-no" className="hover:text-violet-300 transition-colors">🤷 Yes or No Picker</a>
          <span className="text-white/10">|</span>
          <a href="/dice-roller" className="hover:text-violet-300 transition-colors">🎲 Dice Roller</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

        {/* Mandatory Policy Framework Navigation Hooks */}
       <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-400">
  <Link href="/about" className="hover:text-white transition-colors">
    About
  </Link>

  <span className="text-white/10">•</span>

  <Link href="/privacy" className="hover:text-white transition-colors">
    Privacy Policy
  </Link>

  <span className="text-white/10">•</span>

  <Link href="/terms" className="hover:text-white transition-colors">
    Terms of Service
  </Link>

  <span className="text-white/10">•</span>

  <Link href="/contact" className="hover:text-white transition-colors">
    Contact Us
  </Link>
</div>

        <p className="text-[11px] text-gray-600 font-medium">
          © 2026 ByteSpin by Bytecraft Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}