'use client';

import { Player, Formation } from '@/components/types/lineup';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPlayerImage } from '@/lib/api';
import { formations } from '@/lib/formation';
import { motion } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowsSize';

interface Props {
  players: Player[];
  teamName: string;
}

export default function LineupDisplay({ players, teamName }: Props) {
  const [playersWithImages, setPlayersWithImages] = useState<(Player & { image: string | null })[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<string>('4-3-3');
  const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
  const { width } = useWindowSize();

  // Responsive sizes for player circles
  const getPlayerSize = () => {
    if (width < 640) return 32; // sm
    if (width < 768) return 36; // md
    if (width < 1024) return 40; // lg
    return 48; // xl and above
  };

  const playerSize = getPlayerSize();

  useEffect(() => {
    const fetchPlayerImages = async () => {
      const updatedPlayers = await Promise.all(
        players.map(async (player) => {
          const image = await getPlayerImage(player.name);
          return { ...player, image };
        })
      );
      setPlayersWithImages(updatedPlayers);
    };

    fetchPlayerImages();
  }, [players]);

  const getDefaultPositionStyle = (position: string, formation: Formation) => {
    const positionMap: { [key: string]: string } = {
      GK: 'GK',
      RB: 'RB',
      CB: 'CB1',
      LB: 'LB',
      CDM: 'CM1',
      CM: 'CM2',
      CAM: 'CM3',
      RW: 'RW',
      LW: 'LW',
      ST: 'ST',
    };

    const mappedPosition = positionMap[position] || position;
    const pos = formation.positions[mappedPosition];

    return pos
      ? {
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }
      : {};
  };

  // Compute positions for numeric format formations (e.g. "4-3-3")
  const formationPattern = /^\d+-\d+-\d+$/;
  let customPositions = new Map<string, { left: string; top: string }>();
  if (formationPattern.test(selectedFormation)) {
    const goalkeeper = playersWithImages.find((p) => p.position === 'GK');
    const outfieldPlayers = playersWithImages.filter((p) => p.position !== 'GK');

    const [line1Count, line2Count, line3Count] = selectedFormation.split('-').map(Number);

    const lineYs = [25, 50, 70];
    let startIndex = 0;
    const leftOffset = 3.6;
    [line1Count, line2Count, line3Count].forEach((count, lineIndex) => {
      const y = lineYs[lineIndex];
      for (let i = 0; i < count; i++) {
        const computedLeft = ((i + 1) * 100) / (count + 1);
        const left = computedLeft - leftOffset;
        const player = outfieldPlayers[startIndex + i];
        if (player) {
          customPositions.set(player.name, { left: `${left}%`, top: `${y}%` });
        }
      }
      startIndex += count;
    });

    if (goalkeeper) {
      customPositions.set(goalkeeper.name, { left: '46%', top: '85%' });
    }
  }

  const getPositionStyle = (player: Player) => {
    if (formationPattern.test(selectedFormation)) {
      return customPositions.get(player.name) || {};
    }
    return getDefaultPositionStyle(player.position, formations[selectedFormation]);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h3 className="text-lg sm:text-xl font-bold text-primary">{teamName}</h3>
        {/* <div className="flex flex-wrap gap-2">
          {Object.keys(formations).map((formation) => (
            <button
              key={formation}
              onClick={() => setSelectedFormation(formation)}
              className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedFormation === formation
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
              {formation}
            </button>
          ))}
        </div> */}
      </div>

      <div className="relative aspect-[4/3] bg-[#1a472a] rounded-lg overflow-hidden">
        {/* Field Markings */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 border-2 border-white/50" />
          <div className="absolute inset-x-0 top-1/2 h-0 border-t-2 border-white/50" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] aspect-square border-2 border-white/50 rounded-full" />
          <div className="absolute left-1/2 top-1/2 w-[4px] h-[4px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
          <div className="absolute top-0 left-[18%] w-[64%] h-[18%] border-2 border-white/50" />
          <div className="absolute bottom-0 left-[18%] w-[64%] h-[18%] border-2 border-white/50" />
          <div className="absolute top-0 left-[33%] w-[34%] h-[8.5%] border-2 border-white/50" />
          <div className="absolute bottom-0 left-[33%] w-[34%] h-[8.5%] border-2 border-white/50" />
          <div className="absolute top-[12%] left-1/2 w-[4px] h-[4px] -translate-x-1/2 bg-white rounded-full" />
          <div className="absolute bottom-[12%] left-1/2 w-[4px] h-[4px] -translate-x-1/2 bg-white rounded-full" />
          <div
            className="absolute w-[20%] h-[14%] border-2 border-white/50 rounded-b-full"
            style={{
              top: '17.6%',
              left: '50%',
              transform: 'translateX(-50%)',
              clipPath: 'ellipse(50% 100% at 50% 0%)',
            }}
          />
          <div
            className="absolute w-[20%] h-[14%] border-2 border-white/50 rounded-t-full"
            style={{
              bottom: '17.6%',
              left: '50%',
              transform: 'translateX(-50%)',
              clipPath: 'ellipse(50% 100% at 50% 100%)',
            }}
          />
        </div>

        {/* Players */}
        {playersWithImages.map((player, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={getPositionStyle(player)}
            onMouseEnter={() => setHoveredPlayer(player)}
            onMouseLeave={() => setHoveredPlayer(null)}
          >
            <div className="relative group">
              <div
                className="rounded-full bg-secondary/80 backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ width: `${playerSize}px`, height: `${playerSize}px` }}
              >

                <Image
                  src={player.image}
                  alt={player.name}
                  width={playerSize}
                  height={playerSize}
                  className="rounded-full"
                />

              </div>

              {/* Player Info Tooltip */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max ${hoveredPlayer?.name === player.name ? 'opacity-100' : 'opacity-0'
                  } transition-opacity bg-card/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10`}
              >
                <p className="text-xs sm:text-sm font-semibold text-primary">{player.name}</p>
                <p className="text-xs text-muted-foreground">
                  {player.position} 
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Player List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
        {playersWithImages.map((player, index) => (
          <div
            key={index}
            className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            onMouseEnter={() => setHoveredPlayer(player)}
            onMouseLeave={() => setHoveredPlayer(null)}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              {player.image ? (
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center">
                  {/* <span className="text-xs sm:text-sm font-bold text-primary">#{player.number}</span> */}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-primary">{player.name}</p>
              <p className="text-xs text-muted-foreground">
                {player.position} 
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}