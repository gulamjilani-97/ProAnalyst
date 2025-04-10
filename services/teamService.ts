import api from './api';
import { Team, Player, SportsDBResponse } from '@/components/types/team';

export const teamService = {
  getAllTeams: async (): Promise<Team[]> => {
    const response = await api.get('/team/all/');
    return response.data;
  },

  getTeamPlayers: async (teamId: number): Promise<Player[]> => {
    const response = await api.get(`/team/${teamId}/players/`);
    return response.data;
  },

  fetchPlayerImage: async (playerName: string): Promise<string | null> => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`);
        const data: SportsDBResponse = await response.json();
        return data.player?.[0]?.strCutout || null;
      } catch (error) {
        console.error('Error fetching player image:', error);
        return null;
      }
  } 
};

