"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Standing } from "@/components/types/standing";

interface LeagueTableProps {
  standings: Standing[];
  competition: {
    name: string;
    emblem: string;
  };
}

export default function LeagueTable({ standings, competition }: LeagueTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedStandings = isExpanded ? standings : standings.slice(0, 5);

  return (
    <div className="bg-[#1c403f] rounded-xl p-4 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-8 h-8">
          <Image
            src={competition.emblem}
            alt={competition.name}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-[#e0ff4f] text-xl font-bold">{competition.name} Table</h2>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[0.5fr,2fr,repeat(7,0.8fr)] gap-2 text-sm text-[#b6d841] border-b border-[#5a7432] pb-2 mb-2">
        <div className="text-left">#</div>
        <div className="text-left">Team</div>
        <div className="text-center">MP</div>
        <div className="text-center">W</div>
        <div className="text-center">D</div>
        <div className="text-center">L</div>
        <div className="text-center">GF</div>
        <div className="text-center">GA</div>
        <div className="text-center font-semibold">Pts</div>
      </div>

      {/* Table Body */}
      <div className="space-y-2">
        {displayedStandings.map((team) => (
          <div
            key={team.team.id}
            className="grid grid-cols-[0.5fr,2fr,repeat(7,0.8fr)] gap-2 items-center py-2 text-sm hover:bg-[#00272b] rounded-lg transition-colors relative"
          >
            {/* Position */}
            <div className="text-[#e0ff4f] font-semibold">{team.position}</div>

            {/* Team */}
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 bg-[#00272b] rounded-full overflow-hidden">
                <Image
                  src={team.team.crest}
                  alt={team.team.name}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-[#e0ff4f] font-medium truncate">
                {team.team.shortName}
              </span>
            </div>

            {/* Stats */}
            <div className="text-center text-[#b6d841]">{team.playedGames}</div>
            <div className="text-center text-[#b6d841]">{team.won}</div>
            <div className="text-center text-[#b6d841]">{team.draw}</div>
            <div className="text-center text-[#b6d841]">{team.lost}</div>
            <div className="text-center text-[#b6d841]">{team.goalsFor}</div>
            <div className="text-center text-[#b6d841]">{team.goalsAgainst}</div>
            <div className="text-center text-[#e0ff4f] font-bold">{team.points}</div>

            {/* Position Indicators */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                team.position <= 4
                  ? "bg-green-500"
                  : team.position >= 18
                  ? "bg-red-500"
                  : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-[#e0ff4f] hover:bg-[#00272b] rounded-lg transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-5 h-5" />
            <span>Show Less</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5" />
            <span>Show Full Table</span>
          </>
        )}
      </button>

      {/* Legend */}
      <div className="mt-6 flex gap-6 text-xs text-[#b6d841] px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>Champions League</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Relegation</span>
        </div>
      </div>
    </div>
  );
}