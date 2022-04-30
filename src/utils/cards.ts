import { CardName, Suit } from 'typedeck';
import { PlayerCard } from '../interfaces';

const cardIdsMap = {
  [CardName.Ace]: 'A',
  [CardName.Eight]: '8',
  [CardName.Five]: '5',
  [CardName.Four]: '4',
  [CardName.Jack]: 'J',
  [CardName.King]: 'K',
  [CardName.Nine]: '9',
  [CardName.Queen]: 'Q',
  [CardName.Seven]: '7',
  [CardName.Six]: '6',
  [CardName.Ten]: '0',
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
  [CardName.Ten]: 10,
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
  return `http://deckofcardsapi.com/static/img/${cardIdsMap[card.cardName]}${suitsMap[card.suit]}.png`;
};

export const orderCards = (cards: PlayerCard[]) => {
  return cards.sort((a, b) => suitsOrder[a.suit] - suitsOrder[b.suit] || cardsOrder[a.cardName] - cardsOrder[b.cardName]);
};
