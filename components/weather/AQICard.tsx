"use client";

import { WeatherData } from "@/lib/weather";

interface Props {
  data: WeatherData;
}

export default function AQICard({ data }: Props) {
  const getAQI = (aqi: number) => {
    if (aqi <= 20)
      return {
        label: "Good",
        color: "bg-emerald-600",
      };

    if (aqi <= 40)
      return {
        label: "Fair",
        color: "bg-green-500",
      };

    if (aqi <= 60)
      return {
        label: "Moderate",
        color: "bg-yellow-500",
      };

    if (aqi <= 80)
      return {
        label: "Poor",
        color: "bg-orange-500",
      };

    return {
      label: "Very Poor",
      color: "bg-red-600",
    };
  };

  const air = getAQI(data.aqi);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-xl font-black mb-5">
        🌫 Air Quality
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AQI */}

        <div
          className={`${air.color} rounded-2xl p-6 text-center`}
        >
          <p className="uppercase text-xs opacity-80">
            Air Quality Index
          </p>

          <h2 className="text-5xl font-black mt-3">
            {data.aqi}
          </h2>

          <p className="mt-3 font-bold">
            {air.label}
          </p>
        </div>

        {/* Pollutants */}

        <div className="space-y-4">

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="text-xs text-gray-400 uppercase">
              PM2.5
            </p>

            <h3 className="text-2xl font-black mt-2 text-emerald-400">
              {data.pm25} μg/m³
            </h3>

          </div>

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="text-xs text-gray-400 uppercase">
              PM10
            </p>

            <h3 className="text-2xl font-black mt-2 text-sky-400">
              {data.pm10} μg/m³
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}