"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRateLabel, setExchangeRateLabel] = useState<string>("Loading rates...");
  const [allCurrencies, setAllCurrencies] = useState<string[]>(["USD", "INR", "EUR", "GBP", "AED"]);
  const [ratesMatrix, setRatesMatrix] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Fetch live current prices & all world currencies dynamically on mount
  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        setLoading(true);
        // Using a reliable public API without needing a complex API key setup
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        
        if (data && data.rates) {
          setRatesMatrix(data.rates);
          setAllCurrencies(Object.keys(data.rates).sort());
        }
      } catch (error) {
        console.error("Error fetching live currency metadata matrix:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveRates();
  }, []);

  // Recalculate based on live standard metrics loop
  useEffect(() => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || !ratesMatrix[fromCurrency] || !ratesMatrix[toCurrency]) {
      setConvertedAmount(0);
      setExchangeRateLabel("0");
      return;
    }

    // Convert using base USD anchor mapping weights
    const fromRateInUsd = ratesMatrix[fromCurrency];
    const toRateInUsd = ratesMatrix[toCurrency];

    const result = amt * (toRateInUsd / fromRateInUsd);
    const singleUnitRate = toRateInUsd / fromRateInUsd;

    setConvertedAmount(parseFloat(result.toFixed(2)));
    setExchangeRateLabel(`1 ${fromCurrency} = ${singleUnitRate.toFixed(4)} ${toCurrency}`);
  }, [amount, fromCurrency, toCurrency, ratesMatrix]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Global Foreign Exchange Currency Converter",
    applicationCategory: "FinancialApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/currency-converter",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the automated currency calculation matrix function?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The engine anchors input values against live USD cross-currency rates, multiplying real-time conversion weights dynamically as inputs change.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert alternative currency sequences like USD directly to AED?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The underlying processing loop bridges arbitrary configurations across the cross-currency index map seamless.",
        },
      },
      {
        "@type": "Question",
        name: "Are exchange rates updated in real time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. This calculator pulls automated network weights from global forex indices directly on every session instance.",
        },
      },
      {
        "@type": "Question",
        name: "Which currencies are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The platform dynamically scales to map all global recognized world currency pairs available via open banking standard loops.",
        },
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
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight max-w-4xl">Currency Converter</h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mb-8 px-2">
          Convert global foreign exchange metrics instantly. Safe, clean tracking loops with real-time financial data analytics.
        </p>

        {/* Core Converter Interface Frame */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 text-left px-4 sm:px-6 mb-12">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400">Exchange Parameters</h3>
            {loading && <span className="text-xs font-mono text-amber-400 animate-pulse">Syncing Live Rates...</span>}
          </div>
          
          <div className="space-y-4">
            {/* Amount Field Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Enter Value / Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="100"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              {[1, 10, 100, 1000].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value.toString())}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-violet-600 text-xs font-bold transition-colors"
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Selection Grid Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-9 gap-3 items-center pt-2">
              <div className="sm:col-span-4 space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">From Currency</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                >
                  {allCurrencies.map((cur) => (
                    <option key={cur} value={cur} className="bg-slate-950">{cur}</option>
                  ))}
                </select>
              </div>

              {/* Action Swap Controller Layer */}
              <div className="sm:col-span-1 flex justify-center pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="bg-violet-600 hover:bg-violet-700 active:scale-95 p-3 rounded-xl text-white font-bold transition-all shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                  title="Swap Currencies"
                >
                  ⇄
                </button>
              </div>

              <div className="sm:col-span-4 space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">To Currency</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                >
                  {allCurrencies.map((cur) => (
                    <option key={cur} value={cur} className="bg-slate-950">{cur}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Render Balance Matrix Area */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Conversion Total</p>
              <h2 className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono drop-shadow-[0_0_20px_rgba(52,211,153,0.2)] break-all">
                {convertedAmount.toLocaleString("en-US")} <span className="text-sm font-bold text-gray-400">{toCurrency}</span>
              </h2>
              <p className="text-[11px] text-violet-400 font-semibold font-mono mt-1">{exchangeRateLabel}</p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
                )
              }
              className="bg-white/5 hover:bg-white/10 text-xs font-bold py-2.5 px-4 rounded-xl text-gray-300 border border-white/10 transition-colors active:scale-[0.98]"
            >
              📋 Copy Result
            </button>
          </div>
        </div>
      </section>

      {/* --- EEAT COMPLIANT INTERVENTIONS SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-violet-400">Forex Arbitrage Data Metrics</h2>
        <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
          Currency conversion evaluation relies heavily on dynamic indexing matrices. Liquidity pooling networks modify the global transactional rate frameworks, defining localized spreads across banking systems instantly.
        </p>
      </section>

      {/* --- FAQ MATRIX GRID PANEL --- */}
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

      {/* --- UTILITY CENTRALIZED SHARED FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-violet-400">
          <a href="/fd-calculator" className="hover:text-violet-300 transition-colors">🏦 FD Calculator</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a href="/sip-calculator" className="hover:text-violet-300 transition-colors">💰 SIP Calculator</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a href="/emi-calculator" className="hover:text-violet-300 transition-colors">🏠 EMI Calculator</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a href="/percentage-calculator" className="hover:text-violet-300 transition-colors">📈 Percentage Calculator</a>
        </div>
        <p className="text-[11px] text-gray-600 font-medium">© 2026 ByteSpin by Bytecraft Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}