import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
const config = require('../config');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. On app load, check if user is already logged in
    const storedUser = localStorage.getItem('serviceDirUser');
    const storedToken = localStorage.getItem('serviceDirToken');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 2. REGISTER ACTION
  const registerAction = async (formData) => {
    try {
      const response = await fetch(`${config.API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.user);
      localStorage.setItem('serviceDirUser', JSON.stringify(data.user));
      localStorage.setItem('serviceDirToken', data.token);
      
      return { success: true };
    } catch (error) {
      console.error("Registration Error:", error);
      return { success: false, message: error.message };
    }
  };

  // 3. LOGOUT ACTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem('serviceDirUser');
    localStorage.removeItem('serviceDirToken');
  };

  // 4. LOGIN ACTION (UPDATED: Now connects to backend)
  const loginAction = async (formData) => {
    try {
      const response = await fetch(`${config.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // If successful, save user data and token
      setUser(data.user);
      localStorage.setItem('serviceDirUser', JSON.stringify(data.user));
      localStorage.setItem('serviceDirToken', data.token);

      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerAction, loginAction, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use this context easily in other components
export const useAuth = () => useContext(AuthContext);