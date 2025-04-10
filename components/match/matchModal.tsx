"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Trophy, Clock, Flag, User } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import type { Match } from "@/components/types/match";

interface MatchModalProps {
  match: Match | null;
  onClose: () => void;
}

export function MatchModal({ match, onClose }: MatchModalProps) {
  if (!match) return null;

  const matchDate = new Date(match.utcDate);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-card rounded-xl shadow-lg max-w-2xl w-full overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="relative h-32 bg-gradient-to-r from-primary/20 to-accent/20">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {match.competition.name}
                </span>
              </div>
            </div>

            {/* Match Content */}
            <div className="p-6">
              {/* Teams */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-24 h-24 relative mb-4">
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center">{match.homeTeam.name}</h3>
                </div>

                <div className="px-8 py-4 rounded-xl bg-secondary mx-4">
                  {match.status === "FINISHED" ? (
                    <div className="text-3xl font-bold">
                      {match.score.fullTime.home} - {match.score.fullTime.away}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">VS</div>
                  )}
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-24 h-24 relative mb-4">
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center">{match.awayTeam.name}</h3>
                </div>
              </div>

              {/* Match Details */}
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>{format(matchDate, "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{format(matchDate, "h:mm a")}</span>
                  <span className="text-sm">({formatDistanceToNow(matchDate, { addSuffix: true })})</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Trophy className="w-5 h-5" />
                  <span>Matchday {match.matchday}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Flag className="w-5 h-5" />
                  <span>{match.area.name}</span>
                </div>
                {match.referees.length > 0 && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="w-5 h-5" />
                    <span>Referee: {match.referees[0].name}</span>
                  </div>
                )}
              </div>

              {/* Additional Stats for Finished Matches */}
              {match.status === "FINISHED" && match.score && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold mb-4">Match Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Half-time Score</p>
                      <p className="text-lg font-bold">
                        {match.score.halfTime.home} - {match.score.halfTime.away}
                      </p>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Result</p>
                      <p className="text-lg font-bold">
                        {match.score.winner === "HOME_TEAM" 
                          ? "Home Win" 
                          : match.score.winner === "AWAY_TEAM"
                          ? "Away Win"
                          : "Draw"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}