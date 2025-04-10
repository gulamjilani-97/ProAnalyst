"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MatchCard } from "./matchCard";
import { MatchModal } from "./matchModal";
import type { Match } from "@/components/types/match";

interface LatestResultsProps {
  matches: Match[];
}

export function LatestResults({ matches }: LatestResultsProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  return (
    <>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-12"
          >
            Latest Results
          </motion.h2>
          <div className="grid gap-6">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MatchCard 
                  match={match}
                  onClick={() => setSelectedMatch(match)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MatchModal 
        match={selectedMatch} 
        onClose={() => setSelectedMatch(null)} 
      />
    </>
  );
}