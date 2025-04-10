export async function getPlayerImage(playerName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`
    );
    const data = await response.json();
    return data.player?.[0]?.strThumb || null;
  } catch (error) {
    console.error('Error fetching player image:', error);
    return null;
  }
}

export async function getVenueInfo(stadiumName: string): Promise<{
  image: string;
  fanart: string[];
  description: string;
  location: string;
  capacity: number;
} | null> {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchvenues.php?t=${encodeURIComponent(stadiumName)}`
    );
    const data = await response.json();
    const venue = data.venues?.[0];
    
    if (!venue) return null;
    
    const fanart = [
      venue.strFanart1,
      venue.strFanart2,
      venue.strFanart3,
      venue.strFanart4
    ].filter(Boolean);
    
    // Note: We now return the coordinate from the `strMap` field instead of strLocation.
    return {
      image: venue.strThumb,
      fanart,
      description: venue.strDescriptionEN,
      location: venue.strMap, // e.g. "53°28′59″N 2°12′1″W"
      capacity: parseInt(venue.intCapacity, 10),
    };
  } catch (error) {
    console.error('Error fetching venue info:', error);
    return null;
  }
}

// Helper function to convert a coordinate in DMS (Degrees Minutes Seconds) format to decimal degrees.
function convertDMSToDecimal(dms: string): number {
  // Expected format: "53°28′59″N"
  const regex = /(\d+)°(\d+)′(\d+)″([NSEW])/;
  const match = dms.match(regex);
  if (!match) return 0;
  const [, degrees, minutes, seconds, direction] = match;
  let decimal = parseFloat(degrees) +
                parseFloat(minutes) / 60 +
                parseFloat(seconds) / 3600;
  if (direction === 'S' || direction === 'W') {
    decimal *= -1;
  }
  return decimal;
}

export async function getWeatherForLocation(location: string): Promise<{
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
} | null> {
  try {
    let lat: number | undefined, lon: number | undefined;
    
    // Check if the location is provided as a DMS coordinate (contains the degree symbol "°").
    if (location.includes('°')) {
      // Split the string by space. Expecting two parts: one for latitude and one for longitude.
      const parts = location.split(' ');
      if (parts.length >= 2) {
        lat = convertDMSToDecimal(parts[0]);
        lon = convertDMSToDecimal(parts[1]);
        console.log('Converted DMS coordinates to decimal:', { lat, lon });
      }
    } else {
      // Fallback: use geocoding API to get coordinates for the location name.
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=ea7ed48817b060d0be453ff06416f550`
      );
      const geoData = await geoResponse.json();
      if (!geoData || !geoData[0]) {
        console.warn('No geocoding results for:', location);
        return null;
      }
      lat = geoData[0].lat;
      lon = geoData[0].lon;
      console.log('Obtained coordinates from geocoding:', { lat, lon });
    }

    if (lat === undefined || lon === undefined) {
      console.error('Coordinates are not available.');
      return null;
    }

    // Use these coordinates to get weather forecast data.
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ea7ed48817b060d0be453ff06416f550&units=metric`
    );
    const weatherData = await weatherResponse.json();

    if (weatherData.cod !== "200" || !weatherData.list || weatherData.list.length === 0) {
      console.error('Weather data validation failed:', weatherData);
      return null;
    }

    // Extract the first forecast entry.
    const currentWeather = weatherData.list[0];
    
    return {
      temperature: Math.round(currentWeather.main.temp),
      condition: currentWeather.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
      feelsLike: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed),
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}
