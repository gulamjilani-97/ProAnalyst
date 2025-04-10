"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import type { Match } from "@/components/types/match";

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const matchDate = new Date(match.utcDate);
  const timeUntilMatch = formatDistanceToNow(matchDate, { addSuffix: true });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card rounded-lg p-6 hover:bg-card/80 transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
            {match.competition.name}
          </span>
          <span className="text-sm text-muted-foreground">{timeUntilMatch}</span>
        </div>
        
        {/* Teams */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="font-bold text-lg">{match.homeTeam.shortName}</div>
          </div>
          
          <div className="px-6 py-3 bg-secondary rounded-xl font-bold text-xl min-w-[100px] text-center">
            {match.status === "FINISHED" ? (
              <span>{match.score.fullTime.home} - {match.score.fullTime.away}</span>
            ) : (
              <span>VS</span>
            )}
          </div>
          
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="font-bold text-lg text-right">{match.awayTeam.shortName}</div>
            <div className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div className="mt-4 text-center text-sm">
          <span className={`${
            match.status === "FINISHED" 
              ? "text-destructive" 
              : "text-primary"
          }`}>
            {match.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}