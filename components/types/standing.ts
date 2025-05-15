export interface Standing {
    position: number;
    team: {
      id: number;
      name: string;
      shortName: string;
      tla: string;
      crest: string;
    };
    playedGames: number;
    form: string | null;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
  }
  
  export interface LeagueStandings {
    filters: {
      season: string;
    };
    area: {
      id: number;
      name: string;
      code: string;
      flag: string;
    };
    competition: {
      id: number;
      name: string;
      code: string;
      type: string;
      emblem: string;
    };
    season: {
      id: number;
      startDate: string;
      endDate: string;
      currentMatchday: number;
      winner: null | string;
    };
    standings: Array<{
      stage: string;
      type: string;
      group: null | string;
      table: Standing[];
    }>;
  }