import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getMatchStatus(match: any) {
  if (match.status === "FINISHED") {
    return {
      label: `${match.score.home} - ${match.score.away}`,
      className: "bg-gray-800 text-white",
    };
  }
  return {
    label: "VS",
    className: "bg-yellow-500 text-black",
  };
}