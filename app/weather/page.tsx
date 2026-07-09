"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

interface CitySuggestion {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  isDay: boolean;
  weatherCode: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  aqi: number;
  pm25: number;
  pm10: number;
  hourly: { time: string; temp: number; code: number }[];
  daily: { date: string; maxTemp: number; minTemp: number; code: number }[];
}

// 1. Comprehensive 28 Open-Meteo Weather Codes Mapping Matrix Setup
const getWeatherDetails = (code: number): { text: string; icon: React.JSX.Element } => {
  const sunIcon = <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
  const cloudSunIcon = <svg className="w-8 h-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
  const cloudIcon = <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
  const fogIcon = <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
  const rainIcon = <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v4m0 4h.01M4.93 4.93l1.41 1.41m10.606 0l1.41-1.41M12 3v1m0 16v1m9-9h-1M4 12H3" /></svg>;
  const snowIcon = <svg className="w-8 h-8 text-sky-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v16M5 12h14m-3.5-3.5l-7 7m0-7l7 7" /></svg>;
  const stormIcon = <svg className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;

  const mapping: Record<number, { text: string; icon: React.JSX.Element }> = {
    0: { text: "Clear Sky", icon: sunIcon },
    1: { text: "Mainly Clear", icon: cloudSunIcon },
    2: { text: "Partly Cloudy", icon: cloudSunIcon },
    3: { text: "Overcast", icon: cloudIcon },
    45: { text: "Foggy", icon: fogIcon },
    48: { text: "Depositing Rime Fog", icon: fogIcon },
    51: { text: "Light Drizzle", icon: rainIcon },
    53: { text: "Moderate Drizzle", icon: rainIcon },
    55: { text: "Dense Drizzle", icon: rainIcon },
    56: { text: "Light Freezing Drizzle", icon: rainIcon },
    57: { text: "Dense Freezing Drizzle", icon: rainIcon },
    61: { text: "Slight Rain", icon: rainIcon },
    63: { text: "Moderate Rain", icon: rainIcon },
    65: { text: "Heavy Rain", icon: rainIcon },
    66: { text: "Light Freezing Rain", icon: rainIcon },
    67: { text: "Heavy Freezing Rain", icon: rainIcon },
    71: { text: "Slight Snow Fall", icon: snowIcon },
    73: { text: "Moderate Snow Fall", icon: snowIcon },
    75: { text: "Heavy Snow Fall", icon: snowIcon },
    77: { text: "Snow Grains", icon: snowIcon },
    80: { text: "Slight Rain Showers", icon: rainIcon },
    81: { text: "Moderate Rain Showers", icon: rainIcon },
    82: { text: "Violent Rain Showers", icon: rainIcon },
    85: { text: "Slight Snow Showers", icon: snowIcon },
    86: { text: "Heavy Snow Showers", icon: snowIcon },
    95: { text: "Thunderstorm", icon: stormIcon },
    96: { text: "Thunderstorm with Slight Hail", icon: stormIcon },
    99: { text: "Thunderstorm with Heavy Hail", icon: stormIcon },
  };

  return mapping[code] || { text: "Scattered Clouds", icon: cloudIcon };
};

// 2. Dynamic AQI Scale Evaluation Matrix 
const getAQIStatus = (aqi: number) => {
  if (aqi <= 20) return { text: "Excellent", color: "text-emerald-400" };
  if (aqi <= 40) return { text: "Good", color: "text-green-400" };
  if (aqi <= 60) return { text: "Fair", color: "text-amber-400" };
  if (aqi <= 80) return { text: "Poor", color: "text-orange-400" };
  if (aqi <= 100) return { text: "Very Poor", color: "text-red-400" };
  return { text: "Hazardous", color: "text-purple-400" };
};

// 3. Dynamic UV Badge CSS Compiler 
const getUVStyle = (uv: number) => {
  if (uv <= 2) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (uv <= 5) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  if (uv <= 7) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  if (uv <= 10) return "bg-red-500/20 text-red-400 border-red-500/30";
  return "bg-purple-500/20 text-purple-400 border-purple-500/30";
};

