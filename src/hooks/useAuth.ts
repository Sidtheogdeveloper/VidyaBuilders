import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authService } from '../services/authService';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

    console.log('useAuth: Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('useAuth: Auth state changed', firebaseUser ? 'User logged in' : 'User logged out');
      setLoading(true);
      
      if (firebaseUser) {
        try {
          const userData = await authService.getCurrentUserData();
          console.log('useAuth: User data retrieved:', userData);
            setUser(userData);
          } else {
            console.log('useAuth: No user data found, creating new user document');
            // If user data doesn't exist in Firestore, create it
            const newUserData: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              phone: '',
              preferences: {
                newsletter: true,
                promotions: false,
                projectUpdates: true
              },
            };
            await authService.createUserDocument(newUserData);
            setUser(newUserData);
          }
          console.error('useAuth: Error getting user data:', err);
          // Don't set error immediately, try to create a basic user object
          const fallbackUserData: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || '',
            preferences: {
              newsletter: true,
              promotions: false,
              projectUpdates: true
            },
            appointments: []
          };
          setUser(fallbackUserData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    try {
      setError(null);
      const userData = await authService.signUp(email, password, name, phone);
      setUser(userData);
      return userData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const userData = await authService.signIn(email, password);
      setUser(userData);
      return userData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
    } catch (err: any) {
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

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updatePreferences
  };
};