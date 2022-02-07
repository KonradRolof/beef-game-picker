import axios from 'axios';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import Game from '../interfaces/Game.interface';

type CsvData = {
  title: string;
  genre: string;
  platform: string;
  players: number;
  multiDeviceNeeded: string;
}

export default function useGames(url: string): Game[] {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
      axios.get(url)
        .then((response) => {
          const data = response.data as CsvData[];
          const gameData: Game[] = data.map((item, index: number) => {
            return {
              title: item.title,
              genre: item.genre,
              platform: item.platform.split(',').map((entry) => {
                if ('' === entry) return 'not defined';
                return entry.trim();}),
              players: item.players,
              multiDeviceNeeded: item.multiDeviceNeeded === "TRUE",
              isActive: true,
              id: index,
              slug: slugify(item.title, {
                lower: true,
                strict: true,
              }),
            } as Game;
          });
          setGames(gameData);
        })
        .catch((error) => console.error(error));
  }, [url]);

  return games;
}
