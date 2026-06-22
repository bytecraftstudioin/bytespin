"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

export default function SipCalculatorPage() {
  const [monthlySip, setMonthlySip] = useState<string>("5000");
  const [expectedReturn, setExpectedReturn] = useState<string>("12");
  const [tenureYears, setTenureYears] = useState<string>("10");

  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [wealthGained, setWealthGained] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const P = parseFloat(monthlySip);
    const annualRate = parseFloat(expectedReturn);
    const years = parseFloat(tenureYears);

    const limit = 1000000000;

    if (
      isNaN(P) || P <= 0 || P > limit ||
      isNaN(annualRate) || annualRate <= 0 ||
      isNaN(years) || years <= 0 || years > 50
    ) {
      setTotalInvested(0);
      setWealthGained(0);
      setMaturityValue(0);
      return;
    }

    // Monthly Compounding Formula Matrix Execution
    const i = annualRate / 12 / 100;
    const n = years * 12;

    const totalInvestedAmount = P * n;
    
    // Future Value Formula for SIP: M = P * [((1 + i)^n - 1) / i] * (1 + i)
    const finalMaturity = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const finalWealthGained = finalMaturity - totalInvestedAmount;

    setTotalInvested(parseFloat(totalInvestedAmount.toFixed(2)));
    setWealthGained(parseFloat(finalWealthGained.toFixed(2)));
    setMaturityValue(parseFloat(finalMaturity.toFixed(2)));
  }, [monthlySip, expectedReturn, tenureYears]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mutual Fund SIP Investment Calculator",
    applicationCategory: "FinancialApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/sip-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Systematic Investment Plan (SIP)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A SIP allows you to invest a fixed amount of money regularly into preferred mutual funds, compounding your returns across historical market periods efficiently.",
        },
      },
      {
        "@type": "Question",
        name: "How does compounding work inside an SIP structure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Monthly investments periodically add compounding weight layers. Over longer tenures, your accumulated interest earns additional interest, maximizing wealth generation exponentially.",
        },
      },
      {
  "@type": "Question",
  name: "Is SIP better than FD?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "SIP investments generally offer higher long-term growth potential compared to traditional fixed deposits, although returns are market-linked."
  }
},
{
  "@type": "Question",
  name: "Can I increase my SIP amount later?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. Most mutual fund platforms allow investors to increase SIP contributions whenever required."
  }
},
{
  "@type": "Question",
  name: "What happens if I miss a SIP payment?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Missing a SIP installment usually does not close your investment account, but repeated misses may affect the SIP mandate."
  }
},
{
  "@type": "Question",
  name: "Is SIP safe for beginners?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "SIP is one of the most popular investment methods for beginners because it promotes disciplined investing and rupee cost averaging."
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
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight max-w-4xl">SIP Calculator</h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mb-8">
          Calculate your mutual fund systemic plans return rates, earned capital growth, and final investment maturity bounds instantly.
        </p>

        {/* Master Control Board Frame */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          
          {/* Controls Fields Settings Panel */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">Plan Configurations</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Monthly Investment Amount (₹)</label>
              <input
                type="number"
                value={monthlySip}
                onChange={(e) => setMonthlySip(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Expected Return Rate Per Annum (%)</label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Time Period Investment Term (Years)</label>
              <input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          {/* Dynamic Calculated Balance Sheets Output Panel */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="text-center md:text-left border-b border-white/5 pb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Estimated Maturity Value</p>
              <h2 className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono drop-shadow-[0_0_20px_rgba(52,211,153,0.2)] break-all">
                ₹{maturityValue.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl overflow-hidden">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Total Invested</p>
                <p className="text-sm sm:text-base font-bold text-gray-300 font-mono break-all">₹{totalInvested.toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl overflow-hidden">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Wealth Gained</p>
                <p className="text-sm sm:text-base font-bold text-amber-400 font-mono break-all">₹{wealthGained.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- EEAT COMPLIANT EDITORIAL GRID --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-2xl font-bold mb-3 text-violet-400">The Power of Systematic Compounding</h2>
        <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
          Systematic Investment Plans leverage rupee-cost averaging frameworks. When markets decline, your monthly allocation pooling mechanisms automatically acquire higher equity indexing fractions, driving exponential geometric growth curves across longer financial horizons.
        </p>
      </section>

      {/* --- FAQ ACCORDIONS CONTROLLER --- */}
      <section className="max-w-4xl mx-auto px-6 py-10 border-t border-white/10 text-left">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-400">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
              <button
  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
  className="w-full flex justify-between items-start gap-3 px-5 py-4 font-bold text-sm sm:text-base hover:bg-white/5 transition-colors"
>
  <span className="text-left flex-1">
    {item.name}
  </span>

  <span className="text-violet-400 text-lg shrink-0">
    {openFaq === idx ? "−" : "+"}
  </span>
</button>
              {openFaq === idx && (
                <div className="px-5 pb-3.5 pt-1.5 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                  {item.acceptedAnswer.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- REUSABLE UTILITY LINK FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-bold text-violet-400">
          <a href="/gst-calculator" className="hover:text-violet-300 transition-colors">📊 GST Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/emi-calculator" className="hover:text-violet-300 transition-colors">🏠 EMI Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/percentage-calculator" className="hover:text-violet-300 transition-colors">📈 Percentage Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/password-generator" className="hover:text-violet-300 transition-colors">🔑 Password Generator</a>
        </div>
        <p className="text-[11px] text-gray-600 font-medium">© 2026 ByteSpin by Bytecraft Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}