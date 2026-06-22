"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

interface ScheduleRow {
  month: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("1000000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [tenureYears, setTenureYears] = useState<string>("5");

  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(tenureYears);

    if (isNaN(P) || P <= 0 || isNaN(annualRate) || annualRate <= 0 || isNaN(years) || years <= 0) {
      setMonthlyEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setSchedule([]);
      return;
    }

   if (P > 1000000000) {
  alert("Maximum loan amount is ₹100 Crore");
  return;
}

    // Mathematical Reducing Balance Monthly Framework
    const r = annualRate / 12 / 100;
    const n = years * 12;

    const emiFactor = Math.pow(1 + r, n);
    const calculatedEmi = (P * r * emiFactor) / (emiFactor - 1);
    
    const finalMonthlyEmi = parseFloat(calculatedEmi.toFixed(2));
    const finalTotalPayment = parseFloat((calculatedEmi * n).toFixed(2));
    const finalTotalInterest = parseFloat((finalTotalPayment - P).toFixed(2));

    setMonthlyEmi(finalMonthlyEmi);
    setTotalPayment(finalTotalPayment);
    setTotalInterest(finalTotalInterest);

    // Dynamic Amortization Ledger Summary Loop Generations
    let currentBalance = P;
    const amortizationSchedule: ScheduleRow[] = [];

    // Track initial top 12 months for readable screen optimization
    for (let i = 1; i <= n; i++) {
      const interestForMonth = currentBalance * r;
      const principalForMonth = calculatedEmi - interestForMonth;
      currentBalance -= principalForMonth;

      amortizationSchedule.push({
        month: i,
        principalPaid: parseFloat(principalForMonth.toFixed(2)),
        interestPaid: parseFloat(interestForMonth.toFixed(2)),
        remainingBalance: parseFloat(Math.max(0, currentBalance).toFixed(2)),
      });
    }
    setSchedule(amortizationSchedule);
  }, [loanAmount, interestRate, tenureYears]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Financial Loan EMI Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/emi-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is loan EMI computed inside this application?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This toolkit runs an absolute monthly reducing balance compound matrix algorithm, calculating accurate principal fractions and real interest scales periodically.",
        },
      },
      {
        "@type": "Question",
        name: "What options do I have for loan amortization tracking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our automated amortization array grid cleanly details month-by-month payment tracks, tracking reduction schedules until loan values completely hit absolute zero.",
        },
      },
      {
  "@type": "Question",
  name: "What is EMI?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "EMI stands for Equated Monthly Installment. It is the fixed amount paid every month to repay a loan."
  }
},
{
  "@type": "Question",
  name: "Can I calculate home loan EMI?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. This calculator can be used for home loans, personal loans, education loans, and vehicle loans."
  }
},
{
  "@type": "Question",
  name: "Is the EMI calculated using reducing balance method?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The EMI calculation uses the standard reducing balance formula used by most banks and financial institutions."
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">EMI Calculator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Calculate your monthly installment bounds, total interest values, and view full loan schedules instantly.
        </p>

        {/* Multi-Column Control Grid Core Layout */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          
          {/* Controls Configurator Block */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-violet-400 mb-2">Loan Inputs</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Loan Principal Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Interest Rate Per Annum (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
  {[7, 8.5, 10, 12].map((rate) => (
    <button
      key={rate}
      onClick={() => setInterestRate(rate.toString())}
      className={`py-2 rounded-lg text-xs font-bold transition-all ${
  interestRate === rate.toString()
    ? "bg-violet-600 text-white"
    : "bg-slate-800 hover:bg-slate-700"
}`}
    >
      {rate}%
    </button>
  ))}
</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Loan Tenure (Years)</label>
              <input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
 {[5, 10, 15, 20].map((year) => (
  <button
    key={year}
    onClick={() => setTenureYears(year.toString())}
    className={`py-2 rounded-lg text-xs font-bold transition-all ${
      tenureYears === year.toString()
        ? "bg-violet-600 text-white"
        : "bg-slate-800 hover:bg-slate-700"
    }`}
  >
    {year}Y
  </button>

  ))}
</div>
            </div>
          </div>

          {/* Core Computational Output Cards Panel Dashboard */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="text-center md:text-left border-b border-white/5 pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Your Monthly EMI Payment</p>
              <h2 className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono break-all drop-shadow-[0_0_20px_rgba(52,211,153,0.2)]">
  ₹{monthlyEmi.toLocaleString("en-IN")}
</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Total Interest Payable</p>
                <p className="text-xs sm:text-base font-bold text-amber-400 font-mono break-all">
  ₹{totalInterest.toLocaleString("en-IN")}
</p>
</div>
              <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Total Cost Amount</p>
                <p className="text-xs sm:text-base font-bold text-gray-300 font-mono break-all">
  ₹{totalPayment.toLocaleString("en-IN")}
</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Amortization Table Summary Log Grid */}
        {schedule.length > 0 && (
          <div className="w-full max-w-5xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-left mb-12">
            <h3 className="text-lg font-bold text-violet-400 mb-4">Initial Amortization Payment Track (First 12 Months)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-left uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-bold">Month</th>
                    <th className="pb-3 font-bold">Principal Paid</th>
                    <th className="pb-3 font-bold">Interest Paid</th>
                    <th className="pb-3 font-bold">Remaining Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {schedule.slice(0, 12).map((row) => (
                    <tr key={row.month} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-bold text-gray-400">#{row.month}</td>
                      <td className="py-3 text-emerald-400">₹{row.principalPaid.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-amber-500">₹{row.interestPaid.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-gray-400">₹{row.remainingBalance.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* --- EEAT COMPLIANT FINANCIAL EDITORIAL SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Understanding Equated Monthly Installment Structures</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            An Equated Monthly Installment (EMI) represents a fixed premium structural cash transfer process used to systematically pay down loans inside an agreed-upon term matrix. As amortization variables mature across periodic cycles, principal payload fractions grow larger, automatically drawing down the interest weight cleanly over operational timelines.
          </p>
        </div>
      </section>

      {/* --- FAQ BLOCKS REPEATER --- */}
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

      {/* --- BRAND SHARED FOOTER CONFIGS --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/gst-calculator" className="hover:text-violet-300 transition-colors">📊 GST Calculator</a>
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