"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

export default function CoinFlipPage() {
  const [result, setResult] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [totalFlips, setTotalFlips] = useState(0);
  const [mode, setMode] = useState<number | "off">("off");

  const [headsScore, setHeadsScore] = useState(0);
  const [tailsScore, setTailsScore] = useState(0);
  const [winner, setWinner] = useState("");
  const [displayFace, setDisplayFace] = useState<"Heads" | "Tails">("Heads");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const headsCount = history.filter(item => item === "Heads").length;
  const tailsCount = history.filter(item => item === "Tails").length;

  const headsPercentage = totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : 0;
  const tailsPercentage = totalFlips > 0 ? ((tailsCount / totalFlips) * 100).toFixed(1) : 0;
    
  const flipCoin = () => {
    if (winner || flipping) return;
    audioRef.current?.play();
    setFlipping(true);

    const isHeads = Math.random() < 0.5;
    const face = isHeads ? "Heads" : "Tails";
    result !== "" && setResult("");

    setTimeout(() => {
      setResult(face);
      setDisplayFace(face);

      const nextHeads = face === "Heads" ? headsScore + 1 : headsScore;
      const nextTails = face === "Tails" ? tailsScore + 1 : tailsScore;

      if (mode !== "off") {
        const target = Math.ceil(mode / 2);
        if (nextHeads >= target) {
          setWinner(`👑 Heads Wins (${nextHeads}-${nextTails})`);
        }
        if (nextTails >= target) {
          setWinner(`⚡ Tails Wins (${nextTails}-${nextHeads})`);
        }
      }

      if (face === "Heads") {
        setHeadsScore(prev => prev + 1);
      } else {
        setTailsScore(prev => prev + 1);
      }

      setHistory(prev => [face, ...prev].slice(0, 10));
      setTotalFlips(prev => prev + 1);
      setFlipping(false);
    }, 2000); 
  };

  const flipTenTimes = () => {
    if (flipping || winner) return;

    let heads = 0;
    let tails = 0;
    const results: string[] = [];

    for (let i = 0; i < 10; i++) {
      const face = Math.random() < 0.5 ? "Heads" : "Tails";
      results.push(face);
      if (face === "Heads") {
        heads++;
      } else {
        tails++;
      }
    }

    const lastFace = results[results.length - 1] as "Heads" | "Tails";
    setDisplayFace(lastFace);

    setHistory(prev => [...results.reverse(), ...prev].slice(0, 10));
    setHeadsScore(prev => prev + heads);
    setTailsScore(prev => prev + tails);
    setTotalFlips(prev => prev + 10);

    setResult(`Heads: ${heads} | Tails: ${tails}`);

    if (mode !== "off") {
      const target = Math.ceil(mode / 2);
      const finalHeads = headsScore + heads;
      const finalTails = tailsScore + tails;
      if (finalHeads >= target) {
        setWinner(`👑 Heads Wins (${finalHeads}-${finalTails})`);
      } else if (finalTails >= target) {
        setWinner(`⚡ Tails Wins (${finalTails}-${finalHeads})`);
      }
    }
  };

  const resetAll = () => {
    setHeadsScore(0);
    setTailsScore(0);
    setWinner("");
    setResult("");
    setHistory([]);
    setTotalFlips(0);
    setDisplayFace("Heads");
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `🪙 Coin Flip Result: ${result}\n🌐 https://bytespin.bytecraftstudio.com/coin-flip`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Coin Flip Result", text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Result copied!");
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
    name: "Coin Flip",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/coin-flip",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Coin Flip truly random?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This online coin flip tool uses native JavaScript randomization framework via Math.random() mechanics to generate unbiased Heads or Tails results instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Can Heads appear 10 times in a row?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While statistically highly uncommon, it is mathematically possible! Since each spin is treated as an entirely independent mathematical event, a historical streak does not change the equal 50% odds of the next individual toss.",
        },
      },
      {
        "@type": "Question",
        name: "What are the odds of Heads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The exact structural probability is exactly 50%, or a clean 1-in-2 ratio layout. Over thousands of live automated iterations, the aggregate global metrics naturally balance out evenly.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use Coin Flip for decisions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. It is an excellent, fully objective method to break structural stalemates, choose between two comparable development alternatives, or fairly assign match order logs.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our online utility application setup is 100% free with completely unlimited real-time spins. You can track data statistics, review your local array history arrays, and run matches without tracking fees.",
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

      <style jsx global>{`
        @keyframes spinFlip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(1800deg); }
        }
        .animate-coin-spin {
          animation: spinFlip 2s ease-out forwards;
        }
      `}</style>

      <Navbar />

      <section className="flex flex-col items-center text-center px-4 pt-16 pb-12">
        <audio ref={audioRef} src="/sounds/coin-flip.mp3" />

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Coin Flip</h1>

        <div className="flex gap-3 mb-8">
          {[3, 5, "off"].map(value => (
            <button
              key={value}
              onClick={() => {
                setMode(value as number | "off");
                resetAll();
              }}
              className={`px-4 py-2 rounded-xl border text-sm font-medium capitalize transition-all ${
                mode === value ? "bg-violet-600 border-violet-600" : "border-white/10 hover:bg-white/5"
              }`}
            >
              {value === "off" ? "Off" : `Best of ${value}`}
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Flip a virtual coin and get a random Heads or Tails result instantly.
        </p>

        <div style={{ perspective: "1200px" }} className="mb-10">
          <div
            className={`relative w-48 h-48 transition-transform duration-500 ${
              flipping ? "animate-coin-spin" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: flipping 
                ? undefined 
                : displayFace === "Heads" 
                  ? "rotateY(0deg)" 
                  : "rotateY(180deg)",
            }}
          >
            {/* Heads Face */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center text-5xl font-black"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)", 
                background: "linear-gradient(135deg,#ffd700,#f5b700)",
                border: "8px solid #fff2a8",
                boxShadow: "0 0 40px rgba(255,215,0,.5)",
              }}
            >
              H
            </div>

            {/* Tails Face */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center text-5xl font-black"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)", 
                background: "linear-gradient(135deg,#c0c0c0,#8a8a8a)",
                border: "8px solid #e5e5e5",
                boxShadow: "0 0 40px rgba(255,255,255,.2)",
              }}
            >
              T
            </div>
          </div>
        </div>

        <button
          onClick={flipCoin}
          disabled={flipping}
          className="bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-xl font-bold transition-colors"
        >
          {flipping ? "Flipping..." : "Flip Coin"}
        </button>

        <div className="mt-4">
          <button
            onClick={flipTenTimes}
            disabled={flipping}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold transition-colors"
          >
            ⚡ Flip 10 Times
          </button>
        </div>

        {result && (
          <div className="mt-8 text-center">
            <p className="text-gray-400">Result</p>
            <h2 className="text-4xl font-black mt-2">{result}</h2>
            
            <div className="mt-4 flex gap-3 justify-center">
              <button
                onClick={shareResult}
                className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-xl font-bold"
              >
                📤 Share
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  alert("Copied!");
                }}
                className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-xl font-bold"
              >
                📋 Copy
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-8 text-xl font-bold">
          <span>👑 Heads: {headsScore}</span>
          <span>⚡ Tails: {tailsScore}</span>
        </div>

        {winner && (
          <div className="mt-6 bg-green-500/20 border border-green-500 rounded-2xl px-6 py-4">
            <h3 className="text-2xl font-black">{winner}</h3>
            <button
              onClick={resetAll}
              className="mt-4 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Reset Match
            </button>
          </div>
        )}

        {/* Dashboard Panels */}
        <div className="w-full max-w-md mt-12 space-y-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Total Flips</h3>
            <p className="text-6xl font-black text-violet-400">{totalFlips}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-center">Statistics</h3>
            <div className="space-y-5">
              <div className="flex justify-between">
                <span>👑 Heads</span>
                <span>{headsCount}</span>
              </div>
              <div className="flex justify-between">
                <span>⚡ Tails</span>
                <span>{tailsCount}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${headsPercentage}%` }} />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Heads {headsPercentage}%</span>
                <span>Tails {tailsPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-center">Recent Results</h3>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white/5 rounded-2xl px-5 py-4">
                  <span className="text-gray-400">#{history.length - index}</span>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- EEAT CONTENT --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10 space-y-12 text-left">
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-violet-400">What is Coin Flip?</h2>
          <p className="text-gray-300 leading-relaxed">
            A coin flip, also popularly known as a coin toss, is a simple method used worldwide to settle disputes or decide between two discrete alternatives. By spinning a balanced coin into the air, gravity forces it to land flat, revealing either Heads or Tails. Our virtual Coin Flip tool replicates this traditional random binary experiment digitally, providing instantaneous random selections for quick decision-making.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-violet-400">How Coin Flip Works</h2>
          <p className="text-gray-300 leading-relaxed">
            This online coin flip tool uses standard JavaScript randomization mechanisms to generate Heads or Tails results instantly. When you click to flip, our lightweight client script computes a pseudo-random value split evenly down the middle. This ensures an unbiased 50/50 breakdown without any server-side manipulation or tracking history logs influencing your active session.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-violet-400">Why Use Coin Flip?</h2>
          <p className="text-gray-300 leading-relaxed">
            Eliminating human cognitive bias can be challenging during highly critical stalemates. Utilizing an objective third-party digital coin generator offers a frictionless path forward. Whether you are assigning tasks within a development team framework, resolving disputes in casual games, or selecting randomized combinations, this utility guarantees quick, clear, and unmanipulated outcomes.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-violet-400">Coin Flip Probability</h2>
          <p className="text-gray-300 leading-relaxed">
            Mathematically, a theoretical standard coin has a classical independent probability exactly distributed as an even fraction. Every single individual spin operates autonomously, independent of preceding historical records. Even if a sequence tracks consecutive results down a single lane, the subsequent iteration retains the precise individual probability split, displaying authentic independent statistical randomness.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-violet-400">History of Coin Toss</h2>
          <p className="text-gray-300 leading-relaxed">
            The historical legacy of tossing coins originates centuries ago, dating back across ancient Roman civilizations where the game was documented as "Navia aut Caput" (Ship or Head). Throughout antiquity, emperors utilized this precise methodology to resolve high-tier legal conflicts and property allocations. This ancient system has cleanly evolved into our modern technological space as a universal symbol of fair settlement.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-violet-400">When to Use a Coin Flip</h2>
          <p className="text-gray-300 leading-relaxed">
            Coin tossing serves as an exceptional tool for micro-decisions where options carry equal conceptual weight. It is widely applied across competitive sporting leagues to choose playing sides or match configurations fairly. Additionally, educators use digital coin flippers to explain foundational probability mechanics and data distributions in mathematics courses, making abstract statistics visually engaging.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-violet-400">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center px-6 py-4 font-bold text-lg hover:bg-white/5 transition-colors"
              >
                <span>{item.name}</span>
                <span className="text-violet-400">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 pt-2 text-gray-300 text-sm leading-relaxed border-t border-white/5">
                  {item.acceptedAnswer.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- RE-ARCHITECTED FOOTER WITH DYNAMIC TOOLS AND TRUST PAGES --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <p className="text-gray-400 text-sm">Want to try other decision makers?</p>
        
        {/* Primary Utility Links */}
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Try ByteSpin Wheel</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number Generator</a>
          <span className="text-white/10">|</span>
          <a href="/yes-or-no" className="hover:text-violet-300 transition-colors">🙋 Yes or No Picker</a>
          <span className="text-white/10">|</span>
          <a href="/dice-roller" className="hover:text-violet-300 transition-colors">🎲 Dice Roller</a>
        </div>

        {/* Mandatory AdSense Trust Verification Links */}
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