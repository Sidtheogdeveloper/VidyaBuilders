import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authService } from '../services/authService';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useAuth: Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('useAuth: Auth state changed', firebaseUser ? 'User logged in' : 'User logged out');
      setLoading(true);
      setError(null);
      
      if (firebaseUser) {
        console.log('useAuth: Firebase user found, getting user data...');
        try {
          const userData = await authService.getCurrentUserData();
          console.log('useAuth: User data retrieved:', userData);
          if (userData) {
            setUser(userData);
          } else {
            console.log('useAuth: No user data found, creating new user document');
            // If user data doesn't exist in Firestore, create it
            const newUserData: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              phone: '',
              preferences: {
                newsletter: true,
                promotions: false,
                projectUpdates: true
              },
              appointments: []
            };
            console.log('useAuth: Creating user document with data:', newUserData);
            await authService.createUserDocument(newUserData);
            setUser(newUserData);
          }
        } catch (err) {
          console.error('useAuth: Error getting user data:', err);
          // Don't set error immediately, try to create a basic user object
          const fallbackUserData: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || '',
            phone: '',
            preferences: {
              newsletter: true,
              promotions: false,
              projectUpdates: true
            },
            appointments: []
          };
          console.log('useAuth: Using fallback user data:', fallbackUserData);
          setUser(fallbackUserData);
        }
      } else {
        console.log('useAuth: No firebase user, setting user to null');
        setUser(null);
      }
      setLoading(false);
      console.log('useAuth: Loading set to false');
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    console.log('useAuth: Starting signup process');
    try {
      setError(null);
      const userData = await authService.signUp(email, password, name, phone);
      console.log('useAuth: Signup successful, user data:', userData);
      setUser(userData);
      return userData;
    } catch (err: any) {
      console.error('useAuth: Signup error:', err);
      setError(err.message);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('useAuth: Starting signin process');
    try {
      setError(null);
      const userData = await authService.signIn(email, password);
      console.log('useAuth: Signin successful, user data:', userData);
      setUser(userData);
      return userData;
    } catch (err: any) {
      console.error('useAuth: Signin error:', err);
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    console.log('useAuth: Starting signout process');
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
      console.log('useAuth: Signout successful');
    } catch (err: any) {
      console.error('useAuth: Signout error:', err);
      setError(err.message);
      throw err;
    }
  };

  const updatePreferences = async (preferences: User['preferences']) => {
    if (!user) return;
    
    try {
      setError(null);
      await authService.updateUserPreferences(user.id, preferences);
      setUser({ ...user, preferences });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const isAdmin = user?.role === 'admin';
  return {
    user,
    loading,
    error,
    isAdmin,
    signUp,
    signIn,
    signOut,
    updatePreferences
  };
};