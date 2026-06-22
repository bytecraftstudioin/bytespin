"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function DiceRollerPage() {
  const [diceCount, setDiceCount] = useState<number>(1);
  const [diceResults, setDiceResults] = useState<number[]>([1]);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<number[][]>([]);
  const [totalRolls, setTotalRolls] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalSum = diceResults.reduce((acc, curr) => acc + curr, 0);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);

    // Engagement rolling intervals animation simulation
    let iterations = 0;
    const interval = setInterval(() => {
      setDiceResults(
        Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
      );
      iterations++;
      if (iterations > 6) {
        clearInterval(interval);
        
        // Final absolute random selection outcome
        const finalResults = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
        setDiceResults(finalResults);
        setHistory(prev => [finalResults, ...prev].slice(0, 10));
        setTotalRolls(prev => prev + 1);
        setRolling(false);
      }
    }, 100);
  };

  const resetAll = () => {
    setDiceCount(1);
    setDiceResults([1]);
    setHistory([]);
    setTotalRolls(0);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dice Roller",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/dice-roller",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this Dice Roller truly random?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our utility uses mathematical Yes. Each dice roll is generated randomly, giving every side an equal chance of appearing.",
        },
      },
      {
        "@type": "Question",
        name: "Can I roll multiple dice simultaneously?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. You can choose to deploy up to 5 dice at once, with instant system logging tracking the collective total scores automatically.",
        },
      },
      {
  "@type": "Question",
  name: "Can I use this Dice Roller for board games?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. This online dice roller is perfect for board games, tabletop games and classroom activities."
  }
},
{
  "@type": "Question",
  name: "How many dice can I roll at once?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "You can roll between 1 and 5 dice simultaneously and instantly view the total score."
  }
},
{
  "@type": "Question",
  name: "Does this Dice Roller work on mobile devices?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The tool is fully responsive and works on phones, tablets and desktop devices."
  }
},
{
  "@type": "Question",
  name: "Do I need to install anything?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "No. This Dice Roller works directly in your web browser without any downloads or installations."
  }
},
{
  "@type": "Question",
  name: "Can I see my previous dice rolls?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The tool stores recent roll history so you can review previous results."
  }
},
{
  "@type": "Question",
  name: "Is this Dice Roller free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin Dice Roller is completely free to use."
  }
},
{
  "@type": "Question",
  name: "Can I roll dice for Dungeons and Dragons (D&D)?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. This tool can be used for Dungeons and Dragons, RPG games and other tabletop adventures."
  }
},
    ],
  };

  // Unicode dice characters mapping for beautiful visual layouts
  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Dice Roller</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Roll multiple virtual dice for board games, tabletop RPGs, or quick randomized distribution calculations.
        </p>

        {/* Configurations Setup Panel */}
        <div className="flex items-center gap-3 mb-10 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <span className="text-sm text-gray-400 font-medium">Number of Dice:</span>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => {
                if (rolling) return;
                setDiceCount(num);
                setDiceResults(Array(num).fill(1));
              }}
              className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                diceCount === num ? "bg-violet-600 border-violet-600 text-white" : "border-white/10 text-gray-400 hover:bg-white/5"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Dice Arena Canvas Layout */}
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-10">
          <div className="flex flex-wrap justify-center gap-6 min-h-[140px] items-center py-4 bg-slate-950/30 rounded-2xl border border-white/5 mb-8">
            {diceResults.map((val, idx) => (
              <div
                key={idx}
                className={`w-24 h-24 bg-white text-slate-950 rounded-2xl flex items-center justify-center text-7xl font-light shadow-xl transition-transform duration-100 select-none ${
                  rolling ? "animate-bounce scale-95 opacity-80" : "hover:scale-105"
                }`}
                style={{ boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)" }} //  boxShadow match aairuchu!
              >
                {diceFaces[val - 1]}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Sum Outflow</p>
            <h2 className="text-5xl font-black text-violet-400">{totalSum}</h2>
          </div>

          <button
            onClick={rollDice}
            disabled={rolling}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 text-white py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-violet-600/20"
          >
            {rolling ? "Rolling Dice Arena..." : "Cast Dice"}
          </button>
        </div>

        {/* Statistical Records Container */}
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-around items-center">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Rolls</p>
              <p className="text-3xl font-black text-violet-400">{totalRolls}</p>
            </div>
            {history.length > 0 && (
              <>
                <div className="h-8 w-px bg-white/10" />
                <button onClick={resetAll} className="text-xs font-bold text-rose-400 hover:underline">
                  Clear Records
                </button>
              </>
            )}
          </div>

          {history.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left">
              <h3 className="text-sm font-bold mb-4 text-center text-gray-400">Recent Rolling Arrays</h3>
              <div className="space-y-2.5">
                {history.map((arr, idx) => (
                  <div key={idx} className="flex justify-between text-xs bg-white/5 rounded-xl px-4 py-2.5 border border-white/5">
                    <span className="text-gray-500 font-medium">Batch #{history.length - idx}</span>
                    <span className="font-mono font-bold text-gray-300">
                      [{arr.join(", ")}] → Total: <b className="text-emerald-400">{arr.reduce((a,b)=>a+b,0)}</b>
                    </span>
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
          <h2 className="text-2xl font-bold mb-3 text-violet-400">What is a Virtual Dice Roller?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            A digital dice roller simulates traditional physical dice cubes using randomized client algorithms. Commonly deployed across board gaming sessions, table-top strategies (like D&D structures), and scientific probability showcases, it secures fully clean and unweighted operations instantly.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Algorithmic Distribution Integrity</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Every isolated dice asset rendered within this container triggers an independent computation segment. This means previous scoring patterns or total streak accumulations do not impact subsequent generation metrics, rendering a verified, unbiased 16.66% landing chance layout across all fields.
          </p>
        </div>
      </section>

      {/* --- SYSTEM FAQ ACCORDION DISPLAY --- */}
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

      {/* --- BRAND VERIFIED ADSENSER PREFERRED FOOTER COMPONENT --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <Link
  href="/coin-flip"
  className="hover:text-violet-300 transition-colors"
>
  🪙 Coin Flip
</Link>
          <span className="text-white/10">|</span>
          <Link
  href="/random-number-generator"
  className="hover:text-violet-300 transition-colors"
>
  🔢 Random Number
</Link>

<span className="text-white/10">|</span>

<Link
  href="/yes-or-no"
  className="hover:text-violet-300 transition-colors"
>
  🤷 Yes or No Picker
</Link>

<span className="text-white/10">|</span>

<Link
  href="/"
  className="hover:text-violet-300 transition-colors"
>
  🎡 Spin Wheel
</Link>
        </div>

        {/* Verification Compliance Array Channels */}
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