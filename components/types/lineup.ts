export interface Team {
  name: string;
  location: string;
  logo: string;
  latestResults: Array<'w' | 'd' | 'l'>;
  players: Player[];
  formation?: string;
}

export interface MatchDetails {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  matchTime: string;
  competition: string;
  venue: {
    name: string;
    image: string;
    fanart?: string[];
    description?: string;
    location?: string;
    capacity?: number;
  };
  weather: {
    temperature: number;
    condition: string;
    icon?: string;
    feelsLike?: number;
    humidity?: number;
    windSpeed?: number;
  };
}

export interface Player {
  name: string;
  position: string;
  image?: string;
  nationality?: string;
}

export interface VenueResponse {
  venues: Array<{
    strStadium: string;
    strThumb: string;
    strFanart1: string;
    strFanart2: string;
    strFanart3: string;
    strFanart4: string;
    strDescriptionEN: string;
    strLocation: string;
    intCapacity: string;
  }>;
}

export interface PlayerResponse {
  player: Array<{
    strPlayer: string;
    strThumb: string;
    strNationality: string;
  }>;
}

export interface Formation {
  name: string;
  positions: {
    [key: string]: { x: number; y: number };
  };
}