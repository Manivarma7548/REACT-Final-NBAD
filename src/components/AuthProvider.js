import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; 

const AuthProviderContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setLoggedIn(true);
    }
  }, []);

  const loginUser = (accessToken) => {
    setAccessToken(accessToken);
    setLoggedIn(true);
    localStorage.setItem('accessToken', accessToken);
  };

  const logoutUser = () => {
    setAccessToken(null);
    setLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  const refreshToken = async () => {
    try {
      const newAccessToken = await authService.refreshAccessToken();
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logoutUser();
    }
  };

  const checkTokenExpiry = () => {

    const expiryTime = Math.floor(Date.now() / 1000) + 60; 
    const currentTime = Date.now() / 1000;

    return currentTime < expiryTime;
  };

  const contextValue = {
    loggedIn,
    accessToken,
    loginUser,
    logoutUser,
    refreshToken,
    checkTokenExpiry,
  };

  return <AuthProviderContext.Provider value={contextValue}>{children}</AuthProviderContext.Provider>;
};

export const useAuthProvider = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error('useAuthProvider must be used within an AuthProvider');
  }
  return context;
};
