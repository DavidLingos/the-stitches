import { Ctx, PhaseConfig, PlayerID } from 'boardgame.io';
import { Gameover, GameState } from '../../../../interfaces';
import { getPlayerWithMaxReportedStitches } from '../../../../utils/game';
import moves from './moves';

const evaluateCurrentRound = (G: GameState, ctx: Ctx) => {
  const currentRoundPoints: {
    [key: PlayerID]: number;
  } = {};
  ctx.playOrder.forEach((player) => {
    // Add points
    if (G.currentRoundStitchesCount[player] === G.expectedStitchesCount[player]) {
      currentRoundPoints[player] = (G.expectedStitchesCount[player] ?? 0) + 10;
    } else {
      currentRoundPoints[player] = -(G.expectedStitchesCount[player] ?? 0);
    }
    // Reset values
    G.expectedStitchesCount[player] = null;
    G.currentStitchCards[player] = null;
    G.currentRoundStitchesCount[player] = 0;
  });
  G.points.push(currentRoundPoints);
  G.stitchStartPlayer = null;
  if (G.currentRound === G.numberOfRounds) {
    const playerPoints = Object.fromEntries(Object.keys(ctx.playOrder).map((i) => [i, G.points.reduce((n, item) => n + item[i], 0)]));
    const playerResults = Object.keys(playerPoints).sort((a, b) => (playerPoints[a] < playerPoints[b] ? 1 : -1));
    const gameover: Gameover = {
      playerPoints,
      playerResults,
      matchDate: new Date(),
    };
    ctx.events?.endGame(gameover);
  } else {
    G.currentRound++;
  }
};

export const playPhase: PhaseConfig<GameState, Ctx> = {
  moves,
  onBegin: (G, ctx) => {
    const maxPlayerId = getPlayerWithMaxReportedStitches(G, ctx);
    G.stitchStartPlayer = maxPlayerId;
  },
  onEnd: evaluateCurrentRound,
  turn: {
    order: {
      first: (G, ctx) => {
        const maxPlayerId = getPlayerWithMaxReportedStitches(G, ctx);
        return ctx.playOrder.indexOf(maxPlayerId ?? '');
      },
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    },
  },
};
