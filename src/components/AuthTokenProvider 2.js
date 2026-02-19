'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthTokenContext = createContext({
  token: null,
  userRole: null,
  setToken: () => {},
  setUserRole: () => {},
  logout: () => {},
});

export const AuthTokenProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [userRole, setUserRoleState] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('authToken');
    const storedRole = window.localStorage.getItem('userRole');
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedRole) {
      setUserRoleState(storedRole);
    }
  }, []);

  const setToken = (nextToken) => {
    setTokenState(nextToken || null);
    if (nextToken) {
      window.localStorage.setItem('authToken', nextToken);
    } else {
      window.localStorage.removeItem('authToken');
    }
  };

  const setUserRole = (role) => {
    setUserRoleState(role || null);
    if (role) {
      window.localStorage.setItem('userRole', role);
    } else {
      window.localStorage.removeItem('userRole');
    }
  };

  const logout = () => {
    setTokenState(null);
    setUserRoleState(null);
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('userRole');
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  };

  const value = useMemo(() => ({ token, userRole, setToken, setUserRole, logout }), [token, userRole]);

  return <AuthTokenContext.Provider value={value}>{children}</AuthTokenContext.Provider>;
};

export const useAuthToken = () => useContext(AuthTokenContext);
