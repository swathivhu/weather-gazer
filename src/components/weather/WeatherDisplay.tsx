import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WeatherData } from "@/types/weather";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastCard from "./ForecastCard";
import ForecastChart from "./ForecastChart";

type WeatherDisplayProps = {
  data: WeatherData;
};

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className="glass-card p-4 sm:p-8">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/20 rounded-md p-1 h-auto">
          <TabsTrigger value="current" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-sm">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-sm">3-Day Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <CurrentWeatherCard current={data.current} location={data.location} />
        </TabsContent>
        <TabsContent value="forecast">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.forecast.forecastday.map((day) => (
                <ForecastCard key={day.date_epoch} day={day} />
              ))}
            </div>
            <div className="mt-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-white text-center mb-4">3-Day Temperature Range</h3>
                <ForecastChart forecast={data.forecast} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
