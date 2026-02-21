import Image from "next/image";
import { format, parseISO } from "date-fns";
import type { ForecastDay } from "@/types/weather";
import { Separator } from "@/components/ui/separator";

type DailyForecastListProps = {
  forecastDays: ForecastDay[];
};

export default function DailyForecastList({ forecastDays }: DailyForecastListProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
        <ul className="flex flex-col gap-3">
            {forecastDays.map((day, index) => (
                <li key={day.date_epoch}>
                    <div className="flex items-center justify-between text-base">
                        <span className="font-medium w-1/4 min-w-[5rem]">{format(parseISO(day.date), 'EEEE')}</span>
                        <div className="flex items-center gap-2">
                          <Image
                              src={`https:${day.day.condition.icon}`}
                              alt={day.day.condition.text}
                              width={40}
                              height={40}
                          />
                        </div>
                        <div className="flex gap-4 font-medium w-1/4 justify-end">
                            <span>{Math.round(day.day.maxtemp_c)}°</span>
                            <span className="text-white/60">{Math.round(day.day.mintemp_c)}°</span>
                        </div>
                    </div>
                    {index < forecastDays.length - 1 && <Separator className="mt-3 bg-white/20" />}
                </li>
            ))}
        </ul>
    </div>
  );
}
