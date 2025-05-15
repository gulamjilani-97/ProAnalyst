import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  AlertCircle,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import type { Match } from "@/components/types/match";
import { matchService } from "@/services/matchService";
import { MatchModal } from "./matchModal";

export function UpcomingMatches() {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  const loadMatches = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await matchService.getUpcomingMatches();
      setMatches(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load upcoming matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const nextMatch = () =>
    setCurrentMatchIndex((prev) =>
      prev === matches.length - 1 ? 0 : prev + 1
    );
  const prevMatch = () =>
    setCurrentMatchIndex((prev) =>
      prev === 0 ? matches.length - 1 : prev - 1
    );

  const handleMatchClick = async (match: Match) => {
    try {
      setModalLoading(true);
      const detailed = await matchService.getMatchDetails(match.id);
      setSelectedMatch(detailed);
    } catch (err) {
      console.error(err);
      setError("Failed to load match details");
    } finally {
      setModalLoading(false);
    }
  };

  // ---- States ----

  // Initial loading
  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5 rounded-lg">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          Loading upcoming matches...
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Fetching match schedule and venues
        </p>
      </div>
    );
  }

  // Error on initial load
  if (error && matches.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-destructive/5 rounded-lg">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-xl font-semibold text-destructive mb-2">
          Failed to Load Matches
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

  // No upcoming matches
  if (matches.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px] bg-secondary/5 rounded-lg">
        <Flag className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          No Upcoming Matches
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          There are no matches scheduled at the moment.
        </p>
      </div>
    );
  }

  const currentMatch = matches[currentMatchIndex];

  // ---- Main Carousel ----

  return (
    <>
      <section className="relative min-h-[600px] bg-background py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.15),transparent_70%)]" />

        <div className="relative container mx-auto px-4">
          {/* Header + small-screen arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Upcoming Matches
            </h2>
            <div className="flex gap-2 sm:hidden">
              <button
                onClick={prevMatch}
                className="p-2 bg-secondary/50 hover:bg-secondary rounded-full border border-border backdrop-blur-xl transition-transform hover:scale-110"
                aria-label="Previous match"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={nextMatch}
                className="p-2 bg-secondary/50 hover:bg-secondary rounded-full border border-border backdrop-blur-xl transition-transform hover:scale-110"
                aria-label="Next match"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </motion.div>

          {/* Carousel Card */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                onClick={() => handleMatchClick(currentMatch)}
                key={currentMatch.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl mx-auto rounded-3xl p-10 backdrop-blur-xl border border-border bg-secondary/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                {/* Date / Time / Venue */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-8 text-sm sm:text-base text-muted-foreground">
                  <div className="flex items-center gap-4">
                    
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {currentMatch.venue?.stadium || "Venue TBA"}
                    </span>
                    {currentMatch.venue?.location && (
                      <span className="text-muted-foreground">
                        , {currentMatch.venue.location}
                      </span>
                    )}
                  </div>
                </div>


                {/* Teams + VS */}
                <div className="grid grid-cols-3 items-center gap-4">
                  {/* Home Team */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-background rounded-full p-4 border border-border backdrop-blur-xl flex items-center justify-center mb-4 hover:scale-105 transition-transform">
                      <img
                        src={currentMatch.homeTeam.crest}
                        alt={currentMatch.homeTeam.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-foreground line-clamp-2">
                      {currentMatch.homeTeam.name}
                    </h3>
                  </div>

                  {/* VS */}
                  <div className="flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                      VS
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-background rounded-full p-4 border border-border backdrop-blur-xl flex items-center justify-center mb-4 hover:scale-105 transition-transform">
                      <img
                        src={currentMatch.awayTeam.crest}
                        alt={currentMatch.awayTeam.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-foreground line-clamp-2">
                      {currentMatch.awayTeam.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Large-screen arrows */}
            <div className="hidden sm:flex absolute inset-y-0 items-center justify-between w-full px-4">
              <button
                onClick={prevMatch}
                className="p-3 bg-secondary/50 hover:bg-secondary rounded-full border border-border backdrop-blur-xl transition-all duration-300 hover:scale-110"
                aria-label="Previous match"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              <button
                onClick={nextMatch}
                className="p-3 bg-secondary/50 hover:bg-secondary rounded-full border border-border backdrop-blur-xl transition-all duration-300 hover:scale-110"
                aria-label="Next match"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {matches.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentMatchIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentMatchIndex
                    ? "scale-125 bg-primary"
                    : "bg-muted-foreground/50 hover:scale-110"
                  }`}
                aria-label={`Go to match ${idx + 1}`}
              />
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
