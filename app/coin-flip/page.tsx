"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

export default function CoinFlipPage() {
  const [result, setResult] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [totalFlips, setTotalFlips] = useState(0);
  
  // FIX 1: Default-ah mode "off" (string) nu vechikalam
  const [mode, setMode] = useState<number | "off">("off");

  const [headsScore, setHeadsScore] = useState(0);
  const [tailsScore, setTailsScore] = useState(0);
  const [winner, setWinner] = useState("");
  const [displayFace, setDisplayFace] = useState<"Heads" | "Tails">("Heads");

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

    setResult("");

    setTimeout(() => {
      setResult(face);
      setDisplayFace(face);

      const nextHeads = face === "Heads" ? headsScore + 1 : headsScore;
      const nextTails = face === "Tails" ? tailsScore + 1 : tailsScore;

      // FIX 2: Mode "off" ah illama number ah irundha mattum thaan Match Winner Logic calculate aagum
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

    // If Mode is not 'off', handle 10 flips match completion targets
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

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
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

      <section className="flex flex-col items-center text-center px-4 pt-16 pb-20">
        <audio ref={audioRef} src="/sounds/coin-flip.mp3" />

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">Coin Flip</h1>

        {/* FIX 3: Buttons Layout modified to include Best of 3, Best of 5, and Off */}
        <div className="flex gap-3 mb-8">
          {[3, 5, "off"].map(value => (
            <button
              key={value}
              onClick={() => {
                setMode(value as number | "off");
                resetAll(); // Mode maarumpothu automatic-ah scores clear aydum
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
          Flip a virtual coin and get a random Heads or Tails result.
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
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${headsPercentage}%` }}
                />
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
                <div
                  key={index}
                  className="flex justify-between items-center bg-white/5 rounded-2xl px-5 py-4"
                >
                  <span className="text-gray-400">#{history.length - index}</span>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}