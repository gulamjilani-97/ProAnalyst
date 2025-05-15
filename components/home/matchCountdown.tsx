"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function MatchCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="bg-[#1c403f]/80 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl font-bold text-[#e0ff4f]">{timeLeft.days}</div>
        <div className="text-sm text-[#b6d841]">Days</div>
      </div>
      <div className="bg-[#1c403f]/80 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl font-bold text-[#e0ff4f]">{timeLeft.hours}</div>
        <div className="text-sm text-[#b6d841]">Hours</div>
      </div>
      <div className="bg-[#1c403f]/80 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl font-bold text-[#e0ff4f]">{timeLeft.minutes}</div>
        <div className="text-sm text-[#b6d841]">Minutes</div>
      </div>
      <div className="bg-[#1c403f]/80 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl font-bold text-[#e0ff4f]">{timeLeft.seconds}</div>
        <div className="text-sm text-[#b6d841]">Seconds</div>
      </div>
    </div>
  );
}