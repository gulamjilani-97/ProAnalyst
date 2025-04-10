'use client';

import { MatchDetails } from '@/components/types/lineup';
import { Sun, Cloud, Clock, MapPin, Users, Info, Thermometer, Wind, Droplets } from 'lucide-react';
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

  useEffect(() => {
    const fetchVenueInfo = async () => {
      try {
        const info = await getVenueInfo(matchDetails.venue.name);
        console.log('Fetched venue info:', info);
        if (info) {
          const updatedVenueInfo = { ...matchDetails.venue, ...info };
          setVenueInfo(updatedVenueInfo);

          // Fetch weather after getting venue info location
          if (info.location) {
            const weatherInfo = await getWeatherForLocation(info.location);
            console.log('Fetched weather info:', weatherInfo);
            if (weatherInfo) {
              setWeather(weatherInfo);
            } else {
              console.warn('No weather info returned for location:', info.location);
            }
          } else {
            console.warn('No location info available in venue info:', info);
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Stadium Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden group">
          {venueInfo.fanart ? (
            <Image
              src={venueInfo.fanart[currentImageIndex]}
              alt={venueInfo.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            <Image
              src={venueInfo.image || '/placeholder-stadium.jpg'}
              alt={venueInfo.name}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Stadium Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{venueInfo.name}</h2>
                <p className="text-lg opacity-90">{venueInfo.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold">
                  {venueInfo.capacity?.toLocaleString()}
                  <span className="text-lg ml-2 opacity-80">seats</span>
                </p>
              </div>
            </div>
            
            <div className="mt-4 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
              <p className="text-sm leading-relaxed opacity-90">
                {venueInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Match Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Match Time Card */}
            <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Match Time</h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">{matchDetails.matchTime.split(',')[0]}</p>
                    <p className="text-muted-foreground">
                      {matchDetails.matchTime.split(',').slice(1).join(',').trim()}
                    </p>
                    <p className="text-sm text-muted-foreground">{venueInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Preview Card */}
            <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">Match Preview</h3>
                  <div className="prose prose-sm text-muted-foreground">
                    <p className="leading-relaxed">
                      Manchester City, known for their dominant play and strong squad, will face Tottenham Hotspur, 
                      who are looking to challenge their position with a strategic approach.
                    </p>
                    <p className="mt-2 leading-relaxed">
                      This clash promises to be an exciting encounter with both teams eager to showcase their strengths 
                      and secure crucial points in their campaign.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Weather Card */}
          <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                {weather.condition && weather.condition.toLowerCase().includes('cloud') ? (
                  <Cloud className="w-6 h-6 text-primary" />
                ) : (
                  <Sun className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Weather Forecast</h3>
                
                <div className="flex items-center mb-6">
                  {weather.icon && (
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={weather.icon}
                        alt={weather.condition}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-3xl font-bold text-primary">{weather.temperature}°C</p>
                    <p className="text-muted-foreground capitalize">{weather.condition}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <Thermometer className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-card-foreground">Feels like</p>
                    <p className="text-lg font-semibold text-primary">{weather.feelsLike}°C</p>
                  </div>
                  
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <Droplets className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-card-foreground">Humidity</p>
                    <p className="text-lg font-semibold text-primary">{weather.humidity}%</p>
                  </div>
                  
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <Wind className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-card-foreground">Wind</p>
                    <p className="text-lg font-semibold text-primary">{weather.windSpeed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
