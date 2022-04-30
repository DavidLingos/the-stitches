import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../../interfaces';
import { TheStitchesPlayersPanel } from './panels/TheStitchesPlayersPanel';

export const TheStitchesGameBoard: React.FC<BoardProps<GameState>> = ({ matchData, G }) => {
  return <div>{matchData && <TheStitchesPlayersPanel matchData={matchData} G={G} />}</div>;
};
