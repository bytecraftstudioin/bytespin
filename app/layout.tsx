import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ByteSpin - Free Online Spin Wheel & Random Picker",

  description:
  "ByteSpin is a free online spin wheel and random picker. Create custom wheels, spin instantly, choose winners, pick food, teams, tasks, and make random decisions.",

 
  keywords: [
    "spin wheel",
    "random picker",
    "decision maker",
    "wheel spinner",
    "food wheel",
    "name picker",
    "bytespin"
  ],

  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
