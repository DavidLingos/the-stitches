import { MouseEventHandler } from 'react';
import { PlayerCard } from '../../../../interfaces';
import { getCardUrl } from '../../../../utils/cards';

import './index.css';

interface PlayingCardProps {
  card: PlayerCard;
  onClick?: MouseEventHandler;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({ card, onClick }) => {
  return (
    <img
      className={`playing-card ${onClick ? 'playing-card-clickable' : ''}`}
      src={getCardUrl(card)}
      alt="Playing card"
      onClick={onClick}
    />
  );
};
