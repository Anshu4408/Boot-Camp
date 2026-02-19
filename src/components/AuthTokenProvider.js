"use client";
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthTokenContext = createContext();

// Provider component
export function AuthTokenProvider({ children }) {
  // You can replace this with your actual token logic
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState('user');

  return (
    <AuthTokenContext.Provider value={{ token, setToken, userRole, setUserRole }}>
      {children}
    </AuthTokenContext.Provider>
  );
}

// Custom hook for consuming the context
export function useAuthToken() {
  return useContext(AuthTokenContext);
}
