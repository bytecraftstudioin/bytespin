"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";


export default function YesOrNoPage() {
  const [result, setResult] = useState<"YES" | "NO" | null>(null);
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState<("YES" | "NO")[]>([]);
  const [totalPicks, setTotalPicks] = useState(0);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const yesCount = history.filter(item => item === "YES").length;
  const noCount = history.filter(item => item === "NO").length;

  const yesPercentage = totalPicks > 0 ? ((yesCount / totalPicks) * 100).toFixed(1) : 0;
  const noPercentage = totalPicks > 0 ? ((noCount / totalPicks) * 100).toFixed(1) : 0;

  // 1. Hook declaration constant type verify panniko:

// 2. Decision handler function block updates:
const handlePick = () => {
  if (thinking) return;
  setThinking(true);
  setResult(null);

  setTimeout(() => {
    // String content absolute state literals-ah thaan irukanum
    const decision: "YES" | "NO" = Math.random() < 0.5 ? "YES" : "NO";
    
    setResult(decision);
    // Explicit array assignment with strict types
    setHistory((prev: Array<"YES" | "NO">) => [decision, ...prev].slice(0, 10));
    setTotalPicks(prev => prev + 1);
    setThinking(false);
  }, 800);
};

  const resetAll = () => {
    setResult(null);
    setHistory([]);
    setTotalPicks(0);
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `🤷 ByteSpin Yes or No Picker Result: ${result}\n🌐 https://bytespin.bytecraftstudio.com/yes-or-no`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Yes or No Decision", text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Decision copied to clipboard!");
      }
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
    name: "Yes or No Picker",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/yes-or-no",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the Yes or No Picker work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool randomly selects either Yes or No whenever you click the button. Each result is independent and has an equal chance of appearing.",
        },
      },
      {
        "@type": "Question",
        name: "Is this choice maker biased?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The Yes or No Picker gives random results and does not favor Yes or No.",
        },
      },
      {
  "@type": "Question",
  name: "Can I use this tool for decisions?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The Yes or No Picker can help with simple everyday decisions and random choices."
  }
},
{
  "@type": "Question",
  name: "Is the Yes or No Picker free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. This tool is completely free to use without registration."
  }
},
{
  "@type": "Question",
  name: "Does the tool save my questions?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "No. Your questions and results are not stored."
  }
},
{
  "@type": "Question",
  name: "Can I use the Yes or No Picker on mobile?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The tool works on phones, tablets, and desktop devices."
  }
}
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Dynamic SEO Structured Schemas */}
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Yes or No Picker</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Stuck in a dilemma? Let our unbiased random generator instantly resolve your quick questions.
        </p>

        {/* Core Interactor Module Layout */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-10">
          <div className="h-40 flex items-center justify-center bg-slate-950/40 rounded-2xl border border-white/5 mb-8">
            {thinking ? (
              <span className="text-3xl font-bold text-violet-400 animate-pulse">Picking...</span>
            ) : result ? (
              <span
                className={`text-7xl font-black tracking-wider transition-all duration-300 ${
                  result === "YES" 
                    ? "text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]" 
                    : "text-rose-400 drop-shadow-[0_0_30px_rgba(248,113,113,0.3)]"
                }`}
              >
                {result}
              </span>
            ) : (
              <span className="text-gray-500 font-medium text-center px-4">
                Ask a question, then tap the button below.
              </span>
            )}
          </div>

          <button
            onClick={handlePick}
            disabled={thinking}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-violet-600/20"
          >
            {thinking ? "Picking..." : "Get Instant Answer"}
          </button>

          {result && !thinking && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={shareResult}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                📤 Share Answer
              </button>
              <button
                onClick={resetAll}
                className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                🔄 Reset Stats
              </button>
            </div>
          )}
        </div>

        {/* Stats and Realtime Array Logs Mapping */}
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-around items-center">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Decisions</p>
              <p className="text-3xl font-black text-violet-400">{totalPicks}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">YES / NO Split</p>
              <p className="text-sm font-bold text-gray-200 pt-1">
                {yesCount} Y - {noCount} N
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left">
              <h3 className="text-base font-bold mb-4 text-center text-gray-300">Session History Tracking</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {history.map((item, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs border ${
                      item === "YES" 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs text-gray-400">
                <span>YES Ratio: {yesPercentage}%</span>
                <span>NO Ratio: {noPercentage}%</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- EEAT COMPLIANT STRUCTURAL ARTICLE LAYER --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10 space-y-10 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">What is the Yes or No Picker?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            The Yes or No Picker is a simple online decision-making tool that gives you a random Yes or No answer instantly. It is useful when you need help making a quick choice between two options.
          </p>
        </div>

         <div>
        <h2 className="text-2xl font-bold mb-3 text-violet-400">Why Use a Yes or No Picker?</h2>
         <p className="text-gray-300 leading-relaxed text-sm">
            A Yes or No Picker can help you make quick decisions when you are unsure between two choices. It is useful for games, daily decisions, friendly debates, choosing activities, and other situations where a random answer can help.
          </p>
        </div>


        <div className="bg-violet-950/20 border border-violet-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2 text-violet-400">About ByteSpin</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            ByteSpin offers free online tools that help users make decisions, generate random results, and save time. Our goal is to provide simple, fast, and easy-to-use utilities that work on both desktop and mobile devices.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION CONTENT --- */}
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

      {/* --- ADSENSER STRUCTURE COMPLIANT INTEGRATED FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number Generator</a>
          <span className="text-white/10">|</span>
          <a href="/dice-roller" className="hover:text-violet-300 transition-colors">🎲 Dice Roller</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

        {/* Dynamic Compliance Links */}
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