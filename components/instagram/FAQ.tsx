"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I download an Instagram Reel?",
    answer:
      "Paste the public Instagram Reel URL into the input box and process the link. If the content is publicly accessible, you can retrieve the available media.",
  },
  {
    question: "Can I download Instagram photos?",
    answer:
      "Yes. Public Instagram photo posts can be processed and downloaded using this tool.",
  },
  {
    question: "Can I download Instagram videos?",
    answer:
      "Yes. Public Instagram video posts are supported.",
  },
  {
    question: "Does this support carousel posts?",
    answer:
      "Yes. Carousel posts containing multiple photos or videos are supported when available.",
  },
  {
    question: "Do I need an Instagram account?",
    answer:
      "No. This tool is designed to work with publicly accessible Instagram content.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. ByteSpin provides this tool free of charge.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes. The website is fully responsive and works on Android, iPhone, tablets and desktop browsers.",
  },
  {
    question: "Is my privacy protected?",
    answer:
      "Yes. We don't require you to log in to your Instagram account.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="max-w-5xl mx-auto px-4 py-20"
    >
      <h2 className="text-4xl font-black text-center mb-4">
        Frequently Asked Questions
      </h2>

      <p className="text-center text-gray-400 mb-12">
        Everything you need to know about our Instagram Downloader.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="w-full flex justify-between items-center px-6 py-5 text-left"
            >
              <span className="font-bold text-lg">
                {faq.question}
              </span>

              <span className="text-2xl text-pink-400">
                {open === index ? "−" : "+"}
              </span>
            </button>

            {open === index && (
              <div className="px-6 pb-6 text-gray-400 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}