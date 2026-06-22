import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dice Roller | Free Online Dice Roller - ByteSpin",

  description:
    "Roll up to 5 virtual dice instantly with ByteSpin Dice Roller. Perfect for board games, D&D, RPGs, classroom activities and random number generation.",

  keywords: [
    "dice roller",
    "online dice roller",
    "free dice roller",
    "virtual dice",
    "roll a dice",
    "dice generator",
    "rpg dice roller",
    "dnd dice roller",
    "board game dice",
    "bytespin dice roller",
    "bytecraft studio dice roller",
    "bytecraft studio",
  ],

  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/dice-roller",
  },

  openGraph: {
    title: "Dice Roller | Free Online Dice Roller",
    description:
      "Roll virtual dice instantly for games, classrooms and random decisions.",
    url: "https://bytespin.bytecraftstudio.com/dice-roller",
    siteName: "ByteSpin",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dice Roller | Free Online Dice Roller",
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