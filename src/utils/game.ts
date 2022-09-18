import { Ctx } from 'boardgame.io';
import { GameState } from '../interfaces';

export const getPlayerWithMaxReportedStitches = (G: GameState, ctx: Ctx) => {
  const firstReportPlayer = G.currentRound % ctx.numPlayers;
  let maxPlayerId = null;
  for (let i = firstReportPlayer; i < ctx.numPlayers + firstReportPlayer; i++) {
    const player = ctx.playOrder[i % ctx.numPlayers];
    if (maxPlayerId === null || (G.expectedStitchesCount[player] ?? 0) >= (G.expectedStitchesCount[maxPlayerId] ?? 0)) {
      maxPlayerId = player;
    }
  }
  return maxPlayerId;
};
