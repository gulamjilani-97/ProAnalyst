"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Trophy, Clock, Flag, User, Loader2 } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import type { Match } from "@/components/types/match";
import { VenueInfo, getVenueInfo } from "@/services/matchService";
import Image from "next/image";

interface MatchModalProps {
  match: Match | null;
  onClose: () => void;
  error?: string | null;
  loading?: boolean;
}

export function MatchModal({ match, onClose, error, loading }: MatchModalProps) {
  const [venueInfo, setVenueInfo] = useState<VenueInfo | null>(null);

  useEffect(() => {
    const fetchVenueInfo = async () => {
      if (match?.venue) {
        const info = await getVenueInfo(match.venue.stadium);
        setVenueInfo(info);
      }
    };

    fetchVenueInfo();
  }, [match?.venue]);

  if (!match) return null;

  const matchDate = new Date(match.utcDate);
  const stadiumImage =
    venueInfo?.image || venueInfo?.fanart[0] ||
    "https://images.unsplash.com/photo-1540552965541-cc47d835c36d?w=1920&h=600&fit=crop";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] overflow-y-auto pb-24">
        <div className="min-h-screen px-4 text-center">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-card rounded-2xl shadow-xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors z-50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              <>
                {/* Hero Section with Teams */}
                <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden rounded-t-2xl">
                  <Image
                    src={stadiumImage}
                    alt={match.venue?.stadium || "Stadium"}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-card">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="w-full max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                          {/* Home Team */}
                          <div className="flex flex-col items-center text-center flex-1">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 relative bg-card/30 rounded-full p-3 backdrop-blur-sm">
                              <Image
                                src={match.homeTeam.crest}
                                alt={match.homeTeam.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                            <h3 className="mt-3 font-bold text-sm sm:text-base lg:text-lg">
                              {match.homeTeam.name}
                            </h3>
                          </div>

                          {/* Score */}
                          <div className="px-6 py-3 rounded-xl bg-card/30 backdrop-blur-sm text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                              {match.status === "FINISHED" 
                                ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                                : "VS"
                              }
                            </div>
                            <div className="text-xs sm:text-sm mt-1 text-muted-foreground">
                              {match.competition.name}
                            </div>
                          </div>

                          {/* Away Team */}
                          <div className="flex flex-col items-center text-center flex-1">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 relative bg-card/30 rounded-full p-3 backdrop-blur-sm">
                              <Image
                                src={match.awayTeam.crest}
                                alt={match.awayTeam.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                            <h3 className="mt-3 font-bold text-sm sm:text-base lg:text-lg">
                              {match.awayTeam.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        {format(matchDate, "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <span className="text-sm sm:text-base">
                          {format(matchDate, "h:mm a")}
                        </span>
                        <span className="text-xs sm:text-sm ml-2 text-muted-foreground">
                          ({formatDistanceToNow(matchDate, { addSuffix: true })})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Trophy className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        Matchday {match.matchday}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Flag className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{match.area.name}</span>
                    </div>
                  </div>

                  {/* Venue Information */}
                  {match.venue && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <span className="text-sm sm:text-base">{match.venue.stadium}</span>
                          {venueInfo?.capacity && (
                            <span className="text-xs sm:text-sm ml-2">
                              (Capacity: {venueInfo.capacity.toLocaleString()})
                            </span>
                          )}
                        </div>
                      </div>
                      {venueInfo?.description && (
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                          {venueInfo.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Match Officials */}
                  {match.referees.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">Match Officials</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {match.referees.map((referee) => (
                          <div key={referee.id} className="flex items-center gap-3 text-muted-foreground">
                            <User className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{referee.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Match Statistics */}
                  {match.status === "FINISHED" && match.score && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">Match Statistics</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-secondary p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-muted-foreground">Half-time Score</p>
                          <p className="text-lg sm:text-xl font-bold mt-1">
                            {match.score.halfTime.home} - {match.score.halfTime.away}
                          </p>
                        </div>
                        <div className="bg-secondary p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-muted-foreground">Result</p>
                          <p className="text-lg sm:text-xl font-bold mt-1">
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
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
