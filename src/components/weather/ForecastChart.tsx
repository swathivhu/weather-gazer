"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ForecastDay } from "@/types/weather";

type ForecastChartProps = {
  forecast: {
    forecastday: ForecastDay[];
  };
};

const chartConfig = {
  maxTemp: {
    label: "Max Temp (°C)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function ForecastChart({ forecast }: ForecastChartProps) {
  const chartData = useMemo(() => {
    return forecast.forecastday.map((day) => ({
      date: format(parseISO(day.date), "eee"),
      maxTemp: Math.round(day.day.maxtemp_c),
    }));
  }, [forecast]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          stroke="rgba(255, 255, 255, 0.7)"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          stroke="rgba(255, 255, 255, 0.7)"
          tickFormatter={(value) => `${value}°`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent 
            labelClassName="font-bold text-foreground"
            className="bg-background/80 backdrop-blur-sm border-border text-foreground rounded-lg shadow-lg"
            indicator="dot"
          />}
        />
        <Bar dataKey="maxTemp" fill="var(--color-maxTemp)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
