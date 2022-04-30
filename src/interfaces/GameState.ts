import type { PlayerID } from 'boardgame.io';
import { PlayerCard } from './PlayerCard';
export interface GameState {
  currentRound: number;
  currentRoundStitchesCount: {
    [key: PlayerID]: number;
  };
  expectedStitchesCount: {
    [key: PlayerID]: number | null;
  };
  numberOfRounds: number;
  points: {
    [key: PlayerID]: number;
  };
  playerHands: {
    [key: PlayerID]: PlayerCard[];
  };
  triumphCard: PlayerCard | null;
}
