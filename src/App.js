import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MovieProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}
