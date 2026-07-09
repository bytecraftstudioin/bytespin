import { WeatherData } from "@/lib/weather";
import { getWeatherDetails } from "@/lib/weatherCodes";

export default function CurrentWeather({ data }: { data: WeatherData }) {
  const details = getWeatherDetails(data.weatherCode);
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-6 gap-4">
        <div className="flex items-center gap-4">
          {details.icon}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">{data.city}</h2>
            <p className="text-violet-400 font-bold text-sm">{details.text}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono">{data.temp}°C</span>
          <p className="text-xs text-gray-400 font-bold mt-1">Feels like {data.feelsLike}°C</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
        <div className="bg-slate-900/40 p-4 border border-white/5 rounded-2xl"><p className="text-[10px] uppercase font-bold text-gray-400">Humidity</p><p className="text-lg font-black">{data.humidity}%</p></div>
        <div className="bg-slate-900/40 p-4 border border-white/5 rounded-2xl"><p className="text-[10px] uppercase font-bold text-gray-400">Wind</p><p className="text-lg font-black">{data.windSpeed} km/h</p></div>
        <div className="bg-slate-900/40 p-4 border border-white/5 rounded-2xl"><p className="text-[10px] uppercase font-bold text-gray-400">Sunrise</p><p className="text-sm font-black text-amber-400">{data.sunrise}</p></div>
        <div className="bg-slate-900/40 p-4 border border-white/5 rounded-2xl"><p className="text-[10px] uppercase font-bold text-gray-400">Sunset</p><p className="text-sm font-black text-orange-400">{data.sunset}</p></div>
      </div>
    </div>
  );
}