export interface Team {
  id: number;
  name: string;
  crest: string;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  matches_played: number;
  starts: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  xG: number;
  xAG: number;
  progressive_carries: number;
  progressive_passes: number;
  save_percentage: number | null;
  clean_sheets: number | null;
  tackles_won: number | null;
  interceptions: number | null;
  crest: string;
  rating: number;
  imageUrl?: string | null;
}

export interface SportsDBPlayer {
  strPlayer: string;
  strCutout: string | null;
}

export interface SportsDBResponse {
  player: SportsDBPlayer[] | null;
}