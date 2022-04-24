import { Server, Origins } from 'boardgame.io/server';
import { TheStitchesGame } from '../game/TheStitchesGame';

export const server = Server({
  // Provide the definitions for your game(s).
  games: [TheStitchesGame],

  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST,
  ],
});

server.run({
  port: 8000,
  lobbyConfig: {
    apiPort: 8080,
    apiCallback: () => console.log('Running Lobby API on port 8080...'),
  },
});
