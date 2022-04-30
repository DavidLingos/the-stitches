import { Server, Origins, FlatFile } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import { TheStitchesGame } from '../game/TheStitchesGame';

export const server = Server({
  // Provide the definitions for your game(s).
  games: [TheStitchesGame],
  db: new FlatFile({
    dir: './storage/server',
    logging: true,
    ttl: true,
  }),
  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST,
  ],
});

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, './build');
server.app.use(serve(frontEndAppBuildPath));

server.run(
  {
    port: 8000,
    lobbyConfig: {
      apiPort: 8080,
      apiCallback: () => console.log('Running Lobby API on port 8080...'),
    },
  },
  () => {
    server.app.use(async (ctx, next) => await serve(frontEndAppBuildPath)(Object.assign(ctx, { path: 'index.html' }), next));
  },
);
