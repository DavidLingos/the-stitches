import { useTheStitchesGame } from '../..';
import { PlayingCard } from '../../components/PlayingCard';
import { CurrentStitchCardsPanel } from '../CurrentStitchCardsPanel';
import { ReportExpectedStitchesPanel } from '../ReportExpectedStitchesPanel';

import './index.css';

export const GameTable = () => {
  const {
    board: { G, ctx, playerID },
  } = useTheStitchesGame();
  return (
    <div className="the-stitches-table">
      <div className="the-stitches-table-cards">
        <div className="the-stitches-table-stitch-cards">
          {ctx.phase === 'reportExpectedStitches' && ctx.currentPlayer === playerID && <ReportExpectedStitchesPanel />}
          {ctx.phase === 'play' && <CurrentStitchCardsPanel />}
        </div>
        <div className="the-stitches-table-triumph-card">{G.triumphCard && <PlayingCard card={G.triumphCard} />}</div>
      </div>
    </div>
  );
};
