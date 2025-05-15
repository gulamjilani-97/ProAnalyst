"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Clock,
  Calendar,
  MapPin,
  Loader2,
  AlertCircle,
  Flag,
} from "lucide-react";
import { format, subDays, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import Image from "next/image";
import { motion } from "framer-motion";
import { MatchModal } from "./matchModal";
import { matchService, getVenueInfo, VenueInfo } from "@/services/matchService";
import type { Match } from "@/components/types/match";

type TimeFrame = "all" | "24h" | "week" | "month";

export function LatestResults() {
  // Data & UI state
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<string>("all");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("all");

  // Venue background
  const [venueBackgroundImage, setVenueBackgroundImage] = useState<string | null>(null);

  // Fetch recent matches
  const loadMatches = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await matchService.getRecentMatches();
      setMatches(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load recent matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  // Build venue list
  const venues = ["all", ...Array.from(new Set(matches.map(m => m.venue?.stadium).filter(Boolean)))];

  // Fetch venue info
  useEffect(() => {
    if (selectedVenue !== "all") {
      getVenueInfo(selectedVenue).then(info => {
        setVenueBackgroundImage(info?.image || null);
      });
    } else {
      setVenueBackgroundImage(null);
    }
  }, [selectedVenue]);

  // Time‐frame helper
  const isWithinTimeFrame = (date: Date, tf: TimeFrame) => {
    if (tf === "all") return true;
    const now = new Date();
    const intervals: Record<TimeFrame, { start: Date; end: Date }> = {
      all: { start: now, end: now },
      "24h": { start: subDays(now, 1), end: now },
      week: { start: subDays(now, 7), end: now },
      month: { start: subDays(now, 30), end: now },
    };
    const { start, end } = intervals[tf];
    return isWithinInterval(date, {
      start: startOfDay(start),
      end: endOfDay(end),
    });
  };

  // Apply filters
  useEffect(() => {
    const fm = matches.filter((match) => {
      const m = match;
      const bySearch =
        m.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase());
      const byVenue = selectedVenue === "all" || m.venue?.stadium === selectedVenue;
      const byTime = isWithinTimeFrame(new Date(m.utcDate), selectedTimeFrame);
      return bySearch && byVenue && byTime;
    });
    setFilteredMatches(fm);
  }, [matches, searchTerm, selectedVenue, selectedTimeFrame]);

  // Modal handler
  const handleMatchClick = async (match: Match) => {
    try {
      setModalLoading(true);
      const detail = await matchService.getMatchDetails(match.id);
      setSelectedMatch(detail);
    } catch (err) {
      console.error(err);
      setError("Failed to load match details");
    } finally {
      setModalLoading(false);
    }
  };

  // ---- State Cards ----
  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5 rounded-lg">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          Loading recent matches...
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Fetching latest match results
        </p>
      </div>
    );
  }

  if (error && matches.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-destructive/5 rounded-lg">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-xl font-semibold text-destructive mb-2">
          Failed to Load Results
        </h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {error}
        </p>
        <button
          onClick={loadMatches}
          className="px-4 py-2 bg-card hover:bg-secondary/80 text-card-foreground rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredMatches.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5 rounded-lg">
        <Flag className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          No Matches Found
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  // ---- Main UI ----
  return (
    <>
      <section className="py-20 bg-secondary relative">
        {venueBackgroundImage && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={venueBackgroundImage}
              alt={selectedVenue}
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          {/* Header + Filters */}
          


          {/* Matches Grid */}
          <div className="grid gap-6">
            {filteredMatches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative bg-card rounded-lg p-6 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
                onClick={() => handleMatchClick(match)}
              >
                {/* Date & Time */}
                <div className="absolute top-4 right-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(match.utcDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(match.utcDate), "h:mm a")}</span>
                  </div>
                </div>

                {/* Teams & Score */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-6">
                  {/* Home */}
                  <div className="flex items-center gap-4 flex-1 justify-center sm:justify-start">
                    <div className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-lg">{match.homeTeam.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {match.homeTeam.shortName}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-center px-6 py-3 bg-secondary rounded-xl">
                    <div className="text-2xl font-bold">
                      {match.score.fullTime.home} - {match.score.fullTime.away}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {match.score.halfTime.home} - {match.score.halfTime.away}
                    </div>
                  </div>

                  {/* Away */}
                  <div className="flex items-center gap-4 flex-1 justify-center sm:justify-end">
                    <div className="text-center sm:text-right">
                      <div className="font-bold text-lg">{match.awayTeam.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {match.awayTeam.shortName}
                      </div>
                    </div>
                    <div className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Venue */}
                {match.venue && (
                  <div className="mt-4 text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{match.venue.stadium}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Loading Overlay */}
      {modalLoading && (
        <div className="fixed inset-0 bg-secondary/5 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading match details...
          </p>
        </div>
      )}

      {/* Match Modal */}
      {selectedMatch && !modalLoading && (
        <MatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          error={error}
          loading={false}
        />
      )}
    </>
  );
}
