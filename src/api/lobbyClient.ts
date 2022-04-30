import { LobbyClient } from 'boardgame.io/client';

export const lobbyClient = new LobbyClient({
  server: `${window.location.hostname === 'localhost' ? 'http' : 'https'}://${window.location.hostname}:8080`,
});
