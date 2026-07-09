"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchBox from "@/components/weather/SearchBox";
import CurrentWeather from "@/components/weather/CurrentWeather";
import HourlyForecast from "@/components/weather/HourlyForecast";
import WeeklyForecast from "@/components/weather/WeeklyForecast";
import AQICard from "@/components/weather/AQICard";
import FAQ from "@/components/weather/FAQ";
import SeoContent from "@/components/weather/SeoContent";
import { WeatherData } from "@/lib/weather";

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (lat: number, lon: number, cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const { weatherData, aqiData } = await response.json();

      if (weatherData?.current) {
        setWeather({
          city: cityName,
          temp: Math.round(weatherData.current.temperature_2m),
          feelsLike: Math.round(weatherData.current.apparent_temperature),
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: Math.round(weatherData.current.wind_speed_10m),
          isDay: weatherData.current.is_day === 1,
          weatherCode: weatherData.current.weather_code,
          sunrise: new Date(weatherData.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sunset: new Date(weatherData.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          uvIndex: Math.round(weatherData.daily.uv_index_max[0]),
          aqi: aqiData?.current?.european_aqi || 0,
          pm25: Math.round(aqiData?.current?.pm2_5 || 0),
          pm10: Math.round(aqiData?.current?.pm10 || 0),
          hourly: weatherData.hourly.time.slice(0, 8).map((t: string, i: number) => ({
            time: new Date(t).toLocaleTimeString([], { hour: 'numeric' }),
            temp: Math.round(weatherData.hourly.temperature_2m[i]),
            code: weatherData.hourly.weather_code[i]
          })),
          daily: weatherData.daily.time.map((d: string, i: number) => ({
            date: new Date(d).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
            maxTemp: Math.round(weatherData.daily.temperature_2m_max[i]),
            minTemp: Math.round(weatherData.daily.temperature_2m_min[i]),
            code: weatherData.daily.weather_code[i]
          }))
        });
      }
    } catch (e) { console.error("Pipeline breakdown", e); }
    finally { setLoading(false); }
  };

  const triggerAutoDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherData(pos.coords.latitude, pos.coords.longitude, "Current Location"),
        () => fetchWeatherData(13.0827, 80.2707, "Chennai, India")
      );
    } else { fetchWeatherData(13.0827, 80.2707, "Chennai, India"); }
  };

  useEffect(() => { triggerAutoDetection(); }, []);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white antialiased">
      <Navbar />
      <section className="flex flex-col items-center text-center px-4 pt-12 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Weather Dashboard</h1>
        <SearchBox onSelectCity={fetchWeatherData} onDetectLocation={triggerAutoDetection} />

        {loading ? (
          <div className="w-full max-w-4xl h-64 bg-white/5 rounded-3xl animate-pulse" />
        ) : weather ? (
          <div className="w-full max-w-4xl space-y-6 text-left">
            <CurrentWeather data={weather} />
            <AQICard data={weather} />
            <HourlyForecast data={weather} />
            <WeeklyForecast data={weather} />
          </div>
        ) : (
          /* Static Hydration Fallback to bypass Soft 404 instantly before JS loads */
          <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-6 text-left">
            <h3 className="text-sm font-bold text-violet-400 uppercase tracking-wider mb-2">⚡ Live Terminal Fallback Mode</h3>
            <p className="text-xs text-gray-400">Loading server-side meteorological indices dynamically. Standard static layouts remain completely structural to maintain engine indexing requirements.</p>
          </div>
        )}
      </section>
      <SeoContent />
      <FAQ />
    </main>
  );
}