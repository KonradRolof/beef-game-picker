export default interface Game {
  id: number;
  title: string;
  genre: string;
  isActive: boolean;
  multiDeviceNeeded: boolean;
  platform: string[];
  players: number;
  slug: string;
} // eslint-disable-line
