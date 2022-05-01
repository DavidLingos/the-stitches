import type { PlayerID } from 'boardgame.io';
import { PlayerCard } from './PlayerCard';
export interface GameState {
  numberOfRounds: number;
  currentRound: number;
  points: {
    [key: PlayerID]: number;
  }[];
  expectedStitchesCount: {
    [key: PlayerID]: number | null;
  };
  currentRoundStitchesCount: {
    [key: PlayerID]: number;
  };
  currentStitchCards: {
    [key: PlayerID]: PlayerCard | null;
  };
  playerHands: {
    [key: PlayerID]: PlayerCard[];
  };
  triumphCard: PlayerCard | null;
  stitchStartPlayer: PlayerID | null;
}
