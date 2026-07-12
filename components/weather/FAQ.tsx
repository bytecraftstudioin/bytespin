"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How accurate is this weather forecast?",
    answer:
      "Our weather data is powered by Open-Meteo and updates regularly using trusted meteorological models."
  },
  {
    question: "Can I search weather for any city?",
    answer:
      "Yes. You can search thousands of cities worldwide and instantly view live weather conditions."
  },
  {
    question: "What is AQI?",
    answer:
      "AQI (Air Quality Index) measures how clean or polluted the air is. Lower values indicate better air quality."
  },
  {
    question: "What does 'Feels Like' temperature mean?",
    answer:
      "Feels Like represents the perceived temperature after considering humidity, wind speed and other atmospheric conditions."
  },
  {
    question: "How often is weather data updated?",
    answer:
      "Weather information is refreshed frequently using real-time forecast data from Open-Meteo."
  },
  {
    question: "Can I use this weather tool on mobile?",
    answer:
      "Yes. The weather dashboard is fully responsive and optimized for desktop, tablet and mobile devices."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">

      <h2 className="text-3xl font-black text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >

            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="w-full flex justify-between items-center px-6 py-5 text-left"
            >

              <span className="font-bold">
                {faq.question}
              </span>

              <span className="text-2xl">
                {open === index ? "−" : "+"}
              </span>

            </button>

            {open === index && (

              <div className="px-6 pb-5 text-gray-300 leading-7 border-t border-white/10">
                {faq.answer}
              </div>

            )}

          </div>

        ))}

      </div>

    </section>
  );
}