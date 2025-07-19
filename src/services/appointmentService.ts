import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Appointment } from '../types';

export const appointmentService = {
  // Create new appointment
  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointment,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Get appointments for a user
  async getUserAppointments(userId: string): Promise<Appointment[]> {
    try {
      const q = query(
        collection(db, 'appointments'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const appointments: Appointment[] = [];
      
      querySnapshot.forEach((doc) => {
        appointments.push({
          id: doc.id,
          ...doc.data()
        } as Appointment);
      });
      
      return appointments;
    } catch (error) {
      console.error('Error getting appointments:', error);
      throw error;
    }
  },

  // Update appointment
  async updateAppointment(appointmentId: string, updates: Partial<Appointment>): Promise<void> {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  // Cancel appointment
  async cancelAppointment(appointmentId: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: 'cancelled',
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  },

  // Delete appointment
  async deleteAppointment(appointmentId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  },

  // Get all appointments (admin function)
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const q = query(
        collection(db, 'appointments'),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const appointments: Appointment[] = [];
      
      querySnapshot.forEach((doc) => {
        appointments.push({
          id: doc.id,
          ...doc.data()
        } as Appointment);
      });
      
      return appointments;
    } catch (error) {
      console.error('Error getting all appointments:', error);
      throw error;
    }
  }
};