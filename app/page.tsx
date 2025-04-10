"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { matches, latestResults, upcomingMatch, newsItems } from "@/lib/mock-data";
import { formatDate, formatTime, getMatchStatus } from "@/lib/utils";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Slider */}
      <div className="relative h-[600px] bg-[#00272b]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540552965541-cc47d835c36d?w=1920&h=600&fit=crop"
            alt="Stadium"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-[#e0ff4f]">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? matches.length - 1 : prev - 1))}
            className="absolute left-4 p-3 bg-[#1c403f] rounded-full hover:bg-[#5a7432] transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-lg mb-6 text-[#b6d841]">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(matches[currentSlide].date)}</span>
              <Clock className="w-5 h-5 ml-4" />
              <span>{formatTime(matches[currentSlide].date)}</span>
              <MapPin className="w-5 h-5 ml-4" />
              <span>{matches[currentSlide].venue}</span>
            </div>
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#1c403f] rounded-full mb-4 mx-auto overflow-hidden">
                  <Image
                    src={matches[currentSlide].homeTeam.logo}
                    alt={matches[currentSlide].homeTeam.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <span className="text-2xl font-bold">{matches[currentSlide].homeTeam.name}</span>
              </div>
              
              <div className="text-center px-8 py-4 rounded-xl bg-[#1c403f]/80 backdrop-blur-sm">
                {matches[currentSlide].status === "FINISHED" ? (
                  <div className="text-6xl font-bold text-[#e0ff4f]">
                    {matches[currentSlide].score?.home} - {matches[currentSlide].score?.away}
                  </div>
                ) : (
                  <div className="text-4xl font-bold">VS</div>
                )}
                <div className="text-sm mt-2 text-[#b6d841]">{matches[currentSlide].competition}</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#1c403f] rounded-full mb-4 mx-auto overflow-hidden">
                  <Image
                    src={matches[currentSlide].awayTeam.logo}
                    alt={matches[currentSlide].awayTeam.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <span className="text-2xl font-bold">{matches[currentSlide].awayTeam.name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev === matches.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 p-3 bg-[#1c403f] rounded-full hover:bg-[#5a7432] transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Next Match & Latest Matches */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Next Match */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-[#e0ff4f]">
              <Calendar className="w-6 h-6 mr-2 text-[#b6d841]" />
              Next Match
            </h2>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop"
                alt="Next match"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00272b] via-[#00272b]/70 to-transparent p-8 flex flex-col justify-end text-[#e0ff4f]">
                <div className="flex items-center gap-2 text-[#b6d841] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{upcomingMatch.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-xl mb-6">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(upcomingMatch.date)}</span>
                  <Clock className="w-5 h-5 ml-4" />
                  <span>{formatTime(upcomingMatch.date)}</span>
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1c403f] rounded-full overflow-hidden">
                      <Image
                        src={upcomingMatch.homeTeam.logo}
                        alt={upcomingMatch.homeTeam.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xl font-bold">{upcomingMatch.homeTeam.name}</span>
                  </div>
                  <div className="text-3xl font-bold px-6 py-2 rounded-full bg-[#1c403f]/80 backdrop-blur-sm">
                    VS
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">{upcomingMatch.awayTeam.name}</span>
                    <div className="w-16 h-16 bg-[#1c403f] rounded-full overflow-hidden">
                      <Image
                        src={upcomingMatch.awayTeam.logo}
                        alt={upcomingMatch.awayTeam.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <button className="bg-[#5a7432] text-[#e0ff4f] font-bold py-3 px-6 rounded-full hover:bg-[#b6d841] hover:text-[#00272b] transition-colors w-full text-center">
                  MATCH DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* Latest Matches */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-[#e0ff4f]">
              <Clock className="w-6 h-6 mr-2 text-[#b6d841]" />
              Latest Results
            </h2>
            <div className="space-y-4">
              {latestResults.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#1c403f] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#e0ff4f] bg-[#5a7432] px-3 py-1 rounded-full">
                      {match.competition}
                    </span>
                    <span className="text-sm text-[#b6d841]">{formatDate(match.date)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00272b]">
                        <Image
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold text-[#e0ff4f]">{match.homeTeam.name}</span>
                    </div>
                    <div className="px-6 py-2 rounded-lg bg-[#00272b] text-[#e0ff4f] font-bold">
                      {match.score.home} - {match.score.away}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-[#e0ff4f]">{match.awayTeam.name}</span>
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00272b]">
                        <Image
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              <div className="bg-[#1c403f] p-8 rounded-2xl text-center">
                <div className="text-[#e0ff4f] text-3xl font-bold mb-4">" "</div>
                <p className="text-xl text-[#b6d841]">Where AI Meets the Beautiful Game.</p>
              </div>
              <div className="bg-[#1c403f] p-8 rounded-2xl text-center">
                <div className="text-[#e0ff4f] text-3xl font-bold mb-4">" "</div>
                <p className="text-xl text-[#b6d841]">Analyze. Optimize. Dominate the Field.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking News */}
      <div className="bg-[#00272b] text-[#e0ff4f] py-4 fixed bottom-0 w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="font-bold text-[#e0ff4f] mr-8 whitespace-nowrap">BREAKING NEWS</div>
            <div className="text-[#b6d841] overflow-hidden">
              <div className="animate-slide whitespace-nowrap">
                {newsItems[currentNews]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}