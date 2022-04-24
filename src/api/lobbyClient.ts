import { LobbyClient } from 'boardgame.io/client';

export const lobbyClient = new LobbyClient({
  server: `http://${window.location.hostname}:8080`
})