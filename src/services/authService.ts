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
    console.log('authService: Starting signup for email:', email);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('authService: Firebase user created:', user.uid);

      // Update display name
      await updateProfile(user, { displayName: name });
      console.log('authService: Display name updated');

      // Create user document in Firestore
      const userData: UserType = {
        id: user.uid,
        name,
        email,
        phone: phone || '',
        role: 'user', // Default role for new users
        preferences: {
          newsletter: true,
          promotions: false,
          projectUpdates: true
        },
        appointments: []
      };

      console.log('authService: Creating Firestore document with data:', userData);
      await setDoc(doc(db, 'users', user.uid), userData);
      console.log('authService: Firestore document created successfully');
      return userData;
    } catch (error) {
      console.error('authService: Error signing up:', error);
      throw error;
    }
  },

  // Sign in existing user
  async signIn(email: string, password: string): Promise<UserType> {
    console.log('authService: Starting signin for email:', email);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('authService: Firebase signin successful:', user.uid);

      // Get user data from Firestore
      console.log('authService: Fetching user document from Firestore');
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        console.log('authService: User document found in Firestore');
        return userDoc.data() as UserType;
      } else {
        console.log('authService: User document not found, creating new one');
        // Create user document if it doesn't exist
        const userData: UserType = {
          id: user.uid,
          name: user.displayName || 'User',
          email: user.email || email,
          phone: '',
          role: 'user', // Default role
          preferences: {
            newsletter: true,
            promotions: false,
            projectUpdates: true
          },
          appointments: []
        };
        await setDoc(doc(db, 'users', user.uid), userData);
        console.log('authService: New user document created');
        return userData;
      }
    } catch (error) {
      console.error('authService: Error signing in:', error);
      throw error;
    }
  },

  // Sign out user
  async signOut(): Promise<void> {
    console.log('authService: Starting signout');
    try {
      await signOut(auth);
      console.log('authService: Signout successful');
    } catch (error) {
      console.error('authService: Error signing out:', error);
      throw error;
    }
  },

  // Get current user data
  async getCurrentUserData(): Promise<UserType | null> {
    console.log('authService: Getting current user data');
    try {
      const user = auth.currentUser;
      if (!user) return null;
        console.log('authService: No current user found');

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserType;
        console.log('authService: User document exists in Firestore');
      }
      
      console.log('authService: Current user found:', user.uid);
      console.log('authService: User document does not exist, creating new one');
      // If user document doesn't exist, create it
      const userData: UserType = {
        id: user.uid,
        name: user.displayName || 'User',
        email: user.email || '',
        phone: '',
        role: 'user', // Default role
        preferences: {
          newsletter: true,
          promotions: false,
          projectUpdates: true
        },
        appointments: []
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      console.log('authService: New user document created successfully');
      return userData;
    } catch (error) {
      console.error('authService: Error getting user data:', error);
      return null;
    }
  },

  // Create user document
  async createUserDocument(userData: UserType): Promise<void> {
    try {
      await setDoc(doc(db, 'users', userData.id), userData);
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
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