import api from "./api";

export interface PredictedPlayer {
  name: string;
  position: string;
  score: number;
}

export interface TeamPrediction {
  [team: string]: PredictedPlayer[];
}

export interface FormationPrediction {
  team: string;
  formation: string;
  lineup: PredictedPlayer[];
}

/**
 * Mapping of normalized frontend team names to the server stored team names.
 * Keys are lowercased and trimmed versions of possible frontend team names.
 */
const teamNameMapper: Record<string, string> = {
  // Arsenal
  "arsenal fc": "ARSENAL",
  "arsenal": "ARSENAL",

  // Crystal Palace
  "crystal palace fc": "CRYSTAL PALACE",
  "crystal palace": "CRYSTAL PALACE",

  // Everton
  "everton fc": "EVERTON",
  "everton": "EVERTON",

  // Ipswich Town
  "ipswich town fc": "IPSWICH TOWN",
  "ipswich town": "IPSWICH TOWN",

  // Leicester City
  "leicester city fc": "LEICESTER CITY",
  "leicester city": "LEICESTER CITY",

  // Wolves / Wolverhampton Wanderers
  "wolves fc": "WOLVES",
  "wolverhampton wanderers fc": "WOLVES",
  "wolverhampton": "WOLVES",

  // Southampton
  "southampton fc": "SOUTHAMPTON",
  "southampton": "SOUTHAMPTON",

  // Manchester United
  "manchester united fc": "MANUTD",
  "manchester united": "MANUTD",
  "man united fc": "MANUTD",
  "man united": "MANUTD",

  // Newcastle United
  "newcastle united fc": "NEWCASTLE",
  "newcastle united": "NEWCASTLE",
  "newcastle": "NEWCASTLE",

  // Bournemouth
  "afc bournemouth": "BOURNEMOUTH",
  "bournemouth fc": "BOURNEMOUTH",
  "bournemouth": "BOURNEMOUTH",

  // Aston Villa
  "aston villa fc": "ASTONVILLA",
  "aston villa": "ASTONVILLA",

  // Fulham
  "fulham fc": "FULHAM",
  "fulham": "FULHAM",

  // West Ham
  "west ham united fc": "WESTHAM",
  "west ham united": "WESTHAM",
  "west ham": "WESTHAM",

  // Brentford
  "brentford fc": "BRENTFORD",
  "brentford": "BRENTFORD",

  // Brighton & Hove Albion
  "brighton & hove albion fc": "BRIGHTON",
  "brighton & hove": "BRIGHTON",
  "brighton": "BRIGHTON",

  // Chelsea
  "chelsea fc": "CHELSEA",
  "chelsea": "CHELSEA",

  // Liverpool
  "liverpool fc": "LIVERPOOL",
  "liverpool": "LIVERPOOL",

  // Manchester City
  "manchester city fc": "MANCITY",
  "manchester city": "MANCITY",
  "man city": "MANCITY",

  // Nottingham Forest
  "nottingham forest fc": "NOTTINGHAM FORREST",
  "nottingham forest": "NOTTINGHAM FORREST",

  // Tottenham Hotspur
  "tottenham hotspur fc": "TOTTENHAM HOTSPUR",
  "tottenham hotspur": "TOTTENHAM HOTSPUR",
  "tottenham": "TOTTENHAM HOTSPUR",
};

/**
 * Normalize a team name coming from the frontend to match the stored server data.
 * @param frontendName - The team name as provided from the frontend.
 * @returns The corresponding server team name.
 */
function mapTeamName(frontendName: string): string {
  const normalized = frontendName.trim().toLowerCase();
  return teamNameMapper[normalized] || normalized.toUpperCase();
}

export async function getTwoTeamPrediction(
  team1: string,
  team2: string
): Promise<TeamPrediction> {
  // Map the frontend team names to the stored names on the server.
  const t1 = mapTeamName(team1);
  const t2 = mapTeamName(team2);

  try {
    const response = await api.get(`/api/prediction?team1=${t1}&team2=${t2}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team predictions:", error);
    throw error;
  }
}

export async function getFormationPrediction(
  team: string,
  formation: string
): Promise<FormationPrediction> {
  // Map the frontend team name to the stored name on the server.
  const mappedTeam = mapTeamName(team);

  try {
    const response = await api.get(
      `/api/formation-prediction?team=${mappedTeam}&formation=${formation}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching formation prediction:", error);
    throw error;
  }
}

export async function getPlayerImage(playerName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(
        playerName
      )}`
    );
    const data = await response.json();
    return data.player?.[0]?.strThumb || null;
  } catch (error) {
    console.error("Error fetching player image:", error);
    return null;
  }
}
