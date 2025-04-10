import { Player } from '@/components/types/team';
import { X, Star, Trophy, Activity, Shield, AlertTriangle, Target, Zap, BarChart3, Gauge } from 'lucide-react';

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
}

export default function PlayerModal({ player, onClose }: PlayerModalProps) {
  if (!player) return null;

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-primary';
    if (rating >= 2) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressWidth = (value: number, maxValue: number) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform">
          <div className="relative bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
            {/* Header with player image and basic info */}
            <div className="relative h-48 bg-gradient-to-r from-primary/20 to-accent/20 overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm"></div>
              <div className="relative p-6 flex items-end h-full">
                <div className="flex items-center space-x-6">
                  <img
                    src={player.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random&size=200`}
                    alt={player.name}
                    className="w-32 h-32 rounded-full object-cover bg-secondary border-4 border-card shadow-xl"
                  />
                  <div>
                    <h3 className="text-3xl font-bold text-card-foreground mb-2">{player.name}</h3>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-secondary/80 text-secondary-foreground">
                        {player.position}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className={`w-5 h-5 ${getRatingColor(player.rating)}`} />
                        <span className={`font-bold ${getRatingColor(player.rating)}`}>
                          {player.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-card-foreground/80 hover:text-card-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-6 grid gap-6">
              {/* Match Statistics */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h4 className="text-xl font-semibold text-card-foreground">Match Statistics</h4>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-card-foreground">{player.matches_played}</div>
                    <p className="text-sm text-muted-foreground mt-1">Matches</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-card-foreground">{player.starts}</div>
                    <p className="text-sm text-muted-foreground mt-1">Starts</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-primary">{player.goals}</div>
                    <p className="text-sm text-muted-foreground mt-1">Goals</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-accent">{player.assists}</div>
                    <p className="text-sm text-muted-foreground mt-1">Assists</p>
                  </div>
                </div>
              </div>

              {/* Expected Stats */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h4 className="text-xl font-semibold text-card-foreground">Expected Stats</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">xG (Expected Goals)</span>
                      <span className="text-lg font-bold text-primary">{player.xG.toFixed(1)}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: getProgressWidth(player.xG, 20) }}
                      />
                    </div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">xAG (Expected Assists)</span>
                      <span className="text-lg font-bold text-accent">{player.xAG.toFixed(1)}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: getProgressWidth(player.xAG, 20) }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progressive Stats */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h4 className="text-xl font-semibold text-card-foreground">Progressive Actions</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-card-foreground">{player.progressive_carries}</div>
                        <p className="text-sm text-muted-foreground mt-1">Progressive Carries</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-primary opacity-50" />
                    </div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-card-foreground">{player.progressive_passes}</div>
                        <p className="text-sm text-muted-foreground mt-1">Progressive Passes</p>
                      </div>
                      <Gauge className="w-8 h-8 text-primary opacity-50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Position Specific Stats */}
              {player.position === 'GK' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h4 className="text-xl font-semibold text-card-foreground">Goalkeeper Stats</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-card-foreground">{player.save_percentage}%</div>
                          <p className="text-sm text-muted-foreground mt-1">Save Percentage</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-card-foreground">{player.clean_sheets}</div>
                          <p className="text-sm text-muted-foreground mt-1">Clean Sheets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(player.position === 'DF' || player.position === 'MF') && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h4 className="text-xl font-semibold text-card-foreground">Defensive Contributions</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-card-foreground">{player.tackles_won}</div>
                          <p className="text-sm text-muted-foreground mt-1">Tackles Won</p>
                        </div>
                        <Activity className="w-8 h-8 text-primary opacity-50" />
                      </div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-card-foreground">{player.interceptions}</div>
                          <p className="text-sm text-muted-foreground mt-1">Interceptions</p>
                        </div>
                        <Shield className="w-8 h-8 text-primary opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Disciplinary Record */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <h4 className="text-xl font-semibold text-card-foreground">Disciplinary Record</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-500/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-yellow-500">{player.yellow_cards}</div>
                        <p className="text-sm text-muted-foreground mt-1">Yellow Cards</p>
                      </div>
                      <div className="w-8 h-12 bg-yellow-500/20 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-red-500">{player.red_cards}</div>
                        <p className="text-sm text-muted-foreground mt-1">Red Cards</p>
                      </div>
                      <div className="w-8 h-12 bg-red-500/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}