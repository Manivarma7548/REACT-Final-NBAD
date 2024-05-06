import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthCxt = createContext();

export const useAuth = () => {
  const context = useContext(AuthCxt);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken);

    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken) => {
    setAuthToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  const refreshAccessToken = async () => {
    try {
      const newToken = await authService.refreshAccessToken();
      login(newToken);
      return newToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };

  const checkTokenExpiration = () => {
    const expirationTime = Math.floor(Date.now() / 1000) + 60;
    const currentTime = Date.now() / 1000;

    return currentTime < expirationTime;
  };

  return (
    <AuthCxt.Provider value={{ isLoggedIn, authToken, login, logout, refreshAccessToken, checkTokenExpiration }}>
      {children}
    </AuthCxt.Provider>
  );
};
