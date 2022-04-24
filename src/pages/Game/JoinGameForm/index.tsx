import { useCallback, useState } from "react";
import { lobbyClient } from "../../../api/lobbyClient";
import { TheStitchesGame } from "../../../sharedComponents/TheStitchesGame";

interface JoinGameFormProps {
  matchId: string;
  setPlayerId: (playerId: string) => void;
}
export const JoinGameForm: React.FC<JoinGameFormProps> = ({ matchId, setPlayerId }) => {
  const [playerName, setPlayerName] = useState<string>();

  const joinGame = useCallback(() => {
    if (!playerName || !playerName.length) {
      alert('Zadej své herní jméno');
      return;
    }
    lobbyClient.joinMatch(TheStitchesGame.name ?? '', matchId, {
      playerName: playerName
    }).then(response => setPlayerId(response.playerID))
  }, [playerName, matchId, setPlayerId]);

  return <>
    <label>Zadej své herní jméno</label>
    <input onChange={e => setPlayerName(e.target.value)} />
    <button onClick={joinGame}>Vstoupit do hry</button>
  </>
}