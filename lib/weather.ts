export interface HourlyForecast {
  time: string;
  temp: number;
  code: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  code: number;
}

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

  hourly: HourlyForecast[];

  daily: DailyForecast[];
}