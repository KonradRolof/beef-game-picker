import Platform from "./Platform.interface";

export default interface Game {
  id: number;
  title: string;
  genre: string;
  isActive: boolean;
  multiDeviceNeeded: boolean;
  platforms: Platform[];
  players: number;
  slug: string;
} // eslint-disable-line
