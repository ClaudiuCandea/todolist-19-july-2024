import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const login = () => {
    setIsAuthenticated(true)

  };
  const logout = async () => {
    setIsAuthenticated(false);
    await delay(500);
    localStorage.removeItem('profile');
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