export default function WeatherPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emptySearchFeedback, setEmptySearchFeedback] = useState<boolean>(false);
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bytespin_recent_weather");
    if (saved) setRecentSearches(JSON.parse(saved));
    triggerAutoDetection();
  }, []);

  const triggerAutoDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherData(pos.coords.latitude, pos.coords.longitude, "Current Location"),
        () => fetchWeatherData(13.0827, 80.2707, "Chennai, India")
      );
    } else {
      fetchWeatherData(13.0827, 80.2707, "Chennai, India");
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      setEmptySearchFeedback(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setEmptySearchFeedback(false);
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=en&format=json`);
        const data = await res.json();
        if (data && data.results && data.results.length > 0) {
          setSuggestions(data.results.map((item: any) => ({
            name: item.name,
            country: item.country || "",
            admin1: item.admin1 || "",
            latitude: item.latitude,
            longitude: item.longitude,
          })));
        } else {
          setSuggestions([]);
          setEmptySearchFeedback(true);
        }
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  const fetchWeatherData = async (lat: number, lon: number, cityName: string) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuggestions([]);
      setSearchQuery("");

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;
      const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10&timezone=auto`;

      const [weatherRes, aqiRes] = await Promise.all([fetch(weatherUrl), fetch(airQualityUrl)]);
      
      if (!weatherRes.ok || !aqiRes.ok) throw new Error("Network pipeline index failure");

      const weatherData = await weatherRes.json();
      const aqiData = await aqiRes.json();

      if (weatherData && weatherData.current) {
        const currentHourIdx = new Date().getHours();
        const computedHourly = weatherData.hourly.time.slice(currentHourIdx, currentHourIdx + 8).map((t: string, index: number) => ({
          time: new Date(t).toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
          temp: Math.round(weatherData.hourly.temperature_2m[currentHourIdx + index]),
          code: weatherData.hourly.weather_code[currentHourIdx + index]
        }));

        const computedDaily = weatherData.daily.time.map((d: string, index: number) => ({
          date: new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
          code: weatherData.daily.weather_code[index]
        }));

        setWeather({
          city: cityName,
          temp: Math.round(weatherData.current.temperature_2m),
          feelsLike: Math.round(weatherData.current.apparent_temperature),
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: Math.round(weatherData.current.wind_speed_10m),
          isDay: weatherData.current.is_day === 1,
          weatherCode: weatherData.current.weather_code,
          sunrise: new Date(weatherData.daily.sunrise[0]).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          sunset: new Date(weatherData.daily.sunset[0]).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          uvIndex: Math.round(weatherData.daily.uv_index_max[0]),
          aqi: aqiData?.current?.european_aqi || 0,
          pm25: Math.round(aqiData?.current?.pm2_5 || 0),
          pm10: Math.round(aqiData?.current?.pm10 || 0),
          hourly: computedHourly,
          daily: computedDaily,
        });

        if (cityName !== "Current Location") {
          updateRecentSearches(cityName);
        }
      }
    } catch (err) {
      setErrorMessage("Unable to fetch weather indices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (city: string) => {
    let searches = [city, ...recentSearches.filter((c) => c !== city)].slice(0, 4);
    setRecentSearches(searches);
    localStorage.setItem("bytespin_recent_weather", JSON.stringify(searches));
  };

  const handleCopy = () => {
    if (!weather) return;
    const text = `${weather.city}\nTemperature: ${weather.temp}°C\nFeels Like: ${weather.feelsLike}°C\nHumidity: ${weather.humidity}%\nWind: ${weather.windSpeed} km/h`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!weather) return;
    const shareText = `${weather.city}: ${weather.temp}°C - ${getWeatherDetails(weather.weatherCode).text}. Forecast via ByteSpin.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Weather Profile - ${weather.city}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) { console.error("Native system share canceled", err); }
    } else {
      handleCopy();
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white overflow-x-hidden">
      <Navbar />

      <section className="flex flex-col items-center text-center px-4 pt-12 pb-12 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-slate-200 to-gray-400 bg-clip-text text-transparent">
          Weather Forecast
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mb-8 px-2 leading-relaxed">
          Real-time global weather parameters. Check current temperature, atmospheric metrics, air quality charts, and multi-day forecasts seamlessly.
        </p>

        {/* Search Layout Box Setup */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-3 mb-6 px-2 z-30">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any city worldwide..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-12 text-sm font-bold text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors shadow-inner"
            />
            {loading && <span className="absolute right-4 top-4 text-xs font-mono text-violet-400 animate-spin">⏳</span>}
            
            {/* Auto Suggestions Framework */}
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl text-left z-40">
                {suggestions.map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => fetchWeatherData(city.latitude, city.longitude, `${city.name}, ${city.country}`)}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 text-xs sm:text-sm font-semibold border-b border-white/5 last:border-0 transition-colors"
                  >
                    📍 {city.name}, <span className="text-gray-400 text-xs">{city.admin1} ({city.country})</span>
                  </button>
                ))}
              </div>
            )}

            {/* Empty Search Target Layer */}
            {emptySearchFeedback && (
              <div className="absolute left-0 right-0 mt-2 bg-slate-950/95 border border-red-500/20 p-3 rounded-xl text-left text-xs font-bold text-red-400 shadow-xl z-40">
                ❌ No city found. Try modifying the characters.
              </div>
            )}
          </div>

          <button
            onClick={triggerAutoDetection}
            className="w-full sm:w-auto shrink-0 bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all text-xs font-bold py-4 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            📍 Use My Location
          </button>
        </div>

        {/* Recent Search Badges Matrix */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center max-w-xl mb-10 px-2">
            {recentSearches.map((city, i) => (
              <button
                key={i}
                onClick={async () => {
                  try {
                    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
                    const data = await res.json();
                    if (data?.results?.[0]) fetchWeatherData(data.results[0].latitude, data.results[0].longitude, city);
                  } catch (e) { console.error(e); }
                }}
                className="bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5"
              >
                📍 <span className="text-gray-300">{city}</span>
              </button>
            ))}
          </div>
        )}

        {/* Global Pipeline Error Message Frame */}
        {errorMessage && (
          <div className="w-full max-w-xl bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-sm font-semibold text-red-400 text-left mb-6">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* 4. Complex Visual Component Architecture (Skeleton Loader vs Dashboard Fluid Animation) */}
        {loading ? (
          <div className="w-full max-w-4xl space-y-6 text-left px-2 animate-pulse">
            <div className="h-64 bg-white/5 border border-white/10 rounded-3xl" />
            <div className="h-32 bg-white/5 border border-white/10 rounded-3xl" />
            <div className="h-96 bg-white/5 border border-white/10 rounded-3xl" />
          </div>
        ) : (
          weather && (
            <div className="w-full max-w-4xl space-y-6 text-left px-2 transition-all duration-700 transform opacity-100 translate-y-0 filter backdrop-blur-none">
              
              {/* Primary Header Component Deck */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-6 gap-4">
                  <div className="flex items-center gap-4">
                    {getWeatherDetails(weather.weatherCode).icon}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{weather.city}</h2>
                      <p className="text-violet-400 font-bold text-sm">{getWeatherDetails(weather.weatherCode).text}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-5xl sm:text-6xl font-black tracking-tighter text-emerald-400 font-mono">{weather.temp}°C</span>
                    <p className="text-xs text-gray-400 font-bold mt-1">Feels like {weather.feelsLike}°C</p>
                  </div>
                </div>

                {/* Performance Metrics Rows Setup */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6">
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Humidity</p>
                    <p className="text-base sm:text-lg font-extrabold text-gray-200 mt-1">{weather.humidity}%</p>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Wind Velocity</p>
                    <p className="text-base sm:text-lg font-extrabold text-gray-200 mt-1">{weather.windSpeed} km/h</p>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase text-gray-400">🌅 Sunrise</p>
                    <p className="text-xs sm:text-sm font-extrabold text-amber-400 mt-1">{weather.sunrise}</p>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase text-gray-400">🌇 Sunset</p>
                    <p className="text-xs sm:text-sm font-extrabold text-orange-400 mt-1">{weather.sunset}</p>
                  </div>
                </div>

                {/* Dynamic Environmental Index Tracker Row */}
                <div className="mt-4 p-4 bg-slate-950/40 border border-white/5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">European AQI</span>
                    <span className={`text-xs sm:text-sm font-bold font-mono ${getAQIStatus(weather.aqi).color}`}>
                      {weather.aqi} ({getAQIStatus(weather.aqi).text})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">PM2.5</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-200 font-mono">{weather.pm25} µg/m³</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">PM10</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-200 font-mono">{weather.pm10} µg/m³</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">UV Index</span>
                    <span className={`text-[11px] font-bold py-0.5 px-2 rounded-md border ${getUVStyle(weather.uvIndex)}`}>
                      {weather.uvIndex}
                    </span>
                  </div>
                </div>

                {/* Interaction Panels Logic Button Layout */}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-[11px] sm:text-xs bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 py-2.5 px-4 rounded-xl font-bold flex items-center gap-2 transition-all"
                  >
                    {copied ? "✅ Copied!" : "📋 Copy Metrics"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="text-[11px] sm:text-xs bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 border border-violet-500/30 py-2.5 px-4 rounded-xl font-bold flex items-center gap-2 transition-all"
                  >
                    🔗 Share Weather
                  </button>
                </div>
              </div>

              {/* Hourly Section Component Array Frame */}
              <div className="bg-slate-950/30 border border-white/10 rounded-3xl p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-violet-400 mb-4 tracking-tight">Hourly Outlook</h3>
                <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-white/10">
                  {weather.hourly.map((h, i) => (
                    <div key={i} className="min-w-[85px] bg-white/5 border border-white/5 rounded-2xl p-3 text-center flex flex-col items-center gap-2 shrink-0">
                      <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">{h.time}</span>
                      {getWeatherDetails(h.code).icon}
                      <span className="text-xs sm:text-sm font-black font-mono">{h.temp}°C</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7-Day Forecast Structural Row Matrix Block */}
              <div className="bg-slate-950/30 border border-white/10 rounded-3xl p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-violet-400 mb-4 tracking-tight">7-Day Forecast Matrix</h3>
                <div className="space-y-2.5">
                  {weather.daily.map((d, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-3 sm:p-4 rounded-2xl flex justify-between items-center gap-2">
                      <span className="text-xs font-bold text-gray-300 w-24 sm:w-36 truncate">{d.date}</span>
                      <div className="flex items-center gap-2 justify-center flex-1 sm:flex-initial sm:w-44 text-center">
                        {getWeatherDetails(d.code).icon}
                        <span className="text-[11px] text-gray-400 font-medium hidden sm:inline truncate max-w-[120px]">{getWeatherDetails(d.code).text}</span>
                      </div>
                      <div className="text-right font-mono text-xs sm:text-sm shrink-0">
                        <span className="text-emerald-400 font-bold">{d.maxTemp}°C</span>
                        <span className="text-gray-500 mx-1">/</span>
                        <span className="text-sky-400">{d.minTemp}°C</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )
        )}
      </section>

      {/* --- PRODUCTION COMPLIANT SEO FAQ ACCORDION SCHEMAS --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-violet-400">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Is the weather forecast live on ByteSpin?", a: "Yes, our metrics engine queries open global network grids continuously to update metrics every hour." },
            { q: "How accurate are the data loops generated by Open-Meteo?", a: "Open-Meteo parses advanced numerical weather prediction models alongside international data feeds to deliver pinpoint tracking data." },
            { q: "Can I search for micro rural locations globally?", a: "Yes. The underlying integrated geocoding layout maps coordinates borderless across any verified global municipality." },
            { q: "Is the tracking utility completely free?", a: "Yes, ByteSpin offers absolute open access to weather matrix rows, AQI metrics, and indexes with no transactional paywall parameters." },
            { q: "Does the layout offer full worldwide tracking matrices?", a: "Yes, meteorology maps and atmospheric parameters scale to cover coordinates worldwide instantly." },
            { q: "How often are the hourly meteorological maps refreshed?", a: "The processing data streams initialize fresh updates every hour to match shifting global coordinate points." }
          ].map((item, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center px-4 sm:px-5 py-3.5 font-bold text-sm sm:text-base hover:bg-white/5 transition-colors text-left"
              >
                <span className="pr-4">{item.q}</span>
                <span className="text-violet-400 shrink-0">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-3.5 pt-1.5 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- EXTENDED EXPANDED ROADMAP FOOTER DECK --- */}
      <footer className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center border-t border-white/10 space-y-6">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-violet-400">
          <a href="/weather" className="text-white border-b-2 border-violet-500 pb-0.5">🌦️ Weather</a>
          <span className="text-white/10">|</span>
          <a href="/currency-converter" className="hover:text-violet-300 transition-colors">💵 Currency</a>
          <span className="text-white/10">|</span>
          <a href="/fd-calculator" className="hover:text-violet-300 transition-colors">🧮 FD Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/sip-calculator" className="hover:text-violet-300 transition-colors">📱 Sip Calculator</a>
          <span className="text-white/10">|</span>
          <a href="/emi-calculator" className="hover:text-violet-300 transition-colors">📆 EMI Calculator</a>
        </div>
        <p className="text-[11px] text-gray-600 font-medium">© 2026 ByteSpin by Bytecraft Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}