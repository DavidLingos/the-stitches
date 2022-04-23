import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { server } from './server';

// server.run({
//   port: 8000,
//   lobbyConfig: {
//     apiPort: 8080,
//     apiCallback: () => console.log('Running Lobby API on port 8080...'),
//   }
// });

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);