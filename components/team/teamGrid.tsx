import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { dummyTeams } from '@/data/dummyPlayer';
import { Loader2, AlertCircle } from 'lucide-react';
import { teamService } from '@/services/teamService';
import { Team } from '../types/team';

interface TeamGridProps {
  onTeamSelect: (teamId: string) => void;
  selectedTeamId: string | null;
}

export default function TeamGrid({ onTeamSelect, selectedTeamId }: TeamGridProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await teamService.getAllTeams();
      setTeams(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load teams');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h3 className="text-lg text-muted-foreground animate-pulse">
          Loading Premier League Teams...
        </h3>
        <div className="mt-4 text-sm text-muted-foreground/80">
          Fetching team information and crests
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-destructive/5 rounded-lg">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive mb-2">{error}</h3>
        <button
          onClick={fetchTeams}
          className="px-4 py-2 bg-card hover:bg-secondary/80 text-card-foreground rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {teams.map((team) => (
        <div
          key={team.id}
          className={`bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 border border-border
            ${selectedTeamId === team.id.toString() ? 'ring-2 ring-primary border-primary' : ''}`}
          onClick={() => onTeamSelect(team.id.toString())}
        >
          <div className="flex flex-col items-center space-y-4">
            <img
              src={team.crest}
              alt={`${team.name} crest`}
              className="w-24 h-24 object-contain"
            />
            <h2 className="text-xl font-semibold text-center text-card-foreground">{team.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}