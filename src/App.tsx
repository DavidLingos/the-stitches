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
import { Layout } from './sharedComponents/Layout';
import { AppRoutes } from './routes';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <FirebaseContextProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </FirebaseContextProvider>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
