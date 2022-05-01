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
const frontEndAppBuildPath = './build';
server.app.use(serve(frontEndAppBuildPath));

server.run(
  {
    port: (process.env.PORT && Number(process.env.PORT)) || 8000,
    lobbyConfig:
      process.env.NODE_ENV !== 'production'
        ? {
            apiPort: 8080,
          }
        : undefined,
  },
  () => {
    server.app.use(async (ctx, next) => await serve(frontEndAppBuildPath)(Object.assign(ctx, { path: 'index.html' }), next));
  },
);
