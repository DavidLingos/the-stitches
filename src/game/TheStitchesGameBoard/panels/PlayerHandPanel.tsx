import { CardName, Suit } from 'typedeck';
import { GameState, PlayerCard } from '../../../interfaces';
import { getCardUrl, orderCards } from '../../../utils/cards';

interface PlayerHandPanelProps {
  playerId: string;
  G: GameState;
}

export const PlayerHandPanel: React.FC<PlayerHandPanelProps> = ({ G, playerId }) => {
  return (
    <div className="d-flex">
      {G.playerHands[playerId].map((i, idx) => (
        <img width={100} key={idx} src={getCardUrl(i)} />
      ))}
    </div>
  );
};
