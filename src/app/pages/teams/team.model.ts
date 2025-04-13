import { Player } from '../players/player.model';

export interface Team {
  name: string;
  founded: number;
  players: Player[];
  imageUrl: string;
}

