import Game from '../interfaces/Game.interface';

export default function sortGames(games: Game[]): Game[] {
  return games.sort((a, b) => a.title.localeCompare(b.title));
}
