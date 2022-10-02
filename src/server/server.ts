import { Firestore } from 'bgio-firebase';
import { Server, Origins } from 'boardgame.io/server';
import admin from 'firebase-admin';
import serve from 'koa-static';
import { TheStitchesGame } from '../game/TheStitchesGame';
import googleCredentials from '../firebase/the-stitches-firebase-adminsdk-9jihn-3f16d5de3f.json' assert { type: 'json' };

const serviceAccount = process.env.GOOGLE_CREDENTIALS ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : googleCredentials;

export const server = Server({
  // Provide the definitions for your game(s).
  games: [TheStitchesGame],
  db: new Firestore({
    config: {
      credential: admin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
      }),
      projectId: serviceAccount.project_id,
      storageBucket: 'the-stitches.appspot.com',
      databaseURL: 'https://the-stitches-default-rtdb.europe-west1.firebasedatabase.app/',
    },
    app: '[DEFAULT]',
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
