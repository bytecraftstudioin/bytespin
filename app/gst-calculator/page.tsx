"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

export default function GstCalculatorPage() {
  const [amount, setAmount] = useState<string>("1000");
  const [gstRate, setGstRate] = useState<number>(18);
  const [calcType, setCalcType] = useState<"exclusive" | "inclusive">("exclusive");

  const [gstAmount, setGstAmount] = useState<number>(180);
  const [cgst, setCgst] = useState<number>(90);
  const [sgst, setSgst] = useState<number>(90);
  const [totalAmount, setTotalAmount] = useState<number>(1180);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Real-time dynamic GST matrix calculation engine
  useEffect(() => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setGstAmount(0);
      setCgst(0);
      setSgst(0);
      setTotalAmount(0);
      return;
    }

    if (amt > 999999999) {
  alert("Maximum amount exceeded");
  return;
}

    let calculatedGst = 0;
    let finalTotal = 0;

    if (calcType === "exclusive") {
      // GST Exclusive Formula: GST Amt = (Original Cost * GST%) / 100
      calculatedGst = (amt * gstRate) / 100;
      finalTotal = amt + calculatedGst;
    } else {
      // GST Inclusive Formula: GST Amt = Original Cost - [Original Cost * {100 / (100 + GST%)}]
      const baseAmount = amt * (100 / (100 + gstRate));
      calculatedGst = amt - baseAmount;
      finalTotal = amt; // Total is the input amount itself
    }

    const splitTax = calculatedGst / 2;

    setGstAmount(parseFloat(calculatedGst.toFixed(2)));
    setCgst(parseFloat(splitTax.toFixed(2)));
    setSgst(parseFloat(splitTax.toFixed(2)));
    setTotalAmount(parseFloat(finalTotal.toFixed(2)));
  }, [amount, gstRate, calcType]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Indian GST Calculator Tool",
    applicationCategory: "FinancialApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/gst-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between GST Inclusive and Exclusive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GST Exclusive means the tax amount is added on top of your base value price. GST Inclusive means the product price already embeds the core tax matrices within the final amount.",
        },
      },
      {
        "@type": "Question",
        name: "How are CGST and SGST splits computed in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For standard intra-state transactions within India, the total unified GST structure divides equally into Central GST (CGST) and State GST (SGST) channels.",
        },
      },
      {
  "@type": "Question",
  name: "What are the GST slabs in India?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "India currently uses 0%, 3%, 5%, 12%, 18%, and 28% GST slabs depending on the product or service category."
  }
},
{
  "@type": "Question",
  name: "Can I calculate GST for invoices?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. This GST calculator can be used for invoices, billing estimates, purchase orders, and tax calculations."
  }
},
{
  "@type": "Question",
  name: "Is this GST calculator free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin GST Calculator is completely free and works directly in your browser."
  }
},
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">GST Calculator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Calculate Indian Goods and Services Tax metrics with exact CGST and SGST allocation splits instantly.
        </p>

        {/* Master Interface Layout Container */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          
          {/* Input Panel Fields */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Toggle Switch Mode */}
              <div className="flex bg-slate-950/60 p-1.5 rounded-xl border border-white/5">
                <button
                  onClick={() => setCalcType("exclusive")}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    calcType === "exclusive" ? "bg-violet-600 text-white shadow" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  GST Exclusive (+)
                </button>
                <button
                  onClick={() => setCalcType("inclusive")}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    calcType === "inclusive" ? "bg-violet-600 text-white shadow" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  GST Inclusive (-)
                </button>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Initial Base Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1000"
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Tax Slab Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">GST Rate Percentage (%)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={`py-3 text-xs font-mono font-bold rounded-xl border transition-all ${
                        gstRate === rate
                          ? "bg-violet-600 border-violet-500 text-white"
                          : "bg-slate-950/40 border-white/10 text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
              {/* Custom GST Rate */}
<div className="space-y-2 mt-4">
  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
    Custom GST Rate (%)
  </label>

  <input
    type="number"
    value={gstRate}
    onChange={(e) => setGstRate(Number(e.target.value))}
    placeholder="Enter custom GST rate"
    min="0"
    max="100"
    className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
  />
</div>

            </div>
          </div>

          {/* Realtime Output Ledger Display Dashboard */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Tax Calculation Breakdown</p>
              
              <div className="space-y-3.5">
                <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-white/5 rounded-xl">
                  <span className="text-xs font-medium text-gray-400">Total GST Tax Amount</span>
                  <span className="text-base font-bold text-amber-400 font-mono">₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/30 p-3 border border-white/5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">CGST (Central Split)</p>
                    <p
  className="text-xs sm:text-sm font-bold text-gray-300 font-mono break-all leading-relaxed"
>
  ₹{cgst.toLocaleString("en-IN")}
</p>
                  </div>
                  <div className="bg-slate-950/30 p-3 border border-white/5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">SGST (State Split)</p>
 <p
  className="text-xs sm:text-sm font-bold text-gray-300 font-mono break-all leading-relaxed"
>
  ₹{sgst.toLocaleString("en-IN")}
</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono break-all">
              
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Final Billing Total</p>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono break-all">
                ₹{totalAmount.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>

        </div>
      </section>

      {/* --- EEAT COMPLIANT FINANCIAL REVIEWS --- */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">How Does the Indian GST System Work?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            The Goods and Services Tax (GST) is a comprehensive multi-stage, destination-based tax system that untangles cascading tax structures within India. Whenever transactions happen locally within a state's borders, the accumulated tax revenue is split exactly 50-50 into CGST and SGST categories respectively.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION DISPLAY PANEL --- */}
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

      {/* --- LEGAL MAPPED BRAND SHARED FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/unit-converter" className="hover:text-violet-300 transition-colors">📏 Unit Converter</a>
          <span className="text-white/10">|</span>
          <a href="/password-generator" className="hover:text-violet-300 transition-colors">🔑 Password Generator</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

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