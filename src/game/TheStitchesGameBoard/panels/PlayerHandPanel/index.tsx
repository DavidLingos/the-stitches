import { Ctx } from 'boardgame.io';
import { CardName, Suit } from 'typedeck';
import { useTheStitchesGame } from '../..';
import { GameState, PlayerCard } from '../../../../interfaces';
import { getCardUrl, orderCards } from '../../../../utils/cards';
import { PlayingCard } from '../../components/PlayingCard';

import './index.css';

export const PlayerHandPanel = () => {
  const {
    board: { G, ctx, playerID, moves },
  } = useTheStitchesGame();
  const onCardClick = (card: PlayerCard) => {
    if (
      ctx.currentPlayer === playerID &&
      !G.currentStitchCards[playerID] &&
      (G.currentStitchCards[G.stitchStartPlayer ?? '']?.suit === card.suit ||
        G.playerHands[playerID].every((i) => i.suit !== G.currentStitchCards[G.stitchStartPlayer ?? '']?.suit))
    ) {
      const move = moves['playCard'];
      if (move) {
        move(card);
      }
    }
  };

  return (
    <div className="player-hand">
      {G.playerHands[playerID ?? ''].map((i, idx) => (
        <PlayingCard key={idx} card={i} onClick={() => onCardClick(i)} />
      ))}
    </div>
  );
};
