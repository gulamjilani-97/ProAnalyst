import MatchHeader from '@/components/lineup/matchHeader';
import MatchInfo from '@/components/lineup/matchInfo';
import LineupDisplay from '@/components/lineup/lineupDisplay';
import { matchData } from '@/data/dummyLineup';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <MatchHeader 
        homeTeam={matchData.homeTeam}
        awayTeam={matchData.awayTeam}
      />
      <MatchInfo matchDetails={matchData} />
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-primary">Probable Lineups</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <LineupDisplay 
            players={matchData.homeTeam.players} 
            teamName={matchData.homeTeam.name}
          />
          <LineupDisplay 
            players={matchData.awayTeam.players} 
            teamName={matchData.awayTeam.name}
          />
        </div>
      </div>
    </main>
  );
}