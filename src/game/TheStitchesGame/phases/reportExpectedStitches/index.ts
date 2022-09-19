import { Ctx, Game, PhaseConfig } from 'boardgame.io';
import { PlayingCard } from 'typedeck';
import { GameState } from '../../../../interfaces';
import { orderCards } from '../../../../utils/cards';
import { FullDeckGameType } from '../../../gameTypes/FullDeckGameType';
import { PartialDeckGameType } from '../../../gameTypes/PartialDeckGameType';
import moves from './moves';

const shuffleAndDealCards = (G: GameState, ctx: Ctx) => {
  const deck = ctx.playOrder.length < 4 ? new PartialDeckGameType().createDeck() : new FullDeckGameType().createDeck();
  deck.shuffle();

  ctx.playOrder.forEach((player) => {
    const cards = deck.takeCards(G.numberOfRounds - G.currentRound + 1) as PlayingCard[];
    G.playerHands[player] = orderCards(cards.map((i) => ({ cardName: i.cardName, suit: i.suit })));
  });

  const triumphCard = deck.takeCard() as PlayingCard;
  G.triumphCard = { cardName: triumphCard.cardName, suit: triumphCard.suit };
};

export const reportExpectedStitchesPhase: PhaseConfig<GameState, Ctx> = {
  moves,
  onBegin: shuffleAndDealCards,
  turn: {
    order: {
      first: (G, ctx) => {
        return G.currentRound % ctx.numPlayers;
      },
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    },
  },
  start: true,
};
