import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Name Picker - Free Online Name Selector",
  description:
    "Pick a random name instantly from your list. Free online Random Name Picker for giveaways, raffles, classroom activities, team selection and lucky draws.",

  alternates: {
    canonical:
      "https://bytespin.bytecraftstudio.com/name-picker",
  },

  openGraph: {
    title: "Random Name Picker - Free Online Name Selector",
    description:
      "Choose a random winner instantly from any list of names. Perfect for giveaways, raffles, classrooms and team selection.",
    url:
      "https://bytespin.bytecraftstudio.com/name-picker",
    siteName: "ByteSpin",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Random Name Picker - Free Online Name Selector",
    description:
      "Choose a random winner instantly from any list of names. Free online Random Name Picker tool.",
  },
};

export default function NamePickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}