import { Ctx, FilteredMetadata } from 'boardgame.io';
import { useTheStitchesGame } from '../..';
import { GameState } from '../../../../interfaces';
import { PlayingCard } from '../../components/PlayingCard';
import { ResultsTable } from '../../components/ResultsTable';

export const GameStatusPanel = () => {
  const {
    board: { G, ctx, matchData },
  } = useTheStitchesGame();

  return (
    <div>
      <h2>Kolo: {G.currentRound}</h2>
      <h2>Hraje: {matchData?.find((i) => i.id?.toString() === ctx.currentPlayer)?.name}</h2>
      <h2>Trumfová karta</h2>
      {G.triumphCard && <PlayingCard card={G.triumphCard} />}
      <h2>Štychy v aktuálním kole</h2>
      {matchData?.map((i) => (
        <p key={i.id}>
          {i.name} {G.currentRoundStitchesCount[i.id]}
        </p>
      ))}
      <ResultsTable />
    </div>
  );
};
