import { Ctx } from 'boardgame.io';
import { GameState } from '../../../../interfaces';

const setExpectedStitchesCount = (G: GameState, ctx: Ctx, stitchesCount: number) =>
  (G.expectedStitchesCount[ctx.currentPlayer] = stitchesCount);

const endPhaseIfAllPlayersReportedExpectedStithes = (G: GameState, ctx: Ctx) => {
  if (Object.keys(G.expectedStitchesCount).every((i) => G.expectedStitchesCount[i] !== null)) {
    ctx.events?.setPhase('play');
  }
};

const reportExpectedStitchesCount = (G: GameState, ctx: Ctx, stitchesCount: number) => {
  setExpectedStitchesCount(G, ctx, stitchesCount);
  ctx.events?.endTurn();
  endPhaseIfAllPlayersReportedExpectedStithes(G, ctx);
};

const toExport = { reportExpectedStitchesCount };

export default toExport;
