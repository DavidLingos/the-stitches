import type { Game, PlayerID } from 'boardgame.io';
import { AceLowRankSet, Hand, Player, PlayingCard } from 'typedeck';
import type { GameState, PlayerCard } from '../../interfaces';
import { getTopCardPlayerId, orderCards } from '../../utils/cards';
import { getPlayerWithMaxReportedStitches } from '../../utils/game';
import { FullDeckGameType } from '../gameTypes/FullDeckGameType';
import { PartialDeckGameType } from '../gameTypes/PartialDeckGameType';

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
    reportExpectedStitches: {
      moves: {
        reportExpectedStitchesCount: (G, ctx, stitchesCount: number) => {
          G.expectedStitchesCount[ctx.currentPlayer] = stitchesCount;
          ctx.events?.endTurn();
          if (Object.keys(G.expectedStitchesCount).every((i) => G.expectedStitchesCount[i])) {
            ctx.events?.setPhase('play');
          }
        },
      },
      onBegin: (G, ctx) => {
        const deck = ctx.playOrder.length < 4 ? new PartialDeckGameType().createDeck() : new FullDeckGameType().createDeck();
        deck.shuffle();

        ctx.playOrder.forEach((player) => {
          const cards = deck.takeCards(G.numberOfRounds - G.currentRound + 1) as PlayingCard[];
          G.playerHands[player] = orderCards(cards.map((i) => ({ cardName: i.cardName, suit: i.suit })));
        });

        const triumphCard = deck.takeCard() as PlayingCard;
        G.triumphCard = { cardName: triumphCard.cardName, suit: triumphCard.suit };
      },
      turn: {
        order: {
          first: (G, ctx) => {
            return (G.currentRound % ctx.numPlayers) - 1;
          },
          next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        },
      },
      start: true,
    },
    play: {
      moves: {
        playCard: (G, ctx, card: PlayerCard) => {
          G.currentStitchCards[ctx.currentPlayer] = card;
          G.playerHands[ctx.currentPlayer] = G.playerHands[ctx.currentPlayer].filter(
            (i) => i.cardName !== card.cardName || i.suit !== card.suit,
          );
          if (Object.keys(G.currentStitchCards).every((i) => G.currentStitchCards[i]) && G.triumphCard) {
            const startCard = G.currentStitchCards[G.stitchStartPlayer ?? ''];
            if (!startCard) {
              return;
            }
            const topCardPlayerId = getTopCardPlayerId(G.currentStitchCards, G.triumphCard, startCard);
            G.currentRoundStitchesCount[topCardPlayerId] += 1;
            ctx.events?.endTurn({ next: topCardPlayerId });
          } else {
            ctx.events?.endTurn();
          }
          if (Object.keys(G.playerHands).every((i) => !G.playerHands[i].length)) {
            ctx.events?.setPhase('reportExpectedStitches');
          }
        },
        resetCurrentStitchCards: (G) => {
          const startCard = G.currentStitchCards[G.stitchStartPlayer ?? ''];
          if (G.triumphCard && startCard) {
            G.stitchStartPlayer = getTopCardPlayerId(G.currentStitchCards, G.triumphCard, startCard);
            Object.keys(G.currentStitchCards).forEach((i) => (G.currentStitchCards[i] = null));
          }
        },
      },
      onBegin: (G, ctx) => {
        const maxPlayerId = getPlayerWithMaxReportedStitches(G, ctx);
        G.stitchStartPlayer = maxPlayerId;
      },
      onEnd: (G, ctx) => {
        const currentRoundPoints: {
          [key: PlayerID]: number;
        } = {};
        ctx.playOrder.forEach((player) => {
          if (G.currentRoundStitchesCount[player] === G.expectedStitchesCount[player]) {
            currentRoundPoints[player] = G.expectedStitchesCount[player] ?? 0 + 10;
          } else {
            currentRoundPoints[player] = -(G.currentRoundStitchesCount[player] ?? 0);
          }
          G.expectedStitchesCount[player] = null;
          G.currentStitchCards[player] = null;
          G.currentRoundStitchesCount[player] = 0;
        });
        G.points.push(currentRoundPoints);
        G.stitchStartPlayer = null;
        if (G.currentRound > G.numberOfRounds) {
          ctx.events?.endGame(true);
        } else {
          G.currentRound++;
        }
      },
      turn: {
        order: {
          first: (G, ctx) => {
            const maxPlayerId = getPlayerWithMaxReportedStitches(G, ctx);
            return ctx.playOrder.indexOf(maxPlayerId ?? '');
          },
          next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        },
      },
    },
  },
};
