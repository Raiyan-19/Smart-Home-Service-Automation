import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('homeease_token');
      const savedUser = localStorage.getItem('homeease_user');

      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);

          // If backend is running, verify with /auth/me
          const res = await api.get('/auth/me');
          if (res.data?.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('homeease_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            console.warn('Session expired, logging out:', err);
            logout();
          } else {
            // Keep local user session
            console.log('Restored user session from local storage.');
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Helper to get registered users pool from localStorage
  const getRegisteredUsers = () => {
    try {
      const data = localStorage.getItem('homeease_registered_users');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  // Helper to save registered users pool to localStorage
  const saveRegisteredUsers = (users) => {
    localStorage.setItem('homeease_registered_users', JSON.stringify(users));
  };

  // Login: MUST be registered before logging in!
  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Please provide both email and password.');
    }

    // 1. Try real backend first if available
    try {
      const res = await api.post('/auth/login', { email: cleanEmail, password: cleanPassword });
      if (res.data?.success && res.data.user) {
        localStorage.setItem('homeease_token', res.data.token || 'jwt_token_' + Date.now());
        localStorage.setItem('homeease_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      // If backend explicitly rejected (e.g. 400/401 with message), forward that error
      if (err.response && err.response.data?.message) {
        throw new Error(err.response.data.message);
      }
    }

    // 2. Local Registry Verification: Strictly requires prior registration!
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existingUser) {
      throw new Error(
        'Account not found. You cannot log in without registering first! Please create an account.'
      );
    }

    if (existingUser.password !== cleanPassword) {
      throw new Error('Incorrect password. Please check your credentials and try again.');
    }

    // Password matches and user is registered!
    const token = 'token_' + existingUser._id + '_' + Date.now();
    localStorage.setItem('homeease_token', token);
    localStorage.setItem('homeease_user', JSON.stringify(existingUser));
    setUser(existingUser);

    return {
      success: true,
      token,
      user: existingUser,
    };
  };

  // Register: Creates a new persistent account
  const register = async (userData) => {
    const cleanEmail = (userData.email || '').trim().toLowerCase();
    const cleanPassword = (userData.password || '').trim();
    const cleanName = (userData.name || '').trim();

    if (!cleanEmail || !cleanPassword || !cleanName) {
      throw new Error('Name, email, and password are required for registration.');
    }

    const registeredUsers = getRegisteredUsers();
    const alreadyExists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);

    if (alreadyExists) {
      throw new Error('An account with this email is already registered. Please log in.');
    }

    // Default avatar based on role
    const defaultAvatar =
      userData.role === 'provider'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

    const newUser = {
      _id: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword, // Stored locally to verify subsequent logins
      role: userData.role || 'customer',
      phone: userData.phone || '+880 1700-000000',
      location: userData.location || 'Dhanmondi',
      serviceExpertise: userData.serviceExpertise || ['AC & Appliance Repair'],
      rating: 5.0,
      totalJobs: 0,
      bio: userData.bio || `${userData.role === 'provider' ? 'Certified Master Technician' : 'Home Resident'} based in ${userData.location || 'Dhaka'}.`,
      profileImage: userData.profileImage || defaultAvatar,
      registeredAt: new Date().toISOString(),
    };

    // Save to registered accounts list
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    // Also try sending to backend if running
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data?.success && res.data.user) {
        newUser._id = res.data.user._id || newUser._id;
      }
    } catch (e) {
      // Backend unavailable; local persistence is active
    }

    // Automatically log the newly registered user in
    const token = 'token_' + newUser._id + '_' + Date.now();
    localStorage.setItem('homeease_token', token);
    localStorage.setItem('homeease_user', JSON.stringify(newUser));
    setUser(newUser);

    return {
      success: true,
      token,
      user: newUser,
    };
  };

  // Update Profile: Modifies name, phone, location, expertise, avatar, bio
  const updateProfile = async (updatedFields) => {
    if (!user) throw new Error('No authenticated user to update.');

    const updatedUser = {
      ...user,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };

    // Update active user state and storage
    setUser(updatedUser);
    localStorage.setItem('homeease_user', JSON.stringify(updatedUser));

    // Update in registered users pool
    const registeredUsers = getRegisteredUsers();
    const idx = registeredUsers.findIndex(
      (u) => u.email.toLowerCase() === user.email.toLowerCase() || u._id === user._id
    );

    if (idx !== -1) {
      registeredUsers[idx] = {
        ...registeredUsers[idx],
        ...updatedFields,
        // keep password unchanged unless specified
        password: updatedFields.password || registeredUsers[idx].password,
      };
      saveRegisteredUsers(registeredUsers);
    }

    // Also attempt backend update if running
    try {
      await api.patch('/auth/profile', updatedFields);
    } catch (e) {
      // Offline fallback is fine
    }

    return updatedUser;
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
        updateProfile,
        logout,
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
