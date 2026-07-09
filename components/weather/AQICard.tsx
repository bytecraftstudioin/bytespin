import { WeatherData } from "@/lib/weather";

export default function AQICard({ data }: { data: WeatherData }) {
  return (
    <div className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div><span className="text-[10px] text-gray-400 uppercase font-bold block">AQI Index</span><span className="text-sm font-bold text-green-400">{data.aqi}</span></div>
      <div><span className="text-[10px] text-gray-400 uppercase font-bold block">PM2.5 Matrix</span><span className="text-sm font-bold text-gray-200 font-mono">{data.pm25} µg/m³</span></div>
      <div><span className="text-[10px] text-gray-400 uppercase font-bold block">PM10 Matrix</span><span className="text-sm font-bold text-gray-200 font-mono">{data.pm10} µg/m³</span></div>
      <div><span className="text-[10px] text-gray-400 uppercase font-bold block">UV Radiation</span><span className="text-xs font-bold text-amber-400">Level {data.uvIndex}</span></div>
    </div>
  );
}