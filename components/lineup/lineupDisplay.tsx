'use client';

import { Player } from '@/components/types/lineup';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPlayerImage } from '@/lib/api';

interface Props {
  players: Player[];
  teamName: string;
}

export default function LineupDisplay({ players, teamName }: Props) {
  const [playersWithImages, setPlayersWithImages] = useState<(Player & { image: string | undefined })[]>([]);

  useEffect(() => {
    const fetchPlayerImages = async () => {
        const updatedPlayers = await Promise.all(
          players.map(async (player) => {
            const image = await getPlayerImage(player.name);
            return { ...player, image: image === null ? undefined : image };
          })
        );
        setPlayersWithImages(updatedPlayers);
      };
      

    fetchPlayerImages();
  }, [players]);

  return (
    <div className="bg-card rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6 text-primary">{teamName}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playersWithImages.map((player, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-2">
              {player.image ? (
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                  <span className="text-3xl text-muted-foreground">{player.number}</span>
                </div>
              )}
            </div>
            <h4 className="font-semibold text-card-foreground">{player.name}</h4>
            <p className="text-sm text-muted-foreground">{player.position}</p>
            <span className="text-sm font-bold text-primary">#{player.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
}