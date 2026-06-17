import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coin Flip - Free Online Heads or Tails Generator",
  description:
    "Flip a virtual coin online. Get random Heads or Tails results instantly. Free, fast and mobile friendly coin toss tool.",

  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/coin-flip",
  },

  openGraph: {
    title: "Coin Flip - Free Online Coin Toss",
    description:
      "Generate random Heads or Tails instantly.",
    url: "https://bytespin.bytecraftstudio.com/coin-flip",
    siteName: "ByteSpin",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Coin Flip - Free Online Coin Toss",
    description:
      "Generate random Heads or Tails instantly.",
  },
};

export default function CoinFlipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}