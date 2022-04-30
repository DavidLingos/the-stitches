import { FilteredMetadata } from 'boardgame.io';
import { GameState } from '../../../interfaces';
import { getCardUrl } from '../../../utils/cards';

interface GameStatusPanelProps {
  matchData: FilteredMetadata;
  G: GameState;
}
export const GameStatusPanel: React.FC<GameStatusPanelProps> = ({ matchData, G }) => {
  return (
    <div>
      <h2>Kolo: {G.currentRound}</h2>
      <h2>Trumfová karta</h2>
      {G.triumphCard && <img width={100} src={getCardUrl(G.triumphCard)} />}
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
      <h2>Body</h2>
      {matchData.map((i) => (
        <p key={i.id}>
          {i.name} {G.points[i.id]}
        </p>
      ))}
    </div>
  );
};
