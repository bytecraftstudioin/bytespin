import { WeatherData } from "@/lib/weather";
import { getWeatherDetails } from "@/lib/weatherCodes";

export default function WeeklyForecast({ data }: { data: WeatherData }) {
  return (
    <div className="bg-slate-950/30 border border-white/10 rounded-3xl p-5 sm:p-6">
      <h3 className="text-sm font-bold text-violet-400 mb-4 uppercase tracking-wider">7-Day Forecast Structural Matrix</h3>
      <div className="space-y-2.5">
        {data.daily.map((d, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-3 rounded-2xl flex justify-between items-center">
            <span className="text-xs font-bold text-gray-300 w-24 sm:w-36">{d.date}</span>
            <div className="flex items-center gap-2 flex-1 sm:justify-start justify-center">
              {getWeatherDetails(d.code).icon}
              <span className="text-[11px] text-gray-400 hidden sm:inline">{getWeatherDetails(d.code).text}</span>
            </div>
            <div className="font-mono text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold">{d.maxTemp}°C</span>
              <span className="text-gray-500 mx-1">/</span>
              <span className="text-sky-400">{d.minTemp}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}