// src/contexts/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      try {
        const userData = JSON.parse(atob(storedToken.split('.')[1]));
        setUser(userData);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('access_token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem('access_token', token);
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/login');
  };

  const value = { user, login, logout, loading };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};