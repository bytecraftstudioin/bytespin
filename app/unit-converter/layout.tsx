import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Free Online Conversion Tool",
  description:
    "Convert length, weight, temperature, volume and time units instantly. Free online Unit Converter by ByteSpin.",

    keywords: [
  "unit converter",
  "length converter",
  "weight converter",
  "temperature converter",
  "volume converter",
  "time converter",
  "cm to inches",
  "kg to lbs",
  "celsius to fahrenheit",
  "online converter",
  "free unit converter",
],

  alternates: {
    canonical:
      "https://bytespin.bytecraftstudio.com/unit-converter",
  },

  openGraph: {
    title: "Unit Converter - Free Online Conversion Tool",
    description:
      "Convert length, weight, temperature, volume and time units instantly.",
    url:
      "https://bytespin.bytecraftstudio.com/unit-converter",
    siteName: "ByteSpin",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Unit Converter - Free Online Conversion Tool",
    description:
      "Convert length, weight, temperature, volume and time units instantly.",
  },
};

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}