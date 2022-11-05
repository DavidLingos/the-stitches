import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseContextProvider } from './context/firebase';
import { CreateNewGame } from './pages/CreateNewGame';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <FirebaseContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/new-game" element={<CreateNewGame />} />
            <Route path="/game/:matchId" element={<Game />} />
          </Routes>
        </Router>
      </FirebaseContextProvider>
    </QueryClientProvider>
  );
};
export default App;

