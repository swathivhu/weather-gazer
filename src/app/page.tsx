
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getWeatherData } from "@/app/actions";
import type { WeatherData } from "@/types/weather";
import WeatherDisplay from "@/components/weather/WeatherDisplay";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ThemeToggle } from "@/components/theme-toggle";

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
});

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  const handleSearch = useCallback(async (location: string) => {
    setLoading(true);
    setWeatherData(null);
    const result = await getWeatherData(location);
    setLoading(false);

    if (result.success) {
      setWeatherData(result.data);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error fetching weather data",
        description: result.error,
      });
    }
  }, [form, toast]);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSearch(`${latitude},${longitude}`);
        },
        () => {
          toast({
            description: "Could not automatically fetch your location. Please search manually.",
          });
        }
      );
    }
  }, [handleSearch, toast]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSearch(values.location);
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center relative">
          <div className="absolute top-0 right-0 z-10">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">WeatherGazer</h1>
          <p className="text-white/80 mt-2">Your window to the weather</p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 mb-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Enter city or lat,lon..." className="pl-10 h-12 text-lg" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="h-12" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </Form>
        
        {loading && (
          <div className="flex justify-center items-center h-96 glass-card">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-white" />
              <p className="text-white/80">Fetching weather...</p>
            </div>
          </div>
        )}

        {weatherData && (
          <WeatherDisplay data={weatherData} />
        )}

        {!loading && !weatherData && (
          <div className="flex justify-center items-center text-center h-96 glass-card p-8">
            <div>
              <h2 className="text-2xl font-semibold text-white">Welcome to WeatherGazer</h2>
              <p className="text-white/80 mt-2">Enter a location above to get started, or allow location access.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
