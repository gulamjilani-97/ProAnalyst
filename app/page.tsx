"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  Flag,
} from "lucide-react";
import Image from "next/image";
import { formatDate, formatTime } from "@/lib/utils";
import MatchCarousel from "@/components/home/matchCarousel";
import LatestResults from "@/components/home/latestResults";
import { matchService } from "@/services/matchService";
import { Match } from "@/components/types/match";

export default function HomePage() {
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  const loadRecentMatches = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const recent = await matchService.getRecentMatches();
      setRecentMatches(recent);
      setFilteredMatches(recent);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setRecentMatches([]);
      setFilteredMatches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const upcoming = await matchService.getUpcomingMatches();
        setUpcomingMatches(upcoming);
        if (upcoming.length > 0) {
          setSelectedMatch(upcoming[0]);
        }
      } catch (err) {
        console.error("Error fetching upcoming matches:", err);
      }

      await loadRecentMatches();
    };

    fetchAll();
  }, [loadRecentMatches]);

  // ────────────────────────────────────────────────────────────
  // PAGE-SCOPED OVERLAYS
  // ────────────────────────────────────────────────────────────

  // 1) Loading
  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-10 bg-background/90 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Loading recent matches...
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Fetching latest match results
          </p>
        </div>
      </div>
    );
  }

  // 2) Error
  if (error && recentMatches.length === 0) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-10 bg-destructive/10 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-xl font-semibold text-destructive mb-2">
            Failed to Load Results
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            {error}
          </p>
          <button
            onClick={loadRecentMatches}
            className="px-4 py-2 bg-card hover:bg-secondary/80 text-card-foreground rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 3) Empty
  if (!loading && filteredMatches.length === 0) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-10 bg-background/90 flex flex-col items-center justify-center">
          <Flag className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            No Matches Found
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Try adjusting your filters or search term.
          </p>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────
  // MAIN CONTENT (wrapped in a relative container)
  // ────────────────────────────────────────────────────────────

  return (
    <div className="relative">
      <main className="min-h-screen bg-background">
        {/* Hero Carousel */}
        <MatchCarousel matches={upcomingMatches} />

        {/* Next Match & Latest Matches */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-1 gap-12">
            {/* Next Match */}
            {selectedMatch && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center text-[#e0ff4f]">
                  <Calendar className="w-6 h-6 mr-2 text-[#b6d841]}" />
                  Next Match
                </h2>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00272b] via-[#00272b]/70 to-transparent p-8 flex flex-col justify-end text-[#e0ff4f]">
                    <div className="flex items-center gap-2 text-xl mb-6">
                      <Calendar className="w-5 h-5" />
                      <span>{formatDate(selectedMatch.utcDate)}</span>
                      <Clock className="w-5 h-5 ml-4" />
                      <span>{formatTime(selectedMatch.utcDate)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#1c403f] rounded-full overflow-hidden">
                          <Image
                            src={selectedMatch.homeTeam.crest}
                            alt={selectedMatch.homeTeam.name}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xl font-bold">
                          {selectedMatch.homeTeam.shortName}
                        </span>
                      </div>
                      <div className="text-3xl font-bold px-6 py-2 rounded-full bg-[#1c403f]/80 backdrop-blur-sm">
                        VS
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold">
                          {selectedMatch.awayTeam.shortName}
                        </span>
                        <div className="w-16 h-16 bg-[#1c403f] rounded-full overflow-hidden">
                          <Image
                            src={selectedMatch.awayTeam.crest}
                            alt={selectedMatch.awayTeam.name}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Latest Matches */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-[#e0ff4f]">
                <Clock className="w-6 h-6 mr-2 text-[#b6d841]}" />
                Latest Results
              </h2>
              <LatestResults matches={filteredMatches} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-[#00272b] text-[#e0ff4f] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">About Us</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-[#b6d841] mb-12 text-center leading-relaxed">
                Welcome to Pro Analyst, where we combine the passion for football with the power of
                artificial intelligence. Our mission is to revolutionize the way football is analyzed,
                understood, and experienced by everyone—from coaches and analysts to players and fans.
              </p>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-[#1c403f] p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-[#e0ff4f] text-3xl font-bold mb-4">" "</div>
                  <p className="text-xl text-[#b6d841]">
                    Where AI Meets the Beautiful Game.
                  </p>
                </div>
                <div className="bg-[#1c403f] p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-[#e0ff4f] text-3xl font-bold mb-4">" "</div>
                  <p className="text-xl text-[#b6d841]">
                    Analyze. Optimize. Dominate the Field.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
