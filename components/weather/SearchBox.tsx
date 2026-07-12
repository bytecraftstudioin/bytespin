"use client";

import { useState } from "react";

interface SearchBoxProps {
  onSelectCity: (lat: number, lon: number, city: string) => void;
  onDetectLocation: () => void;
}

interface SearchResult {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export default function SearchBox({
  onSelectCity,
  onDetectLocation,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchCity(value: string) {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          value
        )}&count=5&language=en&format=json`
      );

      const data = await res.json();

      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mb-8 relative">

      <div className="flex gap-2">

        <input
          value={query}
          onChange={(e) => searchCity(e.target.value)}
          placeholder="Search any city..."
          className="flex-1 rounded-xl bg-slate-900 border border-white/10 p-3 text-white outline-none focus:border-violet-500"
        />

        <button
          onClick={onDetectLocation}
          className="px-4 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold"
        >
          📍
        </button>

      </div>

      {loading && (
        <div className="mt-2 text-xs text-gray-400">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute mt-2 w-full rounded-xl bg-slate-900 border border-white/10 overflow-hidden z-50">

          {results.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                onSelectCity(
                  city.latitude,
                  city.longitude,
                  `${city.name}, ${city.country}`
                );

                setQuery(`${city.name}, ${city.country}`);
                setResults([]);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-slate-800"
            >
              <div className="font-semibold">
                {city.name}
              </div>

              <div className="text-xs text-gray-400">
                {city.country}
              </div>
            </button>
          ))}

        </div>
      )}

    </div>
  );
}