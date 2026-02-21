import Image from "next/image";
import { Droplets, Thermometer, Wind } from "lucide-react";
import type { WeatherData } from "@/types/weather";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CurrentWeatherCardProps = {
  current: WeatherData["current"];
  location: WeatherData["location"];
};

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center gap-2 text-sm">
        <Icon className="h-5 w-5 text-accent" />
        <span className="text-white/80">{label}:</span>
        <span className="font-semibold text-white">{value}</span>
    </div>
);


export default function CurrentWeatherCard({ current, location }: CurrentWeatherCardProps) {
  return (
    <Card className="bg-transparent border-none text-white shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold">{location.name}, {location.country}</CardTitle>
        <CardDescription className="text-white/80 text-base">{current.condition.text}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex items-center gap-4">
          <Image
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            width={128}
            height={128}
            className="w-24 h-24 sm:w-32 sm:h-32"
          />
          <div>
            <p className="text-6xl sm:text-7xl font-bold">{Math.round(current.temp_c)}°C</p>
            <p className="text-white/80">Feels like {Math.round(current.feelslike_c)}°C</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
            <InfoItem icon={Droplets} label="Humidity" value={`${current.humidity}%`} />
            <InfoItem icon={Wind} label="Wind Speed" value={`${current.wind_kph} kph`} />
            <InfoItem icon={Thermometer} label="UV Index" value={current.uv} />
        </div>
      </CardContent>
    </Card>
  );
}
