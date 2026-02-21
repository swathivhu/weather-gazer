import Image from "next/image";
import { format, parseISO } from "date-fns";
import type { Hour } from "@/types/weather";

type HourlyForecastCardProps = {
  hour: Hour;
};

export default function HourlyForecastCard({ hour }: HourlyForecastCardProps) {
  const date = parseISO(hour.time);

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white p-3 text-center w-24 shrink-0 rounded-xl transition-colors hover:bg-white/10">
      <p className="text-sm font-medium">{format(date, "ha")}</p>
      <Image
        src={`https:${hour.condition.icon}`}
        alt={hour.condition.text}
        width={48}
        height={48}
        className="w-12 h-12"
      />
      <p className="font-bold text-lg">{Math.round(hour.temp_c)}°</p>
    </div>
  );
}
