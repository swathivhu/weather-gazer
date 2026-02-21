"use client";

import { useMemo } from "react";
import type { Hour } from "@/types/weather";
import HourlyForecastCard from "./HourlyForecastCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type HourlyForecastProps = {
  hourlyData: Hour[];
};

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
  const next12Hours = useMemo(() => {
    const now = new Date();
    const upcomingHours = hourlyData.filter(hour => new Date(hour.time) > now);
    return upcomingHours.slice(0, 12);
  }, [hourlyData]);

  if (!next12Hours || next12Hours.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex w-max space-x-2 pb-3">
          {next12Hours.map((hour) => (
            <HourlyForecastCard key={hour.time_epoch} hour={hour} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
