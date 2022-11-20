import React from 'react';
import { Route, Routes } from 'react-router';
import { CreateNewGame } from './pages/CreateNewGame';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { Statistics } from './pages/Statistics';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/new-game" element={<CreateNewGame />} />
      <Route path="/game/:matchId" element={<Game />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
