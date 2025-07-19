import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User as UserType } from '../types';

export const authService = {
  // Sign up new user
  async signUp(email: string, password: string, name: string, phone?: string): Promise<UserType> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: name });

      // Create user document in Firestore
      const userData: UserType = {
        id: user.uid,
        name,
        email,
        phone: phone || '',
        preferences: {
          newsletter: true,
          promotions: false,
          projectUpdates: true
        },
        appointments: []
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Sign in existing user
  async signIn(email: string, password: string): Promise<UserType> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserType;
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get current user data
  async getCurrentUserData(): Promise<UserType | null> {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserType;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Update user preferences
  async updateUserPreferences(userId: string, preferences: UserType['preferences']): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), { preferences });
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserType>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};