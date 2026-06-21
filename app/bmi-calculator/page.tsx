"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function BmiCalculatorPage() {
  const [height, setHeight] = useState<string>("170");
  const [weight, setWeight] = useState<string>("65");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      alert("Please enter a valid height and weight.");
      return;
    }

    // BMI Formula array evaluation code matching standard index channels
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    const roundedBmi = parseFloat(bmiValue.toFixed(1));
    
    setBmi(roundedBmi);

    // Dynamic Category Mapping Matrix
    if (roundedBmi < 18.5) {
      setCategory("Underweight");
    } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
      setCategory("Normal");
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Accurate BMI Calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/bmi-calculator",
  };

  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-12">
  <h3 className="text-xl font-bold text-violet-400 mb-3">
    BMI Formula
  </h3>

  <p className="text-gray-300">
    BMI = Weight (kg) ÷ Height² (m²)
  </p>
</div>

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a healthy BMI range?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard healthy BMI evaluation falls strictly between 18.5 and 24.9 parameters based on universal World Health Organization algorithms.",
        },
      },
      {
        "@type": "Question",
        name: "Does this layout log personal physical data metrics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All calculation parameters compile right inside your live client window memory stack, maintaining zero cloud tracking footprints.",
        },
      },
      {
  "@type": "Question",
  name: "What is BMI?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "BMI stands for Body Mass Index. It is a simple calculation that uses height and weight to estimate body weight categories."
  }
},
{
  "@type": "Question",
  name: "Can BMI determine body fat percentage?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "No. BMI is only a screening tool and does not directly measure body fat percentage."
  }
},
{
  "@type": "Question",
  name: "Is this BMI Calculator free?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. ByteSpin BMI Calculator is completely free to use."
  }
},
    ],
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Structural Metadata Injection Configurations */}
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">BMI Calculator</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Calculate your Body Mass Index instantly based on metrics matching standard diagnostic criteria channels.
        </p>

        {/* Master Interface Layout Split Content Panel */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          
          {/* Input Control Box Panels */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 170"
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 65"
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={calculateBmi}
              className="mt-8 w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-bold transition-all text-lg shadow-lg shadow-violet-600/20"
            >
              Calculate BMI
            </button>
          </div>

          {/* Results Output & Score Screen Visualizer */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            {bmi !== null ? (
              <div className="space-y-4 animate-fade-in w-full">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Your Calculated Score</p>
                  <h2 className="text-6xl font-black text-violet-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">{bmi}</h2>
                </div>

                <div className="inline-block px-5 py-2 rounded-2xl bg-slate-950/40 border border-white/5 text-sm font-bold">
                  Category: &nbsp;
                  <span
                    className={`font-black text-base ${
                      category === "Normal"
                        ? "text-emerald-400"
                        : category === "Underweight"
                        ? "text-sky-400"
                        : category === "Overweight"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {category}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-gray-500 font-medium text-sm max-w-[180px]">
                Enter your physical parameters to analyze your baseline diagnostic score profiles.
              </span>
            )}
          </div>
        </div>

        {/* --- SYSTEM BMI REFERENCE CHART PANEL --- */}
        <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-left mb-12">
          <h3 className="text-lg font-bold text-violet-400 mb-4">Standard BMI Ranges Chart</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-sky-950/30 border border-sky-500/10 p-4 rounded-xl">
              <p className="font-bold text-sky-400 mb-1">Underweight</p>
              <p className="text-gray-400 font-mono">Below 18.5</p>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/10 p-4 rounded-xl">
              <p className="font-bold text-emerald-400 mb-1">Normal Weight</p>
              <p className="text-gray-400 font-mono">18.5 – 24.9</p>
            </div>
            <div className="bg-amber-950/30 border border-amber-500/10 p-4 rounded-xl">
              <p className="font-bold text-amber-400 mb-1">Overweight</p>
              <p className="text-gray-400 font-mono">25.0 – 29.9</p>
            </div>
            <div className="bg-rose-950/30 border border-rose-500/10 p-4 rounded-xl">
              <p className="font-bold text-rose-400 mb-1">Obese Category</p>
              <p className="text-gray-400 font-mono">30.0 or Higher</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- EEAT COMPLIANT EDITORIAL LAYER --- */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Understanding Body Mass Index Metrics</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Body Mass Index (BMI) is a proxy indicator pattern used across healthcare fields to determine absolute structural mass classifications based cleanly on height parameters paired against aggregate weight inputs. While useful for broad tracking arrays, it does not distinguish direct tissue margins or overall muscle distributions.
          </p>
        </div>
      </section>

      {/* --- FAQ ACCORDION BLOCKS PANEL --- */}
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

      {/* --- BRAND SHARED FOOTER ASSET CONTAINER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/qr-generator" className="hover:text-violet-300 transition-colors">📱 QR Generator</a>
          <span className="text-white/10">|</span>
          <a href="/password-generator" className="hover:text-violet-300 transition-colors">🔑 Password Generator</a>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-violet-300 transition-colors">🎡 Spin Wheel</a>
          <span className="text-white/10">|</span>
          <a href="/dice-roller" className="hover:text-violet-300 transition-colors">🎲 Dice Roller</a>
          <span className="text-white/10">|</span>
          <a href="/name-picker" className="hover:text-violet-300 transition-colors">👤 Name Picker</a>
        </div>

        {/* AdSense Preferential Compliance Links Channel */}
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