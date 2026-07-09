export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  isDay: boolean;
  weatherCode: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  aqi: number;
  pm25: number;
  pm10: number;
  hourly: { time: string; temp: number; code: number }[];
  daily: { date: string; maxTemp: number; minTemp: number; code: number }[];
}

export interface CitySuggestion {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}