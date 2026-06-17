import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator - Free Online RNG Tool",
  description:
    "Generate random numbers instantly with our free online Random Number Generator. Choose a minimum and maximum range and get unbiased results.",

  alternates: {
    canonical:
      "https://bytespin.bytecraftstudio.com/random-number-generator",
  },

  openGraph: {
    title: "Random Number Generator - Free Online RNG Tool",
    description:
      "Generate random numbers instantly between any minimum and maximum value. Free online Random Number Generator for games, giveaways, decision making and probability experiments.",
    url:
      "https://bytespin.bytecraftstudio.com/random-number-generator",
    siteName: "ByteSpin",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Random Number Generator - Free Online RNG Tool",
    description:
      "Generate random numbers instantly between any minimum and maximum value. Free online Random Number Generator for games, giveaways, decision making and probability experiments.",
  },
};

export default function RandomNumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}