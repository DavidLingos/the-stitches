import { Ctx, Game } from "boardgame.io";
import { GameState } from "../../interfaces";

export const TheStitchesGame: Game<GameState> = {
  name: 'the-stitches',
  disableUndo: true,
  minPlayers: 2,
  maxPlayers: 6,
  setup: (ctx) => ({
    currentRound: 1,
    currentRoundStitchesCount: Object.fromEntries(ctx.playOrder.map(playerId => [playerId, 0])),
    expectedStitchesCount: Object.fromEntries(ctx.playOrder.map(playerId => [playerId, null])),
    numberOfRounds: ctx.playOrder.length === 2 ? 15 : ctx.playOrder.length === 3 ? 10 : ctx.playOrder.length === 4 ? 12 : ctx.playOrder.length === 5 ? 10 : 8,
    points: Object.fromEntries(ctx.playOrder.map(playerId => [playerId, 0])),
  }),
  phases: {
    reportExpectedStitches: {
      moves: {
        reportExpectedStitchesCount: (G, ctx, stitchesCount: number) => {
          G.expectedStitchesCount[ctx.currentPlayer] = stitchesCount;
        }
      },
      onBegin: (G) => {

      },
      endIf: (G) => Object.keys(G.expectedStitchesCount).every(i => G.expectedStitchesCount[i]),
      next: 'play'
    },
    play: {
      moves: {
        playCard: (G, ctx) => {

        }
      },
      onEnd: (G, ctx) => {
        ctx.playOrder.forEach(player => {
          if (G.currentRoundStitchesCount[player] === G.expectedStitchesCount[player]) {
            G.points[player] += (G.expectedStitchesCount[player] ?? 0 + 10)
          }
        })
      },
      next: 'reportExpectedStitches'
    }
  },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
}