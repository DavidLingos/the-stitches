import React, { useCallback, useState } from 'react';
import { lobbyClient } from '../../../api/lobbyClient';
import { TheStitchesGame } from '../../../game/TheStitchesGame';

interface JoinGameFormProps {
  matchId: string;
  setPlayer: (playerId: string, credentials: string) => void;
}
export const JoinGameForm: React.FC<JoinGameFormProps> = ({ matchId, setPlayer }) => {
  const [playerName, setPlayerName] = useState<string>();

  const joinGame = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!playerName || !playerName.length) {
        alert('Zadej své herní jméno');
        return;
      }
      lobbyClient
        .joinMatch(TheStitchesGame.name ?? '', matchId, {
          playerName: playerName,
        })
        .then((response) => setPlayer(response.playerID, response.playerCredentials));
    },
    [playerName, matchId, setPlayer],
  );

  return (
    <form className="centerize-container container">
      <div className="form-group mb-3">
        <label className="form-label">Zadej své herní jméno</label>
        <input className="form-control" onChange={(e) => setPlayerName(e.target.value)} />
      </div>
      <button className="btn btn-success" onClick={(e) => joinGame(e)}>
        Vstoupit do hry
      </button>
    </form>
  );
};
