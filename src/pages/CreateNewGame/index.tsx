import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lobbyClient } from '../../api/lobbyClient';
import { TheStitchesGame } from '../../game/TheStitchesGame';

export const CreateNewGame = () => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const navigate = useNavigate();

  const createNewGame = () => {
    if (!numPlayers || numPlayers < 2 || numPlayers > 6) {
      alert('Počet hráčů musí být mezi 2 a 6');
      return;
    }
    lobbyClient
      .createMatch(TheStitchesGame.name ?? '', {
        numPlayers: numPlayers,
      })
      .then((match) => navigate(`/game/${match.matchID}`));
  };

  return (
    <div>
      <label>Zadej počet hráčů</label>
      <input name="numPlayers" type="number" defaultValue="2" onChange={(e) => setNumPlayers(Number(e.target.value))} />
      <button onClick={createNewGame}>Vytvořit hru</button>
    </div>
  );
};
