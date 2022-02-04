import axios from 'axios';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import Game from '../interfaces/Game.interface';

export default function useGames(url: string): Game[] {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
      axios.get(url)
        .then((response) => {
          const data = response.data;
          const gameData = data.map((item: any, index: number) => {
            item.isActive = true;
            item.id = index;
            item.slug = slugify(item.name, {
              lower: true,
              strict: true,
            });
            return item as Game;
          });
          setGames(gameData);
        })
        .catch((error) => console.error(error));
  }, [url]);

  return games;
}
