"use server";

import type { WeatherApiResponse, WeatherData, WeatherError } from "@/types/weather";

export async function getWeatherData(location: string): Promise<{ success: true; data: WeatherData } | { success: false; error: string }> {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    console.error("Weather API key is not configured.");
    return { success: false, error: "Server configuration error: API key missing." };
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    const responseData = await response.json();

    if (!response.ok) {
        const errorData = responseData as WeatherError;
        return { success: false, error: errorData.error.message || `HTTP error! status: ${response.status}` };
    }

    const data: WeatherApiResponse = responseData;

    if ("error" in data) {
      return { success: false, error: data.error.message };
    }

    return { success: true, data: data as WeatherData };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    if (error instanceof Error) {
        return { success: false, error: `Network or parsing error: ${error.message}` };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}
