import { LobbyClient } from 'boardgame.io/client';

export const lobbyClient = new LobbyClient({
  server: `${window.location.hostname === 'localhost' ? 'http' : 'https'}://${window.location.hostname}${
    window.location.hostname === 'localhost' ? ':8080' : ''
  }`,
});
