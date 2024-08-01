import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
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