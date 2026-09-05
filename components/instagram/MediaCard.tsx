"use client";

import type { MediaResult } from "./UrlInput";
import { useEffect, useState } from "react";



interface Props {
  media: MediaResult;
}


export default function MediaCard({ media }: Props) {
  const [copied, setCopied] = useState(false);
const [selectedFormat, setSelectedFormat] = useState(
    media.qualities[0]?.formatId || ""
);

useEffect(() => {
  if (media.type === "video") {
    setSelectedFormat(media.qualities?.[0]?.formatId || "");
  }
}, [media]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(media.originalUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const platformConfig: Record<
  string,
  {
    icon: string;
    color: string;
  }
> = {
  Instagram: {
    icon: "📸",
    color: "bg-pink-600",
  },
  YouTube: {
    icon: "▶️",
    color: "bg-red-600",
  },
  Facebook: {
    icon: "📘",
    color: "bg-blue-600",
  },
  TikTok: {
    icon: "🎵",
    color: "bg-black",
  },
  Twitter: {
    icon: "❌",
    color: "bg-gray-800",
  },
  Pinterest: {
    icon: "📌",
    color: "bg-red-700",
  },
  Threads: {
    icon: "🧵",
    color: "bg-gray-900",
  },
};

const platform =
  platformConfig[media.source] || {
    icon: "🌐",
    color: "bg-gray-600",
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

      {/* Thumbnail */}

      <img
        src={media.thumbnail}
        alt={media.title}
        className="w-full aspect-video object-cover"
      />

      {/* Content */}

      <div className="p-6">

       <div className="flex flex-wrap items-center gap-3 mb-4">

  <span
    className={`${platform.color} px-3 py-1 rounded-full text-xs font-bold`}
  >
    {platform.icon} {media.source}
  </span>

  <span className="px-3 py-1 rounded-full bg-pink-600 text-xs font-bold">
    {media.type === "video" ? "🎥 Video" : "📷 Image"}
  </span>

  <span className="px-3 py-1 rounded-full bg-emerald-600 text-xs font-bold">
    HD Quality
  </span>

</div>

        <h3 className="text-2xl font-black mb-3 break-words">
          {media.title}
        </h3>

        <p className="text-gray-400 text-sm leading-7">
          Preview generated successfully. Click the download button below
          to save the media to your device.
        </p>

        {/* Buttons */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

{media.type === "video" && (
  <div className="mt-6">
    <label className="block text-sm text-gray-400 mb-2">
      Select Quality
    </label>

    <select
      value={selectedFormat}
      onChange={(e) => setSelectedFormat(e.target.value)}
      className="w-full rounded-xl bg-slate-900 border border-white/10 p-4"
    >
      {media.qualities.map((item) => (
        <option
          key={item.formatId}
          value={item.formatId}
        >
          {item.ext === "MP4"
            ? `⭐ ${item.quality} MP4`
            : `⚡ ${item.quality} WEBM`}
        </option>
      ))}
    </select>
  </div>
)}
         <button
  onClick={() => {

    console.log("Media:", media);
console.log("Selected Format:", selectedFormat);

  // Image download
  if (media.type === "image") {
    window.open(
  `http://localhost:5000/file?url=${encodeURIComponent(
    media.originalUrl
  )}&type=${media.type}`,
  "_blank"
);
    return;
  }

  // Video download
  window.open(
  `http://localhost:5000/file?url=${encodeURIComponent(
    media.originalUrl
  )}&formatId=${selectedFormat}&type=${media.type}`,
  "_blank"
);

}}
  className="text-center py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-violet-600 hover:opacity-90 transition font-bold w-full"
>
  📥 Download Media
</button>
 

          <button
            onClick={copyLink}
            className="py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-bold"
          >
            {copied ? "✅ Copied!" : "📋 Copy URL"}
          </button>

        </div>

        {/* Info */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

          <div className="bg-slate-900 rounded-2xl p-4 text-center">

            <h4 className="text-xs uppercase text-gray-400">
              Type
            </h4>

            <p className="mt-2 font-bold">
              {media.type}
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-4 text-center">

            <h4 className="text-xs uppercase text-gray-400">
              Quality
            </h4>

            <p className="mt-2 font-bold">
              HD
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-4 text-center">

            <h4 className="text-xs uppercase text-gray-400">
              Status
            </h4>

            <p className="mt-2 font-bold text-emerald-400">
              Ready
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-4 text-center">

            <h4 className="text-xs uppercase text-gray-400">
              Source
            </h4>

            <p className="mt-2 font-bold">
  {new URL(media.originalUrl).hostname
    .replace("www.", "")
    .replace(".com", "")
    .replace(".net", "")}
</p>
          </div>

        </div>

      </div>

    </div>
  );
}