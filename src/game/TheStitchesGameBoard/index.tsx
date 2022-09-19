import { BoardProps } from 'boardgame.io/react';
import { createContext, useContext, useEffect } from 'react';
import { GameState } from '../../interfaces';
import { PlayerHandPanel } from './panels/PlayerHandPanel';
import { WaitingForAllPlayersToConnectPanel } from './panels/WaitingForAllPlayersToConnectPanel';
import { GameOverPanel } from './panels/GameOverPanel';
import { GameTable } from './panels/GameTablePanel';

import './index.css';
import { ResultsTable } from './components/ResultsTable';

interface TheStitchesGameBoardContextValue {
  board: BoardProps<GameState>;
}

const TheStitchesGameBoardContext = createContext<TheStitchesGameBoardContextValue>({} as TheStitchesGameBoardContextValue);

export const TheStitchesGameBoard: React.FC<BoardProps<GameState>> = (board) => {
  const { matchData, G, playerID, ctx, moves } = board;

  useEffect(() => {
    if (Object.keys(G.currentStitchCards).filter((i) => !G.currentStitchCards[i]).length === 0 && playerID === ctx.currentPlayer) {
      setTimeout(moves.resetCurrentStitchCards, 5000);
    }
  }, [G.currentStitchCards, moves, playerID, ctx.currentPlayer]);

  return (
    <TheStitchesGameBoardContext.Provider value={{ board }}>
      {ctx.gameover && matchData && <GameOverPanel />}
      {(!ctx.gameover || !matchData) && matchData?.every((i) => i.name) ? (
        <>
          <div className="the-stitches">
            <GameTable />
            {playerID && <PlayerHandPanel />}
            <ResultsTable />
          </div>
        </>
      ) : (
        <WaitingForAllPlayersToConnectPanel />
      )}
    </TheStitchesGameBoardContext.Provider>
  );
};

export const useTheStitchesGame = () => useContext(TheStitchesGameBoardContext);
