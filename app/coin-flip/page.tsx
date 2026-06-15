"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

export default function CoinFlipPage() {
  const [result, setResult] = useState("");
  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);
   const [history, setHistory] = useState<string[]>([]);
   const [totalFlips, setTotalFlips] = useState(0);

const audioRef = useRef<HTMLAudioElement | null>(null);
  const flipCoin = () => {
    if (flipping) return;
audioRef.current?.play();
    setFlipping(true);

    const isHeads = Math.random() < 0.5;

    const spins = 5;
    const finalRotation =
      rotation +
      spins * 360 +
      (isHeads ? 0 : 180);

    setRotation(finalRotation);

    setTimeout(() => {
      const newResult = isHeads
  ? "Heads"
  : "Tails";

setResult(newResult);

setHistory(prev =>
  [newResult, ...prev].slice(0, 10)
);
setTotalFlips(prev => prev + 1);
      setFlipping(false);
    }, 2500);
  };


  return (
   <main className="min-h-screen bg-[#0b1020] text-white">

  <Navbar />

  <section className="flex flex-col items-center text-center px-4 pt-16 pb-20">

  <audio
      ref={audioRef}
      src="/sounds/coin-flip.mp3"
    />

     <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">
        Coin Flip
      </h1>

      <p className="text-gray-400 text-lg max-w-2xl mb-12">
        Flip a virtual coin and get a random Heads or Tails result.
      </p>

      <div
        style={{ perspective: "1200px" }}
        className="mb-10"
      >
        <div
          className="relative w-48 h-48 transition-transform duration-[2500ms]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
          }}
        >

          {/* Heads */}

          <div
            className="absolute inset-0 rounded-full flex items-center justify-center text-5xl font-black"
            style={{
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(135deg,#ffd700,#f5b700)",
              border: "8px solid #fff2a8",
              boxShadow:
                "0 0 40px rgba(255,215,0,.5)",
            }}
          >
            H
          </div>

          {/* Tails */}

          <div
            className="absolute inset-0 rounded-full flex items-center justify-center text-5xl font-black"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "linear-gradient(135deg,#c0c0c0,#8a8a8a)",
              border: "8px solid #e5e5e5",
              boxShadow:
                "0 0 40px rgba(255,255,255,.2)",
            }}
          >
            T
          </div>

        </div>
      </div>

      <button
        onClick={flipCoin}
        disabled={flipping}
        className="bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-xl font-bold"
      >
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>

      {result && (
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Result
          </p>

          <h2 className="text-4xl font-black mt-2">
            {result}
          </h2>
        </div>
      )}

      <div className="w-full max-w-md mt-12 space-y-8">

  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center">
    <h3 className="text-3xl font-bold mb-4">
      Total Flips
    </h3>

    <p className="text-6xl font-black text-violet-400">
      {totalFlips}
    </p>
  </div>

  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">

    <h3 className="text-3xl font-bold mb-6 text-center">
      Recent Results
    </h3>

    <div className="space-y-4">

      {history.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white/5 rounded-2xl px-5 py-4"
        >
          <span className="text-gray-400">
            #{history.length - index}
          </span>

          <span className="font-bold">
            {item}
          </span>
        </div>
      ))}

    </div>

  </div>

</div>

 
<div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      What is a Coin Flip?
    </h2>

    <p className="text-gray-400 leading-8 text-lg">
      Coin Flip is a free online random decision-making tool that generates
      Heads or Tails instantly. It is commonly used for making fair decisions,
      settling disputes, choosing between two options and random selections.
    </p>
  </section>

  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      How Coin Flip Works
    </h2>

    <div className="grid md:grid-cols-3 gap-4">

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        Click Flip
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        Coin Spins
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        Get Heads or Tails
      </div>

    </div>
  </section>

  <section>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Why Use Coin Flip?
    </h2>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        ⚡ Instant Results
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        🎲 Truly Random
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        📱 Mobile Friendly
      </div>

    </div>
  </section>

</div>
</section>
    </main>
  );
}