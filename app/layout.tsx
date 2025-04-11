"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { newsService, NewsArticle } from "@/services/newsService";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Pro Analyst - Football Analysis Platform",
  description: "Advanced football analysis powered by AI",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [newsItems, setNewsItems] = useState<string[]>([]);
  const [currentNews, setCurrentNews] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Fetch news articles when the component mounts
  useEffect(() => {
    async function fetchNews() {
      try {
        const articles: NewsArticle[] = await newsService.fetchPremierLeagueNews();
        const titles = articles.map((article) => article.title || "No title");
        setNewsItems(titles);
      } catch (error) {
        console.error("Failed to fetch news in RootLayout:", error);
      }
    }
    fetchNews();
  }, []);

  // Cycle through news items every 4 seconds
  useEffect(() => {
    if (newsItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [newsItems]);

  // Toggle mobile navigation menu
  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  // Navigation items
  const navItems = [
    ["Home", "/"],
    ["Matches", "/match"],
    ["Team", "/team"],
    ["Starting XI", "/lineup"],
    ["League Standing", "/league-standing"],
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        {/* Header */}
        <header className="sticky top-0 bg-background text-foreground shadow-md z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-extrabold tracking-wide"
              >
                <img src="/favicon.ico" alt="Pro Analyst Logo" className="w-8 h-8" />
                Pro Analyst
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex gap-6 text-sm font-medium">
                  {navItems.map(([name, href]) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-primary transition-colors">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Hamburger Button */}
              <button
                className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={toggleMobileNav}
                aria-label="Toggle Mobile Navigation"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {mobileNavOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileNavOpen && (
              <nav className="md:hidden">
                <ul className="flex flex-col gap-4 py-4">
                  {navItems.map(([name, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block hover:text-primary transition-colors"
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content with extra bottom padding */}
        <main className="pb-16 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="pb-16 bg-background text-foreground py-12 border-t border-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Pro Analyst</h3>
                <p className="text-muted-foreground text-sm">
                  "Your Game, Your Data, Your Victory."
                </p>
              </div>
              {/* Additional footer columns can be added here */}
            </div>
            <div className="mt-8 text-center text-muted-foreground text-xs">
              &copy; 2024 Pro Analyst. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Breaking News Ticker */}
        <div className="bg-[#00272b] text-[#e0ff4f] py-4 fixed bottom-0 w-full z-[50]">
          <div className="container mx-auto px-4">
            <div className="flex items-center overflow-hidden">
              <div className="font-bold bg-[#00272b] text-[#e0ff4f] mr-6 whitespace-nowrap">
                BREAKING NEWS
              </div>
              <div className="text-[#b6d841] whitespace-nowrap animate-slide">
                {newsItems.length > 0
                  ? newsItems[currentNews]
                  : "Loading latest news..."}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
