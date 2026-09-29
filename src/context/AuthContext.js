import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('movieExplorerUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    if (username && password) {
      const u = { username };
      setUser(u);
      localStorage.setItem('movieExplorerUser', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieExplorerUser');
  };

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
