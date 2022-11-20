import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheStitchesGame } from '../..';
import { lobbyClient } from '../../../../api/lobbyClient';
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
    const match = await lobbyClient.getMatch(TheStitchesGame.name ?? '', matchId);
    let nextMatchId = match?.nextMatchID;
    if (!nextMatchId) {
      nextMatchId = (
        await lobbyClient.playAgain(TheStitchesGame.name ?? '', matchId, {
          playerID: sessionPlayer?.playerId ?? '',
          credentials: sessionPlayer?.playerCredentials ?? '',
        })
      ).nextMatchID;
    }
    navigate(`/game/${nextMatchId}`);
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
