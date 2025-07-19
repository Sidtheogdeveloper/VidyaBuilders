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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          setError(null);
          const userData = await authService.getCurrentUserData();
          if (userData) {
            setUser(userData);
          } else {
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
            await authService.createUserDocument(newUserData);
            setUser(newUserData);
          }
        } catch (err) {
          console.error('Error getting user data:', err);
          setError('Failed to load user data. Please try refreshing the page.');
          setUser(null);
        }
      } else {
        setUser(null);
        setError(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.signUp(email, password, name, phone);
      setUser(userData);
      return userData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.signIn(email, password);
      setUser(userData);
      return userData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      await authService.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
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