import type { PlayerID } from "boardgame.io";

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
}