export default interface Game {
  id: number;
  name: string;
  genre: string;
  isActive: boolean;
  multiDeviceNeeded: boolean;
  platform: string;
  players: number;
  slug: string;
} // eslint-disable-line
