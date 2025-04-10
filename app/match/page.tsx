"use client";

import { HeroSection } from "@/components/match/heroSection";
import { UpcomingMatches } from "@/components/match/upcomingMatches";
import { LatestResults } from "@/components/match/latestResults";
import { mockUpcomingMatches, mockLatestMatches } from "@/data/dummyMatch";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <UpcomingMatches matches={mockUpcomingMatches} />
      <LatestResults matches={mockLatestMatches} />
    </main>
  );
}