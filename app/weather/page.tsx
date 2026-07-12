import Navbar from "@/components/layout/Navbar";
import WeatherClient from "./WeatherClient";
import FAQ from "@/components/weather/FAQ";
import SeoContent from "@/components/weather/SeoContent";
import { WeatherData } from "@/lib/weather";
import Footer from "@/components/weather/Footer";

async function getInitialWeather(): Promise<WeatherData> {
  const lat = 13.0827;
  const lon = 80.2707;

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`,
    {
      next: {
        revalidate: 1800,
      },
    }
  );

  const aqiRes = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10&timezone=auto`,
    {
      next: {
        revalidate: 1800,
      },
    }
  );

  const weather = await weatherRes.json();
  const aqi = await aqiRes.json();

  return {
    city: "Chennai",

    temp: Math.round(weather.current.temperature_2m),

    feelsLike: Math.round(
      weather.current.apparent_temperature
    ),

    humidity:
      weather.current.relative_humidity_2m,

    windSpeed: Math.round(
      weather.current.wind_speed_10m
    ),

    isDay:
      weather.current.is_day === 1,

    weatherCode:
      weather.current.weather_code,

    sunrise: new Date(
      weather.daily.sunrise[0]
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

    sunset: new Date(
      weather.daily.sunset[0]
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

    uvIndex: Math.round(
      weather.daily.uv_index_max[0]
    ),

    aqi:
      aqi.current?.european_aqi || 0,

    pm25: Math.round(
      aqi.current?.pm2_5 || 0
    ),

    pm10: Math.round(
      aqi.current?.pm10 || 0
    ),

    hourly: weather.hourly.time
      .slice(0, 24)
      .map((time: string, i: number) => ({
        time: new Date(time).toLocaleTimeString([], {
          hour: "numeric",
        }),

        temp: Math.round(
          weather.hourly.temperature_2m[i]
        ),

        code:
          weather.hourly.weather_code[i],
      })),

    daily: weather.daily.time.map(
      (day: string, i: number) => ({
        date: new Date(day).toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),

        maxTemp: Math.round(
          weather.daily.temperature_2m_max[i]
        ),

        minTemp: Math.round(
          weather.daily.temperature_2m_min[i]
        ),

        code:
          weather.daily.weather_code[i],
      })
    ),
  };
}

export default async function WeatherPage() {
  const weather = await getInitialWeather();

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">

      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-5xl md:text-7xl font-black text-center">
          Weather Forecast
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-10 max-w-3xl mx-auto">
          Live weather forecast, temperature, humidity,
          AQI, UV Index, hourly forecast and weekly
          weather updates for cities worldwide.
        </p>

        <WeatherClient
          initialData={weather}
        />

      </section>

      <SeoContent />

      <FAQ />
      <Footer />

    </main>
  );
}