import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('homeease_token');
      const savedUser = localStorage.getItem('homeease_user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const res = await api.get('/auth/me');
          if (res.data?.success) {
            setUser(res.data.user);
            localStorage.setItem('homeease_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            console.warn('Session verification failed, logging out:', err);
            logout();
          } else {
            console.log('Running in demo mode with cached user session');
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        localStorage.setItem('homeease_token', res.data.token);
        localStorage.setItem('homeease_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      // Fallback for GitHub Pages static demo where backend is unavailable
      if (!err.response || err.response.status === 404 || err.message?.includes('Network Error')) {
        const isProvider = email.toLowerCase().includes('provider') || email.toLowerCase().includes('tech');
        const mockUser = isProvider
          ? {
              _id: 'demo_provider_1',
              name: 'Mohammad Kabir',
              email: email || 'provider@homeease.com',
              role: 'provider',
              phone: '+880 1711-223344',
              location: 'Dhanmondi',
              serviceExpertise: ['AC & Appliance Repair', 'Electrical & Wiring'],
              rating: 4.9,
              totalJobs: 142,
              profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            }
          : {
              _id: 'demo_customer_1',
              name: 'Raiyan Ahmed',
              email: email || 'customer@homeease.com',
              role: 'customer',
              phone: '+880 1712-345678',
              location: 'Dhanmondi',
              profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            };
        const mockData = { success: true, token: 'demo_jwt_token', user: mockUser };
        localStorage.setItem('homeease_token', mockData.token);
        localStorage.setItem('homeease_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return mockData;
      }
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data?.success) {
        localStorage.setItem('homeease_token', res.data.token);
        localStorage.setItem('homeease_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      // Fallback for GitHub Pages static demo
      if (!err.response || err.response.status === 404 || err.message?.includes('Network Error')) {
        const mockUser = {
          _id: 'mock_user_' + Date.now(),
          name: userData.name || 'Demo User',
          email: userData.email,
          role: userData.role || 'customer',
          phone: userData.phone || '+880 1712-000000',
          location: userData.location || 'Dhanmondi',
          serviceExpertise: userData.serviceExpertise || ['AC & Appliance Repair'],
          rating: 5.0,
          totalJobs: 0,
          profileImage: userData.role === 'provider'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        };
        const mockData = { success: true, token: 'demo_jwt_token', user: mockUser };
        localStorage.setItem('homeease_token', mockData.token);
        localStorage.setItem('homeease_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return mockData;
      }
      throw err;
    }
  };

  const quickDemoLogin = async (role = 'customer') => {
    const email = role === 'provider' ? 'provider@homeease.com' : 'customer@homeease.com';
    return await login(email, 'password123');
  };

  const logout = () => {
    localStorage.removeItem('homeease_token');
    localStorage.removeItem('homeease_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        quickDemoLogin,
        isAuthenticated: !!user,
        isCustomer: user?.role === 'customer',
        isProvider: user?.role === 'provider',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
