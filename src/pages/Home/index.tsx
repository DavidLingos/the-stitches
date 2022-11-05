import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { lobbyClient } from '../../api/lobbyClient';
import { useFirebase } from '../../context/firebase';
import { TheStitchesGame } from '../../game/TheStitchesGame';

export const Home = () => {
  // const matches = useQuery(
  //   ['matches'],
  //   async () => {
  //     const matches = await lobbyClient.listMatches(TheStitchesGame.name ?? '', { isGameover: false });
  //     return matches.matches.filter((i) => i.players.some((p) => p.isConnected));
  //   },
  //   {
  //     refetchInterval: 10000,
  //   },
  // );

  return (
    <div className="centerize-container">
      <h1>Štychy</h1>
      <br />
      {/* {(matches.data?.length ?? 0) > 0 && (
        <>
          <h3>Otevřené hry</h3>
          {matches.data?.map((m) => (
            <div>
              {m.gameName} {m.matchID}
              <Link to={`/game/${m.matchID}`}>Připojit se</Link>
            </div>
          ))}
        </>
      )} */}
      <Link className="btn btn-success" to="new-game">
        Vytvoř novou hru
      </Link>
    </div>
  );
};
