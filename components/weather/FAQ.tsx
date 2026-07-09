"use client";
import { useState } from "react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "Is the weather forecast live on ByteSpin?", a: "Yes, our metrics engine queries proxy API server channels continuously to update data indices every hour." },
    { q: "Why use an internal API route instead of browser-side requests?", a: "Bypassing standard browser-side fetching eliminates CORS blocks, guarantees search bot accessibility, and prevents Soft 404 tracking indexing failures on Google." }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-8 border-t border-white/10 text-left">
      <h2 className="text-xl font-bold mb-6 text-center text-violet-400">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center px-5 py-4 font-bold text-sm text-left">
              <span>{item.q}</span><span>{openFaq === idx ? "−" : "+"}</span>
            </button>
            {openFaq === idx && <div className="px-5 pb-4 text-gray-400 text-sm border-t border-white/5 pt-2">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}