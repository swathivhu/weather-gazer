import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WeatherData } from "@/types/weather";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyForecast from "./HourlyForecast";
import DailyForecastList from "./DailyForecastList";
import WeatherDetails from "./WeatherDetails";
import WeatherInsight from "./WeatherInsight";

type WeatherDisplayProps = {
  data: WeatherData;
};

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className="glass-card p-4 sm:p-8">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/20 rounded-md p-1 h-auto">
          <TabsTrigger value="current" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-sm">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-sm">Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <CurrentWeatherCard current={data.current} location={data.location} />
          <WeatherInsight current={data.current} />
        </TabsContent>
        <TabsContent value="forecast">
          <div className="flex flex-col gap-6">
            {data.forecast.forecastday[0]?.hour && (
              <HourlyForecast hourlyData={data.forecast.forecastday[0].hour} />
            )}
            <DailyForecastList forecastDays={data.forecast.forecastday} />
            <WeatherDetails current={data.current} todayForecast={data.forecast.forecastday[0]} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
