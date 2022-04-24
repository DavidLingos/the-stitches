import { Client } from 'boardgame.io/react';
import { TheStitchesGame } from '../../../game/TheStitchesGame';
import { TheStitchesGameBoard } from '../../../game/TheStitchesGameBoard';
import { SocketIO } from 'boardgame.io/multiplayer';

export const GameClient = Client({
  game: TheStitchesGame,
  board: TheStitchesGameBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  // debug: true,
});
