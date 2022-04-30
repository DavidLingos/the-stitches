import { useCallback, useState } from 'react';
import { lobbyClient } from '../../../api/lobbyClient';
import { TheStitchesGame } from '../../../game/TheStitchesGame';

interface JoinGameFormProps {
  matchId: string;
  setPlayer: (playerId: string, credentials: string) => void;
}
export const JoinGameForm: React.FC<JoinGameFormProps> = ({ matchId, setPlayer }) => {
  const [playerName, setPlayerName] = useState<string>();

  const joinGame = useCallback(() => {
    if (!playerName || !playerName.length) {
      alert('Zadej své herní jméno');
      return;
    }
    lobbyClient
      .joinMatch(TheStitchesGame.name ?? '', matchId, {
        playerName: playerName,
      })
      .then((response) => setPlayer(response.playerID, response.playerCredentials));
  }, [playerName, matchId, setPlayer]);

  return (
    <>
      <label>Zadej své herní jméno</label>
      <input onChange={(e) => setPlayerName(e.target.value)} />
      <button onClick={joinGame}>Vstoupit do hry</button>
    </>
  );
};
