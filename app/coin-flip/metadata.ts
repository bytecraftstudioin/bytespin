import type { Metadata } from "next";

export const coinFlipMetadata: Metadata = {
  title: "Coin Flip - Free Online Heads or Tails Generator",
  description:
    "Flip a virtual coin online and get random Heads or Tails results instantly. Free coin flip tool with statistics, history and best of matches.",
  keywords: [
    "coin flip",
    "flip a coin",
    "heads or tails",
    "online coin toss",
    "random coin flip",
    "virtual coin",
    "bytespin coin flip",
    "bytecraft studio coin flip",
    "bytecraft studio",
  ],
  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/coin-flip",
  },
  openGraph: {
  title: "Coin Flip Online",
  description: "Free online Heads or Tails generator.",
  url: "https://bytespin.bytecraftstudio.com/coin-flip",
  siteName: "ByteSpin",
  type: "website",
  images: [
    {
      url: "https://bytespin.bytecraftstudio.com/og-image.png",
      width: 1200,
      height: 630,
      alt: "ByteSpin Coin Flip Tool",
    },
  ],
},
};