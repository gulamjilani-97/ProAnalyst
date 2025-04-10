"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MatchCard } from "./matchCard";
import { MatchModal } from "./matchModal";
import type { Match } from "@/components/types/match";

interface UpcomingMatchesProps {
  matches: Match[];
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const nextMatch = () => {
    setCurrentMatchIndex((prev) =>
      prev === matches.length - 1 ? 0 : prev + 1
    );
  };

  const prevMatch = () => {
    setCurrentMatchIndex((prev) =>
      prev === 0 ? matches.length - 1 : prev - 1
    );
  };

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold"
            >
              Next Matches
            </motion.h2>
            <div className="flex gap-2">
              <button
                onClick={prevMatch}
                className="bg-card hover:bg-card/80 p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextMatch}
                className="bg-card hover:bg-card/80 p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMatchIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative"
            >
              <MatchCard 
                match={matches[currentMatchIndex]} 
                onClick={() => setSelectedMatch(matches[currentMatchIndex])}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <MatchModal 
        match={selectedMatch} 
        onClose={() => setSelectedMatch(null)} 
      />
    </>
  );
}