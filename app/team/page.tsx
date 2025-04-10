'use client';

import { useState } from 'react';
import Hero from '@/components/team/heroSection';
import TeamGrid from '@/components/team/teamGrid';
import TeamPlayers from '@/components/team/teamPlayer';

export default function Home() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-card-foreground">Premier League Teams</h2>
          </div>
          <TeamGrid
            selectedTeamId={selectedTeamId}
            onTeamSelect={setSelectedTeamId}
          />
        </div>

        <div className="mt-8 bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-card-foreground">Team Players</h2>
          </div>
          <TeamPlayers teamId={selectedTeamId} />
        </div>
      </main>
    </div>
  );
}
