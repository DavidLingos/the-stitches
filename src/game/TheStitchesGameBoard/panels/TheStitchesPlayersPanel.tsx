import { FilteredMetadata } from 'boardgame.io';
import { GameState } from '../../../interfaces';

interface TheStitchesPlayersPanelProps {
  matchData: FilteredMetadata;
  G: GameState;
}
export const TheStitchesPlayersPanel: React.FC<TheStitchesPlayersPanelProps> = ({ matchData, G }) => {
  return (
    <div>
      <h2>Players</h2>
      {matchData
        .filter((i) => i.isConnected)
        .map((i) => (
          <p>
            {i.name} {G.points[i.id]}
          </p>
        ))}
    </div>
  );
};
