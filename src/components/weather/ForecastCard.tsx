import Image from "next/image";
import { format, parseISO } from "date-fns";
import type { ForecastDay } from "@/types/weather";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

type ForecastCardProps = {
  day: ForecastDay;
};

export default function ForecastCard({ day }: ForecastCardProps) {
  const date = parseISO(day.date);
  
  return (
    <Card className="bg-white/10 border-white/20 text-white flex flex-col items-center text-center p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105">
      <CardHeader className="p-2">
        <CardTitle className="text-lg font-semibold">{format(date, 'eeee')}</CardTitle>
        <CardDescription className="text-white/80">{format(date, 'MMM d')}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 flex flex-col items-center gap-2">
        <Image
          src={`https:${day.day.condition.icon}`}
          alt={day.day.condition.text}
          width={64}
          height={64}
        />
        <p className="text-sm text-white/90 leading-tight">{day.day.condition.text}</p>
        <div className="flex gap-4 mt-2 text-sm">
            <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-orange-400" />
                <span>{Math.round(day.day.maxtemp_c)}°</span>
            </div>
            <div className="flex items-center gap-1">
                <ArrowDown className="h-4 w-4 text-blue-400" />
                <span>{Math.round(day.day.mintemp_c)}°</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
