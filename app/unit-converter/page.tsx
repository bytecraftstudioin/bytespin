"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

// Strict structural conversion types configuration matrices
type UnitMap = {
  [key: string]: {
    display: string;
    baseFactor?: number; // Base translation units logic factor
    transform?: {
      toBase: (val: number) => number;
      fromBase: (val: number) => number;
    };
  };
};

type CategoryMap = {
  [key: string]: {
    icon: string;
    units: UnitMap;
  };
};

const CONVERSION_DATA: CategoryMap = {
  Length: {
    icon: "📏",
    units: {
      cm: { display: "Centimeters (cm)", baseFactor: 1 },
      inches: { display: "Inches (in)", baseFactor: 2.54 },
      meters: { display: "Meters (m)", baseFactor: 100 },
      feet: { display: "Feet (ft)", baseFactor: 30.48 },
      km: { display: "Kilometers (km)", baseFactor: 100000 },
      miles: { display: "Miles (mi)", baseFactor: 160934.4 },
    },
  },
  Weight: {
    icon: "⚖️",
    units: {
      kg: { display: "Kilograms (kg)", baseFactor: 1000 },
      lbs: { display: "Pounds (lbs)", baseFactor: 453.59237 },
      grams: { display: "Grams (g)", baseFactor: 1 },
      ounces: { display: "Ounces (oz)", baseFactor: 28.34952 },
    },
  },
  Temperature: {
    icon: "🌡️",
    units: {
      celsius: {
        display: "Celsius (°C)",
        transform: { toBase: (v) => v, fromBase: (v) => v },
      },
      fahrenheit: {
        display: "Fahrenheit (°F)",
        transform: { toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      },
      kelvin: {
        display: "Kelvin (K)",
        transform: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      },
    },
  },
  Volume: {
    icon: "💧",
    units: {
      liters: { display: "Liters (L)", baseFactor: 1000 },
      gallons: { display: "Gallons (gal)", baseFactor: 3785.41 },
      ml: { display: "Milliliters (ml)", baseFactor: 1 },
    },
  },
  Time: {
    icon: "⏱️",
    units: {
      seconds: { display: "Seconds (s)", baseFactor: 1 },
      minutes: { display: "Minutes (min)", baseFactor: 60 },
      hours: { display: "Hours (h)", baseFactor: 3600 },
      days: { display: "Days (d)", baseFactor: 86400 },
      weeks: { display: "Weeks (wk)", baseFactor: 604800 },
    },
  },
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<string>("Length");
  const [fromUnit, setFromUnit] = useState<string>("cm");
  const [toUnit, setToUnit] = useState<string>("inches");
  const [inputValue, setInputValue] = useState<string>("1");
  const [result, setResult] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto fallback reset switch whenever category changes dynamically
 useEffect(() => {
  const units = Object.keys(CONVERSION_DATA[category].units);
  setFromUnit(units[0]);
  setToUnit(units[1] || units[0]);
}, [category]);

useEffect(() => {
  handleConvert();
}, [fromUnit, toUnit, inputValue]);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      alert("Valid numerical value parameters mattum thaan enter pannanum machan!");
      return;
    }

    const catData = CONVERSION_DATA[category];
    const fromConfig = catData.units[fromUnit];
    const toConfig = catData.units[toUnit];

    let resultValue = 0;

    // Advanced dynamic custom matrix evaluation mapping
    if (category === "Temperature" && fromConfig.transform && toConfig.transform) {
      const baseCelsius = fromConfig.transform.toBase(value);
      resultValue = toConfig.transform.fromBase(baseCelsius);
    } else if (fromConfig.baseFactor && toConfig.baseFactor) {
      const valueInBase = value * fromConfig.baseFactor;
      resultValue = valueInBase / toConfig.baseFactor;
    }

    // Precise scientific rounding matrix strings extraction
    const roundedResult = parseFloat(resultValue.toFixed(4));
   setResult(
 `${value} ${fromConfig.display} = ${roundedResult} ${toConfig.display}`
);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Universal Unit Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://bytespin.bytecraftstudio.com/unit-converter",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this multi-unit calculator accurate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ByteSpin converts metrics using floating point conversion values recognized globally across international scientific frameworks.",
        },
      },
      {
  "@type": "Question",
  name: "Which unit categories are supported?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "This unit converter supports Length, Weight, Temperature, Volume, and Time conversions using standard international conversion formulas.",
  },
},
{
  "@type": "Question",
  name: "Can I convert metric and imperial units?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. You can convert between metric and imperial units such as centimeters and inches, kilograms and pounds, kilometers and miles, and more.",
  },
},
{
  "@type": "Question",
  name: "Does this unit converter work on mobile devices?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. The ByteSpin Unit Converter is fully responsive and works on mobile phones, tablets, laptops, and desktop devices.",
  },
},
{
  "@type": "Question",
  name: "Is this unit converter free to use?",
  acceptedAnswer: {
    "@type": "Answer",
    text: "Yes. All conversions are completely free with no registration, subscription, or download required.",
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

      <section className="flex flex-col items-center text-center px-4 pt-16 pb-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">Unit Converter</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Convert metric configurations across Length, Weight, Temperature, Volume, and Time values instantaneously.
        </p>

        {/* Dynamic Interactive Setup Matrix Layout Container */}
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 mb-10 text-left">
          
          {/* Output Display Canvas Block */}
          <div className="min-h-[90px] flex flex-wrap justify-center items-center bg-slate-950/50 border border-white/5 rounded-2xl p-4 mb-6 text-center font-mono">
            {result ? (
              <span className="text-xl sm:text-2xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                {result}
              </span>
            ) : (
              <span className="text-gray-500 font-medium text-sm">
                Select configurations and trigger conversion array blocks thalaiva.
              </span>
            )}
          </div>

          {/* Category Dropdown Selection Panel */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Conversion Metric Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 cursor-pointer focus:outline-none focus:border-violet-500 transition-colors"
            >
              {Object.keys(CONVERSION_DATA).map((cat) => (
                <option key={cat} value={cat} className="bg-[#0b1020]">
                  {CONVERSION_DATA[cat].icon} {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Matrix Splits Variable Layout Panel Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">From Unit</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 cursor-pointer focus:outline-none focus:border-violet-500 transition-colors"
              >
                {Object.keys(CONVERSION_DATA[category].units).map((u) => (
                  <option key={u} value={u} className="bg-[#0b1020]">
                    {CONVERSION_DATA[category].units[u].display}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">To Unit</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 cursor-pointer focus:outline-none focus:border-violet-500 transition-colors"
              >
                {Object.keys(CONVERSION_DATA[category].units).map((u) => (
                  <option key={u} value={u} className="bg-[#0b1020]">
                    {CONVERSION_DATA[category].units[u].display}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
  onClick={() => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  }}
  className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold mb-6"
>
  ⇅ Swap Units
</button>

          <div className="space-y-2 mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Value Input Amount</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter unit scale quantity..."
              className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-gray-200 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

        </div>
      </section>

      {/* --- EEAT COMPLIANT QUALITY REVIEWS --- */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-white/10 space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Understanding Mathematical Unit Scalability</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Unit conversions resolve differences between distinct structural mapping benchmarks (such as Metric versus Imperial systems) using targeted scaling functions. For instance, length parameters use a strict baseline of 1 inch = 2.54 centimeters, allowing immediate and completely predictable translations across dimensional frameworks.
          </p>
        </div>
      </section>

      {/* --- FAQ BLOCKS REPEATER SYSTEM --- */}
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
  <span className="text-violet-400">
    {openFaq === idx ? "−" : "+"}
  </span>
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

      {/* --- SYSTEM ALIGNED SHARED MATRIX FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-5 text-sm font-bold text-violet-400">
          <a href="/coin-flip" className="hover:text-violet-300 transition-colors">🪙 Coin Flip</a>
          <span className="text-white/10">|</span>
          <a href="/random-number-generator" className="hover:text-violet-300 transition-colors">🔢 Random Number</a>
          <span className="text-white/10">|</span>
          <a href="/age-calculator" className="hover:text-violet-300 transition-colors">🎂 Age Calculator</a>
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