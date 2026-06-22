"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

export default function FdCalculatorPage() {
  const [depositAmount, setDepositAmount] = useState<string>("100000");
  const [interestRate, setInterestRate] = useState<string>("7.1");
  const [tenureYears, setTenureYears] = useState<string>("5");

  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const P = parseFloat(depositAmount);
    const r = parseFloat(interestRate);
    const t = parseFloat(tenureYears);

    const limit = 1000000000;

    if (
      isNaN(P) || P <= 0 || P > limit ||
      isNaN(r) || r <= 0 ||
      isNaN(t) || t <= 0 || t > 50
    ) {
      setTotalInvestment(0);
      setInterestEarned(0);
      setMaturityAmount(0);
      return;
    }

    // Standard Bank Rule: Quarterly Compounding Matrix (n = 4)
    const n = 4;
    const rateFraction = r / 100;

    // Compound Interest Formula: A = P * (1 + r/n)^(n*t)
    const finalMaturity = P * Math.pow(1 + rateFraction / n, n * t);
    const finalInterestEarned = finalMaturity - P;

    setTotalInvestment(P);
    setInterestEarned(parseFloat(finalInterestEarned.toFixed(2)));
    setMaturityAmount(parseFloat(finalMaturity.toFixed(2)));
  }, [depositAmount, interestRate, tenureYears]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fixed Deposit Investment Return Calculator",
    applicationCategory: "FinancialApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/fd-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is Fixed Deposit (FD) interest computed in Indian Banks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most banks follow standard quarterly compounding algorithms. This ensures that the interest gained during a quarter earns additional interest weight in subsequent quarters.",
        },
      },
      {
        "@type": "Question",
        name: "Can the compounding tenure include decimal fractions for years?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our math processor accurately parses fractional metrics, running calculation arrays over precise period matrices automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Is FD investment safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fixed Deposits are generally considered low-risk investments offered by banks and financial institutions."
        }
      },
      {
        "@type": "Question",
        name: "What is FD maturity amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The maturity amount is the final value received after adding accumulated interest to the original deposit."
        }
      },
      {
        "@type": "Question",
        name: "Can I break an FD before maturity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, most banks allow premature withdrawal, but penalties may apply."
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

      <section className="flex flex-col items-center text-center px-4 pt-12 pb-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight max-w-4xl">FD Calculator</h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mb-8 px-2">
          Calculate your Fixed Deposit compounding growth charts, interest yields, and absolute maturity corpus amounts instantly.
        </p>

        {/* Core Content Grid Panel */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left px-2 sm:px-4">
          
          {/* Controls Config Setup Panel */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">Deposit Variables</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Deposit Amount (₹)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Rate of Interest Per Annum (%)</label>
              <input
                type="number"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[6.5, 7, 7.5, 8].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setInterestRate(rate.toString())}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      parseFloat(interestRate) === rate
                        ? "bg-violet-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        : "bg-slate-800 hover:bg-slate-700 text-gray-300"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tenure / Time Scale (Years)</label>
              <input
                type="number"
                step="0.5"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1, 3, 5, 10].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setTenureYears(year.toString())}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      parseFloat(tenureYears) === year
                        ? "bg-violet-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        : "bg-slate-800 hover:bg-slate-700 text-gray-300"
                    }`}
                  >
                    {year}Y
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Core Computational Output Board Panels */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="text-center md:text-left border-b border-white/5 pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Total Maturity Amount</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400 font-mono drop-shadow-[0_0_20px_rgba(52,211,153,0.2)] break-words">
                ₹{maturityAmount.toLocaleString("en-IN")}
              </h2>
              
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `FD Maturity Amount: ₹${maturityAmount.toLocaleString("en-IN")}`
                  )
                }
                className="w-full mt-4 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
              >
                📋 Copy Result
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-950/40 border border-white/5 p-3.5 rounded-xl overflow-hidden">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1 tracking-wider">Total Investment</p>
                <p className="text-sm sm:text-base font-bold text-gray-300 font-mono break-words">₹{totalInvestment.toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-slate-950/40 border border-white/5 p-3.5 rounded-xl overflow-hidden">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1 tracking-wider">Interest Earned</p>
                <p className="text-sm sm:text-base font-bold text-amber-400 font-mono break-words">₹{interestEarned.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- EEAT EDITORIAL SEGMENT BLOCK --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-violet-400">Fixed Deposit Maturity Multipliers</h2>
        <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
          Unlike simple linear return rates, Fixed Deposits leverage periodic corporate compounding grids. By reinvesting quarterly accruals cleanly back into the initial baseline payload, your effective percentage yield automatically expands higher than nominal declared rates over time.
        </p>
      </section>

      {/* --- FAQ SECTION BLOCKS --- */}
      <section className="max-w-4xl mx-auto px-6 py-10 border-t border-white/10 text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-violet-400">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center px-4 sm:px-5 py-3.5 font-bold text-sm sm:text-base hover:bg-white/5 transition-colors text-left"
              >
                <span className="pr-4">{item.name}</span>
                <span className="text-violet-400 shrink-0">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-3.5 pt-1.5 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                  {item.acceptedAnswer.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE MASTER SHAREABLE FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-violet-400">
          <a href="/sip-calculator" className="hover:text-violet-300 transition-colors">💰 SIP Calculator</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a href="/emi-calculator" className="hover:text-violet-300 transition-colors">🏠 EMI Calculator</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a href="/percentage-calculator" className="hover:text-violet-300 transition-colors">📈 Percentage Calculator</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a href="/gst-calculator" className="hover:text-violet-300 transition-colors">📊 GST Calculator</a>
        </div>
        <p className="text-[11px] text-gray-600 font-medium">© 2026 ByteSpin by Bytecraft Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}