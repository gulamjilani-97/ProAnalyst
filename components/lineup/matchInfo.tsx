'use client';

import { MatchDetails } from '@/components/types/lineup';
import { Sun, Cloud, Clock, Thermometer, Wind, Droplets } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getVenueInfo, getWeatherForLocation } from '@/lib/api';

interface Props {
  matchDetails: MatchDetails;
}

export default function MatchInfo({ matchDetails }: Props) {
  const [venueInfo, setVenueInfo] = useState(matchDetails.venue);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [weather, setWeather] = useState(matchDetails.weather);
  const [formattedMatchTime, setFormattedMatchTime] = useState('');

  useEffect(() => {
    const fetchVenueInfo = async () => {
      try {
        const info = await getVenueInfo(matchDetails.venue.name);
        if (info) {
          const updatedVenueInfo = { ...matchDetails.venue, ...info };
          setVenueInfo(updatedVenueInfo);

          // Fetch weather after getting venue info location
          if (info.location) {
            const weatherInfo = await getWeatherForLocation(info.location);
            if (weatherInfo) setWeather(weatherInfo);
          }
        }
      } catch (error) {
        console.error('Error fetching venue info or weather:', error);
      }
    };

    fetchVenueInfo();
  }, [matchDetails.venue]);

  useEffect(() => {
    if (venueInfo.fanart && venueInfo.fanart.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === (venueInfo.fanart?.length || 0) - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [venueInfo.fanart]);

  
  useEffect(() => {
    // Convert match time to user's local time
    if (matchDetails.matchTime) {
      try {
        const matchDate = new Date(matchDetails.matchTime);
        setFormattedMatchTime(
          matchDate.toLocaleString(undefined, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Adjust for AM/PM
          })
        );
      } catch (error) {
        console.error('Error formatting match time:', error);
        setFormattedMatchTime(matchDetails.matchTime);
      }
    }
  }, [matchDetails.matchTime]);

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Stadium Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
        {venueInfo.fanart ? (
          <Image
            src={venueInfo.fanart[currentImageIndex]}
            alt={venueInfo.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src={venueInfo.image || '/placeholder-stadium.jpg'}
            alt={venueInfo.name}
            fill
            className="object-cover"
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* Stadium Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                {venueInfo.name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg opacity-90">{venueInfo.location}</p>
            </div>
            <div className="mt-3 sm:mt-0 text-center sm:text-right">
              <p className="text-xl sm:text-2xl font-semibold">
                {venueInfo.capacity?.toLocaleString()}
                <span className="text-sm sm:text-base ml-1 opacity-80">seats</span>
              </p>
            </div>
          </div>
          <div className="mt-3 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {venueInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Match Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Match Time Card */}
        <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow mx-auto md:mx-0 max-w-md">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Match Time
              </h3>
              <p className="text-2xl font-bold text-primary">{formattedMatchTime}</p>
              <p className="text-xs text-muted-foreground">{venueInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow mx-auto md:mx-0 max-w-md">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              {weather.condition && weather.condition.toLowerCase().includes('cloud') ? (
                <Cloud className="w-6 h-6 text-primary" />
              ) : (
                <Sun className="w-6 h-6 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Weather Forecast
              </h3>
              <div className="flex flex-col sm:flex-row items-center mb-6">
                {weather.icon && (
                  <div className="relative w-16 h-16 mr-0 sm:mr-4 mb-2 sm:mb-0">
                    <Image
                      src={weather.icon}
                      alt={weather.condition}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="text-center sm:text-left">
                  <p className="text-3xl font-bold text-primary">
                    {weather.temperature}°C
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {weather.condition}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <Thermometer className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-card-foreground">Feels like</p>
                  <p className="text-lg font-semibold text-primary">{weather.feelsLike}°C</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <Droplets className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-card-foreground">Humidity</p>
                  <p className="text-lg font-semibold text-primary">{weather.humidity}%</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <Wind className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-card-foreground">Wind</p>
                  <p className="text-lg font-semibold text-primary">{weather.windSpeed} m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
