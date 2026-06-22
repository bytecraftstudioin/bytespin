"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

type TabType = "basic" | "change" | "commercial";

export default function PercentageCalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sub-Tool 1: What is X% of Y?
  const [p1X, setP1X] = useState<string>("25");
  const [p1Y, setP1Y] = useState<string>("100");
  const [res1, setRes1] = useState<string>("");

  // Sub-Tool 2: X is what % of Y?
  const [p2X, setP2X] = useState<string>("50");
  const [p2Y, setP2Y] = useState<string>("200");
  const [res2, setRes2] = useState<string>("");

  // Sub-Tool 3: Percentage Change (Increase/Decrease)
  const [changeFrom, setChangeFrom] = useState<string>("1000");
  const [changeTo, setChangeTo] = useState<string>("800");
  const [resChange, setResChange] = useState<string>("");

  // Sub-Tool 4: Discount & Markup
  const [basePrice, setBasePrice] = useState<string>("1200");
  const [ratePct, setRatePct] = useState<string>("15");
  const [resDiscount, setResDiscount] = useState<string>("");
  const [resMarkup, setResMarkup] = useState<string>("");

  const copyResult = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.error(err);
    }
  };

  // Real-time Computation Hooks Matrix Framework
  useEffect(() => {
    // Standard Max Input Cap Limits Check validation to prevent breaks
    const limit = 1000000000;

    // 1. What is X% of Y?
    const x1 = parseFloat(p1X);
    const y1 = parseFloat(p1Y);
    if (!isNaN(x1) && !isNaN(y1) && y1 !== 0 && y1 <= limit) {
      setRes1(((x1 / 100) * y1).toFixed(2).replace(/\.00$/, ""));
    } else {
      setRes1("");
    }

    // 2. X is what % of Y?
    const x2 = parseFloat(p2X);
    const y2 = parseFloat(p2Y);
    if (!isNaN(x2) && !isNaN(y2) && y2 !== 0 && y2 <= limit) {
      setRes2(((x2 / y2) * 100).toFixed(2).replace(/\.00$/, "") + "%");
    } else {
      setRes2("");
    }

    // 3. Percentage Change
    const cFrom = parseFloat(changeFrom);
    const cTo = parseFloat(changeTo);
    if (!isNaN(cFrom) && !isNaN(cTo) && cFrom !== 0 && cFrom <= limit) {
      const diff = cTo - cFrom;
      const pct = (diff / cFrom) * 100;
      const rounded = Math.abs(pct).toFixed(2).replace(/\.00$/, "");
      setResChange(pct >= 0 ? `${rounded}% Increase` : `${rounded}% Decrease`);
    } else {
      setResChange("");
    }

    // 4. Commercial Data (Discount & Markup)
    const bp = parseFloat(basePrice);
    const rate = parseFloat(ratePct);
    if (!isNaN(bp) && !isNaN(rate) && bp <= limit) {
      const dAmt = (bp * rate) / 100;
      setResDiscount(`₹${(bp - dAmt).toFixed(2).replace(/\.00$/, "")} (Saved: ₹${dAmt.toFixed(2).replace(/\.00$/, "")})`);
      setResMarkup(`₹${(bp + dAmt).toFixed(2).replace(/\.00$/, "")} (Profit: ₹${dAmt.toFixed(2).replace(/\.00$/, "")})`);
    } else {
      setResDiscount("");
      setResMarkup("");
    }
  }, [p1X, p1Y, p2X, p2Y, changeFrom, changeTo, basePrice, ratePct]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Multi Percentage Calculator Suite",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/percentage-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate percentage increase or decrease?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtract the historical original value input from the updated terminal numerical threshold, divide that difference margin matrix cleanly against your baseline parameter, and multiply by 100.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate a percentage of a number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply the number by the percentage and divide by 100.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate percentage increase?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtract the old value from the new value, divide by the old value, and multiply by 100.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate percentage decrease?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtract the new value from the old value, divide by the old value, and multiply by 100.",
        },
      },
      {
        "@type": "Question",
        name: "Can I calculate discounts with this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The commercial calculator includes discount and markup calculations.",
        },
      },
      {
        "@type": "Question",
        name: "Is this percentage calculator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All calculations are free and run directly in your browser.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <section className="flex flex-col items-center text-center px-4 pt-12 pb-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight max-w-4xl">Percentage Calculator</h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mb-8">
          Quickly compute matrix intervals, change deviations, product markups, and commercial active discounts instantly.
        </p>

        {/* Dynamic Nav Tabs Segment Controllers */}
        <div className="flex bg-slate-950/60 p-1 rounded-2xl border border-white/5 mb-8 w-full max-w-lg text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex-1 py-3 font-bold rounded-xl transition-all ${activeTab === "basic" ? "bg-violet-600 text-white shadow" : "text-gray-400 hover:text-gray-200"}`}
          >
            Basic Ratio
          </button>
          <button
            onClick={() => setActiveTab("change")}
            className={`flex-1 py-3 font-bold rounded-xl transition-all ${activeTab === "change" ? "bg-violet-600 text-white shadow" : "text-gray-400 hover:text-gray-200"}`}
          >
            % Change
          </button>
          <button
            onClick={() => setActiveTab("commercial")}
            className={`flex-1 py-3 font-bold rounded-xl transition-all ${activeTab === "commercial" ? "bg-violet-600 text-white shadow" : "text-gray-400 hover:text-gray-200"}`}
          >
            Commercial
          </button>
        </div>

        {/* Core Calculation UI Panel Boxes */}
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 text-left">
          
          {/* TAB 1: BASIC RATIO TOOLS */}
          {activeTab === "basic" && (
            <div className="space-y-6 animate-fade-in">
              {/* Tool 1 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-violet-400 tracking-wider">What is X% of Y?</h3>
                <div className="flex items-center gap-2">
                  <input type="number" value={p1X} onChange={(e) => setP1X(e.target.value)} className="w-20 sm:w-24 bg-slate-950/40 border border-white/10 rounded-xl p-2.5 text-center text-sm font-bold" />
                  <span className="text-xs font-bold text-gray-400">% &nbsp; of</span>
                  <input type="number" value={p1Y} onChange={(e) => setP1Y(e.target.value)} className="w-24 sm:w-32 bg-slate-950/40 border border-white/10 rounded-xl p-2.5 text-center text-sm font-bold" />
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Result</span>
                    <button
                      onClick={() => copyResult(res1)}
                      className="text-[11px] px-2 py-1 rounded bg-violet-600 hover:bg-violet-700 font-bold transition-colors"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="font-mono text-center">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 break-all">
                      {res1 || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Tool 2 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-violet-400 tracking-wider">X is what % of Y?</h3>
                <div className="flex items-center gap-2">
                  <input type="number" value={p2X} onChange={(e) => setP2X(e.target.value)} className="w-24 sm:w-28 bg-slate-950/40 border border-white/10 rounded-xl p-2.5 text-center text-sm font-bold" />
                  <span className="text-xs font-bold text-gray-400">is what % of</span>
                  <input type="number" value={p2Y} onChange={(e) => setP2Y(e.target.value)} className="w-24 sm:w-28 bg-slate-950/40 border border-white/10 rounded-xl p-2.5 text-center text-sm font-bold" />
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Result</span>
                    <button
                      onClick={() => copyResult(res2)}
                      className="text-[11px] px-2 py-1 rounded bg-violet-600 hover:bg-violet-700 font-bold transition-colors"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="font-mono text-center">
                    <span className="text-xl sm:text-2xl font-black text-sky-400 break-all">
                      {res2 || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERCENTAGE CHANGE */}
          {activeTab === "change" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold uppercase text-violet-400 tracking-wider">Percentage Increase / Decrease</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold">From (Old)</label>
                  <input type="number" value={changeFrom} onChange={(e) => setChangeFrom(e.target.value)} className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-center" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold">To (New)</label>
                  <input type="number" value={changeTo} onChange={(e) => setChangeTo(e.target.value)} className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-center" />
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5 font-mono text-center overflow-x-auto mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 block">Calculated Deviation Variance</span>
                  <button
                    onClick={() => copyResult(resChange)}
                    className="text-[11px] px-2 py-1 rounded bg-violet-600 hover:bg-violet-700 font-bold transition-colors"
                  >
                    📋 Copy
                  </button>
                </div>
                <span className={`text-xl sm:text-2xl font-black break-all ${resChange.includes("Decrease") ? "text-rose-400" : "text-emerald-400"}`}>
                  {resChange || "—"}
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: COMMERCIAL SYSTEM METRICS */}
          {activeTab === "commercial" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold">Base Price (₹)</label>
                  <input type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-center" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold">Rate Percentage (%)</label>
                  <input type="number" value={ratePct} onChange={(e) => setRatePct(e.target.value)} className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-center" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-xs font-bold text-gray-400 uppercase">🏷️ Discount Price</span>
                    <button onClick={() => copyResult(resDiscount)} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 font-bold">Copy</button>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono break-all">{resDiscount || "—"}</span>
                </div>
                <div className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-xs font-bold text-gray-400 uppercase">📈 Markup Price</span>
                    <button onClick={() => copyResult(resMarkup)} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 font-bold">Copy</button>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-amber-400 font-mono break-all">{resMarkup || "—"}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* --- EEAT COMPLIANT INTERVENTIONS --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-2xl font-bold mb-3 text-violet-400">Understanding Percentage Proportions</h2>
        <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
          Percentages evaluate numeric components as fractional scaling segments tracking exactly out of a universal 100 benchmark metric matrix. It helps uniform tracking evaluations for comparing market dynamic change deviations across financial analysis data grids seamlessly.
        </p>
      </section>

      {/* --- FAQ BLOCK CONTROL PANELS --- */}
      <section className="max-w-4xl mx-auto px-6 py-10 border-t border-white/10 text-left">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-400">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center px-5 py-3.5 font-bold text-sm sm:text-base hover:bg-white/5 transition-colors">
                <span>{item.name}</span>
                <span className="text-violet-400">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && <div className="px-5 pb-3.5 pt-1.5 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">{item.acceptedAnswer.text}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* --- REUSABLE MASTER FOOTER ARRAYS --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-bold text-violet-400">
          <a href="/gst-calculator" className="hover:text-violet-300 transition-colors">📊 GST Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/emi-calculator" className="hover:text-violet-300 transition-colors">🏠 EMI Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/unit-converter" className="hover:text-violet-300 transition-colors">📏 Unit Converter</a>
          <span className="text-white/10">|</span>
          <a href="/password-generator" className="hover:text-violet-300 transition-colors">🔑 Password Generator</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>
        <p className="text-[11px] text-gray-600 font-medium">© 2026 ByteSpin by Bytecraft Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}