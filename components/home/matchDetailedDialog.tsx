"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Flag,
  User,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import type { Match } from "@/components/types/match";
import { VenueInfo, getVenueInfo } from "@/services/matchService";
import Image from "next/image";

interface MatchDetailsDialogProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  error?: string | null;
}

export default function MatchDetailsDialog({
  match,
  open,
  onOpenChange,
  loading = false,
  error = null,
}: MatchDetailsDialogProps) {
  const [venueInfo, setVenueInfo] = useState<VenueInfo | null>(null);

  useEffect(() => {
    if (!match?.venue?.stadium) {
      setVenueInfo(null);
      return;
    }
    getVenueInfo(match.venue.stadium).then((info) => setVenueInfo(info));
  }, [match?.venue?.stadium]);

  const matchDate = match ? new Date(match.utcDate) : new Date();
  const stadiumImage =
    venueInfo?.image ||
    venueInfo?.fanart?.[0] ||
    "https://images.unsplash.com/photo-1540552965541-cc47d835c36d?w=1920&h=600&fit=crop";

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2"
          >
            <DialogContent className="p-0 max-w-lg w-full sm:max-w-2xl sm:w-11/12 max-h-[90vh] overflow-y-auto">
              {/* Modal Panel */}
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-[#1c403f] rounded-xl shadow-lg overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => onOpenChange(false)}
                  aria-label="Close"
                  className="absolute top-3 right-3 p-1 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 focus:ring-2 focus:ring-[#e0ff4f] z-10"
                >
                  <X className="w-5 h-5 text-[#e0ff4f]" />
                </button>

                {/* Loading / Error */}
                {loading ? (
                  <div className="p-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#e0ff4f]" />
                  </div>
                ) : error ? (
                  <div className="p-8 text-center text-red-500 font-semibold">
                    {error}
                  </div>
                ) : match ? (
                  <>
                    {/* Header / Teams */}
                    <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                      <Image
                        src={stadiumImage}
                        alt={match.venue?.stadium || "Stadium"}
                        fill
                        className="object-cover opacity-20"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1c403f]" />
                      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between h-full px-4 sm:px-6 py-4">
                        {/* Home */}
                        <div className="flex-1 flex flex-col items-center mb-4 sm:mb-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/30 rounded-full p-1 sm:p-2 mb-2 flex items-center justify-center">
                            <Image
                              src={match.homeTeam.crest}
                              alt={match.homeTeam.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                          <p className="text-xs sm:text-sm md:text-base font-bold text-center text-[#e0ff4f] line-clamp-2">
                            {match.homeTeam.name}
                          </p>
                        </div>

                        {/* Score / VS */}
                        <div className="px-3 sm:px-6 py-1 sm:py-2 bg-black/30 rounded-xl text-center mb-4 sm:mb-0">
                          {match.status === "FINISHED" ? (
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e0ff4f]">
                              {match.score.fullTime.home} - {match.score.fullTime.away}
                            </p>
                          ) : (
                            <p className="text-lg sm:text-xl font-bold text-[#e0ff4f]">
                              VS
                            </p>
                          )}
                          <p className="text-[10px] sm:text-xs md:text-sm mt-1 text-[#b6d841]">
                            {match.competition.name}
                          </p>
                        </div>

                        {/* Away */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/30 rounded-full p-1 sm:p-2 mb-2 flex items-center justify-center">
                            <Image
                              src={match.awayTeam.crest}
                              alt={match.awayTeam.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                          <p className="text-xs sm:text-sm md:text-base font-bold text-center text-[#e0ff4f] line-clamp-2">
                            {match.awayTeam.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 sm:p-6 space-y-4 text-[#e0ff4f]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#b6d841]" />
                          <span>{format(matchDate, "EEEE, MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#b6d841]" />
                          <div className="truncate">
                            <span>{format(matchDate, "h:mm a")}</span>
                            <span className="text-xs sm:text-sm ml-1 text-[#b6d841]">
                              ({formatDistanceToNow(matchDate, { addSuffix: true })})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#b6d841]" />
                          <span>Matchday {match.matchday}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-[#b6d841]" />
                          <span>{match.area.name}</span>
                        </div>
                        {match.venue && (
                          <div className="flex items-center gap-2 text-sm sm:text-base sm:col-span-2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#b6d841]" />
                            <span>{match.venue.stadium}</span>
                            {venueInfo?.capacity && (
                              <span className="text-xs sm:text-sm text-[#b6d841] ml-1">
                                (Cap: {venueInfo.capacity.toLocaleString()})
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {venueInfo?.description && (
                        <div className="pt-3 border-t border-[#5a7432]">
                          <h4 className="text-sm sm:text-base font-semibold mb-1">
                            About the Venue
                          </h4>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#b6d841]">
                            {venueInfo.description}
                          </p>
                        </div>
                      )}

                      {match.referees.length > 0 && (
                        <div className="pt-3 border-t border-[#5a7432]">
                          <h4 className="text-sm sm:text-base font-semibold mb-1">
                            Match Officials
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {match.referees.map((ref) => (
                              <div
                                key={ref.name}
                                className="flex items-center gap-2 text-sm sm:text-base text-[#b6d841]"
                              >
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{ref.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {match.status === "FINISHED" && (
                        <div className="pt-3 border-t border-[#5a7432]">
                          <h4 className="text-sm sm:text-base font-semibold mb-1">
                            Match Statistics
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                            <div className="p-2 sm:p-4 bg-black/30 rounded-lg text-sm sm:text-base">
                              <p className="mb-1 text-[#b6d841]">Half-time Score</p>
                              <p className="font-bold">
                                {match.score.halfTime.home} - {match.score.halfTime.away}
                              </p>
                            </div>
                            <div className="p-2 sm:p-4 bg-black/30 rounded-lg text-sm sm:text-base">
                              <p className="mb-1 text-[#b6d841]">Result</p>
                              <p className="font-bold">
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
                ) : null}
              </motion.div>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
