import { PlayerID } from 'boardgame.io';
import { useTheStitchesGame } from '../..';
import { PlayingCard } from '../PlayingCard';

import './index.css';

interface TablePlayerProps {
  playerId: PlayerID;
}

export const TablePlayer: React.FC<TablePlayerProps> = ({ playerId }) => {
  const {
    board: { G, ctx, playerID: thisDevicePlayerId, matchData },
  } = useTheStitchesGame();

  const getClassName = () => {
    const step = 360 / ctx.playOrder.length;
    const thisDevicePlayerIndex = ctx.playOrder.indexOf(thisDevicePlayerId ?? '');
    const playerIndex = ctx.playOrder.indexOf(playerId ?? '');
    const playerPosDifference = playerIndex - thisDevicePlayerIndex;
    const position = playerPosDifference >= 0 ? 0 + step * playerPosDifference : 360 + step * playerPosDifference;
    return `table-player table-player-${position}`;
  };

  const playerCard = G.currentStitchCards[playerId];

  return (
    <div className={getClassName()}>
      <img
        className="table-player-avatar"
        src="/static/img/user.svg"
        alt={'Player ' + matchData?.find((i) => i.id.toString() === playerId)?.name}
      />
      {playerCard && <PlayingCard card={playerCard} />}
      <span className="table-player-name">
        {ctx.currentPlayer === playerId ? (
          <strong>{matchData?.find((i) => i.id.toString() === playerId)?.name}</strong>
        ) : (
          matchData?.find((i) => i.id.toString() === playerId)?.name
        )}
      </span>
      {playerId && (
        <>
          <strong>Skóre: </strong>
          {G.points.reduce((n, item) => n + item[playerId], 0)}, ({G.currentRoundStitchesCount[playerId]}/
          {G.expectedStitchesCount[playerId]})
        </>
      )}
    </div>
  );
};
