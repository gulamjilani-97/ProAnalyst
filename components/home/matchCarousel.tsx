"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { formatDate, formatTime } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Match } from "@/components/types/match";

interface MatchCarouselProps {
  matches: Match[];
}

export default function MatchCarousel({ matches }: MatchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!matches.length) return null;

  const currentMatch = matches[currentIndex];

  const nextMatch = () =>
    setCurrentIndex((prev) =>
      prev === matches.length - 1 ? 0 : prev + 1
    );
  const prevMatch = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? matches.length - 1 : prev - 1
    );

  return (
    <section className="relative min-h-[600px] bg-[#00272b] py-16 overflow-hidden">
      <div className="relative container mx-auto px-4">
        {/* Header & Mobile Navigation (small/medium screens) */}
        <div className="flex items-center justify-between mb-12">
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
        </div>

        {/* Carousel Card */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMatch.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl mx-auto rounded-3xl p-10 backdrop-blur-xl border border-border bg-secondary/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              {/* Date, Time and Venue */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-8 text-sm sm:text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {formatDate(currentMatch.utcDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {formatTime(currentMatch.utcDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {currentMatch.venue?.stadium || "Venue TBA"}
                  </span>
                </div>
              </div>

              {/* Teams and VS */}
              <div className="grid grid-cols-3 items-center gap-4">
                {/* Home Team */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-background rounded-full p-4 border border-border backdrop-blur-xl flex items-center justify-center mb-4 hover:scale-105 transition-transform">
                    <Image
                      src={currentMatch.homeTeam.crest}
                      alt={currentMatch.homeTeam.name}
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground line-clamp-2">
                    {currentMatch.homeTeam.name}
                  </h3>
                </div>

                {/* VS Indicator */}
                <div className="flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                    VS
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-background rounded-full p-4 border border-border backdrop-blur-xl flex items-center justify-center mb-4 hover:scale-105 transition-transform">
                    <Image
                      src={currentMatch.awayTeam.crest}
                      alt={currentMatch.awayTeam.name}
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground line-clamp-2">
                    {currentMatch.awayTeam.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation Arrows (visible on medium and larger screens) */}
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
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "scale-125 bg-primary"
                  : "bg-muted-foreground/50 hover:scale-110"
              }`}
              aria-label={`Go to match ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
