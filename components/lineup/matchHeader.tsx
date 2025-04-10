'use client';

import { Team } from '@/components/types/lineup';
import Image from 'next/image';

interface Props {
  homeTeam: Team;
  awayTeam: Team;
}

export default function MatchHeader({ homeTeam, awayTeam }: Props) {
  return (
    <div className="bg-card text-card-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="relative w-24 h-24">
              <Image
                src={homeTeam.logo}
                alt={homeTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">{homeTeam.name}</h2>
              <p className="text-muted-foreground">{homeTeam.location}</p>
              <div className="flex gap-2 mt-2">
                {homeTeam.latestResults.map((result, index) => (
                  <span
                    key={index}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${result === 'w' ? 'bg-accent text-accent-foreground' : result === 'd' ? 'bg-muted text-muted-foreground' : 'bg-destructive text-destructive-foreground'}`}
                  >
                    {result.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-4xl font-bold text-primary">VS</div>
          
          <div className="flex items-center space-x-8">
            <div>
              <h2 className="text-2xl font-bold text-primary text-right">{awayTeam.name}</h2>
              <p className="text-muted-foreground text-right">{awayTeam.location}</p>
              <div className="flex gap-2 mt-2 justify-end">
                {awayTeam.latestResults.map((result, index) => (
                  <span
                    key={index}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${result === 'w' ? 'bg-accent text-accent-foreground' : result === 'd' ? 'bg-muted text-muted-foreground' : 'bg-destructive text-destructive-foreground'}`}
                  >
                    {result.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative w-24 h-24">
              <Image
                src={awayTeam.logo}
                alt={awayTeam.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}