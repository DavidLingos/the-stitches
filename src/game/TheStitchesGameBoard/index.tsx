import { BoardProps } from 'boardgame.io/react';
import { useEffect } from 'react';
import { GameState } from '../../interfaces';
import { PlayerHandPanel } from './panels/PlayerHandPanel';
import { GameStatusPanel } from './panels/GameStatusPanel';
import { WaitingForAllPlayersToConnectPanel } from './panels/WaitingForAllPlayersToConnectPanel';
import { ReportExpectedStitchesPanel } from './panels/ReportExpectedStitchesPanel';

export const TheStitchesGameBoard: React.FC<BoardProps<GameState>> = ({ matchData, G, playerID, ctx, moves }) => {
  return (
    <>
      {matchData?.every((i) => i.isConnected) ? (
        <div>
          {matchData && <GameStatusPanel matchData={matchData} G={G} />}
          {ctx.phase === 'reportExpectedStitches' && ctx.currentPlayer === playerID && (
            <ReportExpectedStitchesPanel G={G} moves={moves} ctx={ctx} />
          )}
          {playerID && <PlayerHandPanel G={G} playerId={playerID} />}
        </div>
      ) : (
        <WaitingForAllPlayersToConnectPanel matchData={matchData} />
      )}
    </>
  );
};
