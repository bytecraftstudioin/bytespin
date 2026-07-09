import { WeatherData } from "@/lib/weather";
import { getWeatherDetails } from "@/lib/weatherCodes";

export default function HourlyForecast({ data }: { data: WeatherData }) {
  return (
    <div className="bg-slate-950/30 border border-white/10 rounded-3xl p-5 sm:p-6">
      <h3 className="text-sm font-bold text-violet-400 mb-4 uppercase tracking-wider">Hourly Outlook</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {data.hourly.map((h, i) => (
          <div key={i} className="min-w-[85px] bg-white/5 border border-white/5 rounded-2xl p-3 text-center flex flex-col items-center gap-2">
            <span className="text-[10px] text-gray-400 font-bold">{h.time}</span>
            {getWeatherDetails(h.code).icon}
            <span className="text-sm font-black font-mono">{h.temp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}