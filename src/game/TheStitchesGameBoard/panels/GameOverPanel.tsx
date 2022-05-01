import { Ctx, FilteredMetadata } from 'boardgame.io';
import { useNavigate, useParams } from 'react-router-dom';
import { lobbyClient } from '../../../api/lobbyClient';
import { GameState } from '../../../interfaces';
import { TheStitchesGame } from '../../TheStitchesGame';
import { ResultsTable } from '../components/ResultsTable';

interface GameOverPanelProps {
  matchData: FilteredMetadata;
  G: GameState;
}

export const GameOverPanel: React.FC<GameOverPanelProps> = ({ matchData, G }) => {
  const navigate = useNavigate();
  const params = useParams();
  const matchId = params.matchId ?? '';

  const playAgain = async () => {
    const sessionPlayer = JSON.parse(sessionStorage.getItem(matchId) ?? '');
    const matches = await lobbyClient.listMatches(TheStitchesGame.name ?? '', {
      isGameover: true,
    });
    console.log(matches);
    const { nextMatchID } = await lobbyClient.playAgain(TheStitchesGame.name ?? '', matchId, {
      playerID: sessionPlayer?.playerId ?? '',
      credentials: sessionPlayer?.playerCredentials ?? '',
    });
    navigate(`/game/${nextMatchID}`);
  };
  return (
    <div className="centerize-container">
      <ResultsTable G={G} matchData={matchData} />
      <button onClick={playAgain} className="btn btn-success">
        Hrát znovu
      </button>
    </div>
  );
};
