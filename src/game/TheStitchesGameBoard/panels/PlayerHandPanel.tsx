import { Ctx } from 'boardgame.io';
import { CardName, Suit } from 'typedeck';
import { GameState, PlayerCard } from '../../../interfaces';
import { getCardUrl, orderCards } from '../../../utils/cards';

interface PlayerHandPanelProps {
  playerId: string;
  G: GameState;
  ctx: Ctx;
  moves: Record<string, (...args: any[]) => void>;
}

export const PlayerHandPanel: React.FC<PlayerHandPanelProps> = ({ G, playerId, ctx, moves }) => {
  const onCardClick = (card: PlayerCard) => {
    if (
      ctx.currentPlayer === playerId &&
      !G.currentStitchCards[playerId] &&
      (G.currentStitchCards[G.stitchStartPlayer ?? '']?.suit === card.suit ||
        G.playerHands[playerId].every((i) => i.suit !== G.currentStitchCards[G.stitchStartPlayer ?? '']?.suit))
    ) {
      const move = moves['playCard'];
      if (move) {
        move(card);
      }
    }
  };

  return (
    <div className="d-flex">
      {G.playerHands[playerId].map((i, idx) => (
        <img width={100} key={idx} src={getCardUrl(i)} onClick={() => onCardClick(i)} />
      ))}
    </div>
  );
};
