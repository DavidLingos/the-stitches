import type { Game } from 'boardgame.io';
import { AceLowRankSet, Hand, Player, PlayingCard } from 'typedeck';
import type { GameState } from '../../interfaces';
import { FullDeckGameType } from '../gameTypes/FullDeckGameType';
import { PartialDeckGameType } from '../gameTypes/PartialDeckGameType';

export const TheStitchesGame: Game<GameState> = {
  name: 'the-stitches',
  disableUndo: true,
  deltaState: true,
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
    points: Object.fromEntries(ctx.playOrder.map((playerId) => [playerId, 0])),
    playerHands: Object.fromEntries(ctx.playOrder.map((playerId) => [playerId, []])),
    triumphCard: null,
  }),
  phases: {
    reportExpectedStitches: {
      moves: {
        reportExpectedStitchesCount: (G, ctx, stitchesCount: number) => {
          G.expectedStitchesCount[ctx.currentPlayer] = stitchesCount;
        },
      },
      onBegin: (G, ctx) => {
        const deck = ctx.playOrder.length < 4 ? new PartialDeckGameType().createDeck() : new FullDeckGameType().createDeck();
        deck.shuffle();

        ctx.playOrder.forEach((player) => {
          const cards = deck.takeCards(G.numberOfRounds - G.currentRound + 1) as PlayingCard[];
          G.playerHands[player] = cards.map((i) => ({ cardName: i.cardName, suit: i.suit }));
        });

        const triumphCard = deck.takeCard() as PlayingCard;
        G.triumphCard = { cardName: triumphCard.cardName, suit: triumphCard.suit };
      },
      endIf: (G) => Object.keys(G.expectedStitchesCount).every((i) => G.expectedStitchesCount[i]),
      next: 'play',
      start: true,
    },
    play: {
      moves: {
        playCard: (G, ctx) => {},
      },
      onEnd: (G, ctx) => {
        ctx.playOrder.forEach((player) => {
          if (G.currentRoundStitchesCount[player] === G.expectedStitchesCount[player]) {
            G.points[player] += G.expectedStitchesCount[player] ?? 0 + 10;
          }
          G.expectedStitchesCount[player] = null;
          G.currentRound++;
        });
      },
      next: 'reportExpectedStitches',
    },
  },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
};
