"use client";
import { Sun } from "lucide-react";
import { useState, useEffect } from 'react';
import { parse } from 'date-fns';
import { cn } from "@/lib/utils";

type SunriseSunsetProps = {
  sunrise: string;
  sunset: string;
  className?: string;
};

const parseTime = (timeStr: string): Date => {
  return parse(timeStr, "hh:mm a", new Date());
};

export default function SunriseSunset({ sunrise, sunset, className }: SunriseSunsetProps) {
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    const calculateSunPosition = () => {
      const sunriseTime = parseTime(sunrise).getTime();
      const sunsetTime = parseTime(sunset).getTime();
      const now = new Date().getTime();
      
      const day = now > sunriseTime && now < sunsetTime;
      setIsDay(day);

      if (!day) return;

      let percentage = (now - sunriseTime) / (sunsetTime - sunriseTime);
      percentage = Math.max(0, Math.min(1, percentage));

      const angle = percentage * 180;
      const radians = (180 - angle) * (Math.PI / 180);

      const radius = 42;
      const cx = 50;
      const cy = 50;

      const x = cx + radius * Math.cos(radians);
      const y = cy - radius * Math.sin(radians);
      
      setSunPosition({ x, y });
    };

    calculateSunPosition();
    const interval = setInterval(calculateSunPosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [sunrise, sunset]);

  return (
    <div className={cn("bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-4 flex flex-col justify-between text-white", className)}>
      <h4 className="text-sm font-medium text-white/80">Sunrise & Sunset</h4>
      <div className="relative w-full aspect-[2/1] mt-2">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeDasharray="3 3"
          />

          {isDay && (
            <g transform={`translate(${sunPosition.x}, ${sunPosition.y})`}>
              <Sun className="text-yellow-400" fill="currentColor" style={{transform: "translate(-8px, -8px)"}} width={16} height={16}/>
            </g>
          )}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs font-medium px-1">
          <span>{sunrise}</span>
          <span>{sunset}</span>
        </div>
      </div>
    </div>
  );
}
