import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
     const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
      return storedIsAuthenticated !== null ? JSON.parse(storedIsAuthenticated) : false;
    });
  
    useEffect(() => {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);
  
    return { ...context, isAuthenticated, setIsAuthenticated };
  };