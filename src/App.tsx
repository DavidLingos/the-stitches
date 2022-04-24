import { Lobby } from 'boardgame.io/react';

import { TheStitchesGame } from './sharedComponents/Game';
import { TheStitchesGameBoard } from './sharedComponents/GameBoard';

const App = () => {
  return <Lobby
  gameServer={`http://${window.location.hostname}:8080`}
  lobbyServer={`http://${window.location.hostname}:8080`}
  gameComponents={[
    { game: TheStitchesGame, board: TheStitchesGameBoard }
  ]}
/>;
}
export default App;