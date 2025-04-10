import { Match } from "@/components/types/match";

export const mockUpcomingMatches: Match[] = [
  {
    area: {
      id: 2072,
      name: "England",
      code: "ENG",
      flag: "https://crests.football-data.org/770.svg"
    },
    competition: {
      id: 2021,
      name: "Premier League",
      code: "PL",
      type: "LEAGUE",
      emblem: "https://crests.football-data.org/PL.png"
    },
    season: {
      id: 2287,
      startDate: "2024-08-16",
      endDate: "2025-05-25",
      currentMatchday: 31,
      winner: null
    },
    id: 497770,
    utcDate: "2025-05-18T00:00:00Z",
    status: "SCHEDULED",
    matchday: 37,
    stage: "REGULAR_SEASON",
    group: null,
    lastUpdated: "2024-08-30T05:21:19Z",
    homeTeam: {
      id: 57,
      name: "Arsenal FC",
      shortName: "Arsenal",
      tla: "ARS",
      crest: "https://crests.football-data.org/57.png"
    },
    awayTeam: {
      id: 67,
      name: "Newcastle United FC",
      shortName: "Newcastle",
      tla: "NEW",
      crest: "https://crests.football-data.org/67.png"
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    },
    odds: {
      msg: "Activate Odds-Package in User-Panel to retrieve odds."
    },
    referees: []
  },
  {
    area: {
      id: 2072,
      name: "England",
      code: "ENG",
      flag: "https://crests.football-data.org/770.svg"
    },
    competition: {
      id: 2021,
      name: "Premier League",
      code: "PL",
      type: "LEAGUE",
      emblem: "https://crests.football-data.org/PL.png"
    },
    season: {
      id: 2287,
      startDate: "2024-08-16",
      endDate: "2025-05-25",
      currentMatchday: 31,
      winner: null
    },
    id: 497771,
    utcDate: "2025-05-18T00:00:00Z",
    status: "SCHEDULED",
    matchday: 37,
    stage: "REGULAR_SEASON",
    group: null,
    lastUpdated: "2024-06-18T14:29:15Z",
    homeTeam: {
      id: 58,
      name: "Aston Villa FC",
      shortName: "Aston Villa",
      tla: "AVL",
      crest: "https://crests.football-data.org/58.png"
    },
    awayTeam: {
      id: 73,
      name: "Tottenham Hotspur FC",
      shortName: "Tottenham",
      tla: "TOT",
      crest: "https://crests.football-data.org/73.png"
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    },
    odds: {
      msg: "Activate Odds-Package in User-Panel to retrieve odds."
    },
    referees: []
  }
];

export const mockLatestMatches: Match[] = [
  {
    area: {
      id: 2072,
      name: "England",
      code: "ENG",
      flag: "https://crests.football-data.org/770.svg"
    },
    competition: {
      id: 2021,
      name: "Premier League",
      code: "PL",
      type: "LEAGUE",
      emblem: "https://crests.football-data.org/PL.png"
    },
    season: {
      id: 2287,
      startDate: "2024-08-16",
      endDate: "2025-05-25",
      currentMatchday: 31,
      winner: null
    },
    id: 497716,
    utcDate: "2025-04-07T19:00:00Z",
    status: "FINISHED",
    matchday: 31,
    stage: "REGULAR_SEASON",
    group: null,
    lastUpdated: "2025-04-08T00:21:00Z",
    homeTeam: {
      id: 338,
      name: "Leicester City FC",
      shortName: "Leicester City",
      tla: "LEI",
      crest: "https://crests.football-data.org/338.png"
    },
    awayTeam: {
      id: 67,
      name: "Newcastle United FC",
      shortName: "Newcastle",
      tla: "NEW",
      crest: "https://crests.football-data.org/67.png"
    },
    score: {
      winner: "AWAY_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 0,
        away: 3
      },
      halfTime: {
        home: 0,
        away: 3
      }
    },
    odds: {
      msg: "Activate Odds-Package in User-Panel to retrieve odds."
    },
    referees: [
      {
        id: 11446,
        name: "Robert Jones",
        type: "REFEREE",
        nationality: "England"
      }
    ]
  },
  {
    area: {
      id: 2072,
      name: "England",
      code: "ENG",
      flag: "https://crests.football-data.org/770.svg"
    },
    competition: {
      id: 2021,
      name: "Premier League",
      code: "PL",
      type: "LEAGUE",
      emblem: "https://crests.football-data.org/PL.png"
    },
    season: {
      id: 2287,
      startDate: "2024-08-16",
      endDate: "2025-05-25",
      currentMatchday: 31,
      winner: null
    },
    id: 497717,
    utcDate: "2025-04-06T15:30:00Z",
    status: "FINISHED",
    matchday: 31,
    stage: "REGULAR_SEASON",
    group: null,
    lastUpdated: "2025-04-08T00:21:00Z",
    homeTeam: {
      id: 66,
      name: "Manchester United FC",
      shortName: "Man United",
      tla: "MUN",
      crest: "https://crests.football-data.org/66.png"
    },
    awayTeam: {
      id: 65,
      name: "Manchester City FC",
      shortName: "Man City",
      tla: "MCI",
      crest: "https://crests.football-data.org/65.png"
    },
    score: {
      winner: "DRAW",
      duration: "REGULAR",
      fullTime: {
        home: 0,
        away: 0
      },
      halfTime: {
        home: 0,
        away: 0
      }
    },
    odds: {
      msg: "Activate Odds-Package in User-Panel to retrieve odds."
    },
    referees: [
      {
        id: 11327,
        name: "John Brooks",
        type: "REFEREE",
        nationality: "England"
      }
    ]
  }
];