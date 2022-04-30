import { PlayerID } from 'boardgame.io';
import { CardName, Suit } from 'typedeck';
import { PlayerCard } from '../interfaces';

const cardIdsMap = {
  [CardName.Ace]: '0',
  [CardName.Eight]: '8',
  [CardName.Five]: '5',
  [CardName.Four]: '4',
  [CardName.Jack]: 'J',
  [CardName.King]: 'K',
  [CardName.Nine]: '9',
  [CardName.Queen]: 'Q',
  [CardName.Seven]: '7',
  [CardName.Six]: '6',
  [CardName.Ten]: 'T',
  [CardName.Three]: '3',
  [CardName.Two]: '2',
  [CardName.Joker]: 'J',
};

const cardsOrder = {
  [CardName.Ace]: 13,
  [CardName.Eight]: 7,
  [CardName.Five]: 4,
  [CardName.Four]: 3,
  [CardName.Jack]: 10,
  [CardName.King]: 12,
  [CardName.Nine]: 8,
  [CardName.Queen]: 11,
  [CardName.Seven]: 6,
  [CardName.Six]: 5,
  [CardName.Ten]: 9,
  [CardName.Three]: 2,
  [CardName.Two]: 1,
  [CardName.Joker]: 14,
};

const suitsMap = {
  [Suit.Clubs]: 'C',
  [Suit.Diamonds]: 'D',
  [Suit.Hearts]: 'H',
  [Suit.Spades]: 'S',
};

const suitsOrder = {
  [Suit.Clubs]: 0,
  [Suit.Diamonds]: 1,
  [Suit.Hearts]: 2,
  [Suit.Spades]: 3,
};

export const getCardUrl = (card: PlayerCard) => {
  return `/static/img/${cardIdsMap[card.cardName]}${suitsMap[card.suit]}.svg`;
};

export const orderCards = (cards: PlayerCard[]) => {
  return cards.sort((a, b) => suitsOrder[a.suit] - suitsOrder[b.suit] || cardsOrder[a.cardName] - cardsOrder[b.cardName]);
};

export const getTopCardPlayerId = (
  cards: {
    [key: PlayerID]: PlayerCard | null;
  },
  triumphCard: PlayerCard,
  startCard: PlayerCard,
): PlayerID => {
  const stitchSuitsOrder: Map<string, number> = new Map();
  stitchSuitsOrder.set(triumphCard.suit.toString(), 0);
  stitchSuitsOrder.set(startCard.suit.toString(), 1);
  Object.keys(Suit)
    .filter((i) => !stitchSuitsOrder.has(i))
    .forEach((suit) => stitchSuitsOrder.set(suit, 1000));
  return Object.keys(cards).sort(
    (a, b) =>
      (stitchSuitsOrder.get(cards[a]?.suit.toString() ?? '') ?? 0) - (stitchSuitsOrder.get(cards[b]?.suit.toString() ?? '') ?? 0) ||
      cardsOrder[cards[b]?.cardName ?? CardName.Ace] - cardsOrder[cards[a]?.cardName ?? CardName.Ace],
  )[0];
};
