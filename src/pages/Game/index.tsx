import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lobbyClient } from '../../api/lobbyClient';
import { TheStitchesGame } from '../../game/TheStitchesGame';
import { GameClient } from './GameClient';
import { JoinGameForm } from './JoinGameForm';

export const Game = () => {
  const params = useParams();
  const matchId = params.matchId ?? '';
  const sessionPlayer = useMemo(() => {
    const sessionPlayerString = sessionStorage.getItem(matchId);
    return sessionPlayerString ? JSON.parse(sessionPlayerString) : undefined;
  }, [matchId]);
  const [canConnectToGame, setCanConnectToGame] = useState<boolean>();
  const [playerId, setPlayerId] = useState<string>(sessionPlayer?.playerId);
  const [playerCredentials, setPlayerCredentials] = useState<string>(sessionPlayer?.playerCredentials);

  const setPlayerCallback = useCallback(
    (playerId: string, playerCredentials: string) => {
      sessionStorage.setItem(`${matchId}`, JSON.stringify({ playerId, playerCredentials }));
      setPlayerId(playerId);
      setPlayerCredentials(playerCredentials);
    },
    [setPlayerId, matchId],
  );

  useEffect(() => {
    lobbyClient.getMatch(TheStitchesGame.name ?? '', matchId).then((match) => setCanConnectToGame(match.players.some((i) => !i.name)));
  });

  if (canConnectToGame === undefined) {
    return <>Loading...</>;
  }

  if (!canConnectToGame && !playerId) {
    return <>Game is full</>;
  }
  return (
    <>
      {playerId && playerCredentials ? (
        <GameClient matchID={matchId ?? ''} playerID={playerId} credentials={playerCredentials} />
      ) : (
        <JoinGameForm matchId={matchId ?? ''} setPlayer={setPlayerCallback} />
      )}
    </>
  );
};
