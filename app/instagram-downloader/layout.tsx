import type { ReactNode } from "react";

export default function InstagramDownloaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Instagram Downloader",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    url: "https://bytespin.bytecraftstudio.com/instagram-downloader",
    description:
      "Download Instagram Reels, Photos, Videos and Carousel posts online for free with ByteSpin.",
    creator: {
      "@type": "Organization",
      name: "Bytecraft Studio",
    },
    publisher: {
      "@type": "Organization",
      name: "Bytecraft Studio",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {children}
    </>
  );
}