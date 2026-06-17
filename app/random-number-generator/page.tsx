"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [totalGenerations, setTotalGenerations] = useState(0);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Statistics calculation
  const totalSum = history.reduce((acc, curr) => acc + curr, 0);
  const average = history.length > 0 ? (totalSum / history.length).toFixed(1) : 0;
  const evensCount = history.filter(num => num % 2 === 0).length;
  const oddsCount = history.filter(num => num % 2 !== 0).length;

  const handleGenerate = () => {
    if (min >= max || generating) return;
    setGenerating(true);
    setResult(null);

    // Simulated quick rolling delay for awesome UX engagement
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      setResult(randomNum);
      setHistory(prev => [randomNum, ...prev].slice(0, 10));
      setTotalGenerations(prev => prev + 1);
      setGenerating(false);
    }, 400);
  };

  const shareResult = async () => {
    if (result === null) return;
    const text = `🔢 Random Number Result: ${result} (Range: ${min}-${max})\n🌐 https://bytespin.bytecraftstudio.com/random-number-generator`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Random Number Result", text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Result copied to clipboard!");
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
    name: "Random Number Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/random-number-generator",
  };

  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Random Number Generator truly random?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Random Number Generator creates a random number within your selected range. Each generation is independent."
      }
    },
    {
      "@type": "Question",
      name: "Can I generate numbers between custom ranges?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can enter any minimum and maximum values and generate a random number within that range."
      }
    },
    {
      "@type": "Question",
      name: "Can I use this for giveaways and contests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Random Number Generators are commonly used for giveaways, contests and winner selection."
      }
    },
    {
      "@type": "Question",
      name: "Is there a limit on how many numbers I can generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can generate unlimited random numbers for free."
      }
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This Random Number Generator is completely free to use."
      }
    }
  ]
};

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Google SEO Structured Schemas */}
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Random Number Generator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Pick a totally random number within any custom range instantly using your browser's native engine.
        </p>

        {/* Core Generator Module */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-10">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-400 mb-2">Min Value</label>
              <input
                type="number"
                value={min}
                onChange={e => setMin(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 font-bold text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-400 mb-2">Max Value</label>
              <input
                type="number"
                value={max}
                onChange={e => setMax(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 font-bold text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="h-32 flex items-center justify-center bg-slate-950/50 rounded-2xl border border-white/5 mb-6 overflow-hidden">
            {generating ? (
              <span className="text-4xl font-black animate-pulse text-violet-400">Picking...</span>
            ) : result !== null ? (
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                {result}
              </span>
            ) : (
              <span className="text-gray-500 font-medium">Click Generate</span>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || min >= max}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-violet-600/20"
          >
            {min >= max ? "Fix Range (Min < Max)" : "Generate Number"}
          </button>

          {result !== null && !generating && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={shareResult}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                📤 Share
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(result));
                  alert("Copied to clipboard!");
                }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                📋 Copy
              </button>
            </div>
          )}
        </div>

        {/* Stats & History Panels */}
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-around items-center">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Picks</p>
              <p className="text-3xl font-black text-violet-400">{totalGenerations}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Session Avg</p>
              <p className="text-3xl font-black text-indigo-400">{average}</p>
            </div>
          </div>

          {history.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-4 text-center">History (Last 10)</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {history.map((num, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900 border border-white/5 px-3 py-1.5 rounded-xl font-bold text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs text-gray-400">
                <span>Evens: {evensCount}</span>
                <span>Odds: {oddsCount}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- EEAT COMPLIANT ARTICLE CONTENT --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10 space-y-10 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">What is a Random Number Generator?</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            A Random Number Generator (RNG) is an algorithmic utility used to pick an unpredictable digit within a specified numerical scope. This online tool processes values instantly on the user client framework. It is ideal for raffles, games, picking random winners, scientific distributions, or simple daily selections.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">How This Tool Generates Numbers</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            This utility functions using JavaScript's native <code>Math.random()</code> calculation infrastructure to output random selection results. The script maps a pseudo-random floating-point sequence dynamically to your desired minimum and maximum bounds. It functions entirely inside your web browser engine session, making it highly secure, fast, and light.
          </p>
        </div>

        {/* 🌟 SEO INJECTION: SHORT ABOUT BYTESPIN AS PER INSTRUCTION */}
        <div className="bg-violet-950/20 border border-violet-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2 text-violet-400">About ByteSpin</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            ByteSpin provides free online randomizers, decision-making tools and productivity utilities. Our responsive, fast, and accessible digital utilities resolve daily micro-choices instantly without requiring manual installations or personal profile data submissions.
          </p>
        </div>
      </section>

<section>
  <h2>
    How Does a Random Number Generator Work?
  </h2>

  <p>
    The generator uses mathematical algorithms to
    produce random values between your selected
    minimum and maximum numbers.
  </p>
</section>

<section>
  <h2>
    Random Number Generator for Games
  </h2>

  <p>
    Generate random values for board games,
    challenges and competitions.
  </p>
</section>

      {/* --- FAQ ACCORDION --- */}
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

      {/* --- PROFESSIONAL INTERNALLY LINKED FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-8 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/dice-roller" className="hover:text-violet-300 transition-colors">🎲 Dice Roller</a>
          <span className="text-white/10">|</span>
          <a href="/yes-or-no" className="hover:text-violet-300 transition-colors">🙋 Yes or No Picker</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-400">
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <span className="text-white/10">•</span>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-white/10">•</span>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <span className="text-white/10">•</span>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}