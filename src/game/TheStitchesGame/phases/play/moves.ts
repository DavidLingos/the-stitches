import { Ctx } from 'boardgame.io';
import { GameState, PlayerCard } from '../../../../interfaces';
import { getTopCardPlayerId } from '../../../../utils/cards';

const setCurrentStitchCard = (G: GameState, ctx: Ctx, card: PlayerCard) => (G.currentStitchCards[ctx.currentPlayer] = card);

const removeCardFromHand = (G: GameState, ctx: Ctx, card: PlayerCard) =>
  (G.playerHands[ctx.currentPlayer] = G.playerHands[ctx.currentPlayer].filter((i) => i.cardName !== card.cardName || i.suit !== card.suit));

const endPlayersTurn = (G: GameState, ctx: Ctx) => {
  // All players has played a card in current stitch
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
};

const endPhaseIfNoCardsRemaining = (G: GameState, ctx: Ctx) => {
  if (Object.keys(G.playerHands).every((i) => !G.playerHands[i].length)) {
    setTimeout(() => ctx.events?.setPhase('reportExpectedStitches'), 5000);
  }
};

const playCard = (G: GameState, ctx: Ctx, card: PlayerCard) => {
  setCurrentStitchCard(G, ctx, card);
  removeCardFromHand(G, ctx, card);
  endPlayersTurn(G, ctx);
  endPhaseIfNoCardsRemaining(G, ctx);
};

const resetCurrentStitchCards = (G: GameState) => {
  const startCard = G.currentStitchCards[G.stitchStartPlayer ?? ''];
  if (G.triumphCard && startCard) {
    G.stitchStartPlayer = getTopCardPlayerId(G.currentStitchCards, G.triumphCard, startCard);
    Object.keys(G.currentStitchCards).forEach((i) => (G.currentStitchCards[i] = null));
  }
};

const toExport = { playCard, resetCurrentStitchCards };

export default toExport;
