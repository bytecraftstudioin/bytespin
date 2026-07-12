"use client";

import { WeatherData } from "@/lib/weather";
import { getWeatherDetails } from "@/lib/weatherCodes";

interface Props {
  data: WeatherData;
}

export default function CurrentWeather({ data }: Props) {
  const weather = getWeatherDetails(data.weatherCode);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

      {/* Top */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-black">
            {data.city}
          </h2>

          <p className="text-gray-400 mt-1">
            {weather.text}
          </p>
        </div>

        <div>
          {weather.icon}
        </div>

      </div>

      {/* Temperature */}

      <div className="mt-8">

        <h1 className="text-7xl font-black text-emerald-400">
          {data.temp}°
        </h1>

        <p className="text-gray-400 mt-2">
          Feels like {data.feelsLike}°
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

        <div className="bg-slate-900 rounded-2xl p-4">
          <p className="text-xs text-gray-400 uppercase">
            💧 Humidity
          </p>

          <p className="text-2xl font-bold mt-2">
            {data.humidity}%
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4">
          <p className="text-xs text-gray-400 uppercase">
            💨 Wind
          </p>

          <p className="text-2xl font-bold mt-2">
            {data.windSpeed} km/h
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4">
          <p className="text-xs text-gray-400 uppercase">
            🌅 Sunrise
          </p>

          <p className="text-xl font-bold mt-2">
            {data.sunrise}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4">
          <p className="text-xs text-gray-400 uppercase">
            🌇 Sunset
          </p>

          <p className="text-xl font-bold mt-2">
            {data.sunset}
          </p>
        </div>

      </div>

      {/* Bottom */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-violet-600 rounded-2xl p-4">

          <p className="text-xs uppercase opacity-80">
            UV Index
          </p>

          <h2 className="text-3xl font-black mt-2">
            {data.uvIndex}
          </h2>

        </div>

        <div className="bg-emerald-600 rounded-2xl p-4">

          <p className="text-xs uppercase opacity-80">
            Air Quality
          </p>

          <h2 className="text-3xl font-black mt-2">
            AQI {data.aqi}
          </h2>

        </div>

      </div>

    </div>
  );
}