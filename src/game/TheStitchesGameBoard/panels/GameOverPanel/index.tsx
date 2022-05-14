import { Ctx, FilteredMetadata } from 'boardgame.io';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheStitchesGame } from '../..';
import { lobbyClient } from '../../../../api/lobbyClient';
import { GameState } from '../../../../interfaces';
import { TheStitchesGame } from '../../../TheStitchesGame';
import { ResultsTable } from '../../components/ResultsTable';

export const GameOverPanel = () => {
  const {
    board: { G, matchData },
  } = useTheStitchesGame();

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
      <ResultsTable />
      <button onClick={playAgain} className="btn btn-success">
        Hrát znovu
      </button>
    </div>
  );
};
