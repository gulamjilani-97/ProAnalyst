import { Match } from "@/components/types/match";
import api from "./api";
import { cache } from "react";

export const matchService = {
  getUpcomingMatches: async (): Promise<Match[]> => {
    try {
      const response = await api.get<Match[]>("/match/upcoming/");
      return response.data;
    } catch (error) {
      console.error("Error fetching upcoming matches:", error);
      throw error;
    }
  },

  getRecentMatches: async (): Promise<Match[]> => {
    try {
      const response = await api.get<Match[]>("/match/recent/");
      return response.data;
    } catch (error) {
      console.error("Error fetching recent matches:", error);
      throw error;
    }
  },

  getMatchDetails: async (matchId: number): Promise<Match> => {
    try {
      const response = await api.get<Match>(`/match/${matchId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching match details for ID ${matchId}:`, error);
      throw error;
    }
  },
};  


export interface VenueInfo {
  image: string;
  fanart: string[];
  description: string;
  location: string;
  capacity: number;
}

export const getVenueInfo = cache(async (stadiumName: string): Promise<VenueInfo | null> => {
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
    
    return {
      image: venue.strThumb,
      fanart,
      description: venue.strDescriptionEN,
      location: venue.strMap,
      capacity: parseInt(venue.intCapacity, 10),
    };
  } catch (error) {
    console.error('Error fetching venue info:', error);
    return null;
  }
});