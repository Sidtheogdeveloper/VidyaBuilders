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
      // Check if the time slot is already booked
      const existingAppointmentQuery = query(
        collection(db, 'appointments'),
        where('date', '==', appointment.date),
        where('time', '==', appointment.time),
        where('status', '==', 'scheduled')
      );
      
      const existingAppointments = await getDocs(existingAppointmentQuery);
      
      if (!existingAppointments.empty) {
        throw new Error('This time slot is already booked. Please choose a different time.');
      }

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
      // Get appointment details first
      const appointmentDoc = await getDocs(query(
        collection(db, 'appointments'),
        where('__name__', '==', appointmentId)
      ));
      
      if (appointmentDoc.empty) {
        throw new Error('Appointment not found');
      }
      
      const appointmentData = appointmentDoc.docs[0].data() as Appointment;
      
      // Check if appointment is within 24 hours
      const appointmentDateTime = new Date(`${appointmentData.date} ${appointmentData.time}`);
      const now = new Date();
      const timeDifference = appointmentDateTime.getTime() - now.getTime();
      const hoursDifference = timeDifference / (1000 * 3600);
      
      if (hoursDifference < 24 && hoursDifference > 0) {
        throw new Error('Cannot cancel appointment within 24 hours of scheduled time');
      }

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