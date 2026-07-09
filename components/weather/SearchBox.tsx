"use client";
import { useState, useEffect, useRef } from "react";
import { CitySuggestion } from "@/lib/weather";

interface SearchBoxProps {
  onSelectCity: (lat: number, lon: number, name: string) => void;
  onDetectLocation: () => void;
}

export default function SearchBox({ onSelectCity, onDetectLocation }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim().length < 3) return setSuggestions([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`);
      const data = await res.json();
      if (data.results) setSuggestions(data.results);
    }, 400);

    return () => clearTimeout(debounceRef.current!);
  }, [query]);

  return (
    <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-3 mb-6 relative z-30">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.replace(/\s\s+/g, " "))}
          placeholder="Search any city worldwide..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-500"
        />
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {suggestions.map((city, idx) => (
              <button
                key={idx}
                onClick={() => { onSelectCity(city.latitude, city.longitude, `${city.name}, ${city.country}`); setSuggestions([]); }}
                className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm border-b border-white/5 last:border-0"
              >
                📍 {city.name}, <span className="text-gray-400 text-xs">{city.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <button onClick={onDetectLocation} className="w-full sm:w-auto shrink-0 bg-violet-600 hover:bg-violet-700 py-4 px-5 rounded-2xl font-bold text-xs transition-all">
        Location
      </button>
    </div>
  );
}