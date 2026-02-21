import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WeatherData } from "@/types/weather";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastCard from "./ForecastCard";

type WeatherDisplayProps = {
  data: WeatherData;
};

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className="glass-card p-4 sm:p-8">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
          <TabsTrigger value="current" className="rounded-md">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast" className="rounded-md">3-Day Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <CurrentWeatherCard current={data.current} location={data.location} />
        </TabsContent>
        <TabsContent value="forecast">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.forecast.forecastday.map((day) => (
              <ForecastCard key={day.date_epoch} day={day} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
