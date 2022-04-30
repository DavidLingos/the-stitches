import { BoardProps } from 'boardgame.io/react';
import { useEffect } from 'react';
import { GameState } from '../../interfaces';
import { PlayerHandPanel } from './panels/PlayerHandPanel';
import { GameStatusPanel } from './panels/GameStatusPanel';
import { WaitingForAllPlayersToConnectPanel } from './panels/WaitingForAllPlayersToConnectPanel';
import { ReportExpectedStitchesPanel } from './panels/ReportExpectedStitchesPanel';
import { CurrentStitchCardsPanel } from './panels/CurrentStitchCardsPanel';

export const TheStitchesGameBoard: React.FC<BoardProps<GameState>> = ({ matchData, G, playerID, ctx, moves }) => {
  useEffect(() => {
    if (Object.keys(G.currentStitchCards).filter((i) => !G.currentStitchCards[i]).length === 0 && playerID === ctx.currentPlayer) {
      setTimeout(moves.resetCurrentStitchCards, 5000);
    }
  }, [G.currentStitchCards, moves, playerID, ctx.currentPlayer]);

  if (ctx.gameover) {
    return <>Game is over</>;
  }
  return (
    <>
      {matchData?.every((i) => i.isConnected) ? (
        <div>
          {matchData && <GameStatusPanel matchData={matchData} G={G} ctx={ctx} />}
          {ctx.phase === 'reportExpectedStitches' && ctx.currentPlayer === playerID && (
            <ReportExpectedStitchesPanel G={G} moves={moves} ctx={ctx} />
          )}
          {ctx.phase === 'play' && <CurrentStitchCardsPanel G={G} ctx={ctx} />}
          {playerID && <PlayerHandPanel G={G} playerId={playerID} ctx={ctx} moves={moves} />}
        </div>
      ) : (
        <WaitingForAllPlayersToConnectPanel matchData={matchData} />
      )}
    </>
  );
};
