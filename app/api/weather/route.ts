import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) return NextResponse.json({ error: "Invalid geo nodes" }, { status: 400 });

  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;
    const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10&timezone=auto`;

    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl, { next: { revalidate: 1800 } }),
      fetch(airQualityUrl, { next: { revalidate: 1800 } })
    ]);

    return NextResponse.json({ weatherData: await weatherRes.json(), aqiData: await aqiRes.json() });
  } catch (error) {
    return NextResponse.json({ error: "Upstream microservice failure" }, { status: 500 });
  }
}