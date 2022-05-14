import { Ctx } from 'boardgame.io';
import { GameState } from '../../../../interfaces';
import { PlayingCard } from '../../components/PlayingCard';
import { CurrentStitchCardsPanel } from '../CurrentStitchCardsPanel';

import './index.css';

interface GameTableProps {
  G: GameState;
  ctx: Ctx;
}

export const GameTable: React.FC<GameTableProps> = ({ G, ctx }) => {
  return (
    <div className="the-stitches-table">
      <div className="the-stitches-table-cards">
        <div className="the-stitches-table-stitch-cards">{ctx.phase === 'play' && <CurrentStitchCardsPanel G={G} ctx={ctx} />}</div>
        <div className="the-stitches-table-triumph-card">{G.triumphCard && <PlayingCard card={G.triumphCard} />}</div>
      </div>
    </div>
  );
};
