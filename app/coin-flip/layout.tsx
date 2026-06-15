import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coin Flip Online | ByteSpin",
  description:
    "Free online coin flip tool. Instantly flip a virtual coin and get Heads or Tails.",
};

export default function CoinFlipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}