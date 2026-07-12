"use client";

import { WeatherData } from "@/lib/weather";
import { getWeatherDetails } from "@/lib/weatherCodes";

interface Props {
  data: WeatherData;
}

export default function WeeklyForecast({ data }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-xl font-black mb-5">
        📅 7 Day Forecast
      </h2>

      <div className="space-y-3">

        {data.daily.map((day, index) => {

          const weather = getWeatherDetails(day.code);

          return (

            <div
              key={index}
              className="flex items-center justify-between bg-slate-900 rounded-2xl p-4 border border-white/5 hover:border-violet-500 transition-all"
            >

              {/* Day */}

              <div className="flex items-center gap-4">

                <div>
                  {weather.icon}
                </div>

                <div>

                  <h3 className="font-bold">
                    {day.date}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {weather.text}
                  </p>

                </div>

              </div>

              {/* Temperature */}

              <div className="flex gap-3 items-center">

                <span className="text-emerald-400 font-black text-lg">
                  {day.maxTemp}°
                </span>

                <span className="text-gray-500">
                  {day.minTemp}°
                </span>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}