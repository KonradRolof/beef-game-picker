import axios from 'axios';
import { useEffect, useState } from 'react';
import Game from '../interfaces/Game.interface';

export default function useGames(url: string): Game[] {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
      axios.get(url)
        .then((response) => {
          setGames(response.data as Game[]);
        })
        .catch((error) => console.error(error));
  }, [url]);

  return games;
}
