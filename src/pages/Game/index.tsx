import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { lobbyClient } from '../../api/lobbyClient';
import { useFirebase } from '../../context/firebase';
import { TheStitchesGame } from '../../game/TheStitchesGame';
import { GameOverPanel } from '../../game/TheStitchesGameBoard/panels/GameOverPanel';
import { GameClient } from './GameClient';
import { GameResult } from './GameResult';

export const Game = () => {
  const params = useParams();
  const matchId = params.matchId ?? '';
  const sessionPlayer = useMemo(() => {
    const sessionPlayerString = sessionStorage.getItem(matchId);
    return sessionPlayerString ? JSON.parse(sessionPlayerString) : undefined;
  }, [matchId]);
  const [canConnectToGame, setCanConnectToGame] = useState<boolean>();
  const [isGameOver, setIsGameOver] = useState<boolean>();
  const [playerId, setPlayerId] = useState<string>(sessionPlayer?.playerId);
  const [playerCredentials, setPlayerCredentials] = useState<string>(sessionPlayer?.playerCredentials);
  const {
    auth: { isAuthStateLoading, user },
  } = useFirebase();

  const setPlayerCallback = useCallback(
    (playerId: string, playerCredentials: string) => {
      sessionStorage.setItem(`${matchId}`, JSON.stringify({ playerId, playerCredentials }));
      setPlayerId(playerId);
      setPlayerCredentials(playerCredentials);
    },
    [setPlayerId, matchId],
  );

  useEffect(() => {
    lobbyClient.getMatch(TheStitchesGame.name ?? '', matchId).then((match) => {
      setCanConnectToGame(match.players.some((i) => !i.name));
      setIsGameOver(match.gameover);
    });
  }, [matchId]);

  useEffect(() => {
    if (user) {
      lobbyClient
        .joinMatch(TheStitchesGame.name ?? '', matchId, {
          playerName: user.displayName ?? '',
          data: {
            userUid: user.uid,
          },
        })
        .then((response) => setPlayerCallback(response.playerID, response.playerCredentials));
    }
  }, [user, matchId, setPlayerCallback]);

  if (isGameOver) {
    return <GameResult />;
  }

  if (canConnectToGame === undefined || isAuthStateLoading) {
    return <>Načítám...</>;
  }

  if (!canConnectToGame && !playerId) {
    return <>Hra je plná</>;
  }
  return <>{playerId && playerCredentials && <GameClient matchID={matchId ?? ''} playerID={playerId} credentials={playerCredentials} />}</>;
};
