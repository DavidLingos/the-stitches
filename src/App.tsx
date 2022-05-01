import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateNewGame } from './pages/CreateNewGame';
import { Game } from './pages/Game';
import { Home } from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<CreateNewGame />} />
        <Route path="/game/:matchId" element={<Game />} />
      </Routes>
    </Router>
  );
};
export default App;

