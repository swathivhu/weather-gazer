import type { WeatherData, ForecastDay } from "@/types/weather";
import DetailCard from "./DetailCard";
import SunriseSunset from "./SunriseSunset";
import { Thermometer, Droplets, Wind, Gauge } from "lucide-react";

type WeatherDetailsProps = {
  current: WeatherData["current"];
  todayForecast: ForecastDay;
};

export default function WeatherDetails({ current, todayForecast }: WeatherDetailsProps) {
  if (!todayForecast) return null;

  return (
    <>
      <h3 className="text-xl font-semibold text-white mt-2">Today's Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SunriseSunset 
          sunrise={todayForecast.astro.sunrise}
          sunset={todayForecast.astro.sunset}
          className="col-span-2"
        />
        <DetailCard
          icon={Thermometer}
          label="Feels Like"
          value={`${Math.round(current.feelslike_c)}°`}
        />
        <DetailCard
          icon={Droplets}
          label="Humidity"
          value={`${current.humidity}%`}
        />
        <DetailCard
          icon={Wind}
          label="Wind"
          value={`${current.wind_kph} kph`}
        />
        <DetailCard
          icon={Gauge}
          label="Pressure"
          value={`${current.pressure_mb} hPa`}
        />
      </div>
    </>
  );
}
