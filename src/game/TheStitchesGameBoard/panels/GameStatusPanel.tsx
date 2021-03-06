import { Ctx, FilteredMetadata } from 'boardgame.io';
import { GameState } from '../../../interfaces';
import { getCardUrl } from '../../../utils/cards';
import { PlayingCard } from '../components/PlayingCard';
import { ResultsTable } from '../components/ResultsTable';

interface GameStatusPanelProps {
  matchData: FilteredMetadata;
  G: GameState;
  ctx: Ctx;
}
export const GameStatusPanel: React.FC<GameStatusPanelProps> = ({ matchData, G, ctx }) => {
  return (
    <div>
      <h2>Kolo: {G.currentRound}</h2>
      <h2>Hraje: {matchData.find((i) => i.id?.toString() === ctx.currentPlayer)?.name}</h2>
      <h2>Trumfová karta</h2>
      {G.triumphCard && <PlayingCard card={G.triumphCard} />}
      <h2>Nahlášené štychy</h2>
      {matchData.map((i) => (
        <p key={i.id}>
          {i.name} {G.expectedStitchesCount[i.id]}
        </p>
      ))}
      <h2>Štychy v aktuálním kole</h2>
      {matchData.map((i) => (
        <p key={i.id}>
          {i.name} {G.currentRoundStitchesCount[i.id]}
        </p>
      ))}
      <ResultsTable matchData={matchData} G={G} />
    </div>
  );
};
