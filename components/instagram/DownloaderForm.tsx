"use client";
import { useState } from "react";

interface DownloaderFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function DownloaderForm({ onSubmit, loading }: DownloaderFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl px-2 mb-8 z-30">
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-2xl shadow-2xl focus-within:border-violet-500/50 transition-colors">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value.replace(/\s+/g, ""))}
          placeholder="Paste public Instagram link here..."
          className="w-full bg-transparent p-4 text-sm font-bold text-gray-100 placeholder-gray-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all shadow-md active:scale-95"
        >
          {loading ? "Parsing Link..." : "Fetch Content"}
        </button>
      </div>
    </form>
  );
}