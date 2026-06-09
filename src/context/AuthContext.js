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

  const login = (emailOrUserData, password) => {
    if (password !== undefined) {
      const email = emailOrUserData;
      const registeredUsers = JSON.parse(localStorage.getItem('picky_registered_users') || '[]');
      const foundUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      const sessionUser = { name: foundUser.name, email: foundUser.email, id: foundUser.id };
      setUser(sessionUser);
      localStorage.setItem('picky_user', JSON.stringify(sessionUser));
      return sessionUser;
    } else {
      const userData = emailOrUserData;
      const newUser = { ...userData, id: userData.id || Date.now().toString() };
      setUser(newUser);
      localStorage.setItem('picky_user', JSON.stringify(newUser));
      return newUser;
    }
  };

  const register = (name, email, password) => {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const registeredUsers = JSON.parse(localStorage.getItem('picky_registered_users') || '[]');
    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      throw new Error('Email is already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      password: password
    };
    registeredUsers.push(newUser);
    localStorage.setItem('picky_registered_users', JSON.stringify(registeredUsers));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('picky_user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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
