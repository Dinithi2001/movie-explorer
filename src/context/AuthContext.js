import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Safe JSON parse with error handling
  const safeParse = (item) => {
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to parse stored data:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = safeParse(savedUser);
      if (parsedUser) {
        setUser(parsedUser);
      } else {
        // Clear invalid data
        localStorage.removeItem('user');
      }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const parsedTheme = safeParse(savedTheme);
      if (typeof parsedTheme === 'boolean') {
        setDarkMode(parsedTheme);
      } else {
        // Clear invalid data
        localStorage.removeItem('darkMode');
      }
    }

    setAuthInitialized(true);
  }, []);

  const login = (userData) => {
    if (!userData) {
      console.error('Invalid user data provided');
      return;
    }
    setUser(userData);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      localStorage.setItem('darkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    darkMode,
    toggleDarkMode,
    authInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};