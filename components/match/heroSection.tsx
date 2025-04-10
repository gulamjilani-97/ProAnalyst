"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background to-secondary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-4 h-full flex flex-col justify-center"
      >
        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium tracking-wider mb-4">
          PREMIER LEAGUE
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          UPCOMING MATCHES
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Stay updated with the latest Premier League fixtures and results. Follow your favorite teams and never miss a match.
        </p>
      </motion.div>
    </section>
  );
}