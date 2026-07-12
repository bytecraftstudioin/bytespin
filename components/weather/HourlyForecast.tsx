"use client";

import { WeatherData } from "@/lib/weather";
import { getWeatherDetails } from "@/lib/weatherCodes";

interface Props {
  data: WeatherData;
}

export default function HourlyForecast({ data }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-xl font-black mb-5">
        🕒 Hourly Forecast
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

        {data.hourly.map((hour, index) => {

          const weather = getWeatherDetails(hour.code);

          return (

            <div
              key={index}
              className="min-w-[110px] bg-slate-900 rounded-2xl p-4 text-center shrink-0 border border-white/5 hover:border-violet-500 transition-all"
            >

              <p className="text-sm text-gray-400">
                {hour.time}
              </p>

              <div className="flex justify-center my-3">
                {weather.icon}
              </div>

              <p className="text-2xl font-black text-emerald-400">
                {hour.temp}°
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {weather.text}
              </p>

            </div>

          );

        })}

      </div>

    </div>
  );
}