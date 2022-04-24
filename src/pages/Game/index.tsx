import { useState } from "react";
import { useParams } from "react-router-dom"
import { JoinGameForm } from "./JoinGameForm";

export const Game = () => {
  const params = useParams();
  const [playerId, setPlayerId] = useState<string>();

  return <>
    <div>Toto je hra s id {params.matchId}</div>
    {playerId ? <>Moje playerId je {playerId}</> : <JoinGameForm matchId={params.matchId ?? ''} setPlayerId={setPlayerId} />}
  </>
}