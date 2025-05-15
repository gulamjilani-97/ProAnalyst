'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { MatchDetails } from '@/components/types/lineup';

interface Props {
  matches: MatchDetails[];
  selectedMatch: MatchDetails;
  onMatchSelect: (matchId: string) => void;
}

// Utility function to parse and format UTC time
const formatMatchTime = (utcTime: string) => {
  const date = new Date(utcTime); // Parse UTC time
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use user's local timezone
  }).format(date);
};

export default function HeroSection({ matches, selectedMatch, onMatchSelect }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="relative h-auto md:h-[500px] overflow-hidden">
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background to-secondary" />
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"
        style={{ backgroundPosition: '50% 20%' }}
      />

      {/* Main Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-full max-w-4xl px-4 py-12 md:py-0 h-full flex flex-col md:flex-row items-center justify-center"
      >
        {/* Left Section - Match Info */}
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium tracking-wider mb-4"
          >
            {selectedMatch.competition}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {selectedMatch.homeTeam.name}
            </span>
            <span className="text-primary mx-2">vs</span>
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {selectedMatch.awayTeam.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto md:mx-0 mb-8"
          >
            Experience the thrill of Premier League football as these titans clash in what promises 
            to be an unforgettable match at {selectedMatch.venue.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <div className="bg-secondary/80 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-primary font-semibold">{formatMatchTime(selectedMatch.matchTime)}</p>
            </div>
            <div className="bg-secondary/80 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-primary font-semibold">{selectedMatch.venue.name}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Section - Dropdown Button & List */}
        <div className="flex-shrink-0 w-full md:w-auto text-center relative">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center gap-3 bg-secondary/80 backdrop-blur-sm px-6 py-3 rounded-lg text-primary hover:bg-secondary/90 transition-colors"
          >
            <span className="font-medium">Other Matches</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </motion.button>
          
          {isDropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-full md:w-80 bg-card/95 backdrop-blur-sm rounded-lg shadow-xl z-50 border border-border">
              {matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => {
                    onMatchSelect(match.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors ${
                    match.id === selectedMatch.id ? 'bg-secondary/80' : ''
                  } ${match.id === matches[0].id ? 'rounded-t-lg' : ''} ${
                    match.id === matches[matches.length - 1].id ? 'rounded-b-lg' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-primary">{match.competition}</p>
                      <p className="text-sm text-muted-foreground">{formatMatchTime(match.matchTime)}</p>
                    </div>
                    <p className="text-sm font-medium text-primary">
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
