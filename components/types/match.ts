export interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
  }
  
  export interface Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  }
  
  export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: null | string;
  }
  
  export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  }
  
  export interface Score {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  }
  
  export interface Referee {
    id: number;
    name: string;
    type: string;
    nationality: string;
  }
  
  export interface Match {
    area: Area;
    competition: Competition;
    season: Season;
    id: number;
    utcDate: string;
    status: string;
    matchday: number;
    stage: string;
    group: string | null;
    lastUpdated: string;
    homeTeam: Team;
    awayTeam: Team;
    score: Score;
    odds: {
      msg: string;
    };
    referees: Referee[];
  }