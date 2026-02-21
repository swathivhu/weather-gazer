import { Lightbulb, Sun, Wind, Droplets, Umbrella, Thermometer, Zap } from "lucide-react";
import type { WeatherData } from "@/types/weather";

type WeatherInsightProps = {
  current: WeatherData["current"];
};

const getInsight = (current: WeatherData["current"]): { message: string; icon: React.ElementType } => {
    const { temp_c, uv, humidity, wind_kph, condition } = current;
    const conditionText = condition.text.toLowerCase();
  
    if (uv >= 8) {
      return { message: "High UV warning. Sunscreen and a hat are a must!", icon: Sun };
    }
    if (temp_c >= 38) {
      return { message: "Extreme heat alert! Stay hydrated and find shade.", icon: Thermometer };
    }
    if (wind_kph >= 40) {
      return { message: "Strong wind warning. Secure loose items outdoors.", icon: Wind };
    }
    if (conditionText.includes("storm") || conditionText.includes("thunder")) {
      return { message: "Storm alert! It's safer to stay indoors.", icon: Zap };
    }
    if (conditionText.includes("heavy rain")) {
      return { message: "Heavy rain is expected. Be cautious of slippery roads.", icon: Umbrella };
    }
    if (conditionText.includes("rain") || conditionText.includes("drizzle") || conditionText.includes("shower")) {
      return { message: "Light rain is expected. Don't forget your umbrella!", icon: Umbrella };
    }
    if (humidity >= 85) {
      return { message: "High humidity today. It will feel warmer than it is.", icon: Droplets };
    }
  
    return { message: "The weather is pleasant. A great day to be outside!", icon: Lightbulb };
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
