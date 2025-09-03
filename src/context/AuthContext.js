import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { setToken, getToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    
    // Check if we have user data in localStorage (for mock login)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
        return;
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
    
    // Fallback to API call
    api.me().then((res) => {
      setUser(res.user);
    }).catch(() => {
      setToken(null);
    }).finally(() => setLoading(false));
  }, []);

  const signup = async (payload) => {
    const res = await api.signup(payload);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const login = async (payload) => {
    // Handle both API login and mock login
    if (payload && payload.id && payload.name) {
      // This is a mock user object from Login component or test completion
      setUser(payload);
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(payload));
      return { user: payload };
    } else {
      // This is a regular API login
      const res = await api.login(payload);
      setToken(res.token);
      setUser(res.user);
      return res;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userTestData');
    // Clear any other related data
    sessionStorage.clear();
  };

  const value = { user, loading, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
