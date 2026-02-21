import { Lightbulb, Sun, Wind, Droplets, Umbrella, Thermometer } from "lucide-react";
import type { WeatherData } from "@/types/weather";

type WeatherInsightProps = {
  current: WeatherData["current"];
};

const getInsight = (current: WeatherData["current"]): { message: string; icon: React.ElementType } => {
    const { temp_c, uv, humidity, wind_kph, condition } = current;
  
    if (uv > 8) {
      return { message: "High UV index. Sunscreen and a hat are a must!", icon: Sun };
    }
    if (temp_c > 30) {
      return { message: "It's very hot! Stay hydrated and avoid direct sun.", icon: Thermometer };
    }
    if (condition.text.toLowerCase().includes("rain") || condition.text.toLowerCase().includes("drizzle") || condition.text.toLowerCase().includes("shower")) {
      return { message: "Rain is expected. Don't forget your umbrella!", icon: Umbrella };
    }
    if (wind_kph > 30) {
      return { message: "It's quite windy today. Hold onto your hat!", icon: Wind };
    }
    if (humidity > 80) {
      return { message: "High humidity today, it might feel warmer.", icon: Droplets };
    }
     if (temp_c < 5) {
      return { message: "Feeling chilly! Best to wear some warm layers.", icon: Thermometer };
    }
  
    return { message: "Weather looks calm. A great day to be outside!", icon: Lightbulb };
};

export default function WeatherInsight({ current }: WeatherInsightProps) {
    const { message, icon: Icon } = getInsight(current);

    return (
        <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 flex items-center gap-3 text-white">
            <Icon className="h-6 w-6 text-accent shrink-0" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}
