"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import MatchDetailsDialog from "@/components/home/matchDetailedDialog";
import { Match } from "@/components/types/match";

interface LatestResultsProps {
  matches: Match[];
}

export default function LatestResults({ matches }: LatestResultsProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const topMatches = matches.slice(0, 5);

  const handleMatchClick = (match: Match) => {
    setIsLoading(true);
    setSelectedMatch(match);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <>
      <div className="space-y-3">
        {topMatches.map((match) => (
          <div
            key={match.id}
            onClick={() => handleMatchClick(match)}
            className="bg-[#1c403f] rounded-xl p-4 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden"
          >
            {/* Competition and Date Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-6 h-6">
                  <Image
                    src={match.competition.emblem}
                    alt={match.competition.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-[#e0ff4f] bg-[#5a7432] px-3 py-0.5 rounded-full">
                  {match.competition.name}
                </span>
              </div>
              <span className="text-sm text-[#b6d841]">
                {formatDate(match.utcDate)}
              </span>
            </div>

            {/* Match Details */}
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
              {/* Home Team */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-[#00272b] rounded-full overflow-hidden">
                  <Image
                    src={match.homeTeam.crest}
                    alt={match.homeTeam.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="font-semibold text-[#e0ff4f] truncate">
                  {match.homeTeam.shortName}
                </span>
              </div>

              {/* Score */}
              <div className="px-4 py-1.5 rounded-lg bg-[#00272b] text-[#e0ff4f] font-bold text-lg min-w-[80px] text-center">
                {match.score.fullTime.home} - {match.score.fullTime.away}
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-3 justify-end">
                <span className="font-semibold text-[#e0ff4f] truncate">
                  {match.awayTeam.shortName}
                </span>
                <div className="relative w-10 h-10 bg-[#00272b] rounded-full overflow-hidden">
                  <Image
                    src={match.awayTeam.crest}
                    alt={match.awayTeam.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
            </div>

            {/* Loading Overlay */}
            {selectedMatch?.id === match.id && isLoading && (
              <div className="absolute inset-0 bg-[#00272b]/30 backdrop-blur-[2px] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#e0ff4f] rounded-full animate-ping" />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedMatch && (
        <MatchDetailsDialog
          match={selectedMatch}
          open={!!selectedMatch && !isLoading}
          onOpenChange={(open) => !open && setSelectedMatch(null)}
        />
      )}
    </>
  );
}