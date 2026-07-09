import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        {
          success: false,
          error: "Latitude and Longitude are required.",
        },
        { status: 400 }
      );
    }

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max` +
      `&timezone=auto`;

    const airQualityUrl =
      `https://air-quality-api.open-meteo.com/v1/air-quality` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      `&current=european_aqi,pm2_5,pm10` +
      `&timezone=auto`;

    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl, {
        cache: "no-store",
      }),
      fetch(airQualityUrl, {
        cache: "no-store",
      }),
    ]);

    if (!weatherRes.ok || !aqiRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch weather services.",
        },
        { status: 500 }
      );
    }

    const weatherData = await weatherRes.json();
    const aqiData = await aqiRes.json();

    return NextResponse.json(
      {
        success: true,
        weatherData,
        aqiData,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Weather API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}