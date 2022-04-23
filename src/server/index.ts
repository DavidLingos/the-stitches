import { Server, Origins } from 'boardgame.io/server';
import { TheStitchesGame } from '../sharedComponents/Game';

export const server = Server({
  // Provide the definitions for your game(s).
  games: [TheStitchesGame],

  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST
  ],
});