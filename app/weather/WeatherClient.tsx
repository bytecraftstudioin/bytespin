"use client";

import { useEffect, useState } from "react";

import SearchBox from "@/components/weather/SearchBox";
import CurrentWeather from "@/components/weather/CurrentWeather";
import HourlyForecast from "@/components/weather/HourlyForecast";
import WeeklyForecast from "@/components/weather/WeeklyForecast";
import AQICard from "@/components/weather/AQICard";

import { WeatherData } from "@/lib/weather";

interface Props {
  initialData: WeatherData;
}

export default function WeatherClient({ initialData }: Props) {
  const [weather, setWeather] = useState(initialData);
  const [loading, setLoading] = useState(false);

  async function fetchWeather(
    lat: number,
    lon: number,
    city: string
  ) {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/weather?lat=${lat}&lon=${lon}`
      );

      const json = await res.json();

      if (!json.success) return;

      const weatherData = json.weatherData;
      const aqiData = json.aqiData;

      setWeather({
        city,

        temp: Math.round(weatherData.current.temperature_2m),

        feelsLike: Math.round(
          weatherData.current.apparent_temperature
        ),

        humidity:
          weatherData.current.relative_humidity_2m,

        windSpeed: Math.round(
          weatherData.current.wind_speed_10m
        ),

        isDay: weatherData.current.is_day === 1,

        weatherCode:
          weatherData.current.weather_code,

        sunrise: new Date(
          weatherData.daily.sunrise[0]
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        sunset: new Date(
          weatherData.daily.sunset[0]
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        uvIndex: Math.round(
          weatherData.daily.uv_index_max[0]
        ),

        aqi:
          aqiData.current.european_aqi || 0,

        pm25: Math.round(
          aqiData.current.pm2_5 || 0
        ),

        pm10: Math.round(
          aqiData.current.pm10 || 0
        ),

        hourly: weatherData.hourly.time
          .slice(0, 24)
          .map((time: string, i: number) => ({
            time: new Date(time).toLocaleTimeString(
              [],
              {
                hour: "numeric",
              }
            ),
            temp: Math.round(
              weatherData.hourly.temperature_2m[i]
            ),
            code:
              weatherData.hourly.weather_code[i],
          })),

        daily: weatherData.daily.time.map(
          (day: string, i: number) => ({
            date: new Date(day).toLocaleDateString(
              [],
              {
                weekday: "short",
                month: "short",
                day: "numeric",
              }
            ),

            maxTemp: Math.round(
              weatherData.daily.temperature_2m_max[i]
            ),

            minTemp: Math.round(
              weatherData.daily.temperature_2m_min[i]
            ),

            code:
              weatherData.daily.weather_code[i],
          })
        ),
      });
    } finally {
      setLoading(false);
    }
  }

  function detectLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(
          position.coords.latitude,
          position.coords.longitude,
          "Current Location"
        );
      },
      () => {
        alert("Unable to detect location.");
      }
    );
  }

  useEffect(() => {}, []);

  return (
    <>

      <SearchBox
        onSelectCity={fetchWeather}
        onDetectLocation={detectLocation}
      />

      {loading && (
        <div className="w-full bg-white/5 rounded-3xl h-52 animate-pulse" />
      )}

      {!loading && (
        <div className="space-y-6">

          <CurrentWeather
            data={weather}
          />

          <AQICard
            data={weather}
          />

          <HourlyForecast
            data={weather}
          />

          <WeeklyForecast
            data={weather}
          />

        </div>
      )}

    </>
  );
}