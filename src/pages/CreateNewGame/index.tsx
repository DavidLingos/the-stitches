import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lobbyClient } from '../../api/lobbyClient';
import { TheStitchesGame } from '../../game/TheStitchesGame';

export const CreateNewGame = () => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const navigate = useNavigate();

  const createNewGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
    <form className="centerize-container container">
      <div className="form-group mb-3">
        <label className="form-label">Zadej počet hráčů</label>
        <input
          className="form-control"
          name="numPlayers"
          type="number"
          defaultValue="2"
          onChange={(e) => setNumPlayers(Number(e.target.value))}
        />
      </div>
      <button className="btn btn-success" onClick={(e) => createNewGame(e)}>
        Vytvořit hru
      </button>
    </form>
  );
};
