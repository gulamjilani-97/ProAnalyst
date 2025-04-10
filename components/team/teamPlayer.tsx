'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Player, SportsDBResponse } from '@/components/types/team';
import { dummyPlayers, dummyTeams } from '@/data/dummyPlayer';
import PlayerModal from './playerModal';
import { teamService } from '@/services/teamService';

interface TeamPlayersProps {
  teamId: string | null;
}

export default function TeamPlayers({ teamId }: TeamPlayersProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  const loadPlayers = useCallback(async () => {
    if (!teamId) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const teamPlayers = await teamService.getTeamPlayers(parseInt(teamId));
      const playersWithImages = await Promise.all(
        teamPlayers.map(async (player) => {
          const imageUrl = await teamService.fetchPlayerImage(player.name);
          return { ...player, imageUrl };
        })
      );
      setPlayers(playersWithImages);
    } catch (err: any) {
      setError(err.message || 'Failed to load Players');
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);



  if (!teamId) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5">
        <Users className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-card-foreground mb-2">Select a Team</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Choose a team from above to view detailed player statistics and information
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        </div>
        <p className="text-lg text-muted-foreground animate-pulse">Loading Player Information...</p>
        <div className="mt-4 text-sm text-muted-foreground/80">
          Fetching player statistics and images
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-destructive/5 rounded-lg">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive mb-2">Failed to Load Players</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">{error}</p>
        <button 
          onClick={loadPlayers}
          className="px-4 py-2 bg-card hover:bg-secondary/80 text-card-foreground rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-card rounded-lg shadow-lg border border-border hover:border-primary transition-colors cursor-pointer"
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={player.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random&size=100`}
                    alt={player.name}
                    className="w-20 h-20 rounded-full object-cover bg-secondary"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-1">{player.name}</h4>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-secondary text-secondary-foreground">
                      {player.position}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">Matches</p>
                      <p className="text-card-foreground font-medium">{player.matches_played}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Goals</p>
                      <p className="text-card-foreground font-medium">{player.goals}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">Assists</p>
                      <p className="text-card-foreground font-medium">{player.assists}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rating</p>
                      <p className={`font-medium ${player.rating >= 4 ? 'text-green-500' :
                          player.rating >= 3 ? 'text-primary' :
                            'text-yellow-500'
                        }`}>
                        {player.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PlayerModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </>
  );
}
