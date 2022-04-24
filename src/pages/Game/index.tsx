import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lobbyClient } from '../../api/lobbyClient';
import { TheStitchesGame } from '../../game/TheStitchesGame';
import { GameClient } from './GameClient';
import { JoinGameForm } from './JoinGameForm';

export const Game = () => {
  const params = useParams();
  const matchId = params.matchId ?? '';
  const [canConnectToGame, setCanConnectToGame] = useState<boolean>();
  const [playerId, setPlayerId] = useState<string>(localStorage.getItem(`${params.matchId}:playerId`) ?? '');

  const setPlayerIdCallback = useCallback(
    (playerId: string) => {
      localStorage.setItem(`${matchId}:playerId`, playerId);
      setPlayerId(playerId);
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
      <div>Toto je hra s id {matchId}</div>
      {playerId ? (
        <GameClient matchID={matchId ?? ''} playerID={playerId} />
      ) : (
        <JoinGameForm matchId={matchId ?? ''} setPlayerId={setPlayerIdCallback} />
      )}
    </>
  );
};
