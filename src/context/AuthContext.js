"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('picky_user');
    const legacyLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const legacyUserName = localStorage.getItem('userName');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (legacyLoggedIn) {
      // Migrate legacy login to new system
      const migratedUser = { 
        name: legacyUserName || "Member", 
        email: "", 
        id: "legacy_" + Date.now() 
      };
      setUser(migratedUser);
      localStorage.setItem('picky_user', JSON.stringify(migratedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const newUser = { ...userData, id: Date.now().toString() };
    setUser(newUser);
    localStorage.setItem('picky_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('picky_user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
