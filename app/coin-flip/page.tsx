"use client";

import { useState } from "react";

export default function CoinFlipPage() {
  const [result, setResult] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);

    setTimeout(() => {
      const outcomes = ["Heads", "Tails"];
      const randomResult =
        outcomes[Math.floor(Math.random() * outcomes.length)];

      setResult(randomResult);
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Coin Flip Online
        </h1>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          Flip a virtual coin instantly and get a random Heads or Tails result.
          Perfect for making quick decisions, games, and random choices.
        </p>

        <div className="flex flex-col items-center">
          <div
            className={`w-40 h-40 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold shadow-lg mb-8 ${
              isFlipping ? "animate-spin" : ""
            }`}
          >
            🪙
          </div>

          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition"
          >
            {isFlipping ? "Flipping..." : "Flip Coin"}
          </button>

          {result && !isFlipping && (
            <div className="mt-10">
              <p className="text-gray-400 mb-2">Result</p>
              <h2 className="text-4xl font-bold text-green-400">
                {result}
              </h2>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">
          What is a Coin Flip?
        </h2>

        <p className="text-gray-300 leading-8">
          A coin flip is one of the simplest ways to make a random decision.
          Since there are only two possible outcomes — Heads or Tails —
          it provides a fair 50/50 chance for each result.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-xl mb-2">
              Is this coin flip random?
            </h3>
            <p className="text-gray-300">
              Yes. The result is randomly generated each time you flip.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">
              Can I use it for decision making?
            </h3>
            <p className="text-gray-300">
              Absolutely. Many people use coin flips for quick and fair decisions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">
              Is it free?
            </h3>
            <p className="text-gray-300">
              Yes, ByteSpin Coin Flip is completely free to use.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}