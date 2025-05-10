import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import PrivateRoute from './components/PrivateRoute';

const AppContent = () => {
  const { darkMode } = useAuth();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MovieProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/movie/:id" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          </Routes>
        </MovieProvider>
      </Router>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;