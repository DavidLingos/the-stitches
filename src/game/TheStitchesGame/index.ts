import type { Game, PlayerID } from 'boardgame.io';
import { AceLowRankSet, Hand, Player, PlayingCard } from 'typedeck';
import type { GameState, PlayerCard } from '../../interfaces';
import { getTopCardPlayerId, orderCards } from '../../utils/cards';
import { getPlayerWithMaxReportedStitches } from '../../utils/game';
import { FullDeckGameType } from '../gameTypes/FullDeckGameType';
import { PartialDeckGameType } from '../gameTypes/PartialDeckGameType';
import phases from './phases';

export const TheStitchesGame: Game<GameState> = {
  name: 'the-stitches',
  disableUndo: true,
  minPlayers: 2,
  maxPlayers: 6,
  setup: (ctx) => ({
    currentRound: 1,
    currentRoundStitchesCount: Object.fromEntries(ctx.playOrder.map((playerId) => [playerId, 0])),
    expectedStitchesCount: Object.fromEntries(ctx.playOrder.map((playerId) => [playerId, null])),
    numberOfRounds:
      ctx.playOrder.length === 2
        ? 15
        : ctx.playOrder.length === 3
        ? 10
        : ctx.playOrder.length === 4
        ? 12
        : ctx.playOrder.length === 5
        ? 10
        : 8,
    points: [],
    playerHands: Object.fromEntries(ctx.playOrder.map((playerId) => [playerId, []])),
    triumphCard: null,
    currentStitchCards: Object.fromEntries(ctx.playOrder.map((playerId) => [playerId, null])),
    stitchStartPlayer: null,
  }),
  phases: {
    play: phases.playPhase,
    reportExpectedStitches: phases.reportExpectedStitchesPhase,
  },
};
