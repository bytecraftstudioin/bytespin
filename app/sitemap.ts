import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const base = "https://bytespin.bytecraftstudio.com";

  const routes = [

    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",

    "/weather",

    "/coin-flip",
    "/dice-roller",
    "/yes-or-no",
    "/name-picker",

    "/random-number-generator",

    "/password-generator",

    "/qr-generator",

    "/bmi-calculator",

    "/age-calculator",

    "/gst-calculator",

    "/emi-calculator",

    "/fd-calculator",

    "/sip-calculator",

    "/percentage-calculator",

    "/currency-converter",

    "/unit-converter"

  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

}