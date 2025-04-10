export const teams = {
  manchesterCity: {
    name: "Manchester City",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=64&h=64&fit=crop",
    stadium: "Etihad Stadium",
  },
  liverpool: {
    name: "Liverpool",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=64&h=64&fit=crop",
    stadium: "Anfield",
  },
  arsenal: {
    name: "Arsenal",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=64&h=64&fit=crop",
    stadium: "Emirates Stadium",
  },
  chelsea: {
    name: "Chelsea",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=64&h=64&fit=crop",
    stadium: "Stamford Bridge",
  },
  manchesterUnited: {
    name: "Manchester United",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=64&h=64&fit=crop",
    stadium: "Old Trafford",
  },
};

export const matches = [
  {
    id: 1,
    date: "2024-09-26T21:30:00Z",
    venue: "Etihad Stadium",
    competition: "Premier League",
    homeTeam: teams.manchesterCity,
    awayTeam: teams.liverpool,
    score: { home: 2, away: 0 },
    status: "FINISHED",
  },
  {
    id: 2,
    date: "2024-09-28T20:30:00Z",
    venue: "Camp Nou",
    competition: "Champions League",
    homeTeam: teams.arsenal,
    awayTeam: teams.chelsea,
    status: "SCHEDULED",
  },
  {
    id: 3,
    date: "2024-09-30T19:30:00Z",
    venue: "Anfield",
    competition: "Premier League",
    homeTeam: teams.liverpool,
    awayTeam: teams.manchesterUnited,
    score: { home: 2, away: 0 },
    status: "FINISHED",
  },
];

export const latestResults = [
  {
    id: 1,
    competition: "Premier League",
    date: "2024-09-25",
    homeTeam: teams.manchesterCity,
    awayTeam: teams.chelsea,
    score: { home: 3, away: 1 },
  },
  {
    id: 2,
    competition: "Premier League - Quarter Final",
    date: "2024-09-24",
    homeTeam: teams.arsenal,
    awayTeam: teams.liverpool,
    score: { home: 2, away: 2 },
  },
  {
    id: 3,
    competition: "FA Cup",
    date: "2024-09-23",
    homeTeam: teams.manchesterUnited,
    awayTeam: teams.chelsea,
    score: { home: 1, away: 0 },
  },
  {
    id: 4,
    competition: "Champions League",
    date: "2024-09-22",
    homeTeam: teams.liverpool,
    awayTeam: teams.arsenal,
    score: { home: 2, away: 1 },
  },
];

export const upcomingMatch = {
  id: 1,
  date: "2024-09-28T20:30:00Z",
  venue: "Etihad Stadium",
  competition: "Premier League",
  homeTeam: teams.manchesterCity,
  awayTeam: teams.arsenal,
  ticketStatus: "AVAILABLE",
};

export const newsItems = [
  "Breaking: Major transfer news expected today",
  "Match Analysis: Tactical breakdown of yesterday's game",
  "Team Update: Key player returns from injury",
  "Stats Special: Record-breaking performance analysis",
];


// Match Page

export const mockTeams = {
  arsenal: {
    name: "Arsenal",
    crest: "https://crests.football-data.org/57.png",
    location: "London",
  },
  chelsea: {
    name: "Chelsea",
    crest: "https://crests.football-data.org/61.png",
    location: "London",
  },
  liverpool: {
    name: "Liverpool",
    crest: "https://crests.football-data.org/64.png",
    location: "Liverpool",
  },
  manchesterCity: {
    name: "Manchester City",
    crest: "https://crests.football-data.org/65.png",
    location: "Manchester",
  },
  manchesterUnited: {
    name: "Manchester United",
    crest: "https://crests.football-data.org/66.png",
    location: "Manchester",
  },
  tottenham: {
    name: "Tottenham Hotspur",
    crest: "https://crests.football-data.org/73.png",
    location: "London",
  },
};

export const mockUpcomingMatches = [
  {
    id: 1,
    matchday: 26,
    homeTeam: mockTeams.arsenal,
    awayTeam: mockTeams.liverpool,
    utcDate: "2024-03-15T20:00:00Z",
    competition: "Premier League",
    venue: "Emirates Stadium",
  },
  {
    id: 2,
    matchday: 26,
    homeTeam: mockTeams.chelsea,
    awayTeam: mockTeams.manchesterCity,
    utcDate: "2024-03-16T15:00:00Z",
    competition: "Premier League",
    venue: "Stamford Bridge",
  },
  {
    id: 3,
    matchday: 26,
    homeTeam: mockTeams.tottenham,
    awayTeam: mockTeams.manchesterUnited,
    utcDate: "2024-03-17T16:30:00Z",
    competition: "Premier League",
    venue: "Tottenham Hotspur Stadium",
  },
];

export const mockLatestMatches = [
  {
    id: 1,
    competition: "Premier League",
    homeTeam: mockTeams.arsenal,
    awayTeam: mockTeams.manchesterCity,
    score: { home: 3, away: 1 },
    status: "FINISHED",
    utcDate: "2024-03-10T16:30:00Z",
  },
  {
    id: 2,
    competition: "Premier League",
    homeTeam: mockTeams.liverpool,
    awayTeam: mockTeams.tottenham,
    score: { home: 2, away: 2 },
    status: "FINISHED",
    utcDate: "2024-03-09T15:00:00Z",
  },
  {
    id: 3,
    competition: "Premier League",
    homeTeam: mockTeams.chelsea,
    awayTeam: mockTeams.manchesterUnited,
    score: { home: 1, away: 2 },
    status: "FINISHED",
    utcDate: "2024-03-08T20:00:00Z",
  },
];

