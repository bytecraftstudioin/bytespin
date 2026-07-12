import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather Forecast Today | Live Weather, Temperature & AQI | ByteSpin",

  description:
    "Check live weather forecast for any city worldwide. Get current temperature, feels like, humidity, wind speed, UV Index, Air Quality (AQI), hourly forecast and 7-day weather forecast with ByteSpin.",

  keywords: [
    "weather",
    "weather today",
    "live weather",
    "current weather",
    "weather forecast",
    "temperature today",
    "hourly weather",
    "7 day weather forecast",
    "live temperature",
    "humidity",
    "wind speed",
    "aqi",
    "air quality",
    "uv index",
    "sunrise",
    "sunset",
    "weather app",
    "weather dashboard",
    "global weather",
    "world weather",
    "weather forecast today",
    "india weather",
    "chennai weather",
    "mumbai weather",
    "delhi weather",
    "weather online",
    "bytespin weather"
  ],

  alternates: {
    canonical: "https://bytespin.bytecraftstudio.com/weather",
  },

  openGraph: {
    title: "Weather Forecast Today | ByteSpin",
    description:
      "Live weather updates, hourly forecast, weekly forecast, AQI, UV Index and temperature for cities worldwide.",
    url: "https://bytespin.bytecraftstudio.com/weather",
    siteName: "ByteSpin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://bytespin.bytecraftstudio.com/og-weather.png",
        width: 1200,
        height: 630,
        alt: "ByteSpin Weather Dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Weather Forecast Today | ByteSpin",
    description:
      "Live weather forecast, AQI, humidity, UV Index and 7-day forecast.",
    images: [
      "https://bytespin.bytecraftstudio.com/og-weather.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};