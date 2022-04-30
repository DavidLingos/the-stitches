import { BoardProps } from 'boardgame.io/react';
import { useEffect } from 'react';
import { GameState } from '../../interfaces';
import { TheStitchesPlayersPanel } from './panels/TheStitchesPlayersPanel';

export const TheStitchesGameBoard: React.FC<BoardProps<GameState>> = ({ matchData, G, ctx, events }) => {
  // useEffect(() => {
  //   if (matchData?.every((i) => i.isConnected) && !ctx.phase && events.setPhase) {
  //     events.setPhase('reportExpectedStitches');
  //   }
  // }, [matchData, ctx.phase, events]);

  return <div>{matchData && <TheStitchesPlayersPanel matchData={matchData} G={G} />}</div>;
};
