"use client";

import { useState } from "react";
import MediaCard from "./MediaCard";

export interface MediaResult {
  type: "image" | "video";
  thumbnail: string;
  title: string;
  downloadUrl: string;
  originalUrl: string;
  source: string;

  qualities: {
  quality: string;
  ext: string;
  formatId: string;
}[];
}

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<MediaResult | null>(null);
  const [error, setError] = useState("");

  function isValidUrl(link: string) {
  try {
    new URL(link);
    return true;
  } catch {
    return false;
  }
}

function detectPlatform(link: string) {
  const url = link.toLowerCase();

  if (url.includes("instagram.com")) return "Instagram";

  if (url.includes("youtube.com") || url.includes("youtu.be"))
    return "YouTube";

  if (url.includes("facebook.com") || url.includes("fb.watch"))
    return "Facebook";

  if (url.includes("tiktok.com"))
    return "TikTok";

  if (url.includes("twitter.com") || url.includes("x.com"))
    return "Twitter";

  if (url.includes("pinterest.com"))
    return "Pinterest";

  if (url.includes("threads.net"))
    return "Threads";

  if (url.includes("reddit.com"))
    return "Reddit";

  if (url.includes("vimeo.com"))
    return "Vimeo";

  if (url.includes("dailymotion.com"))
    return "Dailymotion";

  return "Unknown";
}

 async function handleDownload() {
  setError("");
  setMedia(null);

  if (!url.trim()) {
    setError("Please paste a URL.");
    return;
  }

  if (!isValidUrl(url)) {
  setError("Please enter a valid URL.");
  return;
}



  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

setMedia({
  type: data.type,
  title: data.title,
  thumbnail: data.thumbnail,
  downloadUrl: data.downloadUrl,
  originalUrl: url,
  source: detectPlatform(url),
  qualities: data.qualities || [],
});

  } catch (err) {
    console.error(err);
    setError("Server Error");
  } finally {
    setLoading(false);
  }
}

const detectedPlatform = detectPlatform(url);

const title =
  detectedPlatform !== "Unknown"
    ? `${detectedPlatform} Downloader`
    : "Universal Downloader";

const description =
  detectedPlatform !== "Unknown"
    ? `Paste a public ${detectedPlatform} URL below.`
    : "Paste any supported social media URL below.";
  return (
    <section id="downloader">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <h2 className="text-2xl font-black mb-2">
  {title}
</h2>

       <p className="text-gray-400 mb-6">
  {description}
</p>

        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Instagram, YouTube, Facebook, TikTok, X, Pinterest or Threads URL..."
            className="flex-1 rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 outline-none focus:border-pink-500"
          />

          <button
            onClick={handleDownload}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-pink-600 to-violet-600 px-8 py-4 font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Download"}
          </button>

        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-red-300">
            {error}
          </div>
        )}

      </div>

      {media && (
        <div className="mt-8">
          <MediaCard media={media} />
        </div>
      )}

    </section>
  );
}