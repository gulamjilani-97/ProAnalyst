import { Trophy, Star, Users, TrendingUp, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Title Section with Animated Border */}
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
                Premier League
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient"></div>
              </h1>
              <span className="block text-card-foreground text-xl md:text-2xl mt-2 font-normal">
                2024/25 Season Statistics
              </span>
            </div>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mt-6">
              Dive into comprehensive statistics, player performances, and team analytics from the world's most exciting football league.
            </p>


            {/* Stats Grid with Hover Effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="group bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/40 transition-all hover:border-primary/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-card-foreground font-medium">Teams</span>
                </div>
                <p className="text-3xl font-bold text-primary">20</p>
                <div className="h-1 w-12 bg-primary/30 mt-3 group-hover:w-16 transition-all"></div>
              </div>

              <div className="group bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/40 transition-all hover:border-primary/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-card-foreground font-medium">Players</span>
                </div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <div className="h-1 w-12 bg-primary/30 mt-3 group-hover:w-16 transition-all"></div>
              </div>

              <div className="group bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/40 transition-all hover:border-primary/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-card-foreground font-medium">Matches</span>
                </div>
                <p className="text-3xl font-bold text-primary">380</p>
                <div className="h-1 w-12 bg-primary/30 mt-3 group-hover:w-16 transition-all"></div>
              </div>

              <div className="group bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/40 transition-all hover:border-primary/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-card-foreground font-medium">Stats</span>
                </div>
                <p className="text-3xl font-bold text-primary">1000+</p>
                <div className="h-1 w-12 bg-primary/30 mt-3 group-hover:w-16 transition-all"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/50 via-accent/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}