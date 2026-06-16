import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coin Flip Online | ByteSpin",
  description:
    "Flip a virtual coin online and get random Heads or Tails results instantly. Free online coin flip tool.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}