"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

interface AgeMetrics {
  years: number;
  months: number;
  days: number;
  nextBirthdayCountdown: number; // in days
  totalMonths: number;
  totalDays: number;
}

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState<string>("2000-01-01");
  const [metrics, setMetrics] = useState<AgeMetrics | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateAge = () => {
    if (!dob) {
      alert("Please select a valid date of birth.");
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      alert("Date of birth cannot be in the future.");
      return;
    }

    // 1. Core Exact Dynamic Range Breakdown Calculation
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Get historical last day limits of previous tracking index month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // 2. Total Cumulative Baseline Matrix Limits
    const differenceInMs = today.getTime() - birthDate.getTime();
    const totalDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    
    // Total months proxy tracking lines
    const totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();

    // 3. Next Birthday Countdown Target Engine
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = nextBirthday.getTime() - today.getTime();
    const nextBirthdayCountdown = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setMetrics({
      years,
      months,
      days,
      nextBirthdayCountdown: nextBirthdayCountdown === 366 ? 0 : nextBirthdayCountdown,
      totalMonths,
      totalDays,
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Accurate Age Calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/age-calculator",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How precise is this age calculator application?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The application computes real-time chronological records tracking actual monthly leap boundaries accurately on client local memory stacks.",
        },
      },
      {
        "@type": "Question",
        name: "Are data entry timelines logged on cloud setups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all inputs calculate within client side operational components preserving direct user data access safety levels cleanly.",
        },
      },
      {
  "@type": "Question",
  name: "What is an age calculator?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "An age calculator determines your exact age in years, months and days based on your date of birth."
  }
},
{
  "@type": "Question",
  name: "Can I calculate days until my next birthday?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. This calculator shows the number of days remaining until your next birthday."
  }
},
{
  "@type": "Question",
  name: "Is this age calculator free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin Age Calculator is completely free to use."
  }
},
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Structural Metadata Injection Layer */}
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">Age Calculator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Determine chronological runtime age, countdown timelines for birthdays, and metrics breakdowns cleanly.
        </p>

        {/* Core Control Center Content Box Container */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          
          {/* Pick Date Configuration Setup Input */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-4 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors custom-date-input"
              />
            </div>

            <button
              onClick={calculateAge}
              className="mt-8 w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-violet-600/20"
            >
              🎂 Calculate My Age
            </button>
          </div>

          {/* Detailed Metric Array Outputs Display Terminal */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-center">
            {metrics ? (
              <div className="space-y-6 animate-fade-in w-full">
                {/* Master Exact Display Row */}
                <div className="text-center md:text-left border-b border-white/5 pb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Exact Chronological Age</p>
                  <div className="text-2xl sm:text-3xl font-black text-gray-100 space-x-1">
                    <span className="text-emerald-400 text-4xl sm:text-5xl font-black">{metrics.years}</span> <span className="text-sm font-bold text-gray-400 uppercase mr-2">Years</span>
                    <span className="text-violet-400 text-4xl sm:text-5xl font-black">{metrics.months}</span> <span className="text-sm font-bold text-gray-400 uppercase mr-2">Months</span>
                    <span className="text-sky-400 text-4xl sm:text-5xl font-black">{metrics.days}</span> <span className="text-sm font-bold text-gray-400 uppercase">Days</span>
                  </div>
                </div>

                {/* Additional Cumulative Matrices Tracker Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
                  <div className="bg-slate-950/30 border border-white/5 p-3.5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Next Birthday</p>
                    <p className="text-lg font-black text-violet-400 font-mono">{metrics.nextBirthdayCountdown} Days</p>
                  </div>
                  <div className="bg-slate-950/30 border border-white/5 p-3.5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Total Months</p>
                    <p className="text-lg font-black text-emerald-400 font-mono">{metrics.totalMonths.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-950/30 border border-white/5 p-3.5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Total Days Lived</p>
                    <p className="text-lg font-black text-sky-400 font-mono">{metrics.totalDays.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 font-medium text-sm max-w-[200px] mx-auto">
                Pick your timeline configurations on the panel grid target block thalaiva.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- EEAT EDITORIAL BASELINE REVIEWS --- */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">How Does Chronological Age Tracking Work?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            An age tracker counts time sequences accurately between an absolute point of origin input down to current standard universal operational dates. It dynamically adjusts for varying month lengths and leap cycle distributions to calculate precise intervals without data skew.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION SUMMARY SYSTEM --- */}
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

      {/* --- SITE WIDE POLICY SAFE FOOTER MAP --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/bmi-calculator" className="hover:text-violet-300 transition-colors">⚖️ BMI Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/password-generator" className="hover:text-violet-300 transition-colors">🔑 Password Generator</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

        {/* Compliance Integration Link Arrays */}
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