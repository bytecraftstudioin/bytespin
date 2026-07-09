import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Weather Forecast | Hourly, 7-Day Forecast & AQI | ByteSpin",
  description:
    "Check live weather forecasts for any city worldwide. Get real-time temperature, hourly forecast, 7-day weather, AQI, UV Index, humidity, wind speed, sunrise, sunset, and air quality for free.",

  keywords: [
    "weather",
    "weather forecast",
    "live weather",
    "weather today",
    "hourly weather",
    "7 day forecast",
    "temperature",
    "AQI",
    "air quality",
    "UV index",
    "humidity",
    "wind speed",
    "sunrise",
    "sunset",
    "weather app",
    "global weather",
    "city weather",
    "forecast",
    "meteorology",
    "ByteSpin Weather",
  ],

  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/weather",
  },

  openGraph: {
    title: "Live Weather Forecast | ByteSpin",
    description:
      "Check live weather, hourly forecast, 7-day forecast, AQI, UV Index, humidity, wind speed and more for any city worldwide.",
    url: "https://bytespin.bytecraftstudio.com/weather",
    siteName: "ByteSpin",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ByteSpin Weather Forecast",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Live Weather Forecast | ByteSpin",
    description:
      "Get live weather forecasts, AQI, UV Index, hourly and 7-day weather updates worldwide.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  category: "Weather",
};