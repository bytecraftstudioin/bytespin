import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dice Roller - Free Online Dice Roller | ByteSpin",

  description:
    "Roll up to 5 virtual dice instantly with ByteSpin Dice Roller. Perfect for board games, tabletop RPGs, D&D, classroom activities and random number generation.",

  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/dice-roller",
  },

  openGraph: {
    title: "Dice Roller - Free Online Dice Roller",
    description:
      "Roll virtual dice instantly for games, classrooms and random decisions.",
    url: "https://bytespin.bytecraftstudio.com/dice-roller",
    siteName: "ByteSpin",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dice Roller - Free Online Dice Roller",
    description:
      "Roll virtual dice instantly with ByteSpin.",
  },
};

export default function DiceRollerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}