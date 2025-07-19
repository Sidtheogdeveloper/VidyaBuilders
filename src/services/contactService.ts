import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ContactForm } from '../types';

export const contactService = {
  // Submit contact form
  async submitContactForm(formData: ContactForm): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: Timestamp.now(),
        status: 'new'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email: string): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        subscribedAt: Timestamp.now(),
        active: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }
};