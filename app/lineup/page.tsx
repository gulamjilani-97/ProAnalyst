'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/lineup/heroSection';
import MatchHeader from '@/components/lineup/matchHeader';
import MatchInfo from '@/components/lineup/matchInfo';
import LineupDisplay from '@/components/lineup/lineupDisplay';
import { matchesData } from '@/data/dummyLineup';

export default function Home() {
  const [selectedMatchId, setSelectedMatchId] = useState(matchesData[0].id);
  const selectedMatch = matchesData.find(match => match.id === selectedMatchId);
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState<{
    [teamName: string]: { name: string; position: string }[];
  } | null>(null);

  useEffect(() => {
    if (selectedMatch) {
      setIsLoading(true);
      // Simulate a network request to "fetch" predictions
      setTimeout(() => {
        setPredictions({
          [selectedMatch.homeTeam.name]: selectedMatch.homeTeam.players,
          [selectedMatch.awayTeam.name]: selectedMatch.awayTeam.players,
        });
        setIsLoading(false);
      }, 1000); // Simulated delay of 1 second
    }
  }, [selectedMatch]);

  return (
    <main className="min-h-screen bg-background">
      {selectedMatch && (
        <>
          <HeroSection
            matches={matchesData}
            selectedMatch={selectedMatch}
            onMatchSelect={setSelectedMatchId}
          />
          <div className="container mx-auto px-4">
            <div className="mt-8">
              <MatchHeader 
                homeTeam={selectedMatch.homeTeam}
                awayTeam={selectedMatch.awayTeam}
              />
              <MatchInfo matchDetails={selectedMatch} />
              
              {isLoading ? (
                <div className="container mx-auto px-4 py-12 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : predictions ? (
                <div className="container mx-auto px-4 py-12">
                  <h2 className="text-3xl font-bold mb-8 text-primary">Predicted Lineups</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <LineupDisplay 
                      players={predictions[selectedMatch.homeTeam.name] || []} 
                      teamName={selectedMatch.homeTeam.name}
                    />
                    <LineupDisplay 
                      players={predictions[selectedMatch.awayTeam.name] || []} 
                      teamName={selectedMatch.awayTeam.name}
                    />
                  </div>
                </div>
              ) : (
                <div className="container mx-auto px-4 py-12">
                  <p className="text-center text-muted-foreground">
                    Unable to load predictions. Please try again later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
