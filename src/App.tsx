import { Client } from 'boardgame.io/react';

import { TheStitchesGame } from './sharedComponents/Game';
import { TheStitchesGameBoard } from './sharedComponents/GameBoard';

const App = Client({
  game: TheStitchesGame,
  board: TheStitchesGameBoard,

});
export default App;