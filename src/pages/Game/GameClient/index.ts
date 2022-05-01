import { Client } from 'boardgame.io/react';
import { TheStitchesGame } from '../../../game/TheStitchesGame';
import { TheStitchesGameBoard } from '../../../game/TheStitchesGameBoard';
import { SocketIO } from 'boardgame.io/multiplayer';

const { protocol, hostname, port } = window.location;
const server = window.location.hostname === 'localhost' ? 'localhost:8000' : `${protocol}//${hostname}:${port}`;

export const GameClient = Client({
  game: TheStitchesGame,
  board: TheStitchesGameBoard,
  multiplayer: SocketIO({ server: server }),
  // debug: true,
});
