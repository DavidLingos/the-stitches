import { PlayerID } from 'boardgame.io';
import { useTheStitchesGame } from '../..';

import './index.css';

interface TablePlayerProps {
  playerId: PlayerID;
}

export const TablePlayer: React.FC<TablePlayerProps> = ({ playerId }) => {
  const {
    board: { ctx, playerID: thisDevicePlayerId, matchData },
  } = useTheStitchesGame();

  const getClassName = () => {
    const step = 360 / ctx.playOrder.length;
    const thisDevicePlayerIndex = ctx.playOrder.indexOf(thisDevicePlayerId ?? '');
    const playerIndex = ctx.playOrder.indexOf(playerId ?? '');
    const playerPosDifference = playerIndex - thisDevicePlayerIndex;
    const position = playerPosDifference >= 0 ? 0 + step * playerPosDifference : 360 + step * playerPosDifference;
    return `table-player table-player-${position}`;
  };

  return (
    <div className={getClassName()}>
      <img src="/static/img/user.svg" alt={'Player ' + matchData?.find((i) => i.id.toString() === playerId)?.name} />
      <span className="table-player-name">{matchData?.find((i) => i.id.toString() === playerId)?.name}</span>
    </div>
  );
};
